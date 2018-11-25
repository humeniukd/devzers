import React, {Component} from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import data from './mock'
import Chart from 'react-google-charts';

const xMin = 1499040000000;
const xMax = 1530316800000;

const Car = (props) => {
    const tmp = [['Date',
      'rsi post transaction balance']]
  data.forEach(({tradeDate, rsi_post_transaction_balance}) => tmp.push([new Date(tradeDate), rsi_post_transaction_balance]))
    return (<Card>
      <CardHeader
        title={props.item.name}
        subtitle={props.item.model}
      />
      <CardText>
        Financial patience score: <b style={{color:'green'}}>2 (VERY PATIENT)</b>
        <h2>Summary</h2>
        Average monthly periodic income: 12000 PLN<br/>
        Average monthly surprise income: 2000 PLN<br/>
        Average monthly spends: 12000 PLN<br/>
        Average days till threshold: 21<br/>
      </CardText>
      <Chart
        width={'100%'}
        height={'300px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={tmp}
        options={{
          chartArea: { height: '90%', width: '80%' }
        }}
        chartPackages={['corechart', 'controls']}
        controls={[
          {
            controlType: 'DateRangeFilter',
            options: {
              filterColumnLabel: 'tradeDate',
              ui: { format: { pattern: 'yyyy' } }
            }
          }
        ]}
      />
      <CardActions>
        <FlatButton label='Back' onClick={() => props.history.goBack()} />
      </CardActions>
    </Card>)
}

export default Car
