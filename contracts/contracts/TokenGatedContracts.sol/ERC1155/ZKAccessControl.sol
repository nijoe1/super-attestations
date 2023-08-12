// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import {ISismoStructs, ISismoGlobalVerifier} from "./interfaces/ISismoGlobalVerifier.sol";
import {Initializable} from "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract ZKAccessControl is ERC1155, ISismoStructs, Initializable {
    ISismoGlobalVerifier SismoVerifier;
    ClaimRequest[] attestorRequiredClaims;
    ClaimRequest[] revokerRequiredClaims;

    uint256 public constant attestersToken = 1;
    uint256 public constant revokersToken = 2;

    // Constructor
    constructor() ERC1155("") {}

    // initialize
    function initialize(
        address _SismoVerifier,
        bytes memory _attestorRequiredClaims,
        bytes memory _revokerRequiredClaims
    ) public initializer() {
        ClaimRequest[] memory attestorRequiredClaims_ = abi.decode(_attestorRequiredClaims,(ClaimRequest[]));
        ClaimRequest[] memory revokerRequiredClaims_ = abi.decode(_revokerRequiredClaims,(ClaimRequest[]));

        SismoVerifier = ISismoGlobalVerifier(_SismoVerifier);
        
        for (uint i = 0; i < attestorRequiredClaims_.length; ) {
            attestorRequiredClaims.push(attestorRequiredClaims_[i]);
            unchecked {
                ++i;
            }
        }
        for (uint i = 0; i < revokerRequiredClaims_.length; ) {
            revokerRequiredClaims.push(revokerRequiredClaims_[i]);
            unchecked {
                ++i;
            }
        }
    }

    function getAttesterRole(bytes memory proofs) external {
        // Verifying Claims
        if (attestorRequiredClaims.length > 0) {
            SismoVerifier.verifySismoProof(proofs, attestorRequiredClaims);
        }
        _mint(msg.sender, attestersToken, 1, "");
    }

    function getRevokerRole(bytes memory proofs) external {
        // Verifying Claims
        if (revokerRequiredClaims.length > 0) {
            SismoVerifier.verifySismoProof(proofs, revokerRequiredClaims);
        }
        _mint(msg.sender, revokersToken, 1, "");
    }

    function _beforeTokenTransfer(
        address  /* operator */,
        address from,
        address to,
        uint256[] memory /* ids */,
        uint256[] memory /* amounts */,
        bytes memory /* data */
    ) pure override internal {
      require(from == address(0) || to == address(0), "This a Soulbound token. It cannot be transferred.");
    }
}
