/* global describe it beforeEach */
import setup from './intervalSetup'
import Interval from '../../src/datatypes/Interval'
import DateTime from '../../src/datatypes/DateTime'
import chai from 'chai'
chai.should()
let expect = chai.expect

const xy = obj => [obj.x, obj.y]

describe('Interval', () => {
  it('should properly set all properties when constructed as DateTime interval', () => {
    const i = new Interval(DateTime.parse('2012-01-01'), DateTime.parse('2013-01-01'), true, false)
    i.low.should.eql(DateTime.parse('2012-01-01'))
    i.high.should.eql(DateTime.parse('2013-01-01'))
    i.lowClosed.should.be.true
    return i.highClosed.should.be.false
  })

  it('should properly set all properties when constructed as integer interval', () => {
    const i = new Interval(12, 36, true, false)
    i.low.should.equal(12)
    i.high.should.equal(36)
    i.lowClosed.should.be.true
    return i.highClosed.should.be.false
  })

  return it('should default lowClosed/highClosed to true', () => {
    const i = new Interval(DateTime.parse('2012-01-01'), DateTime.parse('2013-01-01'))
    i.low.should.eql(DateTime.parse('2012-01-01'))
    i.high.should.eql(DateTime.parse('2013-01-01'))
    i.lowClosed.should.be.true
    return i.highClosed.should.be.true
  })
})

describe('DateTimeInterval.contains', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate dates before it', () => {
    return test.all2012.closed.contains(test.bef2012.full).should.be.false
  })

  it('should properly calculate the left boundary date', () => {
    test.all2012.closed.contains(test.beg2012.full).should.be.true
    return test.all2012.open.contains(test.beg2012.full).should.be.false
  })

  it('should properly calculate dates in the middle of it', () => {
    return test.all2012.closed.contains(test.mid2012.full).should.be.true
  })

  it('should properly calculate the right boundary date', () => {
    test.all2012.closed.contains(test.end2012.full).should.be.true
    return test.all2012.open.contains(test.end2012.full).should.be.false
  })

  it('should properly calculate dates after it', () => {
    return test.all2012.closed.contains(test.aft2012.full).should.be.false
  })

  it('should properly handle null endpoints', () => {
    let date = DateTime.parse('2012-01-01T00:00:00.0')
    let early = DateTime.parse('1900-01-01T00:00:00.0')
    let late = DateTime.parse('2999-01-01T00:00:00.0')
    new Interval(null, date).contains(early).should.be.true
    new Interval(null, date).contains(late).should.be.false
    new Interval(null, date, false, true).contains(date).should.be.true
    expect(new Interval(null, date, false, true).contains(early)).to.be.null
    new Interval(null, date, false, true).contains(late).should.be.false
    new Interval(date, null).contains(late).should.be.true
    new Interval(date, null).contains(early).should.be.false
    new Interval(date, null, true, false).contains(date).should.be.true
    expect(new Interval(date, null, true, false).contains(late)).to.be.null
    return new Interval(date, null, true, false).contains(early).should.be.false
  })

  it('should properly handle imprecision', () => {
    test.all2012.closed.contains(test.bef2012.toMonth).should.be.false
    test.all2012.closed.contains(test.beg2012.toMonth).should.be.true
    test.all2012.closed.contains(test.mid2012.toMonth).should.be.true
    test.all2012.closed.contains(test.end2012.toMonth).should.be.true
    test.all2012.closed.contains(test.aft2012.toMonth).should.be.false

    test.all2012.toMonth.contains(test.bef2012.toMonth).should.be.false
    expect(test.all2012.toMonth.contains(test.beg2012.toMonth)).to.not.exist
    test.all2012.toMonth.contains(test.mid2012.toMonth).should.be.true
    expect(test.all2012.toMonth.contains(test.end2012.toMonth)).to.not.exist
    test.all2012.toMonth.contains(test.aft2012.toMonth).should.be.false

    test.all2012.toMonth.contains(test.bef2012.full).should.be.false
    expect(test.all2012.toMonth.contains(test.beg2012.full)).to.not.exist
    test.all2012.toMonth.contains(test.mid2012.full).should.be.true
    expect(test.all2012.toMonth.contains(test.end2012.full)).to.not.exist
    test.all2012.toMonth.contains(test.aft2012.full).should.be.false

    return test.all2012.closed.contains(test.mid2012.toYear).should.be.true
  })

  return it('should throw when the argument is an interval', () => {
    return expect(() => test.all2012.closed.contains(test.all2012.closed)).to.throw(Error)
  })
})

