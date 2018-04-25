import React, { Component } from "react";
import Slider from './Slider/Slider.js'
import Movies from './Allmovies/allmovies.js'

class Home extends Component {
  render() {
    return (
      <div>
        <Slider />
        <Movies />
      </div>
    );
  }
}

export default Home;