import React, { Component } from 'react';

const API = 'http://kino-teatr.ua:8081/services/api/films/premieres?apiKey=pol1kh111&size=10';

class Fetcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      films: [],
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => {
          return response.json()})
      .then(data => {
          const films = data.content
        //   .map(
        //       el => {
        //           return (
        //           <div key={el.id}>
        //           <div>{el.title}</div>
        //           <div>{el.premiere_ukraine}</div>
        //           <div>{el.rating}</div>
        //           </div>
        //           )
        //       }
        //   )
      
    this.setState({films})
    console.log('premieres', this.state.films)
    console.log(this.state.films[1].id)
});
  }
render() {
    const item = this.state.films;
    if(!item.length) {
        return null
    }
    return (
       <div>INFO
       {/* {console.log(this.state.films[1].title)} */}
     {/* {JSON.stringify(item)} */}
     {
         console.log(item[1].id)}
       </div>
    )
 
}
 
}

export default Fetcher;
// (el => {
//     <div>
//     <p>{el.title_orig}</p>
//     <p>{el.year}</p>
//     <p>{el.rating}</p>
//     </div>
// })