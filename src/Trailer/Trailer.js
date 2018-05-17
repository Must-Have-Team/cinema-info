import React, {
  Component
} from 'react';
import axios from 'axios';

const BASE_URL = 'https://popcorn-studio-17.herokuapp.com';

class GetTrailer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trailer: ''
    }
  }
  componentDidMount() {
    const toDataURL = url => axios.get(url).then(data => {

      const trailer = data.data.filter(item => item.id === this.props.filmId);
      const exactTrailer = trailer[0].url;
      this.setState({
        trailer: exactTrailer
      })
    })
    toDataURL(`${BASE_URL}/api/trailers/`);
  }

  render() {
    return (
    <div className="iframe">
      <iframe width="640" height="350" src={this.state.trailer}
      style={{margin: '0 auto'}}
      frameBorder="0" allowFullScreen></iframe>
    </div>
    )

  }
}
export default GetTrailer;