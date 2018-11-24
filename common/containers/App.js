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

  const handleSearch = ({
    model = params.model,
    make = params.make,
    price = query.price,
    mileage = query.mileage,
    start = query.start,
    end = query.end
  }) => {
    const q = { ...query, price, mileage, start, end }
    const keys = Object.keys(q)
    keys.forEach(key => !q[key] && delete q[key])

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
