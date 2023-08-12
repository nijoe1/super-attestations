// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./dependencies/NonblockingLzApp.sol";


// Add Crosschain based HumanBadges
// Extending Worldcoin to crosschain blockchains
contract CrossChainHumanBadge is ERC721 , NonblockingLzApp {

    error InvalidProof();

        // A uint16 variable named "destChainId" is declared to hold the LayerZero Chain Id of the destination blockchain.
    uint16 destChainId;

        // A public string variable named "data" is declared. This will be the message sent to destination.
    string public data = "Nothing received yet";

    constructor(address _lzEndpoint) NonblockingLzApp(_lzEndpoint) ERC721("WorldcoinHumanSoulboundToken", "WHST") {
        // Wiring 1: If Source == BASE Georli, then Destination Chain = Georli
        if (_lzEndpoint == 0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab) destChainId = 10132;
        // Wiring 2: If Source == BASE Georli, then Destination Chain = Georli
        if (_lzEndpoint == 0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23) destChainId = 10132;
    }

   

    // This function is called when data is received. It overrides the equivalent function in the parent contract.
    function _nonblockingLzReceive(uint16, bytes memory, uint64, bytes memory _payload) internal override {
       // The LayerZero _payload (message) is decoded as a string and stored in the "data" variable.
       (address to,uint256 tokenID) = abi.decode(_payload, (address,uint256));
       _mint(to,tokenID);
    }
    
    // This function allows the contract owner to designate another contract address to trust.
    // It can only be called by the owner due to the "onlyOwner" modifier.
    // NOTE: In standard LayerZero contract's, this is done through SetTrustedRemote.
    function trustAddress(address _otherContract) public onlyOwner {
        trustedRemoteLookup[destChainId] = abi.encodePacked(_otherContract, address(this));   
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
}