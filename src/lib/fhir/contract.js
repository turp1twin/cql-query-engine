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
import { Coding, Identifier, CodeableConcept, Reference, BackboneElement, Period, Quantity, Money, DomainResource, Attachment } from './core'

/**
Embedded class
@class ContractSignerComponent
@exports  ContractSignerComponent as ContractSignerComponent
*/
class ContractSignerComponent extends BackboneElement {
  /**
  Party or role who is signing.
  @returns {Coding}
  */
  type () { if (this.json['type']) return new Coding(this.json['type']) }

  /**
  The DSIG signature contents in Base64.
  @returns {Array} an array of {@link String} objects
  */
  singnature () { return this.json['singnature'] }
}

/**
Embedded class
@class ContractTermComponent
@exports  ContractTermComponent as ContractTermComponent
*/
class ContractTermComponent extends BackboneElement {
  /**
  Unique Id for this particular term.
  @returns {Identifier}
  */
  identifier () { if (this.json['identifier']) return new Identifier(this.json['identifier']) }

  /**
  The type of the term.
  @returns {CodeableConcept}
  */
  type () { if (this.json['type']) return new CodeableConcept(this.json['type']) }

  /**
  The subttype of the term which is appropriate to the term type.
  @returns {CodeableConcept}
  */
  subtype () { if (this.json['subtype']) return new CodeableConcept(this.json['subtype']) }

  /**
  Who or what the contract term is about.
  @returns {Reference}
  */
  subject () { if (this.json['subject']) return new Reference(this.json['subject']) }

  /**
  Human readable form of the term of the contract.
  @returns {Array} an array of {@link String} objects
  */
  text () { return this.json['text'] }
}

/**
A formal agreement between parties regarding the conduct of business, exchange of information or other matters.
@class Contract
@exports Contract as Contract
*/
export class Contract extends DomainResource {
  /**
  Unique Id for this contract.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  Who and/or what this is about: typically Patient, Organization, property.
  @returns {Array} an array of {@link Reference} objects
  */
  subject () {
    if (this.json['subject']) {
      return this.json['subject'].map(item => new Reference(item))
    }
  }

  /**
  Type of contract (Privacy-Security, Agreement, Insurance).
  @returns {CodeableConcept}
  */
  type () { if (this.json['type']) return new CodeableConcept(this.json['type']) }

  /**
  More specific type of contract (Privacy, Disclosure-Authorization, Advanced-Directive, DNR, Authorization-to-Treat).
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  subtype () {
    if (this.json['subtype']) {
      return this.json['subtype'].map(item => new CodeableConcept(item))
    }
  }

  /**
  When this was issued.
  @returns {Array} an array of {@link Date} objects
  */
  issued () { if (this.json['issued']) return DT.DateTime.parse(this.json['issued']) }

  /**
  Relevant time/time-period when applicable.
  @returns {Period}
  */
  applies () { if (this.json['applies']) return new Period(this.json['applies']) }

  /**
  The number of repetitions of a service or product.
  @returns {Quantity}
  */
  quantity () { if (this.json['quantity']) return new Quantity(this.json['quantity']) }

  /**
  The unit price product.
  @returns {Money}
  */
  unitPrice () { if (this.json['unitPrice']) return new Money(this.json['unitPrice']) }

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
  net () { if (this.json['net']) return new Money(this.json['net']) }

  /**
  Contract author or responsible party.
  @returns {Array} an array of {@link Reference} objects
  */
  author () {
    if (this.json['author']) {
      return this.json['author'].map(item => new Reference(item))
    }
  }

  /**
  First Party to the contract, may be the party who confers or delegates the rights defined in the contract.
  @returns {Array} an array of {@link Reference} objects
  */
  grantor () {
    if (this.json['grantor']) {
      return this.json['grantor'].map(item => new Reference(item))
    }
  }

  /**
  The Second party to the contract, may be the party who accepts obligations or be that to which rights are delegated.
  @returns {Array} an array of {@link Reference} objects
  */
  grantee () {
    if (this.json['grantee']) {
      return this.json['grantee'].map(item => new Reference(item))
    }
  }

  /**
  Who witnesses the contract.
  @returns {Array} an array of {@link Reference} objects
  */
  witness () {
    if (this.json['witness']) {
      return this.json['witness'].map(item => new Reference(item))
    }
  }

  /**
  First Party to the contract, may be the party who confers or delegates the rights defined in the contract.
  @returns {Array} an array of {@link Reference} objects
  */
  executor () {
    if (this.json['executor']) {
      return this.json['executor'].map(item => new Reference(item))
    }
  }

  /**
  First Party to the contract, may be the party who confers or delegates the rights defined in the contract.
  @returns {Array} an array of {@link Reference} objects
  */
  notary () {
    if (this.json['notary']) {
      return this.json['notary'].map(item => new Reference(item))
    }
  }

  /**
  List or contract signatures.
  @returns {Array} an array of {@link ContractSignerComponent} objects
  */
  signer () {
    if (this.json['signer']) {
      return this.json['signer'].map(item => new ContractSignerComponent(item))
    }
  }

  /**
  A contract provision.
  @returns {Array} an array of {@link ContractTermComponent} objects
  */
  term () {
    if (this.json['term']) {
      return this.json['term'].map(item => new ContractTermComponent(item))
    }
  }

  /**
  Friendly Human readable form (might be a reference to the UI used to capture the contract).
  @returns {Attachment}
  */
  friendly () { if (this.json['friendly']) return new Attachment(this.json['friendly']) }

  /**
  Legal text in Human readable form.
  @returns {Attachment}
  */
  legal () { if (this.json['legal']) return new Attachment(this.json['legal']) }

  /**
  Computable Policy rules (e.g. XACML, DKAL, SecPal).
  @returns {Attachment}
  */
  rule () { if (this.json['rule']) return new Attachment(this.json['rule']) }
}
