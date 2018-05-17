import React, { Component } from 'react';
import axios from 'axios';
import './Cinema.css';
import {
  Link
} from 'react-router-dom';
import Footer from '../Footer'

const BASE_URL = 'https://popcorn-studio-17.herokuapp.com';

class Cinema extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    axios.get(`${BASE_URL}/api/cinemas`)
    .then(res => {
      this.setState({ data: res.data })
    })
  }
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
      <div>
      <div className="cinema-list" >
        <h2 className="text-list">Список кінотеатрів у місті
        <select className="cinema-select">
          <option>Львів</option>
          <option>Київ</option>
          <option>Чернівці</option>
          <option>Одесса</option>
          <option>Ужгород</option>
        </select></h2>
        <hr/>
         <div className="cinema-box-holder">
          {this.state.data.map(this.renderCinema)}
        </div>
      </div>
      <Footer />
      </div>
    )
  }
}

export default Cinema;