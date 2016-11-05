/* global describe it */
import DateTime from '../../src/datatypes/DateTime'
import chai from 'chai'
chai.should()
let expect = chai.expect

describe('DateTime.sameAs', () => {
  it('should always accept cases where a is same as b', () => {
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45.123')).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MILLISECOND).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.SECOND).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MINUTE).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MONTH).should.be.true
    return DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.YEAR).should.be.true
  })

  it('should properly calculate cases where the millisecond is different', () => {
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45.124')).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45.124'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45.124'), DateTime.Unit.SECOND).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45.124'), DateTime.Unit.MINUTE).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45.124'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45.124'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45.124'), DateTime.Unit.MONTH).should.be.true
    return DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45.124'), DateTime.Unit.YEAR).should.be.true
  })

  it('should properly calculate cases where the second is different', () => {
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:46.123')).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:46.123'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:46.123'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:46.123'), DateTime.Unit.MINUTE).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:46.123'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:46.123'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:46.123'), DateTime.Unit.MONTH).should.be.true
    return DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:46.123'), DateTime.Unit.YEAR).should.be.true
  })

  it('should properly calculate cases where the minute is different', () => {
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:36:45.123')).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:36:45.123'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:36:45.123'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:36:45.123'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:36:45.123'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:36:45.123'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:36:45.123'), DateTime.Unit.MONTH).should.be.true
    return DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:36:45.123'), DateTime.Unit.YEAR).should.be.true
  })

  it('should properly calculate cases where the hour is different', () => {
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T13:35:45.123')).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T13:35:45.123'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T13:35:45.123'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T13:35:45.123'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T13:35:45.123'), DateTime.Unit.HOUR).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T13:35:45.123'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T13:35:45.123'), DateTime.Unit.MONTH).should.be.true
    return DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T13:35:45.123'), DateTime.Unit.YEAR).should.be.true
  })

  it('should properly calculate cases where the day is different', () => {
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-16T12:35:45.123')).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-16T12:35:45.123'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-16T12:35:45.123'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-16T12:35:45.123'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-16T12:35:45.123'), DateTime.Unit.HOUR).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-16T12:35:45.123'), DateTime.Unit.DAY).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-16T12:35:45.123'), DateTime.Unit.MONTH).should.be.true
    return DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-16T12:35:45.123'), DateTime.Unit.YEAR).should.be.true
  })

  it('should properly calculate cases where the month is different', () => {
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-06-15T12:35:45.123')).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-06-15T12:35:45.123'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-06-15T12:35:45.123'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-06-15T12:35:45.123'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-06-15T12:35:45.123'), DateTime.Unit.HOUR).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-06-15T12:35:45.123'), DateTime.Unit.DAY).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-06-15T12:35:45.123'), DateTime.Unit.MONTH).should.be.false
    return DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-06-15T12:35:45.123'), DateTime.Unit.YEAR).should.be.true
  })

  it('should properly calculate cases where the year is different', () => {
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2001-05-15T12:35:45.123')).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2001-05-15T12:35:45.123'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2001-05-15T12:35:45.123'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2001-05-15T12:35:45.123'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2001-05-15T12:35:45.123'), DateTime.Unit.HOUR).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2001-05-15T12:35:45.123'), DateTime.Unit.DAY).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2001-05-15T12:35:45.123'), DateTime.Unit.MONTH).should.be.false
    return DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2001-05-15T12:35:45.123'), DateTime.Unit.YEAR).should.be.false
  })

  it('should handle different time zones', () => {
    DateTime.parse('2000-12-31T19:35:45.123+00:00').sameAs(DateTime.parse('2001-01-01T00:05:45.123+04:30')).should.be.true
    DateTime.parse('2000-12-31T19:35:45.123+00:00').sameAs(DateTime.parse('2001-01-01T00:05:45.123+04:30'), DateTime.Unit.MILLISECOND).should.be.true
    DateTime.parse('2000-12-31T19:35:45.123+00:00').sameAs(DateTime.parse('2001-01-01T00:05:45.123+04:30'), DateTime.Unit.SECOND).should.be.true
    DateTime.parse('2000-12-31T19:35:45.123+00:00').sameAs(DateTime.parse('2001-01-01T00:05:45.123+04:30'), DateTime.Unit.MINUTE).should.be.true
    DateTime.parse('2000-12-31T19:35:45.123+00:00').sameAs(DateTime.parse('2001-01-01T00:05:45.123+04:30'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-12-31T19:35:45.123+00:00').sameAs(DateTime.parse('2001-01-01T00:05:45.123+04:30'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-12-31T19:35:45.123+00:00').sameAs(DateTime.parse('2001-01-01T00:05:45.123+04:30'), DateTime.Unit.MONTH).should.be.true
    return DateTime.parse('2000-12-31T19:35:45.123+00:00').sameAs(DateTime.parse('2001-01-01T00:05:45.123+04:30'), DateTime.Unit.YEAR).should.be.true
  })

  it('should handle imprecision correctly with missing milliseconds', () => {
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45'))).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45'), DateTime.Unit.MILLISECOND)).to.be.null
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45'), DateTime.Unit.SECOND).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45'), DateTime.Unit.MINUTE).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:45'), DateTime.Unit.YEAR).should.be.true
    expect(DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:45.123'))).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MILLISECOND)).to.be.null
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.SECOND).should.be.true
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MINUTE).should.be.true
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.YEAR).should.be.true
    expect(DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:45'))).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:45'), DateTime.Unit.MILLISECOND)).to.be.null
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:45'), DateTime.Unit.SECOND).should.be.true
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:45'), DateTime.Unit.MINUTE).should.be.true
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:45'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:45'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:45'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:45'), DateTime.Unit.YEAR).should.be.true

    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:46')).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:46'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:46'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:46'), DateTime.Unit.MINUTE).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:46'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:46'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:46'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35:46'), DateTime.Unit.YEAR).should.be.true
    DateTime.parse('2000-05-15T12:35:46').sameAs(DateTime.parse('2000-05-15T12:35:45.123')).should.be.false
    DateTime.parse('2000-05-15T12:35:46').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:46').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:46').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MINUTE).should.be.true
    DateTime.parse('2000-05-15T12:35:46').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:35:46').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35:46').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T12:35:46').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.YEAR).should.be.true
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:46')).should.be.false
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:46'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:46'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:46'), DateTime.Unit.MINUTE).should.be.true
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:46'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:46'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:46'), DateTime.Unit.MONTH).should.be.true
    return DateTime.parse('2000-05-15T12:35:45').sameAs(DateTime.parse('2000-05-15T12:35:46'), DateTime.Unit.YEAR).should.be.true
  })

  it('should handle imprecision correctly with missing seconds', () => {
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35'))).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35'), DateTime.Unit.MILLISECOND)).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35'), DateTime.Unit.SECOND)).to.be.null
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35'), DateTime.Unit.MINUTE).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:35'), DateTime.Unit.YEAR).should.be.true
    expect(DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:35:45.123'))).to.be.null
    expect(DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MILLISECOND)).to.be.null
    expect(DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.SECOND)).to.be.null
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MINUTE).should.be.true
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.YEAR).should.be.true
    expect(DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:35'))).to.be.null
    expect(DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:35'), DateTime.Unit.MILLISECOND)).to.be.null
    expect(DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:35'), DateTime.Unit.SECOND)).to.be.null
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:35'), DateTime.Unit.MINUTE).should.be.true
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:35'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:35'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:35'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:35'), DateTime.Unit.YEAR).should.be.true

    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:36')).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:36'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:36'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:36'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:36'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:36'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:36'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12:36'), DateTime.Unit.YEAR).should.be.true
    DateTime.parse('2000-05-15T12:36').sameAs(DateTime.parse('2000-05-15T12:35:45.123')).should.be.false
    DateTime.parse('2000-05-15T12:36').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:36').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12:36').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05-15T12:36').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:36').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:36').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T12:36').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.YEAR).should.be.true
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:36')).should.be.false
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:36'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:36'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:36'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:36'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:36'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:36'), DateTime.Unit.MONTH).should.be.true
    return DateTime.parse('2000-05-15T12:35').sameAs(DateTime.parse('2000-05-15T12:36'), DateTime.Unit.YEAR).should.be.true
  })

  it('should handle imprecision correctly with missing minutes', () => {
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12'))).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12'), DateTime.Unit.MILLISECOND)).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12'), DateTime.Unit.SECOND)).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12'), DateTime.Unit.MINUTE)).to.be.null
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T12'), DateTime.Unit.YEAR).should.be.true
    expect(DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T12:35:45.123'))).to.be.null
    expect(DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MILLISECOND)).to.be.null
    expect(DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.SECOND)).to.be.null
    expect(DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MINUTE)).to.be.null
    DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.YEAR).should.be.true
    expect(DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T12'))).to.be.null
    expect(DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T12'), DateTime.Unit.MILLISECOND)).to.be.null
    expect(DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T12'), DateTime.Unit.SECOND)).to.be.null
    expect(DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T12'), DateTime.Unit.MINUTE)).to.be.null
    DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T12'), DateTime.Unit.HOUR).should.be.true
    DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T12'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T12'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T12'), DateTime.Unit.YEAR).should.be.true

    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T13')).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T13'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T13'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T13'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T13'), DateTime.Unit.HOUR).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T13'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T13'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15T13'), DateTime.Unit.YEAR).should.be.true
    DateTime.parse('2000-05-15T13').sameAs(DateTime.parse('2000-05-15T12:35:45.123')).should.be.false
    DateTime.parse('2000-05-15T13').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T13').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T13').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05-15T13').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.HOUR).should.be.false
    DateTime.parse('2000-05-15T13').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T13').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T13').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.YEAR).should.be.true
    DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T13')).should.be.false
    DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T13'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T13'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T13'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T13'), DateTime.Unit.HOUR).should.be.false
    DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T13'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T13'), DateTime.Unit.MONTH).should.be.true
    return DateTime.parse('2000-05-15T12').sameAs(DateTime.parse('2000-05-15T13'), DateTime.Unit.YEAR).should.be.true
  })

  it('should handle imprecision correctly with missing hours', () => {
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15'))).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15')), DateTime.Unit.MILLISECOND).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15')), DateTime.Unit.SECOND).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15')), DateTime.Unit.MINUTE).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15')), DateTime.Unit.HOUR).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15')), DateTime.Unit.DAY).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15')), DateTime.Unit.MONTH).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-15')), DateTime.Unit.YEAR).to.be.null
    expect(DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-15T12:35:45.123'))).to.be.null
    expect(DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MILLISECOND)).to.be.null
    expect(DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.SECOND)).to.be.null
    expect(DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MINUTE)).to.be.null
    expect(DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.HOUR)).to.be.null
    DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.YEAR).should.be.true
    expect(DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-15'))).to.be.null
    expect(DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-15'), DateTime.Unit.MILLISECOND)).to.be.null
    expect(DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-15'), DateTime.Unit.SECOND)).to.be.null
    expect(DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-15'), DateTime.Unit.MINUTE)).to.be.null
    expect(DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-15'), DateTime.Unit.HOUR)).to.be.null
    DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-15'), DateTime.Unit.DAY).should.be.true
    DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-15'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-15'), DateTime.Unit.YEAR).should.be.true

    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-16')).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-16'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-16'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-16'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-16'), DateTime.Unit.HOUR).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-16'), DateTime.Unit.DAY).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-16'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05-16'), DateTime.Unit.YEAR).should.be.true
    DateTime.parse('2000-05-16').sameAs(DateTime.parse('2000-05-15T12:35:45.123')).should.be.false
    DateTime.parse('2000-05-16').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-16').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-16').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05-16').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.HOUR).should.be.false
    DateTime.parse('2000-05-16').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.DAY).should.be.false
    DateTime.parse('2000-05-16').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-16').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.YEAR).should.be.true
    DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-16')).should.be.false
    DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-16'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-16'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-16'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-16'), DateTime.Unit.HOUR).should.be.false
    DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-16'), DateTime.Unit.DAY).should.be.false
    DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-16'), DateTime.Unit.MONTH).should.be.true
    return DateTime.parse('2000-05-15').sameAs(DateTime.parse('2000-05-16'), DateTime.Unit.YEAR).should.be.true
  })

  it('should handle imprecision correctly with missing days', () => {
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05'))).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05'), DateTime.Unit.MILLISECOND)).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05'), DateTime.Unit.SECOND)).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05'), DateTime.Unit.MINUTE)).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05'), DateTime.Unit.HOUR)).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05'), DateTime.Unit.DAY)).to.be.null
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-05'), DateTime.Unit.YEAR).should.be.true
    expect(DateTime.parse('2000-05').sameAs(DateTime.parse('2000-05-15T12:35:45.123'))).to.be.null
    expect(DateTime.parse('2000-05').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MILLISECOND)).to.be.null
    expect(DateTime.parse('2000-05').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.SECOND)).to.be.null
    expect(DateTime.parse('2000-05').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MINUTE)).to.be.null
    expect(DateTime.parse('2000-05').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.HOUR)).to.be.null
    expect(DateTime.parse('2000-05').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.DAY)).to.be.null
    DateTime.parse('2000-05').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.YEAR).should.be.true
    expect(DateTime.parse('2000-05').sameAs(DateTime.parse('2000-05'))).to.be.null
    expect(DateTime.parse('2000-05').sameAs(DateTime.parse('2000-05'), DateTime.Unit.MILLISECOND)).to.be.null
    expect(DateTime.parse('2000-05').sameAs(DateTime.parse('2000-05'), DateTime.Unit.SECOND)).to.be.null
    expect(DateTime.parse('2000-05').sameAs(DateTime.parse('2000-05'), DateTime.Unit.MINUTE)).to.be.null
    expect(DateTime.parse('2000-05').sameAs(DateTime.parse('2000-05'), DateTime.Unit.HOUR)).to.be.null
    expect(DateTime.parse('2000-05').sameAs(DateTime.parse('2000-05'), DateTime.Unit.DAY)).to.be.null
    DateTime.parse('2000-05').sameAs(DateTime.parse('2000-05'), DateTime.Unit.MONTH).should.be.true
    DateTime.parse('2000-05').sameAs(DateTime.parse('2000-05'), DateTime.Unit.YEAR).should.be.true

    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-06')).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-06'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-06'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-06'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-06'), DateTime.Unit.HOUR).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-06'), DateTime.Unit.DAY).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-06'), DateTime.Unit.MONTH).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000-06'), DateTime.Unit.YEAR).should.be.true
    DateTime.parse('2000-06').sameAs(DateTime.parse('2000-05-15T12:35:45.123')).should.be.false
    DateTime.parse('2000-06').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-06').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-06').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-06').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.HOUR).should.be.false
    DateTime.parse('2000-06').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.DAY).should.be.false
    DateTime.parse('2000-06').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MONTH).should.be.false
    DateTime.parse('2000-06').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.YEAR).should.be.true
    DateTime.parse('2000-05').sameAs(DateTime.parse('2000-06')).should.be.false
    DateTime.parse('2000-05').sameAs(DateTime.parse('2000-06'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05').sameAs(DateTime.parse('2000-06'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05').sameAs(DateTime.parse('2000-06'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05').sameAs(DateTime.parse('2000-06'), DateTime.Unit.HOUR).should.be.false
    DateTime.parse('2000-05').sameAs(DateTime.parse('2000-06'), DateTime.Unit.DAY).should.be.false
    DateTime.parse('2000-05').sameAs(DateTime.parse('2000-06'), DateTime.Unit.MONTH).should.be.false
    return DateTime.parse('2000-05').sameAs(DateTime.parse('2000-06'), DateTime.Unit.YEAR).should.be.true
  })

  return it('should handle imprecision correctly with missing months', () => {
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000'))).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000'), DateTime.Unit.MILLISECOND)).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000'), DateTime.Unit.SECOND)).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000'), DateTime.Unit.MINUTE)).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000'), DateTime.Unit.HOUR)).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000'), DateTime.Unit.DAY)).to.be.null
    expect(DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000'), DateTime.Unit.MONTH)).to.be.null
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2000'), DateTime.Unit.YEAR).should.be.true
    expect(DateTime.parse('2000').sameAs(DateTime.parse('2000-05-15T12:35:45.123'))).to.be.null
    expect(DateTime.parse('2000').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MILLISECOND)).to.be.null
    expect(DateTime.parse('2000').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.SECOND)).to.be.null
    expect(DateTime.parse('2000').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MINUTE)).to.be.null
    expect(DateTime.parse('2000').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.HOUR)).to.be.null
    expect(DateTime.parse('2000').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.DAY)).to.be.null
    expect(DateTime.parse('2000').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MONTH)).to.be.null
    DateTime.parse('2000').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.YEAR).should.be.true
    expect(DateTime.parse('2000').sameAs(DateTime.parse('2000'))).to.be.null
    expect(DateTime.parse('2000').sameAs(DateTime.parse('2000'), DateTime.Unit.MILLISECOND)).to.be.null
    expect(DateTime.parse('2000').sameAs(DateTime.parse('2000'), DateTime.Unit.SECOND)).to.be.null
    expect(DateTime.parse('2000').sameAs(DateTime.parse('2000'), DateTime.Unit.MINUTE)).to.be.null
    expect(DateTime.parse('2000').sameAs(DateTime.parse('2000'), DateTime.Unit.HOUR)).to.be.null
    expect(DateTime.parse('2000').sameAs(DateTime.parse('2000'), DateTime.Unit.DAY)).to.be.null
    expect(DateTime.parse('2000').sameAs(DateTime.parse('2000'), DateTime.Unit.MONTH)).to.be.null
    DateTime.parse('2000').sameAs(DateTime.parse('2000'), DateTime.Unit.YEAR).should.be.true

    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2001')).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2001'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2001'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2001'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2001'), DateTime.Unit.HOUR).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2001'), DateTime.Unit.DAY).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2001'), DateTime.Unit.MONTH).should.be.false
    DateTime.parse('2000-05-15T12:35:45.123').sameAs(DateTime.parse('2001'), DateTime.Unit.YEAR).should.be.false
    DateTime.parse('2001').sameAs(DateTime.parse('2000-05-15T12:35:45.123')).should.be.false
    DateTime.parse('2001').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2001').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2001').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2001').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.HOUR).should.be.false
    DateTime.parse('2001').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.DAY).should.be.false
    DateTime.parse('2001').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.MONTH).should.be.false
    DateTime.parse('2001').sameAs(DateTime.parse('2000-05-15T12:35:45.123'), DateTime.Unit.YEAR).should.be.false
    DateTime.parse('2000').sameAs(DateTime.parse('2001')).should.be.false
    DateTime.parse('2000').sameAs(DateTime.parse('2001'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000').sameAs(DateTime.parse('2001'), DateTime.Unit.SECOND).should.be.false
    DateTime.parse('2000').sameAs(DateTime.parse('2001'), DateTime.Unit.MINUTE).should.be.false
    DateTime.parse('2000').sameAs(DateTime.parse('2001'), DateTime.Unit.HOUR).should.be.false
    DateTime.parse('2000').sameAs(DateTime.parse('2001'), DateTime.Unit.DAY).should.be.false
    DateTime.parse('2000').sameAs(DateTime.parse('2001'), DateTime.Unit.MONTH).should.be.false
    return DateTime.parse('2000').sameAs(DateTime.parse('2001'), DateTime.Unit.YEAR).should.be.false
  })
})

