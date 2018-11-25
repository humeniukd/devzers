import { NotFoundError } from './errors'

const data = {}

const baseUrl = 'https://jsonplaceholder.typicode.com/users'

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
