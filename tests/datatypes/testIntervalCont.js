/* global describe it beforeEach */
import setup from './intervalSetup'
import { Interval, Uncertainty } from '../../src/cql'
import chai from 'chai'
chai.should()
let expect = chai.expect

const xy = obj => [obj.x, obj.y]

describe('DateTimeInterval.after', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.dIvl.sameAs)
    x.closed.after(y.closed).should.be.false
    x.closed.after(y.open).should.be.false
    x.open.after(y.closed).should.be.false
    x.open.after(y.open).should.be.false
    y.closed.after(x.closed).should.be.false
    y.closed.after(x.open).should.be.false
    y.open.after(x.closed).should.be.false
    return y.open.after(x.open).should.be.false
  })

  it('should properly calculate before/after intervals', () => {
    let [x, y] = xy(test.dIvl.before)
    x.closed.after(y.closed).should.be.false
    x.closed.after(y.open).should.be.false
    x.open.after(y.closed).should.be.false
    x.open.after(y.open).should.be.false
    y.closed.after(x.closed).should.be.true
    y.closed.after(x.open).should.be.true
    y.open.after(x.closed).should.be.true
    return y.open.after(x.open).should.be.true
  })

  it('should properly calculate meets intervals', () => {
    let [x, y] = xy(test.dIvl.meets)
    x.closed.after(y.closed).should.be.false
    x.closed.after(y.open).should.be.false
    x.open.after(y.closed).should.be.false
    x.open.after(y.open).should.be.false
    y.closed.after(x.closed).should.be.true
    y.closed.after(x.open).should.be.true
    y.open.after(x.closed).should.be.true
    return y.open.after(x.open).should.be.true
  })

  it('should properly calculate left/right overlapping intervals', () => {
    let [x, y] = xy(test.dIvl.overlaps)
    x.closed.after(y.closed).should.be.false
    x.closed.after(y.open).should.be.false
    x.open.after(y.closed).should.be.false
    x.open.after(y.open).should.be.false
    y.closed.after(x.closed).should.be.false
    y.closed.after(x.open).should.be.false
    y.open.after(x.closed).should.be.false
    return y.open.after(x.open).should.be.false
  })

  it('should properly calculate begins/begun by intervals', () => {
    let [x, y] = xy(test.dIvl.begins)
    x.closed.after(y.closed).should.be.false
    x.closed.after(y.open).should.be.false
    x.open.after(y.closed).should.be.false
    x.open.after(y.open).should.be.false
    y.closed.after(x.closed).should.be.false
    y.closed.after(x.open).should.be.false
    y.open.after(x.closed).should.be.false
    return y.open.after(x.open).should.be.false
  })

  it('should properly calculate includes/included by intervals', () => {
    let [x, y] = xy(test.dIvl.during)
    x.closed.after(y.closed).should.be.false
    x.closed.after(y.open).should.be.false
    x.open.after(y.closed).should.be.false
    x.open.after(y.open).should.be.false
    y.closed.after(x.closed).should.be.false
    y.closed.after(x.open).should.be.false
    y.open.after(x.closed).should.be.false
    return y.open.after(x.open).should.be.false
  })

  it('should properly calculate ends/ended by intervals', () => {
    let [x, y] = xy(test.dIvl.ends)
    x.closed.after(y.closed).should.be.false
    x.closed.after(y.open).should.be.false
    x.open.after(y.closed).should.be.false
    x.open.after(y.open).should.be.false
    y.closed.after(x.closed).should.be.false
    y.closed.after(x.open).should.be.false
    y.open.after(x.closed).should.be.false
    return y.open.after(x.open).should.be.false
  })

  return it('should properly handle imprecision', () => {
    let x, y
    let ref = xy(test.dIvl.sameAs)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.closed.after(y.toMinute).should.be.false
    x.toHour.after(y.toMinute).should.be.false

    ref = xy(test.dIvl.before)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.after(y.toMonth).should.be.false
    x.toYear.after(y.closed).should.be.false
    expect(y.toYear.after(x.closed)).to.not.exist

    ref = xy(test.dIvl.meets)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.after(y.toMonth).should.be.false
    x.toYear.after(y.closed).should.be.false
    expect(y.toYear.after(x.closed)).to.not.exist

    ref = xy(test.dIvl.overlaps)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.after(y.toMonth).should.be.false
    x.toYear.after(y.closed).should.be.false
    expect(y.toYear.after(x.closed)).to.not.exist

    ref = xy(test.dIvl.begins)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMinute.after(y.toMinute).should.be.false
    x.toYear.after(y.closed).should.be.false
    expect(y.toYear.after(x.closed)).to.not.exist

    ref = xy(test.dIvl.during)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.after(y.toMonth).should.be.false
    y.toMonth.after(x.toMonth).should.be.false
    x.toYear.after(y.closed).should.be.false
    expect(y.toYear.after(x.closed)).to.not.exist

    ref = xy(test.dIvl.ends)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMinute.after(y.toMinute).should.be.false
    x.toYear.after(y.closed).should.be.false
    return x.toYear.after(x.closed).should.be.false
  })
})

describe('DateTimeInterval.before', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.dIvl.sameAs)
    x.closed.before(y.closed).should.be.false
    x.closed.before(y.open).should.be.false
    x.open.before(y.closed).should.be.false
    x.open.before(y.open).should.be.false
    y.closed.before(x.closed).should.be.false
    y.closed.before(x.open).should.be.false
    y.open.before(x.closed).should.be.false
    return y.open.before(x.open).should.be.false
  })

  it('should properly calculate before/after intervals', () => {
    let [x, y] = xy(test.dIvl.before)
    x.closed.before(y.closed).should.be.true
    x.closed.before(y.open).should.be.true
    x.open.before(y.closed).should.be.true
    x.open.before(y.open).should.be.true
    y.closed.before(x.closed).should.be.false
    y.closed.before(x.open).should.be.false
    y.open.before(x.closed).should.be.false
    return y.open.before(x.open).should.be.false
  })

  it('should properly calculate meets intervals', () => {
    let [x, y] = xy(test.dIvl.meets)
    x.closed.before(y.closed).should.be.true
    x.closed.before(y.open).should.be.true
    x.open.before(y.closed).should.be.true
    x.open.before(y.open).should.be.true
    y.closed.before(x.closed).should.be.false
    y.closed.before(x.open).should.be.false
    y.open.before(x.closed).should.be.false
    return y.open.before(x.open).should.be.false
  })

  it('should properly calculate left/right overlapping intervals', () => {
    let [x, y] = xy(test.dIvl.overlaps)
    x.closed.before(y.closed).should.be.false
    x.closed.before(y.open).should.be.false
    x.open.before(y.closed).should.be.false
    x.open.before(y.open).should.be.false
    y.closed.before(x.closed).should.be.false
    y.closed.before(x.open).should.be.false
    y.open.before(x.closed).should.be.false
    return y.open.before(x.open).should.be.false
  })

  it('should properly calculate begins/begun by intervals', () => {
    let [x, y] = xy(test.dIvl.begins)
    x.closed.before(y.closed).should.be.false
    x.closed.before(y.open).should.be.false
    x.open.before(y.closed).should.be.false
    x.open.before(y.open).should.be.false
    y.closed.before(x.closed).should.be.false
    y.closed.before(x.open).should.be.false
    y.open.before(x.closed).should.be.false
    return y.open.before(x.open).should.be.false
  })

  it('should properly calculate includes/included by intervals', () => {
    let [x, y] = xy(test.dIvl.during)
    x.closed.before(y.closed).should.be.false
    x.closed.before(y.open).should.be.false
    x.open.before(y.closed).should.be.false
    x.open.before(y.open).should.be.false
    y.closed.before(x.closed).should.be.false
    y.closed.before(x.open).should.be.false
    y.open.before(x.closed).should.be.false
    return y.open.before(x.open).should.be.false
  })

  it('should properly calculate ends/ended by intervals', () => {
    let [x, y] = xy(test.dIvl.ends)
    x.closed.before(y.closed).should.be.false
    x.closed.before(y.open).should.be.false
    x.open.before(y.closed).should.be.false
    x.open.before(y.open).should.be.false
    y.closed.before(x.closed).should.be.false
    y.closed.before(x.open).should.be.false
    y.open.before(x.closed).should.be.false
    return y.open.before(x.open).should.be.false
  })

  return it('should properly handle imprecision', () => {
    let x, y
    let ref = xy(test.dIvl.sameAs)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.closed.before(y.toMinute).should.be.false
    x.toHour.before(y.toMinute).should.be.false

    ref = xy(test.dIvl.before)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.before(y.toMonth).should.be.true
    y.toYear.before(x.closed).should.be.false
    expect(x.toYear.before(y.closed)).to.not.exist

    ref = xy(test.dIvl.meets)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.before(y.toMonth).should.be.true
    y.toYear.before(x.closed).should.be.false
    expect(x.toYear.before(y.closed)).to.not.exist

    ref = xy(test.dIvl.overlaps)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.before(y.toMonth).should.be.false
    y.toYear.before(x.closed).should.be.false
    expect(x.toYear.before(y.closed)).not.exist

    ref = xy(test.dIvl.begins)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMinute.before(y.toMinute).should.be.false
    y.toYear.before(x.closed).should.be.false
    x.toYear.before(y.closed).should.be.false

    ref = xy(test.dIvl.during)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.before(y.toMonth).should.be.false
    y.toMonth.before(x.toMonth).should.be.false
    expect(y.toYear.before(x.closed)).not.exist
    x.toYear.before(y.closed).should.be.false

    ref = xy(test.dIvl.ends)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMinute.before(y.toMinute).should.be.false
    expect(y.toYear.before(x.closed)).not.exist
    return x.toYear.before(y.closed).should.be.false
  })
})

