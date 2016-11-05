/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'
import vsets from './valuesets'
import { p1 } from './patients'

describe('DateRangeOptimizedQuery', function () {
  beforeEach(function () {
    return setup(this, data, [ p1 ], vsets)
  })

  it('should find encounters performed during the MP', function () {
    let e = this.encountersDuringMP.exec(this.ctx)
    e.should.have.length(1)
    return e[0].id().should.equal('http://cqframework.org/3/5')
  })

  it('should find ambulatory encounters performed during the MP', function () {
    let e = this.ambulatoryEncountersDuringMP.exec(this.ctx)
    e.should.have.length(1)
    return e[0].id().should.equal('http://cqframework.org/3/5')
  })

  return it('should find ambulatory encounter performances included in the MP', function () {
    let e = this.ambulatoryEncountersIncludedInMP.exec(this.ctx)
    e.should.have.length(1)
    return e[0].id().should.equal('http://cqframework.org/3/5')
  })
})

describe.skip('IncludesQuery', function () {
  beforeEach(function () {
    setup(this, data, [ p1 ], vsets)
  })

  return it('should find ambulatory encounter performances included in the MP', function () {
    let e = this.mPIncludedAmbulatoryEncounters.exec(this.ctx)
    e.should.have.length(1)
    return e[0].id().should.equal('http://cqframework.org/3/5')
  })
})

describe('MultiSourceQuery', function () {
  beforeEach(function () {
    return setup(this, data, [ p1 ], vsets)
  })

  it('should find all Encounters performed and Conditions', function () {
    let e = this.msQuery.exec(this.ctx)
    return e.should.have.length(6)
  })

  it.skip('should find encounters performed during the MP and All conditions', function () {
    let e = this.msQueryWhere.exec(this.ctx)
    return e.should.have.length(2)
  })

  return it.skip('should be able to filter items in the where clause', function () {
    let e = this.msQueryWhere2.exec(this.ctx)
    return e.should.have.length(1)
  })
})

describe.skip('QueryRelationship', function () {
  beforeEach(function () {
    setup(this, data, [ p1 ])
  })

  it('should be able to filter items with a with clause', function () {
    let e = this.withQuery.exec(this.ctx)
    return e.should.have.length(3)
  })

  it('with clause should filter out items not available', function () {
    let e = this.withQuery2.exec(this.ctx)
    return e.should.have.length(0)
  })

  it('should be able to filter items with a without clause', function () {
    let e = this.withOutQuery.exec(this.ctx)
    return e.should.have.length(3)
  })

  return it('without clause should be able to filter items with a without clause', function () {
    let e = this.withOutQuery2.exec(this.ctx)
    return e.should.have.length(0)
  })
})

describe('QueryDefine', function () {
  beforeEach(function () {
    setup(this, data, [ p1 ])
  })

  return it('should be able to define a variable in a query and use it', function () {
    let e = this.query.exec(this.ctx)
    e.should.have.length(3)
    e[0]['a'].should.equal(e[0]['E'])
    e[1]['a'].should.equal(e[1]['E'])
    return e[2]['a'].should.equal(e[2]['E'])
  })
})

describe('Tuple', function () {
  beforeEach(function () {
    setup(this, data, [ p1 ])
  })

  return it('should be able to return tuple from a query', function () {
    let e = this.query.exec(this.ctx)
    return e.should.have.length(3)
  })
})

describe('Sorting', function () {
  beforeEach(function () {
    setup(this, data, [ p1 ])
  })

  it('should be able to sort by a tuple field asc', function () {
    let e = this.tupleAsc.exec(this.ctx)
    e.should.have.length(3)
    e[0].id().should.equal('http://cqframework.org/3/1')
    e[1].id().should.equal('http://cqframework.org/3/3')
    e[2].id().should.equal('http://cqframework.org/3/5')

    e = this.tupleReturnAsc.exec(this.ctx)
    e.should.have.length(3)
    e[0].id().should.equal('http://cqframework.org/3/1')
    e[1].id().should.equal('http://cqframework.org/3/3')
    e[2].id().should.equal('http://cqframework.org/3/5')

    e = this.tupleReturnTupleAsc.exec(this.ctx)
    e.should.have.length(3)
    e[0].E.id().should.equal('http://cqframework.org/3/1')
    e[1].E.id().should.equal('http://cqframework.org/3/3')
    return e[2].E.id().should.equal('http://cqframework.org/3/5')
  })

  it('should be able to sort by a tuple field desc', function () {
    let e = this.tupleDesc.exec(this.ctx)
    e.should.have.length(3)
    e[2].id().should.equal('http://cqframework.org/3/1')
    e[1].id().should.equal('http://cqframework.org/3/3')
    e[0].id().should.equal('http://cqframework.org/3/5')

    e = this.tupleReturnDesc.exec(this.ctx)
    e.should.have.length(3)
    e[2].id().should.equal('http://cqframework.org/3/1')
    e[1].id().should.equal('http://cqframework.org/3/3')
    e[0].id().should.equal('http://cqframework.org/3/5')

    e = this.tupleReturnTupleDesc.exec(this.ctx)
    e.should.have.length(3)
    e[2].E.id().should.equal('http://cqframework.org/3/1')
    e[1].E.id().should.equal('http://cqframework.org/3/3')
    return e[0].E.id().should.equal('http://cqframework.org/3/5')
  })

  it('should be able to sort by number asc', function () {
    let e = this.numberAsc.exec(this.ctx)
    return e.should.eql([0, 3, 5, 6, 7, 8, 9])
  })

  it('should be able to sort by number desc', function () {
    let e = this.numberDesc.exec(this.ctx)
    return e.should.eql([9, 8, 7, 6, 5, 3, 0])
  })

  it('should be able to sort by string asc', function () {
    this.stringAsc.exec(this.ctx).should.eql(['change', 'dont', 'jenny', 'number', 'your'])
    return this.stringReturnAsc.exec(this.ctx).should.eql(['change', 'dont', 'jenny', 'number', 'your'])
  })

  return it('should be able to sort by string desc', function () {
    this.stringDesc.exec(this.ctx).should.eql(['your', 'number', 'jenny', 'dont', 'change']);
    return this.stringReturnDesc.exec(this.ctx).should.eql(['your', 'number', 'jenny', 'dont', 'change'])
  })
})

describe('Distinct', function () {
  beforeEach(function () {
    setup(this, data)
  })

  it('should return distinct by default', function () {
    this.defaultNumbers.exec(this.ctx).should.eql([1, 2, 3, 4])
    this.defaultStrings.exec(this.ctx).should.eql(['foo', 'bar', 'baz'])
    return this.defaultTuples.exec(this.ctx).should.eql([{a: 1, b: 2}, {a: 2, b: 3}])
  })

  it('should eliminate duplicates when returning distinct', function () {
    this.distinctNumbers.exec(this.ctx).should.eql([1, 2, 3, 4])
    this.distinctStrings.exec(this.ctx).should.eql(['foo', 'bar', 'baz'])
    return this.distinctTuples.exec(this.ctx).should.eql([{a: 1, b: 2}, {a: 2, b: 3}])
  })

  return it('should not eliminate duplicates when returning all', function () {
    this.allNumbers.exec(this.ctx).should.eql([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 3, 3, 3, 2, 2, 1])
    this.allStrings.exec(this.ctx).should.eql(['foo', 'bar', 'baz', 'bar'])
    return this.allTuples.exec(this.ctx).should.eql([{a: 1, b: 2}, {a: 2, b: 3}, {a: 1, b: 2}])
  })
})
