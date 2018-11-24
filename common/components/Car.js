import React, {Component} from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton';
import * as d3 from 'd3'

export default class Search extends Component {
  constructor (props) {
    super(props)
  }
  componentDidMount() {
    this.drawChart()
  }
  render() {
    return (<Card>
      <CardHeader
        title={this.props.item.name}
        subtitle={this.props.item.model}
      />
      <CardMedia
        overlay={<CardTitle title={`${this.props.item.price}$`} subtitle={`${this.props.item.mileage}km`} />}
      >
        <div id='asdf'></div>
      </CardMedia>
      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>
      <CardActions>
        <FlatButton label='Back' onClick={() => this.props.history.goBack()} />
        <RaisedButton label='Reserve' onClick={this.props.onReserve} />
      </CardActions>
    </Card>)
  }
  drawChart() {
    const data = [12, 5, 6, 6, 9, 10];
    const svg = d3.select('#asdf').append('svg').attr('width', 700).attr('height', 300)
    const g = svg.append('g')
    var x = d3.scaleTime().rangeRound([0, data.length]);
    var y = d3.scaleLinear().rangeRound([0, 300]);
    const line = d3.line().x(function(d, i) { return x(i)})
      .y(function(d) { return y(d)})
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }
}
