/* global describe it beforeEach */
import { Code, ValueSet } from '../../src/cql'
import chai from 'chai'
chai.should()

describe('Code', () => {
  let code
  beforeEach(() => {
    return (code = new Code('ABC', '5.4.3.2.1', '1'))
  })

  return it('should properly represent the code, system, and version', () => {
    code.code.should.equal('ABC')
    code.system.should.equal('5.4.3.2.1')
    return code.version.should.equal('1')
  })
})

describe('ValueSet', () => {
  let valueSet
  beforeEach(() => {
    return (valueSet = new ValueSet('1.2.3.4.5', '1', [
      new Code('ABC', '5.4.3.2.1', '1'),
      new Code('DEF', '5.4.3.2.1', '2'),
      new Code('GHI', '5.4.3.4.5', '3')
    ]))
  })

  it('should properly represent the OID, version and codes', () => {
    valueSet.oid.should.equal('1.2.3.4.5')
    valueSet.version.should.equal('1')
    valueSet.codes.length.should.equal(3)
    valueSet.codes[0].should.eql(new Code('ABC', '5.4.3.2.1', '1'))
    valueSet.codes[1].should.eql(new Code('DEF', '5.4.3.2.1', '2'))
    return valueSet.codes[2].should.eql(new Code('GHI', '5.4.3.4.5', '3'))
  })

  it('should find code by name', () => {
    return valueSet.hasCode('DEF').should.equal(true)
  })

  it('should find code by name and system', () => {
    return valueSet.hasCode('DEF', '5.4.3.2.1').should.equal(true)
  })

  it('should find code by name, system, and version', () => {
    return valueSet.hasCode('DEF', '5.4.3.2.1', '2').should.equal(true)
  })

  it('should find code by Code object', () => {
    return valueSet.hasCode(new Code('DEF', '5.4.3.2.1', '2')).should.equal(true)
  })

  it('should not find code with wrong name', () => {
    return valueSet.hasCode('XYZ').should.equal(false)
  })

  it('should not find code with wrong system', () => {
    return valueSet.hasCode('DEF', '0.0.0.0.0').should.equal(false)
  })

  it('should not find code with wrong version', () => {
    return valueSet.hasCode('DEF', '5.4.3.2.1', '3').should.equal(false)
  })

  return it('should not find code with wrong Code object', () => {
    return valueSet.hasCode(new Code('DEF', '5.4.3.2.1', '3')).should.equal(false)
  })
})

