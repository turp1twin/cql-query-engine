// Copyright (c) 2014 The MITRE Corporation
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification,
// are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright notice, this
//       list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright notice,
//       this list of conditions and the following disclaimer in the documentation
//       and/or other materials provided with the distribution.
//     * Neither the name of HL7 nor the names of its contributors may be used to
//       endorse or promote products derived from this software without specific
//       prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
// IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
// NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
import * as DT from '../cql/cqlDatatypes'
import { Identifier, DomainResource, Reference, BackboneElement, Coding, Money } from './core'

/**
Embedded class
@class ItemAdjudicationComponent
@exports  ItemAdjudicationComponent as ItemAdjudicationComponent
*/
class ItemAdjudicationComponent extends BackboneElement {
  /**
  Code indicating: Co-Pay, deductable, elegible, benefit, tax, etc.
  @returns {Coding}
  */
  code () { if (this.json['code']) return new Coding(this.json['code']) }

  /**
  Monitory amount associated with the code.
  @returns {Money}
  */
  amount () { if (this.json['amount']) return new Money(this.json['amount']) }

  /**
  A non-monitary value for example a percentage. Mutually exclusive to the amount element above.
  @returns {Array} an array of {@link Number} objects
  */
  value () { return this.json['value'] }
}

/**
Embedded class
@class DetailAdjudicationComponent
@exports  DetailAdjudicationComponent as DetailAdjudicationComponent
*/
class DetailAdjudicationComponent extends BackboneElement {
  /**
  Code indicating: Co-Pay, deductable, elegible, benefit, tax, etc.
  @returns {Coding}
  */
  code () { if (this.json['code']) return new Coding(this.json['code']) }

  /**
  Monitory amount associated with the code.
  @returns {Money}
  */
  amount () { if (this.json['amount']) return new Money(this.json['amount']) }

  /**
  A non-monitary value for example a percentage. Mutually exclusive to the amount element above.
  @returns {Array} an array of {@link Number} objects
  */
  value () { return this.json['value'] }
}

/**
Embedded class
@class SubdetailAdjudicationComponent
@exports  SubdetailAdjudicationComponent as SubdetailAdjudicationComponent
*/
class SubdetailAdjudicationComponent extends BackboneElement {
  /**
  Code indicating: Co-Pay, deductable, elegible, benefit, tax, etc.
  @returns {Coding}
  */
  code () { if (this.json['code']) return new Coding(this.json['code']) }

  /**
  Monitory amount associated with the code.
  @returns {Money}
  */
  amount () { if (this.json['amount']) return new Money(this.json['amount']) }

  /**
  A non-monitary value for example a percentage. Mutually exclusive to the amount element above.
  @returns {Array} an array of {@link Number} objects
  */
  value () { return this.json['value'] }
}

/**
Embedded class
@class ItemSubdetailComponent
@exports  ItemSubdetailComponent as ItemSubdetailComponent
*/
class ItemSubdetailComponent extends BackboneElement {
  /**
  A service line number.
  @returns {Array} an array of {@link Number} objects
  */
  sequenceLinkId () { return this.json['sequenceLinkId'] }

  /**
  The adjudications results.
  @returns {Array} an array of {@link SubdetailAdjudicationComponent} objects
  */
  adjudication () {
    if (this.json['adjudication']) {
      return this.json['adjudication'].map(item => new SubdetailAdjudicationComponent(item))
    }
  }
}

/**
Embedded class
@class ItemDetailComponent
@exports  ItemDetailComponent as ItemDetailComponent
*/
class ItemDetailComponent extends BackboneElement {
  /**
  A service line number.
  @returns {Array} an array of {@link Number} objects
  */
  sequenceLinkId () { return this.json['sequenceLinkId'] }

  /**
  The adjudications results.
  @returns {Array} an array of {@link DetailAdjudicationComponent} objects
  */
  adjudication () {
    if (this.json['adjudication']) {
      return this.json['adjudication'].map(item => new DetailAdjudicationComponent(item))
    }
  }

