import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";
import Login from "./Login";
import Navbar from './Navbar'
import Footer from './Footer'

class Main extends Component {
    render() {
      return (
        <HashRouter>
          <div>
          <Navbar />
            <div className="content">
                <Route exact path="/" component={Home}/>
                <Route path="/stuff" component={Stuff}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/login" component={Login}/>
            </div>
            <Footer />
          </div>
        </HashRouter>
      );
    }
  }

export default Main;