import React, { Component } from "react";
import {
    NavLink
  } from "react-router-dom";
  import './index.css';
  import logo from './img/logo.png';


class Navbar extends Component {

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="/"><logo /></a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item popcorn">
            <NavLink exact to="/">Popcorn</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/cinemas">Кінотеатри</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/contact">Контакти</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/login">Вхід</NavLink>
            </li>
          </ul>

        </div>
      </nav>

    );
  }
}
export default Navbar;





