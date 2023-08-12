// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@sismo-core/sismo-connect-solidity/contracts/libs/SismoLib.sol";

contract sismoGlobalVerifier is SismoConnect {
    using SismoConnectHelper for SismoConnectVerifiedResult;

    constructor(bytes16 appId) SismoConnect(buildConfig(appId)) {}

    function verifySismoClaims(
        bytes memory sismoConnectResponseProofs,
        ClaimRequest[] memory requestRequiredClaims
    ) public view {
        AuthRequest[] memory auths = new AuthRequest[](1);
        auths[0] = buildAuth({authType: AuthType.VAULT});

        SismoConnectVerifiedResult memory result = verify({
            responseBytes: sismoConnectResponseProofs,
            auths: auths,
            claims: requestRequiredClaims,
            // we are using tx.origin here because it is called from a different 
            // contract using an interface from a caller and he is the tx.origin  
            signature: buildSignature({message: abi.encode(tx.origin)})
        });
        require(result.claims.length == requestRequiredClaims.length, "failed");
    }
}
