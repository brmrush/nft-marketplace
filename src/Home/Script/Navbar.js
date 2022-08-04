import '../Style/Navbar.css';
import React, {Component , useState} from 'react';


class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }


    }


    render() {
        
        return (
            <div className='container-fluid bg-dark text-light border-bottom border-warning pt-2'>
                <nav className="navbar">
                    <a className="d-flex navbar-brand text-light align-items-center justify-content-center text-center" href="#">
                        <p className='h4'>Marketplace</p>
                        <i className='bi bi-app-indicator text-warning h3'></i>
                    </a>
                        {this.props.account ?
                        <div className='d-md-flex align-items-center justify-content-center text-center'>
                            <p className='m-1 fw-bold raleway text-light'>{this.props.account.slice(0,8)}... </p>
                            <button className='btn btn-sm m-1  btn-warning'>DISCONNECT</button>
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