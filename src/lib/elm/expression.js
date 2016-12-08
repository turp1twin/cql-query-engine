import build from './build'
import { typeIsArray, isUndefinedOrNull } from '../util/util'

export class Expression {
  constructor (json) {
    if (json.operand != null) {
      const op = build(json.operand)
      if (typeIsArray(json.operand)) this.args = op
      else this.arg = op
    }
  }

  exec (ctx) {
    return this
  }

  execArgs (ctx) {
    if (!isUndefinedOrNull(this.args)) return this.args.map(arg => arg.exec(ctx))
    else if (!isUndefinedOrNull(this.arg)) return this.arg.exec(ctx)
    else return null
  }
}

export class UnimplementedExpression extends Expression {

  constructor (json) {
    super(json)
    this.json = json
  }

  exec (ctx) {
    throw new Error(`Unimplemented Expression: ${this.json.type}`)
  }
}