describe('DateTimeInterval.includes', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.dIvl.sameAs)
    x.closed.includes(y.closed).should.be.true
    x.closed.includes(y.open).should.be.true
    x.open.includes(y.closed).should.be.false
    x.open.includes(y.open).should.be.true
    y.closed.includes(x.closed).should.be.true
    y.closed.includes(x.open).should.be.true
    y.open.includes(x.closed).should.be.false
    return y.open.includes(x.open).should.be.true
  })

  it('should properly calculate before/after intervals', () => {
    let [x, y] = xy(test.dIvl.before)
    x.closed.includes(y.closed).should.be.false
    x.closed.includes(y.open).should.be.false
    x.open.includes(y.closed).should.be.false
    x.open.includes(y.open).should.be.false
    y.closed.includes(x.closed).should.be.false
    y.closed.includes(x.open).should.be.false
    y.open.includes(x.closed).should.be.false
    return y.open.includes(x.open).should.be.false
  })

  it('should properly calculate meets intervals', () => {
    let [x, y] = xy(test.dIvl.meets)
    x.closed.includes(y.closed).should.be.false
    x.closed.includes(y.open).should.be.false
    x.open.includes(y.closed).should.be.false
    x.open.includes(y.open).should.be.false
    y.closed.includes(x.closed).should.be.false
    y.closed.includes(x.open).should.be.false
    y.open.includes(x.closed).should.be.false
    return y.open.includes(x.open).should.be.false
  })

  it('should properly calculate left/right overlapping intervals', () => {
    let [x, y] = xy(test.dIvl.overlaps)
    x.closed.includes(y.closed).should.be.false
    x.closed.includes(y.open).should.be.false
    x.open.includes(y.closed).should.be.false
    x.open.includes(y.open).should.be.false
    y.closed.includes(x.closed).should.be.false
    y.closed.includes(x.open).should.be.false
    y.open.includes(x.closed).should.be.false
    return y.open.includes(x.open).should.be.false
  })

  it('should properly calculate begins/begun by intervals', () => {
    let [x, y] = xy(test.dIvl.begins)
    x.closed.includes(y.closed).should.be.false
    x.closed.includes(y.open).should.be.false
    x.open.includes(y.closed).should.be.false
    x.open.includes(y.open).should.be.false
    y.closed.includes(x.closed).should.be.true
    y.closed.includes(x.open).should.be.true
    y.open.includes(x.closed).should.be.false
    return y.open.includes(x.open).should.be.true
  })

  it('should properly calculate includes/included by intervals', () => {
    let [x, y] = xy(test.dIvl.during)
    x.closed.includes(y.closed).should.be.false
    x.closed.includes(y.open).should.be.false
    x.open.includes(y.closed).should.be.false
    x.open.includes(y.open).should.be.false
    y.closed.includes(x.closed).should.be.true
    y.closed.includes(x.open).should.be.true
    y.open.includes(x.closed).should.be.true
    return y.open.includes(x.open).should.be.true
  })

  it('should properly calculate ends/ended by intervals', () => {
    let [x, y] = xy(test.dIvl.ends)
    x.closed.includes(y.closed).should.be.false
    x.closed.includes(y.open).should.be.false
    x.open.includes(y.closed).should.be.false
    x.open.includes(y.open).should.be.false
    y.closed.includes(x.closed).should.be.true
    y.closed.includes(x.open).should.be.true
    y.open.includes(x.closed).should.be.false
    return y.open.includes(x.open).should.be.true
  })

  it('should properly handle imprecision', () => {
    let x, y
    let ref = xy(test.dIvl.sameAs)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.closed.includes(y.toMinute).should.be.true
    expect(x.toHour.includes(y.toMinute)).to.not.exist

    ref = xy(test.dIvl.before)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toMonth.includes(y.toMonth)).to.be.false
    expect(x.toYear.includes(y.closed)).to.not.exist

    ref = xy(test.dIvl.meets)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toMonth.includes(y.toMonth)).to.be.false
    expect(x.toYear.includes(y.closed)).to.not.exist

    ref = xy(test.dIvl.overlaps)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toMonth.includes(y.toMonth)).to.be.false
    expect(x.toYear.includes(y.closed)).to.not.exist

    ref = xy(test.dIvl.begins)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toMinute.includes(y.toMinute)).to.be.false
    expect(x.toYear.includes(y.closed)).to.not.exist

    ref = xy(test.dIvl.during)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toMonth.includes(y.toMonth)).to.be.false
    expect(y.toMonth.includes(x.toMonth)).to.be.true
    expect(x.toYear.includes(y.closed)).to.not.exist

    ref = xy(test.dIvl.ends)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toMinute.includes(y.toMinute)).to.be.false
    return expect(x.toYear.includes(y.closed)).to.not.exist
  })

  return it('should throw when the argument is a point', () => {
    return expect(() => test.all2012.closed.includes(test.mid2012)).to.throw(Error)
  })
})

describe('DateTimeInterval.includedIn', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.dIvl.sameAs)
    x.closed.includedIn(y.closed).should.be.true
    x.closed.includedIn(y.open).should.be.false
    x.open.includedIn(y.closed).should.be.true
    x.open.includedIn(y.open).should.be.true

    y.closed.includedIn(x.closed).should.be.true
    y.closed.includedIn(x.open).should.be.false
    y.open.includedIn(x.closed).should.be.true
    return y.open.includedIn(x.open).should.be.true
  })

  it('should properly calculate before/after intervals', () => {
    let [x, y] = xy(test.dIvl.before)
    x.closed.includedIn(y.closed).should.be.false
    x.closed.includedIn(y.open).should.be.false
    x.open.includedIn(y.closed).should.be.false
    x.open.includedIn(y.open).should.be.false
    y.closed.includedIn(x.closed).should.be.false
    y.closed.includedIn(x.open).should.be.false
    y.open.includedIn(x.closed).should.be.false
    return y.open.includedIn(x.open).should.be.false
  })

  it('should properly calculate meets intervals', () => {
    let [x, y] = xy(test.dIvl.meets)
    x.closed.includedIn(y.closed).should.be.false
    x.closed.includedIn(y.open).should.be.false
    x.open.includedIn(y.closed).should.be.false
    x.open.includedIn(y.open).should.be.false
    y.closed.includedIn(x.closed).should.be.false
    y.closed.includedIn(x.open).should.be.false
    y.open.includedIn(x.closed).should.be.false
    return y.open.includedIn(x.open).should.be.false
  })

  it('should properly calculate left/right overlapping intervals', () => {
    let [x, y] = xy(test.dIvl.overlaps)
    x.closed.includedIn(y.closed).should.be.false
    x.closed.includedIn(y.open).should.be.false
    x.open.includedIn(y.closed).should.be.false
    x.open.includedIn(y.open).should.be.false
    y.closed.includedIn(x.closed).should.be.false
    y.closed.includedIn(x.open).should.be.false
    y.open.includedIn(x.closed).should.be.false
    return y.open.includedIn(x.open).should.be.false
  })

  it('should properly calculate begins/begun by intervals', () => {
    let [x, y] = xy(test.dIvl.begins)
    x.closed.includedIn(y.closed).should.be.true
    x.closed.includedIn(y.open).should.be.false
    x.open.includedIn(y.closed).should.be.true
    x.open.includedIn(y.open).should.be.true
    y.closed.includedIn(x.closed).should.be.false
    y.closed.includedIn(x.open).should.be.false
    y.open.includedIn(x.closed).should.be.false
    return y.open.includedIn(x.open).should.be.false
  })

  it('should properly calculate includes/included by intervals', () => {
    let [x, y] = xy(test.dIvl.during)
    x.closed.includedIn(y.closed).should.be.true
    x.closed.includedIn(y.open).should.be.true
    x.open.includedIn(y.closed).should.be.true
    x.open.includedIn(y.open).should.be.true
    y.closed.includedIn(x.closed).should.be.false
    y.closed.includedIn(x.open).should.be.false
    y.open.includedIn(x.closed).should.be.false
    return y.open.includedIn(x.open).should.be.false
  })

  it('should properly calculate ends/ended by intervals', () => {
    let [x, y] = xy(test.dIvl.ends)
    x.closed.includedIn(y.closed).should.be.true
    x.closed.includedIn(y.open).should.be.false
    x.open.includedIn(y.closed).should.be.true
    x.open.includedIn(y.open).should.be.true
    y.closed.includedIn(x.closed).should.be.false
    y.closed.includedIn(x.open).should.be.false
    y.open.includedIn(x.closed).should.be.false
    return y.open.includedIn(x.open).should.be.false
  })

  it('should properly handle imprecision', () => {
    let x, y
    let ref = xy(test.dIvl.sameAs)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.closed.includedIn(y.toMinute)).to.not.exist
    expect(x.toHour.includedIn(y.toMinute)).to.not.exist

    ref = xy(test.dIvl.before)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toMonth.includedIn(y.toMonth)).to.be.false
    expect(x.toYear.includedIn(y.closed)).to.not.exist

    ref = xy(test.dIvl.meets)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.includedIn(y.toMonth).should.be.false
    expect(x.toYear.includedIn(y.closed)).to.not.exist

    ref = xy(test.dIvl.overlaps)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.includedIn(y.toMonth).should.be.false
    expect(x.toYear.includedIn(y.closed)).to.not.exist

    ref = xy(test.dIvl.begins)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toMinute.includedIn(y.toMinute)).to.not.exist
    x.toYear.includedIn(y.closed).should.be.true

    ref = xy(test.dIvl.during)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.includedIn(y.toMonth).should.be.true
    y.toMonth.includedIn(x.toMonth).should.be.false
    x.toYear.includedIn(y.closed).should.be.true

    ref = xy(test.dIvl.ends)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toMinute.includedIn(y.toMinute)).to.not.exist
    return x.toYear.includedIn(y.closed).should.be.true
  })

  return it('should throw when the argument is a point', () => {
    return expect(() => test.all2012.closed.includedIn(test.mid2012)).to.throw(Error)
  })
})

