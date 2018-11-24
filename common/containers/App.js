import React from 'react'
import { bindActionCreators } from 'redux'
import { withRouter, matchPath } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { parse } from 'querystring'
import { format } from 'url'

import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
  const { location, history } = ownProps
  const { search, pathname } = location
  const query = parse(search.slice(1))
  const { params } = matchPath(pathname, {
    path: '/:make?/:model?'
  })

  const handleSearch = (temp) => {
    const query = parse(history.location.search.slice(1))
    const
      model = typeof temp.model !== 'undefined' ? temp.model : params.model,
      make = typeof temp.make !== 'undefined' ? temp.make : params.make,
      price = temp.price || query.price,
      mileage = temp.mileage || query.mileage,
      startdate = temp.startdate || query.startdate,
      enddate = temp.enddate || query.enddate,
      percentage = temp.percentage || query.percentage,
      threshold = temp.threshold || query.threshold
    const q = { ...query, price, mileage, startdate, enddate, percentage, threshold }
    const keys = Object.keys(q)
    keys.forEach(key => !q[key] && delete q[key])
    delete q.start

    const pathname = '/' + [make, model].filter(Boolean).join('/')
    const url = format({ pathname, query: q })
    history.push(url)
  }
  return {
    ...ownProps,
    ...state,
    query,
    params,
    handleSearch
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
