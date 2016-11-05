/* global describe it beforeEach */
import setup from '../../setup'
import data from './data'
import chai from 'chai'
import { OverFlowException } from '../../../src/util/math'
chai.should()
let expect = chai.expect

describe('Add', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should add two numbers', function () {
    return this.onePlusTwo.exec(this.ctx).should.equal(3)
  })

  it('should add multiple numbers', function () {
    return this.addMultiple.exec(this.ctx).should.equal(55)
  })

  return it('should add variables', function () {
    return this.addVariables.exec(this.ctx).should.equal(21)
  })
})

describe('Subtract', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should subtract two numbers', function () {
    return this.fiveMinusTwo.exec(this.ctx).should.equal(3)
  })

  it('should subtract multiple numbers', function () {
    return this.subtractMultiple.exec(this.ctx).should.equal(15)
  })

  return it('should subtract variables', function () {
    return this.subtractVariables.exec(this.ctx).should.equal(1)
  })
})

describe('Multiply', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should multiply two numbers', function () {
    return this.fiveTimesTwo.exec(this.ctx).should.equal(10)
  })

  it('should multiply multiple numbers', function () {
    return this.multiplyMultiple.exec(this.ctx).should.equal(120)
  })

  return it('should multiply variables', function () {
    return this.multiplyVariables.exec(this.ctx).should.equal(110)
  })
})

describe('Divide', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should divide two numbers', function () {
    return this.tenDividedByTwo.exec(this.ctx).should.equal(5)
  })

  it('should divide two numbers that don\'t evenly divide', function () {
    return this.tenDividedByFour.exec(this.ctx).should.equal(2.5)
  })

  it('should divide multiple numbers', function () {
    return this.divideMultiple.exec(this.ctx).should.equal(5)
  })

  return it('should divide variables', function () {
    return this.divideVariables.exec(this.ctx).should.equal(25)
  })
})

describe('Negate', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  return it('should negate a number', function () {
    return this.negativeOne.exec(this.ctx).should.equal(-1)
  })
})

describe('MathPrecedence', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should follow order of operations', function () {
    return this.mixed.exec(this.ctx).should.equal(46)
  })

  return it('should allow parentheses to override order of operations', function () {
    return this.parenthetical.exec(this.ctx).should.equal(-10)
  })
})

describe('Power', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  return it('should be able to calculate the power of a number', function () {
    return this.pow.exec(this.ctx).should.equal(81)
  })
})

describe('TruncatedDivide', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  return it('should be able to return just the integer portion of a division', function () {
    this.trunc.exec(this.ctx).should.equal(3)
    return this.even.exec(this.ctx).should.equal(3)
  })
})

describe('Truncate', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  return it('should be able to return the integer portion of a number', function () {
    this.trunc.exec(this.ctx).should.equal(10)
    return this.even.exec(this.ctx).should.equal(10)
  })
})

describe('Floor', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  return it('should be able to round down to the closest integer', function () {
    this.flr.exec(this.ctx).should.equal(10)
    return this.even.exec(this.ctx).should.equal(10)
  })
})

describe('Ceiling', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  return it('should be able to round up to the closest integer', function () {
    this.ceil.exec(this.ctx).should.equal(11)
    return this.even.exec(this.ctx).should.equal(10)
  })
})

describe('Ln', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  return it('should be able to return the natural log of a number', function () {
    return this.ln.exec(this.ctx).should.equal(Math.log(4))
  })
})

describe('Log', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  return it('should be able to return the log of a number based on an arbitrary base value', function () {
    return this.log.exec(this.ctx).should.equal(0.25)
  })
})

describe('Modulo', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  return it('should be able to return the remainder of a division', function () {
    return this.mod.exec(this.ctx).should.equal(1)
  })
})

describe('Abs', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  it('should be able to return the absolute value of a positive number', function () {
    return this.pos.exec(this.ctx).should.equal(10)
  })
  it('should be able to return the absolute value of a negative number', function () {
    return this.neg.exec(this.ctx).should.equal(10)
  })
  return it('should be able to return the absolute value of 0', function () {
    return this.zero.exec(this.ctx).should.equal(0)
  })
})

describe('Round', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  it('should be able to round a number up or down to the closest integer value', function () {
    this.up.exec(this.ctx).should.equal(5)
    return this.down.exec(this.ctx).should.equal(4)
  })
  return it('should be able to round a number up or down to the closest decimal place', function () {
    this.up_percent.exec(this.ctx).should.equal(4.6)
    return this.down_percent.exec(this.ctx).should.equal(4.4)
  })
})

