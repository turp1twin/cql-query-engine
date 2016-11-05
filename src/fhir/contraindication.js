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
import { Identifier, CodeableConcept, Reference, BackboneElement, DomainResource } from './core'

/**
Embedded class
@class ContraindicationMitigationComponent
@exports  ContraindicationMitigationComponent as ContraindicationMitigationComponent
*/
class ContraindicationMitigationComponent extends BackboneElement {
  /**
  Describes the action that was taken or the observation that was made that reduces/eliminates the risk associated with the identified contraindication.
  @returns {CodeableConcept}
  */
  action () { if (this.json['action']) return new CodeableConcept(this.json['action']) }

  /**
  Indicates when the mitigating action was documented.
  @returns {Array} an array of {@link Date} objects
  */
  date () { if (this.json['date']) return DT.DateTime.parse(this.json['date']) }

  /**
  Identifies the practitioner who determined the mitigation and takes responsibility for the mitigation step occurring.
  @returns {Reference}
  */
  author () { if (this.json['author']) return new Reference(this.json['author']) }
}

/**
Indicates an actual or potential clinical issue with or between one or more active or proposed clinical actions for a patient.  E.g. Drug-drug interaction, Ineffective treatment frequency, Procedure-condition conflict, etc.
@class Contraindication
@exports Contraindication as Contraindication
*/
export class Contraindication extends DomainResource {
  /**
  Indicates the patient whose record the contraindication is associated with.
  @returns {Reference}
  */
  patient () { if (this.json['patient']) return new Reference(this.json['patient']) }

  /**
  Identifies the general type of issue identified.
  @returns {CodeableConcept}
  */
  category () { if (this.json['category']) return new CodeableConcept(this.json['category']) }

  /**
  Indicates the degree of importance associated with the identified issue based on the potential impact on the patient.
  @returns {Array} an array of {@link String} objects
  */
  severity () { return this.json['severity'] }

  /**
  Indicates the resource representing the current activity or proposed activity that.
  @returns {Array} an array of {@link Reference} objects
  */
  implicated () {
    if (this.json['implicated']) {
      return this.json['implicated'].map(item => new Reference(item))
    }
  }

  /**
  A textual explanation of the contraindication.
  @returns {Array} an array of {@link String} objects
  */
  detail () { return this.json['detail'] }

  /**
  The date or date-time when the contraindication was initially identified.
  @returns {Array} an array of {@link Date} objects
  */
  date () { if (this.json['date']) return DT.DateTime.parse(this.json['date']) }

  /**
  Identifies the provider or software that identified the.
  @returns {Reference}
  */
  author () { if (this.json['author']) return new Reference(this.json['author']) }

  /**
  Business identifier associated with the contraindication record.
  @returns {Identifier}
  */
  identifier () { if (this.json['identifier']) return new Identifier(this.json['identifier']) }

  /**
  The literature, knowledge-base or similar reference that describes the propensity for the contraindication identified.
  @returns {Array} an array of {@link String} objects
  */
  reference () { return this.json['reference'] }

  /**
  Indicates an action that has been taken or is committed to to reduce or eliminate the likelihood of the risk identified by the contraindicaiton from manifesting.  Can also reflect an observation of known mitigating factors that may reduce/eliminate the need for any action.
  @returns {Array} an array of {@link ContraindicationMitigationComponent} objects
  */
  mitigation () {
    if (this.json['mitigation']) {
      return this.json['mitigation'].map(item => new ContraindicationMitigationComponent(item))
    }
  }
}

