import { Expression } from './expression'

export class Quantity extends Expression {
  constructor (json) {
    super(json)
    this.unit = json.unit
    this.value = json.value
  }

  exec (ctx) {
    return this
  }

  toString () {
    return `${this.value} '${this.unit}'`
  }

  sameOrBefore (other) {
    if (other instanceof Quantity && other.unit === this.unit) return this.value <= other.value
    else return null
  }

  sameOrAfter (other) {
    if (other instanceof Quantity && other.unit === this.unit) return this.value >= other.value
    else return null
  }

  after (other) {
    if (other instanceof Quantity && other.unit === this.unit) return this.value > other.value
    else return null
  }

  before (other) {
    if (other instanceof Quantity && other.unit === this.unit) return this.value < other.value
    else return null
  }
}

const timeUnits = {'years': 'year', 'months': 'month', 'days': 'day', 'minutes': 'minute', 'seconds': 'seconds', 'milliseconds': 'millisecond'}
const cleanUnit = units => {
  if (timeUnits[units]) return timeUnits[units]
  else return units
}

export function createQuantity (value, unit) {
  return new Quantity({ value, unit })
}

export function parseQuantity (str) {
  const components = /([+|-]?\d+\.?\d*)\s*'(.+)'/.exec(str)
  if ((components != null) && (components[1] != null) && components[2]) {
    const value = parseFloat(components[1])
    const unit = components[2].trim()
    return new Quantity({value, unit})
  } else {
    return null
  }
}

export function doAddition (a, b) {
  if (a instanceof Quantity && b instanceof Quantity) {
    if (a.unit === b.unit) {
      return new Quantity({unit: a.unit, value: a.value + b.value})
    }
  } else {
    return a.copy().add(b.value, cleanUnit(b.unit))
  }
}

export function doSubtraction (a, b) {
  if (a instanceof Quantity && b instanceof Quantity) {
    if (a.unit === b.unit) {
      return new Quantity({unit: a.unit, value: a.value - b.value})
    }
  } else {
    return a.copy().add(b.value * -1, cleanUnit(b.unit))
  }
}

export function doDivision (a, b) {
  if (a instanceof Quantity && b instanceof Quantity) {
    if (a.unit === b.unit) return a.value / b.value
  } else {
    return new Quantity({unit: a.unit, value: a.value / b})
  }
}

export function doMultiplication (a, b) {
  if (a instanceof Quantity && b instanceof Quantity) {
    // TODO: proper conversion of units (e.g., 5 m * 5 m = 5 m^2)
    return null
  } else {
    let [q, d] = a instanceof Quantity ? [a, b] : [b, a]
    return new Quantity({unit: q.unit, value: q.value * d})
  }
}