describe('DateTimeInterval.meets', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.dIvl.sameAs)
    x.closed.meets(y.closed).should.be.false
    x.closed.meets(y.open).should.be.false
    x.open.meets(y.closed).should.be.false
    x.open.meets(y.open).should.be.false
    y.closed.meets(x.closed).should.be.false
    y.closed.meets(x.open).should.be.false
    y.open.meets(x.closed).should.be.false
    return y.open.meets(x.open).should.be.false
  })

  it('should properly calculate before/after intervals', () => {
    let [x, y] = xy(test.dIvl.before)
    x.closed.meets(y.closed).should.be.false
    x.closed.meets(y.open).should.be.false
    x.open.meets(y.closed).should.be.false
    x.open.meets(y.open).should.be.false
    y.closed.meets(x.closed).should.be.false
    y.closed.meets(x.open).should.be.false
    y.open.meets(x.closed).should.be.false
    return y.open.meets(x.open).should.be.false
  })

  it('should properly calculate meets intervals', () => {
    let [x, y] = xy(test.dIvl.meets)
    x.closed.meets(y.closed).should.be.true
    x.closed.meets(y.open).should.be.false
    x.open.meets(y.closed).should.be.false
    x.open.meets(y.open).should.be.false
    y.closed.meets(x.closed).should.be.true
    y.closed.meets(x.open).should.be.false
    y.open.meets(x.closed).should.be.false
    return y.open.meets(x.open).should.be.false
  })

  it('should properly calculate left/right overlapping intervals', () => {
    let [x, y] = xy(test.dIvl.overlaps)
    x.closed.meets(y.closed).should.be.false
    x.closed.meets(y.open).should.be.false
    x.open.meets(y.closed).should.be.false
    x.open.meets(y.open).should.be.false
    y.closed.meets(x.closed).should.be.false
    y.closed.meets(x.open).should.be.false
    y.open.meets(x.closed).should.be.false
    return y.open.meets(x.open).should.be.false
  })

  it('should properly calculate begins/begun by intervals', () => {
    let [x, y] = xy(test.dIvl.begins)
    x.closed.meets(y.closed).should.be.false
    x.closed.meets(y.open).should.be.false
    x.open.meets(y.closed).should.be.false
    x.open.meets(y.open).should.be.false
    y.closed.meets(x.closed).should.be.false
    y.closed.meets(x.open).should.be.false
    y.open.meets(x.closed).should.be.false
    return y.open.meets(x.open).should.be.false
  })

  it('should properly calculate includes/included by intervals', () => {
    let [x, y] = xy(test.dIvl.during)
    x.closed.meets(y.closed).should.be.false
    x.closed.meets(y.open).should.be.false
    x.open.meets(y.closed).should.be.false
    x.open.meets(y.open).should.be.false
    y.closed.meets(x.closed).should.be.false
    y.closed.meets(x.open).should.be.false
    y.open.meets(x.closed).should.be.false
    return y.open.meets(x.open).should.be.false
  })

  it('should properly calculate ends/ended by intervals', () => {
    let [x, y] = xy(test.dIvl.ends)
    x.closed.meets(y.closed).should.be.false
    x.closed.meets(y.open).should.be.false
    x.open.meets(y.closed).should.be.false
    x.open.meets(y.open).should.be.false
    y.closed.meets(x.closed).should.be.false
    y.closed.meets(x.open).should.be.false
    y.open.meets(x.closed).should.be.false
    return y.open.meets(x.open).should.be.false
  })

  return it('should properly handle imprecision', () => {
    let x, y
    let ref = xy(test.dIvl.sameAs)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.closed.meets(y.toMinute).should.be.false
    x.toHour.meets(y.toMinute).should.be.false

    ref = xy(test.dIvl.before)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.meets(y.toMonth).should.be.false
    expect(x.toYear.meets(y.closed)).to.not.exist

    ref = xy(test.dIvl.meets)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toMonth.meets(y.toMonth)).to.not.exist
    expect(x.toYear.meets(y.closed)).to.not.exist

    ref = xy(test.dIvl.overlaps)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.meets(y.toMonth).should.be.false
    expect(x.toYear.meets(y.closed)).to.not.exist

    ref = xy(test.dIvl.begins)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMinute.meets(y.toMinute).should.be.false
    x.toYear.meets(y.closed).should.be.false

    ref = xy(test.dIvl.during)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.meets(y.toMonth).should.be.false
    y.toMonth.meets(x.toMonth).should.be.false
    x.toYear.meets(y.closed).should.be.false

    ref = xy(test.dIvl.ends)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMinute.meets(y.toMinute).should.be.false
    return x.toYear.meets(y.closed).should.be.false
  })
})

