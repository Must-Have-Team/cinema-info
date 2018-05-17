import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
import {
    Link
  } from 'react-router-dom'

const BASE_URL = 'https://popcorn-studio-17.herokuapp.com';


class DataTableFilm extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            filmSessions : [],
            multiplex: [],
            dovzhenka: [],
            kopernyk : [],
            planetakino : [],
            forum : [],
            kinopalats : []
        };
        this.filterSessions = this.filterSessions.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.getCinemaName = this.getCinemaName.bind(this);
    }
    
    componentDidMount(){
        axios.get(`${BASE_URL}/api/sessions`)
          .then(res => {
     
            const exactSession = res.data.filter( item =>  item.film_id.toString() === this.props.filmId.toString())
            this.setState({
                filmSessions : exactSession
            })
          })
     
            axios.get(`${BASE_URL}/api/cinemas`)
            .then(res => {
                const hall = this.state.currentHall;
                const currentSession = res.data.filter( item =>item.hall_id === hall );
                this.setState({ currentSession: currentSession });
            }) 
            axios.get(`${BASE_URL}/api/halls`)
            .then(res => {
                const multiplex = res.data.filter(item => item.cinema_id === 337)
                const multiplexHalls = multiplex.map( item => {
                    return item.id
                })
                const planeta = res.data.filter(item => item.cinema_id === 207)
                const planetaKino = planeta.map( item => {
                    return item.id
                })
                const dovzhenka = res.data.filter(item => item.cinema_id === 98)
                const dovzhenkaHall = dovzhenka.map( item => {
                    return item.id
                })
                const forum = res.data.filter(item => item.cinema_id === 315)
                const forumHalls = forum.map( item => {
                    return item.id
                })
                const kopernyk = res.data.filter(item => item.cinema_id === 103)
                const kopernykHalls = kopernyk.map( item => {
                    return item.id
                })
                const kinopalats = res.data.filter(item => item.cinema_id === 102)
                const kinopalatsHalls = kinopalats.map( item => {
                    return item.id
                })
                this.setState({
                    multiplex: multiplexHalls,
                    planetakino : planetaKino,
                    dovzhenka: dovzhenkaHall,
                    forum: forumHalls,
                    kopernyk: kopernykHalls,
                    kinopalats: kinopalatsHalls
                })
            })
        }
    filterSessions() {
        const array = this.state.currentSession;
        array.sort(function(a,b){
            var c = new Date(a.begin);
            var d = new Date(b.begin);
            return c-d;
            });
    }
    getCinemaName(id) {
        const multiplex = this.state.multiplex;
            for (const value of multiplex) {
                if(value === id) {
                    return <Link to={`/cinema/337`}>Multiplex</Link>
                }
            }
        const planetakino = this.state.planetakino;
        for (const value of planetakino) {
            if(value === id) {
                return <Link to={`/cinema/207`}>Планета кіно</Link>
            }
        }
        const dovzhenka = this.state.dovzhenka;
        for (const value of dovzhenka) {
            if(value === id) {
                return <Link to={`/cinema/98`}>Кінопалац ім. Довженка</Link>
            }
        }
        const forum = this.state.forum;
        for (const value of forum) {
            if(value === id) {
                return <Link to={`/cinema/315`}>Планета кіно (FORUM)</Link>
            }
        }
        const kopernyk = this.state.kopernyk;
        for (const value of kopernyk) {
            if(value === id) {
                return <Link to={`/cinema/103`}>Кінопалац Коперника</Link>
            }
        }
        const kinopalats = this.state.kinopalats;
        for (const value of kinopalats) {
            if(value === id) {
                return  <Link to={`/cinema/102`}>Кінопалац</Link>
            }
        }
    }
    renderTable() {
        let session = this.state.filmSessions;
        let layout = session.map(item => {
            let prices = item.times.map( item => {
                if(item.prices === null) {
                    return 'There is no price'
                } else {
                    return item.prices
                }   
            })
            let times = item.times.map( item => {
                return <p>{item.time}</p>
            })
            return (
                <tr key={item.id}>
                    <td>{this.getCinemaName(item.hall_id)}</td>
                    <td></td>
                    <td >{item.begin}</td>
                    <td>
                        <p className='times'>{times[0]}</p>
                        <p className='price'>Ціна {prices[0]}</p>
                    </td>
                    <td>
                        <p className='times'>{times[1]}</p>
                        <p className='price'>Ціна {prices[1]}</p>
                    </td>
                    <td>
                        <p className='times'>{times[2]}</p>
                        <p className='price'>Ціна {prices[2]}</p>
                    </td>
                    <td>
                        <p className='times'>{times[3]}</p>
                        <p className='price'>Ціна {prices[3]}</p>
                    </td>
                    <td>
                        <p className='times'>{times[4]}</p>
                        <p className='price'>Ціна {prices[4]}</p>
                    </td>
                    <td>
                        <p className='times'>{times[5]}</p>
                        <p className='price'>Ціна {prices[5]}</p>
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
                        
                            <th><h1>Назва кінотеатру</h1></th>
                            <th><h1></h1></th>
                            <th><h1>Date</h1></th>
                            <th><h1>Time</h1></th>
                            <th></th>
                            
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

export default DataTableFilm;