import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import * as d3 from 'd3';
import { Axis, axisPropsFromTickScale, LEFT, BOTTOM } from 'react-d3-axis';
import Util from './Util';

class W2WBoxOfficeBarChart extends Component {

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

        if (this.state.size.length > 0 && this.state.data.length > 0) {
            const maxWeekCount = d3.max(this.state.data, week => week.weekNumber);
            const xScale = scaleLinear()
                .domain([1, maxWeekCount + 1])
                .range([0, this.state.size[0]]);

            const maxGross = d3.max(this.state.data, week => week.gross);
            const yScale = scaleLinear()
                .domain([0, maxGross * 1.2])
                .range([0, this.state.size[1]]);

            const yScaleReverse = scaleLinear()
                .domain([0, maxGross * 1.2])
                .range([this.state.size[1], 0]);

            const widthPerBar = this.state.size[0] / this.state.data.length;

            return (
                <div key="w2wboxOfficeChart" style={{ margin: "10px 0px 20px 0px" }}>
                    {this.state.data.length > 0 &&
                        <React.Fragment>
                            <div key="weeksHeader" style={{ marginBottom: "10px" }}><b>Week-To-Week Performance</b></div>
                            <svg key="barChartGraphic" width={this.state.size[0] + 100} height={this.state.size[1] + 100}>
                                <g transform="translate(80, 20)">
                                    {
                                        this.state.data.map(week =>
                                            <React.Fragment key={"fragment" + week.weekNumber}>
                                                <rect key={"week" + week.weekNumber}
                                                    x={2 + (widthPerBar * (week.weekNumber - 1))}
                                                    y={this.state.size[1] - yScale(week.gross)}
                                                    height={yScale(week.gross)}
                                                    width={widthPerBar - 2}
                                                    style={{ fill: "#00BFFF" }} >
                                                </rect>
                                                <text key={"weekText" + week.weekNumber}
                                                    x={(5 + widthPerBar * (week.weekNumber - 1))}
                                                    y={this.state.size[1] - yScale(week.gross)}
                                                    fontSize="10"
                                                    transform={"rotate(-30 " + widthPerBar * (week.weekNumber - 1) + " " + (this.state.size[1] - yScale(week.gross)) + ")"}
                                                >
                                                    {Util.intToDollarsText(week.gross)}
                                                </text>
                                            </React.Fragment>
                                        )
                                    }
                                </g>
                                <g transform="translate(80, 20)">
                                    <Axis key="yAxis" {...axisPropsFromTickScale(yScaleReverse, 4)} style={{ orient: LEFT }} />
                                </g>
                                <g transform={"translate(" + (80 + widthPerBar / 2) + ", " + (20 + this.state.size[1]) + ")"}>
                                    <Axis key="xAxis" {...axisPropsFromTickScale(xScale, maxWeekCount + 1)} style={{ orient: BOTTOM }} />
                                </g>
                            </svg>
                        </React.Fragment>
                    }
                </div>);
        }
        else {
            return (
                <div />
            );
        }
    }
}
export default W2WBoxOfficeBarChart;