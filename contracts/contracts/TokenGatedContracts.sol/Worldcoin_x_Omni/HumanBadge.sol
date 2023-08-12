// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";
import { EnumerableSet } from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./dependencies/NonblockingLzApp.sol";
import {ByteHasher} from "./helpers/ByteHasher.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

// Add onchain based Badges based on SVG Add metadata for each Badge Encode them using base64

contract HumanBadge is ERC721 , NonblockingLzApp {
    using ByteHasher for bytes;
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.UintSet;

    error InvalidProof();

    /// @dev the following are world-id related variables
    IWorldID private immutable _worldId;

    uint256 private immutable _externalNullifier;

    /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;

        // A uint16 variable named "destChainId" is declared to hold the LayerZero Chain Id of the destination blockchain.
    uint16 destChainIdGoerli;

    uint16 destChainIdBaseGoerli;

    bytes Adapter_Parameters;

        // A public string variable named "data" is declared. This will be the message sent to destination.
    string public data = "Nothing received yet";

    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    EnumerableSet.UintSet private nullifierHashes;

    Counters.Counter private tokenID;

    /// @param worldId The WorldID instance that will verify the proofs
    /// @param _appId The World ID app ID
    /// @param _actionId The World ID action ID

    constructor(
        IWorldID worldId,
        string memory _appId,
        string memory _actionId,
        address _lzEndpoint,
        bytes memory _Adapter_Parameters
    ) NonblockingLzApp(_lzEndpoint) ERC721("WorldcoinHumanSoulboundToken", "WHST") {
        _worldId = worldId;

        _externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
        // Wiring 1: If Source == OP Georli, then Destination Chain = ETH Georli
        if (_lzEndpoint == 0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1) destChainIdGoerli = 10121; destChainIdBaseGoerli = 10160;

        Adapter_Parameters = _Adapter_Parameters;
    }

    /// @param signal An arbitrary input from the user, usually the user's wallet address (check README for further details)
    /// @param root The root of the Merkle tree (returned by the JS widget).
    /// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
    /// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
    /// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
    function MintHumanBadge(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public payable {
        // First, we make sure this person hasn't done this before
        if (nullifierHashes.contains(nullifierHash)) revert("Already minted human Badge");

        (uint GoerliValue,) = estimateFeesGoerli(msg.sender);
        (uint BaseValue,) = estimateFeesBase(msg.sender);

        require(GoerliValue + BaseValue == msg.value, "wrong cross chain values");


        // We now verify the provided proof is valid and the user is verified by World ID
        _worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            _externalNullifier,
            proof
        );
        tokenID.increment();

        // We now record the user has done this, so they can't do it again (proof of uniqueness)
        nullifierHashes.add(nullifierHash);

        _mint(msg.sender, tokenID.current());

        // Cross chain minting Verified Human Badge to Base
        Address.functionCallWithValue(address(this),abi.encodeWithSignature("mintBase(address,uint256)",msg.sender, tokenID.current()),BaseValue);

        // Cross chain minting Verified Human Badge to Goerli
        Address.functionCallWithValue(address(this),abi.encodeWithSignature("mintGoerli(address,uint256)",msg.sender, tokenID.current()),GoerliValue);

    }

    // This function is called to send the data string to the destination.
    // It's payable, so that we can use our native gas token to pay for gas fees.
    function mintGoerli(address to, uint256 tokenId) external payable {
        // Only this contract can mint on Optimism
        require(msg.sender == address(this));
        // The message is encoded as bytes and stored in the "payload" variable.
        bytes memory payload = abi.encode(to, tokenId);
        
        // The data is sent using the parent contract's _lzSend function.
        _lzSend(destChainIdGoerli, payload, payable(msg.sender), address(0x0), bytes(""), msg.value);
    }


        // This function is called to send the data string to the destination.
    // It's payable, so that we can use our native gas token to pay for gas fees.
    function mintBase(address to, uint256 tokenId) external payable {
        // Only this contract can mint on Base
        require(msg.sender == address(this));
        // The message is encoded as bytes and stored in the "payload" variable.
        bytes memory payload = abi.encode(to, tokenId);
        
        // The data is sent using the parent contract's _lzSend function.
        _lzSend(destChainIdBaseGoerli, payload, payable(msg.sender), address(0x0), bytes(""), msg.value);
    }
    
    // This function allows the contract owner to designate another contract address to trust.
    // It can only be called by the owner due to the "onlyOwner" modifier.
    // NOTE: In standard LayerZero contract's, this is done through SetTrustedRemote.
    function trustAddress(address _otherContractGoerli, address _otherContractBase) public onlyOwner {
        trustedRemoteLookup[destChainIdGoerli] = abi.encodePacked(_otherContractGoerli, address(this));  
        trustedRemoteLookup[destChainIdBaseGoerli] = abi.encodePacked(_otherContractBase, address(this));   
    }

    // This function estimates the fees for a LayerZero operation.
    // It calculates the fees required on the source chain, destination chain, and by the LayerZero protocol itself.
    // @return nativeFee The estimated fee required denominated in the native chain's gas token.
    function estimateFeesGoerli(address to) public view returns (uint nativeFee, uint zroFee) {
        
        //Input the message you plan to send.
        bytes memory payload = abi.encode(to, tokenID.current());
        
        // Call the estimateFees function on the lzEndpoint contract.
        // This function estimates the fees required on the source chain, the destination chain, and by the LayerZero protocol.
        return lzEndpoint.estimateFees(destChainIdGoerli, address(this), payload, false, Adapter_Parameters);
    }


    function estimateFeesBase(address to) public view returns (uint nativeFee, uint zroFee) {
        
        //Input the message you plan to send.
        bytes memory payload = abi.encode(to, tokenID.current());
        
        // Call the estimateFees function on the lzEndpoint contract.
        // This function estimates the fees required on the source chain, the destination chain, and by the LayerZero protocol.
        return lzEndpoint.estimateFees(destChainIdBaseGoerli, address(this), payload, false, Adapter_Parameters);
    }

    function estimateFees(address to ) public view returns(uint){
        (uint GoerliValue,) = estimateFeesGoerli(to);
        (uint BaseValue,) = estimateFeesBase(to);   
        return GoerliValue + BaseValue;  
    }

    function tokenURI(uint256 /** tokenID */) public override pure returns(string memory){
        return "https://gateway.lighthouse.storage/ipfs/QmdyNTa7tTtvsV1ADtpVwghACFa5rLEBj7xKXDJwMJeE7m";
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721) {
        require(from == address(0), "Token not transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }


    // This function is called when data is received. It overrides the equivalent function in the parent contract.
    function _nonblockingLzReceive(uint16, bytes memory, uint64, bytes memory ) internal view override {

    }
}