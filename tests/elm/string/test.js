/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'
import str from '../../../src/lib/elm/string'
import { ArrayIndexOutOfBoundsException } from '../../../src/lib/elm/overloaded'

let expect = chai.expect

describe('Concat', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it.skip('should be a Concat', function () {
    this.helloWorld.should.be.an.instanceOf(str.Concat)
    return this.helloWorldVariables.should.be.an.instanceOf(str.Concat)
  })

  it('should concat two strings', function () {
    return this.helloWorld.exec(this.ctx).should.equal('HelloWorld')
  })

  it('should concat multiple strings', function () {
    return this.sentence.exec(this.ctx).should.equal('The quick brown fox jumps over the lazy dog.')
  })

  it('should return null when an arg is null', function () {
    return expect(this.concatNull.exec(this.ctx)).to.be.null
  })

  return it('should concat variables', function () {
    return this.helloWorldVariables.exec(this.ctx).should.equal('HelloWorld')
  })
})

describe('Combine', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it.skip('should be a Combine', function () {
    return this.separator.should.be.an.instanceOf(str.Combine)
  })

  it('should combine strings with no separator', function () {
    return this.noSeparator.exec(this.ctx).should.equal('abcdefghijkl')
  })

  it('should combine strings with a separator', function () {
    return this.separator.exec(this.ctx).should.equal('abc;def;ghi;jkl')
  })

  it('should return null when the list is null', function () {
    return expect(this.combineNull.exec(this.ctx)).to.be.null
  })

  return it('should return null when an item in the list is null', function () {
    return expect(this.combineNullItem.exec(this.ctx)).to.be.null
  })
})

describe('Split', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it.skip('should be a Split', function () {
    return this.commaSeparated.should.be.an.instanceOf(str.Split)
  })

  it('should split strings on comma', function () {
    return this.commaSeparated.exec(this.ctx).should.eql(['a', 'b', 'c', '', '1', '2', '3'])
  })

  it('should return single-item array when separator is not used', function () {
    return this.separatorNotUsed.exec(this.ctx).should.eql(['a,b,c,,1,2,3'])
  })

  it('should return null when separating null', function () {
    return expect(this.separateNull.exec(this.ctx)).to.be.null
  })

  // TODO: Verify this assumption
  return it('should return null when the separator is null', function () {
    return expect(this.separateUsingNull.exec(this.ctx)).to.be.null
  })
})

describe('Length', function() {
  beforeEach(function () {
    return setup(this, data)
  })

  it.skip('should be a Length', function () {
    return this.elevenLetters.should.be.an.instanceOf(str.Length)
  })

  it('should count letters in string', function () {
    return this.elevenLetters.exec(this.ctx).should.equal(11)
  })

  return it('should return null when string is null', function () {
    return expect(this.nullString.exec(this.ctx)).to.be.null
  })
})

describe('Upper', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it.skip('should be an Upper', function () {
    return this.upperC.should.be.an.instanceOf(str.Upper)
  })

  it('should convert lower to upper', function () {
    return this.lowerC.exec(this.ctx).should.equal('ABCDEFG123')
  })

  it('should leave upper as upper', function () {
    return this.upperC.exec(this.ctx).should.equal('ABCDEFG123')
  })

  it('should convert camel to upper', function () {
    return this.camelC.exec(this.ctx).should.equal('ABCDEFG123')
  })

  return it('should return null when uppering null', function () {
    return expect(this.nullString.exec(this.ctx)).to.be.null
  })
})

describe('Lower', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it.skip('should be a Lower', function () {
    return this.lowerC.should.be.an.instanceOf(str.Lower)
  })

  it('should leave lower as lower', function () {
    return this.lowerC.exec(this.ctx).should.equal('abcdefg123')
  })

  it('should convert upper to lower', function () {
    return this.upperC.exec(this.ctx).should.equal('abcdefg123')
  })

  it('should convert camel to lower', function () {
    return this.camelC.exec(this.ctx).should.equal('abcdefg123')
  })

  return it('should return null when lowering null', function () {
    return expect(this.nullString.exec(this.ctx)).to.be.null
  })
})

// TODO: Verify behavior since its different than JS
describe('Indexer', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should get letter at index', function () {
    return this.helloWorldSix.exec(this.ctx).should.equal('W')
  })

  it('should error on index 0 (out of bounds)', function() {
    return expect(() => this.helloWorldZero.exec(this.ctx)).to.throw(ArrayIndexOutOfBoundsException)
  })

  it('should error on index 20 (out of bounds)', function () {
    return expect(() => this.helloWorldTwenty.exec(this.ctx)).to.throw(ArrayIndexOutOfBoundsException)
  })

  it('should return null when string is null', function () {
    return expect(this.nullString.exec(this.ctx)).to.be.null
  })

  return it('should return null when index is null', function () {
    return expect(this.nullIndex.exec(this.ctx)).to.be.null
  })
})

describe('PositionOf', function() {
  beforeEach(function () {
    return setup(this, data)
  })

  it.skip('should be a PositionOf', function () {
    return this.found.should.be.an.instanceOf(str.Pos)
  })

  it('should return 1-based position', function () {
    return this.found.exec(this.ctx).should.equal(3)
  })

  it('should return 0 when not found', function () {
    return this.notFound.exec(this.ctx).should.equal(0)
  })

  it('should return null when pattern is null', function () {
    return expect(this.nullPattern.exec(this.ctx)).to.be.null
  })

  return it('should return null when string is null', function () {
    return expect(this.nullString.exec(this.ctx)).to.be.null
  })
})

describe('Substring', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it.skip('should be a Substring', function () {
    return this.world.should.be.an.instanceOf(str.Substring)
  })

  it('should get substring to end', function () {
    return this.world.exec(this.ctx).should.equal('World')
  })

  it('should get substring with length', function () {
    return this.or.exec(this.ctx).should.equal('or')
  })

  it('should get substring with zero length', function () {
    return this.zeroLength.exec(this.ctx).should.equal('')
  })

  it('should error on index 0 (out of bounds)', function () {
    return expect(() => this.startTooLow.exec(this.ctx)).to.throw(Error)
  })

  it('should not error on too much length (out of bounds)', function () {
    return this.tooMuchLength.exec(this.ctx).should.equal('orld')
  })

  it('should error on negative length', function () {
    return expect(() => this.negativeLength.exec(this.ctx)).to.throw(Error)
  })

  it('should return null when string is null', function () {
    return expect(this.nullString.exec(this.ctx)).to.be.null
  })

  return it('should return null when start is null', function () {
    return expect(this.nullStart.exec(this.ctx)).to.be.null
  })
})