describe('DateTimeInterval.meetsAfter', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.dIvl.sameAs)
    x.closed.meetsAfter(y.closed).should.be.false
    x.closed.meetsAfter(y.open).should.be.false
    x.open.meetsAfter(y.closed).should.be.false
    x.open.meetsAfter(y.open).should.be.false
    y.closed.meetsAfter(x.closed).should.be.false
    y.closed.meetsAfter(x.open).should.be.false
    y.open.meetsAfter(x.closed).should.be.false
    return y.open.meetsAfter(x.open).should.be.false
  })

  it('should properly calculate before/after intervals', () => {
    let [x, y] = xy(test.dIvl.before)
    x.closed.meetsAfter(y.closed).should.be.false
    x.closed.meetsAfter(y.open).should.be.false
    x.open.meetsAfter(y.closed).should.be.false
    x.open.meetsAfter(y.open).should.be.false
    y.closed.meetsAfter(x.closed).should.be.false
    y.closed.meetsAfter(x.open).should.be.false
    y.open.meetsAfter(x.closed).should.be.false
    return y.open.meetsAfter(x.open).should.be.false
  })

  it('should properly calculate meets intervals', () => {
    let [x, y] = xy(test.dIvl.meets)
    x.closed.meetsAfter(y.closed).should.be.false
    x.closed.meetsAfter(y.open).should.be.false
    x.open.meetsAfter(y.closed).should.be.false
    x.open.meetsAfter(y.open).should.be.false
    y.closed.meetsAfter(x.closed).should.be.true
    y.closed.meetsAfter(x.open).should.be.false
    y.open.meetsAfter(x.closed).should.be.false
    return y.open.meetsAfter(x.open).should.be.false
  })

  it('should properly calculate left/right overlapping intervals', () => {
    let [x, y] = xy(test.dIvl.overlaps)
    x.closed.meetsAfter(y.closed).should.be.false
    x.closed.meetsAfter(y.open).should.be.false
    x.open.meetsAfter(y.closed).should.be.false
    x.open.meetsAfter(y.open).should.be.false
    y.closed.meetsAfter(x.closed).should.be.false
    y.closed.meetsAfter(x.open).should.be.false
    y.open.meetsAfter(x.closed).should.be.false
    return y.open.meetsAfter(x.open).should.be.false
  })

  it('should properly calculate begins/begun by intervals', () => {
    let [x, y] = xy(test.dIvl.begins)
    x.closed.meetsAfter(y.closed).should.be.false
    x.closed.meetsAfter(y.open).should.be.false
    x.open.meetsAfter(y.closed).should.be.false
    x.open.meetsAfter(y.open).should.be.false
    y.closed.meetsAfter(x.closed).should.be.false
    y.closed.meetsAfter(x.open).should.be.false
    y.open.meetsAfter(x.closed).should.be.false
    return y.open.meetsAfter(x.open).should.be.false
  })

  it('should properly calculate includes/included by intervals', () => {
    let [x, y] = xy(test.dIvl.during)
    x.closed.meetsAfter(y.closed).should.be.false
    x.closed.meetsAfter(y.open).should.be.false
    x.open.meetsAfter(y.closed).should.be.false
    x.open.meetsAfter(y.open).should.be.false
    y.closed.meetsAfter(x.closed).should.be.false
    y.closed.meetsAfter(x.open).should.be.false
    y.open.meetsAfter(x.closed).should.be.false
    return y.open.meetsAfter(x.open).should.be.false
  })

  it('should properly calculate ends/ended by intervals', () => {
    let [x, y] = xy(test.dIvl.ends)
    x.closed.meetsAfter(y.closed).should.be.false
    x.closed.meetsAfter(y.open).should.be.false
    x.open.meetsAfter(y.closed).should.be.false
    x.open.meetsAfter(y.open).should.be.false
    y.closed.meetsAfter(x.closed).should.be.false
    y.closed.meetsAfter(x.open).should.be.false
    y.open.meetsAfter(x.closed).should.be.false
    return y.open.meetsAfter(x.open).should.be.false
  })

  return it('should properly handle imprecision', () => {
    let x, y
    let ref = xy(test.dIvl.sameAs)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.closed.meetsAfter(y.toMinute).should.be.false
    x.toHour.meetsAfter(y.toMinute).should.be.false

    ref = xy(test.dIvl.before)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.meetsAfter(y.toMonth).should.be.false
    x.toYear.meetsAfter(y.closed).should.be.false
    expect(y.toYear.meetsAfter(x.closed)).to.not.exist

    ref = xy(test.dIvl.meets)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.meetsAfter(y.toMonth).should.be.false
    expect(y.toMonth.meetsAfter(x.toMonth)).to.not.exist
    x.toYear.meetsAfter(y.closed).should.be.false
    expect(y.toYear.meetsAfter(x.closed)).to.not.exist

    ref = xy(test.dIvl.overlaps)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.meetsAfter(y.toMonth).should.be.false
    x.toYear.meetsAfter(y.closed).should.be.false
    expect(y.toYear.meetsAfter(x.closed)).to.not.exist

    ref = xy(test.dIvl.begins)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMinute.meetsAfter(y.toMinute).should.be.false
    x.toYear.meetsAfter(y.closed).should.be.false

    ref = xy(test.dIvl.during)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.meetsAfter(y.toMonth).should.be.false
    y.toMonth.meetsAfter(x.toMonth).should.be.false
    x.toYear.meetsAfter(y.closed).should.be.false

    ref = xy(test.dIvl.ends)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMinute.meetsAfter(y.toMinute).should.be.false
    return x.toYear.meetsAfter(y.closed).should.be.false
  })
})

describe('DateTimeInterval.meetsBefore', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.dIvl.sameAs)
    x.closed.meetsBefore(y.closed).should.be.false
    x.closed.meetsBefore(y.open).should.be.false
    x.open.meetsBefore(y.closed).should.be.false
    x.open.meetsBefore(y.open).should.be.false
    y.closed.meetsBefore(x.closed).should.be.false
    y.closed.meetsBefore(x.open).should.be.false
    y.open.meetsBefore(x.closed).should.be.false
    return y.open.meetsBefore(x.open).should.be.false
  })

  it('should properly calculate before/after intervals', () => {
    let [x, y] = xy(test.dIvl.before)
    x.closed.meetsBefore(y.closed).should.be.false
    x.closed.meetsBefore(y.open).should.be.false
    x.open.meetsBefore(y.closed).should.be.false
    x.open.meetsBefore(y.open).should.be.false
    y.closed.meetsBefore(x.closed).should.be.false
    y.closed.meetsBefore(x.open).should.be.false
    y.open.meetsBefore(x.closed).should.be.false
    return y.open.meetsBefore(x.open).should.be.false
  })

  it('should properly calculate meets intervals', () => {
    let [x, y] = xy(test.dIvl.meets)
    x.closed.meetsBefore(y.closed).should.be.true
    x.closed.meetsBefore(y.open).should.be.false
    x.open.meetsBefore(y.closed).should.be.false
    x.open.meetsBefore(y.open).should.be.false
    y.closed.meetsBefore(x.closed).should.be.false
    y.closed.meetsBefore(x.open).should.be.false
    y.open.meetsBefore(x.closed).should.be.false
    return y.open.meetsBefore(x.open).should.be.false
  })

  it('should properly calculate left/right overlapping intervals', () => {
    let [x, y] = xy(test.dIvl.overlaps)
    x.closed.meetsBefore(y.closed).should.be.false
    x.closed.meetsBefore(y.open).should.be.false
    x.open.meetsBefore(y.closed).should.be.false
    x.open.meetsBefore(y.open).should.be.false
    y.closed.meetsBefore(x.closed).should.be.false
    y.closed.meetsBefore(x.open).should.be.false
    y.open.meetsBefore(x.closed).should.be.false
    return y.open.meetsBefore(x.open).should.be.false
  })

  it('should properly calculate begins/begun by intervals', () => {
    let [x, y] = xy(test.dIvl.begins)
    x.closed.meetsBefore(y.closed).should.be.false
    x.closed.meetsBefore(y.open).should.be.false
    x.open.meetsBefore(y.closed).should.be.false
    x.open.meetsBefore(y.open).should.be.false
    y.closed.meetsBefore(x.closed).should.be.false
    y.closed.meetsBefore(x.open).should.be.false
    y.open.meetsBefore(x.closed).should.be.false
    return y.open.meetsBefore(x.open).should.be.false
  })

  it('should properly calculate includes/included by intervals', () => {
    let [x, y] = xy(test.dIvl.during)
    x.closed.meetsBefore(y.closed).should.be.false
    x.closed.meetsBefore(y.open).should.be.false
    x.open.meetsBefore(y.closed).should.be.false
    x.open.meetsBefore(y.open).should.be.false
    y.closed.meetsBefore(x.closed).should.be.false
    y.closed.meetsBefore(x.open).should.be.false
    y.open.meetsBefore(x.closed).should.be.false
    return y.open.meetsBefore(x.open).should.be.false
  })

  it('should properly calculate ends/ended by intervals', () => {
    let [x, y] = xy(test.dIvl.ends)
    x.closed.meetsBefore(y.closed).should.be.false
    x.closed.meetsBefore(y.open).should.be.false
    x.open.meetsBefore(y.closed).should.be.false
    x.open.meetsBefore(y.open).should.be.false
    y.closed.meetsBefore(x.closed).should.be.false
    y.closed.meetsBefore(x.open).should.be.false
    y.open.meetsBefore(x.closed).should.be.false
    return y.open.meetsBefore(x.open).should.be.false
  })

  return it('should properly handle imprecision', () => {
    let x, y
    let ref = xy(test.dIvl.sameAs)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.closed.meetsBefore(y.toMinute).should.be.false
    x.toHour.meetsBefore(y.toMinute).should.be.false

    ref = xy(test.dIvl.before)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.meetsBefore(y.toMonth).should.be.false
    expect(x.toYear.meetsBefore(y.closed)).to.not.exist

    ref = xy(test.dIvl.meets)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    expect(x.toMonth.meetsBefore(y.toMonth)).to.not.exist
    expect(x.toYear.meetsBefore(y.closed)).to.not.exist

    ref = xy(test.dIvl.overlaps)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.meetsBefore(y.toMonth).should.be.false
    expect(x.toYear.meetsBefore(y.closed)).to.not.exist

    ref = xy(test.dIvl.begins)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMinute.meetsBefore(y.toMinute).should.be.false
    x.toYear.meetsBefore(y.closed).should.be.false

    ref = xy(test.dIvl.during)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMonth.meetsBefore(y.toMonth).should.be.false
    y.toMonth.meetsBefore(x.toMonth).should.be.false
    x.toYear.meetsBefore(y.closed).should.be.false

    ref = xy(test.dIvl.ends)
    x = ref[0], y = ref[1] // eslint-disable-line no-sequences
    x.toMinute.meetsBefore(y.toMinute).should.be.false
    return x.toYear.meetsBefore(y.closed).should.be.false
  })
})

