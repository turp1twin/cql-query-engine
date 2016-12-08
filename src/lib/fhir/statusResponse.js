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
@class StatusResponseNotesComponent
@exports  StatusResponseNotesComponent as StatusResponseNotesComponent
*/
class StatusResponseNotesComponent extends BackboneElement {
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
This resource provides processing status, errors and notes from the processing of a resource.
@class StatusResponse
@exports StatusResponse as StatusResponse
*/
export class StatusResponse extends DomainResource {
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
  Transaction status: error, complete, held.
  @returns {Coding}
  */
  outcome () { if (this.json['outcome']) { return new Coding(this.json['outcome']) } }

  /**
  A description of the status of the adjudication or processing.
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
  The form to be used for printing the content.
  @returns {Coding}
  */
  form () { if (this.json['form']) { return new Coding(this.json['form']) } }

  /**
  Suite of processing note or additional requirements is the processing has been held.
  @returns {Array} an array of {@link StatusResponseNotesComponent} objects
  */
  notes () {
    if (this.json['notes']) {
      return this.json['notes'].map(item => new StatusResponseNotesComponent(item))
    }
  }

  /**
  Processing errors.
  @returns {Array} an array of {@link Coding} objects
  */
  error () {
    if (this.json['error']) {
      return this.json['error'].map(item => new Coding(item))
    }
  }
}
