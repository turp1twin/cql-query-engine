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
import { Identifier, DomainResource, Reference, BackboneElement, Coding, Money, Quantity } from './core'

/**
Embedded class
@class PayeeComponent
@exports  PayeeComponent as PayeeComponent
*/
class PayeeComponent extends BackboneElement {
  /**
  Party to be reimbursed: Subscriber, provider, other.
  @returns {Coding}
  */
  type () { if (this.json['type']) { return new Coding(this.json['type']) } }

  /**
  The provider who is to be reimbursed for the claim (the party to whom any benefit is assigned).
  @returns {Reference}
  */
  provider () { if (this.json['provider']) { return new Reference(this.json['provider']) } }

  /**
  The organization who is to be reimbursed for the claim (the party to whom any benefit is assigned).
  @returns {Reference}
  */
  organization () { if (this.json['organization']) { return new Reference(this.json['organization']) } }

  /**
  The person other than the subscriber who is to be reimbursed for the claim (the party to whom any benefit is assigned).
  @returns {Reference}
  */
  person () { if (this.json['person']) { return new Reference(this.json['person']) } }
}

/**
Embedded class
@class DiagnosisComponent
@exports  DiagnosisComponent as DiagnosisComponent
*/
class DiagnosisComponent extends BackboneElement {
  /**
  Sequence of diagnosis.
  @returns {Array} an array of {@link Number} objects
  */
  sequence () { return this.json['sequence'] }

  /**
  The diagnosis.
  @returns {Coding}
  */
  diagnosis () { if (this.json['diagnosis']) { return new Coding(this.json['diagnosis']) } }
}

/**
Embedded class
@class CoverageComponent
@exports  CoverageComponent as CoverageComponent
*/
class CoverageComponent extends BackboneElement {
  /**
  A service line item.
  @returns {Array} an array of {@link Number} objects
  */
  sequence () { return this.json['sequence'] }

  /**
  The instance number of the Coverage which is the focus for adjudication, that is the Coverage to which the claim is to be adjudicated against.
  @returns {Array} an array of {@link boolean} objects
  */
  focal () { return this.json['focal'] }

  /**
  Reference to the program or plan identification, underwriter or payor.
  @returns {Reference}
  */
  coverage () { if (this.json['coverage']) { return new Reference(this.json['coverage']) } }

  /**
  The contract number of a business agrement which describes the terms and conditions.
  @returns {Array} an array of {@link String} objects
  */
  businessArrangement () { return this.json['businessArrangement'] }

  /**
  The relationship of the patient to the subscriber.
  @returns {Coding}
  */
  relationship () { if (this.json['relationship']) { return new Coding(this.json['relationship']) } }

  /**
  A list of references from the Insurer to which these services pertain.
  @returns {Array} an array of {@link String} objects
  */
  preauthref () { return this.json['preauthref'] }

  /**
  The Coverages adjudication details.
  @returns {Reference}
  */
  claimResponse () { if (this.json['claimResponse']) { return new Reference(this.json['claimResponse']) } }

  /**
  The style (standard) and version of the original material which was converted into this resource.
  @returns {Coding}
  */
  originalRuleset () { if (this.json['originalRuleset']) { return new Coding(this.json['originalRuleset']) } }
}

/**
Embedded class
@class MissingTeethComponent
@exports  MissingTeethComponent as MissingTeethComponent
*/
class MissingTeethComponent extends BackboneElement {
  /**
  The code identifying which tooth is missing.
  @returns {Coding}
  */
  tooth () { if (this.json['tooth']) { return new Coding(this.json['tooth']) } }

  /**
  Missing reason may be: E-extraction, O-other.
  @returns {Coding}
  */
  reason () { if (this.json['reason']) { return new Coding(this.json['reason']) } }

  /**
  The date of the extraction either known from records or patient reported estimate.
  @returns {Array} an array of {@link Date} objects
  */
  extractiondate () { if (this.json['extractiondate']) { return DT.DateTime.parse(this.json['extractiondate']) } }
}

