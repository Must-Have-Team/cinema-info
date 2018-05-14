import React, {
  Component
} from 'react';
import axios from 'axios';

const BASEURL = `http://localhost:3001/`;

class GetPostersId extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base64: ''
    }
  }
  componentDidMount() {

    const toDataURL = url => axios.get(url).then(data => {
      //  console.log(this.props.filmId);
      const element = data.data.filter(item => item.id === this.props.filmId);
      //console.log(element);
      const base64 = element[0].dataUrl;
      //console.log(base64)
      this.setState({
        base64: base64
      })
    })
    toDataURL(`${BASEURL}api/images`);
  }

  render() {
    let img = this.state.base64;
    // if(!this.state.id) {
    //     return null
    // }
    return ( <
      img key = {
        this.props.filmId
      }
      className = "img-box"
      id = {
        this.props.filmId
      }
      src = {
        img
      }
      alt = 'filmImg' / >

    )

  }
}
export default GetPostersId;