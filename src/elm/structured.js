import { Expression, UnimplementedExpression } from './expression'
import build from './build'
import { guard, guardFunc } from '../util/util'

export class Property extends Expression {
  constructor (json) {
    super(json)
    this.scope = json.scope
    this.source = build(json.source)
    this.path = json.path
  }

  exec (ctx) {
    let obj = (this.scope != null) ? ctx.get(this.scope) : this.source
    if (obj instanceof Expression) obj = obj.exec(ctx)
    let val = guard(obj, x => x[this.path]) != null ? obj[this.path] : guardFunc(guard(obj, x1 => x1.get), f => f(this.path))

    if (!val) {
      let parts = this.path.split('.')
      let currObj = obj
      parts.forEach(part => {
        let _obj = guard(currObj, x2 => x2[part]) != null ? currObj[part] : guardFunc(guard(currObj, x3 => x3.get), f1 => f1(part))
        currObj = _obj instanceof Function ? _obj.call(currObj) : _obj
      })
      val = currObj
    }
    if (val instanceof Function) return val.call(obj)
    else return val
  }
}

export let Tuple = class Tuple extends Expression {
  constructor (json) {
    super(json)
    this.elements = json.element.map(el => {
      return { name: el.name, value: build(el.value) }
    })
  }

  exec (ctx) {
    const val = {}
    this.elements.forEach(el => {
      val[el.name] = guard(el.value, x => x.exec(ctx))
    })
    return val
  }
}

export class TupleElement extends UnimplementedExpression {}
export class TupleElementDefinition extends UnimplementedExpression {}
