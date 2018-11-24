import React from 'react'
import { Link } from 'react-router-dom'
import {GridList, GridTile} from 'material-ui/GridList'
import { List, ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import {blue300, amber300, lightBlue600, lightGreen600} from 'material-ui/styles/colors'
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-vert'
import {makes} from '../index'

const Cars = ({items, next, prev, onPagination, handleSearch, params, query, styles}) => {
  const handlePaginationClick = (type) => (event) => {
    event.preventDefault()
    onPagination(type)
  }
  const { make, model } = params
  const { price, mileage } = query
  const deleteChip = (type) => () => {
    handleSearch({[type]: ''})
  }

  const statuses = new Map()
  statuses.set(-3, 'CRITICAL')
  statuses.set(-2, 'VERY BAD')
  statuses.set(-1, 'BAD')
  statuses.set(0, 'NORMAL')
  statuses.set(1, 'GOOD')
  statuses.set(2, 'VERY GOOD')
  statuses.set(3, 'EXCELLENT')

  const status = 2

  return (
  <div style={styles.wrapper}>
    {make && <Chip style={styles.chip} onRequestDelete={deleteChip('make')} backgroundColor={lightBlue600}>{make}</Chip>}
    {model && <Chip style={styles.chip} onRequestDelete={deleteChip('model')} backgroundColor={blue300}>{model}</Chip>}
    {price && <Chip style={styles.chip} onRequestDelete={deleteChip('price')} backgroundColor={amber300}>{price}$</Chip>}
    {mileage && <Chip style={styles.chip} onRequestDelete={deleteChip('mileage')} backgroundColor={lightGreen600}>{mileage}km</Chip>}
    <div style={styles.grid}>
      <List>
        {items.map(item =>
          <ListItem key={item.id}>
            <Link to={`/${item.id}`} style={styles.link}>
              <div style={status >= 0 ? styles.greenCircle : styles.redCircle}></div>
              {item.name + ' '}
              <span style={status >= 0 ? styles.green : styles.red}>{status + ' (' + statuses.get(status) + ')'}</span>
            </Link>
          </ListItem>
        )}
      </List>
      <FlatButton disabled={!prev} label="Prev" onClick={handlePaginationClick('prev')}/>
      <FlatButton disabled={!next} label="Next" onClick={handlePaginationClick('next')}/>
    </div>
  </div>
  )
}

export default Cars
