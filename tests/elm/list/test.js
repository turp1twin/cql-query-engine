/* global describe it beforeEach */
import chai from 'chai'
chai.should()
import setup from '../../setup'
import data from './data'
import { ArrayIndexOutOfBoundsException } from '../../../src/lib/elm/overloaded'

let expect = chai.expect

describe('List', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should execute to an array (ints)', function () {
    return this.intList.exec(this.ctx).should.eql([9, 7, 8])
  })

  it('should execute to an array (strings)', function () {
    return this.stringList.exec(this.ctx).should.eql(['a', 'bee', 'see'])
  })

  it('should execute to an array (mixed)', function () {
    return this.mixedList.exec(this.ctx).should.eql([1, 'two', 3])
  })

  return it('should execute to an empty array', function () {
    return this.emptyList.exec(this.ctx).should.eql([])
  })
})

describe('Exists', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should return false for empty list', function () {
    return this.emptyList.exec(this.ctx).should.be.false
  })

  return it('should return true for full list', function () {
    return this.fullList.exec(this.ctx).should.be.true
  })
})

describe('Equal', function () {
  this.beforeEach(function () {
    return setup(this, data)
  })

  it('should identify equal lists of integers', function () {
    return this.equalIntList.exec(this.ctx).should.be.true
  })

  it('should identify unequal lists of integers', function () {
    return this.unequalIntList.exec(this.ctx).should.be.false
  })

  it('should identify re-ordered lists of integers as unequal', function () {
    return this.reverseIntList.exec(this.ctx).should.be.false
  })

  it('should identify equal lists of strings', function () {
    return this.equalStringList.exec(this.ctx).should.be.true
  })

  it('should identify unequal lists of strings', function () {
    return this.unequalStringList.exec(this.ctx).should.be.false
  })

  it('should identify equal lists of tuples', function () {
    return this.equalTupleList.exec(this.ctx).should.be.true
  })

  return it('should identify unequal lists of tuples', function () {
    return this.unequalTupleList.exec(this.ctx).should.be.false
  })
})

describe('NotEqual', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should identify equal lists of integers', function () {
    return this.equalIntList.exec(this.ctx).should.be.false
  })

  it('should identify unequal lists of integers', function () {
    return this.unequalIntList.exec(this.ctx).should.be.true
  })

  it('should identify re-ordered lists of integers as unequal', function () {
    return this.reverseIntList.exec(this.ctx).should.be.true
  })

  it('should identify equal lists of strings', function () {
    return this.equalStringList.exec(this.ctx).should.be.false
  })

  it('should identify unequal lists of strings', function () {
    return this.unequalStringList.exec(this.ctx).should.be.true
  })

  it('should identify equal lists of tuples', function () {
    return this.equalTupleList.exec(this.ctx).should.be.false
  })

  return it('should identify unequal lists of tuples', function () {
    return this.unequalTupleList.exec(this.ctx).should.be.true
  })
})

describe('Union', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should union two lists to a single list', function () {
    return this.oneToTen.exec(this.ctx).should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('should maintain duplicate elements (according to CQL spec)', function () {
    return this.oneToFiveOverlapped.exec(this.ctx).should.eql([1, 2, 3, 4, 3, 4, 5])
  })

  it('should not fill in values in a disjoint union', function () {
    return this.disjoint.exec(this.ctx).should.eql([1, 2, 4, 5])
  })

  it('should return one list for multiple nested unions', function () {
    return this.nestedToFifteen.exec(this.ctx).should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
  })

  return it('should return null if either arg is null', function () {
    expect(this.unionNull.exec(this.ctx)).to.be.null
    return expect(this.nullUnion.exec(this.ctx)).to.be.null
  })
})

