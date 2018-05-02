import React, { Component } from 'react';
import CinemaStore from './CinemaStore';
import './Cinema.css';
import {
  Link
} from 'react-router-dom';


class Cinema extends Component {
  renderCinema =(el)=> {
    return (
      <div className="cinema-box" key={el.id} id={el.id}>
        <Link className="title-link" to={`/cinema/${el.id}`}>
          <div className="cinema">
          <div>
            <img className="cinema-logo " src={el.logo} alt="cinema-logo" />
          </div>
          <div className="cinema-info">
            <p className="cinema-name">{el.name}</p>
            <p>Розташування: {el.street}</p>
            <p>Графік роботи: {el.schedule}</p>
            <p>Сайт: <a href={el.web}>{el.web}</a></p>
        </div>
        </div>
        </Link>
      </div>
    )
  }
  render() {
    return (
      <div className="cinema-list" >
        <h2 className="text-list row justify-content-center">Список кінотеатрів у місті
        <select className="cinema-select">
          <option>Львів</option>
          <option>Київ</option>
          <option>Чернівці</option>
          <option>Одесса</option>
          <option>Ужгород</option>
        </select></h2>
         <div className="cinema-box-holder">
          {CinemaStore.map(this.renderCinema)}
        </div>
      </div>
    )
  }
}

export default Cinema;