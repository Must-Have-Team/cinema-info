import React, { Component } from 'react';
import axios from 'axios';
import GetPoster from '../Poster/GetPoster'
import './Afisha.css';
import {
	Link
} from 'react-router-dom'

const BASE_URL = 'https://popcorn-studio-17.herokuapp.com';


class DataTableFilm extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			sessions : [],
			//cinemas
			multiplex: [],
			dovzhenka: [],
			kopernyk : [],
			planetakino : [],
			forum : [],
			kinopalats : [],
			//filter for genres
			data : [],
			selected : [],
			genres : [],
			//filter for date
			selectedDate : '2018-05-17'

		};
		this.filterSessions = this.filterSessions.bind(this);
		this.renderTable = this.renderTable.bind(this);
		this.getCinemaName = this.getCinemaName.bind(this);
	}

	componentDidMount(){
		axios.get(`${BASE_URL}/api/sessions`)
		.then(res => {

			// const exactSession = res.data.filter( item =>  item.film_id.toString() === '47851')
			// console.log(exactSession)
			this.setState({
				sessions : res.data
			})
		})

		axios.get(`${BASE_URL}/api/films`)
		.then(res => {
			this.setState({ data: res.data });
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

	handleChange = (e) => {
    this.setState({
      selected : e.target.value
    })
  }
  handleChangeForDate = (e) => {
    this.setState({
      selectedDate : e.target.value
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
				return <Link to={`/cinema/207`}>Planeta kino</Link>
			}
		}
		const dovzhenka = this.state.dovzhenka;
		for (const value of dovzhenka) {
			if(value === id) {
				return <Link to={`/cinema/98`}>Kinopalace Dovzhenka</Link>
			}
		}
		const forum = this.state.forum;
		for (const value of forum) {
			if(value === id) {
				return <Link to={`/cinema/315`}>Planeta kino (FORUM)</Link>
			}
		}
		const kopernyk = this.state.kopernyk;
		for (const value of kopernyk) {
			if(value === id) {
				return <Link to={`/cinema/103`}>Kinopalace Kopernyk</Link>
			}
		}
		const kinopalats = this.state.kinopalats;
		for (const value of kinopalats) {
			if(value === id) {
				return  <Link to={`/cinema/102`}>Kinopalace</Link>
			}
		}
	}
	// renderPosterFilm = (id) =>{
	// 	console.log(this.state.data.filter(item => item.id === id))
	// }
	
	renderSchedule =(elem) => {
		return (
			<React.Fragment>
				{elem.map( element => {
					return (
						<React.Fragment>
							{/*<a style={{ display : 'block'}} href="$">{element.begin}</a>*/}
							<a href="#">
								{element.times[0].time}
							</a>
						</React.Fragment>
					)
				})}
			</React.Fragment>
		)
	}

	renderTable() {
		const filtered =[];
		let session = [];
		let toDaySession = [];

    this.state.data.map( item => {
      item.genres.map(elem => {
        if(elem.name.indexOf(this.state.selected) === -1){
          return;
        }
        if(filtered.indexOf(item) === -1){
          filtered.push(item)
        }
      })
    })
		

    this.state.sessions.map( item => {
        if(item.begin.indexOf(this.state.selectedDate) !== -1) {
            toDaySession.push(item)
        };
    })
    console.log(toDaySession)
    console.log(this.state.sessions)

    for(let i = 0; i < filtered.length; i++) {
 				session.push(toDaySession.filter( elem => elem.film_id === filtered[i].id))
    }
		console.log(session)

		if(session.length === 0){
			return <tr><td>Loading...</td></tr>
		}else {
			let table = session.map( (item, index) => {
				if(item.length === 0){
					return ;
				}
				const sessionsMultiplex = [];
	      const sessionsForum = [];
	      const sessionsKingKross = [];
	      const sessionsKinopalats = [];
	      const sessionsKopernik = [];
	      const sessionsDovzhenko = [];

				sessionsMultiplex.push(item.filter( elem => elem.hall_id === 777 || elem.hall_id === 776 || elem.hall_id === 778 || elem.hall_id === 779 || elem.hall_id === 780 || elem.hall_id === 781));
				sessionsForum.push(item.filter( elem => elem.hall_id === 704 || elem.hall_id === 669 || elem.hall_id === 670 || elem.hall_id === 671 || elem.hall_id === 672 || elem.hall_id === 673));
				sessionsKingKross.push(item.filter( elem => elem.hall_id === 356 || elem.hall_id === 357 || elem.hall_id === 358 || elem.hall_id === 359 || elem.hall_id === 360 || elem.hall_id === 361 || elem.hall_id === 362));
				sessionsKinopalats.push(item.filter( elem => elem.hall_id === 118 || elem.hall_id === 119 || elem.hall_id === 188 ));
				sessionsKopernik.push(item.filter( elem => elem.hall_id === 708 || elem.hall_id === 120));
				sessionsDovzhenko.push(item.filter( elem => elem.hall_id === 141));
							console.log(item)
				return (
					<tr key={index}>
						<td>
							<Link to={`film/${item[0].film_id}`}>
								<GetPoster filmId={item[0].film_id}/>
							</Link>
						</td>
						<td>
							{sessionsMultiplex.map(this.renderSchedule)}
						</td>
						<td>
							{sessionsForum.map(this.renderSchedule)}
						</td>
						<td>
							{sessionsKingKross.map(this.renderSchedule)}
						</td>
						<td>
							{sessionsKinopalats.map(this.renderSchedule)}
						</td>
						<td>
							{sessionsKopernik.map(this.renderSchedule)}
						</td>
						<td>
							{sessionsDovzhenko.map(this.renderSchedule)}
						</td>
						
					</tr>
				)
			})
			return table;
		}
	}

	render() {

		let genre = [];
    this.state.data.forEach(item => {
      item.genres.forEach(elem => { 
        if(genre.indexOf(elem.name) === -1) genre.push(elem.name);
      })
    })
 		let days = [];
    this.state.sessions.map(item => {
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
				<div className="selects">
					<select onChange={this.handleChange}>
						<option value=''>Виберіть жанр</option>
						{genre.map(item => {
							return (
								<option key={item} value={item}>{item}</option>
								)
						})}
					</select>
					<select onChange={this.handleChangeForDate}>
			      {days.map(item => {
			        return (
			          <option key={item} value={item}>{item}</option>
			        )
			      })}
			  </select>
				</div>
				<table className="container-fluid">
					<thead>
					<tr>
						<th></th>
						<th>Multiplex</th>
						<th>Planeta-Kino(KingKross)</th>
						<th>Planeta-Kino(Forum)</th>
						<th>Kinopalats</th>
						<th>Kinopalats-Kopernik</th>
						<th>Kinopalats-Dovzhenka</th>
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