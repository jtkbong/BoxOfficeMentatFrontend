import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Review extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieId: null,
            review: null
        };
        this.getDangerousHTML = this.getDangerousHTML.bind(this);
    }

    componentDidMount() {
        const { reviewId } = this.props.match.params;
        const url = process.env.REACT_APP_API_URL + "review/" + reviewId;
        fetch(url, { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    reviewId: reviewId,
                    review: data,
                    movieId: data.movieId,
                    movieName: data.movieName,
                    reviewText: data.reviewText
                });
            });
    }

    getDangerousHTML() {
        return {
            __html: this.state.reviewText
        }
    }

    render() {
        return (
            <div key="reviewStats">
                <h4><Link to={'../movie/' + this.state.movieId}>{this.state.movieName}</Link></h4><br />
                <div dangerouslySetInnerHTML={ this.getDangerousHTML() }/>
            </div>
        );
    }
}

export default Review;