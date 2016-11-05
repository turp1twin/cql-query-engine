import DateTime from '../datatypes/DateTime'
import Uncertainty from '../datatypes/Uncertainty'
import { isUndefinedOrNull } from './util'

const areNumbers = (a, b) => typeof a === 'number' && typeof b === 'number'
const areDateTimes = (a, b) => a instanceof DateTime && b instanceof DateTime
const isUncertainty = x => x instanceof Uncertainty

export function lessThan (a, b, precision = DateTime.Unit.MILLISECOND) {
  if (areNumbers(a, b)) return a < b
  else if (areDateTimes(a, b)) return a.before(b, precision)
  else if (isUncertainty(a)) return a.lessThan(b)
  else if (isUncertainty(b)) return Uncertainty.from(a).lessThan(b)
  else return null
}

export function lessThanOrEquals (a, b, precision = DateTime.Unit.MILLISECOND) {
  if (areNumbers(a, b)) return a <= b
  else if (areDateTimes(a, b)) return a.sameOrBefore(b, precision)
  else if (isUncertainty(a)) return a.lessThanOrEquals(b)
  else if (isUncertainty(b)) return Uncertainty.from(a).lessThanOrEquals(b)
  else return null
}

export function greaterThan (a, b, precision = DateTime.Unit.MILLISECOND) {
  if (areNumbers(a, b)) return a > b
  else if (areDateTimes(a, b)) return a.after(b, precision)
  else if (isUncertainty(a)) return a.greaterThan(b)
  else if (isUncertainty(b)) return Uncertainty.from(a).greaterThan(b)
  else return null
}

export function greaterThanOrEquals (a, b, precision = DateTime.Unit.MILLISECOND) {
  if (areNumbers(a, b)) return a >= b
  else if (areDateTimes(a, b)) return a.sameOrAfter(b, precision)
  else if (isUncertainty(a)) return a.greaterThanOrEquals(b)
  else if (isUncertainty(b)) return Uncertainty.from(a).greaterThanOrEquals(b)
  else return null
}

export function equals (a, b) {
  // Handle null cases first
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return a === b

  // If one is an Uncertainty, convert the other to an Uncertainty
  if (a instanceof Uncertainty) b = Uncertainty.from(b)
  else if (b instanceof Uncertainty) a = Uncertainty.from(a)

  // Use overloaded 'equals' function if it is available
  if (typeof a.equals === 'function') return a.equals(b)

  // Return true of the objects are strictly equal
  if (a === b) return true

  // Return false if they are instances of different classes
  let [aClass, bClass] = [a, b].map(obj => Object.prototype.toString.call(obj))
  if (aClass !== bClass) return false

  switch (aClass) {
    case '[object Date]':
      // Compare the ms since epoch
      return a.getTime() === b.getTime()
    case '[object RegExp]':
      // Compare the components of the regular expression
      return ['source', 'global', 'ignoreCase', 'multiline'].every(p => a[p] === b[p])
    case '[object Array]':
      // Compare every item in the array
      return a.length === b.length && a.every((item, i) => equals(item, b[i]))
    case '[object Object]':
      // Return false if they are instances of different classes
      if (!(b instanceof a.constructor) || !(a instanceof b.constructor)) return false
      // Do deep comparison of keys and values
      let key
      let aKeys = (() => {
        let results = []
        if (typeof key !== 'function') {
          for (key in a) results.push(key)
        }
        return results
      })()
      let bKeys = (() => {
        let results = []
        if (typeof key !== 'function') {
          for (key in b) results.push(key)
        }
        return results
      })()
      return aKeys.length === bKeys.length && aKeys.every(key => equals(a[key], b[key]))
  }

  // If we made it this far, we can't handle it
  return false
}