describe('DateTimeInterval.overlaps(DateTimeInterval)', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.dIvl.sameAs)
    x.closed.overlaps(y.closed).should.be.true
    x.closed.overlaps(y.open).should.be.true
    x.open.overlaps(y.closed).should.be.true
    x.open.overlaps(y.open).should.be.true
    y.closed.overlaps(x.closed).should.be.true
    y.closed.overlaps(x.open).should.be.true
    y.open.overlaps(x.closed).should.be.true
    return y.open.overlaps(x.open).should.be.true
  })

  it('should properly calculate before/after intervals', () => {
    let [x, y] = xy(test.dIvl.before)
    x.closed.overlaps(y.closed).should.be.false
    x.closed.overlaps(y.open).should.be.false
    x.open.overlaps(y.closed).should.be.false
    x.open.overlaps(y.open).should.be.false
    y.closed.overlaps(x.closed).should.be.false
    y.closed.overlaps(x.open).should.be.false
    y.open.overlaps(x.closed).should.be.false
    return y.open.overlaps(x.open).should.be.false
  })

  it('should properly calculate meets intervals', () => {
    let [x, y] = xy(test.dIvl.meets)
    x.closed.overlaps(y.closed).should.be.false
    x.closed.overlaps(y.open).should.be.false
    x.open.overlaps(y.closed).should.be.false
    x.open.overlaps(y.open).should.be.false
    y.closed.overlaps(x.closed).should.be.false
    y.closed.overlaps(x.open).should.be.false
    y.open.overlaps(x.closed).should.be.false
    return y.open.overlaps(x.open).should.be.false
  })

  it('should properly calculate left/right overlapping intervals', () => {
    let [x, y] = xy(test.dIvl.overlaps)
    x.closed.overlaps(y.closed).should.be.true
    x.closed.overlaps(y.open).should.be.true
    x.open.overlaps(y.closed).should.be.true
    x.open.overlaps(y.open).should.be.true
    y.closed.overlaps(x.closed).should.be.true
    y.closed.overlaps(x.open).should.be.true
    y.open.overlaps(x.closed).should.be.true
    return y.open.overlaps(x.open).should.be.true
  })

  it('should properly calculate begins/begun by intervals', () => {
    let [x, y] = xy(test.dIvl.begins)
    x.closed.overlaps(y.closed).should.be.true
    x.closed.overlaps(y.open).should.be.true
    x.open.overlaps(y.closed).should.be.true
    x.open.overlaps(y.open).should.be.true
    y.closed.overlaps(x.closed).should.be.true
    y.closed.overlaps(x.open).should.be.true
    y.open.overlaps(x.closed).should.be.true
    return y.open.overlaps(x.open).should.be.true
  })

  it('should properly calculate includes/included by intervals', () => {
    let [x, y] = xy(test.dIvl.during)
    x.closed.overlaps(y.closed).should.be.true
    x.closed.overlaps(y.open).should.be.true
    x.open.overlaps(y.closed).should.be.true
    x.open.overlaps(y.open).should.be.true
    y.closed.overlaps(x.closed).should.be.true
    y.closed.overlaps(x.open).should.be.true
    y.open.overlaps(x.closed).should.be.true
    return y.open.overlaps(x.open).should.be.true
  })

  it('should properly calculate ends/ended by intervals', () => {
    let [x, y] = xy(test.dIvl.ends)
    x.closed.overlaps(y.closed).should.be.true
    x.closed.overlaps(y.open).should.be.true
    x.open.overlaps(y.closed).should.be.true
    x.open.overlaps(y.open).should.be.true
    y.closed.overlaps(x.closed).should.be.true
    y.closed.overlaps(x.open).should.be.true
    y.open.overlaps(x.closed).should.be.true
    return y.open.overlaps(x.open).should.be.true
  })

  return it('should properly handle imprecision', () => {
    let x, y
    let ref = xy(test.dIvl.sameAs)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.closed.overlaps(y.toMinute).should.be.true
    x.toHour.overlaps(y.toMinute).should.be.true

    ref = xy(test.dIvl.before)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.overlaps(y.toMonth).should.be.false
    expect(x.toYear.overlaps(y.closed)).to.not.exist

    ref = xy(test.dIvl.meets)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.overlaps(y.toMonth).should.be.false
    expect(x.toYear.overlaps(y.closed)).to.not.exist

    ref = xy(test.dIvl.overlaps)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.overlaps(y.toMonth).should.be.true
    expect(x.toYear.overlaps(y.closed)).to.not.exist

    ref = xy(test.dIvl.begins)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMinute.overlaps(y.toMinute).should.be.true
    x.toYear.overlaps(y.closed).should.be.true

    ref = xy(test.dIvl.during)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.overlaps(y.toMonth).should.be.true
    y.toMonth.overlaps(x.toMonth).should.be.true
    x.toYear.overlaps(y.closed).should.be.true

    ref = xy(test.dIvl.ends)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMinute.overlaps(y.toMinute).should.be.true
    return x.toYear.overlaps(y.closed).should.be.true
  })
})

