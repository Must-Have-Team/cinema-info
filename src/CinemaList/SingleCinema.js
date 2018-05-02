import React, { Component } from 'react';
import CinemaStore from './CinemaStore';
import ButtonBack from './ButtonBack';
import './SingleCinema.css';

class SingleCinema extends Component {
  cinema =() => {
    const target = CinemaStore[this.props.match.params.id-1];
    return (
      <div>
        <div className="cinema-img-box">
        <img src={target.url} className="cinema-img" alt="cinema"/>
        </div>
        <h1 className="cinemaholl-name">{target.name}</h1>
        <p className="cinemaholl-street">{target.street}</p>
        <h1 className="seans">Розклад сеансів</h1>
      </div>
    )
  }
  render() {
    return(
      <div className="cinema2" onClick={this.cinema}>

        {this.cinema()}
        <ButtonBack />
      </div>
    )
  }

}

export default SingleCinema;