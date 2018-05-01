import React, { Component } from "react";
import {
    NavLink
  } from "react-router-dom";


class Navbar extends Component {

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="/">LOGO</a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
            <NavLink exact to="/">Home</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/cinemas">Кінотеатри</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/contact">Contact</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/login">Login</NavLink>
            </li>
          </ul>

        </div>
      </nav>

    );
  }
}
export default Navbar;





