import Uncertainty from './Uncertainty'
import { guard, isUndefinedOrNull } from '../util/util'

export default class DateTime {
  static Unit = { YEAR: 'year', MONTH: 'month', DAY: 'day', HOUR: 'hour', MINUTE: 'minute', SECOND: 'second', MILLISECOND: 'millisecond' }
  static FIELDS = [DateTime.Unit.YEAR, DateTime.Unit.MONTH, DateTime.Unit.DAY, DateTime.Unit.HOUR, DateTime.Unit.MINUTE, DateTime.Unit.SECOND, DateTime.Unit.MILLISECOND]

  static parse (string) {
    let match = /(\d{4})(-(\d{2}))?(-(\d{2}))?(T((\d{2})(\:(\d{2})(\:(\d{2})(\.(\d+))?)?)?)?(([+-])(\d{2})(\:?(\d{2}))?)?)?/.exec(string) // eslint-disable-line no-useless-escape

    if (guard(match, x => x[0]) === string) {
      let args = [match[1], match[3], match[5], match[8], match[10], match[12], match[14]]
      // fix up milliseconds by padding zeros and/or truncating (5 --> 500, 50 --> 500, 54321 --> 543, etc.)
      if (args[6] != null) args[6] = (args[6] + '00').substring(0, 3)
      // convert them all to integers
      args = (() => {
        let result = []
        args.forEach(arg => {
          result.push(arg != null ? parseInt(arg, 10) : void 0)
        })
        return result
      })()
      // convert timezone offset to decimal and add it to arguments
      if (match[17] != null) {
        let num = parseInt(match[17], 10) + ((match[19] != null) ? parseInt(match[19], 10) / 60 : 0)
        args.push(match[16] === '+' ? num : num * -1)
      }
      return new DateTime(...args)
    } else {
      return null
    }
  }

  static fromDate (date, timezoneOffset) {
    if (timezoneOffset != null) {
      date = new Date(date.getTime() + (timezoneOffset * 60 * 60 * 1000))
      return new DateTime(
        date.getUTCFullYear(),
        date.getUTCMonth() + 1,
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds(),
        timezoneOffset)
    } else {
      return new DateTime(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds())
    }
  }

  constructor (year = null, month = null, day = null, hour = null, minute = null, second = null, millisecond = null, timezoneOffset) {
    // from the spec: If no timezone is specified, the timezone of the evaluation request timestamp is used.
    this.year = year
    this.month = month
    this.day = day
    this.hour = hour
    this.minute = minute
    this.second = second
    this.millisecond = millisecond
    this.timezoneOffset = timezoneOffset
    if (isUndefinedOrNull(this.timezoneOffset)) {
      this.timezoneOffset = ((new Date()).getTimezoneOffset() / 60) * -1
    }
  }

  copy () {
    return new DateTime(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond, this.timezoneOffset)
  }

  successor () {
    if (this.millisecond != null) {
      return this.add(1, DateTime.Unit.MILLISECOND)
    } else if (this.second != null) {
      return this.add(1, DateTime.Unit.SECOND)
    } else if (this.minute != null) {
      return this.add(1, DateTime.Unit.MINUTE)
    } else if (this.hour != null) {
      return this.add(1, DateTime.Unit.HOUR)
    } else if (this.day != null) {
      return this.add(1, DateTime.Unit.DAY)
    } else if (this.month != null) {
      return this.add(1, DateTime.Unit.MONTH)
    } else if (this.year != null) {
      return this.add(1, DateTime.Unit.YEAR)
    }
  }

  predecessor () {
    if (this.millisecond != null) {
      return this.add(-1, DateTime.Unit.MILLISECOND)
    } else if (this.second != null) {
      return this.add(-1, DateTime.Unit.SECOND)
    } else if (this.minute != null) {
      return this.add(-1, DateTime.Unit.MINUTE)
    } else if (this.hour != null) {
      return this.add(-1, DateTime.Unit.HOUR)
    } else if (this.day != null) {
      return this.add(-1, DateTime.Unit.DAY)
    } else if (this.month != null) {
      return this.add(-1, DateTime.Unit.MONTH)
    } else if (this.year != null) {
      return this.add(-1, DateTime.Unit.YEAR)
    }
  }

  convertToTimezoneOffset (timezoneOffset = 0) {
    let d = DateTime.fromDate(this.toJSDate(), timezoneOffset)
    return d.reducedPrecision(this.getPrecision())
  }

