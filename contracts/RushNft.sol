// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract RushNft is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter tokenSupply;
    constructor() ERC721("Rush NFT", "RNFT"){}

    function mint(string memory _tokenURI) external returns(uint) {
        _safeMint(msg.sender, tokenSupply.current());
        _setTokenURI(tokenSupply.current(), _tokenURI);
        tokenSupply.increment();
        return(tokenSupply.current() - 1);
    }

    function getUserTokens(address _owner) external view returns (uint[] memory) {
        uint tempCount;

        for (uint i = 0 ; i < tokenSupply.current(); i++) {
            if (this.ownerOf(i) == _owner) {
                ++tempCount;
            }
        }

        uint[] memory numArray = new uint[](tempCount);
        uint _tempCount;

        for (uint i = 0 ; i < tokenSupply.current(); i++) {
            if (this.ownerOf(i) == _owner) {
                numArray[_tempCount] = i;
                ++_tempCount;
            }
        }
        return numArray;
    }

}