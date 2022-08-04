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
}