import React, { Component } from 'react';

class Labels extends Component{
	constructor(props){
		super(props);
	}
  openSlide = () => {  
    this.props.certainSlide(this.props.slideNumber);
  }
  render(){
    return (
    	<span 
    		onClick={this.openSlide}
    		className={this.props.classer}
    	></span>)
  }
}
export default Labels