  sameAs (other, precision = DateTime.Unit.MILLISECOND) {
    if (!(other instanceof DateTime)) return false

    let diff = this.durationBetween(other, precision)
    if (diff.low === 0 && diff.high === 0) return true
    else if (diff.low <= 0 && diff.high >= 0) return null
    else return false
  }

  equals (other) {
    return this.sameAs(other, DateTime.Unit.MILLISECOND)
  }

  sameOrBefore (other, precision = DateTime.Unit.MILLISECOND) {
    if (!(other instanceof DateTime)) return false

    let diff = this.durationBetween(other, precision)
    if (diff.low >= 0 && diff.high >= 0) return true
    else if (diff.low < 0 && diff.high < 0) return false
    else return null
  }

  sameOrAfter (other, precision = DateTime.Unit.MILLISECOND) {
    if (!(other instanceof DateTime)) return false

    let diff = this.durationBetween(other, precision)
    if (diff.low <= 0 && diff.high <= 0) return true
    else if (diff.low > 0 && diff.high > 0) return false
    else return null
  }

  before (other, precision = DateTime.Unit.MILLISECOND) {
    if (!(other instanceof DateTime)) return false

    let diff = this.durationBetween(other, precision)
    if (diff.low > 0 && diff.high > 0) return true
    else if (diff.low <= 0 && diff.high <= 0) return false
    else return null
  }

  after (other, precision = DateTime.Unit.MILLISECOND) {
    if (!(other instanceof DateTime)) return false

    let diff = this.durationBetween(other, precision)
    if (diff.low < 0 && diff.high < 0) return true
    else if (diff.low >= 0 && diff.high >= 0) return false
    else return null
  }

  add (offset, field) {
    // TODO: According to spec, 2/29/2000 + 1 year is 2/28/2001
    // Currently, it evaluates to 3/1/2001.  Doh.
    let result = this.copy()
    if (result[field] != null) {
      // Increment the field, then round-trip to JS date and back for calendar math
      result[field] = result[field] + offset
      let normalized = DateTime.fromDate(result.toJSDate(), this.timezoneOffset)
      DateTime.FIELDS.forEach(field => {
        if (result[field] != null) result[field] = normalized[field]
      })
    }

    return result
  }

  durationBetween (other, unitField) {
    if (!(other instanceof DateTime)) return null

    if (this.timezoneOffset !== other.timezoneOffset) {
      other = other.convertToTimezoneOffset(this.timezoneOffset)
    }

    let a = this.toUncertainty(true)
    let b = other.toUncertainty(true)
    return new Uncertainty(this._durationBetweenDates(a.high, b.low, unitField), this._durationBetweenDates(a.low, b.high, unitField))
  }

