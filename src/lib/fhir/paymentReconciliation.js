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
@class DetailsComponent
@exports  DetailsComponent as DetailsComponent
*/
class DetailsComponent extends BackboneElement {
  /**
  Code to indicate the nature of the payment, adjustment, funds advance, etc.
  @returns {Coding}
  */
  type () { if (this.json['type']) { return new Coding(this.json['type']) } }

  /**
  The claim or financial resource.
  @returns {Reference}
  */
  request () { if (this.json['request']) { return new Reference(this.json['request']) } }

  /**
  The claim response resource.
  @returns {Reference}
  */
  responce () { if (this.json['responce']) { return new Reference(this.json['responce']) } }

  /**
  The Organization which submitted the invoice or financial transaction.
  @returns {Reference}
  */
  submitter () { if (this.json['submitter']) { return new Reference(this.json['submitter']) } }

  /**
  The organization which is receiving the payment.
  @returns {Reference}
  */
  payee () { if (this.json['payee']) { return new Reference(this.json['payee']) } }

  /**
  The date of the invoice or financial resource.
  @returns {Array} an array of {@link Date} objects
  */
  date () { if (this.json['date']) { return DT.DateTime.parse(this.json['date']) } }

  /**
  Amount paid for this detail.
  @returns {Money}
  */
  amount () { if (this.json['amount']) { return new Money(this.json['amount']) } }
}

/**
Embedded class
@class NotesComponent
@exports  NotesComponent as NotesComponent
*/
class NotesComponent extends BackboneElement {
  /**
  The note purpose: Print/Display.
  @returns {Coding}
  */
  type () { if (this.json['type']) { return new Coding(this.json['type']) } }

  /**
  The note text.
  @returns {Array} an array of {@link String} objects
  */
  text () { return this.json['text'] }
}

/**
This resource provides payment details supporting a bulk payment, or the errors in,  processing a ReconciliationRequest resource.
@class PaymentReconciliation
@exports PaymentReconciliation as PaymentReconciliation
*/
export class PaymentReconciliation extends DomainResource {
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
  request () { if (this.json['request']) { return new Reference(this.json['request']) } }

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
  The date when the enclosed suite of services were performed or completed.
  @returns {Array} an array of {@link Date} objects
  */
  date () { if (this.json['date']) { return DT.DateTime.parse(this.json['date']) } }

  /**
  The Insurer who produced this adjudicated response.
  @returns {Reference}
  */
  organization () { if (this.json['organization']) { return new Reference(this.json['organization']) } }

  /**
  The practitioner who is responsible for the services rendered to the patient.
  @returns {Reference}
  */
  requestProvider () { if (this.json['requestProvider']) { return new Reference(this.json['requestProvider']) } }

  /**
  The organization which is responsible for the services rendered to the patient.
  @returns {Reference}
  */
  requestOrganization () { if (this.json['requestOrganization']) { return new Reference(this.json['requestOrganization']) } }

  /**
  List of individual settlement amounts and the corresponding transaction.
  @returns {Array} an array of {@link DetailsComponent} objects
  */
  detail () {
    if (this.json['detail']) {
      return this.json['detail'].map(item => new DetailsComponent(item))
    }
  }

  /**
  The form to be used for printing the content.
  @returns {Coding}
  */
  form () { if (this.json['form']) { return new Coding(this.json['form']) } }

  /**
  Total payment amount.
  @returns {Money}
  */
  total () { if (this.json['total']) { return new Money(this.json['total']) } }

  /**
  List of errors detected in the request.
  @returns {Array} an array of {@link Coding} objects
  */
  error () {
    if (this.json['error']) {
      return this.json['error'].map(item => new Coding(item))
    }
  }

  /**
  Suite of notes.
  @returns {Array} an array of {@link NotesComponent} objects
  */
  note () {
    if (this.json['note']) {
      return this.json['note'].map(item => new NotesComponent(item))
    }
  }
}
