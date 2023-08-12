// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {ISismoStructs} from "./interfaces/ISismoGlobalVerifier.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract AccessFactory is ISismoStructs, Ownable {
    address globalVerifier;
    address implementationAddress;
    address ZKimplementationAddress;

    // Constructor
    constructor(address _implementationAddress, address _ZKimplementationAddress, address _globalVerifier) {
        implementationAddress = _implementationAddress;
        ZKimplementationAddress = _ZKimplementationAddress;
        globalVerifier = _globalVerifier;
    }

    // Function to create a new OptimisticResolver contract and associate it with a schema
    function createAccessControlContract(
        address[] memory attesters,
        address[] memory revokers
    ) external returns(address accessControlClone) {
    // Create new resolver contract
        accessControlClone = Clones.clone(implementationAddress);

        (bool success, ) = accessControlClone.call(
            abi.encodeWithSignature(
                "initialize(address[],address[])",
                attesters,
                revokers
            )
        );

        require(success, "error deploying");
    }

    // Function to create a new OptimisticResolver contract and associate it with a schema
    function createZKAccessControlContract(
        ClaimRequest[] memory attestorRequiredClaims_,
        ClaimRequest[] memory revokerRequiredClaims_ 
    ) external returns(address zkaccessControlClone) {
    // Create new resolver contract
        zkaccessControlClone = Clones.clone(ZKimplementationAddress);

        bytes memory _attestorRequiredClaims = abi.encode(attestorRequiredClaims_);
        bytes memory _revokerRequiredClaims = abi.encode(revokerRequiredClaims_);

        (bool success, ) = zkaccessControlClone.call(
            abi.encodeWithSignature(
                "initialize(address,bytes,bytes)",
                globalVerifier,
                _attestorRequiredClaims,
                _revokerRequiredClaims
            )
        );

        require(success, "error deploying");
    }

    function changeImplementations(address _implementationAddress, address _ZKimplementationAddress, address _globalVerifier)public onlyOwner{
        implementationAddress = _implementationAddress;
        ZKimplementationAddress = _ZKimplementationAddress;
        globalVerifier = _globalVerifier;
    }
}