  /**
  The third tier service adjudications for submitted services.
  @returns {Array} an array of {@link ItemSubdetailComponent} objects
  */
  subdetail () {
    if (this.json['subdetail']) {
      return this.json['subdetail'].map(item => new ItemSubdetailComponent(item))
    }
  }
}

/**
Embedded class
@class ItemsComponent
@exports  ItemsComponent as ItemsComponent
*/
class ItemsComponent extends BackboneElement {
  /**
  A service line number.
  @returns {Array} an array of {@link Number} objects
  */
  sequenceLinkId () { return this.json['sequenceLinkId'] }

  /**
  A list of note references to the notes provided below.
  @returns {Array} an array of {@link Number} objects
  */
  noteNumber () { return this.json['noteNumber'] }

  /**
  The adjudications results.
  @returns {Array} an array of {@link ItemAdjudicationComponent} objects
  */
  adjudication () {
    if (this.json['adjudication']) {
      return this.json['adjudication'].map(item => new ItemAdjudicationComponent(item))
    }
  }

  /**
  The second tier service adjudications for submitted services.
  @returns {Array} an array of {@link ItemDetailComponent} objects
  */
  detail () {
    if (this.json['detail']) {
      return this.json['detail'].map(item => new ItemDetailComponent(item))
    }
  }
}

/**
Embedded class
@class AddedItemAdjudicationComponent
@exports  AddedItemAdjudicationComponent as AddedItemAdjudicationComponent
*/
class AddedItemAdjudicationComponent extends BackboneElement {
  /**
  Code indicating: Co-Pay, deductable, elegible, benefit, tax, etc.
  @returns {Coding}
  */
  code () { if (this.json['code']) return new Coding(this.json['code']) }

  /**
  Monitory amount associated with the code.
  @returns {Money}
  */
  amount () { if (this.json['amount']) return new Money(this.json['amount']) }

  /**
  A non-monitary value for example a percentage. Mutually exclusive to the amount element above.
  @returns {Array} an array of {@link Number} objects
  */
  value () { return this.json['value'] }
}

/**
Embedded class
@class AddedItemDetailAdjudicationComponent
@exports  AddedItemDetailAdjudicationComponent as AddedItemDetailAdjudicationComponent
*/
class AddedItemDetailAdjudicationComponent extends BackboneElement {
  /**
  Code indicating: Co-Pay, deductable, elegible, benefit, tax, etc.
  @returns {Coding}
  */
  code () { if (this.json['code']) return new Coding(this.json['code']) }

  /**
  Monitory amount associated with the code.
  @returns {Money}
  */
  amount () { if (this.json['amount']) return new Money(this.json['amount']) }

  /**
  A non-monitary value for example a percentage. Mutually exclusive to the amount element above.
  @returns {Array} an array of {@link Number} objects
  */
  value () { return this.json['value'] }
}

/**
Embedded class
@class AddedItemsDetailComponent
@exports  AddedItemsDetailComponent as AddedItemsDetailComponent
*/
class AddedItemsDetailComponent extends BackboneElement {
  /**
  A code to indicate the Professional Service or Product supplied.
  @returns {Coding}
  */
  service () { if (this.json['service']) return new Coding(this.json['service']) }

  /**
  The fee charged for the professional service or product..
  @returns {Money}
  */
  fee () { if (this.json['fee']) return new Money(this.json['fee']) }

  /**
  The adjudications results.
  @returns {Array} an array of {@link AddedItemDetailAdjudicationComponent} objects
  */
  adjudication () {
    if (this.json['adjudication']) {
      return this.json['adjudication'].map(item => new AddedItemDetailAdjudicationComponent(item))
    }
  }
}

/**
Embedded class
@class AddedItemComponent
@exports  AddedItemComponent as AddedItemComponent
*/
class AddedItemComponent extends BackboneElement {
  /**
  List of input service items which this service line is intended to replace.
  @returns {Array} an array of {@link Number} objects
  */
  sequenceLinkId () { return this.json['sequenceLinkId'] }

