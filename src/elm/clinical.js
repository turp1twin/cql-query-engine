import { Expression } from './expression'
import { ValueSet } from '../datatypes/datatypes'
import build from './build'

export class ValueSetDef extends Expression {

  constructor (json) {
    super(json)
    this.name = json.name
    this.id = json.id
    this.version = json.version
  }

  // todo: code systems and versions
  exec (ctx) {
    let left
    let valueSet = (left = ctx.codeService.findValueSet(this.id, this.version)) != null ? left : new ValueSet(this.id, this.version)
    ctx.rootContext().set(this.name, valueSet)
    return valueSet
  }
}

export class ValueSetRef extends Expression {

  constructor (json) {
    super(json)
    this.name = json.name
  }

  exec (ctx) {
    // TODO: This calls the code service every time-- should be optimized
    let valueset = ctx.getValueSet(this.name)
    if (valueset instanceof Expression) valueset = valueset.exec(ctx)
    return valueset
  }
}

export class InValueSet extends Expression {

  constructor (json) {
    super(...arguments)
    this.code = build(json.code)
    this.valueset = new ValueSetRef(json.valueset)
  }

  exec (ctx) {
    let code = this.code.exec(ctx)
    let valueset = this.valueset.exec(ctx)
    if ((code != null) && (valueset != null)) return valueset.hasCode(code)
    else return false
  }
}

const calculateAge = (date1, date2, precision) => {
  let ageInMS
  let divisor
  if (date1.getTime() - date2.getTime() > 0) return 0
  const value = precision === 'Year' ? monthsDiff(date1, date2) / 12
    : precision === 'Month' ? monthsDiff(date1, date2)
    : (ageInMS = date2.getTime() - date1.getTime(), divisor = (() => {
      switch (precision) {
        case 'Day': return 1000 * 60 * 60 * 24
        case 'Hour': return 1000 * 60 * 60
        case 'Minute': return 1000 * 60
        case 'Second': return 1000
        default: return 1
      }
    })(), ageInMS / divisor)

  return Math.floor(value)
}

const monthsDiff = (date1, date2) => {
  const [high, low] = date1.getTime() > date2.getTime() ? [date1, date2] : [date2, date1]

  // Rough approximation not taking day into account yet.  This may be +1 month
  let months = ((high.getFullYear() - low.getFullYear()) * 12) + (high.getMonth() - low.getMonth())
  if (months === 0) return 0

  let date3 = new Date(low.getTime())
  // Add the number of months to the low date clone to bring it up to the current month and year
  // note however that this may push the date into the next month.  If the low date was in a month
  // with 31 days and the high date is in a month with less then 31 days this will cause the date to
  // be pushed forward into the next month.
  date3.setMonth(low.getMonth() + months)
  // If the months are equal and the adjusted dated is greater than the high date we havn't
  // reached the actual turn over day so remove a month from the count
  if (date3.getMonth() === high.getMonth() && (date3.getDate() - high.getDate() > 0)) {
    months--
  }

  return months
}

export class CalculateAge extends Expression {
  constructor (json) {
    super(...arguments)
    this.precision = json.precision
  }

  exec (ctx) {
    let date1 = this.execArgs(ctx).toJSDate()
    let date2 = new Date()
    return calculateAge(date1, date2, this.precision)
  }
}

export class CalculateAgeAt extends Expression {
  constructor (json) {
    super(...arguments)
    this.precision = json.precision
  }

  exec (ctx) {
    const args = this.execArgs(ctx)
    const date1 = args[0].toJSDate()
    const date2 = args[1].toJSDate()
    return calculateAge(date1, date2, this.precision)
  }
}

