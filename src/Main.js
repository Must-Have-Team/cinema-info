import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";
import Login from "./Login/Login";
import Navbar from './Navbar'
import Footer from './Footer'
import SingleMovie from './Singlemovie/SingleMovie'

class Main extends Component {
    render() {
      return (
        <Router>
          <div>
          <Navbar />
          
            <div className="content">
                <Route exact path="/" component={Home}/>
                <Route path="/stuff" component={Stuff}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/login" component={Login}/>
                <Route path="/film/:id" component={SingleMovie}/>
            </div>
            
            <Footer />
          </div>
        </Router>
      );
    }
  }

export default Main;