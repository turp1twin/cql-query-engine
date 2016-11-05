import { Library } from '../../../src/cql'
import { guard } from '../../../src/util/util'

export default class Repository {
  constructor (data) {
    this.data = data
    this.libraries = (() => {
      const libs = []
      for (let key in data) libs.push(data[key])
      return libs
    })()
  }

  resolve (library, version) {
    for (let lib of this.libraries) {
      if (guard(lib.library.identifier, x => x.id) === library && guard(lib.library.identifier, x1 => x1.version) === version) {
        return new Library(lib, this)
      }
    }
  }
}