  _durationBetweenDates (a, b, unitField) {
    // To count boundaries below month, we need to floor units at lower precisions
    const [aa, bb] = [a, b].map(x => {
      switch (unitField) {
        case DateTime.Unit.DAY: return new Date(x.getFullYear(), x.getMonth(), x.getDate())
        case DateTime.Unit.HOUR: return new Date(x.getFullYear(), x.getMonth(), x.getDate(), x.getHours())
        case DateTime.Unit.MINUTE: return new Date(x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes())
        case DateTime.Unit.SECOND: return new Date(x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), x.getSeconds())
        case DateTime.Unit.MILLISECOND: return new Date(x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), x.getSeconds(), x.getMilliseconds())
        default: return x
      }
    })

    let msDiff = bb.getTime() - aa.getTime()
    switch (unitField) {
      case DateTime.Unit.YEAR: return bb.getFullYear() - aa.getFullYear()
      case DateTime.Unit.MONTH: return ((bb.getMonth() - aa.getMonth()) + (12 * (bb.getFullYear() - aa.getFullYear())))
      case DateTime.Unit.DAY: return Math.floor(msDiff / (24 * 60 * 60 * 1000))
      case DateTime.Unit.HOUR: return Math.floor(msDiff / (60 * 60 * 1000))
      case DateTime.Unit.MINUTE: return Math.floor(msDiff / (60 * 1000))
      case DateTime.Unit.SECOND: return Math.floor(msDiff / 1000)
      case DateTime.Unit.MILLISECOND: return msDiff
      default: return null
    }
  }

  isPrecise () {
    return DateTime.FIELDS.every(field => (this[field] != null))
  }

  isImprecise () {
    return !this.isPrecise()
  }

  isMorePrecise (other) {
    for (let i = 0; i < DateTime.FIELDS.length; i++) {
      let field = DateTime.FIELDS[i]
      if ((other[field] != null) && (this[field] == null)) return false
    }
    return !this.isSamePrecision(other)
  }

  isLessPrecise (other) {
    return !this.isSamePrecision(other) && !this.isMorePrecise(other)
  }

  isSamePrecision (other) {
    for (let i = 0; i < DateTime.FIELDS.length; i++) {
      let field = DateTime.FIELDS[i]
      if ((this[field] != null) && (other[field] == null)) return false
      if ((this[field] == null) && (other[field] != null)) return false
    }
    return true
  }

  getPrecision () {
    let result = null
    if (this.year != null) result = DateTime.Unit.YEAR
    else return result

    if (this.month != null) result = DateTime.Unit.MONTH
    else return result

    if (this.day != null) result = DateTime.Unit.DAY
    else return result

    if (this.hour != null) result = DateTime.Unit.HOUR
    else return result

    if (this.minute != null) result = DateTime.Unit.MINUTE
    else return result

    if (this.second != null) result = DateTime.Unit.SECOND
    else return result

    if (this.millisecond != null) result = DateTime.Unit.MILLISECOND

    return result
  }

  toUncertainty (ignoreTimezone = false) {
    if (ignoreTimezone === null) ignoreTimezone = false
    let low = this.toJSDate(ignoreTimezone)
    let high = (new DateTime(
      this.year,
      this.month != null ? this.month : 12,
      // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate
      this.day != null ? this.day : (new Date(this.year, this.month != null ? this.month : 12, 0)).getDate(),
      this.hour != null ? this.hour : 23,
      this.minute != null ? this.minute : 59,
      this.second != null ? this.second : 59,
      this.millisecond != null ? this.millisecond : 999,
      this.timezoneOffset)).toJSDate(ignoreTimezone)
    return new Uncertainty(low, high)
  }

  toJSDate (ignoreTimezone = false) {
    let [y, mo, d, h, mi, s, ms] = [
      this.year,
      ((this.month != null) ? this.month - 1 : 0),
      this.day != null ? this.day : 1,
      this.hour != null ? this.hour : 0,
      this.minute != null ? this.minute : 0,
      this.second != null ? this.second : 0,
      this.millisecond != null ? this.millisecond : 0]
    if (ignoreTimezone === null) ignoreTimezone = false
    if ((this.timezoneOffset != null) && !ignoreTimezone) {
      return new Date(Date.UTC(y, mo, d, h, mi, s, ms) - (this.timezoneOffset * 60 * 60 * 1000))
    } else {
      return new Date(y, mo, d, h, mi, s, ms)
    }
  }

  _pad (num) {
    return `0${num}`.slice(-2)
  }

  // TODO: Needs unit tests!
  toString () {
    let str = ''
    if (this.year != null) {
      str += this.year
      if (this.month != null) {
        str += `-${this._pad(this.month)}`
        if (this.day != null) {
          str += `-${this._pad(this.day)}`
          if (this.hour != null) {
            str += `T${this._pad(this.hour)}`
            if (this.minute != null) {
              str += `:${this._pad(this.minute)}`
              if (this.second != null) {
                str += `:${this._pad(this.second)}`
                if (this.millisecond != null) {
                  str += `.${this._pad(this.millisecond)}`
                }
              }
            }
          }
        }
      }
    }

    if (str.indexOf('T') !== -1 && (this.timezoneOffset != null)) {
      str += this.timezoneOffset < 0 ? '-' : '+'
      let offsetHours = Math.floor(Math.abs(this.timezoneOffset))
      str += this._pad(offsetHours)
      let offsetMin = (Math.abs(this.timezoneOffset) - offsetHours) * 60
      str += this._pad(offsetMin)
    }

    return str
  }

  getDate () {
    return this.reducedPrecision(DateTime.Unit.DAY)
  }

  getTime () {
    return new DateTime(1900, 1, 1, this.hour, this.minute, this.second, this.millisecond, this.timezoneOffset)
  }

  reducedPrecision (unitField = DateTime.Unit.MILLISECOND) {
    let reduced = this.copy()
    if (unitField !== DateTime.Unit.MILLISECOND) {
      let fieldIndex = DateTime.FIELDS.indexOf(unitField)
      let fieldsToRemove = DateTime.FIELDS.slice(fieldIndex + 1)
      fieldsToRemove.forEach(field => { reduced[field] = null })
    }
    return reduced
  }
}