describe('DateTime.getDate', () => {
  it('should properly extract the date from fully specified datetimes', () => {
    let d = DateTime.parse('2012-10-25T12:55:14.456+00').getDate()
    d.year.should.equal(2012)
    d.month.should.equal(10)
    d.day.should.equal(25)
    expect(d.hour).to.not.exist
    expect(d.minute).to.not.exist
    expect(d.second).to.not.exist
    expect(d.millisecond).to.not.exist
    return d.timezoneOffset.should.equal(0)
  })

  it('should properly extract the date from datetime without time', () => {
    let d = DateTime.parse('2012-10-25').getDate()
    d.year.should.equal(2012)
    d.month.should.equal(10)
    d.day.should.equal(25)
    expect(d.hour).to.not.exist
    expect(d.minute).to.not.exist
    expect(d.second).to.not.exist
    return expect(d.millisecond).to.not.exist
  })

  it('should properly extract the date from datetime without days', () => {
    let d = DateTime.parse('2012-10').getDate()
    d.year.should.equal(2012)
    d.month.should.equal(10)
    expect(d.day).to.not.exist
    expect(d.hour).to.not.exist
    expect(d.minute).to.not.exist
    expect(d.second).to.not.exist
    return expect(d.millisecond).to.not.exist
  })

  return it('should properly extract the date from datetime without months', () => {
    let d = DateTime.parse('2012').getDate()
    d.year.should.equal(2012)
    expect(d.month).to.not.exist
    expect(d.day).to.not.exist
    expect(d.hour).to.not.exist
    expect(d.minute).to.not.exist
    expect(d.second).to.not.exist
    return expect(d.millisecond).to.not.exist
  })
})

