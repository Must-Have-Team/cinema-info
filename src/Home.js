import React, { Component } from "react";
import Slider from './Slider/Slider'
import SearchForm from './SearchForm/SearchForm';
import Movies from './Allmovies/AllMovies'
import FilmStore from './Allmovies/Film-store'

class Home extends Component {
  render() {
    return (
      <div>
        <SearchForm items={FilmStore}/>
        <Slider />
        <Movies />
      </div>
    );
  }
}

export default Home;