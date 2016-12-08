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
import { Identifier, DomainResource, Reference, BackboneElement, CodeableConcept } from './core'

/**
Embedded class
@class ImmunizationExplanationComponent
@exports  ImmunizationExplanationComponent as ImmunizationExplanationComponent
*/
class ImmunizationExplanationComponent extends BackboneElement {
  /**
  Reasons why a vaccine was administered.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  reason() {
    if (this.json['reason']) {
      return this.json['reason'].map((item) => new CodeableConcept(item))
    }
  }

  /**
  Refusal or exemption reasons.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  refusalReason () {
    if (this.json['refusalReason']) {
      return this.json['refusalReason'].map((item) => new CodeableConcept(item))
    }
  }
}

/**
Embedded class
@class ImmunizationReactionComponent
@exports  ImmunizationReactionComponent as ImmunizationReactionComponent
*/
class ImmunizationReactionComponent extends BackboneElement {
  /**
  Date of reaction to the immunization.
  @returns {Array} an array of {@link Date} objects
  */
  date () { if (this.json['date']) { return DT.DateTime.parse(this.json['date']) } }

  /**
  Details of the reaction.
  @returns {Reference}
  */
  detail () { if (this.json['detail']) { return new Reference(this.json['detail']) } }

  /**
  Self-reported indicator.
  @returns {Array} an array of {@link boolean} objects
  */
  reported () { return this.json['reported'] }
}

/**
Embedded class
@class ImmunizationVaccinationProtocolComponent
@exports  ImmunizationVaccinationProtocolComponent as ImmunizationVaccinationProtocolComponent
*/
class ImmunizationVaccinationProtocolComponent extends BackboneElement {
  /**
  Nominal position in a series.
  @returns {Array} an array of {@link Number} objects
  */
  doseSequence () { return this.json['doseSequence'] }

  /**
  Contains the description about the protocol under which the vaccine was administered.
  @returns {Array} an array of {@link String} objects
  */
  description () { return this.json['description'] }

  /**
  Indicates the authority who published the protocol?  E.g. ACIP.
  @returns {Reference}
  */
  authority () { if (this.json['authority']) { return new Reference(this.json['authority']) } }

  /**
  One possible path to achieve presumed immunity against a disease - within the context of an authority.
  @returns {Array} an array of {@link String} objects
  */
  series () { return this.json['series'] }

  /**
  The recommended number of doses to achieve immunity.
  @returns {Array} an array of {@link Number} objects
  */
  seriesDoses () { return this.json['seriesDoses'] }

  /**
  The targeted disease.
  @returns {CodeableConcept}
  */
  doseTarget () { if (this.json['doseTarget']) { return new CodeableConcept(this.json['doseTarget']) } }

  /**
  Indicates if the immunization event should "count" against  the protocol.
  @returns {CodeableConcept}
  */
  doseStatus () { if (this.json['doseStatus']) { return new CodeableConcept(this.json['doseStatus']) } }

  /**
  Provides an explanation as to why a immunization event should or should not count against the protocol.
  @returns {CodeableConcept}
  */
  doseStatusReason () { if (this.json['doseStatusReason']) { return new CodeableConcept(this.json['doseStatusReason']) } }
}

/**
Immunization event information.
@class Immunization
@exports Immunization as Immunization
*/
export class Immunization extends DomainResource {
  /**
  A unique identifier assigned to this adverse reaction record.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  Date vaccine administered or was to be administered.
  @returns {Array} an array of {@link Date} objects
  */
  date () { if (this.json['date']) { return DT.DateTime.parse(this.json['date']) } }

  /**
  Vaccine that was administered or was to be administered.
  @returns {CodeableConcept}
  */
  vaccineType () { if (this.json['vaccineType']) { return new CodeableConcept(this.json['vaccineType']) } }

  /**
  The patient to whom the vaccine was to be administered.
  @returns {Reference}
  */
  subject () { if (this.json['subject']) { return new Reference(this.json['subject']) } }

  /**
  Indicates if the vaccination was refused.
  @returns {Array} an array of {@link boolean} objects
  */
  refusedIndicator () { return this.json['refusedIndicator'] }

  /**
  True if this administration was reported rather than directly administered.
  @returns {Array} an array of {@link boolean} objects
  */
  reported () { return this.json['reported'] }

  /**
  Clinician who administered the vaccine.
  @returns {Reference}
  */
  performer () { if (this.json['performer']) { return new Reference(this.json['performer']) } }

  /**
  Clinician who ordered the vaccination.
  @returns {Reference}
  */
  requester () { if (this.json['requester']) { return new Reference(this.json['requester']) } }

  /**
  Name of vaccine manufacturer.
  @returns {Reference}
  */
  manufacturer () { if (this.json['manufacturer']) { return new Reference(this.json['manufacturer']) } }

  /**
  The service delivery location where the vaccine administration occurred.
  @returns {Reference}
  */
  location () { if (this.json['location']) { return new Reference(this.json['location']) } }

  /**
  Lot number of the  vaccine product.
  @returns {Array} an array of {@link String} objects
  */
  lotNumber () { return this.json['lotNumber'] }

  /**
  Date vaccine batch expires.
  @returns {Array} an array of {@link Date} objects
  */
  expirationDate () { if (this.json['expirationDate']) { return DT.DateTime.parse(this.json['expirationDate']) } }

  /**
  Body site where vaccine was administered.
  @returns {CodeableConcept}
  */
  site () { if (this.json['site']) { return new CodeableConcept(this.json['site']) } }

  /**
  The path by which the vaccine product is taken into the body.
  @returns {CodeableConcept}
  */
  route () { if (this.json['route']) { return new CodeableConcept(this.json['route']) } }

  /**
  The quantity of vaccine product that was administered.
  @returns {Quantity}
  */
  doseQuantity () { if (this.json['doseQuantity']) { return new Quantity(this.json['doseQuantity']) } }

  /**
  Reasons why a vaccine was administered or refused.
  @returns {ImmunizationExplanationComponent}
  */
  explanation () { if (this.json['explanation']) { return new ImmunizationExplanationComponent(this.json['explanation']) } }

  /**
  Categorical data indicating that an adverse event is associated in time to an immunization.
  @returns {Array} an array of {@link ImmunizationReactionComponent} objects
  */
  reaction () {
    if (this.json['reaction']) {
      return this.json['reaction'].map(item => new ImmunizationReactionComponent(item))
    }
  }

  /**
  Contains information about the protocol(s) under which the vaccine was administered.
  @returns {Array} an array of {@link ImmunizationVaccinationProtocolComponent} objects
  */
  vaccinationProtocol () {
    if (this.json['vaccinationProtocol']) {
      return this.json['vaccinationProtocol'].map(item => new ImmunizationVaccinationProtocolComponent(item))
    }
  }
}

