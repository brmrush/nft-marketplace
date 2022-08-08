import '../Style/CreateNft.css';
import React, {Component , useState} from 'react';
import axios from 'axios';

class Landing extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemList : [],
            tokenList : [],
            tokenIds : []
        }


    }

    componentDidMount = async () => {
        if (!this.props.marketplace || !this.props.nft) return
            const _itemList = []
            const _tokenList = []
            const _tokenIds = []
            const totalItems = await this.props.marketplace.methods.getItemCounter().call()
            for (let i = 0 ; i < totalItems; i++) {
                let item = await this.props.marketplace.methods.getItemById(i).call()
                // console.log(item)
                const tokenURI = await this.props.nft.methods.tokenURI(item.tokenID).call()
                const contents = (await axios.get(tokenURI)).data
                console.log(contents.description)
                if(!item.itemSold) {
                    _itemList.push(item)
                    _tokenIds.push(item.tokenID)
                    _tokenList.push(contents)
                }
            }
            console.log(_itemList)
            this.setState( { itemList : _itemList , tokenList : _tokenList , tokenIds : _tokenIds} )

            // const _tokenIds = []
            // for (let i = 0; i < totalItems.length; i++) {
            //     const tokenURI = await this.props.nft.methods.tokenURI(totalItems[i]).call()
            //     _tokenIds.push(totalItems[i])
            //     console.log(tokenURI)
            //     const contents = (await axios.get(tokenURI)).data
            //     allItems.push(contents)
            // }
            // console.log(allItems)
            // this.setState( { myItems : allItems , tokenIds : _tokenIds} )
    }

    purchaseItem = async ( marketItem ) => {
        if (!this.props.nft || !this.props.marketplace) return
        const priceInWei = this.props.web3.utils.toWei(marketItem.price , 'ether')
        const tx = await this.props.marketplace.methods.purchaseItem(marketItem.marketItemID).send( { from : this.props.account , value : priceInWei} ).then(function(receipt) {
        console.log("Transaction is mined with txHash : ")
        window.location.reload()
        console.log(receipt.transactionHash)}).catch((e)=> {
            console.log("Transaction denied by user.")
            console.log(e.code)
        })

    }

    getBalance = async (  ) => {
        if (!this.props.nft || !this.props.marketplace) return
        const tx = await this.props.marketplace.methods.getBalance().call()
        console.log(tx)
    }



    render() {
        
        return (
            <div className='container-fluid bg-dark text-light border-bottom border-warning pt-2 text-center'>
                <p className='bg-light text-dark fw-bold border border-secondary rounded p-2 m-2'> MARKET ITEMS </p>
                <div className='row'>
                {!this.state.itemList.length && <div className='vh-100 d-flex align-items-center justify-content-center'> There are no items in the market. </div>}
                {this.state.itemList.map((item , count) => (
                    <div className='col-md-4 col-6 ' key = {count}>                    
                        <div className="card text-dark p-1 ms-3 m-3 ">
                            <img src={this.state.tokenList[count].image} className="img-thumbnail card-img-top" alt="..."/>
                            <div className="card-body">
                                <p className="card-title h3">{this.state.tokenList[count].name}</p>
                                <p className="card-title h6">Token Id : {item.tokenID}</p>
                                <p className="card-text"> {this.state.tokenList[count].description} </p>
                                <p className="card-title h6">Price : {item.price} ETH</p>
                                <button className="btn btn-primary" onClick={() => this.purchaseItem( item )}>Purchase</button>
                                <p className="card-text">Seller : {item.seller}</p>
                            </div>
                        </div>
                    </div>
                ))}

                </div>
                <button className='btn-danger' onClick={this.getBalance}>get balance</button>
            </div>
        );
    }
}

export default Landing;