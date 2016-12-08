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
import { BackboneElement, DomainResource, Reference, ContactPoint, Coding } from './core'

/**
Embedded class
@class OperationDefinitionParameterComponent
@exports  OperationDefinitionParameterComponent as OperationDefinitionParameterComponent
*/
class OperationDefinitionParameterComponent extends BackboneElement {
  /**
  The name of used to identify the parameter.
  @returns {Array} an array of {@link String} objects
  */
  name () { return this.json['name'] }

  /**
  Whether this is an input or an output parameter.
  @returns {Array} an array of {@link String} objects
  */
  use () { return this.json['use'] }

  /**
  The minimum number of times this parameter SHALL appear in the request or response.
  @returns {Array} an array of {@link Number} objects
  */
  min () { return this.json['min'] }

  /**
  The maximum number of times this element is permitted to appear in the request or response.
  @returns {Array} an array of {@link String} objects
  */
  max () { return this.json['max'] }

  /**
  Describes the meaning or use of this parameter.
  @returns {Array} an array of {@link String} objects
  */
  documentation () { return this.json['documentation'] }

  /**
  The type for this parameter.
  @returns {Coding}
  */
  type () { if (this.json['type']) { return new Coding(this.json['type']) } }

  /**
  A profile the specifies the rules that this parameter must conform to.
  @returns {Reference}
  */
  profile () { if (this.json['profile']) { return new Reference(this.json['profile']) } }
}

/**
A formal computable definition of an operation (on the RESTful interface) or a named query (using the search interaction).
@class OperationDefinition
@exports OperationDefinition as OperationDefinition
*/
export class OperationDefinition extends DomainResource {
  /**
  The identifier that is used to identify this operation definition when it is referenced in a specification, model, design or an instance (should be globally unique OID, UUID, or URI).
  @returns {Array} an array of {@link String} objects
  */
  identifier () { return this.json['identifier'] }

  /**
  The identifier that is used to identify this version of the profile when it is referenced in a specification, model, design or instance. This is an arbitrary value managed by the profile author manually and the value should be a timestamp.
  @returns {Array} an array of {@link String} objects
  */
  version () { return this.json['version'] }

  /**
  A free text natural language name identifying the Profile.
  @returns {Array} an array of {@link String} objects
  */
  title () { return this.json['title'] }

  /**
  Details of the individual or organization who accepts responsibility for publishing the profile.
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
  A free text natural language description of the profile and its use.
  @returns {Array} an array of {@link String} objects
  */
  description () { return this.json['description'] }

  /**
  A set of terms from external terminologies that may be used to assist with indexing and searching of templates.
  @returns {Array} an array of {@link Coding} objects
  */
  code () {
    if (this.json['code']) {
      return this.json['code'].map(item => new Coding(item))
    }
  }

  /**
  The status of the profile.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  This profile was authored for testing purposes (or education/evaluation/marketing), and is not intended to be used for genuine usage.
  @returns {Array} an array of {@link boolean} objects
  */
  experimental () { return this.json['experimental'] }

  /**
  The date that this version of the profile was published.
  @returns {Array} an array of {@link Date} objects
  */
  date () { if (this.json['date']) { return DT.DateTime.parse(this.json['date']) } }

  /**
  Whether this is operation or named query.
  @returns {Array} an array of {@link String} objects
  */
  kind () { return this.json['kind'] }

  /**
  The name used to invoke the operation.
  @returns {Array} an array of {@link String} objects
  */
  name () { return this.json['name'] }

  /**
  Additional information about how to use this operation or named query.
  @returns {Array} an array of {@link String} objects
  */
  notes () { return this.json['notes'] }

  /**
  Indicates that this operation definition is a constraining profile on the base.
  @returns {Reference}
  */
  base () { if (this.json['base']) { return new Reference(this.json['base']) } }

  /**
  Indicates whether this operation or named query can be invoked at the system level (e.g. without needing to choose a resource type for the context).
  @returns {Array} an array of {@link boolean} objects
  */
  system () { return this.json['system'] }

  /**
  Indicates whether this operation or named query can be invoked at the resource type level for any given resource type level (e.g. without needing to choose a resource type for the context).
  @returns {Array} an array of {@link String} objects
  */
  type () { return this.json['type'] }

  /**
  Indicates whether this operation can be invoked on a particular instance of one of the given types.
  @returns {Array} an array of {@link boolean} objects
  */
  instance () { return this.json['instance'] }

  /**
  Parameters for the operation/query.
  @returns {Array} an array of {@link OperationDefinitionParameterComponent} objects
  */
  parameter () {
    if (this.json['parameter']) {
      return this.json['parameter'].map(item => new OperationDefinitionParameterComponent(item))
    }
  }
}
