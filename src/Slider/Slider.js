import React, { Component } from 'react';
import SliderStore from './Slider-store';
import Labels from './Labels';

import './Slider.css';

class Slider extends Component {
	constructor(props){
		super(props);
    this.state = { current : 0, isHover : false };
    this.handleLeftClick = this.handleLeftClick.bind(this)
    this.handleRightClick = this.handleRightClick.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
	}

  handleLeftClick(){
    var cs = this.state.current;
    cs -= 1;
    if (cs < 0) {
      cs = SliderStore.length - 1;
    }
    this.setState({current:cs});
  }

  handleRightClick(){
     var cs = this.state.current;
    cs += 1;
    if (cs >= SliderStore.length) {
      cs = 0
    }
    this.setState({current:cs});
  }

  handleMouseEnter(){
    this.setState({
      isHover: !this.state.isHover
    })
  }

  handleMouseLeave(){
    this.setState({
      isHover: !this.state.isHover
    })
  }

  certainSlide = number => {
    console.log(number)
    this.setState({current:number});
  }

  clearIntervals () {
      this.intervals.map(clearInterval);
      this.intervals = [];
  }

  componentWillMount() {
    this.intervals = [];
  }

  setInterval() {
    this.intervals.push(setInterval.apply(null, arguments));
  }

  componentWillUnmount() {
    this.clearIntervals();
  }
  
  componentWillUpdate(){
    this.clearIntervals();
    var slideInterval = this.setInterval(this.handleRightClick, 7000);
  }

  componentDidMount() {
    var slideInterval = this.setInterval(this.handleRightClick, 7000);
  }

  renderSlides = (item, index) => {
    return (<div 
      className={
        index === this.state.current ? 'slide-item active-slide' : 'slide-item'} 
      key={index}>
      <a href="#" >
        <img src={item.url} alt="pic" />
      </a>
    </div>)
  }

  renderLabels = (item, index) => {
    return (
      <Labels 
        classer={index===this.state.current?'current-slide':''} 
        slideNumber={index} 
        certainSlide={this.certainSlide}
        key={index}
      />
    )
  }

  render() {
    if(this.state.isHover){
      this.clearIntervals();
    }else{
      var slideInterval = this.setInterval(this.handleRightClick, 7000);
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
          <span>&#8249;</span>
        </div>
        <div className="btn btn-right" onClick={this.handleRightClick}>
          <span>&#8250;</span>
        </div>
    	</div>
    );
  }
}

export default Slider;


// var Slider = React.createClass({
//   getInitialState(){
//     return {
//       curslide: 0
//     }
//   },
//   nextSlide(){
//     var cs = this.state.curslide;
//     cs += 1;
//     if (cs>=Slides.length) {
//       cs = 0
//     }
//     this.setState({curslide:cs});
//   },
//   certainSlide(number){
//     this.setState({curslide:number});
//   },
//   render(){
//     var classTag = cx({
//       'dark-text': this.props.dark
//     });
//     var marginleft = this.props.style.width*this.state.curslide*-1;
//     var newstyle = merge(this.props.style,{'marginLeft':marginleft});

//     var slides = Slides.map(function(s,i){
//       return <Slide link={s} key={'slider-slide-key'+i} style={this.props.style}/>
//     }.bind(this));

//     var labels = Slides.map(function(s,i){
//       return <SlideBullet classer={i===this.state.curslide?'current-slide':''} slideNumber={i} certainSlide={this.certainSlide}/>
//     }.bind(this))

//     return <div className='slider-holder' style={this.props.style}>
//             <ul className='ux-at-slider' style={newstyle}>
//               {slides}
//             </ul>
//             <div className='slider-labels'>
//               {labels}
//             </div>
//           </div>
//   }
// })

// clearIntervals () {
//       this.intervals.map(clearInterval);
//       this.intervals = [];
//   },
//   componentWillMount() {
//     this.intervals = [];
//   },
//   setInterval() {
//     this.intervals.push(setInterval.apply(null, arguments));
//   },
//   componentWillUnmount() {
//     this.clearIntervals();
//   },
//   componentDidMount() {
//     var slideInterval = this.setInterval(this.nextSlide, 7000);
//   },