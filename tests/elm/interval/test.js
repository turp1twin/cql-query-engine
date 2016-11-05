/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'
import Interval from '../../../src/datatypes/Interval'
import DateTime from '../../../src/datatypes/DateTime'

let expect = chai.expect

describe('Interval', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should properly represent an open interval', function () {
    this.open.lowClosed.should.be.false
    this.open.highClosed.should.be.false
    this.open.low.exec(this.ctx).should.eql(new DateTime(2012, 1, 1))
    return this.open.high.exec(this.ctx).should.eql(new DateTime(2013, 1, 1))
  })

  it('should properly represent a left-open interval', function () {
    this.leftOpen.lowClosed.should.be.false
    this.leftOpen.highClosed.should.be.true
    this.leftOpen.low.exec(this.ctx).should.eql(new DateTime(2012, 1, 1))
    return this.leftOpen.high.exec(this.ctx).should.eql(new DateTime(2013, 1, 1))
  })

  it('should properly represent a right-open interval', function () {
    this.rightOpen.lowClosed.should.be.true
    this.rightOpen.highClosed.should.be.false
    this.rightOpen.low.exec(this.ctx).should.eql(new DateTime(2012, 1, 1))
    return this.rightOpen.high.exec(this.ctx).should.eql(new DateTime(2013, 1, 1))
  })

  it('should properly represent a closed interval', function () {
    this.closed.lowClosed.should.be.true
    this.closed.highClosed.should.be.true
    this.closed.low.exec(this.ctx).should.eql(new DateTime(2012, 1, 1))
    return this.closed.high.exec(this.ctx).should.eql(new DateTime(2013, 1, 1))
  })

  return it('should exec to native Interval datatype', function () {
    let ivl = this.open.exec(this.cql)
    ivl.should.be.instanceOf(Interval)
    ivl.lowClosed.should.equal(this.open.lowClosed)
    ivl.highClosed.should.equal(this.open.highClosed)
    ivl.low.should.eql(new DateTime(2012, 1, 1))
    return ivl.high.should.eql(new DateTime(2013, 1, 1))
  })
})

describe('Equal', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should determine equal integer intervals', function () {
    this.equalClosed.exec(this.ctx).should.be.true
    this.equalOpen.exec(this.ctx).should.be.true
    return this.equalOpenClosed.exec(this.ctx).should.be.true
  })

  it('should determine unequal integer intervals', function () {
    this.unequalClosed.exec(this.ctx).should.be.false
    this.unequalOpen.exec(this.ctx).should.be.false
    return this.unequalClosedOpen.exec(this.ctx).should.be.false
  })

  it('should determine equal datetime intervals', function () {
    this.equalDates.exec(this.ctx).should.be.true
    return this.equalDatesOpenClosed.exec(this.ctx).should.be.true
  })

  return it('should operate correctly with imprecision', function () {
    expect(this.sameDays.exec(this.ctx)).to.be.null
    return this.differentDays.exec(this.ctx).should.be.false
  })
})

describe('NotEqual', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should determine equal integer intervals', function () {
    this.equalClosed.exec(this.ctx).should.be.false
    this.equalOpen.exec(this.ctx).should.be.false
    return this.equalOpenClosed.exec(this.ctx).should.be.false
  })

  it('should determine unequal integer intervals', function () {
    this.unequalClosed.exec(this.ctx).should.be.true
    this.unequalOpen.exec(this.ctx).should.be.true
    return this.unequalClosedOpen.exec(this.ctx).should.be.true
  })

  it('should determine equal datetime intervals', function () {
    this.equalDates.exec(this.ctx).should.be.false
    return this.equalDatesOpenClosed.exec(this.ctx).should.be.false
  })

  return it('should operate correctly with imprecision', function () {
    expect(this.sameDays.exec(this.ctx)).to.be.null
    return this.differentDays.exec(this.ctx).should.be.true
  })
})

describe('Contains', function () {
  this.beforeEach(function () {
    return setup(this, data)
  })

  it('should accept contained items', function () {
    this.containsInt.exec(this.ctx).should.be.true
    this.containsReal.exec(this.ctx).should.be.true
    return this.containsDate.exec(this.ctx).should.be.true
  })

  it('should reject uncontained items', function () {
    this.notContainsInt.exec(this.ctx).should.be.false
    this.notContainsReal.exec(this.ctx).should.be.false
    return this.notContainsDate.exec(this.ctx).should.be.false
  })

  it('should correctly handle null endpoints (int)', function () {
    this.negInfBegContainsInt.exec(this.ctx).should.be.true
    this.negInfBegNotContainsInt.exec(this.ctx).should.be.false
    this.unknownBegContainsInt.exec(this.ctx).should.be.true
    expect(this.unknownBegMayContainInt.exec(this.ctx)).to.be.null
    this.unknownBegNotContainsInt.exec(this.ctx).should.be.false
    this.posInfEndContainsInt.exec(this.ctx).should.be.true
    this.posInfEndNotContainsInt.exec(this.ctx).should.be.false
    this.unknownEndContainsInt.exec(this.ctx).should.be.true
    expect(this.unknownEndMayContainInt.exec(this.ctx)).to.be.null
    return this.unknownEndNotContainsInt.exec(this.ctx).should.be.false
  })

  it('should correctly handle null endpoints (date)', function () {
    this.negInfBegContainsDate.exec(this.ctx).should.be.true
    this.negInfBegNotContainsDate.exec(this.ctx).should.be.false
    this.unknownBegContainsDate.exec(this.ctx).should.be.true
    expect(this.unknownBegMayContainDate.exec(this.ctx)).to.be.null
    this.unknownBegNotContainsDate.exec(this.ctx).should.be.false
    this.posInfEndContainsDate.exec(this.ctx).should.be.true
    this.posInfEndNotContainsDate.exec(this.ctx).should.be.false
    this.unknownEndContainsDate.exec(this.ctx).should.be.true
    expect(this.unknownEndMayContainDate.exec(this.ctx)).to.be.null
    return this.unknownEndNotContainsDate.exec(this.ctx).should.be.false
  })

  return it('should correctly handle imprecision', function () {
    this.containsImpreciseDate.exec(this.ctx).should.be.true
    this.notContainsImpreciseDate.exec(this.ctx).should.be.false
    expect(this.mayContainImpreciseDate.exec(this.ctx)).to.be.null
    this.impreciseContainsDate.exec(this.ctx).should.be.true
    this.impreciseNotContainsDate.exec(this.ctx).should.be.false
    return expect(this.impreciseMayContainDate.exec(this.ctx)).to.be.null
  })
})

