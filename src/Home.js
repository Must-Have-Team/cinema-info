import React, { Component } from "react";
import Slider from './Slider/Slider'
import SearchForm from './SearchForm/SearchForm';
import Movies from './Allmovies/AllMovies'

class Home extends Component {
  render() {
    return (
      <div>
        <SearchForm />
        <Slider />
        <Movies />
      </div>
    );
  }
}

export default Home;