describe('DateTimeInterval.overlaps(DateTime)', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate dates before it', () => {
    return test.all2012.closed.overlaps(test.bef2012.full).should.be.false
  })

  it('should properly calculate the left boundary date', () => {
    test.all2012.closed.overlaps(test.beg2012.full).should.be.true
    return test.all2012.open.overlaps(test.beg2012.full).should.be.false
  })

  it('should properly calculate dates in the middle of it', () => {
    return test.all2012.closed.overlaps(test.mid2012.full).should.be.true
  })

  it('should properly calculate the right boundary date', () => {
    test.all2012.closed.overlaps(test.end2012.full).should.be.true
    return test.all2012.open.overlaps(test.end2012.full).should.be.false
  })

  it('should properly calculate dates after it', () => {
    return test.all2012.closed.overlaps(test.aft2012.full).should.be.false
  })

  return it('should properly handle imprecision', () => {
    test.all2012.closed.overlaps(test.bef2012.toMonth).should.be.false
    test.all2012.closed.overlaps(test.beg2012.toMonth).should.be.true
    test.all2012.closed.overlaps(test.mid2012.toMonth).should.be.true
    test.all2012.closed.overlaps(test.end2012.toMonth).should.be.true
    test.all2012.closed.overlaps(test.aft2012.toMonth).should.be.false

    test.all2012.toMonth.overlaps(test.bef2012.toMonth).should.be.false
    expect(test.all2012.toMonth.overlaps(test.beg2012.toMonth)).to.not.exist
    test.all2012.toMonth.overlaps(test.mid2012.toMonth).should.be.true
    expect(test.all2012.toMonth.overlaps(test.end2012.toMonth)).to.not.exist
    test.all2012.toMonth.overlaps(test.aft2012.toMonth).should.be.false

    test.all2012.toMonth.overlaps(test.bef2012.full).should.be.false
    expect(test.all2012.toMonth.overlaps(test.beg2012.full)).to.not.exist
    test.all2012.toMonth.overlaps(test.mid2012.full).should.be.true
    expect(test.all2012.toMonth.overlaps(test.end2012.full)).to.not.exist
    test.all2012.toMonth.overlaps(test.aft2012.full).should.be.false

    return test.all2012.closed.overlaps(test.mid2012.toYear).should.be.true
  })
})