describe('In', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should accept contained items', function () {
    this.containsInt.exec(this.ctx).should.be.true
    this.containsReal.exec(this.ctx).should.be.true
    return this.containsDate.exec(this.ctx).should.be.true
  })

  it('should reject uncontained items', function () {
    this.notContainsInt.exec(this.ctx).should.be.false
    this.notContainsReal.exec(this.ctx).should.be.false
    return this.notContainsDate.exec(this.ctx).should.be.false
  })

  it('should correctly handle null endpoints (int)', function () {
    this.negInfBegContainsInt.exec(this.ctx).should.be.true
    this.negInfBegNotContainsInt.exec(this.ctx).should.be.false
    this.unknownBegContainsInt.exec(this.ctx).should.be.true
    expect(this.unknownBegMayContainInt.exec(this.ctx)).to.be.null
    this.unknownBegNotContainsInt.exec(this.ctx).should.be.false
    this.posInfEndContainsInt.exec(this.ctx).should.be.true
    this.posInfEndNotContainsInt.exec(this.ctx).should.be.false
    this.unknownEndContainsInt.exec(this.ctx).should.be.true
    expect(this.unknownEndMayContainInt.exec(this.ctx)).to.be.null
    return this.unknownEndNotContainsInt.exec(this.ctx).should.be.false
  })

  it('should correctly handle null endpoints (date)', function () {
    this.negInfBegContainsDate.exec(this.ctx).should.be.true
    this.negInfBegNotContainsDate.exec(this.ctx).should.be.false
    this.unknownBegContainsDate.exec(this.ctx).should.be.true
    expect(this.unknownBegMayContainDate.exec(this.ctx)).to.be.null
    this.unknownBegNotContainsDate.exec(this.ctx).should.be.false
    this.posInfEndContainsDate.exec(this.ctx).should.be.true
    this.posInfEndNotContainsDate.exec(this.ctx).should.be.false
    this.unknownEndContainsDate.exec(this.ctx).should.be.true
    expect(this.unknownEndMayContainDate.exec(this.ctx)).to.be.null
    return this.unknownEndNotContainsDate.exec(this.ctx).should.be.false
  })

  return it('should correctly handle imprecision', function () {
    this.containsImpreciseDate.exec(this.ctx).should.be.true
    this.notContainsImpreciseDate.exec(this.ctx).should.be.false
    expect(this.mayContainImpreciseDate.exec(this.ctx)).to.be.null
    this.impreciseContainsDate.exec(this.ctx).should.be.true
    this.impreciseNotContainsDate.exec(this.ctx).should.be.false
    return expect(this.impreciseMayContainDate.exec(this.ctx)).to.be.null
  })
})

describe('Includes', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should accept included items', function () {
    this.includesIntIvl.exec(this.ctx).should.be.true
    this.includesRealIvl.exec(this.ctx).should.be.true
    return this.includesDateIvl.exec(this.ctx).should.be.true
  })

  it('should reject unincluded items', function () {
    this.notIncludesIntIvl.exec(this.ctx).should.be.false
    this.notIncludesRealIvl.exec(this.ctx).should.be.false
    return this.notIncludesDateIvl.exec(this.ctx).should.be.false
  })

  it('should correctly handle null endpoints (int)', function () {
    this.negInfBegIncludesIntIvl.exec(this.ctx).should.be.true
    this.negInfBegNotIncludesIntIvl.exec(this.ctx).should.be.false
    this.unknownBegIncludesIntIvl.exec(this.ctx).should.be.true
    expect(this.unknownBegMayIncludeIntIvl.exec(this.ctx)).to.be.null
    this.unknownBegNotIncludesIntIvl.exec(this.ctx).should.be.false
    this.posInfEndIncludesIntIvl.exec(this.ctx).should.be.true
    this.posInfEndNotIncludesIntIvl.exec(this.ctx).should.be.false
    this.unknownEndIncludesIntIvl.exec(this.ctx).should.be.true
    expect(this.unknownEndMayIncludeIntIvl.exec(this.ctx)).to.be.null
    return this.unknownEndNotIncludesIntIvl.exec(this.ctx).should.be.false
  })

  it('should correctly handle null endpoints (date)', function () {
    this.negInfBegIncludesDateIvl.exec(this.ctx).should.be.true
    this.negInfBegNotIncludesDateIvl.exec(this.ctx).should.be.false
    this.unknownBegIncludesDateIvl.exec(this.ctx).should.be.true
    expect(this.unknownBegMayIncludeDateIvl.exec(this.ctx)).to.be.null
    this.unknownBegNotIncludesDateIvl.exec(this.ctx).should.be.false
    this.posInfEndIncludesDateIvl.exec(this.ctx).should.be.true
    this.posInfEndNotIncludesDateIvl.exec(this.ctx).should.be.false
    this.unknownEndIncludesDateIvl.exec(this.ctx).should.be.true
    expect(this.unknownEndMayIncludeDateIvl.exec(this.ctx)).to.be.null
    return this.unknownEndNotIncludesDateIvl.exec(this.ctx).should.be.false
  })

  return it('should correctly handle imprecision', function () {
    this.includesImpreciseDateIvl.exec(this.ctx).should.be.true
    this.notIncludesImpreciseDateIvl.exec(this.ctx).should.be.false
    expect(this.mayIncludeImpreciseDateIvl.exec(this.ctx)).to.be.null
    this.impreciseIncludesDateIvl.exec(this.ctx).should.be.true
    this.impreciseNotIncludesDateIvl.exec(this.ctx).should.be.false
    return expect(this.impreciseMayIncludeDateIvl.exec(this.ctx)).to.be.null
  })
})

describe('ProperlyIncludes', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should accept properly included intervals', function () {
    this.properlyIncludesIntIvl.exec(this.ctx).should.be.true
    this.properlyIncludesIntBeginsIvl.exec(this.ctx).should.be.true
    this.properlyIncludesIntEndsIvl.exec(this.ctx).should.be.true
    this.properlyIncludesRealIvl.exec(this.ctx).should.be.true
    return this.properlyIncludesDateIvl.exec(this.ctx).should.be.true
  })

  it('should reject intervals not properly included', function () {
    this.notProperlyIncludesIntIvl.exec(this.ctx).should.be.false
    this.notProperlyIncludesRealIvl.exec(this.ctx).should.be.false
    return this.notProperlyIncludesDateIvl.exec(this.ctx).should.be.false
  })

  return it('should correctly handle null endpoints (int)', function () {
    this.posInfEndProperlyIncludesIntIvl.exec(this.ctx).should.be.true
    this.posInfEndNotProperlyIncludesIntIvl.exec(this.ctx).should.be.false
    return expect(this.unknownEndMayProperlyIncludeIntIvl.exec(this.ctx)).to.be.null
  })
})

