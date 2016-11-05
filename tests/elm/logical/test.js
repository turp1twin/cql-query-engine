/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'

let expect = chai.expect

describe('And', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should execute true and...', function () {
    this.tT.exec(this.ctx).should.be.true
    this.tF.exec(this.ctx).should.be.false
    return expect(this.tN.exec(this.ctx)).to.be.null
  })

  it('should execute false and...', function () {
    this.fF.exec(this.ctx).should.be.false
    this.fT.exec(this.ctx).should.be.false
    return this.fN.exec(this.ctx).should.be.false
  })

  return it('should execute null and...', function () {
    expect(this.nN.exec(this.ctx)).to.be.null
    expect(this.nT.exec(this.ctx)).to.be.null
    return this.nF.exec(this.ctx).should.be.false
  })
})

describe('Or', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should execute true or...', function () {
    this.tT.exec(this.ctx).should.be.true
    this.tF.exec(this.ctx).should.be.true
    return this.tN.exec(this.ctx).should.be.true
  })

  it('should execute false or...', function () {
    this.fF.exec(this.ctx).should.be.false
    this.fT.exec(this.ctx).should.be.true
    return expect(this.fN.exec(this.ctx)).to.be.null
  })

  return it('should execute null or...', function () {
    expect(this.nN.exec(this.ctx)).to.be.null
    this.nT.exec(this.ctx).should.be.true
    return expect(this.nF.exec(this.ctx)).to.be.null
  })
})

describe('Not', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should execute not true as false', function () {
    return this.notTrue.exec(this.ctx).should.be.false
  })

  it('should execute not false as true', function () {
    return this.notFalse.exec(this.ctx).should.be.true
  })

  return it('should execute not null as null', function () {
    return expect(this.notNull.exec(this.ctx)).to.be.null
  })
})

describe('XOr', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should execute true xor...', function () {
    this.tT.exec(this.ctx).should.be.false
    this.tF.exec(this.ctx).should.be.true
    return expect(this.tN.exec(this.ctx)).to.be.null
  })

  it('should execute false xor...', function () {
    this.fF.exec(this.ctx).should.be.false
    this.fT.exec(this.ctx).should.be.true
    return expect(this.fN.exec(this.ctx)).to.be.null
  })

  return it('should execute null xor...', function () {
    expect(this.nN.exec(this.ctx)).to.be.null
    expect(this.nT.exec(this.ctx)).to.be.null
    return expect(this.nF.exec(this.ctx)).to.be.null
  })
})
