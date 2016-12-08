import { Expression } from './expression'
import build from './build'
import { guard } from '../util/util'
import * as DT from '../datatypes/datatypes'

export class DateTime extends Expression {
  static PROPERTIES = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond', 'timezoneOffset']

  constructor (json) {
    super(json)
    DateTime.PROPERTIES.forEach(prop => {
      if (json[prop] != null) this[prop] = build(json[prop])
    })
  }

  exec (ctx) {
    let args = (() => {
      let result = []
      DateTime.PROPERTIES.forEach(prop => {
        if (this[prop] != null) result.push(this[prop].exec(ctx))
      })
      return result
    })()

    return new DT.DateTime(...args)
  }
}

// TODO: Update to use timestamp of request, per the spec
export class Today extends Expression {
  exec (ctx) {
    return DT.DateTime.fromDate(new Date()).getDate()
  }
}

// TODO: Update to use timestamp of request, per the spec
export class Now extends Expression {
  exec (ctx) {
    return DT.DateTime.fromDate(new Date())
  }
}

export class DateTimeComponentFrom extends Expression {
  constructor (json) {
    super(json)
    this.precision = json.precision
  }

  exec (ctx) {
    let arg = this.execArgs(ctx)
    if (arg != null) return arg[this.precision.toLowerCase()]
    else return null
  }
}

export class DateFrom extends Expression {
  exec (ctx) {
    const date = this.execArgs(ctx)
    if (date != null) return date.getDate()
    else return null
  }
}

export class TimeFrom extends Expression {
  exec (ctx) {
    const date = this.execArgs(ctx)
    if (date != null) return date.getTime()
    else return null
  }
}

export class TimezoneFrom extends Expression {
  exec (ctx) {
    const date = this.execArgs(ctx)
    if (date != null) return date.timezoneOffset
    else return null
  }
}

export class SameAs extends Expression {
  constructor (json) {
    super(json)
    this.precision = json.precision
  }

  exec (ctx) {
    const [d1, d2] = this.execArgs(ctx)
    if ((d1 != null) && (d2 != null)) {
      return d1.sameAs(d2, guard(this.precision, x => x.toLowerCase()))
    } else return null
  }
}

export class SameOrAfter extends Expression {
  constructor (json) {
    super(json)
    this.precision = json.precision
  }

  exec (ctx) {
    const [d1, d2] = this.execArgs(ctx)
    if ((d1 != null) && (d2 != null)) {
      return d1.sameOrAfter(d2, guard(this.precision, x => x.toLowerCase()))
    } else return null
  }
}

export class SameOrBefore extends Expression {
  constructor (json) {
    super(json)
    this.precision = json.precision
  }

  exec (ctx) {
    const [d1, d2] = this.execArgs(ctx)
    if ((d1 != null) && (d2 != null)) {
      return d1.sameOrBefore(d2, guard(this.precision, x => x.toLowerCase()))
    } else return null
  }
}

// Delegated to by overloaded#After
export function doAfter (a, b, precision) {
  return a.after(b, precision)
}

// Delegated to by overloaded#Before
export function doBefore (a, b, precision) {
  return a.before(b, precision)
}

export class DurationBetween extends Expression {
  constructor (json) {
    super(json)
    this.precision = json.precision
  }

  exec (ctx) {
    const args = this.execArgs(ctx)
    const result = args[0].durationBetween(args[1], guard(this.precision, x => x.toLowerCase()))
    if (result.isPoint()) return result.low
    else return result
  }
}
