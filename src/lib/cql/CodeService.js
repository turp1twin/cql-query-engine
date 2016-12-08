import { Code, ValueSet } from '../datatypes/datatypes'
import { guard } from '../util/util'

export default class CodeService {
  constructor (valueSetsJson = {}) {
    this.valueSets = {}
    for (let oid in valueSetsJson) {
      this.valueSets[oid] = {}
      for (let version in valueSetsJson[oid]) {
        let codes = (valueSetsJson[oid][version].map(code => new Code(code.code, code.system, code.version)))
        this.valueSets[oid][version] = new ValueSet(oid, version, codes)
      }
    }
  }

  findValueSetsByOid (oid) {
    return ((() => {
      const result = []
      for (let version in this.valueSets[oid]) {
        let valueSet = this.valueSets[oid][version]
        result.push(valueSet)
      }
      return result
    })())
  }

  findValueSet (oid, version) {
    if (version != null) {
      return guard(this.valueSets[oid], x => x[version])
    } else {
      const results = this.findValueSetsByOid(oid)
      if (results.length === 0) return null
      else {
        return results.reduce((a, b) => {
          if (a.version > b.version) return a
          else return b
        })
      }
    }
  }
}
