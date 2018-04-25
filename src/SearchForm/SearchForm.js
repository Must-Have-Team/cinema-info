import React, { Component } from 'react';
import './SearchForm.css'

export default class SearchForm extends Component {
	constructor(props){
		super(props);
		this.state = {searchString : ''}
	}
	
	handleChange = (e) => {
 	  this.setState({searchString : e.target.value});
	}

	//создаем елементы выпадающего списка фильмов
	createList = (item, index) =>{
		return(
			<li key={item.name}>
				<a href={item.url}>{item.name}</a>
			</li>
		)
	}

	render(){
		let libraries = this.props.items,
				searchString = this.state.searchString.trim().toLowerCase(),
				out = [];

		if(searchString.length > 0){
      libraries.filter(elem => {
      	if(elem.name.toLowerCase().match( searchString )){
      		if(out.length !== 10){
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
