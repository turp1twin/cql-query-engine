import DateTime from './DateTime'
import Uncertainty from './Uncertainty'
import ThreeValuedLogic from './ThreeValuedLogic'
import { successor, predecessor, minValueForInstance, maxValueForInstance } from '../util/math'
import * as cmp from '../util/comparison'

export default class Interval {
  constructor (low, high, lowClosed = true, highClosed = true) {
    this.low = low
    this.high = high
    this.lowClosed = lowClosed
    this.highClosed = highClosed
  }

  contains (item) {
    if (item instanceof Interval) throw new Error('Argument to contains must be a point')
    const closed = this.toClosed()
    return ThreeValuedLogic.and(
      cmp.lessThanOrEquals(closed.low, item),
      cmp.greaterThanOrEquals(closed.high, item)
    )
  }

  properlyIncludes (other) {
    if (!(other instanceof Interval)) throw new Error('Argument to properlyIncludes must be an interval')
    return ThreeValuedLogic.and(
      this.includes(other),
      ThreeValuedLogic.not(cmp.equals(this, other))
    )
  }

  includes (other) {
    if (!(other instanceof Interval)) throw new Error('Argument to includes must be an interval')
    const a = this.toClosed()
    const b = other.toClosed()
    return ThreeValuedLogic.and(
      cmp.lessThanOrEquals(a.low, b.low),
      cmp.greaterThanOrEquals(a.high, b.high)
    )
  }

  includedIn (other) {
    if (!(other instanceof Interval)) throw new Error('Argument to includedIn must be an interval')
    return other.includes(this)
  }

  overlaps (item) {
    let itemClosed
    const closed = this.toClosed()
    const [low, high] = item instanceof Interval ? (itemClosed = item.toClosed(), [itemClosed.low, itemClosed.high]) : [item, item]

    return ThreeValuedLogic.and(
      cmp.lessThanOrEquals(closed.low, high),
      cmp.greaterThanOrEquals(closed.high, low)
    )
  }

  overlapsAfter (item) {
    const closed = this.toClosed()
    const high = item instanceof Interval ? item.toClosed().high : item
    return ThreeValuedLogic.and(
      cmp.lessThanOrEquals(closed.low, high),
      cmp.greaterThan(closed.high, high)
    )
  }

  overlapsBefore (item) {
    const closed = this.toClosed()
    const low = item instanceof Interval ? item.toClosed().low : item
    return ThreeValuedLogic.and(
      cmp.lessThan(closed.low, low),
      cmp.greaterThanOrEquals(closed.high, low)
    )
  }

  areDateTimes (x, y) {
    return [x, y].every(z => z instanceof DateTime)
  }

  areNumeric (x, y) {
    return [x, y].every(z => typeof z === 'number' || (z instanceof Uncertainty && typeof z.low === 'number'))
  }

  lowestNumericUncertainty (x, y) {
    if (!(x instanceof Uncertainty)) x = new Uncertainty(x)
    if (!(y instanceof Uncertainty)) y = new Uncertainty(y)
    const low = x.low < y.low ? x.low : y.low
    const high = x.high < y.high ? x.high : y.high
    if (low !== high) return new Uncertainty(low, high)
    else return low
  }

  highestNumericUncertainty (x, y) {
    if (!(x instanceof Uncertainty)) x = new Uncertainty(x)
    if (!(y instanceof Uncertainty)) y = new Uncertainty(y)
    const low = x.low > y.low ? x.low : y.low
    const high = x.high > y.high ? x.high : y.high
    if (low !== high) return new Uncertainty(low, high)
    else return low
  }

  union (other) {
    if (!(other instanceof Interval)) throw new Error('Argument to union must be an interval')
    // Note that interval union is only defined if the arguments overlap or meet.
    if (this.overlaps(other) || this.meets(other)) {
      const [a, b] = [this.toClosed(), other.toClosed()]
      const [l, lc] = (() => {
        if (cmp.lessThanOrEquals(a.low, b.low)) return [this.low, this.lowClosed]
        else if (cmp.greaterThanOrEquals(a.low, b.low)) return [other.low, other.lowClosed]
        else if (this.areNumeric(a.low, b.low)) return [this.lowestNumericUncertainty(a.low, b.low), true]
        else if (this.areDateTimes(a.low, b.low) && a.low.isMorePrecise(b.low)) return [other.low, other.lowClosed]
        else return [this.low, this.lowClosed]
      })()
      const [h, hc] = (() => {
        if (cmp.greaterThanOrEquals(a.high, b.high)) return [this.high, this.highClosed]
        else if (cmp.lessThanOrEquals(a.high, b.high)) return [other.high, other.highClosed]
        else if (this.areNumeric(a.low, b.low)) return [this.highestNumericUncertainty(a.high, b.high), true]
        else if (this.areDateTimes(a.high, b.high) && a.high.isMorePrecise(b.high)) return [other.high, other.highClosed]
        else return [this.high, this.highClosed]
      })()
      return new Interval(l, h, lc, hc)
    } else {
      return null
    }
  }