describe('Successor', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  it('should be able to get Integer Successor', function () {
    return this.is.exec(this.ctx).should.equal(3)
  })
  it('should be able to get Real Successor', function () {
    return this.rs.exec(this.ctx).should.equal(2.2 + Math.pow(10, -8))
  })
  it('should cause runtime error for Successor greater than Integer Max value', function () {
    return expect(() => this.ofr.exec(this.ctx)).to.throw(OverFlowException)
  })
  it('should be able to get Date Successor for year', function () {
    let dp = this.y_date.exec(this.ctx)
    dp.year.should.equal(2016)
    expect(dp.month).to.not.exist
    expect(dp.day).to.not.exist
    expect(dp.hour).to.not.exist
    expect(dp.minute).to.not.exist
    expect(dp.second).to.not.exist
    return expect(dp.millisecond).to.not.exist
  })
  it('should be able to get Date Successor for year,month', function () {
    let dp = this.ym_date.exec(this.ctx)
    dp.year.should.equal(2015)
    dp.month.should.equal(2)
    expect(dp.day).to.not.exist
    expect(dp.hour).to.not.exist
    expect(dp.minute).to.not.exist
    expect(dp.second).to.not.exist
    return expect(dp.millisecond).to.not.exist
  })

  it('should be able to get Date Successor for year,month,day', function () {
    let dp = this.ymd_date.exec(this.ctx)
    dp.year.should.equal(2015)
    dp.month.should.equal(1)
    dp.day.should.equal(2)
    expect(dp.hour).to.not.exist
    expect(dp.minute).to.not.exist
    expect(dp.second).to.not.exist
    return expect(dp.millisecond).to.not.exist
  })

  it('should be able to get Date Successor for year,month,day,hour', function () {
    let dp = this.ymdh_date.exec(this.ctx)
    dp.year.should.equal(2015)
    dp.month.should.equal(1)
    dp.day.should.equal(1)
    dp.hour.should.equal(1)
    expect(dp.minute).to.not.exist
    expect(dp.second).to.not.exist
    return expect(dp.millisecond).to.not.exist
  })

  it('should be able to get Date Successor for year,month,day,hour,minute', function () {
    let dp = this.ymdhm_date.exec(this.ctx)
    dp.year.should.equal(2015)
    dp.month.should.equal(1)
    dp.day.should.equal(1)
    dp.hour.should.equal(0)
    dp.minute.should.equal(1)
    expect(dp.second).to.not.exist
    return expect(dp.millisecond).to.not.exist
  })

  it('should be able to get Date Successor for year,month,day,hour,minute,seconds', function () {
    let dp = this.ymdhms_date.exec(this.ctx)
    dp.year.should.equal(2015)
    dp.month.should.equal(1)
    dp.day.should.equal(1)
    dp.hour.should.equal(0)
    dp.minute.should.equal(0)
    dp.second.should.equal(1)
    return expect(dp.millisecond).to.not.exist
  })

  it('should be able to get Date Successor for year,month,day,hour,minute,seconds,milliseconds', function () {
    let dp = this.ymdhmsm_date.exec(this.ctx)
    dp.year.should.equal(2015)
    dp.month.should.equal(1)
    dp.day.should.equal(1)
    dp.hour.should.equal(0)
    dp.minute.should.equal(0)
    dp.second.should.equal(0)
    return dp.millisecond.should.equal(1)
  })

  return it('should throw an exception when attempting to get the Successor of the maximum allowed date', function () {
    return expect(() => this.max_date.exec(this.ctx)).to.throw(OverFlowException)
  })
})

