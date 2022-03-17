//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OnChainNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    IERC20 private mandalaCoin;
    string private startString;

    constructor() ERC721("OnChainNFT", "NFT") {
        mandalaCoin = IERC20(0xfCf181ddb07d3a0515F2325d455Aa234E670B248);
        startString = "data:application/json;base64,";
    }

    function substring(string memory str, uint startIndex, uint endIndex) 
        private 
        pure
        returns (string memory) 
    {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex-startIndex);
        for(uint i = startIndex; i < endIndex; i++) {
            result[i-startIndex] = strBytes[i];
        }
        return string(result);
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
        require(mandalaCoin.balanceOf(msg.sender) >= 1 ether, "You must have MDLA to mint");

        string memory imageStartString = substring(tokenURI, 0, 29);

        require(keccak256(abi.encodePacked(imageStartString)) == keccak256(abi.encodePacked(startString)), "You must mint an on-chain Mandala");

        mandalaCoin.transferFrom(msg.sender, address(this), 1 * (10**18));

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}