  /**
  A code to indicate the Professional Service or Product supplied.
  @returns {Coding}
  */
  service () { if (this.json['service']) return new Coding(this.json['service']) }

  /**
  The fee charged for the professional service or product..
  @returns {Money}
  */
  fee () { if (this.json['fee']) return new Money(this.json['fee']) }

  /**
  A list of note references to the notes provided below.
  @returns {Array} an array of {@link Number} objects
  */
  noteNumberLinkId () { return this.json['noteNumberLinkId'] }

  /**
  The adjudications results.
  @returns {Array} an array of {@link AddedItemAdjudicationComponent} objects
  */
  adjudication () {
    if (this.json['adjudication']) {
      return this.json['adjudication'].map(item => new AddedItemAdjudicationComponent(item))
    }
  }

  /**
  The second tier service adjudications for payor added services.
  @returns {Array} an array of {@link AddedItemsDetailComponent} objects
  */
  detail () {
    if (this.json['detail']) {
      return this.json['detail'].map(item => new AddedItemsDetailComponent(item))
    }
  }
}

/**
Embedded class
@class ErrorsComponent
@exports  ErrorsComponent as ErrorsComponent
*/
class ErrorsComponent extends BackboneElement {
  /**
  The sequence number of the line item submitted which contains the error. This value is ommitted when the error is elsewhere.
  @returns {Array} an array of {@link Number} objects
  */
  sequenceLinkId () { return this.json['sequenceLinkId'] }

  /**
  The sequence number of the addition within the line item submitted which contains the error. This value is ommitted when the error is not related to an Addition.
  @returns {Array} an array of {@link Number} objects
  */
  detailSequenceLinkId () { return this.json['detailSequenceLinkId'] }

  /**
  The sequence number of the addition within the line item submitted which contains the error. This value is ommitted when the error is not related to an Addition.
  @returns {Array} an array of {@link Number} objects
  */
  subdetailSequenceLinkId () { return this.json['subdetailSequenceLinkId'] }

  /**
  An error code,froma specified code system, which details why the claim could not be adjudicated.
  @returns {Coding}
  */
  code () { if (this.json['code']) return new Coding(this.json['code']) }
}

/**
Embedded class
@class NotesComponent
@exports  NotesComponent as NotesComponent
*/
class NotesComponent extends BackboneElement {
  /**
  An integer associated with each note which may be referred to from each service line item.
  @returns {Array} an array of {@link Number} objects
  */
  number () { return this.json['number'] }

  /**
  The note purpose: Print/Display.
  @returns {Coding}
  */
  type () { if (this.json['type']) return new Coding(this.json['type']) }

  /**
  The note text.
  @returns {Array} an array of {@link String} objects
  */
  text () { return this.json['text'] }
}

/**
This resource provides the adjudication details from the processing of a Claim resource.
@class ClaimResponse
@exports ClaimResponse as ClaimResponse
*/
export class ClaimResponse extends DomainResource {
  /**
  The Response Business Identifier.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  Original request resource referrence.
  @returns {Reference}
  */
  request () { if (this.json['request']) return new Reference(this.json['request']) }

  /**
  The version of the style of resource contents. This should be mapped to the allowable profiles for this and supporting resources.
  @returns {Coding}
  */
  ruleset () { if (this.json['ruleset']) return new Coding(this.json['ruleset']) }

  /**
  The style (standard) and version of the original material which was converted into this resource.
  @returns {Coding}
  */
  originalRuleset () { if (this.json['originalRuleset']) return new Coding(this.json['originalRuleset']) }

  /**
  The date when the enclosed suite of services were performed or completed.
  @returns {Array} an array of {@link Date} objects
  */
  date () { if (this.json['date']) return DT.DateTime.parse(this.json['date']) }

