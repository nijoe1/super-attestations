// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import "./ISismoStructs.sol";

interface ISismoGlobalVerifier is ISismoStructs {
    function verifySismoProof(
        bytes memory sismoConnectResponse,
        ClaimRequest[] memory requestRequiredClaims
    ) external;
}
