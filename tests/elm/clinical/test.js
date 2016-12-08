/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'
import vsets from './valuesets'
import { p1, p2 } from './patients'
import { PatientSource } from '../../../src/cql'
let expect = chai.expect

describe('ValueSetDef', function () {
  beforeEach(function () {
    return setup(this, data, [], vsets)
  })

  it('should return a resolved value set when the codeService knows about it', function () {
    let vs = this.known.exec(this.ctx)
    vs.oid.should.equal('2.16.840.1.113883.3.464.1003.101.12.1061')
    vs.version.should.equal('20140501')
    return vs.codes.length.should.equal(3)
  })

  it('should execute one-arg to ValueSet with ID', function () {
    let vs = this['unknown One Arg'].exec(this.ctx)
    vs.oid.should.equal('1.2.3.4.5.6.7.8.9')
    return expect(vs.version).to.not.exist
  })

  return it('should execute two-arg to ValueSet with ID and version', function () {
    let vs = this['unknown Two Arg'].exec(this.ctx)
    vs.oid.should.equal('1.2.3.4.5.6.7.8.9')
    return vs.version.should.equal('1')
  })
})

describe('ValueSetRef', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should have a name', function () {
    return this.foo.name.should.equal('Acute Pharyngitis')
  })

  return it('should execute to the defined value set', function () {
    return this.foo.exec(this.ctx).oid.should.equal('2.16.840.1.113883.3.464.1003.101.12.1001')
  })
})

describe('InValueSet', function () {
  beforeEach(function () {
    return setup(this, data, [], vsets)
  })

  it('should find string code in value set', function () {
    return this.string.exec(this.ctx).should.be.true
  })

  it('should find string code in versioned value set', function () {
    return this.stringInVersionedValueSet.exec(this.ctx).should.be.true
  })

  it('should find short code in value set', function () {
    return this.shortCode.exec(this.ctx).should.be.true
  })

  it('should find medium code in value set', function () {
    return this.mediumCode.exec(this.ctx).should.be.true
  })

  it('should find long code in value set', function () {
    return this.longCode.exec(this.ctx).should.be.true
  })

  it('should not find string code in value set', function () {
    return this.wrongString.exec(this.ctx).should.be.false
  })

  it('should not find string code in versioned value set', function () {
    return this.wrongStringInVersionedValueSet.exec(this.ctx).should.be.false
  })

  it('should not find short code in value set', function () {
    return this.wrongShortCode.exec(this.ctx).should.be.false
  })

  it('should not find medium code in value set', function () {
    return this.wrongMediumCode.exec(this.ctx).should.be.false
  })

  return it('should not find long code in value set', function () {
    return this.wrongLongCode.exec(this.ctx).should.be.false
  })
})

describe('Patient Property In ValueSet', function () {
  beforeEach(function () {
    return setup(this, data, [], vsets)
  })

  it('should find that John is not female', function () {
    this.ctx.patient = new PatientSource([ p1 ]).currentPatient()
    return this.isFemale.exec(this.ctx).should.be.false
  })

  return it('should find that Sally is female', function () {
    this.ctx.patient = new PatientSource([ p2 ]).currentPatient()
    return this.isFemale.exec(this.ctx).should.be.true
  })
})

describe('CalculateAge', function () {
  beforeEach(function () {
    setup(this, data, [ p1 ])
    // Note, tests are inexact (otherwise test needs to repeat exact logic we're testing)
    // p1 birth date is 1980-06-17
    this.bday = new Date(1980, 5, 17)
    this.today = new Date()
    // according to spec, dates without timezones are in *current* time offset, so need to adjust
    let offsetDiff = this.today.getTimezoneOffset() - this.bday.getTimezoneOffset()
    this.bday.setMinutes(this.bday.getMinutes() + offsetDiff)

    // this is getting the possible number of months in years with the addtion of an offset
    // to get the correct number of months
    this.full_months = ((this.today.getFullYear() - 1980) * 12) + (this.today.getMonth() - 5)
    this.timediff = this.today - this.bday
  }) // diff in milliseconds

  it('should execute age in years', function () {
    return this.years.exec(this.ctx).should.equal(Math.floor(this.full_months / 12))
  })

  it('should execute age in months', function () {
    // what is returned will depend on whether the day in the current month has
    // made it to the 17th day of the month as declared in the birthday
    return [this.full_months, this.full_months - 1].indexOf(this.months.exec(this.ctx)).should.not.equal(-1)
  })

  it('should execute age in days', function () {
    return this.days.exec(this.ctx).should.equal(Math.floor(Math.floor(Math.floor(Math.floor(this.timediff / 1000) / 60) / 60) / 24))
  })

  it('should execute age in hours', function () {
    // a little strange since the qicore data model specified birthDate as a date (no time)
    return this.hours.exec(this.ctx).should.equal(Math.floor(Math.floor(Math.floor(this.timediff / 1000) / 60) / 60))
  })

  it('should execute age in minutes', function () {
    // a little strange since the qicore data model specified birthDate as a date (no time)
    return this.minutes.exec(this.ctx).should.equal(Math.floor(Math.floor(this.timediff / 1000) / 60))
  })

  return it('should execute age in seconds', function () {
    // a little strange since the qicore data model specified birthDate as a date (no time)
    return this.seconds.exec(this.ctx).should.equal(Math.floor(this.timediff / 1000))
  })
})

describe('CalculateAgeAt', function () {
  beforeEach(function () {
    setup(this, data, [p1])
  })

  it('should execute age at 2012 as 31', function () {
    return this.ageAt2012.exec(this.ctx).should.equal(31)
  })

  it('should execute age at 19810216 as 0', function () {
    return this.ageAt19810216.exec(this.ctx).should.equal(0)
  })

  return it('should execute age at 1975 as -5', function () {
    return this.ageAt19810216.exec(this.ctx).should.equal(0)
  })
})
