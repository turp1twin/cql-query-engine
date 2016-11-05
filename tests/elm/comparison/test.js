/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'

let expect = chai.expect

// TO Comparisons for Dates

describe('Equal', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should be false for 5 = 4', function () {
    return this.aGtB_Int.exec(this.ctx).should.be.false
  })

  it('should be true for 5 = 5', function () {
    return this.aEqB_Int.exec(this.ctx).should.be.true
  })

  it('should be false for 5 = 6', function () {
    return this.aLtB_Int.exec(this.ctx).should.be.false
  })

  it('should identify equal/unequal tuples', function () {
    this.eqTuples.exec(this.ctx).should.be.true
    return this.uneqTuples.exec(this.ctx).should.be.false
  })

  it('should identify equal/unequal DateTimes in same timezone', function () {
    this.eqDateTimes.exec(this.ctx).should.be.true
    return this.uneqDateTimes.exec(this.ctx).should.be.false
  })

  it('should identify equal/unequal DateTimes in different timezones', function () {
    this.eqDateTimesTZ.exec(this.ctx).should.be.true
    return this.uneqDateTimesTZ.exec(this.ctx).should.be.false
  })

  return it('should identify uncertain/unequal DateTimes when there is imprecision', function () {
    expect(this.possiblyEqualDateTimes.exec(this.ctx)).to.be.null
    return this.impossiblyEqualDateTimes.exec(this.ctx).should.be.false
  })
})

describe('NotEqual', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should be true for 5 <> 4', function () {
    return this.aGtB_Int.exec(this.ctx).should.be.true
  })

  it('should be false for 5 <> 5', function () {
    return this.aEqB_Int.exec(this.ctx).should.be.false
  })

  it('should be true for 5 <> 6', function () {
    return this.aLtB_Int.exec(this.ctx).should.be.true
  })

  it('should identify equal/unequal tuples', function () {
    this.eqTuples.exec(this.ctx).should.be.false
    return this.uneqTuples.exec(this.ctx).should.be.true
  })

  it('should identify equal/unequal DateTimes in same timezone', function () {
    this.eqDateTimes.exec(this.ctx).should.be.false
    return this.uneqDateTimes.exec(this.ctx).should.be.true
  })

  it('should identify equal/unequal DateTimes in different timezones', function () {
    this.eqDateTimesTZ.exec(this.ctx).should.be.false
    return this.uneqDateTimesTZ.exec(this.ctx).should.be.true
  })

  return it('should identify uncertain/unequal DateTimes when there is imprecision', function () {
    expect(this.possiblyEqualDateTimes.exec(this.ctx)).to.be.null
    return this.impossiblyEqualDateTimes.exec(this.ctx).should.be.true
  })
})

describe('Less', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should be false for 5 < 4', function () {
    return this.aGtB_Int.exec(this.ctx).should.be.false
  })

  it('should be false for 5 < 5', function () {
    return this.aEqB_Int.exec(this.ctx).should.be.false
  })

  return it('should be true for 5 < 6', function () {
    return this.aLtB_Int.exec(this.ctx).should.be.true
  }
  )
})

describe('LessOrEqual', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should be false for 5 <= 4', function () {
    return this.aGtB_Int.exec(this.ctx).should.be.false
  })

  it('should be true for 5 <= 5', function() {
    return this.aEqB_Int.exec(this.ctx).should.be.true;
  }
  );

  return it('should be true for 5 <= 6', function () {
    return this.aLtB_Int.exec(this.ctx).should.be.true
  })
})

describe('Greater', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should be true for 5 > 4', function () {
    return this.aGtB_Int.exec(this.ctx).should.be.true
  })

  it('should be false for 5 > 5', function () {
    return this.aEqB_Int.exec(this.ctx).should.be.false
  })

  return it('should be false for 5 > 6', function () {
    return this.aLtB_Int.exec(this.ctx).should.be.false
  })
})

describe('GreaterOrEqual', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should be true for 5 >= 4', function () {
    return this.aGtB_Int.exec(this.ctx).should.be.true
  })

  it('should be true for 5 >= 5', function () {
    return this.aEqB_Int.exec(this.ctx).should.be.true
  })

  return it('should be false for 5 >= 6', function () {
    return this.aLtB_Int.exec(this.ctx).should.be.false
  })
})
