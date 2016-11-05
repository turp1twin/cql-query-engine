/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'

describe('ExpressionDef', function () {
  beforeEach(function () {
    setup(this, data)
    this.def = this.lib.expressions.Foo
  })

  it('should have a name', function () {
    return this.def.name.should.equal('Foo')
  })

  it('should have the correct context', function () {
    return this.def.context.should.equal('Patient')
  })

  return it('should execute to its value', function () {
    return this.def.exec(this.ctx).should.equal('Bar')
  })
})

describe('ExpressionRef', function () {
  this.beforeEach(function () {
    return setup(this, data)
  })

  it('should have a name', function () {
    return this.foo.name.should.equal('Life')
  })

  return it('should execute to expression value', function () {
    return this.foo.exec(this.ctx).should.equal(42)
  })
})

describe('FunctionDefinitions', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  return it('should be able to define and use a simple function', function () {
    let e = this.testValue.exec(this.ctx)
    return e.should.equal(3)
  })
})
