import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import "./star.css"

class Stars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: this.props.star
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  render() {
    const { rating } = this.state;

    return (
      <div className='stars'>

        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}

export default Stars;