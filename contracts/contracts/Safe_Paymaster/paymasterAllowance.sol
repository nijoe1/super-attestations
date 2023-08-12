// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import {IEAS, Attestation, AttestationRequest,MultiAttestationRequest,DelegatedAttestationRequest, DelegatedRevocationRequest,MultiDelegatedRevocationRequest, MultiDelegatedAttestationRequest,TokenGatedAccess, TokenGatedType, RevocationRequest, RevocationRequestData} from "../interfaces/IEAS.sol";

interface ICheckAccess{
    function onlyAllowedTokens(bytes32 schemaUID)external view returns(bool);
}

contract paymasterAllowance{
    IEAS eas;
    ICheckAccess superAttestationsFactory;
    constructor(
        IEAS _eas,
        ICheckAccess _superAttestationsFactory
    ) {
        eas = _eas;
        superAttestationsFactory = _superAttestationsFactory;
    }

    function attest(AttestationRequest calldata request) external payable onlyAllowedSchemas(request.schema) returns (bytes32){
        return eas.attest(request);
    }

    function attestByDelegation(
        DelegatedAttestationRequest calldata delegatedRequest
    ) external payable onlyAllowedSchemas(delegatedRequest.schema) returns (bytes32) {
        return eas.attestByDelegation(delegatedRequest);
    }

    function revoke(RevocationRequest calldata request) external payable onlyAllowedSchemas(request.schema){
        eas.revoke(request);
    }

    function revokeByDelegation(DelegatedRevocationRequest calldata delegatedRequest) external payable onlyAllowedSchemas(delegatedRequest.schema){
        eas.revokeByDelegation(delegatedRequest);
    }

    modifier onlyAllowedSchemas(bytes32 schemaUID) {
        require(superAttestationsFactory.onlyAllowedTokens(schemaUID), "Non-existent token");
        _;
    }

}