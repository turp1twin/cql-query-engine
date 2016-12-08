/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'
import { Uncertainty } from '../../../src/cql'

let expect = chai.expect

describe('DateTime', function () {
  beforeEach(function () {
    setup(this, data)
    this.defaultOffset = ((new Date()).getTimezoneOffset() / 60) * -1
  })

  it('should execute year precision correctly', function () {
    let d = this.year.exec(this.ctx)
    d.year.should.equal(2012)
    d.timezoneOffset.should.equal(this.defaultOffset)
    return [ 'month', 'day', 'hour', 'minute', 'second', 'millisecond' ].map(field => expect(d[field]).to.not.exist)
  })

  it('should execute month precision correctly', function () {
    let d = this.month.exec(this.ctx)
    d.year.should.equal(2012)
    d.month.should.equal(2)
    d.timezoneOffset.should.equal(this.defaultOffset)
    return [ 'day', 'hour', 'minute', 'second', 'millisecond' ].map(field => expect(d[field]).to.not.exist)
  })

  it('should execute day precision correctly', function () {
    let d = this.day.exec(this.ctx)
    d.year.should.equal(2012)
    d.month.should.equal(2)
    d.day.should.equal(15)
    d.timezoneOffset.should.equal(this.defaultOffset)
    return [ 'hour', 'minute', 'second', 'millisecond' ].map(field => expect(d[field]).to.not.exist)
  })

  it('should execute hour precision correctly', function () {
    let d = this.hour.exec(this.ctx)
    d.year.should.equal(2012)
    d.month.should.equal(2)
    d.day.should.equal(15)
    d.hour.should.equal(12)
    d.timezoneOffset.should.equal(this.defaultOffset)
    return [ 'minute', 'second', 'millisecond' ].map(field => expect(d[field]).to.not.exist)
  })

  it('should execute minute precision correctly', function () {
    let d = this.minute.exec(this.ctx)
    d.year.should.equal(2012)
    d.month.should.equal(2)
    d.day.should.equal(15)
    d.hour.should.equal(12)
    d.minute.should.equal(10)
    d.timezoneOffset.should.equal(this.defaultOffset)
    return [ 'second', 'millisecond' ].map(field => expect(d[field]).to.not.exist)
  })

  it('should execute second precision correctly', function () {
    let d = this.second.exec(this.ctx)
    d.year.should.equal(2012)
    d.month.should.equal(2)
    d.day.should.equal(15)
    d.hour.should.equal(12)
    d.minute.should.equal(10)
    d.second.should.equal(59)
    d.timezoneOffset.should.equal(this.defaultOffset)
    return expect(d.millisecond).to.not.exist
  })

  it('should execute millisecond precision correctly', function () {
    let d = this.millisecond.exec(this.ctx)
    d.year.should.equal(2012)
    d.month.should.equal(2)
    d.day.should.equal(15)
    d.hour.should.equal(12)
    d.minute.should.equal(10)
    d.second.should.equal(59)
    d.millisecond.should.equal(456)
    return d.timezoneOffset.should.equal(this.defaultOffset)
  })

  return it('should execute timezone offsets correctly', function () {
    let d = this.timezoneOffset.exec(this.ctx)
    d.year.should.equal(2012)
    d.month.should.equal(2)
    d.day.should.equal(15)
    d.hour.should.equal(12)
    d.minute.should.equal(10)
    d.second.should.equal(59)
    d.millisecond.should.equal(456)
    return d.timezoneOffset.should.equal(-8)
  })
})

describe('Today', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  return it('should return only day components and timezone of today', function () {
    let jsDate = new Date()
    let today = this.todayVar.exec(this.ctx)
    today.year.should.equal(jsDate.getFullYear())
    today.month.should.equal(jsDate.getMonth() + 1)
    today.day.should.equal(jsDate.getDate())
    today.timezoneOffset.should.equal((jsDate.getTimezoneOffset() / 60) * -1)
    return [ 'hour', 'minute', 'second', 'millisecond' ].map(field => expect(today[field]).to.not.exist)
  })
})

describe('Now', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  return it('should return all date components representing now', function () {
    let jsDate = new Date()
    let now = this.nowVar.exec(this.ctx)
    now.year.should.equal(jsDate.getFullYear())
    now.month.should.equal(jsDate.getMonth() + 1)
    now.day.should.equal(jsDate.getDate())
    now.hour.should.equal(jsDate.getHours())
    now.minute.should.exist
    now.second.should.exist
    now.millisecond.should.exist
    return now.timezoneOffset.should.equal((jsDate.getTimezoneOffset() / 60) * -1)
  })
})

