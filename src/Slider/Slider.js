import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SliderStore from './Slider-store';
import Labels from './Labels';

import SearchForm from '../SearchForm/SearchForm';

import './Slider.css';

class Slider extends Component {
  constructor(props){
    super(props);
    this.state = { current : 0, isHover : false };
  }
  
  handleLeftClick = () => {
    var cs = this.state.current;
    cs -= 1;
    if (cs < 0) {
      cs = SliderStore.length - 1;
    }
    this.setState({current:cs});
  }

  handleRightClick = () => {
     var cs = this.state.current;
    cs += 1;
    if (cs >= SliderStore.length) {
      cs = 0
    }
    this.setState({current:cs});
  }

  handleMouseEnter = () => {
    this.setState({
      isHover: !this.state.isHover
    })
  }

  handleMouseLeave = () => {
    this.setState({
      isHover: !this.state.isHover
    })
  }

  certainSlide = number => {
    this.setState({current:number});
  }

  setTimer() {
    this.timer = setTimeout(this.handleRightClick, 7000);
  }

  clearTimeOut () {
      clearTimeout(this.timer)
  }

  componentWillUnmount(){
    this.clearTimeOut();
  }

  renderSlides = (item, index) => {

    return (<Link
        className={
        index === this.state.current ? 'slide-item active-slide' : 'slide-item'}
        key={item.id}
        style={{ backgroundImage: `url(${item.url})` }}
        to={`/film/${item.id}`}
      ></Link>)
  }

  renderLabels = (item, index) => {
    return (
      <Labels
        classer={index === this.state.current ? 'current-slide' : ''}
        slideNumber={index}
        certainSlide={this.certainSlide}
        key={item.id}
      />
    )
  }

  render() {
    if(this.state.isHover){
      this.clearTimeOut();
    }else{
      this.setTimer();
    }
    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave ={this.handleMouseLeave}
        className="slider"
      >
        
        <div className="slides">
          {SliderStore.map(this.renderSlides)}
        </div>
        <div className="labels">
          {SliderStore.map(this.renderLabels)}
        </div>
        <div className="btn btn-left" onClick={this.handleLeftClick}>
        <div
          className="arrow-left"
          style={{'backgroundImage' : 'url(images/slider/toleft.png)'}}>
        </div>
        </div>
        <SearchForm/>
        <div className="btn btn-right" onClick={this.handleRightClick}>
          <div
            className="arrow-right"
            style={{'backgroundImage' : 'url(images/slider/toright.png)'}}
          >
          </div>
        </div>
      </div>
    );
  }
}

export default Slider;