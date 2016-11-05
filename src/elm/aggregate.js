import { Expression } from './expression'
import { guard, compact, typeIsArray, numericalSort, anyTrue, allTrue, contains } from '../util/util'
import build from './build'
import { createQuantity } from './quantity'

const quantitiesOrArg = arr => {
  if (guard(arr[0], x => x.constructor.name) === 'Quantity') {
    let { unit } = arr[0]
    let values = []
    for (let i = 0; i < arr.length; i++) {
      let a = arr[i]
      if (a.constructor.name === 'Quantity' && a.unit === unit) values.push(a.value)
      else return []
    }
    return compact(values) // need to make sure that there are not any null values from the quantities
  } else {
    return arr
  }
}

const quantityOrValue = (value, arr) => {
  if (guard(guard(arr, x1 => x1[0]), x => x.constructor.name) === 'Quantity') {
    return createQuantity(value, arr[0].unit)
  } else {
    return value
  }
}

class AggregateExpression extends Expression {
  constructor (json) {
    super(json)
    this.source = build(json.source)
  }
}

export class Count extends AggregateExpression {
  exec (ctx) {
    let arg = this.source.exec(ctx)
    if (typeIsArray(arg)) {
      return compact(arg).length
    }
  }
}

export class Sum extends AggregateExpression {
  exec (ctx) {
    let arg = this.source.exec(ctx)
    if (typeIsArray(arg)) {
      arg = compact(arg)
      let filtered = quantitiesOrArg(arg)
      let val = filtered.length === 0 ? null : filtered.reduce((x, y) => x + y)
      return quantityOrValue(val, arg)
    }
  }
}

export class Min extends AggregateExpression {
  exec (ctx) {
    let arg = this.source.exec(ctx)
    if (typeIsArray(arg)) {
      arg = compact(arg)
      let filtered = numericalSort(quantitiesOrArg(arg), 'asc')
      return quantityOrValue(filtered[0], arg)
    }
  }
}

export class Max extends AggregateExpression {
  exec (ctx) {
    let arg = this.source.exec(ctx)
    if (typeIsArray(arg)) {
      arg = compact(arg)
      let filtered = numericalSort(quantitiesOrArg(arg), 'desc')
      return quantityOrValue(filtered[0], arg)
    }
  }
}

export class Avg extends AggregateExpression {
  exec (ctx) {
    let arg = this.source.exec(ctx)
    if (typeIsArray(arg)) {
      arg = compact(arg)
      let filtered = quantitiesOrArg(arg)
      if (filtered.length === 0) return null
      let sum = filtered.reduce((x, y) => x + y)
      return quantityOrValue((sum / filtered.length), arg)
    }
  }
}

export class Median extends AggregateExpression {
  exec (ctx) {
    let arg = this.source.exec(ctx)
    if (typeIsArray(arg)) {
      arg = compact(arg)
      let filtered = numericalSort(quantitiesOrArg(arg, 'asc'))
      if (filtered.length === 0) return null
      else if (filtered.length % 2 === 1) return quantityOrValue(filtered[(filtered.length - 1) / 2], arg)
      else {
        let v = (filtered[(filtered.length / 2) - 1] + filtered[(filtered.length / 2)]) / 2
        return quantityOrValue(v, arg)
      }
    }
  }
}

export class Mode extends AggregateExpression {
  exec (ctx) {
    let arg = this.source.exec(ctx)
    if (typeIsArray(arg)) {
      let filtered = compact(arg)
      let mode = this.mode(filtered)
      if (mode.length === 1) return mode[0]
      else return mode
    }
  }

  mode (arr) {
    let max = 0
    let counts = {}
    let results = []
    arr.forEach(elem => {
      let cnt = counts[elem] = ((counts[elem] && counts[elem] != null) ? counts[elem] : 0) + 1
      if (cnt === max && !contains(elem, results)) {
        results.push(elem)
      } else if (cnt > max) {
        results = [elem]
        max = cnt
      }
    })
    return results
  }
}

export class StdDev extends AggregateExpression {
  constructor (json) {
    super(json)
    this.type = 'standard_deviation'
  }

  exec (ctx) {
    let args = this.source.exec(ctx)
    if (typeIsArray(args)) {
      args = compact(args)
      let val = quantitiesOrArg(args)
      if (val.length > 0) return quantityOrValue(this.calculate(val), args)
      else return null
    }
  }

  calculate (list) {
    let val = this.stats(list)
    if (val) return val[this.type]
  }

  stats (list) {
    let sum = list.reduce((x, y) => x + y)
    let mean = sum / list.length
    let sumOfSquares = 0

    list.forEach(sq => { sumOfSquares += Math.pow((sq - mean), 2) })

    let stdVar = (1 / list.length) * sumOfSquares
    let popVar = (1 / (list.length - 1)) * sumOfSquares
    let stdDev = Math.sqrt(stdVar)
    let popDev = Math.sqrt(popVar)

    return {standard_variance: stdVar, population_variance: popVar, standard_deviation: stdDev, population_deviation: popDev}
  }
}

export class PopulationStdDev extends StdDev {
  constructor (json) {
    super(json)
    this.type = 'population_deviation'
  }
}

export class Variance extends StdDev {
  constructor (json) {
    super(json)
    this.type = 'standard_variance'
  }
}

export class PopulationVariance extends StdDev {
  constructor (json) {
    super(json)
    this.type = 'population_variance'
  }
}

export class AllTrue extends AggregateExpression {
  exec (ctx) {
    let args = this.source.exec(ctx)
    return allTrue(args)
  }
}

export class AnyTrue extends AggregateExpression {
  exec (ctx) {
    let args = this.source.exec(ctx)
    return anyTrue(args)
  }
}