describe('DateTimeComponentFrom', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should return the year from the date', function () {
    return this.year.exec(this.ctx).should.equal(2000)
  })

  it('should return the month from the date', function () {
    return this.month.exec(this.ctx).should.equal(3)
  })

  it('should return the day from the date', function () {
    return this.day.exec(this.ctx).should.equal(15)
  })

  it('should return the hour from the date', function () {
    return this.hour.exec(this.ctx).should.equal(13)
  })

  it('should return the minute from the date', function () {
    return this.minute.exec(this.ctx).should.equal(30)
  })

  it('should return the second from the date', function () {
    return this.second.exec(this.ctx).should.equal(25)
  })

  it('should return the millisecond from the date', function () {
    return this.millisecond.exec(this.ctx).should.equal(200)
  })

  it('should return null for imprecise components', function () {
    let result = this.impreciseComponentTuple.exec(this.ctx)
    return result.should.eql({
      Year: 2000,
      Month: 3,
      Day: 15,
      Hour: null,
      Minute: null,
      Second: null,
      Millisecond: null
    })
  })

  return it('should return null for null date', function () {
    return expect(this.nullDate.exec(this.ctx)).to.be.null
  })
})

describe('DateFrom', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should return the date from a fully defined DateTime', function () {
    let date = this.date.exec(this.ctx)
    date.year.should.equal(2000)
    date.month.should.equal(3)
    date.day.should.equal(15)
    date.timezoneOffset.should.equal(1)
    expect(date.hour).to.not.exist
    expect(date.minute).to.not.exist
    expect(date.second).to.not.exist
    return expect(date.millisecond).to.not.exist
  })

  it('should return the defined date components from an imprecise date', function () {
    let date = this.impreciseDate.exec(this.ctx)
    date.year.should.equal(2000)
    expect(date.month).to.not.exist
    expect(date.day).to.not.exist
    expect(date.hour).to.not.exist
    expect(date.minute).to.not.exist
    expect(date.second).to.not.exist
    return expect(date.millisecond).to.not.exist
  })

  return it('should return null for null date', function () {
    return expect(this.nullDate.exec(this.ctx)).to.be.null
  })
})

describe('TimeFrom', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should return the time from a fully defined DateTime (and date should be lowest expressible date)', function () {
    let time = this.time.exec(this.ctx)
    time.year.should.equal(1900)
    time.month.should.equal(1)
    time.day.should.equal(1)
    time.hour.should.equal(13)
    time.minute.should.equal(30)
    time.second.should.equal(25)
    time.millisecond.should.equal(200)
    return time.timezoneOffset.should.equal(1)
  })

  it('should return the null time components from a date with no time', function () {
    let noTime = this.noTime.exec(this.ctx)
    noTime.year.should.equal(1900)
    noTime.month.should.equal(1)
    noTime.day.should.equal(1)
    expect(noTime.hour).to.not.exist
    expect(noTime.minute).to.not.exist
    expect(noTime.second).to.not.exist
    return expect(noTime.millisecond).to.not.exist
  })

  return it('should return null for null date', function () {
    return expect(this.nullDate.exec(this.ctx)).to.be.null
  })
})

describe('TimezoneFrom', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should return the timezone from a fully defined DateTime', function () {
    this.centralEuropean.exec(this.ctx).should.equal(1)
    return this.easternStandard.exec(this.ctx).should.equal(-5)
  })

  it('should return the default timezone when not specified', function () {
    return this.defaultTimezone.exec(this.ctx).should.equal(((new Date()).getTimezoneOffset() / 60) * -1)
  })

  return it('should return null for null date', function () {
    return expect(this.nullDate.exec(this.ctx)).to.be.null
  })
})

