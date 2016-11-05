/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'

describe('If', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should return the correct value when the expression is true', function () {
    return this.exp.exec(this.ctx.withParameters({ var: true })).should.equal('true return')
  })

  return it('should return the correct value when the expression is false', function () {
    return this.exp.exec(this.ctx.withParameters({ var: false })).should.equal('false return')
  })
})


describe('Case', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should be able to execute a standard case statement', function () {
    let vals = [
      {'x': 1, 'y': 2, 'message': 'X < Y'},
      {'x': 2, 'y': 1, 'message': 'X > Y'},
      {'x': 1, 'y': 1, 'message': 'X == Y'}
    ]
    return vals.map(item => {
      this.ctx.withParameters({ X: item.x, Y: item.y })
      return this.standard.exec(this.ctx).should.equal(item.message)
    })
  })

  return it('should be able to execute a selected case statement', function() {
    let vals = [
      {'var': 1, 'message': 'one'},
      {'var': 2, 'message': 'two'},
      {'var': 3, 'message': '?'}
    ]
    return vals.map(item => {
      this.ctx.withParameters({ var: item.var })
      return this.selected.exec(this.ctx).should.equal(item.message)
    })
  })
})
