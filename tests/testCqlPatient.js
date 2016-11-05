/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import { Patient } from '../src/cqlPatient'
import * as DT from '../src/datatypes/datatypes'

describe('Record', function () {
  beforeEach(function () {
    let patient = new Patient({
      'records': [{
        'identifier': { 'value': 'http://cqframework.org/1/1', 'system': 'http://cqframework.org' },
        'profile': 'encounter-qicore-qicore-encounter',
        'topic': 'Encounter',
        'class': { 'code': '185349003', 'system': '2.16.840.1.113883.6.96', 'version': '2013-09', 'display': 'Encounter for "check-up" (procedure)' },
        'type': { 'code': 'G0438', 'system': '2.16.840.1.113883.6.285', 'version': '2014', 'display': 'Annual wellness visit; includes a personalized prevention plan of service (pps), initial visit' },
        'period': { 'start': '1978-07-15T10:00', 'end': '1978-07-15T10:45' }
      }, {
        'identifier': { 'value': 'http://cqframework.org/1/2', 'system': 'http://cqframework.org' },
        'profile': 'condition-qicore-qicore-condition',
        'topic': 'Condition',
        'code': { 'code': '1532007', 'system': '2.16.840.1.113883.6.96', 'version': '2013-09', 'display': 'Viral pharyngitis (disorder)' },
        'onsetDateTime': '1982-03-12',
        'abatementDateTime': '1982-03-26',
        'issued': '1982-03-15T15:15:00'
      }]
    })
    let result = []
    for (let k in patient.records) {
      let v = patient.records[k]
      result.push(v[0])
    }
    [this.encRecord, this.cndRecord] = result
  })

  it('should get simple record entries', function () {
    this.encRecord.get('identifier').value.should.equal('http://cqframework.org/1/1')
    this.encRecord.get('identifier').system.should.equal('http://cqframework.org')
    this.encRecord.get('profile').should.equal('encounter-qicore-qicore-encounter')
    this.encRecord.get('topic').should.equal('Encounter')
    this.cndRecord.get('identifier').value.should.equal('http://cqframework.org/1/2')
    this.cndRecord.get('identifier').system.should.equal('http://cqframework.org')
    this.cndRecord.get('profile').should.equal('condition-qicore-qicore-condition')
    return this.cndRecord.get('topic').should.equal('Condition')
  })

  it('should get codes', function () {
    this.encRecord.getCode('class').should.eql(new DT.Code('185349003', '2.16.840.1.113883.6.96', '2013-09'))
    this.encRecord.getCode('type').should.eql(new DT.Code('G0438', '2.16.840.1.113883.6.285', '2014'))
    return this.cndRecord.getCode('code').should.eql(new DT.Code('1532007', '2.16.840.1.113883.6.96', '2013-09'))
  })

  it('should get dates', function () {
    this.cndRecord.getDate('onsetDateTime').should.eql(DT.DateTime.parse('1982-03-12'))
    this.cndRecord.getDate('abatementDateTime').should.eql(DT.DateTime.parse('1982-03-26'))
    return this.cndRecord.getDate('issued').should.eql(DT.DateTime.parse('1982-03-15T15:15:00'))
  })

  it('should get intervals', function () {
    return this.encRecord.getInterval('period').should.eql(new DT.Interval(DT.DateTime.parse('1978-07-15T10:00'), DT.DateTime.parse('1978-07-15T10:45')))
  })

  return it('should get date or interval', function () {
    this.cndRecord.getDateOrInterval('issued').should.eql(DT.DateTime.parse('1982-03-15T15:15:00'))
    return this.encRecord.getDateOrInterval('period').should.eql(new DT.Interval(DT.DateTime.parse('1978-07-15T10:00'), DT.DateTime.parse('1978-07-15T10:45')))
  })
})

describe('Patient', function () {
  beforeEach(function () {
    this.patient = new Patient({
      'identifier': { 'value': '1' },
      'name': 'Bob Jones',
      'gender': 'M',
      'birthDate': '1974-07-12T11:15',
      'records': [{
        'identifier': { 'value': 'http://cqframework.org/1/1', 'system': 'http://cqframework.org' },
        'profile': 'encounter-qicore-qicore-encounter',
        'topic': 'Encounter',
        'class': { 'code': '185349003', 'system': '2.16.840.1.113883.6.96', 'version': '2013-09', 'display': 'Encounter for "check-up" (procedure)' },
        'type': { 'code': 'G0438', 'system': '2.16.840.1.113883.6.285', 'version': '2014', 'display': 'Annual wellness visit; includes a personalized prevention plan of service (pps), initial visit' },
        'period': { 'start': '1978-07-15T10:00', 'end': '1978-07-15T10:45' }
      }, {
        'identifier': { 'value': 'http://cqframework.org/1/2', 'system': 'http://cqframework.org' },
        'profile': 'condition-qicore-qicore-condition',
        'topic': 'Condition',
        'code': { 'code': '1532007', 'system': '2.16.840.1.113883.6.96', 'version': '2013-09', 'display': 'Viral pharyngitis (disorder)' },
        'onsetDateTime': '1982-03-12',
        'abatementDateTime': '1982-03-26',
        'issued': '1982-03-15T15:15:00'
      }
      ]
    })
  })

  it('should contain patient attributes', function () {
    this.patient.identifier.value.should.equal('1')
    this.patient.name.should.equal('Bob Jones')
    this.patient.gender.should.equal('M')
    return this.patient.birthDate.should.eql(DT.DateTime.parse('1974-07-12T11:15'))
  })

  it('should find records by profile', function () {
    let encounters = this.patient.findRecords('encounter-qicore-qicore-encounter')
    encounters.length.should.equal(1)
    encounters[0].get('identifier').value.should.equal('http://cqframework.org/1/1')

    let conditions = this.patient.findRecords('condition-qicore-qicore-condition')
    conditions.length.should.equal(1)
    return conditions[0].get('identifier').value.should.equal('http://cqframework.org/1/2')
  })

  return it('should return empty array for unfound records', function () {
    return this.patient.findRecords('foo').should.be.empty
  })
})