describe('DateTimeInterval.equals', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.dIvl.sameAs)
    x.closed.equals(y.closed).should.be.true
    x.closed.equals(y.open).should.be.false
    x.open.equals(y.closed).should.be.false
    x.open.equals(y.open).should.be.true
    y.closed.equals(x.closed).should.be.true
    y.closed.equals(x.open).should.be.false
    y.open.equals(x.closed).should.be.false
    return y.open.equals(x.open).should.be.true
  })

  it('should properly calculate before/after intervals', () => {
    let [x, y] = xy(test.dIvl.before)
    x.closed.equals(y.closed).should.be.false
    x.closed.equals(y.open).should.be.false
    x.open.equals(y.closed).should.be.false
    x.open.equals(y.open).should.be.false
    y.closed.equals(x.closed).should.be.false
    y.closed.equals(x.open).should.be.false
    y.open.equals(x.closed).should.be.false
    return y.open.equals(x.open).should.be.false
  })

  it('should properly calculate meets intervals', () => {
    let [x, y] = xy(test.dIvl.meets)
    x.closed.equals(y.closed).should.be.false
    x.closed.equals(y.open).should.be.false
    x.open.equals(y.closed).should.be.false
    x.open.equals(y.open).should.be.false
    y.closed.equals(x.closed).should.be.false
    y.closed.equals(x.open).should.be.false
    y.open.equals(x.closed).should.be.false
    return y.open.equals(x.open).should.be.false
  })

  it('should properly calculate left/right overlapping intervals', () => {
    let [x, y] = xy(test.dIvl.overlaps)
    x.closed.equals(y.closed).should.be.false
    x.closed.equals(y.open).should.be.false
    x.open.equals(y.closed).should.be.false
    x.open.equals(y.open).should.be.false
    y.closed.equals(x.closed).should.be.false
    y.closed.equals(x.open).should.be.false
    y.open.equals(x.closed).should.be.false
    return y.open.equals(x.open).should.be.false
  })

  it('should properly calculate begins/begun by intervals', () => {
    let [x, y] = xy(test.dIvl.begins)
    x.closed.equals(y.closed).should.be.false
    x.closed.equals(y.open).should.be.false
    x.open.equals(y.closed).should.be.false
    x.open.equals(y.open).should.be.false
    y.closed.equals(x.closed).should.be.false
    y.closed.equals(x.open).should.be.false
    y.open.equals(x.closed).should.be.false
    return y.open.equals(x.open).should.be.false
  })

  it('should properly calculate includes/included by intervals', () => {
    let [x, y] = xy(test.dIvl.during)
    x.closed.equals(y.closed).should.be.false
    x.closed.equals(y.open).should.be.false
    x.open.equals(y.closed).should.be.false
    x.open.equals(y.open).should.be.false
    y.closed.equals(x.closed).should.be.false
    y.closed.equals(x.open).should.be.false
    y.open.equals(x.closed).should.be.false
    return y.open.equals(x.open).should.be.false
  })

  it('should properly calculate ends/ended by intervals', () => {
    let [x, y] = xy(test.dIvl.ends)
    x.closed.equals(y.closed).should.be.false
    x.closed.equals(y.open).should.be.false
    x.open.equals(y.closed).should.be.false
    x.open.equals(y.open).should.be.false
    y.closed.equals(x.closed).should.be.false
    y.closed.equals(x.open).should.be.false
    y.open.equals(x.closed).should.be.false
    return y.open.equals(x.open).should.be.false
  })

  it('should properly calculate open vs. closed intervals', () => {
    let lowEdge2012 = DateTime.parse('2012-01-01T00:00:00.0+00')
    let lowEdge2012Succ = DateTime.parse('2012-01-01T00:00:00.001+00')
    let highEdge2012 = DateTime.parse('2012-12-31T23:59:59.999+00')
    let highEdge2012Pred = DateTime.parse('2012-12-31T23:59:59.998+00')
    let cc = new Interval(lowEdge2012, highEdge2012, true, true)
    let oc = new Interval(lowEdge2012, highEdge2012, false, true)
    let co = new Interval(lowEdge2012, highEdge2012, true, false)
    let oo = new Interval(lowEdge2012, highEdge2012, false, false)
    let cci = new Interval(lowEdge2012Succ, highEdge2012Pred, true, true)
    let oci = new Interval(lowEdge2012Succ, highEdge2012Pred, false, true)
    let coi = new Interval(lowEdge2012Succ, highEdge2012Pred, true, false)
    let ooi = new Interval(lowEdge2012Succ, highEdge2012Pred, false, false)

    oo.equals(oo).should.be.true
    oo.equals(cc).should.be.false
    oo.equals(cci).should.be.true
    oo.equals(oci).should.be.false
    oo.equals(coi).should.be.false
    oo.equals(ooi).should.be.false
    cci.equals(cci).should.be.true
    cci.equals(oo).should.be.true
    cci.equals(co).should.be.false
    cci.equals(oc).should.be.false
    return cci.equals(cc).should.be.false
  })

  it('should properly handle imprecision', () => {
    let x, y
    let ref = xy(test.dIvl.sameAs)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.closed.equals(y.toMinute)).to.be.null
    expect(x.toHour.equals(y.toMinute)).to.be.null

    ref = xy(test.dIvl.before)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toMonth.equals(y.toMonth)).to.be.false
    expect(x.toYear.equals(y.closed)).to.be.null

    ref = xy(test.dIvl.meets)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toMonth.equals(y.toMonth)).to.be.false
    expect(x.toYear.equals(y.closed)).to.be.null

    ref = xy(test.dIvl.overlaps)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.equals(y.toMonth).should.be.false
    expect(x.toYear.equals(y.closed)).to.be.null

    ref = xy(test.dIvl.begins)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMinute.equals(y.toMinute).should.be.false
    expect(x.toYear.equals(y.closed)).to.be.null

    ref = xy(test.dIvl.during)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.equals(y.toMonth).should.be.false
    y.toMonth.equals(x.toMonth).should.be.false
    expect(x.toYear.equals(y.closed)).to.be.null

    ref = xy(test.dIvl.ends)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMinute.equals(y.toMinute).should.be.false
    return expect(x.toYear.equals(y.closed)).to.be.null
  })

  return it('should be false for equality with points', () => {
    let point = DateTime.parse('2012-01-01T00:00:00.0+00')
    let ivl = new Interval(point, point, true, true)

    return ivl.equals(point).should.be.false
  })
})

