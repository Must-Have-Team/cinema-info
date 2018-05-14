import React, { Component } from 'react';
import axios from 'axios';
import ButtonBack from './ButtonBack';
import './SingleCinema.css';
import ResponsiveTable from '../DataTable/Table';

const BASE_URL = 'http://localhost:3001';

class SingleCinema extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      data: '',
      showTechnology: false,
      showDescrioption: false
     })
  }

  componentWillMount() {
    axios.get(`${BASE_URL}/api/cinemas`)
      .then(res => {
        const currentCinema = res.data.filter(item =>
          item.id.toString() === this.props.match.params.id);
        this.setState({ data: currentCinema });
      })
  }


  handleClickTechnology = () => {
    const show = this.state.showTechnology;
    this.setState({ showTechnology: !show });
    }

  handleDescriptionClick =() => {
    const isShow = this.state.showDescrioption;
    this.setState({ showDescrioption: !isShow });
  }


  render() {
    let technology = null;
    if(this.state.showTechnology) {
      const item = this.state.data[0];
      technology = (
        <div className="technology-box">{item.technology.split('\n').map((item, key) => {
          return <p key={key}>{item}<br /></p>
        })}</div>
      )
    }

    let description = null;

    if(this.state.showDescrioption) {
      const item = this.state.data[0];

      description = (
        <div className="description-box">{item.description.split('\n').map((item, key) => {
          return <p key={key}>{item}<br /></p>
        })}</div>
      )
    }

    let item = '';
    let stateData = this.state.data[0];

    if (this.state.data.length === 0) {
      item = <div>Loading...</div>
    } else {
      item = <div>
        <div className="cinema-img-box">
          <img src={stateData.url} className="cinema-img" alt="cinema" />
        </div>
        <h1 className="cinemaholl-name">{stateData.name}</h1>
        <p className="cinemaholl-street">{stateData.address}</p>
      </div>
    }

    return(
      <div className="cinema-holl" onClick={this.cinema}>
        {item}
      <div className="description-holder">
          <button className="description-btn" type="button"
         onClick={this.handleDescriptionClick}>Опис</button>
      </div>
        {description}
      <div className="technology-holder">
        <button className="technology-btn" type="button"
         onClick={this.handleClickTechnology}>Технології</button>
      </div>
      {technology}
      <ResponsiveTable cinemaId={this.props.match.params.id}/> 
       <ButtonBack />
      </div>
    )
  }

}

export default SingleCinema;