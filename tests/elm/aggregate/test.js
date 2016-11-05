/* global describe it beforeEach */
import setup from '../../setup'
import data from './data'
import chai from 'chai'
chai.should()

const validateQuantity = (object, expectedValue, expectedUnit) => {
  object.constructor.name.should.equal('Quantity')
  object.value.should.equal(expectedValue)
  return object.unit.should.equal(expectedUnit)
}

describe('Count', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  it('should be able to count lists without nulls', function () {
    return this.not_null.exec(this.ctx).should.equal(5)
  })
  it('should be able to count lists with nulls', function () {
    return this.has_null.exec(this.ctx).should.equal(2)
  })
  return it('should be able to count empty list', function () {
    return this.empty.exec(this.ctx).should.equal(0)
  })
})

describe('Sum', function () {
  beforeEach(function () {
    return setup(this, data)
  })

  it('should be able to sum lists without nulls', function () {
    return this.not_null.exec(this.ctx).should.equal(15)
  })
  it('should be able to sum lists with nulls', function () {
    return this.has_null.exec(this.ctx).should.equal(3)
  })
  it('should be able to sum empty list', function () {
    return this.empty.exec(this.ctx) === null
  })
  it('should be able to sum quantity lists without nulls', function () {
    return validateQuantity(this.not_null_q.exec(this.ctx), 15, 'ml')
  })
  it('should be able to sum  quantity lists with nulls', function () {
    return validateQuantity(this.has_null_q.exec(this.ctx), 3, 'ml')
  })
  return it('should return null for unmatched units in a list of quantiies', function () {
    return this.unmatched_units_q.exec(this.ctx) === null
  })
})

describe('Min', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  it('should be able to find min in lists without nulls', function () {
    return this.not_null.exec(this.ctx).should.equal(0)
  })
  it('should be able to find min in lists with nulls', function () {
    return this.has_null.exec(this.ctx).should.equal(-1)
  })
  it('should be return null for empty list', function () {
    return this.empty.exec(this.ctx) === null
  })
  it('should be able to find min in lists of quantiies without nulls', function () {
    return validateQuantity(this.not_null_q.exec(this.ctx), 0, 'ml')
  })
  return it('should be able to find min in lists of quantiies with nulls', function () {
    return validateQuantity(this.has_null_q.exec(this.ctx), -1, 'ml')
  })
})

describe('Max', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  it('should be able to find max in lists without nulls', function () {
    return this.not_null.exec(this.ctx).should.equal(10)
  })
  it('should be able to find max in lists with nulls', function () {
    return this.has_null.exec(this.ctx).should.equal(2)
  })
  it('should be return null for empty list', function () {
    return this.empty.exec(this.ctx) === null
  })
  it('should be able to find max in lists of quantiies without nulls', function () {
    return validateQuantity(this.not_null_q.exec(this.ctx), 10, 'ml')
  })
  return it('should be able to find max in lists of quantiies with nulls', function () {
    return validateQuantity(this.has_null_q.exec(this.ctx), 2, 'ml')
  })
})

describe('Avg', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  it('should be able to find average for lists without nulls', function () {
    return this.not_null.exec(this.ctx).should.equal(3)
  })
  it('should be able to find average for lists with nulls', function () {
    return this.has_null.exec(this.ctx).should.equal(1.5)
  })
  it('should be return null for empty list', function () {
    return this.empty.exec(this.ctx) === null
  })
  it('should be able to find average for lists of quantiies without nulls', function () {
    return validateQuantity(this.not_null_q.exec(this.ctx), 3, 'ml')
  })
  return it('should be able to find average for lists of quantiies with nulls', function () {
    return validateQuantity(this.has_null_q.exec(this.ctx), 1.5, 'ml')
  })
})

describe('Median', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  it('should be able to find median of odd numbered list', function () {
    return this.odd.exec(this.ctx).should.equal(3)
  })
  it('should be able to find median of even numbered list', function () {
    return this.even.exec(this.ctx).should.equal(3.5)
  })
  it('should be able to find median of odd numbered list that contains duplicates', function () {
    return this.dup_vals_odd.exec(this.ctx).should.equal(3)
  })
  it('should be able to find median of even numbered list that contians duplicates', function () {
    return this.dup_vals_even.exec(this.ctx).should.equal(2.5)
  })
  it('should be return null for empty list', function () {
    return this.empty.exec(this.ctx) === null
  })
  it('should be able to find median of odd numbered list', function () {
    return validateQuantity(this.odd_q.exec(this.ctx), 3, 'ml')
  })
  it('should be able to find median of even numbered list', function () {
    return validateQuantity(this.even_q.exec(this.ctx), 3.5, 'ml')
  })
  it('should be able to find median of odd numbered list that contains duplicates', function () {
    return validateQuantity(this.dup_vals_odd_q.exec(this.ctx), 3, 'ml')
  })
  return it('should be able to find median of even numbered list that contians duplicates', function () {
    return validateQuantity(this.dup_vals_even_q.exec(this.ctx), 2.5, 'ml')
  })
})

describe('Mode', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  it('should be able to find mode of lists without nulls', function () {
    return this.not_null.exec(this.ctx).should.equal(2)
  })
  it('should be able to find Mode lists with nulls', function () {
    return this.has_null.exec(this.ctx).should.equal(2)
  })
  it('should be return null for empty list', function () {
    return this.empty.exec(this.ctx) === null
  })
  return it('should be able to find bimodal', function () {
    return this.bi_modal.exec(this.ctx).should.eql([2, 3])
  })
})

describe('PopulationVariance', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  it('should be able to find PopulationVariance of a list ', function () {
    return this.v.exec(this.ctx).should.equal(2.5)
  })
  return it('should be able to find PopulationVariance of a list ', function () {
    return validateQuantity(this.v_q.exec(this.ctx), 2.5, 'ml')
  })
})

describe('Variance', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  it('should be able to find Variance of a list ', function () {
    return this.v.exec(this.ctx).should.equal(2)
  })
  return it('should be able to find Variance of a list ', function () {
    return validateQuantity(this.v_q.exec(this.ctx), 2, 'ml')
  })
})

describe('StdDev', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  it('should be able to find Standard Dev of a list ', function () {
    return this.std.exec(this.ctx).should.equal(1.4142135623730951)
  })
  return it('should be able to find Standard Dev of a list ', function () {
    return validateQuantity(this.std_q.exec(this.ctx), 1.4142135623730951, 'ml')
  })
})

describe('PopulationStdDev', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  it('should be able to find Population Standard Dev of a list ', function () {
    return this.dev.exec(this.ctx).should.equal(1.5811388300841898)
  })
  return it('should be able to find Population Standard Dev of a list ', function () {
    return validateQuantity(this.dev_q.exec(this.ctx), 1.5811388300841898, 'ml')
  })
})

describe('AllTrue', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  return it('should be able to calculate all true', function () {
    this.at.exec(this.ctx).should.equal(true)
    this.atwn.exec(this.ctx).should.equal(false)
    this.atf.exec(this.ctx).should.equal(false)
    return this.atfwn.exec(this.ctx).should.equal(false)
  })
})

describe('AnyTrue', function () {
  beforeEach(function () {
    return setup(this, data)
  })
  return it('should be able to calculate any true', function () {
    this.at.exec(this.ctx).should.equal(true)
    this.atwn.exec(this.ctx).should.equal(true)
    this.atf.exec(this.ctx).should.equal(false)
    return this.atfwn.exec(this.ctx).should.equal(false)
  })
})

