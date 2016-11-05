import Exception from '../datatypes/Exception'
import { guard } from '../util/util'

export class Context {
  constructor (parent, codeService = null, parameters = {}) {
    this.parent = parent
    this._codeService = codeService
    this._parameters = parameters
    this.contextValues = {}
    this.libraryContext = {}
  }

  get parameters () {
    return this._parameters || (this.parent != null ? this.parent.parameters : undefined)
  }

  set parameters (params) {
    this._parameters = params
  }

  get codeService () {
    return this._codeService || (this.parent != null ? this.parent.codeService : undefined)
  }

  set codeService (cs) {
    this._codeService = cs
  }

  withParameters (params) {
    this.parameters = params != null ? params : {}
    return this
  }

  withCodeService (cs) {
    this.codeService = cs
    return this
  }

  rootContext () {
    if (this.parent) {
      return this.parent.rootContext()
    } else return this
  }

  findRecords (profile) {
    return guard(this.parent, x => x.findRecords(profile))
  }

  childContext (contextValues = {}) {
    let ctx = new Context(this)
    ctx.contextValues = contextValues
    return ctx
  }

  getLibraryContext (library) {
    return guard(this.parent, x => x.getLibraryContext(library))
  }

  getParameter (name) {
    return guard(this.parent, x => x.getParameter(name))
  }

  getValueSet (name) {
    return guard(this.parent, x => x.getValueSet(name))
  }

  get (identifier) {
    return this.contextValues[identifier] != null ? this.contextValues[identifier] : guard(this.parent, x => x.get(identifier))
  }

  set (identifier, value) {
    this.contextValues[identifier] = value
  }
}

export class PatientContext extends Context {
  constructor (library, patient, codeService, parameters) {
    super(library, codeService, parameters)
    this.library = library
    this.patient = patient
  }

  rootContext () { return this }

  getLibraryContext (library) {
    return this.libraryContext[library] || (this.libraryContext[library] = new PatientContext(this.get(library), this.patient, this.codeService, this.parameters))
  }

  findRecords (profile) {
    return guard(this.patient, x => x.findRecords(profile))
  }
}

export class PopulationContext extends Context {
  constructor (library, results, codeService, parameters) {
    super(library, codeService, parameters)
    this.library = library
    this.results = results
  }

  rootContext () { return this }

  findRecords (template) {
    throw new Exception('Retrieves are not currently supported in Population Context')
  }

  getLibraryContext (library) {
    throw new Exception('Library expressions are not currently supported in Population Context')
  }

  get (identifier) {
    // First check to see if the identifier is a population context expression that has already been cached
    if (this.contextValues[identifier]) {
      return this.contextValues[identifier]
    }
    // If not look to see if the library has a population expression of that identifier
    if (guard(this.library[identifier], x => x.context) === 'Population') {
      return this.library.expressions[identifier]
    }
    // Lastly attempt to gather all patient level results that have that identifier
    // should this compact null values before return ?
    return (() => {
      let result = []
      for (let pid in this.results.patientResults) {
        let res = this.results.patientResults[pid]
        result.push(res[identifier])
      }
      return result
    })()
  }
}
