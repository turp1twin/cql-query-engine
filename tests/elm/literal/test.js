/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'

describe('Literal', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should convert true to boolean true', function () {
    return this.boolTrue.value.should.be.true
  })

  it('should execute true as true', function () {
    return this.boolTrue.exec(this.ctx).should.be.true
  })

  it('should convert false to boolean false', function () {
    return this.boolFalse.value.should.be.false
  })

  it('should execute false as false', function () {
    return this.boolFalse.exec(this.ctx).should.be.false
  })

  it('should convert 1 to int 1', function () {
    return this.intOne.value.should.equal(1)
  })

  it('should execute 1 as 1', function () {
    return this.intOne.exec(this.ctx).should.equal(1)
  })

  it('should convert .1 to decimal .1', function () {
    return this.decimalTenth.value.should.equal(0.1)
  })

  it('should execute .1 as .1', function () {
    return this.decimalTenth.exec(this.ctx).should.equal(0.1)
  })

  it('should convert \'true\' to string \'true\'', function () {
    return this.stringTrue.value.should.equal('true')
  })

  return it('should execute \'true\' as \'true\'', function () {
    return this.stringTrue.exec(this.ctx).should.equal('true')
  })
})
