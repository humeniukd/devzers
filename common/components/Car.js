import React, {Component} from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton';
import * as d3 from 'd3'

export default class Car extends Component {
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
      <CardText>
        Financial patience score: <b style={{color:'green'}}>2 (HIGH)</b>
        <h2>Summary</h2>
        Average monthly periodic income: 12000 PLN<br/>
        Average monthly surprise income: 2000 PLN<br/>
        Average monthly spends: 12000 PLN<br/>
        Average days till threshold: 21<br/>
      </CardText>
      <div id='graph'></div>
      <CardActions>
        <FlatButton label='Back' onClick={() => this.props.history.goBack()} />
      </CardActions>
    </Card>)
  }
  drawChart() {
    const data = [12, 5, 6, 6, 9, 10]
    const svg = d3.select('#graph').append('svg').attr('width', 700).attr('height', 300)
    const g = svg.append('g')
    var y = d3.scaleLinear().domain([20, 0]).range([300, 0])
    var x = d3.scaleLinear().domain([0, data.length]).range([0, 700])
    const a = d3.area().x((d, i) => x(i)).y0(300).y1(d => y(d))
    g.append('path').attr('d', a(data)).attr('fill', 'cyan')
  }
}
