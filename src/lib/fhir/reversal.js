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
import { Identifier, DomainResource, Reference, BackboneElement, Coding } from './core'

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
@class ReversalCoverageComponent
@exports  ReversalCoverageComponent as ReversalCoverageComponent
*/
class ReversalCoverageComponent extends BackboneElement {
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
  The contract number of a business agreement which describes the terms and conditions.
  @returns {Array} an array of {@link String} objects
  */
  businessArrangement () { return this.json['businessArrangement'] }

  /**
  The relationship of the patient to the subscriber.
  @returns {Coding}
  */
  relationship () { if (this.json['relationship']) { return new Coding(this.json['relationship']) } }
}

/**
This resource provides the request and response details for the request for which all actions are to be reversed or terminated.
@class Reversal
@exports Reversal as Reversal
*/
export class Reversal extends DomainResource {
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
  The version of the style of resource contents. This should be mapped to the allowable profiles for this and supporting resources.
  @returns {Coding}
  */
  ruleset () { if (this.json['ruleset']) { return new Coding(this.json['ruleset']) } }

  /**
  The style (standard) and version of the original material which was converted into this resource.
  @returns {Coding}
  */
  originalRuleset () { if (this.json['originalRuleset']) { return new Coding(this.json['originalRuleset']) } }

  /**
  The date when this resource was created.
  @returns {Array} an array of {@link Date} objects
  */
  date () { if (this.json['date']) { return DT.DateTime.parse(this.json['date']) } }

  /**
  The Insurer who is target  of the request.
  @returns {Reference}
  */
  target () { if (this.json['target']) { return new Reference(this.json['target']) } }

  /**
  The practitioner who is responsible for the services rendered to the patient.
  @returns {Reference}
  */
  provider () { if (this.json['provider']) { return new Reference(this.json['provider']) } }

  /**
  The organization which is responsible for the services rendered to the patient.
  @returns {Reference}
  */
  organization () { if (this.json['organization']) { return new Reference(this.json['organization']) } }

  /**
  Reference of resource to reverse.
  @returns {Reference}
  */
  request () { if (this.json['request']) { return new Reference(this.json['request']) } }

  /**
  Reference of response to resource to reverse.
  @returns {Reference}
  */
  response () { if (this.json['response']) { return new Reference(this.json['response']) } }

  /**
  Payee information suypplied for matching purposes.
  @returns {PayeeComponent}
  */
  payee () { if (this.json['payee']) { return new PayeeComponent(this.json['payee']) } }

  /**
  Financial instrument by which payment information for health care.
  @returns {ReversalCoverageComponent}
  */
  coverage () { if (this.json['coverage']) { return new ReversalCoverageComponent(this.json['coverage']) } }

  /**
  If true remove all history excluding audit.
  @returns {Array} an array of {@link boolean} objects
  */
  nullify () { return this.json['nullify'] }
}
