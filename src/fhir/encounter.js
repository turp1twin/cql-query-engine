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
import { Identifier, DomainResource, Reference, BackboneElement, CodeableConcept, Period } from './core'

/**
Embedded class
@class EncounterParticipantComponent
@exports  EncounterParticipantComponent as EncounterParticipantComponent
*/
class EncounterParticipantComponent extends BackboneElement {
  /**
  Role of participant in encounter.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  type () {
    if (this.json['type']) {
      return this.json['type'].map(item => new CodeableConcept(item))
    }
  }

  /**
  Persons involved in the encounter other than the patient.
  @returns {Reference}
  */
  individual () { if (this.json['individual']) { return new Reference(this.json['individual']) } }
}

/**
Embedded class
@class EncounterHospitalizationAccomodationComponent
@exports  EncounterHospitalizationAccomodationComponent as EncounterHospitalizationAccomodationComponent
*/
class EncounterHospitalizationAccomodationComponent extends BackboneElement {
  /**
  The bed that is assigned to the patient.
  @returns {Reference}
  */
  bed () { if (this.json['bed']) { return new Reference(this.json['bed']) } }

  /**
  Period during which the patient was assigned the bed.
  @returns {Period}
  */
  period () { if (this.json['period']) { return new Period(this.json['period']) } }
}

/**
Embedded class
@class EncounterHospitalizationComponent
@exports  EncounterHospitalizationComponent as EncounterHospitalizationComponent
*/
class EncounterHospitalizationComponent extends BackboneElement {
  /**
  Pre-admission identifier.
  @returns {Identifier}
  */
  preAdmissionIdentifier () { if (this.json['preAdmissionIdentifier']) { return new Identifier(this.json['preAdmissionIdentifier']) } }

  /**
  The location from which the patient came before admission.
  @returns {Reference}
  */
  origin () { if (this.json['origin']) { return new Reference(this.json['origin']) } }

  /**
  From where patient was admitted (physician referral, transfer).
  @returns {CodeableConcept}
  */
  admitSource () { if (this.json['admitSource']) { return new CodeableConcept(this.json['admitSource']) } }

  /**
  Period during which the patient was admitted.
  @returns {Period}
  */
  period () { if (this.json['period']) { return new Period(this.json['period']) } }

  /**
  Where the patient stays during this encounter.
  @returns {Array} an array of {@link EncounterHospitalizationAccomodationComponent} objects
  */
  accomodation () {
    if (this.json['accomodation']) {
      return this.json['accomodation'].map(item => new EncounterHospitalizationAccomodationComponent(item))
    }
  }

  /**
  Dietary restrictions for the patient.
  @returns {CodeableConcept}
  */
  diet () { if (this.json['diet']) { return new CodeableConcept(this.json['diet']) } }

  /**
  Special courtesies (VIP, board member).
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  specialCourtesy () {
    if (this.json['specialCourtesy']) {
      return this.json['specialCourtesy'].map(item => new CodeableConcept(item))
    }
  }

  /**
  Wheelchair, translator, stretcher, etc.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  specialArrangement () {
    if (this.json['specialArrangement']) {
      return this.json['specialArrangement'].map(item => new CodeableConcept(item))
    }
  }

  /**
  Location to which the patient is discharged.
  @returns {Reference}
  */
  destination () { if (this.json['destination']) { return new Reference(this.json['destination']) } }

  /**
  Category or kind of location after discharge.
  @returns {CodeableConcept}
  */
  dischargeDisposition () { if (this.json['dischargeDisposition']) { return new CodeableConcept(this.json['dischargeDisposition']) } }

  /**
  The final diagnosis given a patient before release from the hospital after all testing, surgery, and workup are complete.
  @returns {Reference}
  */
  dischargeDiagnosis () { if (this.json['dischargeDiagnosis']) { return new Reference(this.json['dischargeDiagnosis']) } }

  /**
  Whether this hospitalization is a readmission.
  @returns {Array} an array of {@link boolean} objects
  */
  reAdmission () { return this.json['reAdmission'] }
}

/**
Embedded class
@class EncounterLocationComponent
@exports  EncounterLocationComponent as EncounterLocationComponent
*/
class EncounterLocationComponent extends BackboneElement {
  /**
  The location where the encounter takes place.
  @returns {Reference}
  */
  location () { if (this.json['location']) { return new Reference(this.json['location']) } }

  /**
  Time period during which the patient was present at the location.
  @returns {Period}
  */
  period () { if (this.json['period']) { return new Period(this.json['period']) } }
}

/**
An interaction between a patient and healthcare provider(s) for the purpose of providing healthcare service(s) or assessing the health status of a patient.
@class Encounter
@exports Encounter as Encounter
*/
export class Encounter extends DomainResource {
  /**
  Identifier(s) by which this encounter is known.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  planned | in progress | onleave | finished | cancelled.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  inpatient | outpatient | ambulatory | emergency +.
  @returns {Array} an array of {@link String} objects
  */
  class () { return this.json['class'] }

  /**
  Specific type of encounter (e.g. e-mail consultation, surgical day-care, skilled nursing, rehabilitation).
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  type () {
    if (this.json['type']) {
      return this.json['type'].map(item => new CodeableConcept(item))
    }
  }

  /**
  The patient present at the encounter.
  @returns {Reference}
  */
  subject () { if (this.json['subject']) { return new Reference(this.json['subject']) } }

  /**
  The main practitioner responsible for providing the service.
  @returns {Array} an array of {@link EncounterParticipantComponent} objects
  */
  participant () {
    if (this.json['participant']) {
      return this.json['participant'].map(item => new EncounterParticipantComponent(item))
    }
  }

  /**
  The appointment that scheduled this encounter.
  @returns {Reference}
  */
  fulfills () { if (this.json['fulfills']) { return new Reference(this.json['fulfills']) } }

  /**
  The start and end time of the encounter.
  @returns {Period}
  */
  period () { if (this.json['period']) { return new Period(this.json['period']) } }

  /**
  Quantity of time the encounter lasted. This excludes the time during leaves of absence.
  @returns {Duration}
  */
  length () { if (this.json['length']) { return new Duration(this.json['length']) } }

  /**
  Reason the encounter takes place, expressed as a code. For admissions, this can be used for a coded admission diagnosis.
  @returns {CodeableConcept}
  */
  reason () { if (this.json['reason']) { return new CodeableConcept(this.json['reason']) } }

  /**
  Reason the encounter takes place, as specified using information from another resource. For admissions, this is the admission diagnosis.
  @returns {Reference}
  */
  indication () { if (this.json['indication']) { return new Reference(this.json['indication']) } }

  /**
  Indicates the urgency of the encounter.
  @returns {CodeableConcept}
  */
  priority () { if (this.json['priority']) { return new CodeableConcept(this.json['priority']) } }

  /**
  Details about an admission to a clinic.
  @returns {EncounterHospitalizationComponent}
  */
  hospitalization () { if (this.json['hospitalization']) { return new EncounterHospitalizationComponent(this.json['hospitalization']) } }

  /**
  List of locations at which the patient has been.
  @returns {Array} an array of {@link EncounterLocationComponent} objects
  */
  location () {
    if (this.json['location']) {
      return this.json['location'].map(item => new EncounterLocationComponent(item))
    }
  }

  /**
  Department or team providing care.
  @returns {Reference}
  */
  serviceProvider () { if (this.json['serviceProvider']) { return new Reference(this.json['serviceProvider']) } }

  /**
  Another Encounter of which this encounter is a part of (administratively or in time).
  @returns {Reference}
  */
  partOf () { if (this.json['partOf']) { return new Reference(this.json['partOf']) } }
}