describe('IncludedIn', function () {
  this.beforeEach(function () {
    return setup(this, data)
  })

  it('should accept included items', function () {
    this.includesIntIvl.exec(this.ctx).should.be.true
    this.includesRealIvl.exec(this.ctx).should.be.true
    return this.includesDateIvl.exec(this.ctx).should.be.true
  })

  it('should reject unincluded items', function () {
    this.notIncludesIntIvl.exec(this.ctx).should.be.false
    this.notIncludesRealIvl.exec(this.ctx).should.be.false
    return this.notIncludesDateIvl.exec(this.ctx).should.be.false
  })

  it('should correctly handle null endpoints (int)', function () {
    this.negInfBegIncludedInIntIvl.exec(this.ctx).should.be.true
    this.negInfBegNotIncludedInIntIvl.exec(this.ctx).should.be.false
    this.unknownBegIncludedInIntIvl.exec(this.ctx).should.be.true
    expect(this.unknownBegMayBeIncludedInIntIvl.exec(this.ctx)).to.be.null
    this.unknownBegNotIncludedInIntIvl.exec(this.ctx).should.be.false
    this.posInfEndIncludedInIntIvl.exec(this.ctx).should.be.true
    this.posInfEndNotIncludedInIntIvl.exec(this.ctx).should.be.false
    this.unknownEndIncludedInIntIvl.exec(this.ctx).should.be.true
    expect(this.unknownEndMayBeIncludedInIntIvl.exec(this.ctx)).to.be.null
    return this.unknownEndNotIncludedInIntIvl.exec(this.ctx).should.be.false
  })

  it('should correctly handle null endpoints (date)', function () {
    this.negInfBegIncludedInDateIvl.exec(this.ctx).should.be.true
    this.negInfBegNotIncludedInDateIvl.exec(this.ctx).should.be.false
    this.unknownBegIncludedInDateIvl.exec(this.ctx).should.be.true
    expect(this.unknownBegMayBeIncludedInDateIvl.exec(this.ctx)).to.be.null
    this.unknownBegNotIncludedInDateIvl.exec(this.ctx).should.be.false
    this.posInfEndIncludedInDateIvl.exec(this.ctx).should.be.true
    this.posInfEndNotIncludedInDateIvl.exec(this.ctx).should.be.false
    this.unknownEndIncludedInDateIvl.exec(this.ctx).should.be.true
    expect(this.unknownEndMayBeIncludedInDateIvl.exec(this.ctx)).to.be.null
    return this.unknownEndNotIncludedInDateIvl.exec(this.ctx).should.be.false
  })

  return it('should correctly handle imprecision', function () {
    this.includesImpreciseDateIvl.exec(this.ctx).should.be.true
    this.notIncludesImpreciseDateIvl.exec(this.ctx).should.be.false
    expect(this.mayIncludeImpreciseDateIvl.exec(this.ctx)).to.be.null
    this.impreciseIncludesDateIvl.exec(this.ctx).should.be.true
    this.impreciseNotIncludesDateIvl.exec(this.ctx).should.be.false
    return expect(this.impreciseMayIncludeDateIvl.exec(this.ctx)).to.be.null
  })
})

describe('ProperlyIncludedIn', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should accept properly included intervals', function () {
    this.properlyIncludesIntIvl.exec(this.ctx).should.be.true
    this.properlyIncludesIntBeginsIvl.exec(this.ctx).should.be.true
    this.properlyIncludesIntEndsIvl.exec(this.ctx).should.be.true
    this.properlyIncludesRealIvl.exec(this.ctx).should.be.true
    return this.properlyIncludesDateIvl.exec(this.ctx).should.be.true
  })

  it('should reject intervals not properly included', function () {
    this.notProperlyIncludesIntIvl.exec(this.ctx).should.be.false
    this.notProperlyIncludesRealIvl.exec(this.ctx).should.be.false
    return this.notProperlyIncludesDateIvl.exec(this.ctx).should.be.false
  })

  return it('should correctly handle null endpoints (int)', function () {
    this.posInfEndProperlyIncludedInDateIvl.exec(this.ctx).should.be.true
    this.posInfEndNotProperlyIncludedInDateIvl.exec(this.ctx).should.be.false
    return expect(this.unknownEndMayBeProperlyIncludedInDateIvl.exec(this.ctx)).to.be.null
  })
})

describe('After', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should accept intervals before it', function () {
    this.afterIntIvl.exec(this.ctx).should.be.true
    this.afterRealIvl.exec(this.ctx).should.be.true
    return this.afterDateIvl.exec(this.ctx).should.be.true
  })

  it('should reject intervals on or after it', function () {
    this.notAfterIntIvl.exec(this.ctx).should.be.false
    this.notAfterRealIvl.exec(this.ctx).should.be.false
    return this.notAfterDateIvl.exec(this.ctx).should.be.false
  })

  it('should correctly handle null endpoints (int)', function () {
    this.negInfBegNotAfterIntIvl.exec(this.ctx).should.be.false
    expect(this.unknownBegMayBeAfterIntIvl.exec(this.ctx)).to.be.null
    this.unknownBegNotAfterIntIvl.exec(this.ctx).should.be.false
    this.posInfEndAfterIntIvl.exec(this.ctx).should.be.true
    this.posInfEndNotAfterIntIvl.exec(this.ctx).should.be.false
    this.unknownEndAfterIntIvl.exec(this.ctx).should.be.true
    return this.unknownEndNotAfterIntIvl.exec(this.ctx).should.be.false
  })

  it('should correctly handle null endpoints (date)', function () {
    this.negInfBegNotAfterDateIvl.exec(this.ctx).should.be.false
    expect(this.unknownBegMayBeAfterDateIvl.exec(this.ctx)).to.be.null
    this.unknownBegNotAfterDateIvl.exec(this.ctx).should.be.false
    this.posInfEndAfterDateIvl.exec(this.ctx).should.be.true
    this.posInfEndNotAfterDateIvl.exec(this.ctx).should.be.false
    this.unknownEndAfterDateIvl.exec(this.ctx).should.be.true
    return this.unknownEndNotAfterDateIvl.exec(this.ctx).should.be.false
  })

  return it('should correctly handle imprecision', function () {
    this.afterImpreciseDateIvl.exec(this.ctx).should.be.true
    this.notAfterImpreciseDateIvl.exec(this.ctx).should.be.false
    expect(this.mayBeAfterImpreciseDateIvl.exec(this.ctx)).to.be.null
    this.impreciseAfterDateIvl.exec(this.ctx).should.be.true
    this.impreciseNotAfterDateIvl.exec(this.ctx).should.be.false
    return expect(this.impreciseMayBeAfterDateIvl.exec(this.ctx)).to.be.null
  })
})

