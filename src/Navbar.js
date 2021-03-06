import React, { Component } from "react";
import {
    NavLink
  } from "react-router-dom";
  import './index.css';


class Navbar extends Component {

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavLink to="/"><span className="navbar-brand">PopcornStudio</span></NavLink>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
            <NavLink exact to="/">Головна</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/afisha">Афіша</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/cinemas">Кінотеатри</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/about">Про Нас</NavLink>
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





