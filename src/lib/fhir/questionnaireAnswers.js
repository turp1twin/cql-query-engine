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
import { Identifier, DomainResource, Reference, BackboneElement, Quantity, Attachment, Coding } from './core'

/**
Embedded class
@class QuestionAnswerComponent
@exports  QuestionAnswerComponent as QuestionAnswerComponent
*/
class QuestionAnswerComponent extends BackboneElement {
  /**
  Single-valued answer to the question.
  @returns {Array} an array of {@link boolean} objects
  */
  valueBoolean () { return this.json['valueBoolean'] }
  /**
  Single-valued answer to the question.
  @returns {Array} an array of {@link Number} objects
  */
  valueDecimal () { return this.json['valueDecimal'] }
  /**
  Single-valued answer to the question.
  @returns {Array} an array of {@link Number} objects
  */
  valueInteger () { return this.json['valueInteger'] }
  /**
  Single-valued answer to the question.
  @returns {Array} an array of {@link Date} objects
  */
  valueDate () { if (this.json['valueDate']) { return DT.DateTime.parse(this.json['valueDate']) } }
  /**
  Single-valued answer to the question.
  @returns {Array} an array of {@link Date} objects
  */
  valueDateTime () { if (this.json['valueDateTime']) { return DT.DateTime.parse(this.json['valueDateTime']) } }
  /**
  Single-valued answer to the question.
  @returns {Array} an array of {@link Date} objects
  */
  valueInstant () { if (this.json['valueInstant']) { return DT.DateTime.parse(this.json['valueInstant']) } }
  /**
  Single-valued answer to the question.
  @returns {time}
  */
  valueTime () { if (this.json['valueTime']) { return new time(this.json['valueTime']) } }
  /**
  Single-valued answer to the question.
  @returns {Array} an array of {@link String} objects
  */
  valueString () { return this.json['valueString'] }
  /**
  Single-valued answer to the question.
  @returns {Attachment}
  */
  valueAttachment () { if (this.json['valueAttachment']) { return new Attachment(this.json['valueAttachment']) } }
  /**
  Single-valued answer to the question.
  @returns {Coding}
  */
  valueCoding () { if (this.json['valueCoding']) { return new Coding(this.json['valueCoding']) } }
  /**
  Single-valued answer to the question.
  @returns {Quantity}
  */
  valueQuantity () { if (this.json['valueQuantity']) { return new Quantity(this.json['valueQuantity']) } }
  /**
  Single-valued answer to the question.
  @returns {Reference}
  */
  valueReference () { if (this.json['valueReference']) { return new Reference(this.json['valueReference']) } }
}

/**
Embedded class
@class QuestionComponent
@exports  QuestionComponent as QuestionComponent
*/
class QuestionComponent extends BackboneElement {
  /**
  Identifies the question from the Questionnaire that corresponds to this question in the QuestionnaireAnswers resource.
  @returns {Array} an array of {@link String} objects
  */
  linkId () { return this.json['linkId'] }

  /**
  Text of the question as it is shown to the user.
  @returns {Array} an array of {@link String} objects
  */
  text () { return this.json['text'] }

  /**
  The respondent's answer(s) to the question.
  @returns {Array} an array of {@link QuestionAnswerComponent} objects
  */
  answer () {
    if (this.json['answer']) {
      return this.json['answer'].map(item => new QuestionAnswerComponent(item))
    }
  }

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
  Identifies the group from the Questionnaire that corresponds to this group in the QuestionnaireAnswers resource.
  @returns {Array} an array of {@link String} objects
  */
  linkId () { return this.json['linkId'] }

  /**
  Text that is displayed above the contents of the group.
  @returns {Array} an array of {@link String} objects
  */
  title () { return this.json['title'] }

  /**
  Additional text for the group, used for display purposes.
  @returns {Array} an array of {@link String} objects
  */
  text () { return this.json['text'] }

  /**
  More specific subject this section's answers are about, details the subject given in QuestionnaireAnswers.
  @returns {Reference}
  */
  subject () { if (this.json['subject']) { return new Reference(this.json['subject']) } }

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
A structured set of questions and their answers. The questions are ordered and grouped into coherent subsets, corresponding to the structure of the grouping of the underlying questions.
@class QuestionnaireAnswers
@exports QuestionnaireAnswers as QuestionnaireAnswers
*/
export class QuestionnaireAnswers extends DomainResource {
  /**
  A business identifier assigned to a particular completed (or partially completed) questionnaire.
  @returns {Identifier}
  */
  identifier () { if (this.json['identifier']) { return new Identifier(this.json['identifier']) } }

  /**
  Indicates the Questionnaire resource that defines the form for which answers are being provided.
  @returns {Reference}
  */
  questionnaire () { if (this.json['questionnaire']) { return new Reference(this.json['questionnaire']) } }

  /**
  The lifecycle status of the questionnaire answers as a whole.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  The subject of the questionnaire answers.  This could be a patient, organization, practitioner, device, etc.  This is who/what the answers apply to, but is not necessarily the source of information.
  @returns {Reference}
  */
  subject () { if (this.json['subject']) { return new Reference(this.json['subject']) } }

  /**
  Person who received the answers to the questions in the QuestionnaireAnswers and recorded them in the system.
  @returns {Reference}
  */
  author () { if (this.json['author']) { return new Reference(this.json['author']) } }

  /**
  The date and/or time that this version of the questionnaire answers was authored.
  @returns {Array} an array of {@link Date} objects
  */
  authored () { if (this.json['authored']) { return DT.DateTime.parse(this.json['authored']) } }

  /**
  The person who answered the questions about the subject. Only used when this is not the subject him/herself.
  @returns {Reference}
  */
  source () { if (this.json['source']) { return new Reference(this.json['source']) } }

  /**
  Encounter during which this set of questionnaire answers were collected. When there were multiple encounters, this is the one considered most relevant to the context of the answers.
  @returns {Reference}
  */
  encounter () { if (this.json['encounter']) { return new Reference(this.json['encounter']) } }

  /**
  A group of questions to a possibly similarly grouped set of questions in the questionnaire answers.
  @returns {GroupComponent}
  */
  group () { if (this.json['group']) { return new GroupComponent(this.json['group']) } }
}