describe('DateTime.getTime', () => {
  it('should properly extract the time from fully specified datetimes', () => {
    let t = DateTime.parse('2012-10-25T12:55:14.456+00').getTime()
    t.year.should.equal(1900)
    t.month.should.equal(1)
    t.day.should.equal(1)
    t.hour.should.equal(12)
    t.minute.should.equal(55)
    t.second.should.equal(14)
    t.millisecond.should.equal(456)
    return t.timezoneOffset.should.equal(0)
  })

  it('should properly extract the time from datetimes without milliseconds', () => {
    let t = DateTime.parse('2012-10-25T12:55:14+00').getTime()
    t.year.should.equal(1900)
    t.month.should.equal(1)
    t.day.should.equal(1)
    t.hour.should.equal(12)
    t.minute.should.equal(55)
    t.second.should.equal(14)
    expect(t.millisecond).to.not.exist
    return t.timezoneOffset.should.equal(0)
  })

  it('should properly extract the time from datetimes without seconds', () => {
    let t = DateTime.parse('2012-10-25T12:55+00').getTime()
    t.year.should.equal(1900)
    t.month.should.equal(1)
    t.day.should.equal(1)
    t.hour.should.equal(12)
    t.minute.should.equal(55)
    expect(t.second).to.not.exist
    expect(t.millisecond).to.not.exist
    return t.timezoneOffset.should.equal(0)
  })

  it('should properly extract the time from datetimes without minutes', () => {
    let t = DateTime.parse('2012-10-25T12+00').getTime()
    t.year.should.equal(1900)
    t.month.should.equal(1)
    t.day.should.equal(1)
    t.hour.should.equal(12)
    expect(t.minute).to.not.exist
    expect(t.second).to.not.exist
    expect(t.millisecond).to.not.exist
    return t.timezoneOffset.should.equal(0)
  })

  return it('should properly extract the time from datetimes without hours', () => {
    let t = DateTime.parse('2012-10-25T+00').getTime()
    t.year.should.equal(1900)
    t.month.should.equal(1)
    t.day.should.equal(1)
    expect(t.hour).to.not.exist
    expect(t.minute).to.not.exist
    expect(t.second).to.not.exist
    expect(t.millisecond).to.not.exist
    return t.timezoneOffset.should.equal(0)
  })
})