describe('SameAs', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should properly determine when year is the same', function () {
    this.sameYear.exec(this.ctx).should.be.true
    return this.notSameYear.exec(this.ctx).should.be.false
  })

  it('should properly determine when month is the same', function () {
    this.sameMonth.exec(this.ctx).should.be.true
    this.notSameMonth.exec(this.ctx).should.be.false
    return this.sameMonthWrongYear.exec(this.ctx).should.be.false
  })

  it('should properly determine when day is the same', function () {
    this.sameDay.exec(this.ctx).should.be.true
    this.notSameDay.exec(this.ctx).should.be.false
    return this.sameDayWrongMonth.exec(this.ctx).should.be.false
  })

  it('should properly determine when hour is the same', function () {
    this.sameHour.exec(this.ctx).should.be.true
    this.notSameHour.exec(this.ctx).should.be.false
    return this.sameHourWrongDay.exec(this.ctx).should.be.false
  })

  it('should properly determine when minute is the same', function () {
    this.sameMinute.exec(this.ctx).should.be.true
    this.notSameMinute.exec(this.ctx).should.be.false
    return this.sameMinuteWrongHour.exec(this.ctx).should.be.false
  })

  it('should properly determine when second is the same', function () {
    this.sameSecond.exec(this.ctx).should.be.true
    this.notSameSecond.exec(this.ctx).should.be.false
    return this.sameSecondWrongMinute.exec(this.ctx).should.be.false
  })

  it('should properly determine when millisecond is the same', function () {
    this.sameMillisecond.exec(this.ctx).should.be.true
    this.notSameMillisecond.exec(this.ctx).should.be.false
    return this.sameMillisecondWrongSecond.exec(this.ctx).should.be.false
  })

  it('should properly determine same as using milliseconds', function () {
    this.same.exec(this.ctx).should.be.true
    return this.notSame.exec(this.ctx).should.be.false
  })

  it('should normalize timezones when determining sameness', function () {
    this.sameNormalized.exec(this.ctx).should.be.true
    return this.sameHourWrongTimezone.exec(this.ctx).should.be.false
  })

  it('should handle imprecision', function () {
    expect(this.impreciseHour.exec(this.ctx)).to.be.null
    return this.impreciseHourWrongDay.exec(this.ctx).should.be.false
  })

  return it('should return null when either argument is null', function () {
    expect(this.nullLeft.exec(this.ctx)).to.be.null
    expect(this.nullRight.exec(this.ctx)).to.be.null
    return expect(this.nullBoth.exec(this.ctx)).to.be.null
  })
})

describe('SameOrAfter', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should properly determine when year is same or after', function () {
    this.sameYear.exec(this.ctx).should.be.true
    this.yearAfter.exec(this.ctx).should.be.true
    return this.yearBefore.exec(this.ctx).should.be.false
  })

  it('should properly determine when month is same or after', function () {
    this.sameMonth.exec(this.ctx).should.be.true
    this.monthAfter.exec(this.ctx).should.be.true
    return this.monthBefore.exec(this.ctx).should.be.false
  })

  it('should properly determine when day is same or after', function () {
    this.sameDay.exec(this.ctx).should.be.true
    this.dayAfter.exec(this.ctx).should.be.true
    return this.dayBefore.exec(this.ctx).should.be.false
  })

  it('should properly determine when hour is same or after', function () {
    this.sameHour.exec(this.ctx).should.be.true
    this.hourAfter.exec(this.ctx).should.be.true
    return this.hourBefore.exec(this.ctx).should.be.false
  })

  it('should properly determine when minute is same or after', function () {
    this.sameMinute.exec(this.ctx).should.be.true
    this.minuteAfter.exec(this.ctx).should.be.true
    return this.minuteBefore.exec(this.ctx).should.be.false
  })

  it('should properly determine when second is same or after', function () {
    this.sameSecond.exec(this.ctx).should.be.true
    this.secondAfter.exec(this.ctx).should.be.true
    return this.secondBefore.exec(this.ctx).should.be.false
  })

  it('should properly determine when millisecond is same or after', function () {
    this.sameMillisecond.exec(this.ctx).should.be.true
    this.millisecondAfter.exec(this.ctx).should.be.true
    return this.millisecondBefore.exec(this.ctx).should.be.false
  })

  it('should properly determine same or after using ms when no precision defined', function () {
    this.same.exec(this.ctx).should.be.true
    this.after.exec(this.ctx).should.be.true
    return this.before.exec(this.ctx).should.be.false
  })

  it('should consider precision units above the specified unit', function () {
    this.sameDayMonthBefore.exec(this.ctx).should.be.false
    this.dayAfterMonthBefore.exec(this.ctx).should.be.false
    return this.dayBeforeMonthAfter.exec(this.ctx).should.be.true
  })

  it('should handle imprecision', function () {
    expect(this.impreciseDay.exec(this.ctx)).to.be.null
    this.impreciseDayMonthAfter.exec(this.ctx).should.be.true
    return this.impreciseDayMonthBefore.exec(this.ctx).should.be.false
  })

  it('should normalize timezones', function () {
    this.sameHourNormalizeZones.exec(this.ctx).should.be.true
    this.hourAfterNormalizeZones.exec(this.ctx).should.be.true
    return this.hourBeforeNormalizeZones.exec(this.ctx).should.be.false
  })

  return it('should return null when either argument is null', function () {
    expect(this.nullLeft.exec(this.ctx)).to.be.null
    expect(this.nullRight.exec(this.ctx)).to.be.null
    return expect(this.nullBoth.exec(this.ctx)).to.be.null
  })
})