describe('Except', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should remove items in second list', function () {
    return this.exceptThreeFour.exec(this.ctx).should.eql([1, 2, 5])
  })

  it('should not be commutative', function () {
    return this.threeFourExcept.exec(this.ctx).should.eql([])
  })

  it('should remove items in second list regardless of order', function () {
    return this.exceptFiveThree.exec(this.ctx).should.eql([1, 2, 4])
  })

  it('should be a no-op when lists have no common items', function () {
    return this.exceptNoOp.exec(this.ctx).should.eql([1, 2, 3, 4, 5])
  })

  it('should remove all items when lists are the same', function () {
    return this.exceptEverything.exec(this.ctx).should.eql([])
  })

  it('should be a no-op when second list is empty', function () {
    return this.somethingExceptNothing.exec(this.ctx).should.eql([1, 2, 3, 4, 5])
  })

  it('should be a no-op when first list is already empty', function () {
    return this.nothingExceptSomething.exec(this.ctx).should.eql([])
  })

  it('should except lists of tuples', function () {
    return this.exceptTuples.exec(this.ctx).should.eql([{a: 1}, {a: 3}])
  })

  return it('should return null if either arg is null', function () {
    expect(this.exceptNull.exec(this.ctx)).to.be.null
    return expect(this.nullExcept.exec(this.ctx)).to.be.null
  })
})

describe('Intersect', function() {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should intersect two disjoint lists  to an empty list', function () {
    return this.noIntersection.exec(this.ctx).should.eql([])
  })

  it('should intersect two lists with a single common element', function () {
    return this.intersectOnFive.exec(this.ctx).should.eql([5])
  })

  it('should intersect two lists with several common elements', function () {
    return this.intersectOnEvens.exec(this.ctx).should.eql([2, 4, 6, 8, 10])
  })

  it('should intersect two identical lists to the same list', function () {
    return this.intersectOnAll.exec(this.ctx).should.eql([1, 2, 3, 4, 5])
  })

  it('should intersect multiple lists to only those elements common across all', function () {
    return this.nestedIntersects.exec(this.ctx).should.eql([4, 5])
  })

  it('should intersect lists of tuples', function() {
    return this.intersectTuples.exec(this.ctx).should.eql([{a: 1, b: 'c'}, {a: 2, b: 'c'}])
  })

  return it('should return null if either arg is null', function () {
    expect(this.intersectNull.exec(this.ctx)).to.be.null
    return expect(this.nullIntersect.exec(this.ctx)).to.be.null
  })
})

describe('IndexOf', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should return the correct 1-based index when an item is in the list', function () {
    return this.indexOfSecond.exec(this.ctx).should.equal(2)
  })

  it('should work with complex types like tuples', function () {
    return this.indexOfThirdTuple.exec(this.ctx).should.equal(3)
  })

  it('should return the first index when there are multiple matches', function () {
    return this.multipleMatches.exec(this.ctx).should.equal(4)
  })

  it('should return 0 when the item is not in the list', function () {
    return this.itemNotFound.exec(this.ctx).should.equal(0)
  })

  return it('should return null if either arg is null', function () {
    expect(this.nullList.exec(this.ctx)).to.be.null
    return expect(this.nullItem.exec(this.ctx)).to.be.null
  })
})

describe('Indexer', function () {
  this.beforeEach(function () {
    return setup(this, data)
  })

  it('should return the correct item based on the 1-based index', function () {
    return this.secondItem.exec(this.ctx).should.equal('b')
  })

  it('should throw ArrayIndexOutOfBoundsException when accessing index 0', function () {
    return expect(() => this.zeroIndex.exec(this.ctx)).to.throw(ArrayIndexOutOfBoundsException)
  })

  it('should throw ArrayIndexOutOfBoundsException when accessing out of bounds index', function () {
    return expect(() => this.outOfBounds.exec(this.ctx)).to.throw(ArrayIndexOutOfBoundsException)
  })

  return it('should return null if either arg is null', function () {
    expect(this.nullList.exec(this.ctx)).to.be.null
    return expect(this.nullIndexer.exec(this.ctx)).to.be.null
  })
})