describe('Before', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should accept intervals before it', function () {
    this.beforeIntIvl.exec(this.ctx).should.be.true
    this.beforeRealIvl.exec(this.ctx).should.be.true
    return this.beforeDateIvl.exec(this.ctx).should.be.true
  })

  it('should reject intervals on or after it', function () {
    this.notBeforeIntIvl.exec(this.ctx).should.be.false
    this.notBeforeRealIvl.exec(this.ctx).should.be.false
    return this.notBeforeDateIvl.exec(this.ctx).should.be.false
  })

  it('should correctly handle null endpoints (int)', function () {
    this.negInfBegBeforeIntIvl.exec(this.ctx).should.be.true
    this.negInfBegNotBeforeIntIvl.exec(this.ctx).should.be.false
    this.unknownBegBeforeIntIvl.exec(this.ctx).should.be.true
    this.unknownBegNotBeforeIntIvl.exec(this.ctx).should.be.false
    this.posInfEndNotBeforeIntIvl.exec(this.ctx).should.be.false
    expect(this.unknownEndMayBeBeforeIntIvl.exec(this.ctx)).to.be.null
    return this.unknownEndNotBeforeIntIvl.exec(this.ctx).should.be.false
  })

  it('should correctly handle null endpoints (date)', function () {
    this.negInfBegBeforeDateIvl.exec(this.ctx).should.be.true
    this.negInfBegNotBeforeDateIvl.exec(this.ctx).should.be.false
    this.unknownBegBeforeDateIvl.exec(this.ctx).should.be.true
    this.unknownBegNotBeforeDateIvl.exec(this.ctx).should.be.false
    this.posInfEndNotBeforeDateIvl.exec(this.ctx).should.be.false
    expect(this.unknownEndMayBeBeforeDateIvl.exec(this.ctx)).to.be.null
    return this.unknownEndNotBeforeDateIvl.exec(this.ctx).should.be.false
  })

  return it('should correctly handle imprecision', function () {
    this.beforeImpreciseDateIvl.exec(this.ctx).should.be.true
    this.notBeforeImpreciseDateIvl.exec(this.ctx).should.be.false
    expect(this.mayBeBeforeImpreciseDateIvl.exec(this.ctx)).be.null
    this.impreciseBeforeDateIvl.exec(this.ctx).should.be.true
    this.impreciseNotBeforeDateIvl.exec(this.ctx).should.be.false
    return expect(this.impreciseMayBeBeforeDateIvl.exec(this.ctx)).be.null
  })
})

describe('Meets', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should accept intervals meeting after it', function () {
    this.meetsBeforeIntIvl.exec(this.ctx).should.be.true
    this.meetsBeforeRealIvl.exec(this.ctx).should.be.true
    return this.meetsBeforeDateIvl.exec(this.ctx).should.be.true
  })

  it('should accept intervals meeting before it', function () {
    this.meetsAfterIntIvl.exec(this.ctx).should.be.true
    this.meetsAfterRealIvl.exec(this.ctx).should.be.true
    return this.meetsAfterDateIvl.exec(this.ctx).should.be.true
  })

  it('should reject intervals not meeting it', function () {
    this.notMeetsIntIvl.exec(this.ctx).should.be.false
    this.notMeetsRealIvl.exec(this.ctx).should.be.false
    return this.notMeetsDateIvl.exec(this.ctx).should.be.false
  })

  it('should correctly handle null endpoints (int)', function () {
    this.negInfBegMeetsBeforeIntIvl.exec(this.ctx).should.be.true
    this.negInfBegNotMeetsIntIvl.exec(this.ctx).should.be.false
    this.intIvlNotMeetsNegInfBeg.exec(this.ctx).should.be.false
    this.unknownBegMeetsBeforeIntIvl.exec(this.ctx).should.be.true
    expect(this.unknownBegMayMeetAfterIntIvl.exec(this.ctx)).to.be.null
    this.unknownBegNotMeetsIntIvl.exec(this.ctx).should.be.false
    expect(this.intIvlMayMeetBeforeUnknownBeg.exec(this.ctx)).to.be.null
    this.posInfEndMeetsAfterIntIvl.exec(this.ctx).should.be.true
    this.posInfEndNotMeetsIntIvl.exec(this.ctx).should.be.false
    this.intIvlNotMeetsPosInfEnd.exec(this.ctx).should.be.false
    this.unknownEndMeetsAfterIntIvl.exec(this.ctx).should.be.true
    expect(this.unknownEndMayMeetBeforeIntIvl.exec(this.ctx)).to.be.null
    this.unknownEndNotMeetsIntIvl.exec(this.ctx).should.be.false
    return expect(this.intIvlMayMeetAfterUnknownEnd.exec(this.ctx)).to.be.null
  })

  it('should correctly handle null endpoints (date)', function () {
    this.negInfBegMeetsBeforeDateIvl.exec(this.ctx).should.be.true
    this.negInfBegNotMeetsDateIvl.exec(this.ctx).should.be.false
    this.dateIvlNotMeetsNegInfBeg.exec(this.ctx).should.be.false
    this.unknownBegMeetsBeforeDateIvl.exec(this.ctx).should.be.true
    expect(this.unknownBegMayMeetAfterDateIvl.exec(this.ctx)).to.be.null
    this.unknownBegNotMeetsDateIvl.exec(this.ctx).should.be.false
    expect(this.dateIvlMayMeetBeforeUnknownBeg.exec(this.ctx)).to.be.null
    this.posInfEndMeetsAfterDateIvl.exec(this.ctx).should.be.true
    this.posInfEndNotMeetsDateIvl.exec(this.ctx).should.be.false
    this.dateIvlNotMeetsPosInfEnd.exec(this.ctx).should.be.false
    this.unknownEndMeetsAfterDateIvl.exec(this.ctx).should.be.true
    expect(this.unknownEndMayMeetBeforeDateIvl.exec(this.ctx)).to.be.null
    this.unknownEndNotMeetsDateIvl.exec(this.ctx).should.be.false
    return expect(this.dateIvlMayMeetAfterUnknownEnd.exec(this.ctx)).to.be.null
  })

  return it('should correctly handle imprecision', function () {
    expect(this.mayMeetAfterImpreciseDateIvl.exec(this.ctx)).to.be.null
    expect(this.mayMeetBeforeImpreciseDateIvl.exec(this.ctx)).to.be.null
    this.notMeetsImpreciseDateIvl.exec(this.ctx).should.be.false
    expect(this.impreciseMayMeetAfterDateIvl.exec(this.ctx)).to.be.null
    expect(this.impreciseMayMeetBeforeDateIvl.exec(this.ctx)).to.be.null
    return this.impreciseNotMeetsDateIvl.exec(this.ctx).should.be.false
  })
})