/**
Embedded class
@class OrthodonticPlanComponent
@exports  OrthodonticPlanComponent as OrthodonticPlanComponent
*/
class OrthodonticPlanComponent extends BackboneElement {
  /**
  The intended start date for service.
  @returns {Array} an array of {@link Date} objects
  */
  start () { if (this.json['start']) { return DT.DateTime.parse(this.json['start']) } }

  /**
  The estimated first examination fee.
  @returns {Money}
  */
  examFee () { if (this.json['examFee']) { return new Money(this.json['examFee']) } }

  /**
  The estimated diagnostic fee.
  @returns {Money}
  */
  diagnosticFee () { if (this.json['diagnosticFee']) { return new Money(this.json['diagnosticFee']) } }

  /**
  The estimated initial payment.
  @returns {Money}
  */
  initialPayment () { if (this.json['initialPayment']) { return new Money(this.json['initialPayment']) } }

  /**
  The estimated treatment duration in months.
  @returns {Array} an array of {@link Number} objects
  */
  durationMonths () { return this.json['durationMonths'] }

  /**
  The anticipated number of payments.
  @returns {Array} an array of {@link Number} objects
  */
  paymentCount () { return this.json['paymentCount'] }

  /**
  The anticipated payment amount.
  @returns {Money}
  */
  periodicPayment () { if (this.json['periodicPayment']) { return new Money(this.json['periodicPayment']) } }
}

/**
Embedded class
@class SubDetailComponent
@exports  SubDetailComponent as SubDetailComponent
*/
class SubDetailComponent extends BackboneElement {
  /**
  A service line number.
  @returns {Array} an array of {@link Number} objects
  */
  sequence () { return this.json['sequence'] }

  /**
  The type of product or service.
  @returns {Coding}
  */
  type () { if (this.json['type']) { return new Coding(this.json['type']) } }

  /**
  The fee for an addtional service or product or charge.
  @returns {Coding}
  */
  service () { if (this.json['service']) { return new Coding(this.json['service']) } }

  /**
  The number of repetitions of a service or product.
  @returns {Quantity}
  */
  quantity () { if (this.json['quantity']) { return new Quantity(this.json['quantity']) } }

  /**
  The fee for an addtional service or product or charge.
  @returns {Money}
  */
  unitPrice () { if (this.json['unitPrice']) { return new Money(this.json['unitPrice']) } }

  /**
  A real number that represents a multiplier used in determining the overall value of services delivered and/or goods received. The concept of a Factor allows for a discount or surcharge multiplier to be applied to a monetary amount.
  @returns {Array} an array of {@link Number} objects
  */
  factor () { return this.json['factor'] }

  /**
  An amount that expresses the weighting (based on difficulty, cost and/or resource intensiveness) associated with the good or service delivered. The concept of Points allows for assignment of point values for services and/or goods, such that a monetary amount can be assigned to each point.
  @returns {Array} an array of {@link Number} objects
  */
  points () { return this.json['points'] }

  /**
  The quantity times the unit price for an addtional service or product or charge. For example, the formula: unit Quantity * unit Price (Cost per Point) * factor Number  * points = net Amount. Quantity, factor and points are assumed to be 1 if not supplied.
  @returns {Money}
  */
  net () { if (this.json['net']) { return new Money(this.json['net']) } }

  /**
  List of Unique Device Identifiers associated with this line item.
  @returns {Coding}
  */
  udi () { if (this.json['udi']) { return new Coding(this.json['udi']) } }
}

/**
Embedded class
@class DetailComponent
@exports  DetailComponent as DetailComponent
*/
class DetailComponent extends BackboneElement {
  /**
  A service line number.
  @returns {Array} an array of {@link Number} objects
  */
  sequence () { return this.json['sequence'] }

  /**
  The type of product or service.
  @returns {Coding}
  */
  type () { if (this.json['type']) { return new Coding(this.json['type']) } }

  /**
  If a grouping item then 'GROUP' otherwise it is a node therefore a code to indicate the Professional Service or Product supplied.
  @returns {Coding}
  */
  service () { if (this.json['service']) { return new Coding(this.json['service']) } }