describe('In', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should execute to true when item is in list', function () {
    return this.isIn.exec(this.ctx).should.be.true
  })

  it('should execute to false when item is not in list', function () {
    return this.isNotIn.exec(this.ctx).should.be.false
  })

  it('should execute to true when tuple is in list', function () {
    return this.tupleIsIn.exec(this.ctx).should.be.true
  })

  it('should execute to false when tuple is not in list', function () {
    return this.tupleIsNotIn.exec(this.ctx).should.be.false
  })

  return it('should return null if either arg is null', function () {
    expect(this.nullIn.exec(this.ctx)).to.be.null
    return expect(this.inNull.exec(this.ctx)).to.be.null
  })
})

describe('Contains', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should execute to true when item is in list', function () {
    return this.isIn.exec(this.ctx).should.be.true;
  })

  it('should execute to false when item is not in list', function () {
    return this.isNotIn.exec(this.ctx).should.be.false
  })

  it('should execute to true when tuple is in list', function () {
    return this.tupleIsIn.exec(this.ctx).should.be.true
  })

  it('should execute to false when tuple is not in list', function () {
    return this.tupleIsNotIn.exec(this.ctx).should.be.false
  })

  return it('should return null if either arg is null', function () {
    expect(this.nullIn.exec(this.ctx)).to.be.null
    return expect(this.inNull.exec(this.ctx)).to.be.null
  })
})

describe('Includes', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should execute to true when sublist is in list', function () {
    return this.isIncluded.exec(this.ctx).should.be.true
  })

  it('should execute to true when sublist is in list in different order', function () {
    return this.isIncludedReversed.exec(this.ctx).should.be.true
  })

  it('should execute to true when lists are the same', function () {
    return this.isSame.exec(this.ctx).should.be.true
  })

  it('should execute to false when sublist is not in list', function () {
    return this.isNotIncluded.exec(this.ctx).should.be.false
  })

  it('should execute to true when tuple sublist is in list', function () {
    return this.tuplesIncluded.exec(this.ctx).should.be.true
  })

  it('should execute to false when tuple sublist is not in list', function () {
    return this.tuplesNotIncluded.exec(this.ctx).should.be.false
  })

  return it('should return null if either arg is null', function () {
    expect(this.nullIncluded.exec(this.ctx)).to.be.null
    return expect(this.nullIncludes.exec(this.ctx)).to.be.null
  })
})

describe('IncludedIn', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should execute to true when sublist is in list', function () {
    return this.isIncluded.exec(this.ctx).should.be.true
  })

  it('should execute to true when sublist is in list in different order', function () {
    return this.isIncludedReversed.exec(this.ctx).should.be.true
  })

  it('should execute to true when lists are the same', function () {
    return this.isSame.exec(this.ctx).should.be.true
  })

  it('should execute to false when sublist is not in list', function () {
    return this.isNotIncluded.exec(this.ctx).should.be.false
  })

  it('should execute to true when tuple sublist is in list', function () {
    return this.tuplesIncluded.exec(this.ctx).should.be.true
  })

  it('should execute to false when tuple sublist is not in list', function () {
    return this.tuplesNotIncluded.exec(this.ctx).should.be.false
  })

  return it('should return null if either arg is null', function () {
    expect(this.nullIncluded.exec(this.ctx)).to.be.null
    return expect(this.nullIncludes.exec(this.ctx)).to.be.null
  })
})

describe('ProperIncludes', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should execute to true when sublist is in list', function () {
    return this.isIncluded.exec(this.ctx).should.be.true
  })

  it('should execute to true when sublist is in list in different order', function () {
    return this.isIncludedReversed.exec(this.ctx).should.be.true
  })

  it('should execute to false when lists are the same', function () {
    return this.isSame.exec(this.ctx).should.be.false
  })

  it('should execute to false when sublist is not in list', function () {
    return this.isNotIncluded.exec(this.ctx).should.be.false
  })

  it('should execute to true when tuple sublist is in list', function () {
    return this.tuplesIncluded.exec(this.ctx).should.be.true
  })

  it('should execute to false when tuple sublist is not in list', function () {
    return this.tuplesNotIncluded.exec(this.ctx).should.be.false
  })

  // TODO: Support for ProperContains
  return it.skip('should return null if either arg is null', function () {
    expect(this.nullIncluded.exec(this.ctx)).to.be.null
    return expect(this.nullIncludes.exec(this.ctx)).to.be.null
  })
})

