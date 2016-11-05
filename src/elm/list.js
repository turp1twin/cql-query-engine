import { Expression, UnimplementedExpression } from './expression'
import build from './build'
import { typeIsArray, guard } from '../util/util'
import { equals } from '../util/comparison'

export class List extends Expression {
  constructor (json) {
    super(...arguments)
    let left
    this.elements = ((left = build(json.element))) != null ? left : []
  }

  exec (ctx) {
    return (this.elements.map(item => item.exec(ctx)))
  }
}

export class Exists extends Expression {
  exec (ctx) {
    return guard(this.execArgs(ctx), x => x.length) > 0
  }
}

// Equal is completely handled by overloaded#Equal

// NotEqual is completely handled by overloaded#Equal

// Delegated to by overloaded#Union
export function doUnion (a, b) {
  return a.concat(b)
}

// Delegated to by overloaded#Except
export function doExcept (a, b) {
  return (a.filter(itm => !doContains(b, itm)).map(itm => itm))
}

// Delegated to by overloaded#Intersect
export function doIntersect (a, b) {
  return (a.filter(itm => doContains(b, itm)).map(itm => itm))
}

// ELM-only, not a product of CQL
export class Times extends UnimplementedExpression {}

// ELM-only, not a product of CQL
export class Filter extends UnimplementedExpression {}
export class SingletonFrom extends Expression {
  exec (ctx) {
    const arg = this.execArgs(ctx)
    if (arg.length > 1) {
      throw new Error('IllegalArgument: \'SingletonFrom\' requires a 0 or 1 arg array')
    } else if (arg.length === 1) {
      return arg[0]
    } else {
      return null
    }
  }
}

export class IndexOf extends Expression {
  constructor (json) {
    super(json)
    this.source = build(json.source)
    this.element = build(json.element)
  }

  exec (ctx) {
    const src = this.source.exec(ctx)
    const el = this.element.exec(ctx)
    let index
    if ((src == null) || (el == null)) return null
    for (let i = 0; i < src.length; i++) {
      let itm = src[i]
      if (equals(itm, el)) {
        index = i
        break
      }
    }
    if (index != null) {
      return index + 1
    } else return 0
  }
}

// Indexer is completely handled by overloaded#Indexer

// Delegated to by overloaded#Contains and overloaded#In
export function doContains (container, item) {
  for (let i = 0; i < container.length; i++) {
    let element = container[i]
    if (equals(element, item)) return true
  }
  return false
}

// Delegated to by overloaded#Includes and overloaded@IncludedIn
export function doIncludes (list, sublist) {
  return sublist.every(x => doContains(list, x))
}

// Delegated to by overloaded#ProperIncludes and overloaded@ProperIncludedIn
export function doProperIncludes (list, sublist) {
  return list.length > sublist.length && doIncludes(list, sublist)
}

// ELM-only, not a product of CQL
export class ForEach extends UnimplementedExpression {}
export class Expand extends Expression {
  exec (ctx) {
    const arg = this.execArgs(ctx)
    if (typeIsArray(arg) && (arg.every(x => typeIsArray(x)))) {
      return arg.reduce((x, y) => x.concat(y), [])
    } else {
      return arg
    }
  }
}

export class Distinct extends Expression {
  exec (ctx) {
    const arg = this.execArgs(ctx)
    let container = {}
    arg.forEach(itm => { container[itm] = itm })
    return (() => {
      let result = []
      for (let key in container) {
        result.push(container[key])
      }
      return result
    })()
  }
}

// ELM-only, not a product of CQL
export class Current extends UnimplementedExpression {}
export class First extends Expression {
  constructor (json) {
    super(json)
    this.source = build(json.source)
  }

  exec (ctx) {
    const src = this.source.exec(ctx)
    if ((src != null) && typeIsArray(src) && src.length > 0) {
      return src[0]
    } else return null
  }
}

export class Last extends Expression {
  constructor (json) {
    super(json)
    this.source = build(json.source)
  }

  exec (ctx) {
    const src = this.source.exec(ctx)
    if ((src != null) && typeIsArray(src) && src.length > 0) {
      return src[src.length - 1]
    } else return null
  }
}

// Length is completely handled by overloaded#Length

