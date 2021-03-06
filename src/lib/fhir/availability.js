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
import { Identifier, Period, CodeableConcept, Reference, DomainResource } from './core'

/**
(informative) A container for slot(s) of time that may be available for booking appointments.
@class Availability
@exports Availability as Availability
*/
export class Availability extends DomainResource {
  /**
  External Ids for this item.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  The schedule type can be used for the categorization of healthcare services or other appointment types.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  type () {
    if (this.json['type']) {
      return this.json['type'].map(item => new CodeableConcept(item))
    }
  }

  /**
  The resource this availability resource is providing availability information for. These are expected to usually be one of HealthcareService, Location, Practitioner, Device, Patient or RelatedPerson.
  @returns {Reference}
  */
  actor () { if (this.json['actor']) return new Reference(this.json['actor']) }

  /**
  The period of time that the slots that are attached to this availability resource cover (even if none exist). These  cover the amount of time that an organization's planning horizon; the interval for which they are currently accepting appointments. This does not define a "template" for planning outside these dates.
  @returns {Period}
  */
  planningHorizon () { if (this.json['planningHorizon']) return new Period(this.json['planningHorizon']) }

  /**
  Comments on the availability to describe any extended information. Such as custom constraints on the slot(s) that may be associated.
  @returns {Array} an array of {@link String} objects
  */
  comment () { return this.json['comment'] }

  /**
  When this availability was created, or last revised.
  @returns {Array} an array of {@link Date} objects
  */
  lastModified () { if (this.json['lastModified']) return DT.DateTime.parse(this.json['lastModified']) }
}

