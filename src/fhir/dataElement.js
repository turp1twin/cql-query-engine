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
import { Identifier, DomainResource, Reference, ContactPoint, BackboneElement, CodeableConcept, Coding } from './core'

/**
Embedded class
@class DataElementBindingComponent
@exports  DataElementBindingComponent as DataElementBindingComponent
*/
class DataElementBindingComponent extends BackboneElement {
  /**
  If true, then conformant systems may use additional codes or (where the data type permits) text alone to convey concepts not covered by the set of codes identified in the binding.  If false, then conformant systems are constrained to the provided codes alone.
  @returns {Array} an array of {@link boolean} objects
  */
  isExtensible () { return this.json['isExtensible'] }

  /**
  Indicates the degree of conformance expectations associated with this binding.
  @returns {Array} an array of {@link String} objects
  */
  conformance () { return this.json['conformance'] }

  /**
  Describes the intended use of this particular set of codes.
  @returns {Array} an array of {@link String} objects
  */
  description () { return this.json['description'] }

  /**
  Points to the value set that identifies the set of codes to be used.
  @returns {Reference}
  */
  valueSet () { if (this.json['valueSet']) return new Reference(this.json['valueSet']) }
}

/**
Embedded class
@class DataElementMappingComponent
@exports  DataElementMappingComponent as DataElementMappingComponent
*/
class DataElementMappingComponent extends BackboneElement {
  /**
  A URI that identifies the specification that this mapping is expressed to.
  @returns {Array} an array of {@link String} objects
  */
  uri () { return this.json['uri'] }

  /**
  If true, indicates that the official meaning of the data element is exactly equivalent to the mapped element.
  @returns {Array} an array of {@link boolean} objects
  */
  definitional () { return this.json['definitional'] }

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

  /**
  Expresses what part of the target specification corresponds to this element.
  @returns {Array} an array of {@link String} objects
  */
  map () { return this.json['map'] }
}

/**
The formal description of a single piece of information that can be gathered and reported.
@class DataElement
@exports DataElement as DataElement
*/
export class DataElement extends DomainResource {
  /**
  The identifier that is used to identify this data element when it is referenced in a Profile, Questionnaire or an instance.
  @returns {Identifier}
  */
  identifier () { if (this.json['identifier']) return new Identifier(this.json['identifier']) }

  /**
  The identifier that is used to identify this version of the data element when it is referenced in a Profile, Questionnaire or instance. This is an arbitrary value managed by the definition author manually.
  @returns {Array} an array of {@link String} objects
  */
  version () { return this.json['version'] }

  /**
  Details of the individual or organization who accepts responsibility for publishing the data element.
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
  The status of the data element.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  The date that this version of the data element was published.
  @returns {Array} an array of {@link Date} objects
  */
  date () { if (this.json['date']) return DT.DateTime.parse(this.json['date']) }

  /**
  The term used by humans to refer to the data element.  Should ideally be unique within the context in which the data element is expected to be used.
  @returns {Array} an array of {@link String} objects
  */
  name () { return this.json['name'] }

  /**
  A set of terms from external terminologies that may be used to assist with indexing and searching of data element definitions.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  category () {
    if (this.json['category']) {
      return this.json['category'].map(item => new CodeableConcept(item))
    }
  }

  /**
  A code that provides the meaning for a data element according to a particular terminology.
  @returns {Array} an array of {@link Coding} objects
  */
  code () {
    if (this.json['code']) {
      return this.json['code'].map(item => new Coding(item))
    }
  }

  /**
  The default/suggested phrasing to use when prompting a human to capture the data element.
  @returns {Array} an array of {@link String} objects
  */
  question () { return this.json['question'] }

  /**
  Provides a complete explanation of the meaning of the data element for human readability.
  @returns {Array} an array of {@link String} objects
  */
  definition () { return this.json['definition'] }

  /**
  Comments about the use of the element, including notes about how to use the data properly, exceptions to proper use, etc.
  @returns {Array} an array of {@link String} objects
  */
  comments () { return this.json['comments'] }

  /**
  Explains why this element is needed and why it's been constrained as it has.
  @returns {Array} an array of {@link String} objects
  */
  requirements () { return this.json['requirements'] }

  /**
  Identifies additional names by which this element might also be known.
  @returns {Array} an array of {@link String} objects
  */
  synonym () { return this.json['synonym'] }

  /**
  The FHIR data type that is the type for this element.
  @returns {Array} an array of {@link String} objects
  */
  type () { return this.json['type'] }

  /**
  An sample value for this element demonstrating the type of information that would typically be captured.
  @returns {Array} an array of {@link } objects
  */
  example () { return this.json['example'] }

  /**
  Indicates the shortest length that SHALL be supported by conformant instances without truncation.
  @returns {Array} an array of {@link Number} objects
  */
  maxLength () { return this.json['maxLength'] }

  /**
  Identifies the units of measure in which the data element should be captured or expressed.
  @returns {CodeableConcept}
  */
  units () { if (this.json['units']) return new CodeableConcept(this.json['units']) }

  /**
  Binds to a value set if this element is coded (code, Coding, CodeableConcept).
  @returns {DataElementBindingComponent}
  */
  binding () { if (this.json['binding']) return new DataElementBindingComponent(this.json['binding']) }

  /**
  Identifies a concept from an external specification that roughly corresponds to this element.
  @returns {Array} an array of {@link DataElementMappingComponent} objects
  */
  mapping () {
    if (this.json['mapping']) {
      return this.json['mapping'].map(item => new DataElementMappingComponent(item))
    }
  }
}

