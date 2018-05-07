import React, { Component } from 'react';
import CinemaStore from './CinemaStore';
import ButtonBack from './ButtonBack';
import './SingleCinema.css';

class SingleCinema extends Component {
  state = {
    showTechnology: false,
    showDescrioption: false
  }

  handleClickTechnology = ()=>{
    const show = this.state.showTechnology;
    this.setState({ showTechnology: !show });
  }

  handleDescriptionClick =()=> {
    const isShow = this.state.showDescrioption;
    this.setState({ showDescrioption: !isShow });
  }

  cinema =() => {
    const target = CinemaStore[this.props.match.params.id-1];
    return (
      <div>
        <div className="cinema-img-box">
        <img src={target.url} className="cinema-img" alt={target.name}/>
        </div>
        <h1 className="cinemaholl-name">{target.name}</h1>
        <p className="cinemaholl-street">{target.street}</p>
      </div>
    )
  }

  render() {

    let technology = null;
    if(this.state.showTechnology) {
      const target = CinemaStore[this.props.match.params.id - 1];
      technology = (
        <div className="technology-box">{target.technology.split('\n').map((item, key) => {
          return <p key={key}>{item}<br /></p>
        })}</div>
      )
    }

    let description = null;

    if(this.state.showDescrioption) {
      const target = CinemaStore[this.props.match.params.id - 1];

      description = (
        <div className="description-box">{target.description.split('\n').map((item, key) => {
          return <p key={key}>{item}<br /></p>
        })}</div>
      )
    }
    return(
      <div className="cinema-holl" onClick={this.cinema}>
        {this.cinema()}
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
        <ButtonBack />
      </div>
    )
  }

}

export default SingleCinema;