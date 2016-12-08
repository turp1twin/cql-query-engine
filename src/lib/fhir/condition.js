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
import { Identifier, CodeableConcept, Reference, BackboneElement, Quantity, DomainResource } from './core'

/**
Embedded class
@class ConditionStageComponent
@exports  ConditionStageComponent as ConditionStageComponent
*/
class ConditionStageComponent extends BackboneElement {
  /**
  A simple summary of the stage such as "Stage 3". The determination of the stage is disease-specific.
  @returns {CodeableConcept}
  */
  summary () { if (this.json['summary']) return new CodeableConcept(this.json['summary']) }

  /**
  Reference to a formal record of the evidence on which the staging assessment is based.
  @returns {Array} an array of {@link Reference} objects
  */
  assessment () {
    if (this.json['assessment']) {
      return this.json['assessment'].map(item => new Reference(item))
    }
  }
}

/**
Embedded class
@class ConditionEvidenceComponent
@exports  ConditionEvidenceComponent as ConditionEvidenceComponent
*/
class ConditionEvidenceComponent extends BackboneElement {
  /**
  A manifestation or symptom that led to the recording of this condition.
  @returns {CodeableConcept}
  */
  code () { if (this.json['code']) return new CodeableConcept(this.json['code']) }

  /**
  Links to other relevant information, including pathology reports.
  @returns {Array} an array of {@link Reference} objects
  */
  detail () {
    if (this.json['detail']) {
      return this.json['detail'].map(item => new Reference(item))
    }
  }
}

/**
Embedded class
@class ConditionLocationComponent
@exports  ConditionLocationComponent as ConditionLocationComponent
*/
class ConditionLocationComponent extends BackboneElement {
  /**
  Code that identifies the structural location.
  @returns {CodeableConcept}
  */
  code () { if (this.json['code']) return new CodeableConcept(this.json['code']) }

  /**
  Detailed anatomical location information.
  @returns {Array} an array of {@link String} objects
  */
  detail () { return this.json['detail'] }
}

/**
Embedded class
@class ConditionDueToComponent
@exports  ConditionDueToComponent as ConditionDueToComponent
*/
class ConditionDueToComponent extends BackboneElement {
  /**
  Code that identifies the target of this relationship. The code takes the place of a detailed instance target.
  @returns {CodeableConcept}
  */
  codeableConcept () { if (this.json['codeableConcept']) return new CodeableConcept(this.json['codeableConcept']) }

  /**
  Target of the relationship.
  @returns {Reference}
  */
  target () { if (this.json['target']) return new Reference(this.json['target']) }
}

/**
Embedded class
@class ConditionOccurredFollowingComponent
@exports  ConditionOccurredFollowingComponent as ConditionOccurredFollowingComponent
*/
class ConditionOccurredFollowingComponent extends BackboneElement {
  /**
  Code that identifies the target of this relationship. The code takes the place of a detailed instance target.
  @returns {CodeableConcept}
  */
  codeableConcept () { if (this.json['codeableConcept']) return new CodeableConcept(this.json['codeableConcept']) }

  /**
  Target of the relationship.
  @returns {Reference}
  */
  target () { if (this.json['target']) return new Reference(this.json['target']) }
}

/**
Use to record detailed information about conditions, problems or diagnoses recognized by a clinician. There are many uses including: recording a Diagnosis during an Encounter; populating a problem List or a Summary Statement, such as a Discharge Summary.
@class Condition
@exports Condition as Condition
*/
export class Condition extends DomainResource {
  /**
  This records identifiers associated with this condition that are defined by business processed and/ or used to refer to it when a direct URL reference to the resource itself is not appropriate (e.g. in CDA documents, or in written / printed documentation).
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  Indicates the patient who the condition record is associated with.
  @returns {Reference}
  */
  subject () { if (this.json['subject']) return new Reference(this.json['subject']) }

  /**
  Encounter during which the condition was first asserted.
  @returns {Reference}
  */
  encounter () { if (this.json['encounter']) return new Reference(this.json['encounter']) }

