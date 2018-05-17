import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
import GetPoster from '../Poster/GetPoster';
import {
    Link
  } from 'react-router-dom'

const BASE_URL = 'https://popcorn-studio-17.herokuapp.com';


class ResponsiveTable extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            filmsData : [],
            currentHall : null,
            currentSession: [],
            showPrice: false,
            days : [],
            selected: '2018-05-16'
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

        let toDaySession = [];// this.state.currentSession.filter( item => item.begin === this.state.selected )
        this.state.currentSession.map( item => {
            if(item.begin.indexOf(this.state.selected) !== -1) {
                toDaySession.push(item)
            };
        })
        let layout = toDaySession.map(item => {
            let prices = item.times.map( item => {
                //return item.time
                if(item.prices === null) {
                    return 'Price is not allowed'
                } else {
                    return `Ціна: ${item.prices}`
                }   
            })
            let times = item.times.map( item => {
                return item.time
            })

            return (
                <tr key={item.id}>
                    <td className='poster-cell'>
                        <Link className="title-link" to={`/film/${item.film_id}`}>
                            <GetPoster filmId={item.film_id}/>
                        </Link>
                    </td>
                    <td className='cell'>
                        <Link className="title-link" to={`/film/${item.film_id}`}>
                            {this.getName(item.film_id)}
                        </Link>
                    </td>
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

    handleChange = (e) => {
        this.setState({
            selected : e.target.value
        })
    }
    
    handleSortForTime = () =>{
        let sortForTime = this.state.currentSession.sort((a, b) => {
            console.log(a)
            
            if (a.times[0].time > b.times[0].time) return 1;
            if (a.times[0].time < b.times[0].time) return -1;
            return 0
        })
        this.setState({
            currentSession : sortForTime
        })
    }

    handleSortForPrice = () =>{
        let sortForPrice = this.state.currentSession.sort((a, b) => {
            if (a.times[0].prices > b.times[0].prices) return 1;
            if (a.times[0].prices < b.times[0].prices) return -1;
            return 0
        })
        this.setState({
            currentSession : sortForPrice
        })
    }

    render() {
        let days = [];
        this.state.currentSession.map(item => {
            if(days.indexOf(item.begin) === -1){
                days.push(item.begin)
            }
        })
        days.sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0
        });
        return (
            <div>
            <select onChange={this.handleChange}>
                {days.map(item => {
                  return (
                    <option key={item} value={item}>{item}</option>
                  )
                })}
            </select>
                <table className="container">
                    <thead>
                        <tr>
                            <th>Poster</th>
                            <th>Name</th>
                            <th onClick={this.handleSortForTime} style={{ cursor: 'pointer'}}>Time</th>
                            <th onClick={this.handleSortForPrice} style={{ cursor: 'pointer'}}>Price</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
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
