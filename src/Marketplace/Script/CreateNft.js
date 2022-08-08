import '../Style/CreateNft.css';
import React, {Component , useState} from 'react';

import { create as ipfsHttpClient } from 'ipfs-http-client'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

class Landing extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name : '',
            description : '',
            image : '',
            loading : false
        }


    }

    uploadFile = async (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        if (typeof file !== 'undefined') {
            console.log(file.size)
          try {
            const result = await client.add(file)
            console.log(result)
            this.setState({ image : `https://ipfs.infura.io/ipfs/${result.path}` })
            console.log(this.state.image)
          } catch (error){
            console.log("ipfs image upload error: ", error)
          }
        } else {
            console.log("No file.")
        }
    }

    createNFT = async () => {
        console.log("Inside createNft")
        if (!this.state.image || !this.state.name || !this.state.description) return
        console.log("After empty checks.")

        try{
            this.setState( {loading : true} )

            const image = this.state.image
            const name = this.state.name
            const description = this.state.description
            const obj = {name, description, image}
            const objJSON = JSON.stringify(obj)
            const result = await client.add(JSON.stringify(obj, null, 4))
            console.log(result)
            this.mintNft(result)
        } catch(error) {
            console.log("ipfs uri upload error: ", error)
            this.setState( {loading : false} )
        }

    }

    mintNft = async (result) => {

        console.log("inside mintNft")
        if (!this.props.nft || !this.props.marketplace) return
        console.log("after mintNft empty checks")
        const uri = `https://ipfs.infura.io/ipfs/${result.path}`
        const tx = await this.props.nft.methods.mint(uri).send( { from : this.props.account} ).then(function(receipt) {
            console.log("Transaction is mined with txHash : ")
            console.log(receipt.transactionHash)}).catch((e)=> {
                console.log("Transaction denied by user.")
                console.log(e.code)
            })
        this.setState( {loading : false} )

    }



    // addPost = async (text) => {
    //     if (!this.state.blogContract) {
    //       console.log("No contract")
    //       return
    //     }
    //     if (!text) {
    //       alert("You can't post an empty string.")
    //       return
    //     }
    
    //     console.log(text)
    //     this.setState( {loading : true})
    //     const cont = "qwerty"
    //     const tx = await this.state.blogContract.methods.postNewPost(text, this.state.account).send({from : this.state.account}).then(function(receipt){
    //       console.log("Transaction is mined with txHash : ")
    //       console.log(receipt.transactionHash)
          
    //     }).catch((e)=>{
    //         console.log("Canceleld by usred")
    //         console.log(e.code)
    //       })
    //       await this.getAllPosts()
    //       this.setState( {loading : false})
    //   }
    // mintNft = async () => {
    //     if (!this.state.image || !this.state.price || !this.state.name || !this.state.description) return

    //     try{
    //         const image = this.state.image
    //         const price = this.state.price
    //         const result = await client.add(JSON.stringify(this.state.image, this.state.price, this.state.name, this.state.description))
    //     //   mintThenList(result)
    //     } catch(error) {
    //         console.log("ipfs uri upload error: ", error)
    //     }
    // }


    render() {
        
        return (
            <div className='container-fluid bg-dark text-light border-bottom border-warning pt-2 text-center'>
                <div className="input-group mb-3 align-items-center justify-content-center">
                    <div className='d-flex flex-column'>
                    <div>
                        <label>File</label>
                        <input required onChange={this.uploadFile} type="file" className="form-control m-1"/></div>                        
                    <div>
                        <label>Name</label>
                        <input required type="text" className="form-control m-1" rows={10} onChange={(e) => this.setState({ name : e.target.value})} /></div>
                    <div>
                        <label>Description</label>
                        <textarea required size="lg"  as="textarea" placeholder="Description"
                                  className="form-control m-1 text-break h-8rem"  maxLength={256} 
                                  style={{ resize: "none" }}
                                  onChange={(e) => this.setState({ description : e.target.value})}
                                  />
                    </div>
                    {
                                    this.state.loading ?
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    :
                                    <div>
                                        <a href="#" className="btn btn-primary" onClick={() => this.createNFT( )}>Create</a>
                                    </div>
                                
                                }
                </div>
            </div>
            </div>

        );
    }
}

export default Landing;