import Exception from '../datatypes/Exception'
import DateTime from '../datatypes/DateTime'
import Uncertainty from '../datatypes/Uncertainty'

export const MAX_INT_VALUE = Math.pow(2, 31) - 1
export const MIN_INT_VALUE = Math.pow(-2, 31)
export const MAX_FLOAT_VALUE = (Math.pow(10, 37) - 1) / Math.pow(10, 8)
export const MIN_FLOAT_VALUE = (Math.pow(-10, 37) + 1) / Math.pow(10, 8)
export const MIN_FLOAT_PRECISION_VALUE = Math.pow(10, -8)
export const MIN_DATE_VALUE = DateTime.parse('1900-01-01T00:00:00.000')
export const MAX_DATE_VALUE = DateTime.parse('9999-12-31T23:59:59.999')

export class OverFlowException extends Exception {}

export function successor (val) {
  if (typeof val === 'number') {
    if (parseInt(val) === val) {
      if (val === MAX_INT_VALUE) throw new OverFlowException()
      else return val + 1
    } else {
      // not bothering with the max float test because javascript does not handle floats at the level
      // very well
      return val + MIN_FLOAT_PRECISION_VALUE
    }
  } else if (val instanceof DateTime) {
    if (val.sameAs(MAX_DATE_VALUE)) throw new OverFlowException()
    else return val.successor()
  } else if (val instanceof Uncertainty) {
    // For uncertainties, if the high is the max val, don't increment it
    let high = (() => {
      try {
        return successor(val.high)
      } catch (e) {
        return val.high
      }
    })()
    return new Uncertainty(successor(val.low), high)
  } else if (val == null) {
    return null
  }
}

export function predecessor (val) {
  if (typeof val === 'number') {
    if (parseInt(val) === val) {
      if (val === MIN_INT_VALUE) throw new OverFlowException()
      else return val - 1
    } else {
      // Not bothering with the min float test because javascript does not handle floats at the level
      // very well
      return val - MIN_FLOAT_PRECISION_VALUE
    }
  } else if (val instanceof DateTime) {
    if (val.sameAs(MIN_DATE_VALUE)) throw new OverFlowException()
    else return val.predecessor()
  } else if (val instanceof Uncertainty) {
    // For uncertainties, if the low is the min val, don't decrement it
    let low = (() => {
      try {
        return predecessor(val.low)
      } catch (e) {
        return val.low
      }
    })()
    return new Uncertainty(low, predecessor(val.high))
  } else if (val == null) {
    return null
  }
}

export function maxValueForInstance (val) {
  if (typeof val === 'number') {
    if (parseInt(val) === val) return MAX_INT_VALUE
    else return MAX_FLOAT_VALUE
  } else if (val instanceof DateTime) {
    return MAX_DATE_VALUE
  } else {
    return null
  }
}

export function minValueForInstance (val) {
  if (typeof val === 'number') {
    if (parseInt(val) === val) return MIN_INT_VALUE
    else return MIN_FLOAT_VALUE
  } else if (val instanceof DateTime) {
    return MIN_DATE_VALUE
  } else {
    return null
  }
}

