import { Expression } from './expression'
import ThreeValuedLogic from '../datatypes/ThreeValuedLogic'
import DateTime from '../datatypes/DateTime'
import Exception from '../datatypes/Exception'
import { equals } from '../util/comparison'
import { typeIsArray, guard } from '../util/util'
import * as DT from './datetime'
import * as LIST from './list'
import * as IVL from './interval'

const listBased = a => {
  if (typeIsArray(a)) return LIST
  else return IVL
}

const dateBased = d => {
  if (d instanceof DateTime) return DT
  else return IVL
}

export class Equal extends Expression {
  exec (ctx) {
    return equals(...this.execArgs(ctx))
  }
}

export class NotEqual extends Expression {
  exec (ctx) {
    return ThreeValuedLogic.not(equals(...this.execArgs(ctx)))
  }
}

export class Union extends Expression {
  exec (ctx) {
    let [a, b] = this.execArgs(ctx)
    if ((a == null) || (b == null)) return null
    const lib = listBased(a)
    return lib.doUnion(a, b)
  }
}

export class Except extends Expression {
  exec (ctx) {
    const [a, b] = this.execArgs(ctx)
    if ((a == null) || (b == null)) return null
    const lib = listBased(a)
    return lib.doExcept(a, b)
  }
}

export class Intersect extends Expression {
  exec (ctx) {
    const [a, b] = this.execArgs(ctx)
    if ((a == null) || (b == null)) return null
    const lib = listBased(a)
    return lib.doIntersect(a, b)
  }
}

export class ArrayIndexOutOfBoundsException extends Exception {}

export class Indexer extends Expression {
  exec (ctx) {
    const [operand, index] = this.execArgs(ctx)
    if ((operand == null) || (index == null)) return null
    if (index <= 0 || index > operand.length) throw new ArrayIndexOutOfBoundsException()
    return operand[index - 1]
  }
}

export class In extends Expression {
  exec (ctx) {
    const [item, container] = this.execArgs(ctx)
    if ((item == null) || (container == null)) return null
    const lib = listBased(container)
    return lib.doContains(container, item)
  }
}

export class Contains extends Expression {
  exec (ctx) {
    const [container, item] = this.execArgs(ctx)
    if ((item == null) || (container == null)) return null
    const lib = listBased(container)
    return lib.doContains(container, item)
  }
}

export class Includes extends Expression {
  exec (ctx) {
    const [container, contained] = this.execArgs(ctx)
    if ((container == null) || (contained == null)) return null
    const lib = listBased(container)
    return lib.doIncludes(container, contained)
  }
}

export class IncludedIn extends Expression {
  exec (ctx) {
    const [contained, container] = this.execArgs(ctx)
    if ((container == null) || (contained == null)) return null
    const lib = listBased(container)
    return lib.doIncludes(container, contained)
  }
}

export class ProperIncludes extends Expression {
  exec (ctx) {
    const [container, contained] = this.execArgs(ctx)
    if ((container == null) || (contained == null)) return null
    const lib = listBased(container)
    return lib.doProperIncludes(container, contained)
  }
}

export class ProperIncludedIn extends Expression {
  exec (ctx) {
    const [contained, container] = this.execArgs(ctx)
    if ((container == null) || (contained == null)) return null
    const lib = listBased(container)
    return lib.doProperIncludes(container, contained)
  }
}

export class Length extends Expression {
  exec (ctx) {
    const arg = this.execArgs(ctx)
    if (arg != null) return arg.length
    else return null
  }
}

export class After extends Expression {
  constructor (json) {
    super(json)
    this.precision = guard(json.precision, x => x.toLowerCase())
  }

  exec (ctx) {
    const [a, b] = this.execArgs(ctx)
    if ((a == null) || (b == null)) return null
    const lib = dateBased(a)
    return lib.doAfter(a, b, this.precision)
  }
}

export class Before extends Expression {
  constructor (json) {
    super(json)
    this.precision = guard(json.precision, x => x.toLowerCase())
  }

  exec (ctx) {
    const [a, b] = this.execArgs(ctx)
    if ((a == null) || (b == null)) return null
    const lib = dateBased(a)
    return lib.doBefore(a, b, this.precision)
  }
}

