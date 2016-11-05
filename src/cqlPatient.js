import * as DT from './datatypes/datatypes'
import * as FHIR from './fhir/models'
import { typeIsArray, guard } from './util/util'

class Record {
  constructor (json) {
    this.json = json
  }

  get (field) {
    return this.json[field]
  }

  getDate (field) {
    const val = this.get(field)
    if (val != null) return DT.DateTime.parse(val)
    else return null
  }

  getInterval (field) {
    const val = this.get(field)
    if ((val != null) && typeof val === 'object') {
      let start = (val.start != null) ? DT.DateTime.parse(val.start) : null
      let end = (val.end != null) ? DT.DateTime.parse(val.end) : null
      return new DT.Interval(start, end)
    }
  }

  getDateOrInterval (field) {
    const val = this.get(field)
    if ((val != null) && typeof val === 'object') return this.getInterval(field)
    else return this.getDate(field)
  }

  getCode (field) {
    const val = this.get(field)
    if ((val != null) && typeof val === 'object') {
      return new DT.Code(val.code, val.system, val.version)
    }
  }
}

FHIR.Patient.prototype.records = function () {
  this._records = {}
  let iterable = this.json.records != null ? this.json.records : []
  iterable.forEach(r => {
    if (this._records[r.profile] == null) this._records[r.profile] = []
    this._records[r.profile].push(new Record(r))
  })
  return this._records
}

FHIR.Patient.prototype.findRecords = function (profile) {
  if (profile === 'patient-qicore-qicore-patient') return [this]
  else {
    let left
    return (left = guard(this._bundle, x => x.findRecords(profile))) != null ? left : []
  }
}

FHIR.Bundle.prototype.findRecords = function (profile) {
  let filtered = this.entry().filter(e => guard(guard(guard(e.resource(), x2 => x2.meta()), x1 => x1.profile()), x => x.indexOf(profile)) > -1)
  return filtered.map(e => {
    let r = e.resource()
    r._bundle = this
    return r
  })
}

FHIR.Bundle.prototype.findRecord = function (profile) {
  return this.findRecords(profile)[0]
}

FHIR.Base.prototype.get = function (field) {
  return guard(this[field], x => x.call(this))
}

FHIR.Base.prototype.getDate = function (field) {
  const val = this.get(field)
  if (val instanceof DT.DateTime) return val
  else if (typeof val === 'string') return DT.DateTime.parse(val)
}

FHIR.Base.prototype.getInterval = function (field) {
  const val = this.get(field)
  if (val instanceof FHIR.Period) {
    return this.periodToInterval(val)
  }
}

FHIR.Base.prototype.getDateOrInterval = function (field) {
  const val = this.get(field)
  if (val instanceof FHIR.Period) return this.periodToInterval(val)
  else if (typeof val === 'string') return DT.DateTime.parse(val)
  else if (val instanceof DT.DateTime) return val
}

FHIR.Base.prototype.getCode = function (field) {
  return this.toCode(this.get(field))
}

FHIR.Base.prototype.toCode = function (val) {
  if (typeIsArray(val)) return val.map(c => this.toCode(c))
  else if (val instanceof FHIR.CodeableConcept) return this.codableConceptToCodes(val)
  else if (val instanceof FHIR.Coding) return this.codingToCode(val)
}

FHIR.Base.prototype.codableConceptToCodes = function (cc) {
  return cc.coding().map(c => this.codingToCode(c))
}
FHIR.Base.prototype.codingToCode = function (coding) {
  return new DT.Code(coding.code(), coding.system(), coding.version())
}
FHIR.Base.prototype.periodToInterval = function (val) {
  if (val instanceof FHIR.Period) {
    let start = val.getDate('start')
    let end = val.getDate('end')
    return new DT.Interval(start, end)
  }
}

export class Patient {
  constructor (json) {
    this.identifier = json.identifier
    this.name = json.name
    this.gender = json.gender
    this.birthDate = (json.birthDate != null) ? DT.DateTime.parse(json.birthDate) : undefined
    this.records = {}
    let iterable = json.records != null ? json.records : []
    iterable.forEach(r => {
      if (this.records[r.profile] == null) this.records[r.profile] = []
      this.records[r.profile].push(new Record(r))
    })
  }

  findRecords (profile) {
    if (profile === 'patient-qicore-qicore-patient') return [this]
    else return this.records[profile] != null ? this.records[profile] : []
  }
}

export class PatientSource {
  constructor (patients) {
    this.patients = patients
    this.nextPatient()
  }

  currentPatient () {
    return this.currPatient
  }

  nextPatient () {
    this.current = this.patients.shift()
    this.currentBundle = this.current ? new FHIR.Bundle(this.current) : void 0
    return (this.currPatient = guard(this.currentBundle, x => x.findRecord('patient-qicore-qicore-patient')))
  }
}