describe('IntegerInterval.contains', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate integers less than it', () => {
    return test.zeroToHundred.closed.contains(-5).should.be.false
  })

  it('should properly calculate the left boundary integer', () => {
    test.zeroToHundred.closed.contains(0).should.be.true
    return test.zeroToHundred.open.contains(0).should.be.false
  })

  it('should properly calculate integers in the middle of it', () => {
    return test.zeroToHundred.closed.contains(50).should.be.true
  })

  it('should properly calculate the right boundary integer', () => {
    test.zeroToHundred.closed.contains(100).should.be.true
    return test.zeroToHundred.open.contains(100).should.be.false
  })

  it('should properly calculate integers greater than it', () => {
    return test.zeroToHundred.closed.contains(105).should.be.false
  })

  it('should properly handle null endpoints', () => {
    new Interval(null, 0).contains(-123456789).should.be.true
    new Interval(null, 0).contains(1).should.be.false
    new Interval(null, 0, false, true).contains(0).should.be.true
    expect(new Interval(null, 0, false, true).contains(-123456789)).to.be.null
    new Interval(null, 0, false, true).contains(1).should.be.false
    new Interval(0, null).contains(123456789).should.be.true
    new Interval(0, null).contains(-1).should.be.false
    new Interval(0, null, true, false).contains(0).should.be.true
    expect(new Interval(0, null, true, false).contains(123456789)).to.be.null
    return new Interval(0, null, true, false).contains(-1).should.be.false
  })

  it('should properly handle imprecision', () => {
    test.zeroToHundred.closed.contains(new Uncertainty(-20, -10)).should.be.false
    expect(test.zeroToHundred.closed.contains(new Uncertainty(-20, 20))).to.not.exist
    test.zeroToHundred.closed.contains(new Uncertainty(0, 100)).should.be.true
    expect(test.zeroToHundred.closed.contains(new Uncertainty(80, 120))).to.not.exist
    test.zeroToHundred.closed.contains(new Uncertainty(120, 140)).should.be.false
    expect(test.zeroToHundred.closed.contains(new Uncertainty(-20, 120))).to.not.exist

    let uIvl = new Interval(new Uncertainty(5, 10), new Uncertainty(15, 20))

    uIvl.contains(0).should.be.false
    expect(uIvl.contains(5)).to.not.exist
    expect(uIvl.contains(6)).to.not.exist
    uIvl.contains(10).should.be.true
    uIvl.contains(12).should.be.true
    uIvl.contains(15).should.be.true
    expect(uIvl.contains(16)).to.not.exist
    expect(uIvl.contains(20)).not.exist
    uIvl.contains(25).should.be.false

    uIvl.contains(new Uncertainty(0, 4)).should.be.false
    expect(uIvl.contains(new Uncertainty(0, 5))).to.not.exist
    expect(uIvl.contains(new Uncertainty(5, 10))).to.not.exist
    uIvl.contains(new Uncertainty(10, 15)).should.be.true
    expect(uIvl.contains(new Uncertainty(15, 20))).to.not.exist
    expect(uIvl.contains(new Uncertainty(20, 25))).to.not.exist
    return uIvl.contains(new Uncertainty(25, 30)).should.be.false
  })

  return it('should throw when the argument is an interval', () => {
    return expect(() => test.zeroToHundred.closed.contains(new Interval(5, 10))).to.throw(Error)
  })
})

describe('IntegerInterval.includes', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.iIvl.sameAs)
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
    let [x, y] = xy(test.iIvl.before)
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
    let [x, y] = xy(test.iIvl.meets)
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
    let [x, y] = xy(test.iIvl.overlaps)
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
    let [x, y] = xy(test.iIvl.begins)
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
    let [x, y] = xy(test.iIvl.during)
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
    let [x, y] = xy(test.iIvl.ends)
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
    let uIvl = new Interval(new Uncertainty(5, 10), new Uncertainty(15, 20))
    let ivl = new Interval(0, 100)
    ivl.includes(uIvl).should.be.true
    uIvl.includes(ivl).should.be.false

    ivl = new Interval(-100, 0)
    ivl.includes(uIvl).should.be.false
    uIvl.includes(ivl).should.be.false

    ivl = new Interval(10, 15)
    expect(ivl.includes(uIvl)).to.not.exist
    uIvl.includes(ivl).should.be.true

    ivl = new Interval(5, 20)
    ivl.includes(uIvl).should.be.true
    expect(uIvl.includes(ivl)).to.not.exist

    return expect(uIvl.includes(uIvl)).to.not.exist
  })

  return it('should throw when the argument is a point', () => {
    return expect(() => test.zeroToHundred.closed.includes(50)).to.throw(Error)
  })
})

describe('IntegerInterval.includedIn', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.iIvl.sameAs)
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
    let [x, y] = xy(test.iIvl.before)
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
    let [x, y] = xy(test.iIvl.meets)
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
    let [x, y] = xy(test.iIvl.overlaps)
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
    let [x, y] = xy(test.iIvl.begins)
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
    let [x, y] = xy(test.iIvl.during)
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
    let [x, y] = xy(test.iIvl.ends)
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
    let uIvl = new Interval(new Uncertainty(5, 10), new Uncertainty(15, 20))
    let ivl = new Interval(0, 100)
    ivl.includedIn(uIvl).should.be.false
    uIvl.includedIn(ivl).should.be.true

    ivl = new Interval(-100, 0)
    ivl.includedIn(uIvl).should.be.false
    uIvl.includedIn(ivl).should.be.false

    ivl = new Interval(10, 15)
    ivl.includedIn(uIvl).should.be.true
    expect(uIvl.includedIn(ivl)).to.not.exist

    ivl = new Interval(5, 20)
    expect(ivl.includedIn(uIvl)).to.not.exist
    uIvl.includedIn(ivl).should.be.true

    return expect(uIvl.includedIn(uIvl)).to.not.exist
  })

  return it('should throw when the argument is a point', () => {
    return expect(() => test.zeroToHundred.closed.includedIn(50)).to.throw(Error)
  })
})

describe('IntegerInterval.overlaps(IntegerInterval)', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.iIvl.sameAs)
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
    let [x, y] = xy(test.iIvl.before)
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
    let [x, y] = xy(test.iIvl.meets)
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
    let [x, y] = xy(test.iIvl.overlaps)
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
    let [x, y] = xy(test.iIvl.begins)
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
    let [x, y] = xy(test.iIvl.during)
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
    let [x, y] = xy(test.iIvl.ends)
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
    let uIvl = new Interval(new Uncertainty(5, 10), new Uncertainty(15, 20))
    let ivl = new Interval(0, 100)
    ivl.overlaps(uIvl).should.be.true
    uIvl.overlaps(ivl).should.be.true

    ivl = new Interval(-100, 0)
    ivl.overlaps(uIvl).should.be.false
    uIvl.overlaps(ivl).should.be.false

    ivl = new Interval(10, 15)
    ivl.overlaps(uIvl).should.be.true
    uIvl.overlaps(ivl).should.be.true

    ivl = new Interval(5, 20)
    ivl.overlaps(uIvl).should.be.true
    uIvl.overlaps(ivl).should.be.true

    return uIvl.overlaps(uIvl).should.be.true
  })
})

describe('IntegerInterval.overlaps(Integer)', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate integers less than it', () => {
    return test.zeroToHundred.closed.overlaps(-5).should.be.false
  })

  it('should properly calculate the left boundary integer', () => {
    test.zeroToHundred.closed.overlaps(0).should.be.true
    return test.zeroToHundred.open.overlaps(0).should.be.false
  })

  it('should properly calculate integers in the middle of it', () => {
    return test.zeroToHundred.closed.overlaps(50).should.be.true
  })

  it('should properly calculate the right boundary integer', () => {
    test.zeroToHundred.closed.overlaps(100).should.be.true
    return test.zeroToHundred.open.overlaps(100).should.be.false
  })

  it('should properly calculate integers greater than it', () => {
    return test.zeroToHundred.closed.overlaps(105).should.be.false
  })

  return it('should properly handle imprecision', () => {
    test.zeroToHundred.closed.overlaps(new Uncertainty(-20, -10)).should.be.false
    expect(test.zeroToHundred.closed.overlaps(new Uncertainty(-20, 20))).to.not.exist
    test.zeroToHundred.closed.overlaps(new Uncertainty(0, 100)).should.be.true
    expect(test.zeroToHundred.closed.overlaps(new Uncertainty(80, 120))).to.not.exist
    test.zeroToHundred.closed.overlaps(new Uncertainty(120, 140)).should.be.false
    expect(test.zeroToHundred.closed.overlaps(new Uncertainty(-20, 120))).to.not.exist

    let uIvl = new Interval(new Uncertainty(5, 10), new Uncertainty(15, 20))

    uIvl.overlaps(0).should.be.false
    expect(uIvl.overlaps(5)).to.not.exist
    expect(uIvl.overlaps(6)).to.not.exist
    uIvl.overlaps(10).should.be.true
    uIvl.overlaps(12).should.be.true
    uIvl.overlaps(15).should.be.true
    expect(uIvl.overlaps(16)).to.not.exist
    expect(uIvl.overlaps(20)).to.not.exist
    uIvl.overlaps(25).should.be.false

    uIvl.overlaps(new Uncertainty(0, 4)).should.be.false
    expect(uIvl.overlaps(new Uncertainty(0, 5))).to.not.exist
    expect(uIvl.overlaps(new Uncertainty(5, 10))).to.not.exist
    uIvl.overlaps(new Uncertainty(10, 15)).should.be.true
    expect(uIvl.overlaps(new Uncertainty(15, 20))).to.not.exist
    expect(uIvl.overlaps(new Uncertainty(20, 25))).to.not.exist
    return uIvl.overlaps(new Uncertainty(25, 30)).should.be.false
  })
})

