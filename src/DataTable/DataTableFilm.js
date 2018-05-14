import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001';


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
        this.getCinemaName = this.getCinemaName.bind(this)
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
                } )
                console.log('SDSDSDS', multiplexHalls);
                this.setState({
                    multiplex: multiplexHalls
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
        if(id === multiplex[0] || id === multiplex[1] || id === multiplex[2] || id === multiplex[3] || id === multiplex[4] || id === multiplex[5]) {
            return 'Multiplex'
        }
        // const films = this.state.filmsData;
        // const exactFilm = films.filter( item => item.id.toString() === id.toString() )
        // return exactFilm[0].title;
    }
    renderTable() {
        // this.filterSessions();
        let session = this.state.filmSessions;
        let layout = session.map(item => {
            let prices = item.times.map( item => {
                //return item.time
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
                <table className="container">
                    <thead>
                        <tr>
                        
                            <th><h1>Cinema Name</h1></th>
                            <th><h1></h1></th>
                            <th><h1>Date</h1></th>
                            <th><h1>Time</h1></th>
                            
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