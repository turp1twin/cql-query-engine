import Results from './Results'
import { PatientContext, PopulationContext } from './context'

export default class Executor {
  constructor (library, codeService, parameters) {
    this.library = library
    this.codeService = codeService
    this.parameters = parameters
  }

  withLibrary (lib) {
    this.library = lib
    return this
  }

  withParameters (params) {
    this.parameters = params != null ? params : {}
    return this
  }

  withCodeService (cs) {
    this.codeService = cs
    return this
  }

  execExpression (expression, patientSource) {
    const r = new Results()
    const expr = this.library.expressions[expression]
    if (expr) {
      let p
      while ((p = patientSource.currentPatient())) {
        let patientCtx = new PatientContext(this.library, p, this.codeService, this.parameters)
        r.recordPatientResult(patientCtx.patient.id(), expression, expr.exec(patientCtx))
        patientSource.nextPatient()
      }
    }
    return r
  }

  exec (patientSource) {
    const r = this.execPatientContext(patientSource)
    let popContext = new PopulationContext(this.library, r, this.codeService, this.parameters)
    for (let key in this.library.expressions) {
      let expr = this.library.expressions[key]
      if (expr.context === 'Population') {
        r.recordPopulationResult(key, expr.exec(popContext))
      }
    }
    return r
  }

  execPatientContext (patientSource) {
    const r = new Results()
    let p
    while ((p = patientSource.currentPatient())) {
      let patientCtx = new PatientContext(this.library, p, this.codeService, this.parameters)
      for (let key in this.library.expressions) {
        let expr = this.library.expressions[key]
        if (expr.context === 'Patient') {
          r.recordPatientResult(patientCtx.patient.id(), key, expr.exec(patientCtx))
        }
      }
      patientSource.nextPatient()
    }
    return r
  }
}
