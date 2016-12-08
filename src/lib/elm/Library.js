import { ExpressionDef, FunctionDef, ParameterDef, ValueSetDef } from './expressions'

export default class Library {
  static getDef (obj) {
    return (obj && obj !== null && obj.def && obj.def !== null) ? obj.def : []
  }

  constructor (json, libraryManager) {
    this.source = json
    this.usings = []
    this.parameters = {}
    this.valuesets = {}
    this.expressions = {}
    this.includes = {}

    Library.getDef(json.library.usings).forEach(u => {
      if (u.localIdentifier !== 'System') {
        this.usings.push({'name': u.localIdentifier, 'version': u.version})
      }
    })

    Library.getDef(json.library.parameters).forEach(p => {
      this.parameters[p.name] = new ParameterDef(p)
    })

    Library.getDef(json.library.valueSets).forEach(v => {
      this.valuesets[v.name] = new ValueSetDef(v)
    })

    Library.getDef(json.library.statements).forEach(s => {
      this.expressions[s.name] = (s.type === 'FunctionDef' ? new FunctionDef(s) : new ExpressionDef(s))
    })

    Library.getDef(json.library.includes).forEach(i => {
      if (libraryManager) {
        this.includes[i.localIdentifier] = libraryManager.resolve(i.path, i.version)
      }
    })
  }

  get (identifier) {
    return this.expressions[identifier] || this.includes[identifier]
  }

  getValueSet (identifier) {
    return this.valuesets[identifier]
  }

  getParameter (name) {
    return this.parameters[name]
  }
}

