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
import * as DT from '../cqlDatatypes'
import { Identifier, DomainResource, Reference, BackboneElement, Attachment, Coding } from './core'

/**
Embedded class
@class SupportingDocumentationDetailComponent
@exports  SupportingDocumentationDetailComponent as SupportingDocumentationDetailComponent
*/
class SupportingDocumentationDetailComponent extends BackboneElement {
  /**
  A link Id for the response to reference.
  @returns {Array} an array of {@link Number} objects
  */
  linkId () { return this.json['linkId'] }

  /**
  The attached content.
  @returns {Reference}
  */
  contentReference () { if (this.json['contentReference']) { return new Reference(this.json['contentReference']) } }

  /**
  The attached content.
  @returns {Attachment}
  */
  contentAttachment () { if (this.json['contentAttachment']) { return new Attachment(this.json['contentAttachment']) } }

  /**
  The date and optionally time when the material was created.
  @returns {Array} an array of {@link Date} objects
  */
  dateTime () { if (this.json['dateTime']) { return DT.DateTime.parse(this.json['dateTime']) } }
}

/**
This resource provides the supporting information for a process, for example clinical or financial  information related to a claim or pre-authorization.
@class SupportingDocumentation
@exports SupportingDocumentation as SupportingDocumentation
*/
export class SupportingDocumentation extends DomainResource {
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
  The Insurer, organization or Provider who is target  of the submission.
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
  Original request identifer.
  @returns {Reference}
  */
  request () { if (this.json['request']) { return new Reference(this.json['request']) } }

  /**
  Original response identifer.
  @returns {Reference}
  */
  response () { if (this.json['response']) { return new Reference(this.json['response']) } }

  /**
  Person who created the submission.
  @returns {Reference}
  */
  author () { if (this.json['author']) { return new Reference(this.json['author']) } }

  /**
  The patient who is directly or indirectly the subject of the supporting information.
  @returns {Reference}
  */
  subject () { if (this.json['subject']) { return new Reference(this.json['subject']) } }

  /**
  Supporting Files.
  @returns {Array} an array of {@link SupportingDocumentationDetailComponent} objects
  */
  detail () {
    if (this.json['detail']) {
      return this.json['detail'].map(item => new SupportingDocumentationDetailComponent(item))
    }
  }
}
