import { Expression } from './expression'
import { ThreeValuedLogic } from '../datatypes/datatypes'

export class And extends Expression {
  exec (ctx) {
    return ThreeValuedLogic.and(...this.execArgs(ctx))
  }
}

export class Or extends Expression {
  exec (ctx) {
    return ThreeValuedLogic.or(...this.execArgs(ctx))
  }
}

export class Not extends Expression {
  exec (ctx) {
    return ThreeValuedLogic.not(this.execArgs(ctx))
  }
}

export class Xor extends Expression {
  exec (ctx) {
    return ThreeValuedLogic.xor(...this.execArgs(ctx))
  }
}
