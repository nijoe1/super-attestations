// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IEAS, Attestation, AttestationResolutionVoting, TokenGatedAccess, TokenGatedType, RevocationRequest, RevocationRequestData} from "./interfaces/IEAS.sol";
import {SchemaResolver} from "./EAS/SchemaResolver.sol";

import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {Initializable} from "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title superResolver
 * @notice A schema resolver that facilitates attestation resolution and incentives distribution.
 */
contract superResolver is SchemaResolver, ReentrancyGuard, Initializable {
    using Address for address payable;
    using EnumerableSet for EnumerableSet.AddressSet;
    using EnumerableSet for EnumerableSet.Bytes32Set;

    // Storage for the splitter factory, creation code, and counters
    address public splitterFactory;

    // Configuration and treasury variables
    TokenGatedAccess public attestersGatingToken;
    TokenGatedAccess public revokersGatingToken;
    uint64 public revokePeriod;
    uint256 public attestReward;
    bool public isMintable;

    address public factoryAddress;
    address private splitterAddress;
    address private feeRecipient;

    // Storage for distribution of attestors and their attestations
    EnumerableSet.AddressSet private validAttestors;
    EnumerableSet.Bytes32Set private attestations;
    mapping(address => uint256) private attestorsAttestations;

    struct AttestationInfo {
        uint64 revokationEndTime;
        address attester;
        uint256 rewardAmount;
        bool revoked;
        bool resolved;
    }

    mapping(bytes32 => AttestationInfo) private attestationInfo;

    /**
     * @dev Constructor to initialize the contract with essential parameters.
     * @param eas The Extended Attestation Schema contract.
     */
    constructor(
        IEAS eas
    ) SchemaResolver(eas) {}

    /**
     * @param tokenGateAddresses TokenGatedAccess configuration for attesters.
     * @param enumsIDs TokenGatedAccess configuration for revokers.
     * @param tokenIDs TokenGatedAccess configuration for revokers.
     * @param _splitterFactory Number of days allowed for revoking and voting on attestation resolution.
     * @param _splitterAddress Number of days allowed for revoking and voting on attestation resolution.
     * @param _attestReward Number of days allowed for revoking and voting on attestation resolution.
     * @param _revokePeriod Number of days allowed for revoking and voting on attestation resolution.
     * @param _isMintable Number of days allowed for revoking and voting on attestation resolution.
     */
    function initialize(
        address[] memory tokenGateAddresses,
        uint8[] memory enumsIDs,
        uint256[] memory tokenIDs,
        address _splitterFactory,
        address _splitterAddress,
        address _feeRecipient,
        uint256 _attestReward,
        uint64 _revokePeriod,
        bool _isMintable
    )public payable initializer(){
        attestersGatingToken = TokenGatedAccess(TokenGatedType(enumsIDs[0]),tokenGateAddresses[0],tokenIDs[0]);
        revokersGatingToken = TokenGatedAccess(TokenGatedType(enumsIDs[1]),tokenGateAddresses[1],tokenIDs[1]);
        revokePeriod = _revokePeriod;
        factoryAddress = msg.sender;
        attestReward = _attestReward;
        isMintable = _isMintable;
        splitterFactory = _splitterFactory;
        splitterAddress = _splitterAddress;
        feeRecipient = _feeRecipient;
    }

    /**
    * @dev Handles attestation by validating the attester and bond value.
    * @param attestation The attestation data.
    * @return Boolean indicating the success of the attestation.
    */
    function onAttest(
        Attestation calldata attestation,
        uint256 /* value */
    ) internal override returns (bool) {
        address attester = attestation.attester;
        if (!verifyAccess(attestersGatingToken, attester)) {
            return false;
        }
        attestations.add(attestation.uid);
        if (isMintable) {
            attestationInfo[attestation.uid].attester = attester;
            attestationInfo[attestation.uid].revokationEndTime = uint64(block.timestamp) + revokePeriod;
        } else {
            if (address(this).balance >= attestReward) {
                attestationInfo[attestation.uid].attester = attester;
                attestationInfo[attestation.uid].rewardAmount = attestReward;
                attestationInfo[attestation.uid].revokationEndTime = uint64(block.timestamp) + revokePeriod;
            }
        }
        return true;
    }

    /**
    * @dev Checks if an attestation can be revoked based on resolution status and time.
    * @param attestation The attestation data.
    * @return Boolean indicating whether the attestation can be revoked.
    */
    function onRevoke(
        Attestation calldata attestation,
        uint256 /* value */
    ) internal override returns (bool) {
        require(attestationInfo[attestation.uid].revokationEndTime >= block.timestamp, "revoke period ended");
        if (!verifyAccess(revokersGatingToken, tx.origin)) {
            return false;
        }
        if (validAttestors.remove(attestation.attester)) {
            attestorsAttestations[attestation.attester]--;
            attestationInfo[attestation.uid].rewardAmount = 0;
            attestationInfo[attestation.uid].revoked = true;
        }
        return true;
    }

    /** 
    * @dev Distributes minting funds among attesters using a splitter contract.
    * This function calculates the distribution of funds based on attestation counts and shares,
    * deploys a splitter contract, and sends the funds to it for distribution.
    */
    function splitMintingFunds() external {
        require(isMintable);

        resolveAttestations();

        // Get the current distribution round and available funds to split
        uint256 fundsToSplit = address(this).balance;

        uint256 PaymasterFee = SafeMath.div(fundsToSplit, 20);

        fundsToSplit -= PaymasterFee;

        Address.sendValue(payable(feeRecipient), PaymasterFee);

        // Get the list of valid attesters and calculate their shares across all rounds
        address[] memory allAttesters = validAttestors.values();
        uint256[] memory attesterShares = new uint256[](allAttesters.length);
        uint256 totalShares;

        for (uint256 i = 0; i < allAttesters.length; i++) {
            address attester = allAttesters[i];
            uint256 attesterAttestations = attestorsAttestations[attester];
            totalShares += attesterAttestations;
            attesterShares[i] = attesterAttestations;
        }

        // Calculate the remaining shares needed to reach a multiple of 100
        uint256 remainingShares = (100 - (totalShares % 100)) % 100;

        // Distribute one share to each address until no remaining shares are left
        uint256 currentIndex = 0;
        while (remainingShares > 0) {
            attesterShares[currentIndex]++;
            remainingShares--;
            currentIndex = (currentIndex + 1) % attesterShares.length;
        }

        address[] memory _trustedForwarders = new address[](0);

        // Deploy a splitter contract using thirdWeb factory and implementation with the calculated data
        bytes memory result = Address.functionCall(
            splitterFactory,
            abi.encodeWithSignature(
                "deployProxyByImplementation(address,bytes,bytes32)",
                splitterAddress,
                abi.encodePacked(
                    hex"b1a14437",
                    abi.encode(msg.sender, " ", _trustedForwarders, allAttesters, attesterShares)
                ),
                bytes32(block.number)
            )
        );

        address splitterInstance = abi.decode(result, (address));

        // Send the funds to the splitter contract for distribution
        Address.sendValue(payable(splitterInstance), fundsToSplit);
        // Distribute funds to valid attestors
        Address.functionCall(splitterInstance, abi.encodeWithSignature("distribute()"));
    }

    /**
    * @dev Resolves the attestation statuses and handles reward distribution.
    */
    function resolveAttestations() public {
        bytes32[] memory uids = attestations.values();
        address attester;
        if (!isMintable) {
            for (uint256 i = 0; i < uids.length; i++) {
                attester = attestationInfo[uids[i]].attester;
                if (!attestationInfo[uids[i]].revoked && 
                    !attestationInfo[uids[i]].resolved  && 
                    attestationInfo[uids[i]].revokationEndTime <= block.timestamp && 
                    attestationInfo[uids[i]].rewardAmount != 0
                ) {
                    Address.sendValue(payable(attester), attestReward);
                    attestationInfo[uids[i]].resolved = true;
                }
            }
        } else {
            for (uint256 i = 0; i < uids.length; i++) {
                attester = attestationInfo[uids[i]].attester;
                if (!attestationInfo[uids[i]].revoked && 
                    !attestationInfo[uids[i]].resolved && 
                    attestationInfo[uids[i]].revokationEndTime <= block.timestamp
                ) {
                    validAttestors.add(attester);
                    attestorsAttestations[attester]++;
                    attestationInfo[uids[i]].resolved = true;
                }
            }
        }
    }

    /**
     * @notice Indicates whether the contract is designed to handle incoming payments.
     * @return True, indicating that the contract can accept payments.
     */
    function isPayable() public pure override returns (bool) {
        return true;
    }

    /**
     * @dev Checks if a member has access based on the token gating configuration.
     * @param tokenGatedAccess The token gating configuration.
     * @param sender The address of the member.
     * @return Boolean indicating whether the member has access.
     */
    function verifyAccess(
        TokenGatedAccess memory tokenGatedAccess,
        address sender
    ) internal view returns (bool) {
        if (tokenGatedAccess.tokenGatedAddress == address(0)) return true;
        if (tokenGatedAccess.tokenGatedAddress == address(1)) return false;

        if (tokenGatedAccess.tokenGatedType == TokenGatedType._ERC721) {
            if (tokenGatedAccess.tokenID != 0) {
                return
                    IERC721(tokenGatedAccess.tokenGatedAddress).ownerOf(tokenGatedAccess.tokenID) ==
                    msg.sender;
            }
            return IERC721(tokenGatedAccess.tokenGatedAddress).balanceOf(sender) > 0;
        }
        if (tokenGatedAccess.tokenGatedType == TokenGatedType._ERC1155) {
            return
                IERC1155(tokenGatedAccess.tokenGatedAddress).balanceOf(
                    sender,
                    tokenGatedAccess.tokenID
                ) > 0;
        }
        if (tokenGatedAccess.tokenGatedType == TokenGatedType._ERC20) {
            return IERC20(tokenGatedAccess.tokenGatedAddress).balanceOf(sender) > 0;
        }
        return false;
    }

    function hasAccess(address sender) external view returns (bool) {
        return verifyAccess(revokersGatingToken, sender);
    }

    function hasAttestAccess(address sender) external view returns (bool) {
        return verifyAccess(attestersGatingToken, sender);
    }

    /**
     * @notice Allows only revokers to execute certain functions.
     */
    modifier onlyRevokers() {
        require(verifyAccess(revokersGatingToken, msg.sender), "Not a revoker");
        _;
    }
}