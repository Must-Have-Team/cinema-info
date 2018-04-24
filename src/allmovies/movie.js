import React from 'react';


const movie = (props) => {
  return (
    <div className="movie col-sm-12 col-sm-4 col-lg-3 col-xl-2 card">
      <img className="img card-img-top" src={props.src} alt={props.alt}/>
      <div className="card-body">
        <h3 className="card-title">{props.name}</h3>
        <p className="card-text">{props.rating}</p>
      </div>
    </div>
  )
}
export default movie;