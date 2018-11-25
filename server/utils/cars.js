import uuid from 'uuid'
import { makes, models } from '../../common'
import { NotFoundError } from './errors'
import fetch from 'isomorphic-fetch'

const data = {}

const baseUrl = 'https://jsonplaceholder.typicode.com/users'

const maxMileage = 300000
const maxPrice = 30000
const itemsCount = 10000

const rnd = n => Math.floor(Math.random() * n)
let i = 0
while (i++ < itemsCount) {
  const id = uuid()
  const make = makes[rnd(makes.length)]
  const modelsOfMake = models[make]
  const model = modelsOfMake[rnd(modelsOfMake.length)]
  const img = genImg(make, model, rnd(9))
  const mileage = rnd(maxMileage)
  const price = rnd(maxPrice) + rnd(maxPrice)
  data[id] = {
    id,
    make,
    img,
    model,
    mileage,
    price,
    reserved: false
  }
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const paramsToPath = (params) => {
  const { model, make } = params
  return [model, make].filter(Boolean).join('/')
}

export const list = async (criteria, options = {}) => {
  const { make, model, mileage, price } = criteria
  const { start = 0, limit = 10, sort = {price: 1} } = options
  const sortBy = Object.keys(sort)[0]
  const sortOrder = parseInt(sort[sortBy])
  const url = `${baseUrl}?_page=start${start}&_limit=${limit}`

  const res = await fetch(url)
  const data = await res.json()

  data.map(item => {
    item.status = getRandomInt(-3, 3)
  })

  return data
}

const notFound = () => { throw new NotFoundError() }

export const get = async id => {
  const res = await fetch(`${baseUrl}/${id}`)
  const data = await res.json()

  return data
}

export default {
  list,
  get
}
