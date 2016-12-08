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
import { Identifier, CodeableConcept, Reference, DomainResource } from './core'

/**
 * Prospective warnings of potential issues when providing care to the patient.
 */
export class Alert extends DomainResource {
  /**
   * Identifier assigned to the alert for external use (outside the FHIR environment).
   * @returns {Array} an array of {@link Identifier} objects
   */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
   * Allows an alert to be divided into different categories like clinical, administrative etc.
   * @returns {CodeableConcept}
   */
  category () {
    if (this.json['category']) return new CodeableConcept(this.json['category'])
  }

  /**
   * Supports basic workflow.
   * @returns {Array} an array of {@link String} objects
   */
  status () {
    return this.json['status']
  }

  /**
   * The person who this alert concerns.
   * @returns {Reference}
   */
  subject () {
    if (this.json['subject']) return new Reference(this.json['subject'])
  }

  /**
   * The person or device that created the alert.
   * @returns {Reference}
   */
  author () {
    if (this.json['author']) return new Reference(this.json['author'])
  }

  /**
   * The textual component of the alert to display to the user.
   * @returns {Array} an array of {@link String} objects
   */
  note () {
    return this.json['note']
  }
}

