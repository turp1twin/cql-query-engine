import { Expression, UnimplementedExpression } from './expression'
import { Context } from '../runtime/context'
import build from './build'
import { guard, allTrue } from '../util/util'
import { equals } from '../util/comparison'

export class AliasedQuerySource {
  constructor (json) {
    this.alias = json.alias
    this.expression = build(json.expression)
  }
}

export class DefineClause {
  constructor (json) {
    this.identifier = json.identifier
    this.expression = build(json.expression)
  }
}

export class With extends Expression {
  constructor (json) {
    super(json)
    this.alias = json.alias
    this.expression = build(json.expression)
    this.suchThat = build(json.suchThat)
  }

  exec (ctx) {
    let records = this.expression.exec(ctx)
    let returns = records.map(rec => {
      let childCtx = ctx.childContext()
      childCtx.set(this.alias, rec)
      return this.suchThat.exec(childCtx)
    })
    return returns.some(x => x)
  }
}

export class Without extends With {
  exec (ctx) {
    return !super.exec(ctx)
  }
}

// ELM-only, not a product of CQL
export class Sort extends UnimplementedExpression {}
export class ByDirection extends Expression {
  constructor (json) {
    super(json)
    this.direction = json.direction
    this.lowOrder = this.direction === 'asc' ? -1 : 1
    this.highOrder = this.lowOrder * -1
  }

  exec (a, b) {
    if (a === b) return 0
    else if (a < b) return this.lowOrder
    else return this.highOrder
  }
}

// ELM-only, not a product of CQL
export class ByColumn extends UnimplementedExpression {}
export class ByExpression extends Expression {
  constructor (json) {
    super(json)
    this.expression = build(json.expression)
    this.direction = json.direction
    this.lowOrder = this.direction === 'asc' ? -1 : 1
    this.highOrder = this.lowOrder * -1
  }

  exec (a, b) {
    let ctx = new Context()
    ctx.contextValues = a
    const aVal = this.expression.exec(ctx)
    ctx.contextValues = b
    const bVal = this.expression.exec(ctx)

    if (aVal === bVal) return 0
    else if (aVal < bVal) return this.lowOrder
    else return this.highOrder
  }
}

export class ReturnClause {
  constructor (json) {
    this.expression = build(json.expression)
    this.distinct = json.distinct != null ? json.distinct : true
  }
}

export class SortClause {
  constructor (json) {
    this.by = build(guard(json, x => x.by))
  }

  sort (values) {
    if (this.by) {
      return values.sort((a, b) => {
        let order = 0
        for (let i = 0; i < this.by.length; i++) {
          let item = this.by[i]
          order = item.exec(a, b)
          if (order !== 0) break
        }
        return order
      })
    }
  }
}

export function toDistinctList (xList) {
  let yList = []
  xList.forEach(x => {
    let inYList = false
    yList.forEach(y => {
      if (equals(x, y)) inYList = true
    })
    if (!inYList) yList.push(x)
  })
  return yList
}

export class Query extends Expression {
  constructor (json) {
    super(json)
    this.sources = new MultiSource((json.source.map(s => new AliasedQuerySource(s))))
    this.defineClauses = (json.define != null) ? json.define.map(d => new DefineClause(d)) : []
    this.relationship = (json.relationship != null) ? build(json.relationship) : []
    this.where = build(json.where)
    this.returnClause = (json.return != null) ? new ReturnClause(json.return) : null
    this.aliases = this.sources.aliases()
    this.sortClause = (json.sort != null) ? new SortClause(json.sort) : null
  }

  exec (ctx) {
    let returnedValues = []
    this.sources.forEach(ctx, rctx => {
      let childCtx
      let dc = (this.defineClauses && this.defineClauses !== null ? this.defineClauses : [])
      dc.forEach(def => rctx.set(def.identifier, def.expression.exec(rctx)))

      let relations = this.relationship.map(rel => {
        childCtx = rctx.childContext()
        return rel.exec(childCtx)
      })
      let passed = allTrue(relations)
      passed = passed && (this.where ? this.where.exec(rctx) : passed)
      if (passed) {
        if (this.returnClause != null) {
          let val = this.returnClause.expression.exec(rctx)
          return returnedValues.push(val)
        } else {
          if (this.aliases.length === 1) {
            return returnedValues.push(rctx.get(this.aliases[0]))
          } else {
            return returnedValues.push(rctx.contextValues)
          }
        }
      }
    })

    const distinct = (this.returnClause != null) ? this.returnClause.distinct : true
    if (distinct) returnedValues = toDistinctList(returnedValues)

    guard(this.sortClause, x => x.sort(returnedValues))
    return returnedValues
  }
}

export class AliasRef extends Expression {
  constructor (json) {
    super(json)
    this.name = json.name
  }

  exec (ctx) {
    return guard(ctx, x => x.get(this.name))
  }
}

export class QueryDefineRef extends AliasRef {}

// The following is not defined by ELM but is helpful for execution

export class MultiSource {
  constructor (sources) {
    this.sources = sources
    this.alias = this.sources[0].alias
    this.expression = this.sources[0].expression

    if (this.sources.length > 1) {
      this.rest = new MultiSource(this.sources.slice(1))
    }
  }

  aliases () {
    let a = [this.alias]
    if (this.rest) {
      a = a.concat(this.rest.aliases())
    }
    return a
  }

  forEach (ctx, func) {
    let rCtx
    const records = this.expression.exec(ctx) || []
    return records.map(rec => {
      rCtx = new Context(ctx)
      rCtx.set(this.alias, rec)
      return this.rest ? this.rest.forEach(rCtx, func) : func(rCtx)
    })
  }
}
