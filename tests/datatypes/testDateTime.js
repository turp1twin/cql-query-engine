/* global describe it */
import DateTime from '../../src/datatypes/DateTime'
import Uncertainty from '../../src/datatypes/Uncertainty'
import chai from 'chai'
chai.should()
let expect = chai.expect

const tzDate = (y, mo, d, h, mi, s, ms, offset) => {
  if (offset == null) offset = ((new Date()).getTimezoneOffset() / 60) * -1
  return new Date(Date.UTC(y, mo, d, h, mi, s, ms) - (offset * 60 * 60 * 1000))
}

describe('DateTime', () => {
  it('should properly set all properties when constructed', () => {
    let d = new DateTime(2000, 12, 1, 3, 25, 59, 246, 5.5)
    d.year.should.equal(2000)
    d.month.should.equal(12)
    d.day.should.equal(1)
    d.hour.should.equal(3)
    d.minute.should.equal(25)
    d.second.should.equal(59)
    d.millisecond.should.equal(246)
    return d.timezoneOffset.should.equal(5.5)
  })

  it('should leave unset properties as undefined', () => {
    let d = new DateTime(2000)
    d.year.should.equal(2000)
    d.timezoneOffset.should.equal(((new Date()).getTimezoneOffset() / 60) * -1)
    expect(d.month).to.not.exist
    expect(d.day).to.not.exist
    expect(d.hour).to.not.exist
    expect(d.minute).to.not.exist
    expect(d.second).to.not.exist
    return expect(d.millisecond).to.not.exist
  })

  it('should parse yyyy', () => {
    let d = DateTime.parse('2012')
    return d.should.eql(new DateTime(2012))
  })

  it('should parse yyyy-mm', () => {
    let d = DateTime.parse('2012-10')
    return d.should.eql(new DateTime(2012, 10))
  })

  it('should parse yyyy-mm-dd', () => {
    let d = DateTime.parse('2012-10-25')
    return d.should.eql(new DateTime(2012, 10, 25))
  })

  it('should parse yyyy-mm-ddThh with and without timezone offset', () => {
    let d = DateTime.parse('2012-10-25T12')
    d.should.eql(new DateTime(2012, 10, 25, 12))
    d = DateTime.parse('2012-10-25T12-05')
    return d.should.eql(new DateTime(2012, 10, 25, 12, null, null, null, -5))
  })

  it('should parse yyyy-mm-ddThh:mm with and without timezone offset', () => {
    let d = DateTime.parse('2012-10-25T12:55')
    d.should.eql(new DateTime(2012, 10, 25, 12, 55))
    d = DateTime.parse('2012-10-25T12:55+05:30')
    return d.should.eql(new DateTime(2012, 10, 25, 12, 55, null, null, 5.5))
  })

  it('should parse yyyy-mm-ddThh:mm:ss with and without timezone offset', () => {
    let d = DateTime.parse('2012-10-25T12:55:14')
    d.should.eql(new DateTime(2012, 10, 25, 12, 55, 14))
    d = DateTime.parse('2012-10-25T12:55:14+01')
    return d.should.eql(new DateTime(2012, 10, 25, 12, 55, 14, null, 1))
  })

  it('should parse yyyy-mm-ddThh:mm:ss.s with and without timezone offset', () => {
    let d = DateTime.parse('2012-10-25T12:55:14.9')
    d.should.eql(new DateTime(2012, 10, 25, 12, 55, 14, 900))

    d = DateTime.parse('2012-10-25T12:55:14.95')
    d.should.eql(new DateTime(2012, 10, 25, 12, 55, 14, 950))

    d = DateTime.parse('2012-10-25T12:55:14.953')
    d.should.eql(new DateTime(2012, 10, 25, 12, 55, 14, 953))

    d = DateTime.parse('2012-10-25T12:55:14.9641368')
    d.should.eql(new DateTime(2012, 10, 25, 12, 55, 14, 964))

    d = DateTime.parse('2012-10-25T12:55:14.953-01')
    return d.should.eql(new DateTime(2012, 10, 25, 12, 55, 14, 953, -1))
  })

  it('should not parse invalid strings', () => expect(DateTime.parse('20121025')).to.not.exist)
  it('should construct from a javascript date', () => DateTime.fromDate(new Date(1999, 1, 16, 13, 56, 24, 123)).should.eql(DateTime.parse('1999-02-16T13:56:24.123')))
  it('should construct from a javascript date into a target timezone', () => {
    DateTime.fromDate(new Date(Date.UTC(1999, 1, 16, 13, 56, 24, 123)), -5).should.eql(DateTime.parse('1999-02-16T08:56:24.123-05:00'))
    return DateTime.fromDate(new Date(Date.UTC(1999, 1, 16, 13, 56, 24, 123)), +4.5).should.eql(DateTime.parse('1999-02-16T18:26:24.123+04:30'))
  })

  it('should copy a fully define DateTime', () => {
    let original = DateTime.parse('1999-02-16T13:56:24.123+04:30')
    let copy = original.copy()
    copy.should.eql(original)
    return copy.should.not.equal(original)
  })

  it('should copy an imprecise DateTime', () => {
    let original = DateTime.parse('1999-02')
    let copy = original.copy()
    copy.should.eql(original)
    return copy.should.not.equal(original)
  })

  it('should convert to other timezone offsets', () => {
    let original = DateTime.parse('1999-02-16T13:56:24.123+04:30')
    let converted = original.convertToTimezoneOffset(-5)
    converted.should.not.eql(original)
    return converted.should.eql(DateTime.parse('1999-02-16T04:26:24.123-05:00'))
  })

  it('should know if it is precise', () => {
    DateTime.parse('2000-01-01T00:00:00.0-05:00').isPrecise().should.be.true
    DateTime.parse('2000-01-01T00:00:00.0').isPrecise().should.be.true
    DateTime.parse('2000-01-01T00:00:00').isPrecise().should.be.false
    DateTime.parse('2000-01-01T00:00').isPrecise().should.be.false
    DateTime.parse('2000-01-01T00').isPrecise().should.be.false
    DateTime.parse('2000-01-01').isPrecise().should.be.false
    DateTime.parse('2000-01').isPrecise().should.be.false
    return DateTime.parse('2000').isPrecise().should.be.false
  })

  it('should know if it is imprecise', () => {
    DateTime.parse('2000-01-01T00:00:00.0-05:00').isImprecise().should.be.false
    DateTime.parse('2000-01-01T00:00:00.0').isImprecise().should.be.false
    DateTime.parse('2000-01-01T00:00:00').isImprecise().should.be.true
    DateTime.parse('2000-01-01T00:00').isImprecise().should.be.true
    DateTime.parse('2000-01-01T00').isImprecise().should.be.true
    DateTime.parse('2000-01-01').isImprecise().should.be.true
    DateTime.parse('2000-01').isImprecise().should.be.true
    return DateTime.parse('2000').isImprecise().should.be.true
  })

  it('should correctly convert to uncertainties with JavaScript dates', () => {
    let preciseUncertainty = DateTime.parse('2000-02-25T12:15:43.123').toUncertainty()
    preciseUncertainty.isPoint().should.be.true
    preciseUncertainty.low.should.eql(tzDate(2000, 1, 25, 12, 15, 43, 123))
    preciseUncertainty.high.should.eql(tzDate(2000, 1, 25, 12, 15, 43, 123))

    let toSecond = DateTime.parse('2000-02-25T12:15:43').toUncertainty()
    toSecond.isPoint().should.be.false
    toSecond.low.should.eql(tzDate(2000, 1, 25, 12, 15, 43, 0))
    toSecond.high.should.eql(tzDate(2000, 1, 25, 12, 15, 43, 999))

    let toMinute = DateTime.parse('2000-02-25T12:15').toUncertainty()
    toMinute.isPoint().should.be.false
    toMinute.low.should.eql(tzDate(2000, 1, 25, 12, 15, 0, 0))
    toMinute.high.should.eql(tzDate(2000, 1, 25, 12, 15, 59, 999))

    let toHour = DateTime.parse('2000-02-25T12').toUncertainty()
    toHour.isPoint().should.be.false
    toHour.low.should.eql(tzDate(2000, 1, 25, 12, 0, 0, 0))
    toHour.high.should.eql(tzDate(2000, 1, 25, 12, 59, 59, 999))

    let toDay = DateTime.parse('2000-02-25').toUncertainty()
    toDay.isPoint().should.be.false
    toDay.low.should.eql(tzDate(2000, 1, 25, 0, 0, 0, 0))
    toDay.high.should.eql(tzDate(2000, 1, 25, 23, 59, 59, 999))

    let toMonthLeapYear = DateTime.parse('2000-02').toUncertainty()
    toMonthLeapYear.isPoint().should.be.false
    toMonthLeapYear.low.should.eql(tzDate(2000, 1, 1, 0, 0, 0, 0))
    toMonthLeapYear.high.should.eql(tzDate(2000, 1, 29, 23, 59, 59, 999))

    let toMonthNonLeapYear = DateTime.parse('1999-02').toUncertainty()
    toMonthNonLeapYear.isPoint().should.be.false
    toMonthNonLeapYear.low.should.eql(tzDate(1999, 1, 1, 0, 0, 0, 0))
    toMonthNonLeapYear.high.should.eql(tzDate(1999, 1, 28, 23, 59, 59, 999))

    let toYear = DateTime.parse('2000').toUncertainty()
    toYear.isPoint().should.be.false
    toYear.low.should.eql(tzDate(2000, 0, 1, 0, 0, 0, 0))
    return toYear.high.should.eql(tzDate(2000, 11, 31, 23, 59, 59, 999))
  })

  it('should convert to javascript Date', () => DateTime.parse('2012-02-25T12:55:14.456').toJSDate().should.eql(tzDate(2012, 1, 25, 12, 55, 14, 456)))
  it('should convert to javascript Date w/ time zone offsets', () => {
    DateTime.parse('2012-10-25T12:55:14.456+04:30').toJSDate().should.eql(new Date('2012-10-25T12:55:14.456+04:30'))
    DateTime.parse('2012-10-25T12:55:14.456+00:00').toJSDate().should.eql(new Date('2012-10-25T12:55:14.456Z'))
    return DateTime.parse('2012-10-25T12:55:14.0-05').toJSDate().should.eql(new Date('25 Oct 2012 12:55:14 EST'))
  })

  return it('should floor unknown values when it converts to javascript Date', () => DateTime.parse('2012').toJSDate().should.eql(tzDate(2012, 0, 1, 0, 0, 0, 0)))
})

