/* global describe it */
import Uncertainty from '../../src/datatypes/Uncertainty'
import chai from 'chai'
chai.should()
let expect = chai.expect

describe('Uncertainty', () => {
  it('should contruct uncertainties with correct properties', () => {
    let oneToFive = new Uncertainty(1, 5)
    oneToFive.low.should.equal(1)
    oneToFive.high.should.equal(5)

    let oneToPInf = new Uncertainty(1, null)
    oneToPInf.low.should.equal(1)
    expect(oneToPInf.high).to.be.null

    let nInfToFive = new Uncertainty(null, 5)
    expect(nInfToFive.low).to.be.null
    nInfToFive.high.should.equal(5)

    let two = new Uncertainty(2)
    two.low.should.equal(2)
    two.high.should.equal(2)

    let everything = new Uncertainty()
    expect(everything.low).to.be.null
    return expect(everything.high).to.be.null
  })

  it('should swap low and high when constructed in wrong order', () => {
    let fiveToOne = new Uncertainty(5, 1)
    fiveToOne.low.should.equal(1)
    return fiveToOne.high.should.equal(5)
  })

  it('should contruct uncertainties with correct properties', () => {
    let oneToFive = new Uncertainty(1, 5)
    oneToFive.low.should.equal(1)
    return oneToFive.high.should.equal(5)
  })

  it('should detect zero-width intervals as points', () => {
    new Uncertainty(2).isPoint().should.be.true
    new Uncertainty(2, 2).isPoint().should.be.true
    new Uncertainty(null, null).isPoint().should.be.false
    new Uncertainty(2, null).isPoint().should.be.false
    new Uncertainty(null, 2).isPoint().should.be.false
    new Uncertainty(1, 2).isPoint().should.be.false
    return new Uncertainty().isPoint().should.be.false
  })

  it('should properly calculate equality', () => {
    // Equality
    new Uncertainty(1, 1).equals(new Uncertainty(1, 1)).should.be.true

    // <
    new Uncertainty(null, 1).equals(new Uncertainty(2, 2)).should.be.false
    new Uncertainty(null, 1).equals(new Uncertainty(2, 3)).should.be.false
    new Uncertainty(null, 1).equals(new Uncertainty(2, null)).should.be.false
    new Uncertainty(0, 1).equals(new Uncertainty(2, 2)).should.be.false
    new Uncertainty(0, 1).equals(new Uncertainty(2, 3)).should.be.false
    new Uncertainty(0, 1).equals(new Uncertainty(2, null)).should.be.false
    new Uncertainty(1, 1).equals(new Uncertainty(2, 2)).should.be.false
    new Uncertainty(1, 1).equals(new Uncertainty(2, 3)).should.be.false
    new Uncertainty(1, 1).equals(new Uncertainty(2, null)).should.be.false

    // <=
    expect(new Uncertainty(null, 1).equals(new Uncertainty(1, 1))).to.not.exist
    expect(new Uncertainty(null, 1).equals(new Uncertainty(1, 2))).to.not.exist
    expect(new Uncertainty(null, 1).equals(new Uncertainty(1, null))).to.not.exist
    expect(new Uncertainty(0, 1).equals(new Uncertainty(1, 1))).to.not.exist
    expect(new Uncertainty(0, 1).equals(new Uncertainty(1, 2))).to.not.exist
    expect(new Uncertainty(0, 1).equals(new Uncertainty(1, null))).to.not.exist
    expect(new Uncertainty(1, 1).equals(new Uncertainty(1, 2))).to.not.exist
    expect(new Uncertainty(1, 1).equals(new Uncertainty(1, null))).to.not.exist

    // overlaps
    expect(new Uncertainty(null, null).equals(new Uncertainty(null, null))).to.not.exist
    expect(new Uncertainty(null, 10).equals(new Uncertainty(5, 5))).to.not.exist
    expect(new Uncertainty(null, 10).equals(new Uncertainty(5, 10))).to.not.exist
    expect(new Uncertainty(null, 10).equals(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(null, 10).equals(new Uncertainty(5, null))).to.not.exist
    expect(new Uncertainty(null, 10).equals(new Uncertainty(0, 5))).to.not.exist
    expect(new Uncertainty(null, 10).equals(new Uncertainty(null, 5))).to.not.exist
    expect(new Uncertainty(0, 10).equals(new Uncertainty(5, 5))).to.not.exist
    expect(new Uncertainty(0, 10).equals(new Uncertainty(5, 10))).to.not.exist
    expect(new Uncertainty(0, 10).equals(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(0, 10).equals(new Uncertainty(5, null))).to.not.exist
    expect(new Uncertainty(0, 10).equals(new Uncertainty(0, 5))).to.not.exist
    expect(new Uncertainty(0, 10).equals(new Uncertainty(null, 5))).to.not.exist
    expect(new Uncertainty(10, 10).equals(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(10, 10).equals(new Uncertainty(5, null))).to.not.exist
    expect(new Uncertainty(10, null).equals(new Uncertainty(5, 10))).to.not.exist
    expect(new Uncertainty(10, null).equals(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(10, null).equals(new Uncertainty(5, null))).to.not.exist

    // >=
    expect(new Uncertainty(1, null).equals(new Uncertainty(null, 1))).to.not.exist
    expect(new Uncertainty(1, null).equals(new Uncertainty(0, 1))).to.not.exist
    expect(new Uncertainty(1, null).equals(new Uncertainty(1, 1))).to.not.exist
    expect(new Uncertainty(1, 2).equals(new Uncertainty(null, 1))).to.not.exist
    expect(new Uncertainty(1, 2).equals(new Uncertainty(0, 1))).to.not.exist
    expect(new Uncertainty(1, 2).equals(new Uncertainty(1, 1))).to.not.exist
    expect(new Uncertainty(1, 1).equals(new Uncertainty(null, 1))).to.not.exist
    expect(new Uncertainty(1, 1).equals(new Uncertainty(0, 1))).to.not.exist

    // >
    new Uncertainty(2, 2).equals(new Uncertainty(null, 1)).should.be.false
    new Uncertainty(2, 3).equals(new Uncertainty(null, 1)).should.be.false
    new Uncertainty(2, null).equals(new Uncertainty(null, 1)).should.be.false
    new Uncertainty(2, 2).equals(new Uncertainty(0, 1)).should.be.false
    new Uncertainty(2, 3).equals(new Uncertainty(0, 1)).should.be.false
    new Uncertainty(2, null).equals(new Uncertainty(0, 1)).should.be.false
    new Uncertainty(2, 2).equals(new Uncertainty(1, 1)).should.be.false
    new Uncertainty(2, 3).equals(new Uncertainty(1, 1)).should.be.false
    return new Uncertainty(2, null).equals(new Uncertainty(1, 1)).should.be.false
  })

  it('should properly calculate "less than" inequality', () => {
    // Equality
    new Uncertainty(1, 1).lessThan(new Uncertainty(1, 1)).should.be.false

    // <
    new Uncertainty(null, 1).lessThan(new Uncertainty(2, 2)).should.be.true
    new Uncertainty(null, 1).lessThan(new Uncertainty(2, 3)).should.be.true
    new Uncertainty(null, 1).lessThan(new Uncertainty(2, null)).should.be.true
    new Uncertainty(0, 1).lessThan(new Uncertainty(2, 2)).should.be.true
    new Uncertainty(0, 1).lessThan(new Uncertainty(2, 3)).should.be.true
    new Uncertainty(0, 1).lessThan(new Uncertainty(2, null)).should.be.true
    new Uncertainty(1, 1).lessThan(new Uncertainty(2, 2)).should.be.true
    new Uncertainty(1, 1).lessThan(new Uncertainty(2, 3)).should.be.true
    new Uncertainty(1, 1).lessThan(new Uncertainty(2, null)).should.be.true

    // <=
    expect(new Uncertainty(null, 1).lessThan(new Uncertainty(1, 1))).to.not.exist
    expect(new Uncertainty(null, 1).lessThan(new Uncertainty(1, 2))).to.not.exist
    expect(new Uncertainty(null, 1).lessThan(new Uncertainty(1, null))).to.not.exist
    expect(new Uncertainty(0, 1).lessThan(new Uncertainty(1, 1))).to.not.exist
    expect(new Uncertainty(0, 1).lessThan(new Uncertainty(1, 2))).to.not.exist
    expect(new Uncertainty(0, 1).lessThan(new Uncertainty(1, null))).to.not.exist
    expect(new Uncertainty(1, 1).lessThan(new Uncertainty(1, 2))).to.not.exist
    expect(new Uncertainty(1, 1).lessThan(new Uncertainty(1, null))).to.not.exist

    // overlaps
    expect(new Uncertainty(null, null).lessThan(new Uncertainty(null, null))).to.not.exist
    expect(new Uncertainty(null, 10).lessThan(new Uncertainty(5, 5))).to.not.exist
    expect(new Uncertainty(null, 10).lessThan(new Uncertainty(5, 10))).to.not.exist
    expect(new Uncertainty(null, 10).lessThan(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(null, 10).lessThan(new Uncertainty(5, null))).to.not.exist
    expect(new Uncertainty(null, 10).lessThan(new Uncertainty(0, 5))).to.not.exist
    expect(new Uncertainty(null, 10).lessThan(new Uncertainty(null, 5))).to.not.exist
    expect(new Uncertainty(0, 10).lessThan(new Uncertainty(5, 5))).to.not.exist
    expect(new Uncertainty(0, 10).lessThan(new Uncertainty(5, 10))).to.not.exist
    expect(new Uncertainty(0, 10).lessThan(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(0, 10).lessThan(new Uncertainty(5, null))).to.not.exist
    expect(new Uncertainty(0, 10).lessThan(new Uncertainty(0, 5))).to.not.exist
    expect(new Uncertainty(0, 10).lessThan(new Uncertainty(null, 5))).to.not.exist
    expect(new Uncertainty(10, 10).lessThan(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(10, 10).lessThan(new Uncertainty(5, null))).to.not.exist
    expect(new Uncertainty(10, null).lessThan(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(10, null).lessThan(new Uncertainty(5, null))).to.not.exist

    // >=
    new Uncertainty(1, null).lessThan(new Uncertainty(null, 1)).should.be.false
    new Uncertainty(1, null).lessThan(new Uncertainty(0, 1)).should.be.false
    new Uncertainty(1, null).lessThan(new Uncertainty(1, 1)).should.be.false
    new Uncertainty(1, 2).lessThan(new Uncertainty(null, 1)).should.be.false
    new Uncertainty(1, 2).lessThan(new Uncertainty(0, 1)).should.be.false
    new Uncertainty(1, 2).lessThan(new Uncertainty(1, 1)).should.be.false
    new Uncertainty(1, 1).lessThan(new Uncertainty(null, 1)).should.be.false
    new Uncertainty(1, 1).lessThan(new Uncertainty(0, 1)).should.be.false

    // >
    new Uncertainty(2, 2).lessThan(new Uncertainty(null, 1)).should.be.false
    new Uncertainty(2, 3).lessThan(new Uncertainty(null, 1)).should.be.false
    new Uncertainty(2, null).lessThan(new Uncertainty(null, 1)).should.be.false
    new Uncertainty(2, 2).lessThan(new Uncertainty(0, 1)).should.be.false
    new Uncertainty(2, 3).lessThan(new Uncertainty(0, 1)).should.be.false
    new Uncertainty(2, null).lessThan(new Uncertainty(0, 1)).should.be.false
    new Uncertainty(2, 2).lessThan(new Uncertainty(1, 1)).should.be.false
    new Uncertainty(2, 3).lessThan(new Uncertainty(1, 1)).should.be.false
    return new Uncertainty(2, null).lessThan(new Uncertainty(1, 1)).should.be.false
  })

  it('should properly calculate "less than or equals" inequality', () => {
    // Equality
    new Uncertainty(1, 1).lessThanOrEquals(new Uncertainty(1, 1)).should.be.true

    // <
    new Uncertainty(null, 1).lessThanOrEquals(new Uncertainty(2, 2)).should.be.true
    new Uncertainty(null, 1).lessThanOrEquals(new Uncertainty(2, 3)).should.be.true
    new Uncertainty(null, 1).lessThanOrEquals(new Uncertainty(2, null)).should.be.true
    new Uncertainty(0, 1).lessThanOrEquals(new Uncertainty(2, 2)).should.be.true
    new Uncertainty(0, 1).lessThanOrEquals(new Uncertainty(2, 3)).should.be.true
    new Uncertainty(0, 1).lessThanOrEquals(new Uncertainty(2, null)).should.be.true
    new Uncertainty(1, 1).lessThanOrEquals(new Uncertainty(2, 2)).should.be.true
    new Uncertainty(1, 1).lessThanOrEquals(new Uncertainty(2, 3)).should.be.true
    new Uncertainty(1, 1).lessThanOrEquals(new Uncertainty(2, null)).should.be.true

    // <=
    new Uncertainty(null, 1).lessThanOrEquals(new Uncertainty(1, 1)).should.be.true
    new Uncertainty(null, 1).lessThanOrEquals(new Uncertainty(1, 2)).should.be.true
    new Uncertainty(null, 1).lessThanOrEquals(new Uncertainty(1, null)).should.be.true
    new Uncertainty(0, 1).lessThanOrEquals(new Uncertainty(1, 1)).should.be.true
    new Uncertainty(0, 1).lessThanOrEquals(new Uncertainty(1, 2)).should.be.true
    new Uncertainty(0, 1).lessThanOrEquals(new Uncertainty(1, null)).should.be.true
    new Uncertainty(1, 1).lessThanOrEquals(new Uncertainty(1, 2)).should.be.true
    new Uncertainty(1, 1).lessThanOrEquals(new Uncertainty(1, null)).should.be.true

    // overlaps
    expect(new Uncertainty(null, null).lessThanOrEquals(new Uncertainty(null, null))).to.not.exist
    expect(new Uncertainty(null, 10).lessThanOrEquals(new Uncertainty(5, 5))).to.not.exist
    expect(new Uncertainty(null, 10).lessThanOrEquals(new Uncertainty(5, 10))).to.not.exist
    expect(new Uncertainty(null, 10).lessThanOrEquals(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(null, 10).lessThanOrEquals(new Uncertainty(5, null))).to.not.exist
    expect(new Uncertainty(null, 10).lessThanOrEquals(new Uncertainty(0, 5))).to.not.exist
    expect(new Uncertainty(null, 10).lessThanOrEquals(new Uncertainty(null, 5))).to.not.exist
    expect(new Uncertainty(0, 10).lessThanOrEquals(new Uncertainty(5, 5))).to.not.exist
    expect(new Uncertainty(0, 10).lessThanOrEquals(new Uncertainty(5, 10))).to.not.exist
    expect(new Uncertainty(0, 10).lessThanOrEquals(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(0, 10).lessThanOrEquals(new Uncertainty(5, null))).to.not.exist
    expect(new Uncertainty(0, 10).lessThanOrEquals(new Uncertainty(0, 5))).to.not.exist
    expect(new Uncertainty(0, 10).lessThanOrEquals(new Uncertainty(null, 5))).to.not.exist
    expect(new Uncertainty(10, 10).lessThanOrEquals(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(10, 10).lessThanOrEquals(new Uncertainty(5, null))).to.not.exist
    expect(new Uncertainty(10, null).lessThanOrEquals(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(10, null).lessThanOrEquals(new Uncertainty(5, null))).to.not.exist

    // >=
    expect(new Uncertainty(1, null).lessThanOrEquals(new Uncertainty(null, 1))).to.not.exist
    expect(new Uncertainty(1, null).lessThanOrEquals(new Uncertainty(0, 1))).to.not.exist
    expect(new Uncertainty(1, null).lessThanOrEquals(new Uncertainty(1, 1))).to.not.exist
    expect(new Uncertainty(1, 2).lessThanOrEquals(new Uncertainty(null, 1))).to.not.exist
    expect(new Uncertainty(1, 2).lessThanOrEquals(new Uncertainty(0, 1))).to.not.exist
    expect(new Uncertainty(1, 2).lessThanOrEquals(new Uncertainty(1, 1))).to.not.exist
    expect(new Uncertainty(1, 1).lessThanOrEquals(new Uncertainty(null, 1))).to.not.exist
    expect(new Uncertainty(1, 1).lessThanOrEquals(new Uncertainty(0, 1))).to.not.exist

    // >
    new Uncertainty(2, 2).lessThanOrEquals(new Uncertainty(null, 1)).should.be.false
    new Uncertainty(2, 3).lessThanOrEquals(new Uncertainty(null, 1)).should.be.false
    new Uncertainty(2, null).lessThanOrEquals(new Uncertainty(null, 1)).should.be.false
    new Uncertainty(2, 2).lessThanOrEquals(new Uncertainty(0, 1)).should.be.false
    new Uncertainty(2, 3).lessThanOrEquals(new Uncertainty(0, 1)).should.be.false
    new Uncertainty(2, null).lessThanOrEquals(new Uncertainty(0, 1)).should.be.false
    new Uncertainty(2, 2).lessThanOrEquals(new Uncertainty(1, 1)).should.be.false
    new Uncertainty(2, 3).lessThanOrEquals(new Uncertainty(1, 1)).should.be.false
    return new Uncertainty(2, null).lessThanOrEquals(new Uncertainty(1, 1)).should.be.false
  })

  it('should properly calculate "greater than" inequality', () => {
    // Equality
    new Uncertainty(1, 1).greaterThan(new Uncertainty(1, 1)).should.be.false

    // <
    new Uncertainty(null, 1).greaterThan(new Uncertainty(2, 2)).should.be.false
    new Uncertainty(null, 1).greaterThan(new Uncertainty(2, 3)).should.be.false
    new Uncertainty(null, 1).greaterThan(new Uncertainty(2, null)).should.be.false
    new Uncertainty(0, 1).greaterThan(new Uncertainty(2, 2)).should.be.false
    new Uncertainty(0, 1).greaterThan(new Uncertainty(2, 3)).should.be.false
    new Uncertainty(0, 1).greaterThan(new Uncertainty(2, null)).should.be.false
    new Uncertainty(1, 1).greaterThan(new Uncertainty(2, 2)).should.be.false
    new Uncertainty(1, 1).greaterThan(new Uncertainty(2, 3)).should.be.false
    new Uncertainty(1, 1).greaterThan(new Uncertainty(2, null)).should.be.false

    // <=
    new Uncertainty(null, 1).greaterThan(new Uncertainty(1, 1)).should.be.false
    new Uncertainty(null, 1).greaterThan(new Uncertainty(1, 2)).should.be.false
    new Uncertainty(null, 1).greaterThan(new Uncertainty(1, null)).should.be.false
    new Uncertainty(0, 1).greaterThan(new Uncertainty(1, 1)).should.be.false
    new Uncertainty(0, 1).greaterThan(new Uncertainty(1, 2)).should.be.false
    new Uncertainty(0, 1).greaterThan(new Uncertainty(1, null)).should.be.false
    new Uncertainty(1, 1).greaterThan(new Uncertainty(1, 2)).should.be.false
    new Uncertainty(1, 1).greaterThan(new Uncertainty(1, null)).should.be.false

    // overlaps
    expect(new Uncertainty(null, null).greaterThan(new Uncertainty(null, null))).to.not.exist
    expect(new Uncertainty(null, 10).greaterThan(new Uncertainty(5, 5))).to.not.exist
    expect(new Uncertainty(null, 10).greaterThan(new Uncertainty(5, 10))).to.not.exist
    expect(new Uncertainty(null, 10).greaterThan(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(null, 10).greaterThan(new Uncertainty(5, null))).to.not.exist
    expect(new Uncertainty(null, 10).greaterThan(new Uncertainty(0, 5))).to.not.exist
    expect(new Uncertainty(null, 10).greaterThan(new Uncertainty(null, 5))).to.not.exist
    expect(new Uncertainty(0, 10).greaterThan(new Uncertainty(5, 5))).to.not.exist
    expect(new Uncertainty(0, 10).greaterThan(new Uncertainty(5, 10))).to.not.exist
    expect(new Uncertainty(0, 10).greaterThan(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(0, 10).greaterThan(new Uncertainty(5, null))).to.not.exist
    expect(new Uncertainty(0, 10).greaterThan(new Uncertainty(0, 5))).to.not.exist
    expect(new Uncertainty(0, 10).greaterThan(new Uncertainty(null, 5))).to.not.exist
    expect(new Uncertainty(10, 10).greaterThan(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(10, 10).greaterThan(new Uncertainty(5, null))).to.not.exist
    expect(new Uncertainty(10, null).greaterThan(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(10, null).greaterThan(new Uncertainty(5, null))).to.not.exist

    // >=
    expect(new Uncertainty(1, null).greaterThan(new Uncertainty(null, 1))).to.not.exist
    expect(new Uncertainty(1, null).greaterThan(new Uncertainty(0, 1))).to.not.exist
    expect(new Uncertainty(1, null).greaterThan(new Uncertainty(1, 1))).to.not.exist
    expect(new Uncertainty(1, 2).greaterThan(new Uncertainty(null, 1))).to.not.exist
    expect(new Uncertainty(1, 2).greaterThan(new Uncertainty(0, 1))).to.not.exist
    expect(new Uncertainty(1, 2).greaterThan(new Uncertainty(1, 1))).to.not.exist
    expect(new Uncertainty(1, 1).greaterThan(new Uncertainty(null, 1))).to.not.exist
    expect(new Uncertainty(1, 1).greaterThan(new Uncertainty(0, 1))).to.not.exist

    // >
    new Uncertainty(2, 2).greaterThan(new Uncertainty(null, 1)).should.be.true
    new Uncertainty(2, 3).greaterThan(new Uncertainty(null, 1)).should.be.true
    new Uncertainty(2, null).greaterThan(new Uncertainty(null, 1)).should.be.true
    new Uncertainty(2, 2).greaterThan(new Uncertainty(0, 1)).should.be.true
    new Uncertainty(2, 3).greaterThan(new Uncertainty(0, 1)).should.be.true
    new Uncertainty(2, null).greaterThan(new Uncertainty(0, 1)).should.be.true
    new Uncertainty(2, 2).greaterThan(new Uncertainty(1, 1)).should.be.true
    new Uncertainty(2, 3).greaterThan(new Uncertainty(1, 1)).should.be.true
    return new Uncertainty(2, null).greaterThan(new Uncertainty(1, 1)).should.be.true
  })

  return it('should properly calculate "greater than or equals" inequality', () => {
    // Equality
    new Uncertainty(1, 1).greaterThanOrEquals(new Uncertainty(1, 1)).should.be.true

    // <
    new Uncertainty(null, 1).greaterThanOrEquals(new Uncertainty(2, 2)).should.be.false
    new Uncertainty(null, 1).greaterThanOrEquals(new Uncertainty(2, 3)).should.be.false
    new Uncertainty(null, 1).greaterThanOrEquals(new Uncertainty(2, null)).should.be.false
    new Uncertainty(0, 1).greaterThanOrEquals(new Uncertainty(2, 2)).should.be.false
    new Uncertainty(0, 1).greaterThanOrEquals(new Uncertainty(2, 3)).should.be.false
    new Uncertainty(0, 1).greaterThanOrEquals(new Uncertainty(2, null)).should.be.false
    new Uncertainty(1, 1).greaterThanOrEquals(new Uncertainty(2, 2)).should.be.false
    new Uncertainty(1, 1).greaterThanOrEquals(new Uncertainty(2, 3)).should.be.false
    new Uncertainty(1, 1).greaterThanOrEquals(new Uncertainty(2, null)).should.be.false

    // <=
    expect(new Uncertainty(null, 1).greaterThanOrEquals(new Uncertainty(1, 1))).to.not.exist
    expect(new Uncertainty(null, 1).greaterThanOrEquals(new Uncertainty(1, 2))).to.not.exist
    expect(new Uncertainty(null, 1).greaterThanOrEquals(new Uncertainty(1, null))).to.not.exist
    expect(new Uncertainty(0, 1).greaterThanOrEquals(new Uncertainty(1, 1))).to.not.exist
    expect(new Uncertainty(0, 1).greaterThanOrEquals(new Uncertainty(1, 2))).to.not.exist
    expect(new Uncertainty(0, 1).greaterThanOrEquals(new Uncertainty(1, null))).to.not.exist
    expect(new Uncertainty(1, 1).greaterThanOrEquals(new Uncertainty(1, 2))).to.not.exist
    expect(new Uncertainty(1, 1).greaterThanOrEquals(new Uncertainty(1, null))).to.not.exist

    // overlaps
    expect(new Uncertainty(null, null).greaterThanOrEquals(new Uncertainty(null, null))).to.not.exist
    expect(new Uncertainty(null, 10).greaterThanOrEquals(new Uncertainty(5, 5))).to.not.exist
    expect(new Uncertainty(null, 10).greaterThanOrEquals(new Uncertainty(5, 10))).to.not.exist
    expect(new Uncertainty(null, 10).greaterThanOrEquals(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(null, 10).greaterThanOrEquals(new Uncertainty(5, null))).to.not.exist
    expect(new Uncertainty(null, 10).greaterThanOrEquals(new Uncertainty(0, 5))).to.not.exist
    expect(new Uncertainty(null, 10).greaterThanOrEquals(new Uncertainty(null, 5))).to.not.exist
    expect(new Uncertainty(0, 10).greaterThanOrEquals(new Uncertainty(5, 5))).to.not.exist
    expect(new Uncertainty(0, 10).greaterThanOrEquals(new Uncertainty(5, 10))).to.not.exist
    expect(new Uncertainty(0, 10).greaterThanOrEquals(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(0, 10).greaterThanOrEquals(new Uncertainty(5, null))).to.not.exist
    expect(new Uncertainty(0, 10).greaterThanOrEquals(new Uncertainty(0, 5))).to.not.exist
    expect(new Uncertainty(0, 10).greaterThanOrEquals(new Uncertainty(null, 5))).to.not.exist
    expect(new Uncertainty(10, 10).greaterThanOrEquals(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(10, 10).greaterThanOrEquals(new Uncertainty(5, null))).to.not.exist
    expect(new Uncertainty(10, null).greaterThanOrEquals(new Uncertainty(5, 15))).to.not.exist
    expect(new Uncertainty(10, null).greaterThanOrEquals(new Uncertainty(5, null))).to.not.exist

    // >=
    new Uncertainty(1, null).greaterThanOrEquals(new Uncertainty(null, 1)).should.be.true
    new Uncertainty(1, null).greaterThanOrEquals(new Uncertainty(0, 1)).should.be.true
    new Uncertainty(1, null).greaterThanOrEquals(new Uncertainty(1, 1)).should.be.true
    new Uncertainty(1, 2).greaterThanOrEquals(new Uncertainty(null, 1)).should.be.true
    new Uncertainty(1, 2).greaterThanOrEquals(new Uncertainty(0, 1)).should.be.true
    new Uncertainty(1, 2).greaterThanOrEquals(new Uncertainty(1, 1)).should.be.true
    new Uncertainty(1, 1).greaterThanOrEquals(new Uncertainty(null, 1)).should.be.true
    new Uncertainty(1, 1).greaterThanOrEquals(new Uncertainty(0, 1)).should.be.true

    // >
    new Uncertainty(2, 2).greaterThanOrEquals(new Uncertainty(null, 1)).should.be.true
    new Uncertainty(2, 3).greaterThanOrEquals(new Uncertainty(null, 1)).should.be.true
    new Uncertainty(2, null).greaterThanOrEquals(new Uncertainty(null, 1)).should.be.true
    new Uncertainty(2, 2).greaterThanOrEquals(new Uncertainty(0, 1)).should.be.true
    new Uncertainty(2, 3).greaterThanOrEquals(new Uncertainty(0, 1)).should.be.true
    new Uncertainty(2, null).greaterThanOrEquals(new Uncertainty(0, 1)).should.be.true
    new Uncertainty(2, 2).greaterThanOrEquals(new Uncertainty(1, 1)).should.be.true
    new Uncertainty(2, 3).greaterThanOrEquals(new Uncertainty(1, 1)).should.be.true
    return new Uncertainty(2, null).greaterThanOrEquals(new Uncertainty(1, 1)).should.be.true
  })
})
