import React, {Component} from 'react'
import * as d3 from 'd3'

export default class BarChart extends Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    this.drawChart()
  }
  render () {
    return (
      <div style={{fontFamily: 'Roboto'}}>
        <h1>Hi, John Doe</h1>
        <div>Your financial patience score is: <span style={{color: 'green'}}>2 (VERY GOOD)</span></div>
        <h2>Summary</h2>
        <div>Your Financial Patience is keeping at the stable pace with current score as 2 (very good)! Seems that your
          financial
          behaviour tends to save, so we prepared special offers for you, so your money will keep working for you.
        </div>
        <a href={'#'}>Deposit Offer 1</a><br/>
        <a href={'#'}>Deposit Offer 2</a><br/>
        <a href={'#'}>Deposit Offer 3</a><br/>
        <a href={'#'}>Deposit Offer 4</a><br/>
        <h2>Details</h2>
        <div>
          Last month's total income: 14000 PLN<br/><br/>
          Last month's spendings: 12000 PLN<br/><br/>
          Last month' average daily spend-speed: 400 PLN<br/><br/>
        </div>
        <div id='graph'></div>
      </div>
    )
  }

  drawChart () {
    const data = [12, 5, 6, 6, 9, 10]
    const svg = d3.select('#graph').append('svg').attr('width', 700).attr('height', 300)
    const g = svg.append('g')
    var y = d3.scaleLinear().domain([20, 0]).range([300, 0])
    var x = d3.scaleLinear().domain([0, data.length]).range([0, 700])
    const a = d3.area().x((d, i) => x(i)).y0(300).y1(d => y(d))
    g.append('path').attr('d', a(data)).attr('fill', 'cyan')
  }
}
