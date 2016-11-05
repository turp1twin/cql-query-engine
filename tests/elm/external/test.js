/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'
import vsets from './valuesets'
import { p1 } from './patients'

describe('Retrieve', function () {
  beforeEach(function () {
    setup(this, data, [ p1 ], vsets)
  })

  it('should find conditions', function () {
    let c = this.conditions.exec(this.ctx)
    c.should.have.length(2)
    c[0].id().should.equal('http://cqframework.org/3/2')
    return c[1].id().should.equal('http://cqframework.org/3/4')
  })

  it('should find encounter performances', function () {
    let e = this.encounters.exec(this.ctx)
    e.should.have.length(3)
    e[0].id().should.equal('http://cqframework.org/3/1')
    e[1].id().should.equal('http://cqframework.org/3/3')
    return e[2].id().should.equal('http://cqframework.org/3/5')
  })

  it('should find observations with a value set', function () {
    let p = this.pharyngitisConditions.exec(this.ctx)
    p.should.have.length(1)
    return p[0].id().should.equal('http://cqframework.org/3/2')
  })

  it('should find encounter performances with a value set', function () {
    let a = this.ambulatoryEncounters.exec(this.ctx)
    a.should.have.length(3)
    a[0].id().should.equal('http://cqframework.org/3/1')
    a[1].id().should.equal('http://cqframework.org/3/3')
    return a[2].id().should.equal('http://cqframework.org/3/5')
  })

  it('should find encounter performances by service type', function () {
    let e = this.encountersByServiceType.exec(this.ctx)
    e.should.have.length(3)
    e[0].id().should.equal('http://cqframework.org/3/1')
    e[1].id().should.equal('http://cqframework.org/3/3')
    return e[2].id().should.equal('http://cqframework.org/3/5')
  })

  it('should not find conditions with wrong valueset', function () {
    let e = this.wrongValueSet.exec(this.ctx)
    return e.should.be.empty
  })

  return it('should not find encounter performances using wrong codeProperty', function () {
    let e = this.wrongCodeProperty.exec(this.ctx)
    return e.should.be.empty
  })
})
