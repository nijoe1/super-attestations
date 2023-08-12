// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface ISismoStructs {
    struct ClaimRequest {
        ClaimType claimType; // default: GTE
        bytes16 groupId;
        bytes16 groupTimestamp; // default: bytes16("latest")
        uint256 value; // default: 1
        // flags
        bool isOptional; // default: false
        bool isSelectableByUser; // default: true
        //
        bytes extraData; // default: ""
    }

    enum ClaimType {
        GTE,
        GT,
        EQ,
        LT,
        LTE
    }
}
