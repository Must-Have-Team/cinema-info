import React, { Component } from 'react';
import axios from 'axios';
import Stars from '../starRating/StarRating';
import Footer from '../Footer';
import './style.css';
import GetPoster from '../Poster/GetPoster';
import GetTrailer from '../Trailer/Trailer';
import DataTableFilm from '../DataTable/DataTableFilm';


const BASE_URL = 'https://popcorn-studio-17.herokuapp.com';

class SingleMovie extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [],
    isShow: false }
  }

  componentWillMount() {
    axios.get(`${BASE_URL}/api/films`)
      .then(res => {
        const currentFilms = res.data.filter(item => item.id.toString() === this.props.match.params.id);
        this.setState({ data: currentFilms });
      })
  }
  handleClickTrailer=()=> {
    const isShow = this.state.isShow;
    this.setState({ isShow : !isShow });
  }
  render() {
    console.log(this.state.data);

    let ganre = this.state.data.map(el => el.genres.map(item => item.name+" " ));
    let country = this.state.data.map(el => el.countries.map(item => item.name+" "));
    let duration = this.state.data.map(el => el.duration);

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
              <div className="col-lg-4 col-md-12 rate-box">
                <GetPoster filmId={stateData.id}/>
                <p>Оцініть цей фільм</p>
              <Stars star={stateData.rating/2}/>
              </div>
              <div className="col-lg-8">
              <h1 className="title-stl">{stateData.title}({stateData.title_orig})</h1>
              <div className='sub-info-box'>
              <p>Жанр: {ganre}</p>
              <p>Країна: {country}</p>
              <p>Час: {duration} хв.</p>
              </div>
              <div className="descr-box col-md-12" dangerouslySetInnerHTML={{ __html: stateData.description }}></div>
              </div>
            <button className="trailer-btn" type="button"
              onClick={this.handleClickTrailer}>Трейлер<span className="open"></span></button>
            <div className="trailer">
              {this.state.isShow ? <GetTrailer filmId={stateData.id} /> : ''}
            </div>
          </div>

            </div>
          <div className="description-holder">
               <DataTableFilm filmId={stateData.id} />
          </div>
        </div>
    }
    return (
      <div>
        {item}
      <Footer />
      </div>
    )
  }
}
export default SingleMovie;
