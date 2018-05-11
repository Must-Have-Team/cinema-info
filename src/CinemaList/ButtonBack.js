import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import './SingleCinema.css';

class ButtonBack extends Component {
  render() {
    return (
      <div className='btn-back-to-cinema'>
        <Link to={`/cinemas`}>
        <button type="button">Вернутись до кінотеатрів</button>
        </Link>
      </div>
    )
  }
}

export default ButtonBack;