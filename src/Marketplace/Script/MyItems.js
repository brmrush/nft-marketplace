import '../Style/MyItems.css';
import React, {Component , useState} from 'react';
import axios from 'axios';

class Landing extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nftList : [],
            myItems : [],
            tokenIds : [],
            price : null,
            loading : false
        }


    }
    

    componentDidMount = async () => {
        if (!this.props.marketplace || !this.props.nft) return
            const totalItems = await this.props.nft.methods.getUserTokens(this.props.account).call()
            const allItems = []
            const _tokenIds = []
            for (let i = 0; i < totalItems.length; i++) {
                const tokenURI = await this.props.nft.methods.tokenURI(totalItems[i]).call()
                _tokenIds.push(totalItems[i])
                console.log(tokenURI)
                const contents = (await axios.get(tokenURI)).data
                allItems.push(contents)
            }
            console.log(allItems)
            this.setState( { myItems : allItems , tokenIds : _tokenIds} )
    }


    getItems = async () => {
        if (!this.props.marketplace || !this.props.nft) return
            const totalItems = await this.props.nft.methods.getUserTokens(this.props.account).call()
            const allItems = []
            for (let i = 0; i < totalItems.length; i++) {
                const tokenURI = await this.props.nft.methods.tokenURI(totalItems[i]).call()
                console.log(tokenURI)
                const contents = (await axios.get(tokenURI)).data
                allItems.push(contents)
            }
            console.log(allItems)
            this.setState( { myItems : allItems } )
    }

    createSale = async (index) => {
        if (!this.props.marketplace || !this.props.nft) return
        this.setState( {loading : true} )
        const _tokenId = this.state.tokenIds[index]
        console.log("index is : " + index)
        console.log("Token Id is  : " + _tokenId)
        console.log(this.state.tokenIds)
        let flag = false
        const approveTx = await this.props.nft.methods.approve(this.props.marketAddress, _tokenId).send( { from : this.props.account} ).then(function(receipt) {

            console.log("Transaction is mined with txHash : ")
            console.log(receipt.transactionHash)}).catch((e)=> {
                this.setState( {loading : false} )
                console.log("Transaction denied by user.")
                flag = true

        })

        const createSaleTx = await this.props.marketplace.methods.createSale(_tokenId, this.state.price).send( { from : this.props.account} ).then(function(receipt) {

            console.log("Transaction is mined with txHash : ")
            console.log(receipt.transactionHash)}).catch((e)=> {
                this.setState( {loading : false} )
                console.log("Transaction denied by user.")

        })
        
        this.setState( {loading : false} )
        if (!flag) {
            window.location.reload()
        }

    }


    render() {
        return (
            <div className='container-fluid bg-dark text-light border-bottom border-warning pt-2 text-center'>
                <p className='bg-light text-dark fw-bold border border-secondary rounded p-2 m-2'> MY ITEMS </p>
                <div className='row'>
                {!this.state.myItems.length && <div className='vh-100 d-flex align-items-center justify-content-center'> You have no items. </div>}
                {this.state.myItems.map((item , count) => (
                    <div className='col-md-4 col-6 ' key = {count}>                    
                        <div className="card text-dark p-1 ms-3 m-3 ">
                            <img src={item.image} className="img-thumbnail card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.description}</p>
                                <div>
                                    <label>Price</label>
                                    <input required type="number" min={0} className="form-control m-1" 
                                    onChange={(e) => this.setState({ price : e.target.value})}/>
                                </div>
                                {
                                    this.state.loading ?
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    :
                                    <div>
                                        <a href="#" className="btn btn-primary" onClick={() => this.createSale( count )}>Create Sale</a>
                                    </div>
                                
                                }
                            </div>
                        </div>
                    </div>
                ))}

                </div>
            </div>
        );
    }
}

export default Landing;