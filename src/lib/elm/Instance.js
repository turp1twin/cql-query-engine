import { Expression } from './expression'
import build from './build'
import { Code } from '../datatypes/datatypes'
import { Quantity } from './quantity'
import { guard } from '../util/util'

class Element {
  constructor (json) {
    this.name = json.name
    this.value = build(json.value)
  }

  exec (ctx) {
    return guard(this.value, x => x.exec(ctx))
  }
}

export default class Instance extends Expression {
  constructor (json) {
    super(json)
    this.classType = json.classType
    this.element = (json.element.map(child => new Element(child)))
  }

  exec (ctx) {
    const obj = {}
    this.element.forEach(el => { obj[el.name] = el.exec(ctx) })

    // TODO: Support for other classes like Concept
    switch (this.classType) {
      case '{urn:hl7-org:elm-types:r1}Quantity': return new Quantity(obj)
      case '{urn:hl7-org:elm-types:r1}Code': return new Code(obj.code, obj.system, obj.version, obj.display)
      default: return obj
    }
  }
}
