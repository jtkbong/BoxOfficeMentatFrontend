import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        };
    }

    componentDidMount() {
        const url = process.env.REACT_APP_API_URL + "reviews";
        fetch(url, { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
				const reviews = data.reviews;
				console.log(reviews);
                this.setState({
                    reviews: reviews
                });
            });
    }

    render() {
        return (
            <div>
                <h5>Reviews</h5>
                <ul>
				{this.state.reviews.map(review =>
					<li key={review.id}>
                        <Link to={'review/' + review.movieId}>{review.movieName}</Link>
                    </li>
				)}
				</ul>
            </div>
        );
    }
}

export default Reviews;