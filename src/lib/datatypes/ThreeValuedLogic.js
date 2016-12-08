import { contains } from '../util/util'

export default class ThreeValuedLogic {

  static and (...val) {
    if (contains(false, val)) return false
    else if (contains(null, val)) return null
    else return true
  }

  static or (...val) {
    if (contains(true, val)) return true
    else if (contains(null, val)) return null
    else return false
  }

  static xor (...val) {
    if (contains(null, val)) return null
    else return val.reduce((a, b) => (!a ^ !b) === 1)
  }

  static not (val) {
    if (val != null) return !val
    else return null
  }
}
