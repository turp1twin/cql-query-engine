import { Expression } from './expression'

export class Null extends Expression {
  exec (ctx) {
    return null
  }
}

export class IsNull extends Expression {
  exec (ctx) {
    return this.execArgs(ctx) === null
  }
}

export class Coalesce extends Expression {
  exec (ctx) {
    for (let i = 0; i < this.args.length; i++) {
      let arg = this.args[i]
      let result = arg.exec(ctx)
      if (result != null) return result
    }
    return null
  }
}

