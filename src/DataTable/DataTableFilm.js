import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';

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
            console.log(exactSession)
            this.setState({
                filmSessions : exactSession
            })
          })
     
       
            axios.get(`${BASE_URL}/api/cinemas`)
            .then(res => {
                console.log(res.data)
                const hall = this.state.currentHall;
                console.log('1122323',hall)
                const currentSession = res.data.filter( item =>item.hall_id === hall );
                console.log(currentSession)
                this.setState({ currentSession: currentSession });
                console.log(this.state.currentSession);
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
        console.log('111', this.state.currentSession)
        const array = this.state.currentSession;
        array.sort(function(a,b){
            var c = new Date(a.begin);
            var d = new Date(b.begin);
            return c-d;
            });
        console.log(array)
    }
    getCinemaName(id) {
        const multiplex = this.state.multiplex;
            for (const value of multiplex) {
                if(value === id) {
                    return 'Multiplex'
                }
            }
        const planetakino = this.state.planetakino;
        for (const value of planetakino) {
            if(value === id) {
                return 'Planeta kino'
            }
        }
        const dovzhenka = this.state.dovzhenka;
        for (const value of dovzhenka) {
            if(value === id) {
                return 'Kinopalace Dovzhenka'
            }
        }
        const forum = this.state.forum;
        for (const value of forum) {
            if(value === id) {
                return 'Planeta kino (FORUM)'
            }
        }
        const kopernyk = this.state.kopernyk;
        for (const value of kopernyk) {
            if(value === id) {
                return 'Kinopalace Kopernyk'
            }
        }
        const kinopalats = this.state.kinopalats;
        for (const value of kinopalats) {
            if(value === id) {
                return 'Kinopalace'
            }
        }
    }
    renderTable() {
        let session = this.state.filmSessions;
        let layout = session.map(item => {
            let prices = item.times.map( item => {
                if(item.prices === null) {
                    return '70'
                } else {
                    return item.prices
                }   
            })
            console.log('PRICES', prices)
            let times = item.times.map( item => {
                return <p>{item.time}</p>
            })
            console.log(times);
            return (
                <tr key={item.id}>
                    <td>{this.getCinemaName(item.hall_id)}</td>
                    <td></td>
                    <td >{item.begin}</td>
                    <td>
                        <p>{times[0]}</p>
                        <p>{prices[0]}</p>
                    </td>
                    <td>
                        <p>{times[1]}</p>
                        <p>{prices[1]}</p>
                    </td>
                    <td>
                        <p>{times[2]}</p>
                        <p>{prices[2]}</p>
                    </td>
                    <td>
                        <p>{times[3]}</p>
                        <p>{prices[3]}</p>
                    </td>
                    <td>
                        <p>{times[4]}</p>
                        <p>{prices[4]}</p>
                    </td>
                    <td>
                        <p>{times[5]}</p>
                        <p>{prices[5]}</p>
                    </td>
                </tr>
                )
        })
       return layout;
    }

    render() {
        
        return (
            <div>
                <table className="container-fluid">
                    <thead>
                        <tr>
                        
                            <th><h1>Cinema Name</h1></th>
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