describe('SameOrBefore', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should properly determine when year is same or after', function () {
    this.sameYear.exec(this.ctx).should.be.true
    this.yearAfter.exec(this.ctx).should.be.false
    return this.yearBefore.exec(this.ctx).should.be.true
  })

  it('should properly determine when month is same or after', function () {
    this.sameMonth.exec(this.ctx).should.be.true
    this.monthAfter.exec(this.ctx).should.be.false
    return this.monthBefore.exec(this.ctx).should.be.true
  })

  it('should properly determine when day is same or after', function () {
    this.sameDay.exec(this.ctx).should.be.true
    this.dayAfter.exec(this.ctx).should.be.false
    return this.dayBefore.exec(this.ctx).should.be.true
  })

  it('should properly determine when hour is same or after', function () {
    this.sameHour.exec(this.ctx).should.be.true
    this.hourAfter.exec(this.ctx).should.be.false
    return this.hourBefore.exec(this.ctx).should.be.true
  })

  it('should properly determine when minute is same or after', function () {
    this.sameMinute.exec(this.ctx).should.be.true
    this.minuteAfter.exec(this.ctx).should.be.false
    return this.minuteBefore.exec(this.ctx).should.be.true
  })

  it('should properly determine when second is same or after', function () {
    this.sameSecond.exec(this.ctx).should.be.true
    this.secondAfter.exec(this.ctx).should.be.false
    return this.secondBefore.exec(this.ctx).should.be.true
  })

  it('should properly determine when millisecond is same or after', function () {
    this.sameMillisecond.exec(this.ctx).should.be.true
    this.millisecondAfter.exec(this.ctx).should.be.false
    return this.millisecondBefore.exec(this.ctx).should.be.true
  })

  it('should properly determine same or after using ms when no precision defined', function () {
    this.same.exec(this.ctx).should.be.true
    this.after.exec(this.ctx).should.be.false
    return this.before.exec(this.ctx).should.be.true
  })

  it('should consider precision units above the specified unit', function () {
    this.sameDayMonthBefore.exec(this.ctx).should.be.true
    this.dayAfterMonthBefore.exec(this.ctx).should.be.true
    return this.dayBeforeMonthAfter.exec(this.ctx).should.be.false
  })

  it('should handle imprecision', function () {
    expect(this.impreciseDay.exec(this.ctx)).to.be.null
    this.impreciseDayMonthAfter.exec(this.ctx).should.be.false
    return this.impreciseDayMonthBefore.exec(this.ctx).should.be.true
  })

  it('should normalize timezones', function () {
    this.sameHourNormalizeZones.exec(this.ctx).should.be.true
    this.hourAfterNormalizeZones.exec(this.ctx).should.be.false
    return this.hourBeforeNormalizeZones.exec(this.ctx).should.be.true
  })

  return it('should return null when either argument is null', function () {
    expect(this.nullLeft.exec(this.ctx)).to.be.null
    expect(this.nullRight.exec(this.ctx)).to.be.null
    return expect(this.nullBoth.exec(this.ctx)).to.be.null
  })
})

