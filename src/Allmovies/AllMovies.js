import React, {Component} from 'react';
import axios from 'axios';
import './AllFilm.css';
import GetPoster from '../Poster/GetPoster';
import {
  Link
} from 'react-router-dom'

const BASE_URL = 'https://popcorn-studio-17.herokuapp.com';

class Movies extends Component{
  constructor(props) {
    super(props);
    this.state = ({ data: [] })
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/api/films`)
      .then(res => {
        this.setState({ data: res.data });
      })
  }

  renderFilm = (el) => {
    return (
      <div className="film-box" key={el.id} id={el.id}>
        <Link className="title-link" to={`/film/${el.id}`}>
        <GetPoster filmId={el.id}/>
          <div className="film-info">
            <p className="film-name">{el.title}</p>
            <span className="film-raiting ">{el.raiting}</span>
          </div>
        </Link>
      </div>

    )
  }
  handleFilmClick=()=> {
    let show = this.state.showFilm;
    this.setState({ showFilm: !show })
  }
  render(){
    return (
      <div className="parallax">
      <div className="film-list row ">
         <h2 className="actual mx-auto">Актуальне у кіно</h2>
        <div className="film-box-holder">
          {this.state.data.map(this.renderFilm)}
        </div>
          <div className="btn-all-film mx-auto">
            <button className="btn-film" onClick={this.handleFilmClick}>Всі фільми</button>
          </div>
        </div>
      </div>
    )
  }
}
export default Movies;
