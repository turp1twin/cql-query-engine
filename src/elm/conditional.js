import { Expression } from './expression'
import build from './build'
import { equals } from '../util/comparison'

// TODO: Spec lists "Conditional", but it's "If" in the XSD
export class If extends Expression {
  constructor (json) {
    super(...arguments)
    this.condition = build(json.condition)
    this.th = build(json.then)
    this.els = build(json.else)
  }

  exec (ctx) {
    if (this.condition.exec(ctx)) return this.th.exec(ctx)
    else return this.els.exec(ctx)
  }
}

export class CaseItem {
  constructor (json) {
    this.when = build(json.when)
    this.then = build(json.then)
  }
}

export class Case extends Expression {
  constructor (json) {
    super(...arguments)
    this.comparand = build(json.comparand)
    this.caseItems = json.caseItem.map(ci => new CaseItem(ci))
    this.els = build(json.else)
  }

  exec (ctx) {
    if (this.comparand) return this.execSelected(ctx)
    else return this.execStandard(ctx)
  }

  execSelected (ctx) {
    let val = this.comparand.exec(ctx)
    for (let i = 0; i < this.caseItems.length; i++) {
      let ci = this.caseItems[i]
      if (equals(ci.when.exec(ctx), val)) return ci.then.exec(ctx)
    }
    return this.els.exec(ctx)
  }

  execStandard (ctx) {
    for (let i = 0; i < this.caseItems.length; i++) {
      let ci = this.caseItems[i]
      if (ci.when.exec(ctx)) return ci.then.exec(ctx)
    }
    return this.els.exec(ctx)
  }
}