describe('IntegerInterval.equals', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.iIvl.sameAs)
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
    let [x, y] = xy(test.iIvl.before)
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
    let [x, y] = xy(test.iIvl.meets)
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
    let [x, y] = xy(test.iIvl.overlaps)
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
    let [x, y] = xy(test.iIvl.begins)
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
    let [x, y] = xy(test.iIvl.during)
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
    let [x, y] = xy(test.iIvl.ends)
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
    let c2c5 = new Interval(2, 5, true, true)
    let o2c5 = new Interval(2, 5, false, true)
    let c2o5 = new Interval(2, 5, true, false)
    let o2o5 = new Interval(2, 5, false, false)
    let c1c6 = new Interval(1, 6, true, true)
    let o1c6 = new Interval(1, 6, false, true)
    let c1o6 = new Interval(1, 6, true, false)
    let o1o6 = new Interval(1, 6, false, false)

    c2c5.equals(o2o5).should.be.false
    c2c5.equals(c1c6).should.be.false
    c2c5.equals(o1c6).should.be.false
    c2c5.equals(c1o6).should.be.false
    c2c5.equals(o1o6).should.be.true
    o1o6.equals(c1c6).should.be.false
    o1o6.equals(c2c5).should.be.true
    o1o6.equals(o2c5).should.be.false
    o1o6.equals(c2o5).should.be.false
    return o1o6.equals(o2o5).should.be.false
  })

  it('should properly handle imprecision', () => {
    let uIvl = new Interval(new Uncertainty(5, 10), new Uncertainty(15, 20))
    let ivl = new Interval(0, 100)
    ivl.equals(uIvl).should.be.false
    uIvl.equals(ivl).should.be.false

    ivl = new Interval(-100, 0)
    ivl.equals(uIvl).should.be.false
    uIvl.equals(ivl).should.be.false

    ivl = new Interval(10, 15)
    expect(ivl.equals(uIvl)).to.be.null
    expect(uIvl.equals(ivl)).to.be.null

    ivl = new Interval(5, 20)
    expect(ivl.equals(uIvl)).to.be.null
    expect(uIvl.equals(ivl)).to.be.null

    return expect(uIvl.equals(uIvl)).to.be.null
  })

  return it('should be false for equality with points', () => {
    let point = 3
    let ivl = new Interval(point, point, true, true)

    return ivl.equals(point).should.be.false
  })
})

describe('IntegerInterval.union', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })
  it('should properly calculate sameAs unions', () => {
    let [x, y] = xy(test.iIvl.sameAs)
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
    let [x, y] = xy(test.iIvl.before)
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
    let [x, y] = xy(test.iIvl.meets)
    let z = test.zeroToHundred
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
    let [x, y] = xy(test.iIvl.overlaps)
    let z = test.zeroToHundred
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
    let [x, y] = xy(test.iIvl.begins)
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
    let [x, y] = xy(test.iIvl.during)
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
    let [x, y] = xy(test.iIvl.ends)
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
    let uIvl = new Interval(new Uncertainty(5, 10), new Uncertainty(15, 20))
    let ivl = new Interval(0, 100)
    ivl.union(uIvl).equals(ivl).should.be.true
    uIvl.union(ivl).equals(ivl).should.be.true

    ivl = new Interval(-100, 0)
    expect(ivl.union(uIvl)).to.be.null
    expect(uIvl.union(ivl)).to.be.null

    ivl = new Interval(8, 17)
    let i = ivl.union(uIvl)
    i.low.low.should.equal(5)
    i.low.high.should.equal(8)
    i.high.low.should.equal(17)
    i.high.high.should.equal(20)

    i = uIvl.union(ivl)
    i.low.low.should.equal(5)
    i.low.high.should.equal(8)
    i.high.low.should.equal(17)
    i.high.high.should.equal(20)

    ivl = new Interval(10, 15)
    i = ivl.union(uIvl)
    i.should.eql(uIvl)

    i = uIvl.union(ivl)
    i.should.eql(uIvl)

    ivl = new Interval(15, 20)
    i = ivl.union(uIvl)
    i.low.should.eql(uIvl.low)
    i.high.should.eql(ivl.high)
    i = uIvl.union(ivl)
    i.low.should.eql(uIvl.low)
    i.high.should.eql(ivl.high)

    ivl = new Interval(20, 30)
    expect(ivl.union(uIvl)).to.not.exist

    ivl = new Interval(5, 20)
    ivl.union(uIvl).equals(ivl).should.be.true
    return uIvl.union(ivl).equals(ivl).should.be.true
  })

  return it('should throw when the argument is a point', () => {
    return expect(() => test.zeroToHundred.union(300)).to.throw(Error)
  })
})

describe('IntegerInterval.intersect', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intersect', () => {
    let [x, y] = xy(test.iIvl.sameAs)
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
    let [x, y] = xy(test.iIvl.before)
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
    let [x, y] = xy(test.iIvl.meets)
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
    let [x, y] = xy(test.iIvl.overlaps)
    let a = test.fortyToSixty
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
    let [x, y] = xy(test.iIvl.begins)
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
    let [x, y] = xy(test.iIvl.during)
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
    let [x, y] = xy(test.iIvl.ends)
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
    let a = 0
    let b = new Uncertainty(10, 20)
    let c = 50
    let d = new Uncertainty(80, 90)
    let e = 100

    let x = new Interval(b, e)
    let y = new Interval(a, c)
    x.intersect(y).should.eql(new Interval(b, c))
    y.intersect(x).should.eql(new Interval(b, c))

    x = new Interval(a, b)
    y = new Interval(b, d)
    // x.intersect(y) should result in [b,b] but spec says we don't know if they overlap
    expect(x.intersect(y)).to.not.exist
    // y.intersect(x) should result in [b,b] but spec says we don't know if they overlap
    expect(y.intersect(x)).to.not.exist

    x = new Interval(a, e)
    y = new Interval(b, d)
    x.intersect(y).should.eql(y)
    y.intersect(x).should.eql(y)

    x = new Interval(a, d)
    y = new Interval(b, e)
    x.intersect(y).should.eql(new Interval(b, d))
    y.intersect(x).should.eql(new Interval(b, d))

    x = new Interval(a, b)
    y = new Interval(d, e)
    expect(x.intersect(y)).to.not.exist
    expect(y.intersect(x)).to.not.exist

    x = new Interval(new Uncertainty(5, 10), new Uncertainty(15, 20))
    y = new Interval(8, 17)
    x.intersect(y).should.eql(new Interval(new Uncertainty(8, 10), new Uncertainty(15, 17)))
    return y.intersect(x).should.eql(new Interval(new Uncertainty(8, 10), new Uncertainty(15, 17)))
  })

  return it('should throw when the argument is a point', () => {
    return expect(() => test.zeroToHundred.intersect(50)).to.throw(Error)
  })
})

