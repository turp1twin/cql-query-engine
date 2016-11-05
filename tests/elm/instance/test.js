/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'

describe('Instance', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  return it('should create generic json objects with the correct key values', function () {
    this.quantity.exec(this.ctx).unit.should.eql('a')
    this.quantity.exec(this.ctx).value.should.eql(12)
    this.med.exec(this.ctx).isBrand.should.eql(false)
    this.med.exec(this.ctx).name.should.eql('Best Med Ever')
    return this.val.exec(this.ctx).should.eql(12)
  })
})


