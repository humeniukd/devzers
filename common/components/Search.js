import React from 'react'
import Input from './Input'
import { List, ListItem } from 'material-ui/List'
import { makes, models } from '../index'

export default ({handleSearch, query, styles}) => {
  const { price = '', mileage = '' } = query
  const model = ''

  const handleClick = params => (e) => {
    handleSearch(params)
  }

  const getItems = (make) => models[make].map(model =>
    <ListItem key={model} type="model" onClick={handleClick({make, model})}>{model}</ListItem>
  )

  const inputHandler = e => {
    const { name, value } = e.target
    handleSearch({[name]: value})
  }

  return (
    <div>
      <List style={styles.sideMenu}>
        { makes.map(make =>
          <ListItem key={make} nestedItems={getItems(make)} onClick={handleClick({make, model})} primaryTogglesNestedList={true}>
            {make}
          </ListItem>
        )}
      </List>
      <div>
        <div style={styles.row}>
          <Input style={styles.input} type="number" hintText="price" name="price"
                 value={price} onChange={inputHandler}
          />
        </div>
        <div style={styles.row}>
          <Input style={styles.input} type="number" hintText="mileage" name="mileage"
            value={mileage} onChange={inputHandler}
          />
        </div>
      </div>
    </div>
  )
}
