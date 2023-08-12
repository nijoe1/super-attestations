// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import {Initializable} from "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract AccessControl is ERC1155, Initializable {

    uint256 public constant attestersToken = 1;
    uint256 public constant revokersToken = 2;
    // Constructor
    constructor() ERC1155("") {}

    function initialize(address[] memory attesters, address[] memory revokers)public initializer(){
        uint size = attesters.length;
        for (uint i = 0; i < size; i++) {
            _mint(attesters[i], attestersToken, 1, "");
        }
        size = revokers.length;
        for (uint i = 0; i < size; i++) {
            _mint(revokers[i], revokersToken, 1, "");
        }
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
