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
@class QuestionComponent
@exports  QuestionComponent as QuestionComponent
*/
class QuestionComponent extends BackboneElement {
  /**
  An identifier that is unique within the questionnaire allowing linkage to the equivalent group in a [[[QuestionnaireAnswers]]] resource.
  @returns {Array} an array of {@link String} objects
  */
  linkId () { return this.json['linkId'] }

  /**
  Identifies a how this question is known in a particular terminology such as LOINC.
  @returns {Array} an array of {@link Coding} objects
  */
  concept () {
    if (this.json['concept']) {
      return this.json['concept'].map(item => new Coding(item))
    }
  }

  /**
  Text of the question as it is shown to the user.
  @returns {Array} an array of {@link String} objects
  */
  text () { return this.json['text'] }

  /**
  The expected format of the answer, e.g. the type of input (string, integer) or whether a (multiple) choice is expected.
  @returns {Array} an array of {@link String} objects
  */
  type () { return this.json['type'] }

  /**
  If true, indicates that the group must be present and have required questions within it answered.  If false, the group may be skipped when answering the questionnaire.
  @returns {Array} an array of {@link boolean} objects
  */
  required () { return this.json['required'] }

  /**
  Whether the group may occur multiple times in the instance, containing multiple sets of answers.
  @returns {Array} an array of {@link boolean} objects
  */
  repeats () { return this.json['repeats'] }

  /**
  Reference to a valueset containing the possible options.
  @returns {Reference}
  */
  options () { if (this.json['options']) { return new Reference(this.json['options']) } }

  /**
  Nested group, containing nested question for this question. The order of groups within the question is relevant.
  @returns {Array} an array of {@link GroupComponent} objects
  */
  group () {
    if (this.json['group']) {
      return this.json['group'].map(item => new GroupComponent(item))
    }
  }
}

/**
Embedded class
@class GroupComponent
@exports  GroupComponent as GroupComponent
*/
class GroupComponent extends BackboneElement {
  /**
  A identifier that is unique within the questionnaire allowing linkage to the equivalent group in a QuestionnaireAnswers resource.
  @returns {Array} an array of {@link String} objects
  */
  linkId () { return this.json['linkId'] }

  /**
  The human-readable name for this section of the questionnaire.
  @returns {Array} an array of {@link String} objects
  */
  title () { return this.json['title'] }

  /**
  Identifies a how this group of questions is known in a particular terminology such as LOINC.
  @returns {Array} an array of {@link Coding} objects
  */
  concept () {
    if (this.json['concept']) {
      return this.json['concept'].map(item => new Coding(item))
    }
  }

  /**
  Additional text for the group, used for display purposes.
  @returns {Array} an array of {@link String} objects
  */
  text () { return this.json['text'] }

  /**
  If true, indicates that the group must be present and have required questions within it answered.  If false, the group may be skipped when answering the questionnaire.
  @returns {Array} an array of {@link boolean} objects
  */
  required () { return this.json['required'] }

  /**
  Whether the group may occur multiple times in the instance, containing multiple sets of answers.
  @returns {Array} an array of {@link boolean} objects
  */
  repeats () { return this.json['repeats'] }

  /**
  A sub-group within a group. The ordering of groups within this group is relevant.
  @returns {Array} an array of {@link GroupComponent} objects
  */
  group () {
    if (this.json['group']) {
      return this.json['group'].map(item => new GroupComponent(item))
    }
  }

  /**
  Set of questions within this group. The order of questions within the group is relevant.
  @returns {Array} an array of {@link QuestionComponent} objects
  */
  question () {
    if (this.json['question']) {
      return this.json['question'].map(item => new QuestionComponent(item))
    }
  }
}

/**
A structured set of questions intended to guide the collection of answers. The questions are ordered and grouped into coherent subsets, corresponding to the structure of the grouping of the underlying questions.
@class Questionnaire
@exports Questionnaire as Questionnaire
*/
export class Questionnaire extends DomainResource {
  /**
  This records identifiers associated with this question set that are defined by business processed and/ or used to refer to it when a direct URL reference to the resource itself is not appropriate (e.g. in CDA documents, or in written / printed documentation).
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  The version number assigned by the publisher for business reasons.  It may remain the same when the resource is updated.
  @returns {Array} an array of {@link String} objects
  */
  version () { return this.json['version'] }

  /**
  The lifecycle status of the questionnaire as a whole.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  The date that this questionnaire was last changed.
  @returns {Array} an array of {@link Date} objects
  */
  date () { if (this.json['date']) { return DT.DateTime.parse(this.json['date']) } }

  /**
  Organization responsible for developing and maintaining the questionnaire.
  @returns {Array} an array of {@link String} objects
  */
  publisher () { return this.json['publisher'] }

  /**
  A collection of related questions (or further groupings of questions).
  @returns {GroupComponent}
  */
  group () { if (this.json['group']) { return new GroupComponent(this.json['group']) } }
}