describe('DateTimeInterval.union', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs unions', () => {
    let [x, y] = xy(test.dIvl.sameAs)
    x.closed.union(y.closed).equals(x.closed).should.be.true
    x.closed.union(y.open).equals(x.closed).should.be.true
    x.open.union(y.closed).equals(x.closed).should.be.true
    x.open.union(y.open).equals(x.open).should.be.true
    y.closed.union(x.closed).equals(y.closed).should.be.true
    y.closed.union(x.open).equals(y.closed).should.be.true
    y.open.union(x.closed).equals(y.closed).should.be.true
    return y.open.union(x.open).equals(y.open).should.be.true
  })

  it('should properly calculate before/after unions', () => {
    let [x, y] = xy(test.dIvl.before)
    expect(x.closed.union(y.closed)).to.be.null
    expect(x.closed.union(y.open)).to.be.null
    expect(x.open.union(y.closed)).to.be.null
    expect(x.open.union(y.open)).to.be.null
    expect(y.closed.union(x.closed)).to.be.null
    expect(y.closed.union(x.open)).to.be.null
    expect(y.open.union(x.closed)).to.be.null
    return expect(y.open.union(x.open)).to.be.null
  })

  it('should properly calculate meets unions', () => {
    let [x, y] = xy(test.dIvl.meets)
    let z = test.all2012
    x.closed.union(y.closed).equals(z.closed).should.be.true
    expect(x.closed.union(y.open)).to.be.null
    expect(x.open.union(y.closed)).to.be.null
    expect(x.open.union(y.open)).to.be.null
    y.closed.union(x.closed).equals(z.closed).should.be.true
    expect(y.closed.union(x.open)).to.be.null
    expect(y.open.union(x.closed)).to.be.null
    return expect(y.open.union(x.open)).to.be.null
  })

  it('should properly calculate left/right overlapping unions', () => {
    let [x, y] = xy(test.dIvl.overlaps)
    let z = test.all2012
    x.closed.union(y.closed).equals(z.closed).should.be.true
    x.closed.union(y.open).equals(z.closedOpen).should.be.true
    x.open.union(y.closed).equals(z.openClosed).should.be.true
    x.open.union(y.open).equals(z.open).should.be.true
    y.closed.union(x.closed).equals(z.closed).should.be.true
    y.closed.union(x.open).equals(z.openClosed).should.be.true
    y.open.union(x.closed).equals(z.closedOpen).should.be.true
    return y.open.union(x.open).equals(z.open).should.be.true
  })

  it('should properly calculate begins/begun by unions', () => {
    let [x, y] = xy(test.dIvl.begins)
    x.closed.union(y.closed).equals(y.closed).should.be.true
    x.closed.union(y.open).equals(y.closedOpen).should.be.true
    x.open.union(y.closed).equals(y.closed).should.be.true
    x.open.union(y.open).equals(y.open).should.be.true
    y.closed.union(x.closed).equals(y.closed).should.be.true
    y.closed.union(x.open).equals(y.closed).should.be.true
    y.open.union(x.closed).equals(y.closedOpen).should.be.true
    return y.open.union(x.open).equals(y.open).should.be.true
  })

  it('should properly calculate includes/included by unions', () => {
    let [x, y] = xy(test.dIvl.during)
    x.closed.union(y.closed).equals(y.closed).should.be.true
    x.closed.union(y.open).equals(y.open).should.be.true
    x.open.union(y.closed).equals(y.closed).should.be.true
    x.open.union(y.open).equals(y.open).should.be.true
    y.closed.union(x.closed).equals(y.closed).should.be.true
    y.closed.union(x.open).equals(y.closed).should.be.true
    y.open.union(x.closed).equals(y.open).should.be.true
    return y.open.union(x.open).equals(y.open).should.be.true
  })

  it('should properly calculate ends/ended by unions', () => {
    let [x, y] = xy(test.dIvl.ends)
    x.closed.union(y.closed).equals(y.closed).should.be.true
    x.closed.union(y.open).equals(y.openClosed).should.be.true
    x.open.union(y.closed).equals(y.closed).should.be.true
    x.open.union(y.open).equals(y.open).should.be.true
    y.closed.union(x.closed).equals(y.closed).should.be.true
    y.closed.union(x.open).equals(y.closed).should.be.true
    y.open.union(x.closed).equals(y.openClosed).should.be.true
    return y.open.union(x.open).equals(y.open).should.be.true
  })

  it('should properly handle imprecision', () => {
    let x, y
    let ref = xy(test.dIvl.sameAs)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences

    // first, check that the DateTime precision methods are correct.
    // TODO: move these into DateTime tests
    x.closed.low.isMorePrecise(x.toMinute.low).should.be.true
    x.closed.low.isLessPrecise(x.toMinute.low).should.be.false
    x.closed.low.isSamePrecision(x.toMinute.low).should.be.false
    x.toMinute.low.isMorePrecise(x.closed.low).should.be.false
    x.toMinute.low.isLessPrecise(x.closed.low).should.be.true
    x.toMinute.low.isSamePrecision(x.closed.low).should.be.false

    // The union of (A U B) should be the same as (B U A)
    // check sameAs
    let i = x.toMinute.union(y.closed)
    x.toMinute.low.sameAs(i.low, DateTime.Unit.MINUTE).should.be.true
    x.toMinute.high.sameAs(i.high, DateTime.Unit.MINUTE).should.be.true

    let j = y.closed.union(x.toMinute)
    y.closed.low.sameAs(j.low, DateTime.Unit.MINUTE).should.be.true
    y.closed.high.sameAs(j.high, DateTime.Unit.MINUTE).should.be.true

    i.low.sameAs(j.low, DateTime.Unit.MINUTE).should.be.true
    i.high.sameAs(j.high, DateTime.Unit.MINUTE).should.be.true

    // check resulting precision
    i.low.isMorePrecise(j.low).should.be.false
    i.low.isLessPrecise(j.low).should.be.false
    i.low.isSamePrecision(j.low).should.be.true
    i.high.isMorePrecise(j.high).should.be.false
    i.high.isLessPrecise(j.high).should.be.false
    i.high.isSamePrecision(j.high).should.be.true

    ref = xy(test.dIvl.before)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    // TODO: I don't know about these tests... doesn't make sense to me.
    expect(x.toYear.union(y.toYear)).to.not.exist
    expect(y.toYear.union(x.toYear)).to.not.exist

    ref = xy(test.dIvl.meets)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toMonth.union(y.toMonth)).to.not.exist

    ref = xy(test.dIvl.overlaps)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    i = x.toMonth.union(y.toMonth)
    j = y.toMonth.union(x.toMonth)

    x.toMonth.low.sameAs(i.low, DateTime.Unit.MONTH).should.be.true
    y.toMonth.high.sameAs(i.high, DateTime.Unit.MONTH).should.be.true
    x.toMonth.low.sameAs(j.low, DateTime.Unit.MONTH).should.be.true
    y.toMonth.high.sameAs(j.high, DateTime.Unit.MONTH).should.be.true

    ref = xy(test.dIvl.begins)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    i = x.toMonth.union(y.toMonth)
    j = y.toMonth.union(x.toMonth)

    x.toMonth.low.sameAs(i.low, DateTime.Unit.MONTH).should.be.true
    y.toMonth.high.sameAs(i.high, DateTime.Unit.MONTH).should.be.true
    x.toMonth.low.sameAs(j.low, DateTime.Unit.MONTH).should.be.true
    y.toMonth.high.sameAs(j.high, DateTime.Unit.MONTH).should.be.true

    ref = xy(test.dIvl.during)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    i = x.toMonth.union(y.toMonth)
    j = y.toMonth.union(x.toMonth)

    y.toMonth.low.sameAs(i.low, DateTime.Unit.MONTH).should.be.true
    y.toMonth.high.sameAs(i.high, DateTime.Unit.MONTH).should.be.true
    y.toMonth.low.sameAs(j.low, DateTime.Unit.MONTH).should.be.true
    y.toMonth.high.sameAs(j.high, DateTime.Unit.MONTH).should.be.true

    ref = xy(test.dIvl.ends)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    i = x.toMonth.union(y.toMonth)
    j = y.toMonth.union(x.toMonth)

    y.toMonth.low.sameAs(i.low, DateTime.Unit.MONTH).should.be.true
    x.toMonth.high.sameAs(i.high, DateTime.Unit.MONTH).should.be.true
    y.toMonth.low.sameAs(j.low, DateTime.Unit.MONTH).should.be.true
    return x.toMonth.high.sameAs(j.high, DateTime.Unit.MONTH).should.be.true
  })

  return it('should throw when the argument is a point', () => {
    return expect(() => test.all2012.union(test.mid2012)).to.throw(Error)
  })
})