  /**
  The number of repetitions of a service or product.
  @returns {Quantity}
  */
  quantity () { if (this.json['quantity']) { return new Quantity(this.json['quantity']) } }

  /**
  If the item is a node then this is the fee for the product or service, otherwise this is the total of the fees for the children of the group.
  @returns {Money}
  */
  unitPrice () { if (this.json['unitPrice']) { return new Money(this.json['unitPrice']) } }

  /**
  A real number that represents a multiplier used in determining the overall value of services delivered and/or goods received. The concept of a Factor allows for a discount or surcharge multiplier to be applied to a monetary amount.
  @returns {Array} an array of {@link Number} objects
  */
  factor () { return this.json['factor'] }

  /**
  An amount that expresses the weighting (based on difficulty, cost and/or resource intensiveness) associated with the good or service delivered. The concept of Points allows for assignment of point values for services and/or goods, such that a monetary amount can be assigned to each point.
  @returns {Array} an array of {@link Number} objects
  */
  points () { return this.json['points'] }

  /**
  The quantity times the unit price for an addtional service or product or charge. For example, the formula: unit Quantity * unit Price (Cost per Point) * factor Number  * points = net Amount. Quantity, factor and points are assumed to be 1 if not supplied.
  @returns {Money}
  */
  net () { if (this.json['net']) { return new Money(this.json['net']) } }

  /**
  List of Unique Device Identifiers associated with this line item.
  @returns {Coding}
  */
  udi () { if (this.json['udi']) { return new Coding(this.json['udi']) } }

  /**
  Third tier of goods and services.
  @returns {Array} an array of {@link SubDetailComponent} objects
  */
  subDetail () {
    if (this.json['subDetail']) {
      return this.json['subDetail'].map(item => new SubDetailComponent(item))
    }
  }
}

/**
Embedded class
@class ProsthesisComponent
@exports  ProsthesisComponent as ProsthesisComponent
*/
class ProsthesisComponent extends BackboneElement {
  /**
  Is this the initial placement of a fixed prosthesis?.
  @returns {Array} an array of {@link boolean} objects
  */
  initial () { return this.json['initial'] }

  /**
  Date of the initial placement.
  @returns {Array} an array of {@link Date} objects
  */
  priorDate () { if (this.json['priorDate']) { return DT.DateTime.parse(this.json['priorDate']) } }

  /**
  Material of the prior denture or bridge prosthesis. (Oral).
  @returns {Coding}
  */
  priorMaterial () { if (this.json['priorMaterial']) { return new Coding(this.json['priorMaterial']) } }
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
  sequence () { return this.json['sequence'] }

  /**
  The type of product or service.
  @returns {Coding}
  */
  type () { if (this.json['type']) { return new Coding(this.json['type']) } }

  /**
  The practitioner who is responsible for the services rendered to the patient.
  @returns {Reference}
  */
  provider () { if (this.json['provider']) { return new Reference(this.json['provider']) } }

  /**
  If a grouping item then 'GROUP' otherwise it is a node therefore a code to indicate the Professional Service or Product supplied.
  @returns {Coding}
  */
  service () { if (this.json['service']) { return new Coding(this.json['service']) } }

  /**
  The date when the enclosed suite of services were performed or completed.
  @returns {Array} an array of {@link Date} objects
  */
  serviceDate () { if (this.json['serviceDate']) { return DT.DateTime.parse(this.json['serviceDate']) } }

  /**
  The number of repetitions of a service or product.
  @returns {Quantity}
  */
  quantity () { if (this.json['quantity']) { return new Quantity(this.json['quantity']) } }

  /**
  If the item is a node then this is the fee for the product or service, otherwise this is the total of the fees for the children of the group.
  @returns {Money}
  */
  unitPrice () { if (this.json['unitPrice']) { return new Money(this.json['unitPrice']) } }

  /**
  A real number that represents a multiplier used in determining the overall value of services delivered and/or goods received. The concept of a Factor allows for a discount or surcharge multiplier to be applied to a monetary amount.
  @returns {Array} an array of {@link Number} objects
  */
  factor () { return this.json['factor'] }

