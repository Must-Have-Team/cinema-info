import React, {Component} from 'react';
import axios from 'axios';
import Star from '../starRating/StarRating';
import './AllFilm.css';
import GetPoster from '../Poster/GetPoster';
import {
  Link
} from 'react-router-dom'

const BASE_URL = 'https://popcorn-studio-17.herokuapp.com';

class Movies extends Component{
  constructor(props) {
    super(props);
    this.state = ({
       data: [],
       twelvefilms: [],
      showFilms: false
      })

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
              <span className="film-raiting "><Star star={el.rating / 2} /></span>
              <p className="film-name">{el.title}</p>
            </div>
          </Link>
        </div>
      )
 }

  handleFilmClick=()=> {
    let show = this.state.showFilms;
    this.setState({ showFilms: !show })
  }

  showAll= () => {
    this.setState({
      showFilms: !this.state.showFilms
    })
  }

  render() {
     let film= [];

     if(film.length < 13) {
       for(let i=0; i< 12; i++) {
         film.push(this.state.data[i])
       }
     }
     let item = '';
     if(this.state.data.length === 0){
      item = (
        <div>Loading..</div>
      )
     } else {
       item = film.map(this.renderFilm);
     }
    return (
      <div className="parallax">
      <div className="film-list row ">
         <h2 className="actual mx-auto">Актуальне у кіно</h2>
        <div className="film-box-holder">
            {!this.state.showFilms ? item : this.state.data.map(this.renderFilm)}
        </div>
          <div className="btn-all-film mx-auto">
            <button onClick={this.showAll} className="btn-film">{this.state.showFilms ? "Сховати фільми" : "Всі фільми"}</button>
          </div>
        </div>
      </div>
    )
  }
}
export default Movies;