describe('After', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should properly determine when year is same or after', function () {
    this.sameYear.exec(this.ctx).should.be.false
    this.yearAfter.exec(this.ctx).should.be.true
    return this.yearBefore.exec(this.ctx).should.be.false
  })

  it('should properly determine when month is same or after', function () {
    this.sameMonth.exec(this.ctx).should.be.false
    this.monthAfter.exec(this.ctx).should.be.true
    return this.monthBefore.exec(this.ctx).should.be.false
  })

  it('should properly determine when day is same or after', function () {
    this.sameDay.exec(this.ctx).should.be.false
    this.dayAfter.exec(this.ctx).should.be.true
    return this.dayBefore.exec(this.ctx).should.be.false
  })

  it('should properly determine when hour is same or after', function () {
    this.sameHour.exec(this.ctx).should.be.false
    this.hourAfter.exec(this.ctx).should.be.true
    return this.hourBefore.exec(this.ctx).should.be.false
  })

  it('should properly determine when minute is same or after', function () {
    this.sameMinute.exec(this.ctx).should.be.false
    this.minuteAfter.exec(this.ctx).should.be.true
    return this.minuteBefore.exec(this.ctx).should.be.false
  })

  it('should properly determine when second is same or after', function () {
    this.sameSecond.exec(this.ctx).should.be.false
    this.secondAfter.exec(this.ctx).should.be.true
    return this.secondBefore.exec(this.ctx).should.be.false
  })

  it('should properly determine when millisecond is same or after', function () {
    this.sameMillisecond.exec(this.ctx).should.be.false
    this.millisecondAfter.exec(this.ctx).should.be.true
    return this.millisecondBefore.exec(this.ctx).should.be.false
  })

  it('should properly determine same or after using ms when no precision defined', function () {
    this.same.exec(this.ctx).should.be.false
    this.after.exec(this.ctx).should.be.true
    return this.before.exec(this.ctx).should.be.false
  })

  it('should handle imprecision', function () {
    expect(this.impreciseDay.exec(this.ctx)).to.be.null
    this.impreciseDayMonthAfter.exec(this.ctx).should.be.true
    return this.impreciseDayMonthBefore.exec(this.ctx).should.be.false
  })

  it('should normalize timezones', function () {
    this.sameHourNormalizeZones.exec(this.ctx).should.be.false
    this.hourAfterNormalizeZones.exec(this.ctx).should.be.true
    return this.hourBeforeNormalizeZones.exec(this.ctx).should.be.false
  })

  return it('should return null when either argument is null', function () {
    expect(this.nullLeft.exec(this.ctx)).to.be.null
    expect(this.nullRight.exec(this.ctx)).to.be.null
    return expect(this.nullBoth.exec(this.ctx)).to.be.null
  })
})

describe('Before', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should properly determine when year is same or after', function () {
    this.sameYear.exec(this.ctx).should.be.false
    this.yearAfter.exec(this.ctx).should.be.false
    return this.yearBefore.exec(this.ctx).should.be.true
  })

  it('should properly determine when month is same or after', function () {
    this.sameMonth.exec(this.ctx).should.be.false
    this.monthAfter.exec(this.ctx).should.be.false
    return this.monthBefore.exec(this.ctx).should.be.true
  })

  it('should properly determine when day is same or after', function () {
    this.sameDay.exec(this.ctx).should.be.false
    this.dayAfter.exec(this.ctx).should.be.false
    return this.dayBefore.exec(this.ctx).should.be.true
  })

  it('should properly determine when hour is same or after', function () {
    this.sameHour.exec(this.ctx).should.be.false
    this.hourAfter.exec(this.ctx).should.be.false
    return this.hourBefore.exec(this.ctx).should.be.true
  })

  it('should properly determine when minute is same or after', function () {
    this.sameMinute.exec(this.ctx).should.be.false
    this.minuteAfter.exec(this.ctx).should.be.false
    return this.minuteBefore.exec(this.ctx).should.be.true
  })

  it('should properly determine when second is same or after', function () {
    this.sameSecond.exec(this.ctx).should.be.false
    this.secondAfter.exec(this.ctx).should.be.false
    return this.secondBefore.exec(this.ctx).should.be.true
  })

  it('should properly determine when millisecond is same or after', function () {
    this.sameMillisecond.exec(this.ctx).should.be.false
    this.millisecondAfter.exec(this.ctx).should.be.false
    return this.millisecondBefore.exec(this.ctx).should.be.true
  })

  it('should properly determine same or after using ms when no precision defined', function () {
    this.same.exec(this.ctx).should.be.false
    this.after.exec(this.ctx).should.be.false
    return this.before.exec(this.ctx).should.be.true
  })

  it('should handle imprecision', function () {
    expect(this.impreciseDay.exec(this.ctx)).to.be.null
    this.impreciseDayMonthAfter.exec(this.ctx).should.be.false
    return this.impreciseDayMonthBefore.exec(this.ctx).should.be.true
  })

  it('should normalize timezones', function () {
    this.sameHourNormalizeZones.exec(this.ctx).should.be.false
    this.hourAfterNormalizeZones.exec(this.ctx).should.be.false
    return this.hourBeforeNormalizeZones.exec(this.ctx).should.be.true
  })

  return it('should return null when either argument is null', function () {
    expect(this.nullLeft.exec(this.ctx)).to.be.null
    expect(this.nullRight.exec(this.ctx)).to.be.null
    return expect(this.nullBoth.exec(this.ctx)).to.be.null
  })
})

