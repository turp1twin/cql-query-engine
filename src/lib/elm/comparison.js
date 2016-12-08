import { Expression } from './expression'
import { Uncertainty } from '../datatypes/datatypes'

// Equal is completely handled by overloaded#Equal
// NotEqual is completely handled by overloaded#Equal

export class Less extends Expression {
  exec (ctx) {
    const args = this.execArgs(ctx).map(x => Uncertainty.from(x))
    return args[0].lessThan(args[1])
  }
}

export class LessOrEqual extends Expression {
  exec (ctx) {
    const args = this.execArgs(ctx).map(x => Uncertainty.from(x))
    return args[0].lessThanOrEquals(args[1])
  }
}

export class Greater extends Expression {
  exec (ctx) {
    const args = this.execArgs(ctx).map(x => Uncertainty.from(x))
    return args[0].greaterThan(args[1])
  }
}

export class GreaterOrEqual extends Expression {
  exec (ctx) {
    const args = this.execArgs(ctx).map(x => Uncertainty.from(x))
    return args[0].greaterThanOrEquals(args[1])
  }
}

