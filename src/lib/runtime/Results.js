export default class Results {
  constructor () {
    this.patientResults = {}
    this.populationResults = {}
  }

  recordPatientResult (patientId, resultName, result) {
    if (this.patientResults[patientId] == null) this.patientResults[patientId] = {}
    return (this.patientResults[patientId][resultName] = result)
  }

  recordPopulationResult (resultName, result) {
    return (this.populationResults[resultName] = result)
  }
}
