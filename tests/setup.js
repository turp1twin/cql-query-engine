import { Library, PatientSource, CodeService, PatientContext, Executor } from '../src/cql'

export default function (test, data, patients = [], valuesets = {}, parameters = {}, repository = null) {
  try {
    test.lib = new Library(data[test.test.parent.title], repository)
    let cService = new CodeService(valuesets)
    let pSource = new PatientSource(patients)
    test.ctx = new PatientContext(test.lib, pSource.currentPatient(), cService, parameters)
    test.executor = new Executor(test.lib, cService, parameters)
    test.patientSource = pSource
    for (let k in test.lib.valuesets) {
      let v = test.lib.valuesets[k]
      test[k[0].toLowerCase() + k.slice(1)] = v
    }

    let result = []
    for (let k in test.lib.expressions) {
      let v = test.lib.expressions[k]
      result.push(test[k[0].toLowerCase() + k.slice(1)] = v.expression)
    }
    return result
  } catch (e) {
    e.message = `[${test.test.parent.title}] ${e.message}`
    throw e
  }
}

