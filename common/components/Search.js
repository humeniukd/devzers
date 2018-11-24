import React, {Component} from 'react'
import Input from './Input'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { List, ListItem } from 'material-ui/List'
import { makes, models } from '../index'

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      price: '',
      minDate: props.query.minDate || null,
      maxDate: props.query.maxDate || null,
      percentage: parseInt(props.query.percentage) || 20,
      threshold: props.query.threshold || '1week'
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

  inputHandler = (e) => {
    const {name, value} = e.target
    this.handleSearch({[name]: value})
  }

  selectHandler = type => (e, index, value) => {
    this.setState({
      [type]: value
    });
    this.handleSearch({[type]: value})
  }

  datePickerHandler = type => (e, date) => {
    if (type === 'startdate') {
      this.setState({
        minDate: date,
      });
    } else if (type === 'enddate') {
      this.setState({
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
            <SelectField style={this.styles.input}
              floatingLabelText="percentage"
              value={this.state.percentage}
              onChange={this.selectHandler('percentage')}
            >
              <MenuItem value={20} primaryText="20%" />
              <MenuItem value={40} primaryText="40%" />
              <MenuItem value={60} primaryText="60%" />
              <MenuItem value={80} primaryText="80%" />
            </SelectField>
          </div>
          <div style={this.styles.row}>
            <SelectField style={this.styles.input}
              floatingLabelText="threshold"
              value={this.state.threshold}
              onChange={this.selectHandler('threshold')}
            >
              <MenuItem value={'1week'} primaryText="1 week" />
              <MenuItem value={'2week'} primaryText="2 week" />
              <MenuItem value={'1month'} primaryText="1 month" />
              <MenuItem value={'2month'} primaryText="2 month" />
            </SelectField>
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

