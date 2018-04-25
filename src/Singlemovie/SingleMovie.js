import React, {Component} from 'react';
import FilmStore from '../Allmovies/Film-store';

class SingleMovie extends Component{
    film = () => {
      const target = FilmStore[this.props.match.params.id - 1];
        
        return (
    <div>
      <img src={target.url} alt={target.name}/>
      <h1>{target.name}</h1>
      <p>{target.raiting}</p>
    </div>
    )
}
  render(){
    return (
      <div className="film" onClick={this.film}>
      FILM NUM {this.props.match.params.id}
      {this.film()}
     
    
      </div>
    )
  }
}
export default SingleMovie;