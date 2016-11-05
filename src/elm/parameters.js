import { Expression } from './expression'
import build from './build'
import { guard } from '../util/util'

export class ParameterDef extends Expression {
  constructor (json) {
    super(json)
    this.name = json.name
    this.default = build(json.default)
  }

  exec (ctx) {
    if (guard(ctx, x => x.parameters[this.name]) != null) return ctx.parameters[this.name]
    else return guard(this.default, x1 => x1.exec(ctx))
  }
}

export class ParameterRef extends Expression {
  constructor (json) {
    super(json)
    this.name = json.name
  }

  exec (ctx) {
    return guard(ctx.getParameter(this.name), x => x.exec(ctx))
  }
}