describe('IntegerInterval.except', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs except', () => {
    let [x, y] = xy(test.iIvl.sameAs)
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
    let [x, y] = xy(test.iIvl.before)
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
    let [x, y] = xy(test.iIvl.meets)
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
    let [x, y] = xy(test.iIvl.overlaps)
    let a = test.zeroToForty
    let b = test.sixtyToHundred
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
    let [x, y] = xy(test.iIvl.begins)
    let b = test.sixtyToHundred
    expect(x.closed.except(y.closed)).to.not.exist
    x.closed.except(y.open).should.eql(new Interval(x.closed.low, x.closed.low))
    expect(x.open.except(y.closed)).to.not.exist
    expect(x.open.except(y.open)).to.not.exist
    y.closed.except(x.closed).equals(b.openClosed).should.be.true
    expect(y.closed.except(x.open)).to.not.exist
    y.open.except(x.closed).equals(b.open).should.be.true
    return y.open.except(x.open).equals(b.closedOpen).should.be.true
  })

  it('should properly calculate includes/included by except', () => {
    let [x, y] = xy(test.iIvl.during)
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
    let [x, y] = xy(test.iIvl.ends)
    let b = test.zeroToForty
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
    let a = 0
    let b = new Uncertainty(10, 20)
    let c = 50
    let d = new Uncertainty(80, 90)
    let e = 100

    let x = new Interval(b, e) // ([10,20] , 100)
    let y = new Interval(a, c) // (   0    ,  50)
    x.except(y).should.eql(new Interval(c, e, false, true))
    y.except(x).should.eql(new Interval(a, b, true, false))

    x = new Interval(a, b)
    y = new Interval(b, d)
    // x.except(y) should result in [a,b) but spec says we don't know if they overlap
    expect(x.except(y)).to.not.exist
    // y.except(x) should result in (b,d] but spec says we don't know if they overlap
    expect(y.except(x)).to.not.exist

    x = new Interval(a, e)
    y = new Interval(b, d)
    expect(x.except(y)).to.not.exist
    expect(y.except(x)).to.not.exist

    x = new Interval(a, d)
    y = new Interval(b, e)
    x.except(y).should.eql(new Interval(a, b, true, false))
    y.except(x).should.eql(new Interval(d, e, false, true))

    x = new Interval(a, b)
    y = new Interval(d, e)
    x.except(y).should.eql(x)
    return y.except(x).should.eql(y)
  })

  return it('should throw when the argument is a point', () => {
    return expect(() => test.zeroToHundred.except(100)).to.throw(Error)
  })
})

describe('IntegerInterval.after', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.iIvl.sameAs)
    x.closed.after(y.closed).should.be.false
    x.closed.after(y.open).should.be.false
    x.open.after(y.closed).should.be.false
    x.open.after(y.open).should.be.false
    y.closed.after(x.closed).should.be.false
    y.closed.after(x.open).should.be.false
    y.open.after(x.closed).should.be.false
    return y.open.after(x.open).should.be.false
  })

  it('should properly calculate before/after intervals', () => {
    let [x, y] = xy(test.iIvl.before)
    x.closed.after(y.closed).should.be.false
    x.closed.after(y.open).should.be.false
    x.open.after(y.closed).should.be.false
    x.open.after(y.open).should.be.false
    y.closed.after(x.closed).should.be.true
    y.closed.after(x.open).should.be.true
    y.open.after(x.closed).should.be.true
    return y.open.after(x.open).should.be.true
  })

  it('should properly calculate meets intervals', () => {
    let [x, y] = xy(test.iIvl.meets)
    x.closed.after(y.closed).should.be.false
    x.closed.after(y.open).should.be.false
    x.open.after(y.closed).should.be.false
    x.open.after(y.open).should.be.false
    y.closed.after(x.closed).should.be.true
    y.closed.after(x.open).should.be.true
    y.open.after(x.closed).should.be.true
    return y.open.after(x.open).should.be.true
  })

  it('should properly calculate left/right overlapping intervals', () => {
    let [x, y] = xy(test.iIvl.overlaps)
    x.closed.after(y.closed).should.be.false
    x.closed.after(y.open).should.be.false
    x.open.after(y.closed).should.be.false
    x.open.after(y.open).should.be.false
    y.closed.after(x.closed).should.be.false
    y.closed.after(x.open).should.be.false
    y.open.after(x.closed).should.be.false
    return y.open.after(x.open).should.be.false
  })

  it('should properly calculate begins/begun by intervals', () => {
    let [x, y] = xy(test.iIvl.begins)
    x.closed.after(y.closed).should.be.false
    x.closed.after(y.open).should.be.false
    x.open.after(y.closed).should.be.false
    x.open.after(y.open).should.be.false
    y.closed.after(x.closed).should.be.false
    y.closed.after(x.open).should.be.false
    y.open.after(x.closed).should.be.false
    return y.open.after(x.open).should.be.false
  })

  it('should properly calculate includes/included by intervals', () => {
    let [x, y] = xy(test.iIvl.during)
    x.closed.after(y.closed).should.be.false
    x.closed.after(y.open).should.be.false
    x.open.after(y.closed).should.be.false
    x.open.after(y.open).should.be.false
    y.closed.after(x.closed).should.be.false
    y.closed.after(x.open).should.be.false
    y.open.after(x.closed).should.be.false
    return y.open.after(x.open).should.be.false
  })

  it('should properly calculate ends/ended by intervals', () => {
    let [x, y] = xy(test.iIvl.ends)
    x.closed.after(y.closed).should.be.false
    x.closed.after(y.open).should.be.false
    x.open.after(y.closed).should.be.false
    x.open.after(y.open).should.be.false
    y.closed.after(x.closed).should.be.false
    y.closed.after(x.open).should.be.false
    y.open.after(x.closed).should.be.false
    return y.open.after(x.open).should.be.false
  })

  return it('should properly handle imprecision', () => {
    let uIvl = new Interval(new Uncertainty(5, 10), new Uncertainty(15, 20))
    let ivl = new Interval(0, 100)
    ivl.after(uIvl).should.be.false
    uIvl.after(ivl).should.be.false

    ivl = new Interval(-100, 0)
    ivl.after(uIvl).should.be.false
    uIvl.after(ivl).should.be.true

    ivl = new Interval(10, 15)
    ivl.after(uIvl).should.be.false
    uIvl.after(ivl).should.be.false

    ivl = new Interval(15, 20)
    ivl.after(uIvl).should.be.false
    uIvl.after(ivl).should.be.false

    ivl = new Interval(20, 30)
    expect(ivl.after(uIvl)).to.not.exist
    uIvl.after(ivl).should.be.false

    ivl = new Interval(5, 20)
    ivl.after(uIvl).should.be.false
    uIvl.after(ivl).should.be.false

    return uIvl.after(uIvl).should.be.false
  })
})

describe('IntegerInterval.before', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.iIvl.sameAs)
    x.closed.before(y.closed).should.be.false
    x.closed.before(y.open).should.be.false
    x.open.before(y.closed).should.be.false
    x.open.before(y.open).should.be.false
    y.closed.before(x.closed).should.be.false
    y.closed.before(x.open).should.be.false
    y.open.before(x.closed).should.be.false
    return y.open.before(x.open).should.be.false
  })

  it('should properly calculate before/after intervals', () => {
    let [x, y] = xy(test.iIvl.before)
    x.closed.before(y.closed).should.be.true
    x.closed.before(y.open).should.be.true
    x.open.before(y.closed).should.be.true
    x.open.before(y.open).should.be.true
    y.closed.before(x.closed).should.be.false
    y.closed.before(x.open).should.be.false
    y.open.before(x.closed).should.be.false
    return y.open.before(x.open).should.be.false
  })

  it('should properly calculate meets intervals', () => {
    let [x, y] = xy(test.iIvl.meets)
    x.closed.before(y.closed).should.be.true
    x.closed.before(y.open).should.be.true
    x.open.before(y.closed).should.be.true
    x.open.before(y.open).should.be.true
    y.closed.before(x.closed).should.be.false
    y.closed.before(x.open).should.be.false
    y.open.before(x.closed).should.be.false
    return y.open.before(x.open).should.be.false
  })

  it('should properly calculate left/right overlapping intervals', () => {
    let [x, y] = xy(test.iIvl.overlaps)
    x.closed.before(y.closed).should.be.false
    x.closed.before(y.open).should.be.false
    x.open.before(y.closed).should.be.false
    x.open.before(y.open).should.be.false
    y.closed.before(x.closed).should.be.false
    y.closed.before(x.open).should.be.false
    y.open.before(x.closed).should.be.false
    return y.open.before(x.open).should.be.false
  })

  it('should properly calculate begins/begun by intervals', () => {
    let [x, y] = xy(test.iIvl.begins)
    x.closed.before(y.closed).should.be.false
    x.closed.before(y.open).should.be.false
    x.open.before(y.closed).should.be.false
    x.open.before(y.open).should.be.false
    y.closed.before(x.closed).should.be.false
    y.closed.before(x.open).should.be.false
    y.open.before(x.closed).should.be.false
    return y.open.before(x.open).should.be.false
  })

  it('should properly calculate includes/included by intervals', () => {
    let [x, y] = xy(test.iIvl.during)
    x.closed.before(y.closed).should.be.false
    x.closed.before(y.open).should.be.false
    x.open.before(y.closed).should.be.false
    x.open.before(y.open).should.be.false
    y.closed.before(x.closed).should.be.false
    y.closed.before(x.open).should.be.false
    y.open.before(x.closed).should.be.false
    return y.open.before(x.open).should.be.false
  })

  it('should properly calculate ends/ended by intervals', () => {
    let [x, y] = xy(test.iIvl.ends)
    x.closed.before(y.closed).should.be.false
    x.closed.before(y.open).should.be.false
    x.open.before(y.closed).should.be.false
    x.open.before(y.open).should.be.false
    y.closed.before(x.closed).should.be.false
    y.closed.before(x.open).should.be.false
    y.open.before(x.closed).should.be.false
    return y.open.before(x.open).should.be.false
  })

  return it('should properly handle imprecision', () => {
    let uIvl = new Interval(new Uncertainty(5, 10), new Uncertainty(15, 20))
    let ivl = new Interval(0, 100)
    ivl.before(uIvl).should.be.false
    uIvl.before(ivl).should.be.false

    ivl = new Interval(-100, 0)
    ivl.before(uIvl).should.be.true
    uIvl.before(ivl).should.be.false

    ivl = new Interval(10, 15)
    ivl.before(uIvl).should.be.false
    uIvl.before(ivl).should.be.false

    ivl = new Interval(15, 20)
    ivl.before(uIvl).should.be.false
    uIvl.before(ivl).should.be.false

    ivl = new Interval(20, 30)
    expect(uIvl.before(ivl)).to.not.exist
    ivl.before(uIvl).should.be.false

    ivl = new Interval(5, 20)
    ivl.before(uIvl).should.be.false
    uIvl.before(ivl).should.be.false

    return uIvl.before(uIvl).should.be.false
  })
})

