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
@class ProcedurePerformerComponent
@exports  ProcedurePerformerComponent as ProcedurePerformerComponent
*/
class ProcedurePerformerComponent extends BackboneElement {
  /**
   The practitioner who was involved in the procedure.
   @returns {Reference}
   */
  person () {
    if (this.json['person']) {
      return new Reference(this.json['person'])
    }
  }

  /**
   E.g. surgeon, anaethetist, endoscopist.
   @returns {CodeableConcept}
   */
  role () {
    if (this.json['role']) {
      return new CodeableConcept(this.json['role'])
    }
  }
}

/**
Embedded class
@class ProcedureRelatedItemComponent
@exports  ProcedureRelatedItemComponent as ProcedureRelatedItemComponent
*/
class ProcedureRelatedItemComponent extends BackboneElement {
  /**
  The nature of the relationship.
  @returns {Array} an array of {@link String} objects
  */
  type () { return this.json['type'] }

  /**
  The related item - e.g. a procedure.
  @returns {Reference}
  */
  target () { if (this.json['target']) { return new Reference(this.json['target']) } }
}

/**
An action that is performed on a patient. This can be a physical 'thing' like an operation, or less invasive like counseling or hypnotherapy.
@class Procedure
@exports Procedure as Procedure
*/
export class Procedure extends DomainResource {
  /**
  This records identifiers associated with this procedure that are defined by business processed and/ or used to refer to it when a direct URL reference to the resource itself is not appropriate (e.g. in CDA documents, or in written / printed documentation).
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  The person on whom the procedure was performed.
  @returns {Reference}
  */
  patient () { if (this.json['patient']) { return new Reference(this.json['patient']) } }

  /**
  The specific procedure that is performed. Use text if the exact nature of the procedure can't be coded.
  @returns {CodeableConcept}
  */
  type () { if (this.json['type']) { return new CodeableConcept(this.json['type']) } }

  /**
  Detailed and structured anatomical location information. Multiple locations are allowed - e.g. multiple punch biopsies of a lesion.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  bodySite () {
    if (this.json['bodySite']) {
      return this.json['bodySite'].map(item => new CodeableConcept(item))
    }
  }

  /**
  The reason why the procedure was performed. This may be due to a Condition, may be coded entity of some type, or may simply be present as text.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  indication () {
    if (this.json['indication']) {
      return this.json['indication'].map(item => new CodeableConcept(item))
    }
  }

  /**
  Limited to 'real' people rather than equipment.
  @returns {Array} an array of {@link ProcedurePerformerComponent} objects
  */
  performer () {
    if (this.json['performer']) {
      return this.json['performer'].map(item => new ProcedurePerformerComponent(item))
    }
  }

  /**
  The dates over which the procedure was performed. Allows a period to support complex procedures that span more than one date, and also allows for the length of the procedure to be captured.
  @returns {Period}
  */
  date () { if (this.json['date']) { return new Period(this.json['date']) } }

  /**
  The encounter during which the procedure was performed.
  @returns {Reference}
  */
  encounter () { if (this.json['encounter']) { return new Reference(this.json['encounter']) } }

  /**
  What was the outcome of the procedure - did it resolve reasons why the procedure was performed?.
  @returns {Array} an array of {@link String} objects
  */
  outcome () { return this.json['outcome'] }

  /**
  This could be a histology result. There could potentially be multiple reports - e.g. if this was a procedure that made multiple biopsies.
  @returns {Array} an array of {@link Reference} objects
  */
  report () {
    if (this.json['report']) {
      return this.json['report'].map(item => new Reference(item))
    }
  }

  /**
  Any complications that occurred during the procedure, or in the immediate post-operative period. These are generally tracked separately from the notes, which typically will describe the procedure itself rather than any 'post procedure' issues.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  complication () {
    if (this.json['complication']) {
      return this.json['complication'].map(item => new CodeableConcept(item))
    }
  }

  /**
  If the procedure required specific follow up - e.g. removal of sutures. The followup may be represented as a simple note, or potentially could be more complex in which case the CarePlan resource can be used.
  @returns {Array} an array of {@link String} objects
  */
  followUp () { return this.json['followUp'] }

  /**
  Procedures may be related to other items such as procedures or medications. For example treating wound dehiscence following a previous procedure.
  @returns {Array} an array of {@link ProcedureRelatedItemComponent} objects
  */
  relatedItem () {
    if (this.json['relatedItem']) {
      return this.json['relatedItem'].map(item => new ProcedureRelatedItemComponent(item))
    }
  }

  /**
  Any other notes about the procedure - e.g. the operative notes.
  @returns {Array} an array of {@link String} objects
  */
  notes () { return this.json['notes'] }
}
