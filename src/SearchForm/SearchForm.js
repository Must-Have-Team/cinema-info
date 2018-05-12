import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SearchForm.css'

const BASE_URL = 'https://popcorn-studio-17.herokuapp.com';


export default class SearchForm extends Component {
	constructor(props){
		super(props);
		this.state = { searchString : '', data : [] }
	}
	
	componentDidMount(){
    axios.get(`${BASE_URL}/api/films`)
      .then(res => {
        this.setState({ data: res.data });
      })
	}

	handleChange = (e) => {
 	  this.setState({searchString : e.target.value});
	}

	createList = (item, index) =>{
		return(
			<li key={item.title}>
				<Link to={`/film/${item.id}`}>{item.title} ( {item.title_orig} )</Link>
			</li>
		)
	}

	render(){
		let libraries = this.state.data,
				searchString = this.state.searchString.trim().toLowerCase(),
				out = [];

		if(searchString.length > 0){
      libraries.filter(elem => {
      	if(elem.title.toLowerCase().match( searchString ) ||
      	   elem.title_orig.toLowerCase().match( searchString )){
      		if(out.length !== 5){
	      		out.push( elem );
      		}
      	}
      });
    }
    return (
    	<div className="searc-form">
	    	<div className="container-fluid">
		    	<div className="row justify-content-between">
		    	  <div className="col-4 my-3 cityes">
		    	  	<div className="city">Львів</div>
		    	  </div>
		    	  <div className="col-8 position-relative my-3">
					    <input
					      type="text"
					      onChange={this.handleChange} 
					      placeholder="Введіть назву фільму" 
					      className="searc-input"
					    />
					    <ul className="search-out">{out.map(this.createList)}</ul>
					  </div>
			    </div>
		    </div>
	    </div>
    )}
	}
