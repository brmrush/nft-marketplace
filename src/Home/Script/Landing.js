import '../Style/Landing.css';
import ArtPicture from '../Images/art.png';
import React, {Component , useState} from 'react';
import { urlSource } from 'ipfs-http-client';


class Landing extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }


    }


    handleCreateClick = () => {
        this.props.setCurrentPage("create")
    } 
    handleBrowseClick = () => {
        this.props.setCurrentPage("browse")
    }


    render() {
        
        return (
            <div className='container-fluid bg-dark text-light border-bottom border-warning pt-2'>
                <div className='d-lg-flex align-items-center justify-content-around text-center text-sm-start m-3 p-2'>
                    <div className='col-1'></div>
                    {/* Explore & Create Texts*/}
                    <div className='d-flex flex-column flex-filil align-items-center justify-content-evenly m-2'>
                        <h1 className='fw-bold text-light'>Discover, collect, and sell extraordinary NFTs</h1>
                        <h4 className='text-light'>OpenSea is the world's first and largest NFT marketplace</h4>
                        <div className='d-flex align-items-center justify-content-evenly'>
                            <button className='land-button m-2 p-1' onClick={this.handleBrowseClick}>Browse</button>
                            <button className='land-button m-2 p-1' onClick={this.handleCreateClick}>Create</button>
                        </div>
                    </div>
                    {/* Image*/}
                    <div className='img-thumbnail d-flex flex-fill align-items-center justify-content-center box-img-shadow rounded m-3 p-2'>
                        <img src={ArtPicture} className="w-50 p-2 m-2" alt="..."></img>
                    </div>
                    <div className='col-1'></div>

                </div>
                <div className='gap-2'></div>
                {/* Create and Sell your NFT's */}
                <div className='d-md-flex align-items-center justify-content-around text-center mt-3 m-3 p-1 '>
                    <div className='col-1'></div>
                    <div className='d-flex flex-column align-items-center justify-content-center m-1 p-1 text-light text-break border-bottom border-secondary'>
                        <i className='bi bi-wallet h3 text-warning'></i>
                        <h5 className='fw-bold'>Set up your wallet</h5>
                        <p>Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the wallets we support.</p>
                    </div>
                    <div className='d-flex flex-column align-items-center justify-content-center m-1 p-1 text-light text-break border-bottom border-secondary'>
                        <i className='bi bi-diagram-3 h3 text-warning'></i>
                        <h5 className='fw-bold'>Create your collection</h5>
                        <p>Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.</p>
                    </div>
                    <div className='d-flex flex-column align-items-center justify-content-center m-1 p-1 text-light text-break border-bottom border-secondary'>
                        <i className='bi bi-easel2 h3 text-warning'></i>
                        <h5 className='fw-bold'>Add your NFTs</h5>
                        <p>Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats, and unlockable content.</p>
                    </div>
                    <div className='d-flex flex-column align-items-center justify-content-center m-1 p-1 text-light text-break border-bottom border-secondary'>
                        <i className='bi bi-basket h3 text-warning'></i>
                        <h5 className='fw-bold'>List them for sale</h5>
                        <p>Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!</p>
                    </div>
                    <div className='col-1'></div>

                </div>

            </div>
        );
    }
}

export default Landing;