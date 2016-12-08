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
import { Identifier, DomainResource, BackboneElement, ContactPoint, ElementDefinition, Coding } from './core'

/**
Embedded class
@class ExtensionDefinitionMappingComponent
@exports  ExtensionDefinitionMappingComponent as ExtensionDefinitionMappingComponent
*/
class ExtensionDefinitionMappingComponent extends BackboneElement {
  /**
  An Internal id that is used to identify this mapping set when specific mappings are made.
  @returns {Array} an array of {@link String} objects
  */
  identity () { return this.json['identity'] }

  /**
  A URI that identifies the specification that this mapping is expressed to.
  @returns {Array} an array of {@link String} objects
  */
  uri () { return this.json['uri'] }

  /**
  A name for the specification that is being mapped to.
  @returns {Array} an array of {@link String} objects
  */
  name () { return this.json['name'] }

  /**
  Comments about this mapping, including version notes, issues, scope limitations, and other important notes for usage.
  @returns {Array} an array of {@link String} objects
  */
  comments () { return this.json['comments'] }
}

/**
Defines an extension that can be used in resources.
@class ExtensionDefinition
@exports ExtensionDefinition as ExtensionDefinition
*/
export class ExtensionDefinition extends DomainResource {
  /**
  The URL at which this definition is (or will be) published, and which is used to reference this profile in extension urls in operational FHIR systems.
  @returns {Array} an array of {@link String} objects
  */
  url () { return this.json['url'] }

  /**
  Formal identifier that is used to identify this profile when it is represented in other formats (e.g. ISO 11179(, or referenced in a specification, model, design or an instance  (should be globally unique OID, UUID, or URI), (if it's not possible to use the literal URI).
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  A free text natural language name identifying the extension.
  @returns {Array} an array of {@link String} objects
  */
  name () { return this.json['name'] }

  /**
  Defined so that applications can use this name when displaying the value of the extension to the user.
  @returns {Array} an array of {@link String} objects
  */
  display () { return this.json['display'] }

  /**
  Details of the individual or organization who accepts responsibility for publishing the extension definition.
  @returns {Array} an array of {@link String} objects
  */
  publisher () { return this.json['publisher'] }

  /**
  Contact details to assist a user in finding and communicating with the publisher.
  @returns {Array} an array of {@link ContactPoint} objects
  */
  telecom () {
    if (this.json['telecom']) {
      return this.json['telecom'].map(item => new ContactPoint(item))
    }
  }

  /**
  A free text natural language description of the extension and its use.
  @returns {Array} an array of {@link String} objects
  */
  description () { return this.json['description'] }

  /**
  A set of terms from external terminologies that may be used to assist with indexing and searching of extension definitions.
  @returns {Array} an array of {@link Coding} objects
  */
  code () {
    if (this.json['code']) {
      return this.json['code'].map(item => new Coding(item))
    }
  }

  /**
  The status of the extension.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  This extension definition was authored for testing purposes (or education/evaluation/marketing), and is not intended to be used for genuine usage.
  @returns {Array} an array of {@link boolean} objects
  */
  experimental () { return this.json['experimental'] }

  /**
  The date that this version of the extension was published.
  @returns {Array} an array of {@link Date} objects
  */
  date () { if (this.json['date']) { return DT.DateTime.parse(this.json['date']) } }

  /**
  The Scope and Usage that this extension was created to meet.
  @returns {Array} an array of {@link String} objects
  */
  requirements () { return this.json['requirements'] }

  /**
  An external specification that the content is mapped to.
  @returns {Array} an array of {@link ExtensionDefinitionMappingComponent} objects
  */
  mapping () {
    if (this.json['mapping']) {
      return this.json['mapping'].map(item => new ExtensionDefinitionMappingComponent(item))
    }
  }

  /**
  Identifies the type of context to which the extension applies.
  @returns {Array} an array of {@link String} objects
  */
  contextType () { return this.json['contextType'] }

  /**
  Identifies the types of resource or data type elements to which the extension can be applied.
  @returns {Array} an array of {@link String} objects
  */
  context () { return this.json['context'] }

  /**
  Definition of the elements that are defined to be in the extension.
  @returns {Array} an array of {@link ElementDefinition} objects
  */
  element () {
    if (this.json['element']) {
      return this.json['element'].map(item => new ElementDefinition(item))
    }
  }
}