describe('MeetsAfter', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should accept intervals meeting before it', function () {
    this.meetsAfterIntIvl.exec(this.ctx).should.be.true
    this.meetsAfterRealIvl.exec(this.ctx).should.be.true
    return this.meetsAfterDateIvl.exec(this.ctx).should.be.true
  })

  it('should reject intervals meeting after it', function () {
    this.meetsBeforeIntIvl.exec(this.ctx).should.be.false
    this.meetsBeforeRealIvl.exec(this.ctx).should.be.false
    return this.meetsBeforeDateIvl.exec(this.ctx).should.be.false
  })

  it('should reject intervals not meeting it', function () {
    this.notMeetsIntIvl.exec(this.ctx).should.be.false
    this.notMeetsRealIvl.exec(this.ctx).should.be.false
    return this.notMeetsDateIvl.exec(this.ctx).should.be.false
  })

  it('should correctly handle null endpoints (int)', function () {
    this.negInfBegMeetsBeforeIntIvl.exec(this.ctx).should.be.false
    this.negInfBegNotMeetsIntIvl.exec(this.ctx).should.be.false
    this.intIvlNotMeetsNegInfBeg.exec(this.ctx).should.be.false
    this.unknownBegMeetsBeforeIntIvl.exec(this.ctx).should.be.false
    expect(this.unknownBegMayMeetAfterIntIvl.exec(this.ctx)).to.be.null
    this.unknownBegNotMeetsIntIvl.exec(this.ctx).should.be.false
    this.intIvlMayMeetBeforeUnknownBeg.exec(this.ctx).should.be.false
    this.posInfEndMeetsAfterIntIvl.exec(this.ctx).should.be.true
    this.posInfEndNotMeetsIntIvl.exec(this.ctx).should.be.false
    this.intIvlNotMeetsPosInfEnd.exec(this.ctx).should.be.false
    this.unknownEndMeetsAfterIntIvl.exec(this.ctx).should.be.true
    this.unknownEndMayMeetBeforeIntIvl.exec(this.ctx).should.be.false
    this.unknownEndNotMeetsIntIvl.exec(this.ctx).should.be.false
    return expect(this.intIvlMayMeetAfterUnknownEnd.exec(this.ctx)).to.be.null
  })

  it('should correctly handle null endpoints (date)', function () {
    this.negInfBegMeetsBeforeDateIvl.exec(this.ctx).should.be.false
    this.negInfBegNotMeetsDateIvl.exec(this.ctx).should.be.false
    this.dateIvlNotMeetsNegInfBeg.exec(this.ctx).should.be.false
    this.unknownBegMeetsBeforeDateIvl.exec(this.ctx).should.be.false
    expect(this.unknownBegMayMeetAfterDateIvl.exec(this.ctx)).to.be.null
    this.unknownBegNotMeetsDateIvl.exec(this.ctx).should.be.false
    this.dateIvlMayMeetBeforeUnknownBeg.exec(this.ctx).should.be.false
    this.posInfEndMeetsAfterDateIvl.exec(this.ctx).should.be.true
    this.posInfEndNotMeetsDateIvl.exec(this.ctx).should.be.false
    this.dateIvlNotMeetsPosInfEnd.exec(this.ctx).should.be.false
    this.unknownEndMeetsAfterDateIvl.exec(this.ctx).should.be.true
    this.unknownEndMayMeetBeforeDateIvl.exec(this.ctx).should.be.false
    this.unknownEndNotMeetsDateIvl.exec(this.ctx).should.be.false
    return expect(this.dateIvlMayMeetAfterUnknownEnd.exec(this.ctx)).to.be.null
  })

  return it('should correctly handle imprecision', function () {
    expect(this.mayMeetAfterImpreciseDateIvl.exec(this.ctx)).to.be.null
    this.mayMeetBeforeImpreciseDateIvl.exec(this.ctx).should.be.false
    this.notMeetsImpreciseDateIvl.exec(this.ctx).should.be.false
    expect(this.impreciseMayMeetAfterDateIvl.exec(this.ctx)).to.be.null
    this.impreciseMayMeetBeforeDateIvl.exec(this.ctx).should.be.false
    return this.impreciseNotMeetsDateIvl.exec(this.ctx).should.be.false
  })
})

