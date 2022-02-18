//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OnChainNFT is Initializable, ERC721URIStorageUpgradeable, OwnableUpgradeable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    IERC20 private mandalaCoin;

    function initialize() public initializer {
        __ERC721_init("OnChainNFT", "NFT");
        __Ownable_init();
        mandalaCoin = IERC20(0x87F789c95A137F915DA83aCd32bBb3724631F997);
    }

    function getLatestTokenId()
        public
        view
        returns (uint256)
    {
        return _tokenIds.current();
    }

    function mintNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        require(mandalaCoin.balanceOf(msg.sender) >= 1 ether);

        // mandalaCoin.transferFrom(msg.sender, address(0), 1);
        mandalaCoin.transferFrom(msg.sender, address(this), 1 * (10**18));

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}