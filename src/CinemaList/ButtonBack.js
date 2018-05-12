import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import './SingleCinema.css';

class ButtonBack extends Component {
  render() {
    return (
      <div>
        <Link to={`/cinemas`}>
          <button className="btn-back-to-cinema">Вернутись до кінотеатрів</button>
        </Link>
      </div>
    )
  }
}

export default ButtonBack;