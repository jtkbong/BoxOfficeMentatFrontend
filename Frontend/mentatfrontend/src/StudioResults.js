import React, { Component } from 'react';

class StudioResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            studios: []
        };
        this.getStudios();
    }
    
    getStudios() {
        fetch("http://boxofficementatservice-env.quumv36r5v.us-west-2.elasticbeanstalk.com/studios", {mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            this.setState({studios: data.studios })
        });
    }
  
    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th align='left'>Studio</th>
                            <th align='left'>Movies Made</th>
                        </tr>
                        {this.state.studios.map(studio => 
                        <tr key={studio.name}>
                            <td>{studio.name}</td>
                            <td>{studio.count}</td>
                        </tr>    
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
  }

  export default StudioResults;