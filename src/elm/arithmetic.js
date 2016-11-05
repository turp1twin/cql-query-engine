import { Expression } from './expression'
import { guard } from '../util/util'
import build from './build'
import { predecessor, successor, MIN_DATE_VALUE, MIN_INT_VALUE, MIN_FLOAT_VALUE, MAX_INT_VALUE, MAX_FLOAT_VALUE, MAX_DATE_VALUE } from '../util/math'
import { createQuantity, doAddition, doSubtraction, doMultiplication, doDivision } from './quantity'

export class Add extends Expression {
  exec (ctx) {
    let args = this.execArgs(ctx)
    if (guard(args, x => x.some(x => x == null))) return null
    else {
      return guard(args, x1 => x1.reduce((x, y) => {
        if (x.constructor.name === 'Quantity' || x.constructor.name === 'DateTime') return doAddition(x, y)
        else return x + y
      }))
    }
  }
}

export class Subtract extends Expression {
  exec (ctx) {
    let args = this.execArgs(ctx)
    if (args.some(x => x == null)) return null
    else {
      return args.reduce((x, y) => {
        if (x.constructor.name === 'Quantity' || x.constructor.name === 'DateTime') return doSubtraction(x, y)
        else return x - y
      })
    }
  }
}

export class Multiply extends Expression {
  exec (ctx) {
    let args = this.execArgs(ctx)
    if (guard(args, x => x.some(x => x == null))) return null
    else {
      return guard(args, x1 => x1.reduce((x, y) => {
        if (x.constructor.name === 'Quantity' || y.constructor.name === 'Quantity') return doMultiplication(x, y)
        else return x * y
      }))
    }
  }
}

export class Divide extends Expression {
  exec (ctx) {
    let args = this.execArgs(ctx)
    if (guard(args, x => x.some(x => x == null))) return null
    else {
      return guard(args, x1 => x1.reduce((x, y) => {
        if (x.constructor.name === 'Quantity') return doDivision(x, y)
        else return x / y
      }))
    }
  }
}

export class TruncatedDivide extends Expression {
  exec (ctx) {
    return Math.floor(this.execArgs(ctx).reduce((x, y) => x / y))
  }
}

export class Modulo extends Expression {
  exec (ctx) {
    return this.execArgs(ctx).reduce((x, y) => x % y)
  }
}

export class Ceiling extends Expression {
  exec (ctx) {
    return Math.ceil(this.execArgs(ctx))
  }
}

export class Floor extends Expression {
  exec (ctx) {
    return Math.floor(this.execArgs(ctx))
  }
}

export class Truncate extends Floor {}
export class Abs extends Expression {
  exec (ctx) {
    let args = this.execArgs(ctx)
    if (guard(args, x => x.constructor.name) === 'Quantity') {
      return createQuantity(Math.abs(args.value), args.unit)
    } else {
      return Math.abs(args)
    }
  }
}

export class Negate extends Expression {
  exec (ctx) {
    let args = this.execArgs(ctx)
    if (guard(args, x => x.constructor.name) === 'Quantity') {
      return createQuantity(args.value * -1, args.unit)
    } else {
      return args * -1
    }
  }
}

export class Round extends Expression {
  constructor (json) {
    super(json)
    this.precision = build(json.precision)
  }

  exec (ctx) {
    let num = this.execArgs(ctx)
    let dec = (this.precision != null) ? this.precision.exec(ctx) : 0
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)
  }
}

export class Ln extends Expression {
  exec (ctx) {
    return Math.log(this.execArgs(ctx))
  }
}

export class Log extends Expression {
  exec (ctx) {
    return this.execArgs(ctx).reduce((x, y) => Math.log(x) / Math.log(y))
  }
}

export class Power extends Expression {
  exec (ctx) {
    return this.execArgs(ctx).reduce((x, y) => Math.pow(x, y))
  }
}

export class MinValue extends Expression {
  MIN_VALUES = {'Integer': MIN_INT_VALUE, 'Real': MIN_FLOAT_VALUE, 'DateTime': MIN_DATE_VALUE}

  exec (ctx) {
    let val = this.execArgs(ctx)
    return this.MIN_VALUES[val]
  }
}

export class MaxValue extends Expression {
  MAX_VALUES = {'Integer': MAX_INT_VALUE, 'Real': MAX_FLOAT_VALUE, 'DateTime': MAX_DATE_VALUE}

  exec (ctx) {
    let val = this.execArgs(ctx)
    return this.MAX_VALUES[val]
  }
}

export class Successor extends Expression {
  exec (ctx) {
    return successor(this.execArgs(ctx))
  }
}

export class Predecessor extends Expression {
  exec (ctx) {
    return predecessor(this.execArgs(ctx))
  }
}