  /**
  An amount that expresses the weighting (based on difficulty, cost and/or resource intensiveness) associated with the good or service delivered. The concept of Points allows for assignment of point values for services and/or goods, such that a monetary amount can be assigned to each point.
  @returns {Array} an array of {@link Number} objects
  */
  points () { return this.json['points'] }

  /**
  The quantity times the unit price for an addtional service or product or charge. For example, the formula: unit Quantity * unit Price (Cost per Point) * factor Number  * points = net Amount. Quantity, factor and points are assumed to be 1 if not supplied.
  @returns {Money}
  */
  net () { if (this.json['net']) { return new Money(this.json['net']) } }

  /**
  List of Unique Device Identifiers associated with this line item.
  @returns {Coding}
  */
  udi () { if (this.json['udi']) { return new Coding(this.json['udi']) } }

  /**
  Physical service site on the patient (limb, tooth, etc).
  @returns {Coding}
  */
  bodySite () { if (this.json['bodySite']) { return new Coding(this.json['bodySite']) } }

  /**
  A region or surface of the site, eg. limb region or tooth surface(s).
  @returns {Array} an array of {@link Coding} objects
  */
  subsite () {
    if (this.json['subsite']) {
      return this.json['subsite'].map(item => new Coding(item))
    }
  }

  /**
  Item typification or modifiers codes, eg for Oral whether the treatment is cosmetic or associated with TMJ, or an appliance was lost or stolen.
  @returns {Array} an array of {@link Coding} objects
  */
  modifier () {
    if (this.json['modifier']) {
      return this.json['modifier'].map(item => new Coding(item))
    }
  }

  /**
  Second tier of goods and services.
  @returns {Array} an array of {@link DetailComponent} objects
  */
  detail () {
    if (this.json['detail']) {
      return this.json['detail'].map(item => new DetailComponent(item))
    }
  }

  /**
  The materials and placement date of prior fixed prosthesis.
  @returns {ProsthesisComponent}
  */
  prosthesis () { if (this.json['prosthesis']) { return new ProsthesisComponent(this.json['prosthesis']) } }
}

/**
A provider issued list of services and products provided, or to be provided, to a patient which is provided to an insurer for payment recovery.
@class OralHealthClaim
@exports OralHealthClaim as OralHealthClaim
*/
export class OralHealthClaim extends DomainResource {
  /**
  The business identifier for the instance: invoice number, claim number, pre-determination or pre-authorization number.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  The version of the specification on which this instance relies.
  @returns {Coding}
  */
  ruleset () { if (this.json['ruleset']) { return new Coding(this.json['ruleset']) } }

  /**
  The version of the specification from which the original instance was created.
  @returns {Coding}
  */
  originalRuleset () { if (this.json['originalRuleset']) { return new Coding(this.json['originalRuleset']) } }

  /**
  The date when the enclosed suite of services were performed or completed.
  @returns {Array} an array of {@link Date} objects
  */
  date () { if (this.json['date']) { return DT.DateTime.parse(this.json['date']) } }

  /**
  Insurer Identifier, typical BIN number (6 digit).
  @returns {Reference}
  */
  target () { if (this.json['target']) { return new Reference(this.json['target']) } }

  /**
  The provider which is responsible for the bill, claim pre-determination, pre-authorization.
  @returns {Reference}
  */
  provider () { if (this.json['provider']) { return new Reference(this.json['provider']) } }

  /**
  The organization which is responsible for the bill, claim pre-determination, pre-authorization.
  @returns {Reference}
  */
  organization () { if (this.json['organization']) { return new Reference(this.json['organization']) } }

  /**
  Complete (Bill or Claim), Proposed (Pre-Authorization), Exploratory (Pre-determination).
  @returns {Array} an array of {@link String} objects
  */
  use () { return this.json['use'] }

  /**
  Immediate (STAT), best effort (NORMAL), deferred (DEFER).
  @returns {Coding}
  */
  priority () { if (this.json['priority']) { return new Coding(this.json['priority']) } }