describe('DateTime.add', () => {
  it('should add units for simple cases', () => {
    let simple = DateTime.parse('2000-06-15T10:20:30.555')
    simple.add(1, DateTime.Unit.YEAR).should.eql(DateTime.parse('2001-06-15T10:20:30.555'))
    simple.add(1, DateTime.Unit.MONTH).should.eql(DateTime.parse('2000-07-15T10:20:30.555'))
    simple.add(1, DateTime.Unit.DAY).should.eql(DateTime.parse('2000-06-16T10:20:30.555'))
    simple.add(1, DateTime.Unit.HOUR).should.eql(DateTime.parse('2000-06-15T11:20:30.555'))
    simple.add(1, DateTime.Unit.MINUTE).should.eql(DateTime.parse('2000-06-15T10:21:30.555'))
    simple.add(1, DateTime.Unit.SECOND).should.eql(DateTime.parse('2000-06-15T10:20:31.555'))
    return simple.add(1, DateTime.Unit.MILLISECOND).should.eql(DateTime.parse('2000-06-15T10:20:30.556'))
  })

  it('should subtract units for simple cases', () => {
    let simple = DateTime.parse('2000-06-15T10:20:30.555')
    simple.add(-1, DateTime.Unit.YEAR).should.eql(DateTime.parse('1999-06-15T10:20:30.555'))
    simple.add(-1, DateTime.Unit.MONTH).should.eql(DateTime.parse('2000-05-15T10:20:30.555'))
    simple.add(-1, DateTime.Unit.DAY).should.eql(DateTime.parse('2000-06-14T10:20:30.555'))
    simple.add(-1, DateTime.Unit.HOUR).should.eql(DateTime.parse('2000-06-15T09:20:30.555'))
    simple.add(-1, DateTime.Unit.MINUTE).should.eql(DateTime.parse('2000-06-15T10:19:30.555'))
    simple.add(-1, DateTime.Unit.SECOND).should.eql(DateTime.parse('2000-06-15T10:20:29.555'))
    return simple.add(-1, DateTime.Unit.MILLISECOND).should.eql(DateTime.parse('2000-06-15T10:20:30.554'))
  })

  it('should rollover when you add past a boundary', () => {
    let almostMidnight = DateTime.parse('2000-12-31T23:59:59.999')
    almostMidnight.add(1, DateTime.Unit.MONTH).should.eql(DateTime.parse('2001-01-31T23:59:59.999'))
    almostMidnight.add(1, DateTime.Unit.DAY).should.eql(DateTime.parse('2001-01-01T23:59:59.999'))
    almostMidnight.add(1, DateTime.Unit.HOUR).should.eql(DateTime.parse('2001-01-01T00:59:59.999'))
    almostMidnight.add(1, DateTime.Unit.MINUTE).should.eql(DateTime.parse('2001-01-01T00:00:59.999'))
    almostMidnight.add(1, DateTime.Unit.SECOND).should.eql(DateTime.parse('2001-01-01T00:00:00.999'))
    return almostMidnight.add(1, DateTime.Unit.MILLISECOND).should.eql(DateTime.parse('2001-01-01T00:00:00.0'))
  })

  it('should rollover when you add past a boundary w/ timezone offsets', () => {
    let almostMidnight = DateTime.parse('2000-12-31T23:59:59.999+00:00')
    almostMidnight.add(1, DateTime.Unit.MONTH).should.eql(DateTime.parse('2001-01-31T23:59:59.999+00:00'))
    almostMidnight.add(1, DateTime.Unit.DAY).should.eql(DateTime.parse('2001-01-01T23:59:59.999+00:00'))
    almostMidnight.add(1, DateTime.Unit.HOUR).should.eql(DateTime.parse('2001-01-01T00:59:59.999+00:00'))
    almostMidnight.add(1, DateTime.Unit.MINUTE).should.eql(DateTime.parse('2001-01-01T00:00:59.999+00:00'))
    almostMidnight.add(1, DateTime.Unit.SECOND).should.eql(DateTime.parse('2001-01-01T00:00:00.999+00:00'))
    return almostMidnight.add(1, DateTime.Unit.MILLISECOND).should.eql(DateTime.parse('2001-01-01T00:00:00.0+00:00'))
  })

  it('should rollover when you subtract past a boundary', () => {
    let midnight = DateTime.parse('2001-01-01T00:00:00.0')
    midnight.add(-1, DateTime.Unit.MONTH).should.eql(DateTime.parse('2000-12-01T00:00:00.0'))
    midnight.add(-1, DateTime.Unit.DAY).should.eql(DateTime.parse('2000-12-31T00:00:00.0'))
    midnight.add(-1, DateTime.Unit.HOUR).should.eql(DateTime.parse('2000-12-31T23:00:00.0'))
    midnight.add(-1, DateTime.Unit.MINUTE).should.eql(DateTime.parse('2000-12-31T23:59:00.0'))
    midnight.add(-1, DateTime.Unit.SECOND).should.eql(DateTime.parse('2000-12-31T23:59:59.0'))
    return midnight.add(-1, DateTime.Unit.MILLISECOND).should.eql(DateTime.parse('2000-12-31T23:59:59.999'))
  })

  it('should rollover when you subtract past a boundary w/ timezone offsets', () => {
    let midnight = DateTime.parse('2001-01-01T00:00:00.0+00:00')
    midnight.add(-1, DateTime.Unit.MONTH).should.eql(DateTime.parse('2000-12-01T00:00:00.0+00:00'))
    midnight.add(-1, DateTime.Unit.DAY).should.eql(DateTime.parse('2000-12-31T00:00:00.0+00:00'))
    midnight.add(-1, DateTime.Unit.HOUR).should.eql(DateTime.parse('2000-12-31T23:00:00.0+00:00'))
    midnight.add(-1, DateTime.Unit.MINUTE).should.eql(DateTime.parse('2000-12-31T23:59:00.0+00:00'))
    midnight.add(-1, DateTime.Unit.SECOND).should.eql(DateTime.parse('2000-12-31T23:59:59.0+00:00'))
    return midnight.add(-1, DateTime.Unit.MILLISECOND).should.eql(DateTime.parse('2000-12-31T23:59:59.999+00:00'))
  })

  it('should still work for imprecise numbers, when adding to a defined field', () => {
    DateTime.parse('2000-06-15T10:20:40').add(30, DateTime.Unit.SECOND).should.eql(DateTime.parse('2000-06-15T10:21:10'))
    DateTime.parse('2000-06-15T10:20').add(50, DateTime.Unit.MINUTE).should.eql(DateTime.parse('2000-06-15T11:10'))
    DateTime.parse('2000-06-15T10').add(14, DateTime.Unit.HOUR).should.eql(DateTime.parse('2000-06-16T00'))
    DateTime.parse('2000-06-15').add(30, DateTime.Unit.DAY).should.eql(DateTime.parse('2000-07-15'))
    DateTime.parse('2000-06').add(8, DateTime.Unit.MONTH).should.eql(DateTime.parse('2001-02'))
    return DateTime.parse('2000').add(5, DateTime.Unit.YEAR).should.eql(DateTime.parse('2005'))
  })

  it('should not add anything on undefined fields', () => {
    DateTime.parse('2000-06-15T10:20:15').add(100, DateTime.Unit.MILLISECOND).should.eql(DateTime.parse('2000-06-15T10:20:15'))
    DateTime.parse('2000-06-15T10:20').add(100, DateTime.Unit.SECOND).should.eql(DateTime.parse('2000-06-15T10:20'))
    DateTime.parse('2000-06-15T10').add(100, DateTime.Unit.MINUTE).should.eql(DateTime.parse('2000-06-15T10'))
    DateTime.parse('2000-06-15').add(100, DateTime.Unit.HOUR).should.eql(DateTime.parse('2000-06-15'))
    DateTime.parse('2000-06').add(100, DateTime.Unit.DAY).should.eql(DateTime.parse('2000-06'))
    DateTime.parse('2000').add(100, DateTime.Unit.MONTH).should.eql(DateTime.parse('2000'))
    return DateTime.parse('2000').add(100, DateTime.Unit.MINUTE).should.eql(DateTime.parse('2000'))
  })

  it('should not mutate the original object', () => {
    let date1 = DateTime.parse('2000-06-15T10:20:30.0')
    let date2 = date1.add(6, DateTime.Unit.MONTH)
    date1.should.eql(DateTime.parse('2000-06-15T10:20:30.0'))
    return date2.should.eql(DateTime.parse('2000-12-15T10:20:30.0'))
  })

  return it('should return a different object (copy)', () => {
    let date1 = DateTime.parse('2000-06-15T10:20:30.0')
    let date2 = date1.add(0, DateTime.Unit.SECOND)
    date1.should.eql(date2)
    return date1.should.not.equal(date2)
  })
})