describe('DateTime.sameOrAfter', () => {
  it('should accept cases where a is after b', () => {
    DateTime.parse('2000-01-01T00:00:00.001').sameOrAfter(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    DateTime.parse('2000-01-01T00:00:01.0').sameOrAfter(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    DateTime.parse('2000-01-01T00:01:00.0').sameOrAfter(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    DateTime.parse('2000-01-01T01:00:00.0').sameOrAfter(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    DateTime.parse('2000-01-02T00:00:00.0').sameOrAfter(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    DateTime.parse('2000-02-01T00:00:00.0').sameOrAfter(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    return DateTime.parse('2001-01-01T00:00:00.0').sameOrAfter(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
  })

  it('should reject cases where a is before b', () => {
    DateTime.parse('2000-12-31T23:59:59.998').sameOrAfter(DateTime.parse('2000-12-31T23:59:59.999')).should.be.false
    DateTime.parse('2000-12-31T23:59:58.999').sameOrAfter(DateTime.parse('2000-12-31T23:59:59.999')).should.be.false
    DateTime.parse('2000-12-31T23:58:59.999').sameOrAfter(DateTime.parse('2000-12-31T23:59:59.999')).should.be.false
    DateTime.parse('2000-12-31T22:59:59.999').sameOrAfter(DateTime.parse('2000-12-31T23:59:59.999')).should.be.false
    DateTime.parse('2000-12-30T23:59:59.999').sameOrAfter(DateTime.parse('2000-12-31T23:59:59.999')).should.be.false
    DateTime.parse('2000-11-31T23:59:59.999').sameOrAfter(DateTime.parse('2000-12-31T23:59:59.999')).should.be.false
    return DateTime.parse('1999-12-31T23:59:59.999').sameOrAfter(DateTime.parse('2000-12-31T23:59:59.999')).should.be.false
  })

  it('should accept cases where a is b', () => DateTime.parse('2000-01-01T00:00:00.0').sameOrAfter(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true)

  it('should work with different timezone offsets', () => {
    DateTime.parse('2000-01-01T07:00:00.0-05:00').sameOrAfter(DateTime.parse('2000-01-01T12:00:00.0+01:00')).should.be.true
    DateTime.parse('2000-01-01T12:00:00.0+01:00').sameOrAfter(DateTime.parse('2000-01-01T06:00:00.0-05:00')).should.be.true
    return DateTime.parse('2000-01-01T12:00:00.0+01:00').sameOrAfter(DateTime.parse('2000-01-01T07:00:00.0-05:00')).should.be.false
  })

  it('should use year precision when requested', () => {
    DateTime.parse('2000-01-01T00:00:00.0+00').sameOrAfter(DateTime.parse('2000-06-01T00:00:00.0+00')).should.be.false
    DateTime.parse('2000-01-01T00:00:00.0+00').sameOrAfter(DateTime.parse('2000-06-01T00:00:00.0+00'), DateTime.Unit.YEAR).should.be.true
    return DateTime.parse('1999-12-31T23:59:59.999+00').sameOrAfter(DateTime.parse('2000-06-01T00:00:00.0+00'), DateTime.Unit.YEAR).should.be.false
  })

  it('should use month precision when requested', () => {
    DateTime.parse('2000-02-01T00:00:00.0+00').sameOrAfter(DateTime.parse('2000-02-15T00:00:00.0+00')).should.be.false
    DateTime.parse('2000-02-01T00:00:00.0+00').sameOrAfter(DateTime.parse('2000-02-15T00:00:00.0+00'), DateTime.Unit.MONTH).should.be.true
    return DateTime.parse('2000-01-31T23:59:59.999+00').sameOrAfter(DateTime.parse('2000-02-15T00:00:00.0+00'), DateTime.Unit.MONTH).should.be.false
  })

  it('should use day precision when requested', () => {
    DateTime.parse('2000-02-15T00:00:00.0+00').sameOrAfter(DateTime.parse('2000-02-15T12:00:00.0+00')).should.be.false
    DateTime.parse('2000-02-15T00:00:00.0+00').sameOrAfter(DateTime.parse('2000-02-15T12:00:00.0+00'), DateTime.Unit.DAY).should.be.true
    return DateTime.parse('2000-02-14T23:59:59.999+00').sameOrAfter(DateTime.parse('2000-02-15T12:00:00.0+00'), DateTime.Unit.DAY).should.be.false
  })

  it('should use hour precision when requested', () => {
    DateTime.parse('2000-02-15T12:00:00.0+00').sameOrAfter(DateTime.parse('2000-02-15T12:30:00.0+00')).should.be.false
    DateTime.parse('2000-02-15T12:00:00.0+00').sameOrAfter(DateTime.parse('2000-02-15T12:30:00.0+00'), DateTime.Unit.HOUR).should.be.true
    return DateTime.parse('2000-02-15T11:59:59.999+00').sameOrAfter(DateTime.parse('2000-02-15T12:30:00.0+00'), DateTime.Unit.HOUR).should.be.false
  })

  it('should use minute precision when requested', () => {
    DateTime.parse('2000-02-15T12:30:00.0+00').sameOrAfter(DateTime.parse('2000-02-15T12:30:30.0+00')).should.be.false
    DateTime.parse('2000-02-15T12:30:00.0+00').sameOrAfter(DateTime.parse('2000-02-15T12:30:30.0+00'), DateTime.Unit.MINUTE).should.be.true
    return DateTime.parse('2000-02-15T12:29:59.999+00').sameOrAfter(DateTime.parse('2000-02-15T12:30:30.0+00'), DateTime.Unit.MINUTE).should.be.false
  })

  it('should use second precision when requested', () => {
    DateTime.parse('2000-02-15T12:30:30.0+00').sameOrAfter(DateTime.parse('2000-02-15T12:30:30.500+00')).should.be.false
    DateTime.parse('2000-02-15T12:30:30.0+00').sameOrAfter(DateTime.parse('2000-02-15T12:30:30.500+00'), DateTime.Unit.SECOND).should.be.true
    return DateTime.parse('2000-02-15T12:30:29.999+00').sameOrAfter(DateTime.parse('2000-02-15T12:30:30.500+00'), DateTime.Unit.SECOND).should.be.false
  })

  it('should use millisecond precision when requested', () => {
    DateTime.parse('2000-02-15T12:30:30.0+00').sameOrAfter(DateTime.parse('2000-02-15T12:30:30.500+00')).should.be.false
    DateTime.parse('2000-02-15T12:30:30.0+00').sameOrAfter(DateTime.parse('2000-02-15T12:30:30.500+00'), DateTime.Unit.MILLISECOND).should.be.false
    DateTime.parse('2000-02-15T12:30:30.500+00').sameOrAfter(DateTime.parse('2000-02-15T12:30:30.0+00'), DateTime.Unit.MILLISECOND).should.be.true
    return DateTime.parse('2000-02-15T12:30:30.0+00').sameOrAfter(DateTime.parse('2000-02-15T12:30:30.0+00'), DateTime.Unit.MILLISECOND).should.be.true
  })

  it('should return null in cases where a is b but there and b have unknown values', () => {
    expect(DateTime.parse('2000-01-01T00:00:00').sameOrAfter(DateTime.parse('2000-01-01T00:00:00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00').sameOrAfter(DateTime.parse('2000-01-01T00:00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00').sameOrAfter(DateTime.parse('2000-01-01T00'))).to.be.null
    expect(DateTime.parse('2000-01-01').sameOrAfter(DateTime.parse('2000-01-01'))).to.be.null
    expect(DateTime.parse('2000-01').sameOrAfter(DateTime.parse('2000-01'))).to.be.null
    return expect(DateTime.parse('2000').sameOrAfter(DateTime.parse('2000'))).to.be.null
  })

  it('should return null in cases where a has unknown values that prevent deterministic result', () => {
    expect(DateTime.parse('2000-01-01T00:00:00').sameOrAfter(DateTime.parse('2000-01-01T00:00:00.999'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00').sameOrAfter(DateTime.parse('2000-01-01T00:00:59.999'))).to.be.null
    expect(DateTime.parse('2000-01-01T00').sameOrAfter(DateTime.parse('2000-01-01T00:59:59.999'))).to.be.null
    expect(DateTime.parse('2000-01-01').sameOrAfter(DateTime.parse('2000-01-01T23:59:59.999'))).to.be.null
    expect(DateTime.parse('2000-01').sameOrAfter(DateTime.parse('2000-01-31T23:59:59.999'))).to.be.null
    return expect(DateTime.parse('2000').sameOrAfter(DateTime.parse('2000-12-31T23:59:59.999'))).to.be.null
  })

  it('should return null in cases where b has unknown values that prevent deterministic result', () => {
    expect(DateTime.parse('2000-01-01T00:00:00.001').sameOrAfter(DateTime.parse('2000-01-01T00:00:00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00:00.001').sameOrAfter(DateTime.parse('2000-01-01T00:00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00:00.001').sameOrAfter(DateTime.parse('2000-01-01T00'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00:00.001').sameOrAfter(DateTime.parse('2000-01-01'))).to.be.null
    expect(DateTime.parse('2000-01-01T00:00:00.001').sameOrAfter(DateTime.parse('2000-01'))).to.be.null
    return expect(DateTime.parse('2000-01-01T00:00:00.001').sameOrAfter(DateTime.parse('2000'))).to.be.null
  })

  it('should accept cases where a has unknown values but is still deterministicly after b', () => {
    DateTime.parse('2000-01-01T00:00:01').sameOrAfter(DateTime.parse('2000-01-01T00:00:00.999')).should.be.true
    DateTime.parse('2000-01-01T00:01').sameOrAfter(DateTime.parse('2000-01-01T00:00:59.999')).should.be.true
    DateTime.parse('2000-01-01T01').sameOrAfter(DateTime.parse('2000-01-01T00:59:59.999')).should.be.true
    DateTime.parse('2000-01-02').sameOrAfter(DateTime.parse('2000-01-01T23:59:59.999')).should.be.true
    DateTime.parse('2000-02').sameOrAfter(DateTime.parse('2000-01-31T23:59:59.999')).should.be.true
    return DateTime.parse('2001').sameOrAfter(DateTime.parse('2000-12-31T23:59:59.999')).should.be.true
  })

  it('should accept cases where a has unknown values but is still deterministicly after or same as b', () => {
    DateTime.parse('2000-01-01T00:00:01').sameOrAfter(DateTime.parse('2000-01-01T00:00:01.0')).should.be.true
    DateTime.parse('2000-01-01T00:01').sameOrAfter(DateTime.parse('2000-01-01T00:01:00.0')).should.be.true
    DateTime.parse('2000-01-01T01').sameOrAfter(DateTime.parse('2000-01-01T01:00:00.0')).should.be.true
    DateTime.parse('2000-01-01').sameOrAfter(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    DateTime.parse('2000-01').sameOrAfter(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
    return DateTime.parse('2000').sameOrAfter(DateTime.parse('2000-01-01T00:00:00.0')).should.be.true
  })

  it('should accept cases where b has unknown values but a is still deterministicly after or same as b', () => {
    DateTime.parse('2000-01-01T00:00:01.0').sameOrAfter(DateTime.parse('2000-01-01T00:00:00')).should.be.true
    DateTime.parse('2000-01-01T00:01:00.0').sameOrAfter(DateTime.parse('2000-01-01T00:00')).should.be.true
    DateTime.parse('2000-01-01T01:00:00.0').sameOrAfter(DateTime.parse('2000-01-01T00')).should.be.true
    DateTime.parse('2000-01-02T00:00:00.0').sameOrAfter(DateTime.parse('2000-01-01')).should.be.true
    DateTime.parse('2000-02-01T00:00:00.0').sameOrAfter(DateTime.parse('2000-01')).should.be.true
    return DateTime.parse('2001-01-01T00:00:00.0').sameOrAfter(DateTime.parse('2000')).should.be.true
  })

  it('should accept cases where b has unknown values but a is still deterministicly same as or after b', () => {
    DateTime.parse('2000-01-01T00:00:00.999').sameOrAfter(DateTime.parse('2000-01-01T00:00:00')).should.be.true
    DateTime.parse('2000-01-01T00:00:59.999').sameOrAfter(DateTime.parse('2000-01-01T00:00')).should.be.true
    DateTime.parse('2000-01-01T00:59:59.999').sameOrAfter(DateTime.parse('2000-01-01T00')).should.be.true
    DateTime.parse('2000-01-01T23:59:59.999').sameOrAfter(DateTime.parse('2000-01-01')).should.be.true
    DateTime.parse('2000-01-31T23:59:59.999').sameOrAfter(DateTime.parse('2000-01')).should.be.true
    return DateTime.parse('2000-12-31T23:59:59.999').sameOrAfter(DateTime.parse('2000')).should.be.true
  })

  it('should reject cases where a has unknown values but is still deterministicly before b', () => {
    DateTime.parse('2000-01-01T00:00:00').sameOrAfter(DateTime.parse('2000-01-01T00:00:01.0')).should.be.false
    DateTime.parse('2000-01-01T00:00').sameOrAfter(DateTime.parse('2000-01-01T00:01:00.0')).should.be.false
    DateTime.parse('2000-01-01T00').sameOrAfter(DateTime.parse('2000-01-01T01:00:00.0')).should.be.false
    DateTime.parse('2000-01-01').sameOrAfter(DateTime.parse('2000-01-02T00:00:00.0')).should.be.false
    DateTime.parse('2000-01').sameOrAfter(DateTime.parse('2000-02-01T00:00:00.0')).should.be.false
    return DateTime.parse('2000').sameOrAfter(DateTime.parse('2001-01-01T00:00:00.0')).should.be.false
  })

  return it('should reject cases where b has unknown values but a is still deterministicly before b', () => {
    DateTime.parse('2000-01-01T00:00:00.999').sameOrAfter(DateTime.parse('2000-01-01T00:00:01')).should.be.false
    DateTime.parse('2000-01-01T00:00:59.999').sameOrAfter(DateTime.parse('2000-01-01T00:01')).should.be.false
    DateTime.parse('2000-01-01T00:59:59.999').sameOrAfter(DateTime.parse('2000-01-01T01')).should.be.false
    DateTime.parse('2000-01-01T23:59:59.999').sameOrAfter(DateTime.parse('2000-01-02')).should.be.false
    DateTime.parse('2000-01-31T23:59:59.999').sameOrAfter(DateTime.parse('2000-02')).should.be.false
    return DateTime.parse('2000-12-31T23:59:59.999').sameOrAfter(DateTime.parse('2001')).should.be.false
  })
})

describe('DateTime.reducedPrecision', () => {
  it('should properly reduce to year precision', () => {
    let reduced = DateTime.parse('2012-10-25T12:55:14.456').reducedPrecision(DateTime.Unit.YEAR)
    reduced.year.should.equal(2012)
    expect(reduced.month).to.not.exist
    expect(reduced.day).to.not.exist
    expect(reduced.hour).to.not.exist
    expect(reduced.minute).to.not.exist
    expect(reduced.second).to.not.exist
    return expect(reduced.millisecond).to.not.exist
  })

  it('should properly reduce to month precision', () => {
    let reduced = DateTime.parse('2012-10-25T12:55:14.456').reducedPrecision(DateTime.Unit.MONTH)
    reduced.year.should.equal(2012)
    reduced.month.should.equal(10)
    expect(reduced.day).to.not.exist
    expect(reduced.hour).to.not.exist
    expect(reduced.minute).to.not.exist
    expect(reduced.second).to.not.exist
    return expect(reduced.millisecond).to.not.exist
  })

  it('should properly reduce to day precision', () => {
    let reduced = DateTime.parse('2012-10-25T12:55:14.456').reducedPrecision(DateTime.Unit.DAY)
    reduced.year.should.equal(2012)
    reduced.month.should.equal(10)
    reduced.day.should.equal(25)
    expect(reduced.hour).to.not.exist
    expect(reduced.minute).to.not.exist
    expect(reduced.second).to.not.exist
    return expect(reduced.millisecond).to.not.exist
  })

  it('should properly reduce to hour precision', () => {
    let reduced = DateTime.parse('2012-10-25T12:55:14.456').reducedPrecision(DateTime.Unit.HOUR)
    reduced.year.should.equal(2012)
    reduced.month.should.equal(10)
    reduced.day.should.equal(25)
    reduced.hour.should.equal(12)
    expect(reduced.minute).to.not.exist
    expect(reduced.second).to.not.exist
    return expect(reduced.millisecond).to.not.exist
  })

  it('should properly reduce to minute precision', () => {
    let reduced = DateTime.parse('2012-10-25T12:55:14.456').reducedPrecision(DateTime.Unit.MINUTE)
    reduced.year.should.equal(2012)
    reduced.month.should.equal(10)
    reduced.day.should.equal(25)
    reduced.hour.should.equal(12)
    reduced.minute.should.equal(55)
    expect(reduced.second).to.not.exist
    return expect(reduced.millisecond).to.not.exist
  })

  it('should properly reduce to second precision', () => {
    let reduced = DateTime.parse('2012-10-25T12:55:14.456').reducedPrecision(DateTime.Unit.SECOND)
    reduced.year.should.equal(2012)
    reduced.month.should.equal(10)
    reduced.day.should.equal(25)
    reduced.hour.should.equal(12)
    reduced.minute.should.equal(55)
    reduced.second.should.equal(14)
    return expect(reduced.millisecond).to.not.exist
  })

  return it('should properly reduce to millisecond precision', () => {
    let reduced = DateTime.parse('2012-10-25T12:55:14.456').reducedPrecision(DateTime.Unit.MILLISECOND)
    reduced.year.should.equal(2012)
    reduced.month.should.equal(10)
    reduced.day.should.equal(25)
    reduced.hour.should.equal(12)
    reduced.minute.should.equal(55)
    reduced.second.should.equal(14)
    return reduced.millisecond.should.equal(456)
  })
})

