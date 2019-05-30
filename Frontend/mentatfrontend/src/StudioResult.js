import React, { Component } from 'react';
import MovieResults from './MovieResults'

class StudioResult extends Component {
	constructor(props) {
		super(props);
		this.state = {
            studioId: null,
            movies: []
		};
    }
    
    componentDidMount() {
        const { studioId } = this.props.match.params;
        this.setState({
            studioId: studioId
        });
    }
	
	render() {
		return (
			<div style={{height: "675px"}}>
				<h4 style={{margin: "15px 0px 10px 0px"}}>{this.state.studioId}</h4>
                <MovieResults
					studioId={this.state.studioId}/>
			</div>
		);
	}
}

export default StudioResult;