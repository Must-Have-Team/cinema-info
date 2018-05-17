import React, { Component } from "react";
import Map from './googleMap/GoogleMap';
import {
    NavLink
  } from "react-router-dom";

class Footer extends Component {
    constructor(props) {
        super(props)
    }
  render() {
    return (
        <footer className='myFooter'>
        <div className="container p-0">
            <div className="row">
                <div className="col-sm-4">
                    <h5>Почати</h5>
                    <ul>
                        <li><NavLink exact to="/">Головна</NavLink></li>
                        <li><NavLink to="/login">Увійти</NavLink></li>
                    </ul>
                </div>
                <div className="col-sm-4">
                <h5>Зв'язок</h5>
                    <ul>
                        <li><NavLink to="/contact">Контакти</NavLink></li>
                    </ul>
                </div>
                <div className="col-sm-4">
                    <h5>Підтримка</h5>
                    <ul>
                        <li><NavLink exact to="/about">Наша Команда</NavLink></li>
                    </ul>
                </div>
            </div>
            <Map isMarkerShown  id={this.props.id}/>
        </div>
        <div className="social-networks">
                <a href="https://twitter.com/dan_abramov" className="twitter"><i className="fa fa-twitter"></i></a>
                <a href="https://www.facebook.com/EPAM.Lviv/" className="facebook"><i className="fa fa-facebook"></i></a>
                <a href="https://www.google.com.ua/" className="google"><i className="fa fa-google-plus"></i></a>
        </div>
        <div className="footer-copyright">
            <p>© 2018 POPCORN STUDIO</p>
        </div>
    </footer>
    );
  }
}

export default Footer;