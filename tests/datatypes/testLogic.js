/* global describe it */
import { ThreeValuedLogic } from '../../src/cql'
import chai from 'chai'
chai.should()
let expect = chai.expect

describe('ThreeValuedLogic.and', () => {
  it('should return true when all is true', () => ThreeValuedLogic.and(true, true, true, true, true).should.be.true)
  it('should return false when at least one is false', () => {
    ThreeValuedLogic.and(true, true, false, true, true).should.be.false
    ThreeValuedLogic.and(null, null, false, null, null).should.be.false
    ThreeValuedLogic.and(true, true, false, null, true).should.be.false
    return ThreeValuedLogic.and(false, false, false, false, false).should.be.false
  })

  return it('should return null when there is at least one null with no falses', function() {
    expect(ThreeValuedLogic.and(true, true, null, true, true)).to.not.exist
    return expect(ThreeValuedLogic.and(null, null, null, null, null)).to.not.exist
  })
})

describe('ThreeValuedLogic.or', () => {
  it('should return true when at least one is true', () => {
    ThreeValuedLogic.or(false, false, true, false, false).should.be.true
    ThreeValuedLogic.or(null, null, true, null, null).should.be.true
    ThreeValuedLogic.or(false, false, true, null, false).should.be.true
    return ThreeValuedLogic.or(true, true, true, true, true).should.be.true
  })

  it('should return false when all is false', () => ThreeValuedLogic.or(false, false, false, false, false).should.be.false)

  return it('should return null when there is at least one null with no trues', () => {
    expect(ThreeValuedLogic.or(false, false, null, false, false)).to.be.null
    return expect(ThreeValuedLogic.or(null, null, null, null, null)).to.be.null
  })
})

describe('ThreeValuedLogic.xor', () => {
  it('should return true when exlusive', () => {
    ThreeValuedLogic.xor(false, true).should.be.true
    ThreeValuedLogic.xor(false, true).should.be.true
    ThreeValuedLogic.xor(true, false, false, false).should.be.true
    ThreeValuedLogic.xor(false, true, false, false).should.be.true
    ThreeValuedLogic.xor(true, true, true, false, false).should.be.true
    return ThreeValuedLogic.xor(false, false, true, false, false).should.be.true
  })

  it('should return false when not exlcusive', () => {
    ThreeValuedLogic.xor(true, true).should.be.false
    ThreeValuedLogic.xor(false, false).should.be.false
    ThreeValuedLogic.xor(true, false, true).should.be.false
    ThreeValuedLogic.xor(false, true, true).should.be.false
    ThreeValuedLogic.xor(true, true, false).should.be.false
    ThreeValuedLogic.xor(false, false, false).should.be.false
    return ThreeValuedLogic.xor(false, false, true, false, true).should.be.false
  })

  return it('should return null when there is at least one null', () => {
    expect(ThreeValuedLogic.xor(true, null)).to.be.null
    expect(ThreeValuedLogic.xor(false, null)).to.be.null
    expect(ThreeValuedLogic.xor(true, false, null)).to.be.null
    expect(ThreeValuedLogic.xor(false, true, null)).to.be.null
    return expect(ThreeValuedLogic.xor(false, false, true, null, false)).to.be.null
  })
})

describe('ThreeValuedLogic.not', () => {
  it('should return true when input is false', () => ThreeValuedLogic.not(false).should.be.true)
  it('should return false when input is true', () => ThreeValuedLogic.not(true).should.be.false)
  return it('should return null when input is null', () => expect(ThreeValuedLogic.not(null)).to.not.exist)
})
