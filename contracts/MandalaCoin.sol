//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MandalaCoin is ERC20 {
    constructor() ERC20("MandalaCoin", "MDLA") {
        _mint(msg.sender, 1000 * (10**18));
    }
}
