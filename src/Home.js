import React, { Component } from "react";
import Slider from './Slider/Slider'
import Movies from './Allmovies/AllMovies'

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