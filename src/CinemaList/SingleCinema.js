import React, { Component } from 'react';
import axios from 'axios';
import ButtonBack from './ButtonBack';
import './SingleCinema.css';

const BASE_URL = 'http://localhost:3001';


class SingleCinema extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showTechnology: false,
      showDescrioption: false
    }
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/api/cinemas`)
      .then(res => {
        const currentData = res.data.filter( item =>
           {return item.id.toString() === this.props.match.params.id})
        this.setState({ data: currentData })
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

  cinema =() => {
    const item = this.state.data[0];
    if(!item) {
      return (
        <div>Loading</div>
      )
    }else{
      return (
        <div>
          <div className="cinema-img-box">
            <img src={item.url} className="cinema-img" alt={item.name} />
          </div>
          <h1 className="cinemaholl-name">{item.name}</h1>
          <p className="cinemaholl-street">{item.street}</p>
        </div>
      )
    }
    console.log(item);
  }

  render() {
    let technology = null;
    if (this.state.showTechnology) {
        const item = this.state.data[0];
        console.log(item.technology);
      technology = (
        <div className="technology-box" >
          {item.technology.split('\n').map((item, key) => {
            return <p key={key}>{item}<br /></p>
          })
          }
        </div >
      )}

    let description = null;
    if (this.state.showDescrioption) {
        const item = this.state.data[0];
      description = (
         <div className= "description-box" >
         {item.description.split('\n').map((item, key) => {
            return <p key={key}>{item}<br /></p>
            })
        }
        </div >
      )}

     return(
        <div className="cinema-holl" onClick={this.cinema}>
          {this.cinema()}
          <div className="description-holder">
            <button className="description-btn"
              onClick={this.handleDescriptionClick}>Опис</button>
          </div>
          {description}
          <div className="technology-holder">
            <button className="technology-btn" 
              onClick={this.handleClickTechnology}>Технології</button>
          </div >
          {technology}
       <ButtonBack />
      </div>
    )
  }

}

export default SingleCinema;