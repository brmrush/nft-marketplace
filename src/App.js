import './App.css';
import React, {Component , useState} from 'react';
import Web3 from 'web3';

import RushMarketplace from './abis/RushMarketplace.json';
import RushNft from './abis/RushNft.json';


import Navbar from './Home/Script/Navbar.js';
import Landing from './Home/Script/Landing';


import Browse from './Marketplace/Script/Browse.js';
import Create from './Marketplace/Script/CreateNft.js';
import MyItems from './Marketplace/Script/MyItems.js';



class App extends Component {

    componentDidMount = async () => {
        
        const saved = window.localStorage.getItem("account");


        const initialValue = saved;
        if (initialValue) {
            await this.connectWallet()
        }
    }

    connectWallet = async () => {
        await this.loadWeb3()
        const networkId = await this.state.web3.eth.net.getId()
        // if (networkId !== 3) {
        //     alert("Please switch to Ropsten Test Network.")
        //     return
        // }
        const accounts = await this.state.web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        window.localStorage.setItem("account", accounts[0])

        window.ethereum.on('accountsChanged', function (accounts) {
            window.location.reload()
            const account = accounts[0]
            window.localStorage.setItem("account", accounts[0])
            this.setState({ account })
        }.bind(this));
        window.ethereum.on('chainChanged', (_chainId) => 
            window.location.reload()
        )

        console.log(window.web3)
    }

    loadWeb3 = async () => {
        if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        const web3 = window.web3
        this.setState({ web3 })

        
        console.log("load contracts")

        await window.ethereum.enable()
        }
        else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
        this.loadNftContract()
        this.loadMarketplaceContract()
    }

    loadNftContract =  async () => {
        if (!this.state.web3) {
            console.log("Web3 is not defined")
            return
        }
        const abi = RushNft.abi
        const networkId = await this.state.web3.eth.net.getId()
        const nftContractData = RushNft.networks[networkId]
    
        const nftContract = new this.state.web3.eth.Contract(abi, nftContractData.address)
        
        // window.localStorage.setItem("blogContract", JSON.stringify(blogContract))
        
        this.setState({ nftContract })
    
    }

    loadMarketplaceContract =  async () => {
        if (!this.state.web3) {
            console.log("Web3 is not defined")
            return
        }
        const abi = RushMarketplace.abi
        const networkId = await this.state.web3.eth.net.getId()
        const marketplaceContractData = RushMarketplace.networks[networkId]
    
        const marketAddress = marketplaceContractData.address
        const marketplaceContract = new this.state.web3.eth.Contract(abi, marketAddress)
        
        

        this.setState({ marketplaceContract , marketAddress})
    
      }

      disconnect =  () => {
        window.localStorage.clear()
        this.setState( {
          account : null,
          web3 : null,
          blogContract : null,
          marketplaceContract : null,
          nftContract : null
        })
        window.location.reload()
      }
    



    setAccount = async (_account) => { this.setState({account : _account}) }
    setCurrentPage = (_page) => {this.setState( { currentPage : _page } ) 
        window.localStorage.setItem("currentPage", _page)
    }

    constructor(props) {
        super(props)
        this.state = {
            account : null,
            web3 : null,
            marketplaceContract : null,
            nftContract : null,
            currentPage : 'landing',
            marketAddress : null
        }


    }


    render() {
        
        return (
        <div>
            <Navbar account = {this.state.account}
                    setCurrentPage = {this.setCurrentPage}
                    connectWallet = {this.connectWallet}
                    
            />
            {
                this.state.currentPage === "landing" &&
                    <Landing account = {this.state.account}
                             setCurrentPage = {this.setCurrentPage}

                    />
            }
            {
                this.state.currentPage === "create" &&
                <>
                    <Create web3 = {this.state.web3}
                            nft = {this.state.nftContract}
                            marketplace = {this.state.marketplaceContract}
                            account = {this.state.account}    
                    />
                    <MyItems web3 = {this.state.web3}
                            nft = {this.state.nftContract}
                            marketplace = {this.state.marketplaceContract}
                            account = {this.state.account}    
                            marketAddress = {this.state.marketAddress}
                    />
                </>
            }
            {
                this.state.currentPage === "browse" && 
                <Browse web3 = {this.state.web3}
                        nft = {this.state.nftContract}
                        marketplace = {this.state.marketplaceContract}
                        account = {this.state.account}    
                />
            }
            {
                this.state.currentPage === "myItems" && 
                <MyItems web3 = {this.state.web3}
                        nft = {this.state.nftContract}
                        marketplace = {this.state.marketplaceContract}
                        account = {this.state.account}
                        marketAddress = {this.state.marketAddress}

                />
            }
                

            
        </div>
        );
    }
}

export default App;