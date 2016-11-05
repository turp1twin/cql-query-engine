import * as E from './expressions'
import { typeIsArray } from '../util/util'

export default function build (json) {
  if (json == null) return json
  if (typeIsArray(json)) return json.map(child => build(child))
  if (json.type === 'FunctionRef') return buildFunctionRef(json)
  else if (json.type === 'Literal') return E.Literal.from(json)
  else if (functionExists(`E.${json.type}`)) return constructByName(`E.${json.type}`, json)
  else return null
}

const buildFunctionRef = json => {
  if (functionExists(`E.${json.name}FunctionRef`)) {
    return constructByName(`E.${json.name}FunctionRef`, json)
  } else return new E.FunctionRef(json)
}

const functionExists = name => eval(`typeof ${name}`) === 'function' // eslint-disable-line no-eval
const constructByName = (name, json) => eval(`new ${name}(json)`) // eslint-disable-line no-eval
