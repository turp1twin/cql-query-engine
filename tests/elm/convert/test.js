/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'
import { isNull } from '../../../src/lib/util/util'

describe('FromString', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it("should convert 'str' to 'str'", function () {
    return this.stringStr.exec(this.ctx).should.equal('str')
  })

  it('should convert null to null', function () {
    return isNull(this.stringNull.exec(this.ctx)).should.equal(true)
  })

  it("should convert 'true' to true", function () {
    return this.boolTrue.exec(this.ctx).should.equal(true)
  })

  it("should convert 'false' to false", function () {
    return this.boolFalse.exec(this.ctx).should.equal(false)
  })

  it("should convert '10.2' to Decimal", function () {
    return this.decimalValid.exec(this.ctx).should.equal(10.2)
  })

  it("should convert 'abc' to Decimal NaN", function () {
    return isNaN(this.decimalInvalid.exec(this.ctx)).should.equal(true)
  })

  it("should convert '10' to Integer", function () {
    return this.integerValid.exec(this.ctx).should.equal(10)
  })

  it("should convert '10.2' to Integer 10", function () {
    return this.integerDropDecimal.exec(this.ctx).should.equal(10)
  })

  it("should convert 'abc' to Integer NaN", function () {
    return isNaN(this.integerInvalid.exec(this.ctx)).should.equal(true)
  })

  it("should convert \"10 'A'\" to Quantity", function () {
    let quantity = this.quantityStr.exec(this.ctx)
    quantity.value.should.equal(10)
    return quantity.unit.should.equal('A')
  })

  it("should convert \"+10 'A'\" to Quantity", function () {
    let quantity = this.posQuantityStr.exec(this.ctx)
    quantity.value.should.equal(10)
    return quantity.unit.should.equal('A')
  })

  it("should convert \"-10 'A'\" to Quantity", function () {
    let quantity = this.negQuantityStr.exec(this.ctx)
    quantity.value.should.equal(-10)
    return quantity.unit.should.equal('A')
  })

  it("should convert \"10.0'mA'\" to Quantity", function () {
    let quantity = this.quantityStrDecimal.exec(this.ctx)
    quantity.value.should.equal(10.0)
    return quantity.unit.should.equal('mA')
  })

  return it("should convert '2015-01-02' to DateTime", function () {
    let date = this.dateStr.exec(this.ctx)
    date.year.should.equal(2015)
    date.month.should.equal(1)
    return date.day.should.equal(2)
  })
})

describe('FromInteger', function() {
  beforeEach(function () {
    return setup(this, data)
  })

  it("should convert 10 to '10'", function() {
    return this.string10.exec(this.ctx).should.equal('10')
  })

  it('should convert 10 to 10.0', function () {
    return this.decimal10.exec(this.ctx).should.equal(10.0)
  })

  it('should convert null to null', function () {
    return isNull(this.intNull.exec(this.ctx)).should.equal(true)
  })

  return it('should convert 10 to 10', function () {
    return this.intInt.exec(this.ctx).should.equal(10)
  })
})

describe('FromQuantity', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it("should convert \"10 'A'\" to \"10 'A'\"", function () {
    return this.quantityStr.exec(this.ctx).should.equal("10 'A'")
  })

  it("should convert \"+10 'A'\" to \"10 'A'\"", function () {
    return this.posQuantityStr.exec(this.ctx).should.equal("10 'A'")
  })

  it("should convert \"-10 'A'\" to \"10 'A'\"", function() {
    return this.negQuantityStr.exec(this.ctx).should.equal("-10 'A'")
  })

  return it("should convert \"10 'A'\" to \"10 'A'\"", function () {
    let quantity = this.quantityQuantity.exec(this.ctx)
    quantity.value.should.equal(10)
    return quantity.unit.should.equal('A')
  })
})

describe('FromBoolean', function() {
  beforeEach(function () {
    return setup(this, data)
  })

  it("should convert true to 'true'", function () {
    return this.booleanTrueStr.exec(this.ctx).should.equal('true')
  })

  it("should convert false to 'false'", function () {
    return this.booleanFalseStr.exec(this.ctx).should.equal('false')
  })

  it('should convert true to true', function () {
    return this.booleanTrueBool.exec(this.ctx).should.equal(true)
  })

  return it('should convert false to false', function () {
    return this.booleanFalseBool.exec(this.ctx).should.equal(false)
  })
})

describe('FromDateTime', function() {
  beforeEach(function () {
    return setup(this, data)
  })

  it("should convert @2015-01-02 to '2015-01-02'", function () {
    return this.dateStr.exec(this.ctx).should.equal('2015-01-02')
  })

  return it('should convert @2015-01-02 to @2015-01-02', function () {
    let date = this.dateDate.exec(this.ctx)
    date.year.should.equal(2015)
    date.month.should.equal(1)
    return date.day.should.equal(2)
  })
})

describe('FromTime', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it.skip("should convert @T11:57 to '11:57'", function () {
    return this.timeStr.exec(this.ctx).should.equal('11:57')
  })

  return it.skip('should convert @T11:57 to @11:57', function () {
    let time = this.timeTime.exec(this.ctx)
    time.hour.should.equal(11)
    return time.minute.should.equal(57)
  })
})

describe('FromCode', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it.skip('should convert hepB to a concept', function () {
    return this.codeConcept.exec(this.ctx)
  })

  return it.skip('should convert hepB to a code', function () {
    return this.codeCode.exec(this.ctx);
  })
})
