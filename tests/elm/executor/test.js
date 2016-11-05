/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'

import { p1, p2 } from './patients'

describe('Age', function () {
  beforeEach(function () {
    setup(this, data, [ p1, p2 ])
    this.results = this.executor.withLibrary(this.lib).exec(this.patientSource)
  })

  it('should have correct patient results', function () {
    this.results.patientResults['1'].Age.should.equal(32)
    return this.results.patientResults['2'].Age.should.equal(5)
  })

  it('should have the correct population results', function () {
    return this.results.populationResults.AgeSum.should.equal(37)
  })

  return it('should be able to reference other population context expressions', function () {
    return this.results.populationResults.AgeSumRef.should.equal(37)
  })
})