  /**
  Person who takes responsibility for asserting the existence of the condition as part of the electronic record.
  @returns {Reference}
  */
  asserter () { if (this.json['asserter']) return new Reference(this.json['asserter']) }

  /**
  Estimated or actual date the condition/problem/diagnosis was first detected/suspected.
  @returns {Array} an array of {@link Date} objects
  */
  dateAsserted () { if (this.json['dateAsserted']) return DT.DateTime.parse(this.json['dateAsserted']) }

  /**
  Identification of the condition, problem or diagnosis.
  @returns {CodeableConcept}
  */
  code () { if (this.json['code']) return new CodeableConcept(this.json['code']) }

  /**
  A category assigned to the condition. E.g. complaint | symptom | finding | diagnosis.
  @returns {CodeableConcept}
  */
  category () { if (this.json['category']) return new CodeableConcept(this.json['category']) }

  /**
  The clinical status of the condition.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  The degree of confidence that this condition is correct.
  @returns {CodeableConcept}
  */
  certainty () { if (this.json['certainty']) return new CodeableConcept(this.json['certainty']) }

  /**
  A subjective assessment of the severity of the condition as evaluated by the clinician.
  @returns {CodeableConcept}
  */
  severity () { if (this.json['severity']) { return new CodeableConcept(this.json['severity']) } }

  /**
  Estimated or actual date or date-time  the condition began, in the opinion of the clinician.
  @returns {Array} an array of {@link Date} objects
  */
  onsetDateTime () { if (this.json['onsetDateTime']) return DT.DateTime.parse(this.json['onsetDateTime']) }
  onsetAge () { return new Quantity(this.json['onsetAge']) }

  /**
  The date or estimated date that the condition resolved or went into remission. This is called "abatement" because of the many overloaded connotations associated with "remission" or "resolution" - Conditions are never really resolved, but they can abate.
  @returns {Array} an array of {@link Date} objects
  */
  abatementDate () { if (this.json['abatementDate']) return DT.DateTime.parse(this.json['abatementDate']) }
  abatementAge () { return new Quantity(this.json['abatementAge']) }
  /**
  The date or estimated date that the condition resolved or went into remission. This is called "abatement" because of the many overloaded connotations associated with "remission" or "resolution" - Conditions are never really resolved, but they can abate.
  @returns {Array} an array of {@link boolean} objects
  */
  abatementBoolean () { return this.json['abatementBoolean'] }

  /**
  Clinical stage or grade of a condition. May include formal severity assessments.
  @returns {ConditionStageComponent}
  */
  stage () { if (this.json['stage']) return new ConditionStageComponent(this.json['stage']) }

  /**
  Supporting Evidence / manifestations that are the basis on which this condition is suspected or confirmed.
  @returns {Array} an array of {@link ConditionEvidenceComponent} objects
  */
  evidence () {
    if (this.json['evidence']) {
      return this.json['evidence'].map(item => new ConditionEvidenceComponent(item))
    }
  }

  /**
  The anatomical location where this condition manifests itself.
  @returns {Array} an array of {@link ConditionLocationComponent} objects
  */
  location () {
    if (this.json['location']) {
      return this.json['location'].map(item => new ConditionLocationComponent(item))
    }
  }

  /**
  Further conditions, problems, diagnoses, procedures or events or the substance that caused/triggered this Condition.
  @returns {Array} an array of {@link ConditionDueToComponent} objects
  */
  dueTo () {
    if (this.json['dueTo']) {
      return this.json['dueTo'].map(item => new ConditionDueToComponent(item))
    }
  }

  /**
  Further conditions, problems, diagnoses, procedures or events or the substance that preceded this Condition.
  @returns {Array} an array of {@link ConditionOccurredFollowingComponent} objects
  */
  occurredFollowing () {
    if (this.json['occurredFollowing']) {
      return this.json['occurredFollowing'].map(item => new ConditionOccurredFollowingComponent(item))
    }
  }

  /**
  Additional information about the Condition. This is a general notes/comments entry  for description of the Condition, its diagnosis and prognosis.
  @returns {Array} an array of {@link String} objects
  */
  notes () { return this.json['notes'] }
}