describe('DateTimeInterval.intersect', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intersect', () => {
    let [x, y] = xy(test.dIvl.sameAs)
    x.closed.intersect(y.closed).equals(x.closed).should.be.true
    x.closed.intersect(y.open).equals(y.open).should.be.true
    x.open.intersect(y.closed).equals(x.open).should.be.true
    x.open.intersect(y.open).equals(x.open).should.be.true
    y.closed.intersect(x.closed).equals(y.closed).should.be.true
    y.closed.intersect(x.open).equals(x.open).should.be.true
    y.open.intersect(x.closed).equals(y.open).should.be.true
    return y.open.intersect(x.open).equals(y.open).should.be.true
  })

  it('should properly calculate before/after intersect', () => {
    let [x, y] = xy(test.dIvl.before)
    expect(x.closed.intersect(y.closed)).to.not.exist
    expect(x.closed.intersect(y.open)).to.not.exist
    expect(x.open.intersect(y.closed)).to.not.exist
    expect(x.open.intersect(y.open)).to.not.exist
    expect(y.closed.intersect(x.closed)).to.not.exist
    expect(y.closed.intersect(x.open)).to.not.exist
    expect(y.open.intersect(x.closed)).to.not.exist
    return expect(y.open.intersect(x.open)).to.not.exist
  })

  it('should properly calculate meets intersect', () => {
    let [x, y] = xy(test.dIvl.meets)
    expect(x.closed.intersect(y.closed)).to.not.exist
    expect(x.closed.intersect(y.open)).to.not.exist
    expect(x.open.intersect(y.closed)).to.not.exist
    expect(x.open.intersect(y.open)).to.not.exist
    expect(y.closed.intersect(x.closed)).to.not.exist
    expect(y.closed.intersect(x.open)).to.not.exist
    expect(y.open.intersect(x.closed)).to.not.exist
    return expect(y.open.intersect(x.open)).to.not.exist
  })

  it('should properly calculate left/right overlapping intersect', () => {
    let [x, y] = xy(test.dIvl.overlaps)
    let a = test.julysept
    x.closed.intersect(y.closed).equals(a.closed).should.be.true
    x.closed.intersect(y.open).equals(a.openClosed).should.be.true
    x.open.intersect(y.closed).equals(a.closedOpen).should.be.true
    x.open.intersect(y.open).equals(a.open).should.be.true
    y.closed.intersect(x.closed).equals(a.closed).should.be.true
    y.closed.intersect(x.open).equals(a.closedOpen).should.be.true
    y.open.intersect(x.closed).equals(a.openClosed).should.be.true
    return y.open.intersect(x.open).equals(a.open).should.be.true
  })

  it('should properly calculate begins/begun by intersect', () => {
    let [x, y] = xy(test.dIvl.begins)
    x.closed.intersect(y.closed).equals(x.closed).should.be.true
    x.closed.intersect(y.open).equals(x.openClosed).should.be.true
    x.open.intersect(y.closed).equals(x.open).should.be.true
    x.open.intersect(y.open).equals(x.open).should.be.true
    y.closed.intersect(x.closed).equals(x.closed).should.be.true
    y.closed.intersect(x.open).equals(x.open).should.be.true
    y.open.intersect(x.closed).equals(x.openClosed).should.be.true
    return y.open.intersect(x.open).equals(x.open).should.be.true
  })

  it('should properly calculate includes/included by intersect', () => {
    let [x, y] = xy(test.dIvl.during)
    x.closed.intersect(y.closed).equals(x.closed).should.be.true
    x.closed.intersect(y.open).equals(x.closed).should.be.true
    x.open.intersect(y.closed).equals(x.open).should.be.true
    x.open.intersect(y.open).equals(x.open).should.be.true
    y.closed.intersect(x.closed).equals(x.closed).should.be.true
    y.closed.intersect(x.open).equals(x.open).should.be.true
    y.open.intersect(x.closed).equals(x.closed).should.be.true
    return y.open.intersect(x.open).equals(x.open).should.be.true
  })

  it('should properly calculate ends/ended by intersect', () => {
    let [x, y] = xy(test.dIvl.ends)
    x.closed.intersect(y.closed).equals(x.closed).should.be.true
    x.closed.intersect(y.open).equals(x.closedOpen).should.be.true
    x.open.intersect(y.closed).equals(x.open).should.be.true
    x.open.intersect(y.open).equals(x.open).should.be.true
    y.closed.intersect(x.closed).equals(x.closed).should.be.true
    y.closed.intersect(x.open).equals(x.open).should.be.true
    y.open.intersect(x.closed).equals(x.closedOpen).should.be.true
    return y.open.intersect(x.open).equals(x.open).should.be.true
  })

  it('should properly handle imprecision', () => {
    let x, y
    let ref = xy(test.dIvl.overlaps)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toDay.intersect(y.toDay).low.should.eql(y.toDay.low)
    x.toDay.intersect(y.toDay).high.should.eql(x.toDay.high)
    y.toDay.intersect(x.toDay).low.should.eql(y.toDay.low)
    y.toDay.intersect(x.toDay).high.should.eql(x.toDay.high)

    ref = xy(test.dIvl.meets)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toDay.intersect(y.toDay)).to.not.exist
    expect(y.toDay.intersect(x.toDay)).to.not.exist

    ref = xy(test.dIvl.during)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toDay.intersect(y.toDay).low.should.eql(x.toDay.low)
    x.toDay.intersect(y.toDay).high.should.eql(x.toDay.high)
    y.toDay.intersect(x.toDay).low.should.eql(x.toDay.low)
    y.toDay.intersect(x.toDay).high.should.eql(x.toDay.high)

    ref = xy(test.dIvl.ends)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toDay.intersect(y.toDay).low.should.eql(x.toDay.low)
    x.toDay.intersect(y.toDay).high.should.eql(x.toDay.high)
    y.toDay.intersect(x.toDay).low.should.eql(x.toDay.low)
    y.toDay.intersect(x.toDay).high.should.eql(x.toDay.high)

    ref = xy(test.dIvl.begins)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toDay.intersect(y.toDay).low.should.eql(x.toDay.low)
    x.toDay.intersect(y.toDay).high.should.eql(x.toDay.high)
    y.toDay.intersect(x.toDay).low.should.eql(x.toDay.low)
    return y.toDay.intersect(x.toDay).high.should.eql(x.toDay.high)
  })

  return it('should throw when the argument is a point', () => {
    return expect(() => test.all2012.intersect(DateTime.parse('2012-07-01T00:00:00.0'))).to.throw(Error)
  })
})