describe('IntegerInterval.meets', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.iIvl.sameAs)
    x.closed.meets(y.closed).should.be.false
    x.closed.meets(y.open).should.be.false
    x.open.meets(y.closed).should.be.false
    x.open.meets(y.open).should.be.false
    y.closed.meets(x.closed).should.be.false
    y.closed.meets(x.open).should.be.false
    y.open.meets(x.closed).should.be.false
    return y.open.meets(x.open).should.be.false
  })

  it('should properly calculate before/after intervals', () => {
    let [x, y] = xy(test.iIvl.before)
    x.closed.meets(y.closed).should.be.false
    x.closed.meets(y.open).should.be.false
    x.open.meets(y.closed).should.be.false
    x.open.meets(y.open).should.be.false
    y.closed.meets(x.closed).should.be.false
    y.closed.meets(x.open).should.be.false
    y.open.meets(x.closed).should.be.false
    return y.open.meets(x.open).should.be.false
  })

  it('should properly calculate meets intervals', () => {
    let [x, y] = xy(test.iIvl.meets)
    x.closed.meets(y.closed).should.be.true
    x.closed.meets(y.open).should.be.false
    x.open.meets(y.closed).should.be.false
    x.open.meets(y.open).should.be.false
    y.closed.meets(x.closed).should.be.true
    y.closed.meets(x.open).should.be.false
    y.open.meets(x.closed).should.be.false
    return y.open.meets(x.open).should.be.false
  })

  it('should properly calculate left/right overlapping intervals', () => {
    let [x, y] = xy(test.iIvl.overlaps)
    x.closed.meets(y.closed).should.be.false
    x.closed.meets(y.open).should.be.false
    x.open.meets(y.closed).should.be.false
    x.open.meets(y.open).should.be.false
    y.closed.meets(x.closed).should.be.false
    y.closed.meets(x.open).should.be.false
    y.open.meets(x.closed).should.be.false
    return y.open.meets(x.open).should.be.false
  })

  it('should properly calculate begins/begun by intervals', () => {
    let [x, y] = xy(test.iIvl.begins)
    x.closed.meets(y.closed).should.be.false
    x.closed.meets(y.open).should.be.false
    x.open.meets(y.closed).should.be.false
    x.open.meets(y.open).should.be.false
    y.closed.meets(x.closed).should.be.false
    y.closed.meets(x.open).should.be.false
    y.open.meets(x.closed).should.be.false
    return y.open.meets(x.open).should.be.false
  })

  it('should properly calculate includes/included by intervals', () => {
    let [x, y] = xy(test.iIvl.during)
    x.closed.meets(y.closed).should.be.false
    x.closed.meets(y.open).should.be.false
    x.open.meets(y.closed).should.be.false
    x.open.meets(y.open).should.be.false
    y.closed.meets(x.closed).should.be.false
    y.closed.meets(x.open).should.be.false
    y.open.meets(x.closed).should.be.false
    return y.open.meets(x.open).should.be.false
  })

  it('should properly calculate ends/ended by intervals', () => {
    let [x, y] = xy(test.iIvl.ends)
    x.closed.meets(y.closed).should.be.false
    x.closed.meets(y.open).should.be.false
    x.open.meets(y.closed).should.be.false
    x.open.meets(y.open).should.be.false
    y.closed.meets(x.closed).should.be.false
    y.closed.meets(x.open).should.be.false
    y.open.meets(x.closed).should.be.false
    return y.open.meets(x.open).should.be.false
  })

  return it('should properly handle imprecision', () => {
    let uIvl = new Interval(new Uncertainty(5, 10), new Uncertainty(15, 20))
    let ivl = new Interval(0, 3)
    ivl.meets(uIvl).should.be.false
    uIvl.meets(ivl).should.be.false

    ivl = new Interval(0, 10)
    ivl.meets(uIvl).should.be.false
    uIvl.meets(ivl).should.be.false

    ivl = new Interval(15, 40)
    ivl.meets(uIvl).should.be.false
    uIvl.meets(ivl).should.be.false

    ivl = new Interval(22, 40)
    ivl.meets(uIvl).should.be.false
    uIvl.meets(ivl).should.be.false

    ivl = new Interval(0, 4)
    expect(ivl.meets(uIvl)).to.not.exist
    expect(uIvl.meets(ivl)).to.not.exist

    ivl = new Interval(21, 40)
    expect(ivl.meets(uIvl)).to.not.exist
    expect(uIvl.meets(ivl)).to.not.exist

    return uIvl.meets(uIvl).should.be.false
  })
})

