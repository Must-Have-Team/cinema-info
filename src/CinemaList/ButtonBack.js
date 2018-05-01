import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import './Cinema.css';

class ButtonBack extends Component {
  render() {
    return (
      <div className='btn-back-to-cinema'>
        <Link to={`/cinemas`}>
        <button type="button">Вернутись назад</button>
        </Link>
      </div>
    )
  }
}

export default ButtonBack;