describe('DateTimeInterval.except', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs except', () => {
    let [x, y] = xy(test.dIvl.sameAs)
    expect(x.closed.except(y.closed)).to.not.exist
    expect(x.closed.except(y.open)).to.not.exist
    expect(x.open.except(y.closed)).to.not.exist
    expect(x.open.except(y.open)).to.not.exist
    expect(y.closed.except(x.closed)).to.not.exist
    expect(y.closed.except(x.open)).to.not.exist
    expect(y.open.except(x.closed)).to.not.exist
    return expect(y.open.except(x.open)).to.not.exist
  })

  it('should properly calculate before/after except', () => {
    let [x, y] = xy(test.dIvl.before)
    x.closed.except(y.closed).should.eql(x.closed)
    x.closed.except(y.open).should.eql(x.closed)
    x.open.except(y.closed).should.eql(x.open)
    x.open.except(y.open).should.eql(x.open)
    y.closed.except(x.closed).should.eql(y.closed)
    y.closed.except(x.open).should.eql(y.closed)
    y.open.except(x.closed).should.eql(y.open)
    return y.open.except(x.open).should.eql(y.open)
  })

  it('should properly calculate meets except', () => {
    let [x, y] = xy(test.dIvl.meets)
    x.closed.except(y.closed).should.eql(x.closed)
    x.closed.except(y.open).should.eql(x.closed)
    x.open.except(y.closed).should.eql(x.open)
    x.open.except(y.open).should.eql(x.open)
    y.closed.except(x.closed).should.eql(y.closed)
    y.closed.except(x.open).should.eql(y.closed)
    y.open.except(x.closed).should.eql(y.open)
    return y.open.except(x.open).should.eql(y.open)
  })

  it('should properly calculate left/right overlapping except', () => {
    let [x, y] = xy(test.dIvl.overlaps)
    let a = test.janjune
    let b = test.septdec
    x.closed.except(y.closed).equals(a.closedOpen).should.be.true
    x.closed.except(y.open).equals(a.closed).should.be.true
    x.open.except(y.closed).equals(a.open).should.be.true
    x.open.except(y.open).equals(a.openClosed).should.be.true
    y.closed.except(x.closed).equals(b.openClosed).should.be.true
    y.closed.except(x.open).equals(b.closed).should.be.true
    y.open.except(x.closed).equals(b.open).should.be.true
    return y.open.except(x.open).equals(b.closedOpen).should.be.true
  })

  it('should properly calculate begins/begun by except', () => {
    let [x, y] = xy(test.dIvl.begins)
    let b = test.julydec
    expect(x.closed.except(y.closed)).to.not.exist
    x.closed.except(y.open).should.eql(new Interval(x.closed.low, x.closed.low))
    expect(x.open.except(y.open)).to.not.exist
    y.closed.except(x.closed).equals(b.openClosed).should.be.true
    expect(y.closed.except(x.open)).to.not.exist
    y.open.except(x.closed).equals(b.open).should.be.true
    return y.open.except(x.open).equals(b.closedOpen).should.be.true
  })

  it('should properly calculate includes/included by except', () => {
    let [x, y] = xy(test.dIvl.during)
    expect(x.closed.except(y.closed)).to.not.exist
    expect(x.closed.except(y.open)).to.not.exist
    expect(x.open.except(y.closed)).to.not.exist
    expect(x.open.except(y.open)).to.not.exist
    expect(y.closed.except(x.closed)).to.not.exist
    expect(y.closed.except(x.open)).to.not.exist
    expect(y.open.except(x.closed)).to.not.exist
    return expect(y.open.except(x.open)).to.not.exist
  })

  it('should properly calculate ends/ended by except', () => {
    let [x, y] = xy(test.dIvl.ends)
    let b = test.janjuly
    expect(x.closed.except(y.closed)).to.not.exist
    x.closed.except(y.open).should.eql(new Interval(x.closed.high, x.closed.high))
    expect(x.open.except(y.closed)).to.not.exist
    expect(x.open.except(y.open)).to.not.exist
    y.closed.except(x.closed).equals(b.closedOpen).should.be.true
    expect(y.closed.except(x.open)).to.not.exist
    y.open.except(x.closed).equals(b.open).should.be.true
    return y.open.except(x.open).equals(b.openClosed).should.be.true
  })

  it('should properly handle imprecision', () => {
    let x, y
    let ref = xy(test.dIvl.overlaps)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toDay.except(y.toDay).low.should.eql(x.toDay.low)
    x.toDay.except(y.toDay).high.should.eql(y.toDay.low)
    y.toDay.except(x.toDay).low.should.eql(x.toDay.high)
    y.toDay.except(x.toDay).high.should.eql(y.toDay.high)

    ref = xy(test.dIvl.meets)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    // [a,b].except([b,c]) (where b is uncertain) should result in [a,b) but spec says we don't know if they overlap
    x.toDay.except(y.toDay).should.eql(x.toDay)
    // [b,c].except([a,b]) (where b is uncertain) should result in (b,c] but spec says we don't know if they overlap
    y.toDay.except(x.toDay).should.eql(y.toDay)

    ref = xy(test.dIvl.during)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toDay.except(y.toDay)).to.not.exist
    expect(y.toDay.except(x.toDay)).to.not.exist

    ref = xy(test.dIvl.ends)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toDay.except(y.toDay)).to.not.exist
    expect(x.toDay.except(y.toDay)).to.not.exist
    // x: ['2012-07-01', '2012-12-31']
    // y: ['2012-01-01', '2012-12-31']
    // test is a tricky one, but it really is null because of the imprecision on
    // the interval highs.  Interval y might properly include interval x.
    expect(y.toDay.except(x.toDay)).to.not.exist

    ref = xy(test.dIvl.begins)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toDay.except(y.toDay)).to.not.exist
    expect(x.toDay.except(y.toDay)).to.not.exist
    // x: ['2012-01-01', '2012-07-01']
    // y: ['2012-01-01', '2012-12-31']
    // test is a tricky one, but it really is null because of the imprecision on
    // the interval lows.  Interval y might properly include interval x.
    return expect(y.toDay.except(x.toDay)).to.not.exist
  })

  return it('should throw when the argument is a point', () => {
    return expect(() => test.all2012.except(DateTime.parse('2012-07-01T00:00:00.0'))).to.throw(Error)
  })
})
