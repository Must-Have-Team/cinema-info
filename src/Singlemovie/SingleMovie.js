import React, { Component } from 'react';
import axios from 'axios';
import Stars from '../starRating/StarRating';
import './style.css';

const BASE_URL = 'http://localhost:3001';

class SingleMovie extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] }
  }

  componentWillMount() {
    axios.get(`${BASE_URL}/api/films`)
      .then(res => {
        const currentFilms = res.data.filter(item => item.id.toString() === this.props.match.params.id);
        this.setState({ data: currentFilms });
      })
  }

  render() {
    let item = '',
        descr = '',
        stateData = this.state.data[0]
    if (this.state.data.length === 0) {
      item = <div>Loading...</div>
    } else {
      item =
        <div className="film">
          <div className="container exact">
            <div className="row">
              <div className="col">
                <img className="img" src={stateData.url} alt="image" />
                <h1>{stateData.title}({stateData.title_orig})</h1>
                <p>{stateData.raiting}</p>
                <p>Rate this movie</p>
                <Stars />
              </div>
              <div className="col">
                <div dangerouslySetInnerHTML={{ __html: stateData.description }}></div>
              </div>
            </div>
          </div>
        </div>
    }
    return (
      <div>
        {item}
      </div>
    )
  }
}
export default SingleMovie;