describe('DateTime.durationBetween', () => {
  it('should calculate time between two full specified dates', () => {
    let a = DateTime.parse('2009-06-15T12:37:45.0')
    let b = DateTime.parse('2009-06-15T12:37:45.0')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(0))

    a = DateTime.parse('2009-06-15T12:37:45.123')
    b = DateTime.parse('2009-06-15T12:37:45.456')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(333))

    a = DateTime.parse('2009-06-15T12:37:45.100')
    b = DateTime.parse('2009-06-15T12:37:52.499')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(7))
    a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(7399))

    a = DateTime.parse('2009-06-15T12:37:45.750')
    b = DateTime.parse('2009-06-15T12:56:17.875')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(19))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(1112))
    a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(1112125))

    a = DateTime.parse('2009-06-15T12:37:45.0')
    b = DateTime.parse('2009-06-15T14:56:50.500')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(2))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(139))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(8345))
    a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(8345500))

    a = DateTime.parse('2009-06-15T12:37:45.0')
    b = DateTime.parse('2009-06-20T17:56:50.500')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(5))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(125))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(7519))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(451145))
    a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(451145500))

    a = DateTime.parse('2009-06-15T12:37:45.0')
    b = DateTime.parse('2009-07-04T12:56:50.500')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(1))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(19))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(456))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(27379))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(1642745))
    a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(1642745500))

    a = DateTime.parse('2000-06-15T12:37:45.0')
    b = DateTime.parse('2009-07-04T12:56:50.500')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(9))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(109))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(3306))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(79344))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(4760659))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(285639545))
    a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(285639545500))

    a = DateTime.parse('2001-01-01T00:00:00.0')
    b = DateTime.parse('2001-12-31T23:59:59.999')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(11))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(364))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(8759))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(525599))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(31535999))
    return a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(31535999999))
  })

  it('should handle leap year', () => {
    let a = DateTime.parse('1999-02-01T00:00:00.00')
    let b = DateTime.parse('2000-02-01T00:00:00.00')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(1))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(12))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(365))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(8760))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(525600))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(31536000))
    a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(31536000000))

    a = DateTime.parse('2000-02-01T00:00:00.0')
    b = DateTime.parse('2001-02-01T00:00:00.0')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(1))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(12))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(366))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(8784))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(527040))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(31622400))
    return a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(31622400000))
  })

  it('should handle different timezones', () => {
    let a = DateTime.parse('2001-01-01T00:00:00.0+00:00')
    let b = DateTime.parse('2000-12-31T19:00:00.0-05:00')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(0))
    return a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(0))
  })

  // TODO: When a and b are different timezones, which do we use to count boundaries?
  // 1) a's timezone
  // 2) b's timezone
  // 3) default timezone (right now, the environment's timezone)
  // 4) UTC

  it('should handle imprecision', () => {
    let a = DateTime.parse('2009-06-15T12:37:45.250')
    let b = DateTime.parse('2009-06-15T12:37:45')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(-250, 749))

    a = DateTime.parse('2009-06-15T12:37:45.250')
    b = DateTime.parse('2009-06-15T12:37')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(-45, 14))
    a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(-45250, 14749))

    a = DateTime.parse('2009-06-15T12:37:45.250')
    b = DateTime.parse('2009-06-15T14')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(2))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(83, 142))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(4935, 8534))
    a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(4934750, 8534749))

    a = DateTime.parse('2000-06-15T12:37:45.250')
    b = DateTime.parse('2009')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(9))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(103, 114))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(3122, 3486))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(74916, 83675))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(4494923, 5020522))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(269695335, 301231334))
    a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(269695334750, 301231334749))

    a = DateTime.parse('2009-06-15T12:37:45')
    b = DateTime.parse('2009-06-15T12:37:45')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(0))
    return a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(-999, 999))
  })

  return it('should return negative values for going backwards', () => {
    let a = DateTime.parse('2009-07-04T12:56:50.150')
    let b = DateTime.parse('2000-06-15T12:37:45.350')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(-9))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(-109))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(-3306))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(-79344))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(-4760659))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(-285639545))
    a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(-285639544800))

    a = DateTime.parse('2009-06-15T12:37:45')
    b = DateTime.parse('2009-06-15T12:37:44.123')
    a.durationBetween(b, DateTime.Unit.YEAR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MONTH).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.DAY).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.HOUR).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.MINUTE).should.eql(new Uncertainty(0))
    a.durationBetween(b, DateTime.Unit.SECOND).should.eql(new Uncertainty(-1))
    return a.durationBetween(b, DateTime.Unit.MILLISECOND).should.eql(new Uncertainty(-1876, -877))
  })
})

