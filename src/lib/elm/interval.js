import { Expression, UnimplementedExpression } from './expression'
import build from './build'
import DtInterval from '../datatypes/Interval'
import { guard } from '../util/util'

export class Interval extends Expression {
  constructor (json) {
    super(json)
    this.lowClosed = json.lowClosed
    this.highClosed = json.highClosed
    this.low = build(json.low)
    this.high = build(json.high)
  }

  exec (ctx) {
    return new DtInterval(this.low.exec(ctx), this.high.exec(ctx), this.lowClosed, this.highClosed)
  }
}

// Equal is completely handled by overloaded#Equal

// NotEqual is completely handled by overloaded#Equal

// Delegated to by overloaded#Contains and overloaded#In
export function doContains (interval, item) {
  return interval.contains(item)
}

// Delegated to by overloaded#Includes and overloaded#IncludedIn
export function doIncludes (interval, subinterval) {
  return interval.includes(subinterval)
}

// Delegated to by overloaded#ProperIncludes and overloaded@ProperIncludedIn
export function doProperIncludes (interval, subinterval) {
  return interval.properlyIncludes(subinterval)
}

// Delegated to by overloaded#After
export function doAfter (a, b, precision) {
  return a.after(b, precision)
}

// Delegated to by overloaded#Before
export function doBefore (a, b, precision) {
  return a.before(b, precision)
}

export class Meets extends Expression {
  exec (ctx) {
    const [a, b] = this.execArgs(ctx)
    if ((a != null) && (b != null)) return a.meets(b)
    else return null
  }
}

export class MeetsAfter extends Expression {
  exec (ctx) {
    const [a, b] = this.execArgs(ctx)
    if ((a != null) && (b != null)) return a.meetsAfter(b)
    else return null
  }
}

export class MeetsBefore extends Expression {
  exec (ctx) {
    const [a, b] = this.execArgs(ctx)
    if ((a != null) && (b != null)) return a.meetsBefore(b)
    else return null
  }
}

export class Overlaps extends Expression {
  exec (ctx) {
    const [a, b] = this.execArgs(ctx)
    if ((a != null) && (b != null)) return a.overlaps(b)
    else return null
  }
}

export class OverlapsAfter extends Expression {
  exec (ctx) {
    const [a, b] = this.execArgs(ctx)
    if ((a != null) && (b != null)) return a.overlapsAfter(b)
    else return null
  }
}

export class OverlapsBefore extends Expression {
  exec (ctx) {
    const [a, b] = this.execArgs(ctx)
    if ((a != null) && (b != null)) return a.overlapsBefore(b)
    else return null
  }
}

// Delegated to by overloaded#Union
export function doUnion (a, b) {
  return a.union(b)
}

// Delegated to by overloaded#Except
export function doExcept (a, b) {
  if ((a != null) && (b != null)) return a.except(b)
  else return null
}

// Delegated to by overloaded#Intersect
export function doIntersect (a, b) {
  if ((a != null) && (b != null)) return a.intersect(b)
  else return null
}

export class Width extends Expression {
  exec (ctx) {
    return guard(this.arg.exec(ctx), x => x.width())
  }
}

// TODO: Spec has "Begin" defined, but shouldn't it be "Start"?
export class Start extends Expression {
  exec (ctx) {
    return guard(this.arg.exec(ctx), x => x.low)
  }
}

export class End extends Expression {
  exec (ctx) {
    return guard(this.arg.exec(ctx), x => x.high)
  }
}

// TODO: Spec has "Begins" defined, but shouldn't it be "Starts"?
export class Starts extends UnimplementedExpression {}
export class Ends extends UnimplementedExpression {}
export class Collapse extends UnimplementedExpression {}


