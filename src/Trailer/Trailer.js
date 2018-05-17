import React, {
  Component
} from 'react';
import axios from 'axios';
import { newExpression } from 'babel-types';
import './trailer.css'

const BASE_URL = 'https://popcorn-studio-17.herokuapp.com';

class GetTrailer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trailer: ''
    }
  }
  componentDidMount() {
  axios.get(`${BASE_URL}/api/trailers/`).then(data => {
      const trailer = data.data.filter(item => item.id === this.props.filmId);
      const exactTrailer = trailer[0].trailer;

      this.setState({
        trailer: exactTrailer
      })
    })


  }

  render() {
    let url = this.state.trailer;
    let newurl = url.toString().replace(/http/i, 'https');
    return (
    <div className="iframe">
      <iframe width="640" height="350" src={newurl}

      frameBorder="0" allowFullScreen></iframe>
    </div>
    )

  }
}
export default GetTrailer;