/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'

let expect = chai.expect

describe('Nil', function () {
  beforeEach(function () {
    setup(this, data)
  })

  return it('should execute as null', function () {
    return expect(this.nil.exec(this.ctx)).to.be.null
  })
})

describe('IsNull', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should detect that null is null', function () {
    return this.nullIsNull.exec(this.ctx).should.be.true
  })

  it('should detect that null variable is null', function () {
    return this.nullVarIsNull.exec(this.ctx).should.be.true
  })

  it('should detect that string is not null', function () {
    return this.stringIsNull.exec(this.ctx).should.be.false
  })

  return it('should detect that non-null variable is not null', function () {
    return this.nonNullVarIsNull.exec(this.ctx).should.be.false
  })
})

describe.skip('Coalesce', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should return first non-null when leading args are null', function () {
    return this.nullNullHelloNullWorld.exec(this.ctx).should.equal('Hello')
  })

  it('should return first arg when it is non-null', function () {
    return this.fooNullNullBar.exec(this.ctx).should.equal('Foo')
  })

  return it('should return null when they are all null', function () {
    return expect(this.allNull.exec(this.ctx)).to.be.null
  })
})