describe('MeetsBefore', function () {
  this.beforeEach(function () {
    return setup(this, data)
  })

  it('should accept intervals meeting after it', function () {
    this.meetsBeforeIntIvl.exec(this.ctx).should.be.true
    this.meetsBeforeRealIvl.exec(this.ctx).should.be.true
    return this.meetsBeforeDateIvl.exec(this.ctx).should.be.true
  })

  it('should reject intervals meeting before it', function () {
    this.meetsAfterIntIvl.exec(this.ctx).should.be.false
    this.meetsAfterRealIvl.exec(this.ctx).should.be.false
    return this.meetsAfterDateIvl.exec(this.ctx).should.be.false
  })

  it('should reject intervals not meeting it', function () {
    this.notMeetsIntIvl.exec(this.ctx).should.be.false
    this.notMeetsRealIvl.exec(this.ctx).should.be.false
    return this.notMeetsDateIvl.exec(this.ctx).should.be.false
  })

  it('should correctly handle null endpoints (int)', function () {
    this.negInfBegMeetsBeforeIntIvl.exec(this.ctx).should.be.true
    this.negInfBegNotMeetsIntIvl.exec(this.ctx).should.be.false
    this.intIvlNotMeetsNegInfBeg.exec(this.ctx).should.be.false
    this.unknownBegMeetsBeforeIntIvl.exec(this.ctx).should.be.true
    this.unknownBegMayMeetAfterIntIvl.exec(this.ctx).should.be.false
    this.unknownBegNotMeetsIntIvl.exec(this.ctx).should.be.false
    expect(this.intIvlMayMeetBeforeUnknownBeg.exec(this.ctx)).to.be.null
    this.posInfEndMeetsAfterIntIvl.exec(this.ctx).should.be.false
    this.posInfEndNotMeetsIntIvl.exec(this.ctx).should.be.false
    this.intIvlNotMeetsPosInfEnd.exec(this.ctx).should.be.false
    this.unknownEndMeetsAfterIntIvl.exec(this.ctx).should.be.false
    expect(this.unknownEndMayMeetBeforeIntIvl.exec(this.ctx)).to.be.null
    this.unknownEndNotMeetsIntIvl.exec(this.ctx).should.be.false
    return this.intIvlMayMeetAfterUnknownEnd.exec(this.ctx).should.be.false
  })

  it('should correctly handle null endpoints (date)', function () {
    this.negInfBegMeetsBeforeDateIvl.exec(this.ctx).should.be.true
    this.negInfBegNotMeetsDateIvl.exec(this.ctx).should.be.false
    this.dateIvlNotMeetsNegInfBeg.exec(this.ctx).should.be.false
    this.unknownBegMeetsBeforeDateIvl.exec(this.ctx).should.be.true
    this.unknownBegMayMeetAfterDateIvl.exec(this.ctx).should.be.false
    this.unknownBegNotMeetsDateIvl.exec(this.ctx).should.be.false
    expect(this.dateIvlMayMeetBeforeUnknownBeg.exec(this.ctx)).to.be.null
    this.posInfEndMeetsAfterDateIvl.exec(this.ctx).should.be.false
    this.posInfEndNotMeetsDateIvl.exec(this.ctx).should.be.false
    this.dateIvlNotMeetsPosInfEnd.exec(this.ctx).should.be.false
    this.unknownEndMeetsAfterDateIvl.exec(this.ctx).should.be.false
    expect(this.unknownEndMayMeetBeforeDateIvl.exec(this.ctx)).to.be.null
    this.unknownEndNotMeetsDateIvl.exec(this.ctx).should.be.false
    return this.dateIvlMayMeetAfterUnknownEnd.exec(this.ctx).should.be.false
  })

  return it('should correctly handle imprecision', function () {
    this.mayMeetAfterImpreciseDateIvl.exec(this.ctx).should.be.false
    expect(this.mayMeetBeforeImpreciseDateIvl.exec(this.ctx)).to.be.null
    this.notMeetsImpreciseDateIvl.exec(this.ctx).should.be.false
    this.impreciseMayMeetAfterDateIvl.exec(this.ctx).should.be.false
    expect(this.impreciseMayMeetBeforeDateIvl.exec(this.ctx)).to.be.null
    return this.impreciseNotMeetsDateIvl.exec(this.ctx).should.be.false
  })
})

describe('Overlaps', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should accept overlaps (integer)', function () {
    this.overlapsBeforeIntIvl.exec(this.ctx).should.be.true
    this.overlapsAfterIntIvl.exec(this.ctx).should.be.true
    return this.overlapsBoundaryIntIvl.exec(this.ctx).should.be.true
  })

  it('should accept overlaps (real)', function () {
    this.overlapsBeforeRealIvl.exec(this.ctx).should.be.true
    this.overlapsAfterRealIvl.exec(this.ctx).should.be.true
    return this.overlapsBoundaryRealIvl.exec(this.ctx).should.be.true
  })

  it('should reject non-overlaps (integer)', function () {
    return this.noOverlapsIntIvl.exec(this.ctx).should.be.false
  })

  return it('should reject non-overlaps (real)', function () {
    return this.noOverlapsRealIvl.exec(this.ctx).should.be.false
  })
})

describe('OverlapsDateTime', function () {
  this.beforeEach(function () {
    setup(this, data)
  })

  it('should accept overlaps', function () {
    this.overlapsBefore.exec(this.ctx).should.be.true
    this.overlapsAfter.exec(this.ctx).should.be.true
    this.overlapsContained.exec(this.ctx).should.be.true
    return this.overlapsContains.exec(this.ctx).should.be.true
  })

  it('should accept imprecise overlaps', function () {
    return this.impreciseOverlap.exec(this.ctx).should.be.true
  })

  it('should reject non-overlaps', function () {
    return this.noOverlap.exec(this.ctx).should.be.false
  })

  it('should reject imprecise non-overlaps', function () {
    return this.noImpreciseOverlap.exec(this.ctx).should.be.false
  })

  return it('should return null for imprecise overlaps that are unknown', function () {
    return expect(this.unknownOverlap.exec(this.ctx)).to.be.null
  })
})

describe('OverlapsAfter', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should accept overlaps that are after (integer)', function () {
    this.overlapsAfterIntIvl.exec(this.ctx).should.be.true
    return this.overlapsBoundaryIntIvl.exec(this.ctx).should.be.true
  })

  it('should accept overlaps that are after (real)', function () {
    this.overlapsAfterRealIvl.exec(this.ctx).should.be.true
    return this.overlapsBoundaryRealIvl.exec(this.ctx).should.be.true
  })

  it('should reject overlaps that are before (integer)', function () {
    return this.overlapsBeforeIntIvl.exec(this.ctx).should.be.false
  })

  it('should reject overlaps that are before (real)', function () {
    return this.overlapsBeforeRealIvl.exec(this.ctx).should.be.false
  })

  it('should reject non-overlaps (integer)', function () {
    return this.noOverlapsIntIvl.exec(this.ctx).should.be.false
  })

  return it('should reject non-overlaps (real)', function () {
    return this.noOverlapsRealIvl.exec(this.ctx).should.be.false
  })
})

