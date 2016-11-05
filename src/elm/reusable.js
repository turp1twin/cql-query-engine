import { Expression } from './expression'
import build from './build'
import { guard, guardFunc } from '../util/util'

export class ExpressionDef extends Expression {
  constructor (json) {
    super(json)
    this.name = json.name
    this.context = json.context
    this.expression = build(json.expression)
  }

  exec (ctx) {
    let value = guard(this.expression, x => x.exec(ctx))
    ctx.rootContext().set(this.name, value)
    return value
  }
}

export class ExpressionRef extends Expression {
  constructor (json) {
    super(json)
    this.name = json.name
    this.library = json.libraryName
  }

  exec (ctx) {
    ctx = this.library ? ctx.getLibraryContext(this.library) : ctx
    let value = ctx.get(this.name)
    if (value instanceof Expression) {
      value = value.exec(ctx)
    }
    return value
  }
}

export class FunctionDef extends Expression {
  constructor (json) {
    super(json)
    this.name = json.name
    this.expression = build(json.expression)
    this.parameters = json.operand
  }

  exec (ctx) {
    return this
  }
}

export class FunctionRef extends Expression {
  constructor (json) {
    super(json)
    this.name = json.name
    this.library = json.libraryName
  }

  exec (ctx) {
    let functionDef = this.library ? guard(ctx.get(this.library), x => x.get(this.name)) : ctx.get(this.name)
    let args = this.execArgs(ctx)
    let childCtx = this.library ? guard(ctx.getLibraryContext(this.library), x1 => x1.childContext()) : ctx.childContext()
    if (args.length !== functionDef.parameters.length) {
      throw new Error('incorrect number of arguments supplied')
    }
    for (let i = 0; i < functionDef.parameters.length; i++) {
      let p = functionDef.parameters[i]
      childCtx.set(p.name, args[i])
    }
    return functionDef.expression.exec(childCtx)
  }
}

export class OperandRef extends Expression {
  constructor (json) {
    super(json)
    this.name = json.name
  }

  exec (ctx) {
    return ctx.get(this.name)
  }
}

export class IdentifierRef extends Expression {
  constructor (json) {
    super(json)
    this.name = json.name
    this.library = json.libraryName
  }

  exec (ctx) {
    // TODO: Technically, the ELM Translator should never output one of these
    // but this code is needed since it does, as a work-around to get queries
    // to work properly when sorting by a field in a tuple
    let val = this.library ? guard(ctx.get(this.library), x => x.get(this.name)) : ctx.get(this.name)

    if (val == null) {
      const parts = this.name.split('.')
      val = ctx.get(parts)
      if ((val != null) && parts.length > 1) {
        let currObj = val
        const iterable = parts.slice(1)
        iterable.forEach(part => {
          let _obj = guard(currObj, x1 => x1[part]) != null ? currObj[part] : guardFunc(guard(currObj, x2 => x2.get), f => f(part))
          currObj = _obj instanceof Function ? _obj.call(currObj) : _obj
        })
        val = currObj
      }
    }
    if (val instanceof Function) return val.call(ctx.contextValues)
    else return val
  }
}
