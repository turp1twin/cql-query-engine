import { Expression, UnimplementedExpression } from './expression'
import { FunctionRef } from './reusable'
import DateTime from '../datatypes/DateTime'
import { parseQuantity } from './quantity'

// TODO: Casting and Conversion needs unit tests!

export class As extends Expression {
  constructor (json) {
    super(json)
    this.asType = json.asType
    this.asTypeSpecifier = json.asTypeSpecifier
    this.strict = json.strict != null ? json.strict : false
  }

  exec (ctx) {
    // TODO: Currently just returns the arg (which works for null, but probably not others)
    return this.execArgs(ctx)
  }
}

export class ToDateTime extends FunctionRef {
  exec (ctx) {
    const ary = this.execArgs(ctx)
    if (ary.length > 0 && (ary[0] != null)) return DateTime.parse(ary[0])
    else return null
  }
}

export class Convert extends Expression {
  constructor (json) {
    super(json)
    this.toType = json.toType
  }

  exec (ctx) {
    const arg = this.execArgs(ctx)
    if ((arg != null) && typeof arg !== 'undefined') {
      let strArg = arg.toString()
      switch (this.toType) {
        case '{urn:hl7-org:elm-types:r1}Boolean':
          if (strArg === 'true') return true
          else return false
        case '{urn:hl7-org:elm-types:r1}Decimal': return parseFloat(strArg)
        case '{urn:hl7-org:elm-types:r1}Integer': return parseInt(strArg)
        case '{urn:hl7-org:elm-types:r1}String': return strArg
        case '{urn:hl7-org:elm-types:r1}Quantity': return parseQuantity(strArg)
        case '{urn:hl7-org:elm-types:r1}DateTime': return DateTime.parse(strArg)
        default:
          return arg
      }
    } else {
      return arg
    }
  }
}

export class Is extends UnimplementedExpression {}
export class IntervalTypeSpecifier extends UnimplementedExpression {}
export class ListTypeSpecifier extends UnimplementedExpression {}
export class NamedTypeSpecifier extends UnimplementedExpression {}
export class TupleTypeSpecifier extends UnimplementedExpression {}
