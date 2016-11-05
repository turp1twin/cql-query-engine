import { typeIsArray, contains } from '../util/util'

export class Code {
  constructor (code, system, version, display) {
    this.code = code
    this.system = system
    this.version = version
    this.display = display
  }
}

export class ValueSet {
  constructor (oid, version, codes = []) {
    this.oid = oid
    this.version = version
    this.codes = codes
  }

  hasCode (code, system, version) {
    if (typeIsArray(code)) {
      let matches = code.map(c => this.hasCode(c))
      return contains(true, matches)
    }
    if (code instanceof Object) [code, system, version] = [code.code, code.system, code.version]
    let matches = (this.codes.filter(c => c.code === code).map(c => c))
    if (system != null) matches = (matches.filter(c => c.system === system).map(c => c))
    if (version != null) matches = (matches.filter(c => c.version === version).map(c => c))
    return matches.length > 0
  }

  matchCode (code, system, version) {
    let matches = (this.codes.filter(c => c.code === code).map(c => c))
    if (system != null) matches = (matches.filter(c => c.system === system).map(c => c))
    if (version != null) matches = (matches.filter(c => c.version === version).map(c => c))
    return matches.length > 0
  }
}

// TODO: Concept (and support for constructing by literal or instance)
