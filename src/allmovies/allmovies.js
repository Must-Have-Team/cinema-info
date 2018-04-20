import React, {Component} from 'react';
import Movie from './movie';
import Button from './button';
import './styles.css'

class Movies extends Component{
  render(){
    return(
      <div>
        <div className="row  justify-content-md-center">
        <Movie  src='https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' alt="film1" name="fafafafa" rating="3.3"/>
        <Movie src='https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' alt="film2" name="dada dada" rating="4.3"/>
        <Movie src='https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' alt="film3" name="afa gaga" rating="3.3"/>
        <Movie src='https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' alt="film3" name="afa gaga" rating="3.3"/>
        <Movie src='https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' alt="film3" name="afa gaga" rating="3.3"/>
        <Movie src='https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' alt="film3" name="afa gaga" rating="3.3"/>
        <Movie src='https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' alt="film3" name="afa gaga" rating="3.3"/>
        <Movie src='https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' alt="film3" name="afa gaga" rating="3.3"/>
        </div>
        <Button />
      </div>
    )
  }
}
export default Movies;