/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'

describe('Tuple', function () {
  beforeEach(function () {
    setup(this, data)
  })

  return it('should be able to define a tuple', function () {
    let e = this.tup.exec(this.ctx)
    e['a'].should.equal(1)
    return e['b'].should.equal(2)
  })
})
