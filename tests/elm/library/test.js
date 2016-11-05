/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'
import Repository from './repository'

import { p1, p2 } from './patients'

describe('In Age Demographic', function () {
  beforeEach(function () {
    setup(this, data, [ p1, p2 ])
    this.results = this.executor.withLibrary(this.lib).execPatientContext(this.patientSource)
  })

  it('should have correct patient results', function () {
    this.results.patientResults['1'].InDemographic.should.equal(false)
    return this.results.patientResults['2'].InDemographic.should.equal(true)
  })

  return it('should have empty population results', function () {
    return this.results.populationResults.should.be.empty
  })
})


describe('Using CommonLib', function () {
  beforeEach(function () {
    setup(this, data, [ p1, p2 ], {}, {}, new Repository(data))
  })

  it('should have using models defined', function () {
    this.lib.usings.should.not.be.empty
    this.lib.usings.length.should.equal(1)
    return this.lib.usings[0].name.should.equal('QUICK')
  })

  it('Should have included a library', function () {
    return this.lib.includes.should.not.be.empty
  })

  return it('should be able to execute expression from included library', function () {
    this.results = this.executor.withLibrary(this.lib).execPatientContext(this.patientSource)
    this.results.patientResults['1'].ID.should.equal(false)
    this.results.patientResults['2'].ID.should.equal(true)
    this.results.patientResults['2'].FuncTest.should.equal(7)
    return this.results.patientResults['1'].FuncTest.should.equal(7)
  })
})