describe('OverlapsAfterDateTime', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should accept overlaps that are after', function () {
    this.overlapsAfter.exec(this.ctx).should.be.true
    return this.overlapsContains.exec(this.ctx).should.be.true
  })

  it('should accept imprecise overlaps that are after', function () {
    return this.impreciseOverlapAfter.exec(this.ctx).should.be.true
  })

  it('should reject overlaps that are not before', function () {
    this.overlapsBefore.exec(this.ctx).should.be.false
    return this.overlapsContained.exec(this.ctx).should.be.false
  })

  it('should reject imprecise overlaps that are not before', function () {
    return this.impreciseOverlapBefore.exec(this.ctx).should.be.false
  })

  it('should reject non-overlaps', function () {
    return this.noOverlap.exec(this.ctx).should.be.false
  })

  it('should reject imprecise non-overlaps', function () {
    return this.noImpreciseOverlap.exec(this.ctx).should.be.false
  })

  return it('should return null for imprecise overlaps that are unknown', function () {
    return expect(this.unknownOverlap.exec(this.ctx)).to.be.null
  })
})

describe('OverlapsBefore', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should accept overlaps that are before (integer)', function () {
    this.overlapsBeforeIntIvl.exec(this.ctx).should.be.true
    return this.overlapsBoundaryIntIvl.exec(this.ctx).should.be.true
  })

  it('should accept overlaps that are before (real)', function () {
    this.overlapsBeforeRealIvl.exec(this.ctx).should.be.true
    return this.overlapsBoundaryRealIvl.exec(this.ctx).should.be.true
  })

  it('should reject overlaps that are after (integer)', function () {
    return this.overlapsAfterIntIvl.exec(this.ctx).should.be.false
  })

  it('should reject overlaps that are after (real)', function () {
    return this.overlapsAfterRealIvl.exec(this.ctx).should.be.false
  })

  it('should reject non-overlaps (integer)', function () {
    return this.noOverlapsIntIvl.exec(this.ctx).should.be.false
  })

  return it('should reject non-overlaps (real)', function () {
    return this.noOverlapsRealIvl.exec(this.ctx).should.be.false
  })
})

describe('OverlapsBeforeDateTime', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should accept overlaps that are before', function () {
    this.overlapsBefore.exec(this.ctx).should.be.true
    return this.overlapsContains.exec(this.ctx).should.be.true
  })

  it('should accept imprecise overlaps that are before', function () {
    return this.impreciseOverlapBefore.exec(this.ctx).should.be.true
  })

  it('should reject overlaps that are not before', function () {
    this.overlapsAfter.exec(this.ctx).should.be.false
    return this.overlapsContained.exec(this.ctx).should.be.false
  })

  it('should reject imprecise overlaps that are not before', function () {
    return this.impreciseOverlapAfter.exec(this.ctx).should.be.false
  })

  it('should reject non-overlaps', function () {
    return this.noOverlap.exec(this.ctx).should.be.false
  })

  it('should reject imprecise non-overlaps', function () {
    return this.noImpreciseOverlap.exec(this.ctx).should.be.false
  })

  return it('should return null for imprecise overlaps that are unknown', function () {
    return expect(this.unknownOverlap.exec(this.ctx)).to.be.null
  })
})

describe('Width', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should calculate the width of integer intervals', function () {
    this.intWidth.exec(this.ctx).should.equal(7)
    return this.intOpenWidth.exec(this.ctx).should.equal(5)
  })

  it('should calculate the width of real intervals', function () {
    this.realWidth.exec(this.ctx).should.equal(3.33)
    return this.realOpenWidth.exec(this.ctx).should.equal(3.32999998)
  })

  it('should calculate the width of infinite intervals', function () {
    this.intWidthThreeToMax.exec(this.ctx).should.equal(Math.pow(2, 31) - 4)
    return this.intWidthMinToThree.exec(this.ctx).should.equal(Math.pow(2, 31) + 3)
  })

  return it('should calculate the width of infinite intervals', function () {
    expect(this.intWidthThreeToUnknown.exec(this.ctx)).to.be.null
    return expect(this.intWidthUnknownToThree.exec(this.ctx)).to.be.null
  })
})

describe('Start', function () {
  beforeEach(function () {
    setup(this, data)
  })

  return it('should execute as the start of the interval', function () {
    return this.foo.exec(this.ctx).should.eql(new DateTime(2012, 1, 1))
  })
})

describe('End', function () {
  this.beforeEach(function () {
    return setup(this, data)
  })

  return it('should execute as the end of the interval', function () {
    return this.foo.exec(this.ctx).should.eql(new DateTime(2013, 1, 1))
  })
})

describe('IntegerIntervalUnion', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should properly calculate open and closed unions', function () {
    let x = this.intFullInterval.exec(this.ctx)
    let y = this.intClosedUnionClosed.exec(this.ctx)
    y.equals(x).should.be.true

    y = this.intClosedUnionOpen.exec(this.ctx)
    y.contains(0).should.be.true
    y.contains(10).should.be.false

    y = this.intOpenUnionOpen.exec(this.ctx)
    y.contains(0).should.be.false
    y.contains(10).should.be.false

    y = this.intOpenUnionClosed.exec(this.ctx)
    y.contains(0).should.be.false
    return y.contains(10).should.be.true
  })

  it('should properly calculate sameAs unions', function () {
    let x = this.intFullInterval.exec(this.ctx)
    let y = this.intSameAsUnion.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate before/after unions', function () {
    return expect(this.intBeforeUnion.exec(this.ctx)).to.be.null
  })

  it('should properly calculate meets unions', function () {
    let x = this.intFullInterval.exec(this.ctx)
    let y = this.intMeetsUnion.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate left/right overlapping unions', function () {
    let x = this.intFullInterval.exec(this.ctx)
    let y = this.intOverlapsUnion.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate begins/begun by unions', function () {
    let x = this.intFullInterval.exec(this.ctx)
    let y = this.intBeginsUnion.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate includes/included by unions', function () {
    let x = this.intFullInterval.exec(this.ctx)
    let y = this.intDuringUnion.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  return it('should properly calculate ends/ended by unions', function () {
    let x = this.intFullInterval.exec(this.ctx)
    let y = this.intEndsUnion.exec(this.ctx)
    return y.equals(x).should.be.true
  })
})

// TODO
// it 'should properly handle imprecision', ->

