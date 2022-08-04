// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



contract RushMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter totalItems;

    // Variables
    address payable public immutable feeAccount; // the account that receives fees
    uint public immutable feePercent; // the fee percentage on sales 
    uint public itemCount; 

    IERC721 private immutable nftInterface;

    modifier isTokenOwner(uint _tokenId) {
        address _tokenOwner = nftInterface.ownerOf(_tokenId);
        require(_tokenOwner == msg.sender, "You're not the owner of token.");
        _;
    }

    constructor(address _interface) {
        nftInterface = IERC721(_interface);
        feeAccount = payable(msg.sender);
        feePercent = 10;
    }

    struct MarketItem {
        uint marketItemID;
        uint tokenID;
        uint price;
        address payable seller;
        bool itemSold;
    }

    event SaleCreated(uint marketItemId, uint tokenId, uint price, address seller);
    event ItemSold(uint marketItemId, uint tokenId, uint price, address seller, address buyer);

    mapping(uint=>MarketItem) itemIdToItem;

    function createSale(uint _tokenId, uint _price) isTokenOwner(_tokenId) external nonReentrant {
        nftInterface.transferFrom(msg.sender, address(this), _tokenId);
        MarketItem memory _newMarketItem = MarketItem(totalItems.current(), _tokenId, _price, payable(msg.sender), false);
        itemIdToItem[totalItems.current()] = _newMarketItem;
        emit SaleCreated(totalItems.current(), _tokenId, _price, msg.sender);
    }

    function purchaseItem(uint _itemId) external nonReentrant {
        require(msg.sender != address(0), "Invalid address.");
        uint _tokenId = itemIdToItem[_itemId].tokenID;
        uint _price = itemIdToItem[_itemId].price;
        address _seller = itemIdToItem[_itemId].seller;
            
        nftInterface.transferFrom(address(this), msg.sender, _tokenId);
        emit ItemSold(_itemId, _tokenId, _price, _seller, msg.sender);
    }


    

}