  /**
  In the case of a Pre-Determination/Pre-Authorization the provider may request that funds in the amount of the expected Benefit be reserved ('Patient' or 'Provider') to pay for the Benefits determined on the subsequent claim(s). 'None' explicitly indicates no funds reserving is requested.
  @returns {Coding}
  */
  fundsReserve () { if (this.json['fundsReserve']) { return new Coding(this.json['fundsReserve']) } }

  /**
  Person who created the invoice/claim/pre-determination or pre-authorization.
  @returns {Reference}
  */
  enterer () { if (this.json['enterer']) { return new Reference(this.json['enterer']) } }

  /**
  Facility where the services were provided.
  @returns {Reference}
  */
  facility () { if (this.json['facility']) { return new Reference(this.json['facility']) } }

  /**
  Theparty to be reimbused for the services.
  @returns {PayeeComponent}
  */
  payee () { if (this.json['payee']) { return new PayeeComponent(this.json['payee']) } }

  /**
  The referral resource which lists the date, practitioner, reason and other supporting information.
  @returns {Reference}
  */
  referral () { if (this.json['referral']) { return new Reference(this.json['referral']) } }

  /**
  Ordered list of patient diagnosis for which care is sought.
  @returns {Array} an array of {@link DiagnosisComponent} objects
  */
  diagnosis () {
    if (this.json['diagnosis']) {
      return this.json['diagnosis'].map(item => new DiagnosisComponent(item))
    }
  }

  /**
  List of patient conditions for which care is sought.
  @returns {Array} an array of {@link Coding} objects
  */
  condition () {
    if (this.json['condition']) {
      return this.json['condition'].map(item => new Coding(item))
    }
  }

  /**
  Patient Resource.
  @returns {Reference}
  */
  patient () { if (this.json['patient']) { return new Reference(this.json['patient']) } }

  /**
  Financial instrument by which payment information for health care.
  @returns {Array} an array of {@link CoverageComponent} objects
  */
  coverage () {
    if (this.json['coverage']) {
      return this.json['coverage'].map(item => new CoverageComponent(item))
    }
  }

  /**
  Factors which may influence the applicability of coverage.
  @returns {Array} an array of {@link Coding} objects
  */
  exception () {
    if (this.json['exception']) {
      return this.json['exception'].map(item => new Coding(item))
    }
  }

  /**
  Name of school for over-aged dependants.
  @returns {Array} an array of {@link String} objects
  */
  school () { return this.json['school'] }

  /**
  Date of an accident which these services are addessing.
  @returns {Array} an array of {@link Date} objects
  */
  accident () { if (this.json['accident']) { return DT.DateTime.parse(this.json['accident']) } }

  /**
  Type of accident: work, auto, etc.
  @returns {Coding}
  */
  accidentType () { if (this.json['accidentType']) { return new Coding(this.json['accidentType']) } }

  /**
  A list of intervention and exception codes which may influence the adjudication of the claim.
  @returns {Array} an array of {@link Coding} objects
  */
  interventionException () {
    if (this.json['interventionException']) {
      return this.json['interventionException'].map(item => new Coding(item))
    }
  }

  /**
  A list of teeth which would be expected but are not found due to having been previously  extracted or for other reasons.
  @returns {Array} an array of {@link MissingTeethComponent} objects
  */
  missingteeth () {
    if (this.json['missingteeth']) {
      return this.json['missingteeth'].map(item => new MissingTeethComponent(item))
    }
  }

  /**
  The highlevel detail sof an Orthodonic Treatment Plan.
  @returns {OrthodonticPlanComponent}
  */
  orthoPlan () { if (this.json['orthoPlan']) { return new OrthodonticPlanComponent(this.json['orthoPlan']) } }

  /**
  First tier of goods and services.
  @returns {Array} an array of {@link ItemsComponent} objects
  */
  item () {
    if (this.json['item']) {
      return this.json['item'].map(item => new ItemsComponent(item))
    }
  }

  /**
  Code to indicate that Xrays, images, emails, documents, models or attachments are being sent in support of this submission.
  @returns {Array} an array of {@link Coding} objects
  */
  additionalMaterials () {
    if (this.json['additionalMaterials']) {
      return this.json['additionalMaterials'].map(item => new Coding(item))
    }
  }
}
