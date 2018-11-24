export const IDREGEX = '[0-9]+'
const REGEX = '[A-z]+[0-9]?'

export const cars = {
  list: `/:make(${REGEX})?/:model(${REGEX})?`,
  get: `/:id(${IDREGEX})`,
  reserve: `/reserve/:id(${IDREGEX})`
}