describe('IntegerInterval.meetsAfter', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.iIvl.sameAs)
    x.closed.meetsAfter(y.closed).should.be.false
    x.closed.meetsAfter(y.open).should.be.false
    x.open.meetsAfter(y.closed).should.be.false
    x.open.meetsAfter(y.open).should.be.false
    y.closed.meetsAfter(x.closed).should.be.false
    y.closed.meetsAfter(x.open).should.be.false
    y.open.meetsAfter(x.closed).should.be.false
    return y.open.meetsAfter(x.open).should.be.false
  })

  it('should properly calculate before/after intervals', () => {
    let [x, y] = xy(test.iIvl.before)
    x.closed.meetsAfter(y.closed).should.be.false
    x.closed.meetsAfter(y.open).should.be.false
    x.open.meetsAfter(y.closed).should.be.false
    x.open.meetsAfter(y.open).should.be.false
    y.closed.meetsAfter(x.closed).should.be.false
    y.closed.meetsAfter(x.open).should.be.false
    y.open.meetsAfter(x.closed).should.be.false
    return y.open.meetsAfter(x.open).should.be.false
  })

  it('should properly calculate meets intervals', () => {
    let [x, y] = xy(test.iIvl.meets)
    x.closed.meetsAfter(y.closed).should.be.false
    x.closed.meetsAfter(y.open).should.be.false
    x.open.meetsAfter(y.closed).should.be.false
    x.open.meetsAfter(y.open).should.be.false
    y.closed.meetsAfter(x.closed).should.be.true
    y.closed.meetsAfter(x.open).should.be.false
    y.open.meetsAfter(x.closed).should.be.false
    return y.open.meetsAfter(x.open).should.be.false
  })

  it('should properly calculate left/right overlapping intervals', () => {
    let [x, y] = xy(test.iIvl.overlaps)
    x.closed.meetsAfter(y.closed).should.be.false
    x.closed.meetsAfter(y.open).should.be.false
    x.open.meetsAfter(y.closed).should.be.false
    x.open.meetsAfter(y.open).should.be.false
    y.closed.meetsAfter(x.closed).should.be.false
    y.closed.meetsAfter(x.open).should.be.false
    y.open.meetsAfter(x.closed).should.be.false
    return y.open.meetsAfter(x.open).should.be.false
  })

  it('should properly calculate begins/begun by intervals', () => {
    let [x, y] = xy(test.iIvl.begins)
    x.closed.meetsAfter(y.closed).should.be.false
    x.closed.meetsAfter(y.open).should.be.false
    x.open.meetsAfter(y.closed).should.be.false
    x.open.meetsAfter(y.open).should.be.false
    y.closed.meetsAfter(x.closed).should.be.false
    y.closed.meetsAfter(x.open).should.be.false
    y.open.meetsAfter(x.closed).should.be.false
    return y.open.meetsAfter(x.open).should.be.false
  })

  it('should properly calculate includes/included by intervals', () => {
    let [x, y] = xy(test.iIvl.during)
    x.closed.meetsAfter(y.closed).should.be.false
    x.closed.meetsAfter(y.open).should.be.false
    x.open.meetsAfter(y.closed).should.be.false
    x.open.meetsAfter(y.open).should.be.false
    y.closed.meetsAfter(x.closed).should.be.false
    y.closed.meetsAfter(x.open).should.be.false
    y.open.meetsAfter(x.closed).should.be.false
    return y.open.meetsAfter(x.open).should.be.false
  })

  it('should properly calculate ends/ended by intervals', () => {
    let [x, y] = xy(test.iIvl.ends)
    x.closed.meetsAfter(y.closed).should.be.false
    x.closed.meetsAfter(y.open).should.be.false
    x.open.meetsAfter(y.closed).should.be.false
    x.open.meetsAfter(y.open).should.be.false
    y.closed.meetsAfter(x.closed).should.be.false
    y.closed.meetsAfter(x.open).should.be.false
    y.open.meetsAfter(x.closed).should.be.false
    return y.open.meetsAfter(x.open).should.be.false
  })

  return it('should properly handle imprecision', () => {
    let uIvl = new Interval(new Uncertainty(5, 10), new Uncertainty(15, 20))
    let ivl = new Interval(0, 3)
    ivl.meetsAfter(uIvl).should.be.false
    uIvl.meetsAfter(ivl).should.be.false

    ivl = new Interval(0, 10)
    ivl.meetsAfter(uIvl).should.be.false
    uIvl.meetsAfter(ivl).should.be.false

    ivl = new Interval(15, 40)
    ivl.meetsAfter(uIvl).should.be.false
    uIvl.meetsAfter(ivl).should.be.false

    ivl = new Interval(22, 40)
    ivl.meetsAfter(uIvl).should.be.false
    uIvl.meetsAfter(ivl).should.be.false

    ivl = new Interval(0, 4)
    ivl.meetsAfter(uIvl).should.be.false
    expect(uIvl.meetsAfter(ivl)).to.not.exist

    ivl = new Interval(21, 40)
    expect(ivl.meetsAfter(uIvl)).to.not.exist
    uIvl.meetsAfter(ivl).should.be.false

    return uIvl.meetsAfter(uIvl).should.be.false
  })
})

describe('IntegerInterval.meetsBefore', () => {
  const test = {}
  beforeEach(() => {
    return setup(test)
  })

  it('should properly calculate sameAs intervals', () => {
    let [x, y] = xy(test.iIvl.sameAs)
    x.closed.meetsBefore(y.closed).should.be.false
    x.closed.meetsBefore(y.open).should.be.false
    x.open.meetsBefore(y.closed).should.be.false
    x.open.meetsBefore(y.open).should.be.false
    y.closed.meetsBefore(x.closed).should.be.false
    y.closed.meetsBefore(x.open).should.be.false
    y.open.meetsBefore(x.closed).should.be.false
    return y.open.meetsBefore(x.open).should.be.false
  })

  it('should properly calculate before/after intervals', () => {
    let [x, y] = xy(test.iIvl.before)
    x.closed.meetsBefore(y.closed).should.be.false
    x.closed.meetsBefore(y.open).should.be.false
    x.open.meetsBefore(y.closed).should.be.false
    x.open.meetsBefore(y.open).should.be.false
    y.closed.meetsBefore(x.closed).should.be.false
    y.closed.meetsBefore(x.open).should.be.false
    y.open.meetsBefore(x.closed).should.be.false
    return y.open.meetsBefore(x.open).should.be.false
  })

  it('should properly calculate meets intervals', () => {
    let [x, y] = xy(test.iIvl.meets)
    x.closed.meetsBefore(y.closed).should.be.true
    x.closed.meetsBefore(y.open).should.be.false
    x.open.meetsBefore(y.closed).should.be.false
    x.open.meetsBefore(y.open).should.be.false
    y.closed.meetsBefore(x.closed).should.be.false
    y.closed.meetsBefore(x.open).should.be.false
    y.open.meetsBefore(x.closed).should.be.false
    return y.open.meetsBefore(x.open).should.be.false
  })

  it('should properly calculate left/right overlapping intervals', () => {
    let [x, y] = xy(test.iIvl.overlaps)
    x.closed.meetsBefore(y.closed).should.be.false
    x.closed.meetsBefore(y.open).should.be.false
    x.open.meetsBefore(y.closed).should.be.false
    x.open.meetsBefore(y.open).should.be.false
    y.closed.meetsBefore(x.closed).should.be.false
    y.closed.meetsBefore(x.open).should.be.false
    y.open.meetsBefore(x.closed).should.be.false
    return y.open.meetsBefore(x.open).should.be.false
  })

  it('should properly calculate begins/begun by intervals', () => {
    let [x, y] = xy(test.iIvl.begins)
    x.closed.meetsBefore(y.closed).should.be.false
    x.closed.meetsBefore(y.open).should.be.false
    x.open.meetsBefore(y.closed).should.be.false
    x.open.meetsBefore(y.open).should.be.false
    y.closed.meetsBefore(x.closed).should.be.false
    y.closed.meetsBefore(x.open).should.be.false
    y.open.meetsBefore(x.closed).should.be.false
    return y.open.meetsBefore(x.open).should.be.false
  })

  it('should properly calculate includes/included by intervals', () => {
    let [x, y] = xy(test.iIvl.during)
    x.closed.meetsBefore(y.closed).should.be.false
    x.closed.meetsBefore(y.open).should.be.false
    x.open.meetsBefore(y.closed).should.be.false
    x.open.meetsBefore(y.open).should.be.false
    y.closed.meetsBefore(x.closed).should.be.false
    y.closed.meetsBefore(x.open).should.be.false
    y.open.meetsBefore(x.closed).should.be.false
    return y.open.meetsBefore(x.open).should.be.false
  })

  it('should properly calculate ends/ended by intervals', () => {
    let [x, y] = xy(test.iIvl.ends)
    x.closed.meetsBefore(y.closed).should.be.false
    x.closed.meetsBefore(y.open).should.be.false
    x.open.meetsBefore(y.closed).should.be.false
    x.open.meetsBefore(y.open).should.be.false
    y.closed.meetsBefore(x.closed).should.be.false
    y.closed.meetsBefore(x.open).should.be.false
    y.open.meetsBefore(x.closed).should.be.false
    return y.open.meetsBefore(x.open).should.be.false
  })

  return it('should properly handle imprecision', () => {
    let uIvl = new Interval(new Uncertainty(5, 10), new Uncertainty(15, 20))

    let ivl = new Interval(0, 3)
    ivl.meetsBefore(uIvl).should.be.false
    uIvl.meetsBefore(ivl).should.be.false

    ivl = new Interval(0, 10)
    ivl.meetsBefore(uIvl).should.be.false
    uIvl.meetsBefore(ivl).should.be.false

    ivl = new Interval(15, 40)
    ivl.meetsBefore(uIvl).should.be.false
    uIvl.meetsBefore(ivl).should.be.false

    ivl = new Interval(22, 40)
    ivl.meetsBefore(uIvl).should.be.false
    uIvl.meetsBefore(ivl).should.be.false

    ivl = new Interval(0, 4)
    expect(ivl.meetsBefore(uIvl)).to.not.exist
    uIvl.meetsBefore(ivl).should.be.false

    ivl = new Interval(21, 40)
    ivl.meetsBefore(uIvl).should.be.false
    expect(uIvl.meetsBefore(ivl)).to.not.exist

    return uIvl.meetsBefore(uIvl).should.be.false
  })
})

// TODO: Tests for real numbers (i.e., floats)