  /**
  The Insurer who produced this adjudicated response.
  @returns {Reference}
  */
  organization () { if (this.json['organization']) return new Reference(this.json['organization']) }

  /**
  The practitioner who is responsible for the services rendered to the patient.
  @returns {Reference}
  */
  requestProvider () { if (this.json['requestProvider']) return new Reference(this.json['requestProvider']) }

  /**
  The organization which is responsible for the services rendered to the patient.
  @returns {Reference}
  */
  requestOrganization () { if (this.json['requestOrganization']) return new Reference(this.json['requestOrganization']) }

  /**
  Transaction status: error, complete.
  @returns {Array} an array of {@link String} objects
  */
  outcome () { return this.json['outcome'] }

  /**
  A description of the status of the adjudication.
  @returns {Array} an array of {@link String} objects
  */
  disposition () { return this.json['disposition'] }

  /**
  Party to be reimbursed: Subscriber, provider, other.
  @returns {Coding}
  */
  payeeType () { if (this.json['payeeType']) return new Coding(this.json['payeeType']) }

  /**
  The first tier service adjudications for submitted services.
  @returns {Array} an array of {@link ItemsComponent} objects
  */
  item () {
    if (this.json['item']) {
      return this.json['item'].map(item => new ItemsComponent(item))
    }
  }

  /**
  The first tier service adjudications for payor added services.
  @returns {Array} an array of {@link AddedItemComponent} objects
  */
  additem () {
    if (this.json['additem']) {
      return this.json['additem'].map(item => new AddedItemComponent(item))
    }
  }

  /**
  Mutually exclusive with Services Provided (Item).
  @returns {Array} an array of {@link ErrorsComponent} objects
  */
  error () {
    if (this.json['error']) {
      return this.json['error'].map(item => new ErrorsComponent(item))
    }
  }

  /**
  The total cost of the services reported.
  @returns {Money}
  */
  totalCost () { if (this.json['totalCost']) return new Money(this.json['totalCost']) }

  /**
  The amount of deductable applied which was not allocated to any particular service line.
  @returns {Money}
  */
  unallocDeductable () { if (this.json['unallocDeductable']) return new Money(this.json['unallocDeductable']) }

  /**
  Total amount of benefit payable (Equal to sum of the Benefit amounts from all detail lines and additions less the Unallocated Deductable).
  @returns {Money}
  */
  totalBenefit () { if (this.json['totalBenefit']) return new Money(this.json['totalBenefit']) }

  /**
  Adjustment to the payment of this transaction which is not related to adjudication of this transaction.
  @returns {Money}
  */
  paymentAdjustment () { if (this.json['paymentAdjustment']) return new Money(this.json['paymentAdjustment']) }

  /**
  Reason for the payment adjustment.
  @returns {Coding}
  */
  paymentAdjustmentReason () { if (this.json['paymentAdjustmentReason']) return new Coding(this.json['paymentAdjustmentReason']) }

  /**
  Estimated payment data.
  @returns {Array} an array of {@link Date} objects
  */
  paymentDate () { if (this.json['paymentDate']) return DT.DateTime.parse(this.json['paymentDate']) }

  /**
  Payable less any payment adjustment.
  @returns {Money}
  */
  paymentAmount () { if (this.json['paymentAmount']) return new Money(this.json['paymentAmount']) }

  /**
  Payment identifer.
  @returns {Identifier}
  */
  paymentRef () { if (this.json['paymentRef']) return new Identifier(this.json['paymentRef']) }

  /**
  Status of funds reservation (For provider, for Patient, None).
  @returns {Coding}
  */
  reserved () { if (this.json['reserved']) return new Coding(this.json['reserved']) }

  /**
  The form to be used for printing the content.
  @returns {Coding}
  */
  form () { if (this.json['form']) return new Coding(this.json['form']) }

  /**
  Note text.
  @returns {Array} an array of {@link NotesComponent} objects
  */
  note () {
    if (this.json['note']) {
      return this.json['note'].map(item => new NotesComponent(item))
    }
  }
}

