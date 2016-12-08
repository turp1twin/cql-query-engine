/* global describe it */
import { typeIsArray } from '../../src/lib/util/util'
import chai from 'chai'
chai.should()

describe('typeIsArray', () => {
  it('should properly identify arrays', () => {
    typeIsArray([1, 2, 3]).should.be.true
    typeIsArray(['a', 'b', 'c']).should.be.true
    typeIsArray([['a', 'b', 'c'],[1, 2, 3]]).should.be.true
    typeIsArray([{a: 1, b: 2, c: 3}, {x: 24, y: 25, z: 26}])
    return typeIsArray([]).should.be.true
  })

  return it('should properly reject non-arrays', () => {
    typeIsArray(1).should.be.false
    typeIsArray('a').should.be.false
    typeIsArray('[]').should.be.false
    typeIsArray({a: 1, b: 2, c: 3}).should.be.false
    typeIsArray({a: []}).should.be.false
    return typeIsArray(null).should.be.false
  })
})