describe('ProperIncludedIn', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should execute to true when sublist is in list', function () {
    return this.isIncluded.exec(this.ctx).should.be.true
  })

  it('should execute to true when sublist is in list in different order', function () {
    return this.isIncludedReversed.exec(this.ctx).should.be.true
  })

  it('should execute to false when lists are the same', function () {
    return this.isSame.exec(this.ctx).should.be.false
  })

  it('should execute to false when sublist is not in list', function () {
    return this.isNotIncluded.exec(this.ctx).should.be.false
  })

  it('should execute to true when tuple sublist is in list', function () {
    return this.tuplesIncluded.exec(this.ctx).should.be.true
  })

  it('should execute to false when tuple sublist is not in list', function () {
    return this.tuplesNotIncluded.exec(this.ctx).should.be.false
  })

  return it('should return null if either arg is null', function () {
    expect(this.nullIncluded.exec(this.ctx)).to.be.null
    return expect(this.nullIncludes.exec(this.ctx)).to.be.null
  })
})

describe('Expand', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should expand a list of lists', function () {
    return this.listOfLists.exec(this.ctx).should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 8, 7, 6, 5, 4, 3, 2, 1])
  })

  return it('should return null for a null list', function () {
    return expect(this.nullValue.exec(this.ctx)).to.be.null
  })
})

describe('Distinct', function() {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should remove duplicates', function () {
    return this.lotsOfDups.exec(this.ctx).should.eql([1, 2, 3, 4, 5])
  })

  return it('should do nothing to an already distinct array', function () {
    return this.noDups.exec(this.ctx).should.eql([2, 4, 6, 8, 10])
  })
})

describe('First', function() {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should get first of a list of numbers', function () {
    return this.numbers.exec(this.ctx).should.equal(1)
  })

  it('should get first of a list of letters', function () {
    return this.letters.exec(this.ctx).should.equal('a')
  })

  it('should get first of a list of lists', function () {
    return this.lists.exec(this.ctx).should.eql(['a', 'b', 'c'])
  })

  it('should get first of a list of tuples', function () {
    return this.tuples.exec(this.ctx).should.eql({ a: 1, b: 2, c: 3 })
  })

  it('should get first of a list of unordered numbers', function () {
    return this.unordered.exec(this.ctx).should.equal(3)
  })

  it('should return null for an empty list', function () {
    return expect(this.empty.exec(this.ctx)).to.be.null
  })

  return it('should return null for an empty list', function () {
    return expect(this.nullValue.exec(this.ctx)).to.be.null
  })
})

describe('Last', function() {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should get last of a list of numbers', function () {
    return this.numbers.exec(this.ctx).should.equal(4)
  })

  it('should get last of a list of letters', function () {
    return this.letters.exec(this.ctx).should.equal('c')
  })

  it('should get last of a list of lists', function () {
    return this.lists.exec(this.ctx).should.eql(['d', 'e', 'f'])
  })

  it('should get last of a list of tuples', function () {
    return this.tuples.exec(this.ctx).should.eql({ a: 24, b: 25, c: 26 })
  })

  it('should get last of a list of unordered numbers', function () {
    return this.unordered.exec(this.ctx).should.equal(2)
  })

  it('should return null for an empty list', function () {
    return expect(this.empty.exec(this.ctx)).to.be.null
  })

  return it('should return null for an empty list', function () {
    return expect(this.nullValue.exec(this.ctx)).to.be.null
  })
})

describe('Length', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should get length of a list of numbers', function () {
    return this.numbers.exec(this.ctx).should.equal(5)
  })

  it('should get length of a list of lists', function () {
    return this.lists.exec(this.ctx).should.equal(4)
  })

  it('should get length of a list of tuples', function () {
    return this.tuples.exec(this.ctx).should.equal(2)
  })

  it('should get length of an empty list', function () {
    return this.empty.exec(this.ctx).should.equal(0)
  })

  return it('should return null for an empty list', function () {
    return expect(this.nullValue.exec(this.ctx)).to.be.null
  })
})