describe('DateTimeIntervalUnion', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should properly calculate open and closed unions', function () {
    let x = this.dateTimeFullInterval.exec(this.ctx)
    let y = this.dateTimeClosedUnionClosed.exec(this.ctx)
    y.equals(x).should.be.true

    let a = new DateTime(2012, 1, 1, 0, 0, 0, 0)
    let b = new DateTime(2013, 1, 1, 0, 0, 0, 0)

    y = this.dateTimeClosedUnionOpen.exec(this.ctx)
    y.contains(a).should.be.true
    y.contains(b).should.be.false

    y = this.dateTimeOpenUnionOpen.exec(this.ctx)
    y.contains(a).should.be.false
    y.contains(b).should.be.false

    y = this.dateTimeOpenUnionClosed.exec(this.ctx)
    y.contains(a).should.be.false
    return y.contains(b).should.be.true
  })

  it('should properly calculate sameAs unions', function () {
    let x = this.dateTimeFullInterval.exec(this.ctx)
    let y = this.dateTimeSameAsUnion.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate before/after unions', function () {
    return expect(this.dateTimeBeforeUnion.exec(this.ctx)).to.be.null
  })

  it('should properly calculate meets unions', function () {
    let x = this.dateTimeFullInterval.exec(this.ctx)
    let y = this.dateTimeMeetsUnion.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate left/right overlapping unions', function () {
    let x = this.dateTimeFullInterval.exec(this.ctx)
    let y = this.dateTimeOverlapsUnion.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate begins/begun by unions', function () {
    let x = this.dateTimeFullInterval.exec(this.ctx)
    let y = this.dateTimeBeginsUnion.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate includes/included by unions', function () {
    let x = this.dateTimeFullInterval.exec(this.ctx)
    let y = this.dateTimeDuringUnion.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  return it('should properly calculate ends/ended by unions', function () {
    let x = this.dateTimeFullInterval.exec(this.ctx)
    let y = this.dateTimeEndsUnion.exec(this.ctx)
    return y.equals(x).should.be.true
  })
})

// TODO
// it 'should properly handle imprecision', ->

describe('IntegerIntervalExcept', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should properly calculate sameAs except', function () {
    return expect(this.intSameAsExcept.exec(this.ctx)).to.be.null
  })

  it('should properly calculate before/after except', function () {
    return this.intBeforeExcept.exec(this.ctx).should.eql(new Interval(0, 4))
  })

  it('should properly calculate meets except', function () {
    let x = this.intHalfInterval.exec(this.ctx)
    let y = this.intMeetsExcept.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate left/right overlapping except', function () {
    let x = this.intHalfInterval.exec(this.ctx)
    let y = this.intOverlapsExcept.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate begins/begun by except', function () {
    return expect(this.intBeginsExcept.exec(this.ctx)).to.be.null
  })

  it('should properly calculate includes/included by except', function () {
    return expect(this.intDuringExcept.exec(this.ctx)).to.be.null
  })

  return it('should properly calculate ends/ended by except', function () {
    return expect(this.intEndsExcept.exec(this.ctx)).to.be.null
  })
})

// TODO
// it 'should properly handle imprecision', ->

describe('DateTimeIntervalExcept', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should properly calculate sameAs except', function () {
    return expect(this.dateTimeSameAsExcept.exec(this.ctx)).to.be.null
  })

  it('should properly calculate before/after except', function () {
    return this.dateTimeBeforeExcept.exec(this.ctx).should.eql(new Interval(new DateTime(2012, 1, 1, 0, 0, 0, 0), new DateTime(2012, 4, 1, 0, 0, 0, 0)))
  })

  it('should properly calculate meets except', function () {
    let x = this.dateTimeHalfInterval.exec(this.ctx)
    let y = this.dateTimeMeetsExcept.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate left/right overlapping except', function () {
    let x = this.dateTimeHalfInterval.exec(this.ctx)
    let y = this.dateTimeOverlapsExcept.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate begins/begun by except', function () {
    return expect(this.dateTimeBeginsExcept.exec(this.ctx)).be.null
  })

  it('should properly calculate includes/included by except', function () {
    return expect(this.dateTimeDuringExcept.exec(this.ctx)).to.be.null
  })

  return it('should properly calculate ends/ended by except', function () {
    return expect(this.dateTimeEndsExcept.exec(this.ctx)).to.be.null
  })
})

// TODO
// it 'should properly handle imprecision', ->

describe('IntegerIntervalIntersect', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should properly calculate sameAs intersect', function () {
    let x = this.intSameAsIntersect.exec(this.ctx)
    let y = this.intFullInterval.exec(this.ctx)
    return x.equals(y).should.be.true
  })

  it('should properly calculate before/after intersect', function () {
    return expect(this.intBeforeIntersect.exec(this.ctx)).to.be.null
  })

  it('should properly calculate meets intersect', function () {
    let x = this.intMeetsInterval.exec(this.ctx)
    let y = this.intMeetsIntersect.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate left/right overlapping intersect', function () {
    let x = this.intOverlapsInterval.exec(this.ctx)
    let y = this.intOverlapsIntersect.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate begins/begun by intersect', function () {
    let x = this.intBeginsInterval.exec(this.ctx)
    let y = this.intBeginsIntersect.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate includes/included by intersect', function () {
    let x = this.intDuringInterval.exec(this.ctx)
    let y = this.intDuringIntersect.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  return it('should properly calculate ends/ended by intersect', function () {
    let x = this.intEndsInterval.exec(this.ctx)
    let y = this.intEndsIntersect.exec(this.ctx)
    return y.equals(x).should.be.true
  })
})

describe('DateTimeIntervalIntersect', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should properly calculate sameAs intersect', function () {
    let x = this.dateTimeSameAsIntersect.exec(this.ctx)
    let y = this.dateTimeFullInterval.exec(this.ctx)
    return x.equals(y).should.be.true
  })

  it('should properly calculate before/after intersect', function () {
    return expect(this.dateTimeBeforeIntersect.exec(this.ctx)).to.be.null
  })

  it('should properly calculate meets intersect', function () {
    let x = this.dateTimeMeetsInterval.exec(this.ctx)
    let y = this.dateTimeMeetsIntersect.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate left/right overlapping intersect', function () {
    let x = this.dateTimeOverlapsInterval.exec(this.ctx)
    let y = this.dateTimeOverlapsIntersect.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate begins/begun by intersect', function () {
    let x = this.dateTimeBeginsInterval.exec(this.ctx)
    let y = this.dateTimeBeginsIntersect.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  it('should properly calculate includes/included by intersect', function () {
    let x = this.dateTimeDuringInterval.exec(this.ctx)
    let y = this.dateTimeDuringIntersect.exec(this.ctx)
    return y.equals(x).should.be.true
  })

  return it('should properly calculate ends/ended by intersect', function () {
    let x = this.dateTimeEndsInterval.exec(this.ctx)
    let y = this.dateTimeEndsIntersect.exec(this.ctx)
    return y.equals(x).should.be.true
  })
})
