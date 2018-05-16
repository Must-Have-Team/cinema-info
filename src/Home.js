import React, { Component } from "react";
import Slider from './Slider/Slider'
import Movies from './Allmovies/AllMovies'
import Footer from './Footer'

class Home extends Component {
  render() {
    return (
      <div>
        <Slider />
        <Movies />
        <Footer />
      </div>
    );
  }
}

export default Home;