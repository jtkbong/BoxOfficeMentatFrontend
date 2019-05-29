import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import * as d3 from 'd3';
import {Axis, axisPropsFromTickScale, RIGHT, BOTTOM} from 'react-d3-axis';

class BarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: [],
            data: []
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            size: props.size,
            data: props.data
        });
    }

    render() {

        const maxWeekCount = d3.max(this.state.data, week => week.weekNumber);
        const xScale = scaleLinear()
            .domain([1, maxWeekCount])
            .range([0, this.state.size[0]]);

        const maxGross = d3.max(this.state.data, week => week.gross);
        const yScale = scaleLinear()
            .domain([0, maxGross])
            .range([0, this.state.size[1]]);
        
        
        return (
        <svg width={ this.state.size[0] } height={ this.state.size[1] }> 
            {
                this.state.data.map(week =>
                    <React.Fragment>
                    <rect key = { "MARVEL2019" + week.weekNumber }
                    x={(30 * week.weekNumber)}
                    y={ this.state.size[1] - yScale(week.gross) }
                    height={ yScale(week.gross) }
                    width="25"
                    style={{ fill: "#00BFFF" }} > 
                    </rect>
                    <text key={"MARVEL2019TEXT" + week.weekNumber} 
                    x={30 * week.weekNumber} 
                    y={this.state.size[1] - yScale(week.gross)} 
                    fontSize="10"
                    transform={"rotate(-30 " + 30*week.weekNumber + " " + (this.state.size[1] - yScale(week.gross)) + ")" }
                    >
                    {week.gross}
                    </text>
                    </React.Fragment>
                )
            } 
            <Axis {...axisPropsFromTickScale(yScale, 10)} style={{orient: RIGHT}}/>
            <Axis {...axisPropsFromTickScale(xScale, 10)} style={{orient: BOTTOM}}/>
        </svg> );
    }
}
export default BarChart;