  intersect (other) {
    if (!(other instanceof Interval)) throw new Error('Argument to union must be an interval')
    // Note that interval union is only defined if the arguments overlap.
    if (this.overlaps(other)) {
      const [a, b] = [this.toClosed(), other.toClosed()]
      const [l, lc] = (() => {
        if (cmp.greaterThanOrEquals(a.low, b.low)) return [this.low, this.lowClosed]
        else if (cmp.lessThanOrEquals(a.low, b.low)) return [other.low, other.lowClosed]
        else if (this.areNumeric(a.low, b.low)) return [this.highestNumericUncertainty(a.low, b.low), true]
        else if (this.areDateTimes(a.low, b.low) && b.low.isMorePrecise(a.low)) return [other.low, other.lowClosed]
        else return [this.low, this.lowClosed]
      })()
      const [h, hc] = (() => {
        if (cmp.lessThanOrEquals(a.high, b.high)) return [this.high, this.highClosed]
        else if (cmp.greaterThanOrEquals(a.high, b.high)) return [other.high, other.highClosed]
        else if (this.areNumeric(a.low, b.low)) return [this.lowestNumericUncertainty(a.high, b.high), true]
        else if (this.areDateTimes(a.high, b.high) && b.high.isMorePrecise(a.high)) return [other.high, other.highClosed]
        else return [this.high, this.highClosed]
      })()
      return new Interval(l, h, lc, hc)
    } else {
      return null
    }
  }

  except (other) {
    if (other === null) return null
    if (!(other instanceof Interval)) throw new Error('Argument to except must be an interval')

    const ol = this.overlaps(other)
    if (ol === true) {
      let olb = this.overlapsBefore(other)
      let ola = this.overlapsAfter(other)
      if (olb === true && ola === false) return new Interval(this.low, other.low, this.lowClosed, !other.lowClosed)
      else if (ola === true && olb === false) return new Interval(other.high, this.high, !other.highClosed, this.highClosed)
      else return null
    } else if (ol === false) {
      return this
    } else { // ol is null
      return null
    }
  }

  equals (other) {
    if (other instanceof Interval) {
      const [a, b] = [this.toClosed(), other.toClosed()]
      return ThreeValuedLogic.and(
        cmp.equals(a.low, b.low),
        cmp.equals(a.high, b.high)
      )
    } else {
      return false
    }
  }

  after (other) {
    const closed = this.toClosed()
    const otherClosed = other.toClosed()
    // Meets spec, but not 100% correct (e.g., (null, 5] after [6, 10] --> null)
    // Simple way to fix it: and w/ not overlaps
    return cmp.greaterThan(closed.low, otherClosed.high)
  }

  before (other) {
    const closed = this.toClosed()
    const otherClosed = other.toClosed()
    // Meets spec, but not 100% correct (e.g., (null, 5] after [6, 10] --> null)
    // Simple way to fix it: and w/ not overlaps
    return cmp.lessThan(closed.high, otherClosed.low)
  }

  meets (other) {
    return ThreeValuedLogic.or(
      this.meetsBefore(other),
      this.meetsAfter(other)
    )
  }

  meetsAfter (other) {
    try {
      return cmp.equals(this.toClosed().low, successor(other.toClosed().high))
    } catch (error) {
      return false
    }
  }

  meetsBefore (other) {
    try {
      return cmp.equals(this.toClosed().high, predecessor(other.toClosed().low))
    } catch (error) {
      return false
    }
  }

  width () {
    if (this.low instanceof DateTime || this.high instanceof DateTime) {
      throw new Error('Width of DateTime intervals is not supported')
    }

    const closed = this.toClosed()
    if (closed.low instanceof Uncertainty || closed.high instanceof Uncertainty) {
      return null
    } else {
      // TODO: Fix precision to 8 decimals in other places that return numbers
      const diff = Math.abs(closed.high - closed.low)
      return Math.round(diff * Math.pow(10, 8)) / Math.pow(10, 8)
    }
  }

  toClosed () {
    let point = this.low != null ? this.low : this.high
    if (typeof point === 'number' || point instanceof DateTime) {
      let low = (() => {
        if (this.lowClosed && this.low == null) return minValueForInstance(point)
        else if (!this.lowClosed && this.low != null) return successor(this.low)
        else return this.low
      })()
      let high = (() => {
        if (this.highClosed && this.high == null) return maxValueForInstance(point)
        else if (!this.highClosed && this.high != null) return predecessor(this.high)
        else return this.high
      })()
      if (low == null) low = new Uncertainty(minValueForInstance(point), high)
      if (high == null) high = new Uncertainty(low, maxValueForInstance(point))
      return new Interval(low, high, true, true)
    } else {
      return new Interval(this.low, this.high, true, true)
    }
  }
}