describe('DateTime.before', () => {
  it('should accept cases where a is before b', () => {
    DateTime.parse('2000-12-31T23:59:59.998').before(DateTime.parse('2000-12-31T23:59:59.999')).should.be.true
    DateTime.parse('2000-12-31T23:59:58.999').before(DateTime.parse('2000-12-31T23:59:59.999')).should.be.true
    DateTime.parse('2000-12-31T23:58:59.999').before(DateTime.parse('2000-12-31T23:59:59.999')).should.be.true
    DateTime.parse('2000-12-31T22:59:59.999').before(DateTime.parse('2000-12-31T23:59:59.999')).should.be.true
    DateTime.parse('2000-12-30T23:59:59.999').before(DateTime.parse('2000-12-31T23:59:59.999')).should.be.true
    DateTime.parse('2000-11-31T23:59:59.999').before(DateTime.parse('2000-12-31T23:59:59.999')).should.be.true
    return DateTime.parse('1999-12-31T23:59:59.999').before(DateTime.parse('2000-12-31T23:59:59.999')).should.be.true
  })

  it('should reject cases where a is after b', () => {
    DateTime.parse('2000-01-01T00:00:00.001').before(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    DateTime.parse('2000-01-01T00:00:01.0').before(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    DateTime.parse('2000-01-01T00:01:00.0').before(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    DateTime.parse('2000-01-01T01:00:00.0').before(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    DateTime.parse('2000-01-02T00:00:00.0').before(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    DateTime.parse('2000-02-01T00:00:00.0').before(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    return DateTime.parse('2001-01-01T00:00:00.0').before(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
  })

  it('should reject cases where a is b', () => DateTime.parse('2000-01-01T00:00:00.0').before(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false)

  it('should work with different timezone offsets', () => {
    DateTime.parse('2000-01-01T12:00:00.0+01:00').before(DateTime.parse('2000-01-01T07:00:00.0-05:00')).should.be.true
    DateTime.parse('2000-01-01T12:00:00.0+01:00').before(DateTime.parse('2000-01-01T06:00:00.0-05:00')).should.be.false
    return DateTime.parse('2000-01-01T07:00:00.0-05:00').before(DateTime.parse('2000-01-01T12:00:00.0+01:00')).should.be.false
  })

  it('should use year precision when requested', () => {
    DateTime.parse('2000-01-01T00:00:00.0+00').before(DateTime.parse('2000-06-01T00:00:00.0+00')).should.be.true
    DateTime.parse('2000-01-01T00:00:00.0+00').before(DateTime.parse('2000-06-01T00:00:00.0+00'), DateTime.Unit.YEAR).should.be.false
    return DateTime.parse('1999-12-31T23:59:59.999+00').before(DateTime.parse('2000-06-01T00:00:00.0+00'), DateTime.Unit.YEAR).should.be.true
  })

  it('should use month precision when requested', () => {
    DateTime.parse('2000-02-01T00:00:00.0+00').before(DateTime.parse('2000-02-15T00:00:00.0+00')).should.be.true
    DateTime.parse('2000-02-01T00:00:00.0+00').before(DateTime.parse('2000-02-15T00:00:00.0+00'), DateTime.Unit.MONTH).should.be.false
    return DateTime.parse('2000-01-31T23:59:59.999+00').before(DateTime.parse('2000-02-15T00:00:00.0+00'), DateTime.Unit.MONTH).should.be.true
  })

  it('should use day precision when requested', () => {
    DateTime.parse('2000-02-15T00:00:00.0+00').before(DateTime.parse('2000-02-15T12:00:00.0+00')).should.be.true
    DateTime.parse('2000-02-15T00:00:00.0+00').before(DateTime.parse('2000-02-15T12:00:00.0+00'), DateTime.Unit.DAY).should.be.false
    return DateTime.parse('2000-02-14T23:59:59.999+00').before(DateTime.parse('2000-02-15T12:00:00.0+00'), DateTime.Unit.DAY).should.be.true
  })

  it('should use hour precision when requested', () => {
    DateTime.parse('2000-02-15T12:00:00.0+00').before(DateTime.parse('2000-02-15T12:30:00.0+00')).should.be.true
    DateTime.parse('2000-02-15T12:00:00.0+00').before(DateTime.parse('2000-02-15T12:30:00.0+00'), DateTime.Unit.HOUR).should.be.false
    return DateTime.parse('2000-02-15T11:59:59.999+00').before(DateTime.parse('2000-02-15T12:30:00.0+00'), DateTime.Unit.HOUR).should.be.true
  })

  it('should use minute precision when requested', () => {
    DateTime.parse('2000-02-15T12:30:00.0+00').before(DateTime.parse('2000-02-15T12:30:30.0+00')).should.be.true
    DateTime.parse('2000-02-15T12:30:00.0+00').before(DateTime.parse('2000-02-15T12:30:30.0+00'), DateTime.Unit.MINUTE).should.be.false
    return DateTime.parse('2000-02-15T12:29:59.999+00').before(DateTime.parse('2000-02-15T12:30:30.0+00'), DateTime.Unit.MINUTE).should.be.true
  })

  it('should use second precision when requested', () => {
    DateTime.parse('2000-02-15T12:30:30.0+00').before(DateTime.parse('2000-02-15T12:30:30.500+00')).should.be.true
    DateTime.parse('2000-02-15T12:30:30.0+00').before(DateTime.parse('2000-02-15T12:30:30.500+00'), DateTime.Unit.SECOND).should.be.false
    return DateTime.parse('2000-02-15T12:30:29.999+00').before(DateTime.parse('2000-02-15T12:30:30.500+00'), DateTime.Unit.SECOND).should.be.true
  })

  it('should use millisecond precision when requested', () => {
    DateTime.parse('2000-02-15T12:30:30.0+00').before(DateTime.parse('2000-02-15T12:30:30.500+00')).should.be.true
    return DateTime.parse('2000-02-15T12:30:30.0+00').before(DateTime.parse('2000-02-15T12:30:30.500+00'), DateTime.Unit.MILLISECOND).should.be.true
  })

  it('should return null in cases where a is b but there are unknown values', () => {
    expect(DateTime.parse('2000-01-01T00:00:00').before(DateTime.parse('2000-01-01T00:00:00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00').before(DateTime.parse('2000-01-01T00:00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00').before(DateTime.parse('2000-01-01T00'))).to.be.null
    expect(DateTime.parse('2000-01-01').before(DateTime.parse('2000-01-01'))).to.be.null
    expect(DateTime.parse('2000-01').before(DateTime.parse('2000-01'))).to.be.null
    return expect(DateTime.parse('2000').before(DateTime.parse('2000'))).to.be.null
  })

  it('should return null in cases where a has unknown values that prevent deterministic result', () => {
    expect(DateTime.parse('2000-01-01T00:00:00').before(DateTime.parse('2000-01-01T00:00:00.999'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00').before(DateTime.parse('2000-01-01T00:00:00.999'))).to.be.null
    expect(DateTime.parse('2000-01-01T00').before(DateTime.parse('2000-01-01T00:00:00.999'))).to.be.null
    expect(DateTime.parse('2000-01-01').before(DateTime.parse('2000-01-01T00:00:00.999'))).to.be.null
    expect(DateTime.parse('2000-01').before(DateTime.parse('2000-01-01T00:00:00.999'))).to.be.null
    return expect(DateTime.parse('2000').before(DateTime.parse('2000-01-01T00:00:00.999'))).to.be.null
  })

  it('should return null in cases where b has unknown values that prevent deterministic result', () => {
    expect(DateTime.parse('2000-01-01T00:00:00.001').before(DateTime.parse('2000-01-01T00:00:00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00:00.001').before(DateTime.parse('2000-01-01T00:00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00:00.001').before(DateTime.parse('2000-01-01T00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00:00.001').before(DateTime.parse('2000-01-01'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00:00.001').before(DateTime.parse('2000-01'))).to.be.null
    return expect(DateTime.parse('2000-01-01T00:00:00.001').before(DateTime.parse('2000'))).to.be.null
  })

  it('should accept cases where a has unknown values but is still deterministicly before b', () => {
    DateTime.parse('2000-01-01T00:00:00').before(DateTime.parse('2000-01-01T00:00:01.0')).should.be.true
    DateTime.parse('2000-01-01T00:00').before(DateTime.parse('2000-01-01T00:01:00.0')).should.be.true
    DateTime.parse('2000-01-01T00').before(DateTime.parse('2000-01-01T01:00:00.0')).should.be.true
    DateTime.parse('2000-01-01').before(DateTime.parse('2000-01-02T00:00:00.0')).should.be.true
    DateTime.parse('2000-01').before(DateTime.parse('2000-02-01T00:00:00.0')).should.be.true
    return DateTime.parse('2000').before(DateTime.parse('2001-01-01T00:00:00.0')).should.be.true
  })

  it('should accept cases where b has unknown values but a is still deterministicly before b', () => {
    DateTime.parse('2000-01-01T00:00:00.0').before(DateTime.parse('2000-01-01T00:00:01')).should.be.true
    DateTime.parse('2000-01-01T00:00:00.0').before(DateTime.parse('2000-01-01T00:01')).should.be.true
    DateTime.parse('2000-01-01T00:00:00.0').before(DateTime.parse('2000-01-01T01')).should.be.true
    DateTime.parse('2000-01-01T00:00:00.0').before(DateTime.parse('2000-01-02')).should.be.true
    DateTime.parse('2000-01-01T00:00:00.0').before(DateTime.parse('2000-02')).should.be.true
    return DateTime.parse('2000-01-01T00:00:00.0').before(DateTime.parse('2001')).should.be.true
  })

  it('should reject cases where a has unknown values but is still deterministicly after b', () => {
    DateTime.parse('2000-01-01T00:00:01').before(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    DateTime.parse('2000-01-01T00:01').before(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    DateTime.parse('2000-01-01T01').before(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    DateTime.parse('2000-01-02').before(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    DateTime.parse('2000-02').before(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    return DateTime.parse('2001').before(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
  })

  return it('should reject cases where b has unknown values but a is still deterministicly after b', () => {
    DateTime.parse('2000-01-01T00:01:00.0').before(DateTime.parse('2000-01-01T00:00:00')).should.be.false
    DateTime.parse('2000-01-01T00:01:00.0').before(DateTime.parse('2000-01-01T00:00')).should.be.false
    DateTime.parse('2000-01-01T01:00:00.0').before(DateTime.parse('2000-01-01T00')).should.be.false
    DateTime.parse('2000-01-02T00:00:00.0').before(DateTime.parse('2000-01-01')).should.be.false
    DateTime.parse('2000-02-01T00:00:00.0').before(DateTime.parse('2000-01')).should.be.false
    return DateTime.parse('2001-01-01T00:00:00.0').before(DateTime.parse('2000')).should.be.false
  })
})

describe('DateTime.sameOrBefore', () => {
  it('should accept cases where a is before b', () => {
    DateTime.parse('2000-12-31T23:59:59.998').sameOrBefore(DateTime.parse('2000-12-31T23:59:59.999')).should.be.true
    DateTime.parse('2000-12-31T23:59:58.999').sameOrBefore(DateTime.parse('2000-12-31T23:59:59.999')).should.be.true
    DateTime.parse('2000-12-31T23:58:59.999').sameOrBefore(DateTime.parse('2000-12-31T23:59:59.999')).should.be.true
    DateTime.parse('2000-12-31T22:59:59.999').sameOrBefore(DateTime.parse('2000-12-31T23:59:59.999')).should.be.true
    DateTime.parse('2000-12-30T23:59:59.999').sameOrBefore(DateTime.parse('2000-12-31T23:59:59.999')).should.be.true
    DateTime.parse('2000-11-31T23:59:59.999').sameOrBefore(DateTime.parse('2000-12-31T23:59:59.999')).should.be.true
    return DateTime.parse('1999-12-31T23:59:59.999').sameOrBefore(DateTime.parse('2000-12-31T23:59:59.999')).should.be.true
  })

  it('should reject cases where a is after b', () => {
    DateTime.parse('2000-01-01T00:00:00.001').sameOrBefore(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    DateTime.parse('2000-01-01T00:00:01.0').sameOrBefore(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    DateTime.parse('2000-01-01T00:01:00.0').sameOrBefore(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    DateTime.parse('2000-01-01T01:00:00.0').sameOrBefore(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    DateTime.parse('2000-01-02T00:00:00.0').sameOrBefore(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    DateTime.parse('2000-02-01T00:00:00.0').sameOrBefore(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
    return DateTime.parse('2001-01-01T00:00:00.0').sameOrBefore(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false
  })

  it('should accept cases where a is b', () => DateTime.parse('2000-01-01T00:00:00.0').sameOrBefore(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true)

  it('should work with different timezone offsets', () => {
    DateTime.parse('2000-01-01T12:00:00.0+01:00').sameOrBefore(DateTime.parse('2000-01-01T07:00:00.0-05:00')).should.be.true
    DateTime.parse('2000-01-01T12:00:00.0+01:00').sameOrBefore(DateTime.parse('2000-01-01T06:00:00.0-05:00')).should.be.true
    return DateTime.parse('2000-01-01T07:00:00.0-05:00').sameOrBefore(DateTime.parse('2000-01-01T12:00:00.0+01:00')).should.be.false
  })

  it('should use year precision when requested', () => {
    DateTime.parse('2000-06-01T00:00:00.0+00').sameOrBefore(DateTime.parse('2000-01-01T00:00:00.0+00')).should.be.false
    DateTime.parse('2000-06-01T00:00:00.0+00').sameOrBefore(DateTime.parse('2000-01-01T00:00:00.0+00'), DateTime.Unit.YEAR).should.be.true
    return DateTime.parse('2000-06-01T00:00:00.0+00').sameOrBefore(DateTime.parse('1999-12-31T23:59:59.999+00'), DateTime.Unit.YEAR).should.be.false
  })

  it('should use month precision when requested', () => {
    DateTime.parse('2000-02-15T00:00:00.0+00').sameOrBefore(DateTime.parse('2000-02-01T00:00:00.0+00')).should.be.false
    DateTime.parse('2000-02-15T00:00:00.0+00').sameOrBefore(DateTime.parse('2000-02-01T00:00:00.0+00'), DateTime.Unit.MONTH).should.be.true
    return DateTime.parse('2000-02-15T00:00:00.0+00').sameOrBefore(DateTime.parse('2000-01-31T23:59:59.999+00'), DateTime.Unit.MONTH).should.be.false
  })

  it('should use day precision when requested', () => {
    DateTime.parse('2000-02-15T12:00:00.0+00').sameOrBefore(DateTime.parse('2000-02-15T00:00:00.0+00')).should.be.false
    DateTime.parse('2000-02-15T12:00:00.0+00').sameOrBefore(DateTime.parse('2000-02-15T00:00:00.0+00'), DateTime.Unit.DAY).should.be.true
    return DateTime.parse('2000-02-15T12:00:00.0+00').sameOrBefore(DateTime.parse('2000-02-14T23:59:59.999+00'), DateTime.Unit.DAY).should.be.false
  })

  it('should use hour precision when requested', () => {
    DateTime.parse('2000-02-15T12:30:00.0+00').sameOrBefore(DateTime.parse('2000-02-15T12:00:00.0+00')).should.be.false
    DateTime.parse('2000-02-15T12:30:00.0+00').sameOrBefore(DateTime.parse('2000-02-15T12:00:00.0+00'), DateTime.Unit.HOUR).should.be.true
    return DateTime.parse('2000-02-15T12:30:00.0+00').sameOrBefore(DateTime.parse('2000-02-15T11:59:59.999+00'), DateTime.Unit.HOUR).should.be.false
  })

  it('should use minute precision when requested', () => {
    DateTime.parse('2000-02-15T12:30:30.0+00').sameOrBefore(DateTime.parse('2000-02-15T12:30:00.0+00')).should.be.false
    DateTime.parse('2000-02-15T12:30:30.0+00').sameOrBefore(DateTime.parse('2000-02-15T12:30:00.0+00'), DateTime.Unit.MINUTE).should.be.true
    return DateTime.parse('2000-02-15T12:30:30.0+00').sameOrBefore(DateTime.parse('2000-02-15T12:29:59.999+00'), DateTime.Unit.MINUTE).should.be.false
  })

  it('should use second precision when requested', () => {
    DateTime.parse('2000-02-15T12:30:30.500+00').sameOrBefore(DateTime.parse('2000-02-15T12:30:30.0+00')).should.be.false
    DateTime.parse('2000-02-15T12:30:30.500+00').sameOrBefore(DateTime.parse('2000-02-15T12:30:30.0+00'), DateTime.Unit.SECOND).should.be.true
    return DateTime.parse('2000-02-15T12:30:30.500+00').sameOrBefore(DateTime.parse('2000-02-15T12:30:29.999+00'), DateTime.Unit.SECOND).should.be.false
  })

  it('should use millisecond precision when requested', () => {
    DateTime.parse('2000-02-15T12:30:30.500+00').sameOrBefore(DateTime.parse('2000-02-15T12:30:30.0+00')).should.be.false
    DateTime.parse('2000-02-15T12:30:30.500+00').sameOrBefore(DateTime.parse('2000-02-15T12:30:30.0+00'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-02-15T12:30:30.0+00').sameOrBefore(DateTime.parse('2000-02-15T12:30:30.500+00'), DateTime.Unit.MILLISECOND).should.be.true
    return DateTime.parse('2000-02-15T12:30:30.0+00').sameOrBefore(DateTime.parse('2000-02-15T12:30:30.0+00'), DateTime.Unit.MILLISECOND).should.be.true
  })

  it('should return null in cases where a is b but there are unknown values in a and b', () => {
    expect(DateTime.parse('2000-01-01T00:00:00').sameOrBefore(DateTime.parse('2000-01-01T00:00:00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00').sameOrBefore(DateTime.parse('2000-01-01T00:00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00').sameOrBefore(DateTime.parse('2000-01-01T00'))).to.be.null
    expect(DateTime.parse('2000-01-01').sameOrBefore(DateTime.parse('2000-01-01'))).to.be.null
    expect(DateTime.parse('2000-01').sameOrBefore(DateTime.parse('2000-01'))).to.be.null
    return expect(DateTime.parse('2000').sameOrBefore(DateTime.parse('2000'))).to.be.null
  })

  it('should return null in cases where a has unknown values that prevent deterministic result', () => {
    expect(DateTime.parse('2000-01-01T00:00:00').sameOrBefore(DateTime.parse('2000-01-01T00:00:00.998'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00').sameOrBefore(DateTime.parse('2000-01-01T00:00:59.998'))).to.be.null
    expect(DateTime.parse('2000-01-01T00').sameOrBefore(DateTime.parse('2000-01-01T00:59:59.998'))).to.be.null
    expect(DateTime.parse('2000-01-01').sameOrBefore(DateTime.parse('2000-01-01T23:59:59.998'))).to.be.null
    expect(DateTime.parse('2000-01').sameOrBefore(DateTime.parse('2000-01-31T23:59:59.998'))).to.be.null
    return expect(DateTime.parse('2000').sameOrBefore(DateTime.parse('2000-12-31T23:59:59.998'))).to.be.null
  })

  it('should return null in cases where b has unknown values that prevent deterministic result', () => {
    expect(DateTime.parse('2000-01-01T00:00:00.001').sameOrBefore(DateTime.parse('2000-01-01T00:00:00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00:00.001').sameOrBefore(DateTime.parse('2000-01-01T00:00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00:00.001').sameOrBefore(DateTime.parse('2000-01-01T00'))).to.null
    expect(DateTime.parse('2000-01-01T00:00:00.001').sameOrBefore(DateTime.parse('2000-01-01'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00:00.001').sameOrBefore(DateTime.parse('2000-01'))).to.be.null
    return expect(DateTime.parse('2000-01-01T00:00:00.001').sameOrBefore(DateTime.parse('2000'))).to.be.null
  })

  it('should accept cases where a has unknown values but is still deterministicly before b', () => {
    DateTime.parse('2000-01-01T00:00:00').sameOrBefore(DateTime.parse('2000-01-01T00:00:01.0')).should.be.true
    DateTime.parse('2000-01-01T00:00').sameOrBefore(DateTime.parse('2000-01-01T00:01:00.0')).should.be.true
    DateTime.parse('2000-01-01T00').sameOrBefore(DateTime.parse('2000-01-01T01:00:00.0')).should.be.true
    DateTime.parse('2000-01-01').sameOrBefore(DateTime.parse('2000-01-02T00:00:00.0')).should.be.true
    DateTime.parse('2000-01').sameOrBefore(DateTime.parse('2000-02-01T00:00:00.0')).should.be.true
    return DateTime.parse('2000').sameOrBefore(DateTime.parse('2001-01-01T00:00:00.0')).should.be.true
  })

  it('should accept cases where a has unknown values but is still deterministicly before or same as b', () => {
    DateTime.parse('2000-01-01T00:00:00').sameOrBefore(DateTime.parse('2000-01-01T00:00:00.999')).should.be.true
    DateTime.parse('2000-01-01T00:00').sameOrBefore(DateTime.parse('2000-01-01T00:00:59.999')).should.be.true
    DateTime.parse('2000-01-01T00').sameOrBefore(DateTime.parse('2000-01-01T00:59:59.999')).should.be.true
    DateTime.parse('2000-01-01').sameOrBefore(DateTime.parse('2000-01-01T23:59:59.999')).should.be.true
    DateTime.parse('2000-01').sameOrBefore(DateTime.parse('2000-01-31T23:59:59.999')).should.be.true
    return DateTime.parse('2000').sameOrBefore(DateTime.parse('2001-12-31T23:59:59.999')).should.be.true
  })

  it('should accept cases where b has unknown values but a is still deterministicly before b', () => {
    DateTime.parse('2000-01-01T00:00:00.999').sameOrBefore(DateTime.parse('2000-01-01T00:00:01')).should.be.true
    DateTime.parse('2000-01-01T00:00:59.999').sameOrBefore(DateTime.parse('2000-01-01T00:01')).should.be.true
    DateTime.parse('2000-01-01T00:59:59.999').sameOrBefore(DateTime.parse('2000-01-01T01')).should.be.true
    DateTime.parse('2000-01-01T23:59:59.999').sameOrBefore(DateTime.parse('2000-01-02')).should.be.true
    DateTime.parse('2000-01-31T23:59:59.999').sameOrBefore(DateTime.parse('2000-02')).should.be.true
    return DateTime.parse('2000-12-31T23:59:59.999').sameOrBefore(DateTime.parse('2001')).should.be.true
  })

  it('should accept cases where b has unknown values but a is still deterministicly before or same as b', () => {
    DateTime.parse('2000-01-01T00:00:00.0').sameOrBefore(DateTime.parse('2000-01-01T00:00:00')).should.be.true
    DateTime.parse('2000-01-01T00:00:00.0').sameOrBefore(DateTime.parse('2000-01-01T00:00')).should.be.true
    DateTime.parse('2000-01-01T00:00:00.0').sameOrBefore(DateTime.parse('2000-01-01T00')).should.be.true
    DateTime.parse('2000-01-01T00:00:00.0').sameOrBefore(DateTime.parse('2000-01-01')).should.be.true
    DateTime.parse('2000-01-01T00:00:00.0').sameOrBefore(DateTime.parse('2000-01')).should.be.true
    return DateTime.parse('2000-01-01T00:00:00.0').sameOrBefore(DateTime.parse('2000')).should.be.true
  })

  it('should reject cases where a has unknown values but is still deterministicly after b', () => {
    DateTime.parse('2000-01-01T00:00:01').sameOrBefore(DateTime.parse('2000-01-01T00:00:00.999')).should.be.false
    DateTime.parse('2000-01-01T00:01').sameOrBefore(DateTime.parse('2000-01-01T00:00:59.999')).should.be.false
    DateTime.parse('2000-01-01T01').sameOrBefore(DateTime.parse('2000-01-01T00:59:59.999')).should.be.false
    DateTime.parse('2000-01-02').sameOrBefore(DateTime.parse('2000-01-01T23:59:59.999')).should.be.false
    DateTime.parse('2000-02').sameOrBefore(DateTime.parse('2000-01-31T23:59:59.999')).should.be.false
    return DateTime.parse('2001').sameOrBefore(DateTime.parse('2000-12-31T23:59:59.999')).should.be.false
  })

  return it('should reject cases where b has unknown values but a is still deterministicly after b', () => {
    DateTime.parse('2000-01-01T00:00:01').sameOrBefore(DateTime.parse('2000-01-01T00:00:00')).should.be.false
    DateTime.parse('2000-01-01T00:01:00').sameOrBefore(DateTime.parse('2000-01-01T00:00')).should.be.false
    DateTime.parse('2000-01-01T01:00:00').sameOrBefore(DateTime.parse('2000-01-01T00')).should.be.false
    DateTime.parse('2000-01-02T00:00:00').sameOrBefore(DateTime.parse('2000-01-01')).should.be.false
    DateTime.parse('2000-02-01T00:00:00').sameOrBefore(DateTime.parse('2000-01')).should.be.false
    return DateTime.parse('2001-01-01T00:00:00').sameOrBefore(DateTime.parse('2000')).should.be.false
  })
})

describe('DateTime.after', () => {
  it('should accept cases where a is after b', () => {
    DateTime.parse('2000-01-01T00:00:00.001').after(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    DateTime.parse('2000-01-01T00:00:01.0').after(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    DateTime.parse('2000-01-01T00:01:00.0').after(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    DateTime.parse('2000-01-01T01:00:00.0').after(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    DateTime.parse('2000-01-02T00:00:00.0').after(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    DateTime.parse('2000-02-01T00:00:00.0').after(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    return DateTime.parse('2001-01-01T00:00:00.0').after(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
  })

  it('should reject cases where a is before b', () => {
    DateTime.parse('2000-12-31T23:59:59.998').after(DateTime.parse('2000-12-31T23:59:59.999')).should.be.false
    DateTime.parse('2000-12-31T23:59:58.999').after(DateTime.parse('2000-12-31T23:59:59.999')).should.be.false
    DateTime.parse('2000-12-31T23:58:59.999').after(DateTime.parse('2000-12-31T23:59:59.999')).should.be.false
    DateTime.parse('2000-12-31T22:59:59.999').after(DateTime.parse('2000-12-31T23:59:59.999')).should.be.false
    DateTime.parse('2000-12-30T23:59:59.999').after(DateTime.parse('2000-12-31T23:59:59.999')).should.be.false
    DateTime.parse('2000-11-31T23:59:59.999').after(DateTime.parse('2000-12-31T23:59:59.999')).should.be.false
    return DateTime.parse('1999-12-31T23:59:59.999').after(DateTime.parse('2000-12-31T23:59:59.999')).should.be.false
  })

  it('should reject cases where a is b', () => DateTime.parse('2000-01-01T00:00:00.0').after(DateTime.parse('2000-01-01T00:00:00.0')).should.be.false)
  it('should work with different timezone offsets', () => {
    DateTime.parse('2000-01-01T07:00:00.0-05:00').after(DateTime.parse('2000-01-01T12:00:00.0+01:00')).should.be.true
    DateTime.parse('2000-01-01T12:00:00.0+01:00').after(DateTime.parse('2000-01-01T06:00:00.0-05:00')).should.be.false
    return DateTime.parse('2000-01-01T12:00:00.0+01:00').after(DateTime.parse('2000-01-01T07:00:00.0-05:00')).should.be.false
  })

  it('should use year precision when requested', () => {
    DateTime.parse('2000-06-01T00:00:00.0+00').after(DateTime.parse('2000-01-01T00:00:00.0+00')).should.be.true
    DateTime.parse('2000-06-01T00:00:00.0+00').after(DateTime.parse('2000-01-01T00:00:00.0+00'), DateTime.Unit.YEAR).should.be.false
    return DateTime.parse('2000-06-01T00:00:00.0+00').after(DateTime.parse('1999-12-31T23:59:59.999+00'), DateTime.Unit.YEAR).should.be.true
  })

  it('should use month precision when requested', () => {
    DateTime.parse('2000-02-15T00:00:00.0+00').after(DateTime.parse('2000-02-01T00:00:00.0+00')).should.be.true
    DateTime.parse('2000-02-15T00:00:00.0+00').after(DateTime.parse('2000-02-01T00:00:00.0+00'), DateTime.Unit.MONTH).should.be.false
    return DateTime.parse('2000-02-15T00:00:00.0+00').after(DateTime.parse('2000-01-31T23:59:59.999+00'), DateTime.Unit.MONTH).should.be.true
  })

  it('should use day precision when requested', () => {
    DateTime.parse('2000-02-15T12:00:00.0+00').after(DateTime.parse('2000-02-15T00:00:00.0+00')).should.be.true
    DateTime.parse('2000-02-15T12:00:00.0+00').after(DateTime.parse('2000-02-15T00:00:00.0+00'), DateTime.Unit.DAY).should.be.false
    return DateTime.parse('2000-02-15T12:00:00.0+00').after(DateTime.parse('2000-02-14T23:59:59.999+00'), DateTime.Unit.DAY).should.be.true
  })

  it('should use hour precision when requested', () => {
    DateTime.parse('2000-02-15T12:30:00.0+00').after(DateTime.parse('2000-02-15T12:00:00.0+00')).should.be.true
    DateTime.parse('2000-02-15T12:30:00.0+00').after(DateTime.parse('2000-02-15T12:00:00.0+00'), DateTime.Unit.HOUR).should.be.false
    return DateTime.parse('2000-02-15T12:30:00.0+00').after(DateTime.parse('2000-02-15T11:59:59.999+00'), DateTime.Unit.HOUR).should.be.true
  })

  it('should use minute precision when requested', () => {
    DateTime.parse('2000-02-15T12:30:30.0+00').after(DateTime.parse('2000-02-15T12:30:00.0+00')).should.be.true
    DateTime.parse('2000-02-15T12:30:30.0+00').after(DateTime.parse('2000-02-15T12:30:00.0+00'), DateTime.Unit.MINUTE).should.be.false
    return DateTime.parse('2000-02-15T12:30:30.0+00').after(DateTime.parse('2000-02-15T12:29:59.999+00'), DateTime.Unit.MINUTE).should.be.true
  })

  it('should use second precision when requested', () => {
    DateTime.parse('2000-02-15T12:30:30.500+00').after(DateTime.parse('2000-02-15T12:30:30.0+00')).should.be.true
    DateTime.parse('2000-02-15T12:30:30.500+00').after(DateTime.parse('2000-02-15T12:30:30.0+00'), DateTime.Unit.SECOND).should.be.false
    return DateTime.parse('2000-02-15T12:30:30.500+00').after(DateTime.parse('2000-02-15T12:30:29.999+00'), DateTime.Unit.SECOND).should.be.true
  })

  it('should use millisecond precision when requested', () => {
    DateTime.parse('2000-02-15T12:30:30.500+00').after(DateTime.parse('2000-02-15T12:30:30.0+00')).should.be.true
    return DateTime.parse('2000-02-15T12:30:30.500+00').after(DateTime.parse('2000-02-15T12:30:30.0+00'), DateTime.Unit.MILLISECOND).should.be.true
  })

  it('should return null in cases where a is b but there are unknown values', () => {
    expect(DateTime.parse('2000-01-01T00:00:00').after(DateTime.parse('2000-01-01T00:00:00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00').after(DateTime.parse('2000-01-01T00:00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00').after(DateTime.parse('2000-01-01T00'))).to.be.null
    expect(DateTime.parse('2000-01-01').after(DateTime.parse('2000-01-01'))).to.be.null
    expect(DateTime.parse('2000-01').after(DateTime.parse('2000-01'))).to.be.null
    return expect(DateTime.parse('2000').after(DateTime.parse('2000'))).to.be.null
  })

  it('should return null in cases where a has unknown values that prevent deterministic result', () => {
    expect(DateTime.parse('2000-01-01T00:00:00').after(DateTime.parse('2000-01-01T00:00:00.0'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00').after(DateTime.parse('2000-01-01T00:00:00.0'))).to.be.null
    expect(DateTime.parse('2000-01-01T00').after(DateTime.parse('2000-01-01T00:00:00.0'))).to.be.null
    expect(DateTime.parse('2000-01-01').after(DateTime.parse('2000-01-01T00:00:00.0'))).to.be.null
    expect(DateTime.parse('2000-01').after(DateTime.parse('2000-01-01T00:00:00.0'))).to.be.null
    return expect(DateTime.parse('2000').after(DateTime.parse('2000-01-01T00:00:00.0'))).to.be.null
  })

  it('should return null in cases where b has unknown values that prevent deterministic result', () => {
    expect(DateTime.parse('2000-01-01T00:00:00.001').after(DateTime.parse('2000-01-01T00:00:00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00:00.001').after(DateTime.parse('2000-01-01T00:00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00:00.001').after(DateTime.parse('2000-01-01T00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00:00.001').after(DateTime.parse('2000-01-01'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00:00.001').after(DateTime.parse('2000-01'))).to.be.null
    return expect(DateTime.parse('2000-01-01T00:00:00.001').after(DateTime.parse('2000'))).to.be.null
  })

  it('should accept cases where a has unknown values but is still deterministicly after b', () => {
    DateTime.parse('2000-01-01T00:00:01').after(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    DateTime.parse('2000-01-01T00:01').after(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    DateTime.parse('2000-01-01T01').after(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    DateTime.parse('2000-01-02').after(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    DateTime.parse('2000-02').after(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    return DateTime.parse('2001').after(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
  })

  it('should accept cases where b has unknown values but a is still deterministicly after b', () => {
    DateTime.parse('2000-01-01T00:00:01.0').after(DateTime.parse('2000-01-01T00:00:00')).should.be.true
    DateTime.parse('2000-01-01T00:01:00.0').after(DateTime.parse('2000-01-01T00:00')).should.be.true
    DateTime.parse('2000-01-01T01:00:00.0').after(DateTime.parse('2000-01-01T00')).should.be.true
    DateTime.parse('2000-01-02T00:00:00.0').after(DateTime.parse('2000-01-01')).should.be.true
    DateTime.parse('2000-02-01T00:00:00.0').after(DateTime.parse('2000-01')).should.be.true
    return DateTime.parse('2001-01-01T00:00:00.0').after(DateTime.parse('2000')).should.be.true
  })

  it('should reject cases where a has unknown values but is still deterministicly before b', () => {
    DateTime.parse('2000-01-01T00:00:00').after(DateTime.parse('2000-01-01T00:00:01.0')).should.be.false
    DateTime.parse('2000-01-01T00:00').after(DateTime.parse('2000-01-01T00:01:00.0')).should.be.false
    DateTime.parse('2000-01-01T00').after(DateTime.parse('2000-01-01T01:00:00.0')).should.be.false
    DateTime.parse('2000-01-01').after(DateTime.parse('2000-01-02T00:00:00.0')).should.be.false
    DateTime.parse('2000-01').after(DateTime.parse('2000-02-01T00:00:00.0')).should.be.false
    return DateTime.parse('2000').after(DateTime.parse('2001-01-01T00:00:00.0')).should.be.false
  })

  return it('should reject cases where b has unknown values but a is still deterministicly before b', () => {
    DateTime.parse('2000-01-01T00:00:00.0').after(DateTime.parse('2000-01-01T00:00:01')).should.be.false
    DateTime.parse('2000-01-01T00:00:00.0').after(DateTime.parse('2000-01-01T00:01')).should.be.false
    DateTime.parse('2000-01-01T00:00:00.0').after(DateTime.parse('2000-01-01T01')).should.be.false
    DateTime.parse('2000-01-01T00:00:00.0').after(DateTime.parse('2000-01-02')).should.be.false
    DateTime.parse('2000-01-01T00:00:00.0').after(DateTime.parse('2000-02')).should.be.false
    return DateTime.parse('2000-01-01T00:00:00.0').after(DateTime.parse('2001')).should.be.false
  })
})
