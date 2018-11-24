import React, {Component} from 'react'
import Input from './Input'
import DatePicker from 'material-ui/DatePicker'
import { List, ListItem } from 'material-ui/List'
import { makes, models } from '../index'

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      price: '',
      minDate: null,
      maxDate: null
    }

    this.handleSearch = props.handleSearch

    this.model = ''

    this.styles = props.styles
  }

  handleClick = params => (e) => {
    this.handleSearch(params)
  }

  getItems = (make) => models[make].map(model =>
    <ListItem key={model} type="model" onClick={this.handleClick({make, model})}>{model}</ListItem>
  )

  inputHandler = e => {
    const {name, value} = e.target
    this.handleSearch({[name]: value})
  }

  datePickerHandler = type => (e, date) => {
    if (type === 'start') {
      this.setState({
        ...this.state,
        minDate: date,
      });
    } else if (type === 'end') {
      this.setState({
        ...this.state,
        maxDate: date,
      });
    }
    date = date.toLocaleDateString().replace(/\./g, '-')
    this.handleSearch({[type]: date})
  }

  render () {
    return (
      <div>
        <List style={this.styles.sideMenu}>
          {makes.map(make =>
            <ListItem key={make} nestedItems={this.getItems(make)} onClick={this.handleClick({make, model: this.model})}
                      primaryTogglesNestedList={true}>
              {make}
            </ListItem>
          )}
        </List>
        <div>
          <div style={this.styles.row}>
            <DatePicker hintText="Start date" container="inline" name="start" style={this.styles.input}
                        minDate={this.state.minDate} maxDate={this.state.maxDate} onChange={this.datePickerHandler('start')}/>
          </div>
          <div style={this.styles.row}>
            <DatePicker hintText="End date" container="inline" name="end" style={this.styles.input}
                        minDate={this.state.minDate} maxDate={this.state.maxDate} onChange={this.datePickerHandler('end')}/>
          </div>
          <div style={this.styles.row}>
            <Input style={this.styles.input} type="number" hintText="price" name="price"
                   value={this.price} onChange={this.inputHandler}
            />
          </div>
          <div style={this.styles.row}>
            <Input style={this.styles.input} type="number" hintText="mileage" name="mileage"
                   value={this.mileage} onChange={this.inputHandler}
            />
          </div>
        </div>
      </div>
    )
  }
}

