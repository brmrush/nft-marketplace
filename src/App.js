import './App.css';
import React, {Component , useState} from 'react';
import Web3 from 'web3';

import Navbar from './Home/Script/Navbar.js';
import Landing from './Home/Script/Landing';

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
        const accounts = await this.state.web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        window.localStorage.setItem("account", accounts[0])
        window.ethereum.on('accountsChanged', function (accounts) {
        const account = accounts[0]
        console.log(account)
        this.setState({ account })
        }.bind(this));

        console.log(window.web3)
    }

    loadWeb3 = async () => {
        if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        const web3 = window.web3
        this.setState({ web3 })
        await window.ethereum.enable()
        }
        else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    setAccount = async (_account) => { this.setState({account : _account}) }


    constructor(props) {
        super(props)
        this.state = {
        account : null,
        web3 : null,
        }


    }


    render() {
        
        return (
        <div>
            <Navbar account = {this.state.account}/>
            <Landing account = {this.state.account}/>
            
        </div>
        );
    }
}

export default App;