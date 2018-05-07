import React, {Component} from 'react';
import './AllFilm.css';
import FilmStore from './Film-store';
import {
  Link
} from 'react-router-dom'

class Movies extends Component{
  state = {
    showFilm: false
  }
  renderFilm = (el) => {
    return (
      <div className="film-box" key={el.id} id={el.id}>
        <Link className="title-link" to={`/film/${el.id}`}>
          <img className="img-box" src={el.url} alt="filmImg" />
          <div className="film-info">
            <p className="film-name">{el.name}</p>
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
          {FilmStore.map(this.renderFilm)}
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
