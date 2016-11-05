/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'

describe('ParameterDef', function () {
  beforeEach(function () {
    setup(this, data)
    this.param = this.lib.parameters.MeasureYear
  })

  it('should have a name', function () {
    return this.param.name.should.equal('MeasureYear')
  })

  it('should execute to default value', function () {
    return this.param.exec(this.ctx).should.equal(2012)
  })

  it('should execute to provided value', function () {
    return this.param.exec(this.ctx.withParameters({ MeasureYear: 2013 })).should.equal(2013)
  })

  it('should work with typed int parameters', function () {
    let intParam = this.lib.parameters.IntParameter
    return intParam.exec(this.ctx.withParameters({ IntParameter: 17 })).should.equal(17)
  })

  it('should work with typed list parameters', function () {
    let listParam = this.lib.parameters.ListParameter
    return listParam.exec(this.ctx.withParameters({ ListParameter: {'a': 'a', 'b': 'b', 'c': 'c'} })).should.eql({'a': 'a', 'b': 'b', 'c': 'c'})
  })

  return it('should work with typed tuple parameters', function () {
    let tupleParam = this.lib.parameters.TupleParameter
    let v = { a: 1, b: 'bee', c: true, d: [10, 9, 8], e: {f: 'eff', g: false} }
    return tupleParam.exec(this.ctx.withParameters({ TupleParameter: v })).should.eql(v)
  })
})

describe('ParameterRef', function() {
  beforeEach(function () {
    setup(this, data)
  })

  it('should have a name', function () {
    return this.foo.name.should.equal('FooP')
  })

  it('should execute to default value', function () {
    return this.foo.exec(this.ctx).should.equal('Bar')
  })

  return it('should execute to provided value', function () {
    return this.foo.exec(this.ctx.withParameters({ FooP: 'Bah' })).should.equal('Bah')
  })
})
