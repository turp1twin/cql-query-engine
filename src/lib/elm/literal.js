import { Expression } from './expression'

export class Literal extends Expression {
  static from (json) {
    switch (json.valueType) {
      case '{urn:hl7-org:elm-types:r1}Boolean': return new BooleanLiteral(json)
      case '{urn:hl7-org:elm-types:r1}Integer': return new IntegerLiteral(json)
      case '{urn:hl7-org:elm-types:r1}Decimal': return new DecimalLiteral(json)
      case '{urn:hl7-org:elm-types:r1}String': return new StringLiteral(json)
      default: return new Literal(json)
    }
  }

  constructor (json) {
    super(json)
    this.valueType = json.valueType
    this.value = json.value
  }

  exec (ctx) {
    return this.value
  }
}

// The following are not defined in ELM, but helpful for execution

export class BooleanLiteral extends Literal {
  constructor (json) {
    super(json)
    this.value = this.value === 'true'
  }

  exec (ctx) {
    return this.value
  }
}

export class IntegerLiteral extends Literal {
  constructor (json) {
    super(json)
    this.value = parseInt(this.value, 10)
  }

  exec (ctx) {
    return this.value
  }
}

export class DecimalLiteral extends Literal {
  constructor (json) {
    super(json)
    this.value = parseFloat(this.value)
  }

  exec (ctx) {
    return this.value
  }
}

export class StringLiteral extends Literal {
  exec (ctx) {
    return this.value
  }
}
