import ThreeValuedLogic from './ThreeValuedLogic'

export default class Uncertainty {

  static from (obj) {
    if (obj instanceof Uncertainty) return obj
    else return new Uncertainty(obj)
  }

  constructor (low = null, high) {
    this.low = low
    this.high = high
    const gt = (a, b) => {
      if (typeof a.after === 'function') return a.after(b)
      else return a > b
    }
    if (typeof this.high === 'undefined') this.high = this.low
    if ((this.low != null) && (this.high != null) && gt(this.low, this.high)) {
      [this.low, this.high] = [this.high, this.low]
    }
  }

  isPoint () {
    // Note: Can't use normal equality, as that fails for Javascript dates
    // TODO: Fix after we don't need to support Javascript date uncertainties anymore
    const lte = (a, b) => {
      if (a.constructor.name === 'DateTime' || a.constructor.name === 'Quantity') return a.sameOrBefore(b)
      else return a <= b
    }
    const gte = (a, b) => {
      if (a.constructor.name === 'DateTime' || a.constructor.name === 'Quantity') return a.sameOrAfter(b)
      else return a >= b
    }
    return (this.low != null) && (this.high != null) && lte(this.low, this.high) && gte(this.low, this.high)
  }

  equals (other) {
    other = Uncertainty.from(other)
    return ThreeValuedLogic.not(ThreeValuedLogic.or(this.lessThan(other), this.greaterThan(other)))
  }

  lessThan (other) {
    const lt = (a, b) => {
      if (a.constructor.name === 'DateTime') return a.before(b)
      else return a < b
    }
    other = Uncertainty.from(other)
    let bestCase = (this.low == null) || (other.high == null) || lt(this.low, other.high)
    let worstCase = (this.high != null) && (other.low != null) && lt(this.high, other.low)
    if (bestCase === worstCase) return bestCase
    else return null
  }

  greaterThan (other) {
    other = Uncertainty.from(other)
    return other.lessThan(this)
  }

  lessThanOrEquals (other) {
    other = Uncertainty.from(other)
    return ThreeValuedLogic.not(this.greaterThan(other))
  }

  greaterThanOrEquals (other) {
    other = Uncertainty.from(other)
    return ThreeValuedLogic.not(this.lessThan(other))
  }
}
