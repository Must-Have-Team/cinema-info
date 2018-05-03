import React, { Component } from "react";
import FilmStore from "../Allmovies/Film-store";
import Stars from "../starRating/StarRating";
import "./style.css";

class SingleMovie extends Component {
  
  render() {
    const target = FilmStore[this.props.match.params.id - 1];
    return <div className="film">
    <div className="container exact">
        <div className="row">
          <div className="col">
                <img className="img" src={target.url} alt="image" />
                <h1>{target.name}</h1>
                <p>{target.raiting}</p>
                <p>Rate this movie</p>
                <Stars />   
                   
          </div>
          <div className="col">
            <div>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure
              labore asperiores eius assumenda, sed qui, et perferendis
              obcaecati fugit natus aspernatur deleniti nesciunt aliquam, harum
              consequatur beatae? Harum exercitationem dolores dolorum ea quidem
              quos, facilis id doloribus temporibus repudiandae officiis! Lorem,
              ipsum dolor sit amet consectetur adipisicing elit. Iure labore
              asperiores eius assumenda, sed qui, et perferendis obcaecati fugit
              natus aspernatur deleniti nesciunt aliquam, harum consequatur
              beatae? Harum exercitationem dolores dolorum ea quidem quos,
              facilis id doloribus temporibus repudiandae officiis
            </div>
          </div>
        </div>
      </div>
    
    </div>;
  }
}
export default SingleMovie;
