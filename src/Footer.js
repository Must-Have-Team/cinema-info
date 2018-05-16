import React, { Component } from "react";
import Map from './googleMap/GoogleMap';
import {
    NavLink
  } from "react-router-dom"; 

class Footer extends Component {
    
  render() {
    return (
        <footer className='myFooter'>
        <div className="container p-0">
            <div className="row">
                <div className="col-sm-4">
                    <h5>Get started</h5>
                    <ul>
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                    </ul>
                </div>
                <div className="col-sm-4">
                    <h5>About us</h5>
                    <ul>
                        <li><a>Company Information</a></li>
                        <li><a>Contact us</a></li>
                    </ul>
                </div>
                <div className="col-sm-4">
                    <h5>Support</h5>
                    <ul>
                        <li><a>FAQ</a></li>
                        <li><a>Help desk</a></li>
                    </ul>
                </div>
            </div>
            <Map isMarkerShown />
        </div>
        <div className="social-networks">
            <a href="#" className="twitter"><i className="fa fa-twitter"></i></a>
            <a href="#" className="facebook"><i className="fa fa-facebook"></i></a>
            <a href="#" className="google"><i className="fa fa-google-plus"></i></a>
        </div>
        <div className="footer-copyright">
            <p>© 2018 POPCORN </p>
        </div>
    </footer>
    );
  }
}
 
export default Footer;