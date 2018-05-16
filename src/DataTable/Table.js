import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
import GetPoster from '../Poster/GetPoster';

const BASE_URL = 'https://popcorn-studio-17.herokuapp.com';


class ResponsiveTable extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            filmsData : [],
            currentHall : null,
            currentSession: [],
            showPrice: false
        };
        this.filterSessions = this.filterSessions.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.getName = this.getName.bind(this);
    }
    
    componentDidMount(){
        axios.get(`${BASE_URL}/api/films`)
          .then(res => {
            this.setState({ filmsData: res.data });
          })
     
        axios.get(`${BASE_URL}/api/halls`)
          .then(res => {
           const cinema = this.props.cinemaId;
           const currentHalls = res.data.filter( item => item.cinema_id.toString() === cinema);
           const currentHall = currentHalls[0].id
           this.setState({
            currentHall : currentHall
           })
          }).then(
            axios.get(`${BASE_URL}/api/cinema-sessions`)
            .then(res => {
                const hall = this.state.currentHall;
                const currentSession = res.data.filter( item =>item.hall_id === hall );
                this.setState({ currentSession: currentSession });
            }) 
          )
        

        }
    filterSessions() {
        console.log('111', this.state.currentSession)
        const array = this.state.currentSession;
        array.sort(function(a,b){
            var c = new Date(a.begin);
            var d = new Date(b.begin);
            return c-d;
            });
    }

    getName(id) {
        const films = this.state.filmsData;
        const exactFilm = films.filter( item => item.id.toString() === id.toString() )
        return exactFilm[0].title;
    }
    renderTable() {
        this.filterSessions();
        let session = this.state.currentSession;
        let layout = session.map(item => {
            let prices = item.times.map( item => {
                //return item.time
                if(item.prices === null) {
                    return 'Price is not allowed'
                } else {
                    return `Ціна: ${item.prices}`
                }   
            })
            let times = item.times.map( item => {
                return <p>{item.time}</p>
            })
            return (
                <tr key={item.id}>
                    <td className='poster-cell'><GetPoster filmId={item.film_id}/></td>
                    <td className='cell'>{this.getName(item.film_id)}</td>
                    <td className='date-cell'>{item.begin}</td>
                    <td className='cell'>
                       <p>{times[0]}</p>
                       <p className='price'>{prices[0]}</p>
                    </td>
                    <td className='cell'>
                        <p>{times[1]}</p>
                        <p className='price'>{prices[1]}</p>
                    </td>
                    <td className='cell'>
                        <p>{times[2]}</p>
                        <p className='price'>{prices[2]}</p>
                    </td>
                    <td className='cell'>
                        <p>{times[3]}</p>
                        <p className='price'>{prices[3]}</p>
                    </td>
                    <td className='cell'>
                        <p>{times[4]}</p>
                        <p className='price'>{prices[4]}</p>
                    </td>
                    <td className='cell'>
                        <p>{times[5]}</p>
                        <p className='price'>{prices[5]}</p>
                    </td>
                </tr>
                )
        })
       return layout;
    }

    render() {
        
        return (
            <div>
                <table className="container">
                    <thead>
                        <tr>
                            <th><h1>Poster</h1></th>
                            <th><h1>Name</h1></th>
                            <th><h1>Date</h1></th>
                            <th><h1>Time</h1></th>
                            <th><h1></h1></th>
                            <th><h1></h1></th>
                            <th><h1></h1></th>
                            <th><h1></h1></th>
                            <th><h1></h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}   
                    </tbody>
                </table>
  
            </div>
        );
    }
}

export default ResponsiveTable;
