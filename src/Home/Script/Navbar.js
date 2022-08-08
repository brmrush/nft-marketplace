import '../Style/Navbar.css';
import React, {Component , useState} from 'react';


class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }


    }

    handleLandingClick = () => {
        this.props.setCurrentPage("landing")
    }
    handleCreateClick = () => {
        this.props.setCurrentPage("create")
    } 
    handleBrowseClick = () => {
        this.props.setCurrentPage("browse")
    }
    handleMyItemsClick = () => {
        this.props.setCurrentPage("myItems")
    }


    render() {
        
        return (
            <div className='container-fluid bg-dark text-light border-bottom border-warning pt-2 sticky-top'>
                <nav className="navbar">
                    <a className="d-flex d-md-block d-none navbar-brand text-light align-items-center justify-content-center text-center" href="#">
                        <p className='h4'>Marketplace</p>
                        <i className='bi bi-app-indicator text-warning h3'></i>
                    </a>
                        {this.props.account ?
                        <div className='d-md-flex align-items-center justify-content-center text-center'>
                                <button className='nav-button  m-1' onClick={this.handleLandingClick}>Home</button>
                                <button className='nav-button  m-1' onClick={this.handleBrowseClick}>Browse</button>
                                <button className='nav-button  m-1' onClick={this.handleCreateClick}>Create</button>
                                <button className='nav-button  m-1' onClick={this.handleMyItemsClick}>My Items</button>

                            <p className='m-1 fw-bold raleway text-light'>{this.props.account.slice(0,8)}... </p>
                        </div>
                        :
                        <></>
                        }
                </nav>
            </div>
        );
    }
}

export default Navbar;