describe('Predecessor', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should be able to get Integer Predecessor', function () {
    return this.is.exec(this.ctx).should.equal(1)
  })
  it('should be able to get Real Predecessor', function () {
    return this.rs.exec(this.ctx).should.equal(2.2 - Math.pow(10, -8))
  })
  it('should cause runtime error for Predecessor greater than Integer Max value', function () {
    return expect(() => this.ufr.exec(this.ctx)).to.throw(OverFlowException)
  })
  it('should be able to get Date Predecessor for year', function () {
    let dp = this.y_date.exec(this.ctx)
    dp.year.should.equal(2014)
    expect(dp.month).to.not.exist
    expect(dp.day).to.not.exist
    expect(dp.hour).to.not.exist
    expect(dp.minute).to.not.exist
    expect(dp.second).to.not.exist
    return expect(dp.millisecond).to.not.exist
  })

  it('should be able to get Date Predecessor for year,month', function () {
    let dp = this.ym_date.exec(this.ctx)
    dp.year.should.equal(2014)
    dp.month.should.equal(12)
    expect(dp.day).to.not.exist
    expect(dp.hour).to.not.exist
    expect(dp.minute).to.not.exist
    expect(dp.second).to.not.exist
    return expect(dp.millisecond).to.not.exist
  })

  it('should be able to get Date Predecessor for year,month,day', function () {
    let dp = this.ymd_date.exec(this.ctx)
    dp.year.should.equal(2014)
    dp.month.should.equal(12)
    dp.day.should.equal(31)
    expect(dp.hour).to.not.exist
    expect(dp.minute).to.not.exist
    expect(dp.second).to.not.exist
    return expect(dp.millisecond).to.not.exist
  })
  it('should be able to get Date Predecessor for year,month,day,hour', function () {
    let dp = this.ymdh_date.exec(this.ctx)
    dp.year.should.equal(2014)
    dp.month.should.equal(12)
    dp.day.should.equal(31)
    dp.hour.should.equal(23)
    expect(dp.minute).to.not.exist
    expect(dp.second).to.not.exist
    return expect(dp.millisecond).to.not.exist
  })

  it('should be able to get Date Predecessor for year,month,day,hour,minute', function () {
    let dp = this.ymdhm_date.exec(this.ctx)
    dp.year.should.equal(2014)
    dp.month.should.equal(12)
    dp.day.should.equal(31)
    dp.hour.should.equal(23)
    dp.minute.should.equal(59)
    expect(dp.second).to.not.exist
    return expect(dp.millisecond).to.not.exist
  })

  it('should be able to get Date Predecessor for year,month,day,hour,minute,seconds', function () {
    let dp = this.ymdhms_date.exec(this.ctx)
    dp.year.should.equal(2014)
    dp.month.should.equal(12)
    dp.day.should.equal(31)
    dp.hour.should.equal(23)
    dp.minute.should.equal(59)
    dp.second.should.equal(59)
    return expect(dp.millisecond).to.not.exist
  })

  it('should be able to get Date Predecessor for year,month,day,hour,minute,seconds,milliseconds', function () {
    let dp = this.ymdhmsm_date.exec(this.ctx)
    dp.year.should.equal(2014)
    dp.month.should.equal(12)
    dp.day.should.equal(31)
    dp.hour.should.equal(23)
    dp.minute.should.equal(59)
    return dp.millisecond.should.equal(999)
  })

  return it('should throw an exception when attempting to get the Predecessor of the minimum allowed date', function () {
    return expect(() => this.min_date.exec(this.ctx)).to.throw(OverFlowException)
  })
})

describe('Quantity', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should be able to perform Quantity Addition', function () {
    let aqq = this.add_q_q.exec(this.ctx)
    aqq.value.should.equal(20)
    aqq.unit.should.equal('days')
    let adq = this.add_d_q.exec(this.ctx)
    adq.constructor.name.should.equal('DateTime')
    adq.year.should.equal(2000)
    adq.month.should.equal(1)
    return adq.day.should.equal(11)
  })

  it('should be able to perform Quantity Subtraction', function () {
    let sqq = this.sub_q_q.exec(this.ctx)
    sqq.value.should.equal(0)
    sqq.unit.should.equal('days')
    let sdq = this.sub_d_q.exec(this.ctx)
    sdq.constructor.name.should.equal('DateTime')
    sdq.year.should.equal(1999)
    sdq.month.should.equal(12)
    return sdq.day.should.equal(22)
  })

  it('should be able to perform Quantity Division', function () {
    let dqd = this.div_q_d.exec(this.ctx)
    dqd.constructor.name.should.equal('Quantity')
    dqd.unit.should.equal('days')
    dqd.value.should.equal(5)
    let dqq = this.div_q_q.exec(this.ctx)
    return dqq.should.equal(1)
  })

  it('should be able to perform Quantity Multiplication', function () {
    let mdq = this.mul_d_q.exec(this.ctx)
    mdq.constructor.name.should.equal('Quantity')
    mdq.unit.should.equal('days')
    mdq.value.should.equal(20)
    let mqd = this.mul_q_d.exec(this.ctx)
    mqd.constructor.name.should.equal('Quantity')
    mqd.unit.should.equal('days')
    return mqd.value.should.equal(20)
  })

  it('should be able to perform Quantity Absolution', function () {
    let q = this.abs.exec(this.ctx)
    q.value.should.equal(10)
    return q.unit.should.equal('days')
  })

  return it('should be able to perform Quantity Negation', function () {
    let q = this.neg.exec(this.ctx)
    q.value.should.equal(-10)
    return q.unit.should.equal('days')
  })
})