describe('DurationBetween', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should properly execute years between', function () {
    return this.yearsBetween.exec(this.ctx).should.equal(1)
  })

  it('should properly execute months between', function () {
    return this.monthsBetween.exec(this.ctx).should.equal(12)
  })

  it('should properly execute days between', function () {
    return this.daysBetween.exec(this.ctx).should.equal(365)
  })

  it('should properly execute hours between', function () {
    return this.hoursBetween.exec(this.ctx).should.equal(24 * 365)
  })

  it('should properly execute minutes between', function () {
    return this.minutesBetween.exec(this.ctx).should.equal(60 * 24 * 365)
  })

  it('should properly execute seconds between', function () {
    return this.secondsBetween.exec(this.ctx).should.equal(60 * 60 * 24 * 365)
  })

  it('should properly execute milliseconds between', function () {
    return this.millisecondsBetween.exec(this.ctx).should.equal(1000 * 60 * 60 * 24 * 365)
  })

  it('should properly execute milliseconds between when date 1 is after date 2', function () {
    return this.millisecondsBetweenReversed.exec(this.ctx).should.equal(-1 * 1000 * 60 * 60 * 24 * 365)
  })

  it('should properly execute years between with an uncertainty', function () {
    return this.yearsBetweenUncertainty.exec(this.ctx).should.equal(0)
  })

  it('should properly execute months between with an uncertainty', function () {
    return this.monthsBetweenUncertainty.exec(this.ctx).should.equal(0)
  })

  it('should properly execute days between with an uncertainty', function () {
    return this.daysBetweenUncertainty.exec(this.ctx).should.eql(new Uncertainty(0, 30))
  })

  it('should properly execute hours between with an uncertainty', function () {
    return this.hoursBetweenUncertainty.exec(this.ctx).should.eql(new Uncertainty(0, 743))
  })

  it('should properly execute minutes between with an uncertainty', function () {
    return this.minutesBetweenUncertainty.exec(this.ctx).should.eql(new Uncertainty(0, 44639))
  })

  it('should properly execute seconds between with an uncertainty', function () {
    return this.secondsBetweenUncertainty.exec(this.ctx).should.eql(new Uncertainty(0, 2678399))
  })

  it('should properly execute milliseconds between with an uncertainty', function () {
    return this.millisecondsBetweenUncertainty.exec(this.ctx).should.eql(new Uncertainty(0, 2678399999))
  })

  return it('should properly execute seconds between when date 1 is after date 2 with an uncertainty', function () {
    return this.millisecondsBetweenReversedUncertainty.exec(this.ctx).should.eql(new Uncertainty(-2678399999, 0))
  })
})

describe('DurationBetween Comparisons', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should calculate days between > x', function () {
    this.greaterThan25DaysAfter.exec(this.ctx).should.be.true
    expect(this.greaterThan40DaysAfter.exec(this.ctx)).to.be.null
    return this.greaterThan80DaysAfter.exec(this.ctx).should.be.false
  })

  it('should calculate days between >= x', function () {
    this.greaterOrEqualTo25DaysAfter.exec(this.ctx).should.be.true
    expect(this.greaterOrEqualTo40DaysAfter.exec(this.ctx)).to.be.null
    return this.greaterOrEqualTo80DaysAfter.exec(this.ctx).should.be.false
  })

  it('should calculate days between = x', function () {
    this.equalTo25DaysAfter.exec(this.ctx).should.be.false
    expect(this.equalTo40DaysAfter.exec(this.ctx)).to.be.null
    return this.equalTo80DaysAfter.exec(this.ctx).should.be.false
  })

  it('should calculate days between <= x', function () {
    this.lessOrEqualTo25DaysAfter.exec(this.ctx).should.be.false
    expect(this.lessOrEqualTo40DaysAfter.exec(this.ctx)).to.be.null
    return this.lessOrEqualTo80DaysAfter.exec(this.ctx).should.be.true
  })

  it('should calculate days between < x', function () {
    this.lessThan25DaysAfter.exec(this.ctx).should.be.false
    expect(this.lessThan40DaysAfter.exec(this.ctx)).to.be.null
    return this.lessThan80DaysAfter.exec(this.ctx).should.be.true
  })

  return it('should calculate other way too', function () {
    this.twentyFiveDaysLessThanDaysBetween.exec(this.ctx).should.be.true
    expect(this.fortyDaysEqualToDaysBetween.exec(this.ctx)).to.be.null
    return this.twentyFiveDaysGreaterThanDaysBetween.exec(this.ctx).should.be.false
  })
})
