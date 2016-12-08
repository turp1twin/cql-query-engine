import { Expression } from './expression'
import build from './build'

export class Concat extends Expression {
  exec (ctx) {
    let args = this.execArgs(ctx)
    if (args.some(x => x == null)) return null
    else return args.reduce((x, y) => x + y)
  }
}

export class Combine extends Expression {
  constructor (json) {
    super(json)
    this.source = build(json.source)
    this.separator = build(json.separator)
  }

  exec (ctx) {
    let source = this.source.exec(ctx)
    let separator = (this.separator != null) ? this.separator.exec(ctx) : ''
    if ((source == null) || source.some(x => x == null)) return null
    else return source.join(separator)
  }
}

export class Split extends Expression {
  constructor (json) {
    super(json)
    this.stringToSplit = build(json.stringToSplit)
    this.separator = build(json.separator)
  }

  exec (ctx) {
    let stringToSplit = this.stringToSplit.exec(ctx)
    let separator = this.separator.exec(ctx)
    if (!((stringToSplit != null) && (separator != null))) return null
    else return stringToSplit.split(separator)
  }
}

// Length is completely handled by overloaded#Length

export class Upper extends Expression {
  exec (ctx) {
    let arg = this.execArgs(ctx)
    if (arg != null) return arg.toUpperCase()
    else return null
  }
}

export class Lower extends Expression {
  exec (ctx) {
    let arg = this.execArgs(ctx)
    if (arg != null) return arg.toLowerCase()
    else return null
  }
}

// Indexer is completely handled by overloaded#Indexer

export class PositionOf extends Expression {
  constructor (json) {
    super(json)
    this.pattern = build(json.pattern)
    this.string = build(json.string)
  }

  exec (ctx) {
    let pattern = this.pattern.exec(ctx)
    let string = this.string.exec(ctx)
    if (!((pattern != null) && (string != null))) return null
    else return 1 + string.indexOf(pattern)
  }
}

export class Substring extends Expression {
  constructor (json) {
    super(json)
    this.stringToSub = build(json.stringToSub)
    this.startIndex = build(json.startIndex)
    this.length = build(json['length'])
  }

  exec (ctx) {
    let stringToSub = this.stringToSub.exec(ctx)
    let startIndex = this.startIndex.exec(ctx)
    let length = (this.length != null) ? this.length.exec(ctx) : null
    if (!((stringToSub != null) && (startIndex != null))) return null
    else if (startIndex < 1) throw new Error('Start index must be at least 1')
    else if ((length != null) && length < 0) throw new Error('Length must be at least zero')
    // else if ((length != null) && length > (stringToSub.length)) throw new Error(`Length cannot be greater than length of source string ${stringToSub}`)
    else if (length != null) return stringToSub.substr(startIndex - 1, length)
    else return stringToSub.substr(startIndex - 1)
  }
}
