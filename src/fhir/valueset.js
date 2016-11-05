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
import { Identifier, DomainResource, BackboneElement, ContactPoint, Coding } from './core'

/**
Embedded class
@class ConceptDefinitionDesignationComponent
@exports  ConceptDefinitionDesignationComponent as ConceptDefinitionDesignationComponent
*/
class ConceptDefinitionDesignationComponent extends BackboneElement {
  /**
  The language this designation is defined for.
  @returns {Array} an array of {@link String} objects
  */
  language () { return this.json['language'] }

  /**
  A code that details how this designation would be used.
  @returns {Coding}
  */
  use () { if (this.json['use']) { return new Coding(this.json['use']) } }

  /**
  The text value for this designation.
  @returns {Array} an array of {@link String} objects
  */
  value () { return this.json['value'] }
}

/**
Embedded class
@class ConceptDefinitionComponent
@exports  ConceptDefinitionComponent as ConceptDefinitionComponent
*/
class ConceptDefinitionComponent extends BackboneElement {
  /**
  Code that identifies concept.
  @returns {Array} an array of {@link String} objects
  */
  code () { return this.json['code'] }

  /**
  If this code is not for use as a real concept.
  @returns {Array} an array of {@link boolean} objects
  */
  abstract () { return this.json['abstract'] }

  /**
  Text to Display to the user.
  @returns {Array} an array of {@link String} objects
  */
  display () { return this.json['display'] }

  /**
  The formal definition of the concept. Formal definitions are not required, because of the prevalence of legacy systems without them, but they are highly recommended, as without them there is no formal meaning associated with the concept.
  @returns {Array} an array of {@link String} objects
  */
  definition () { return this.json['definition'] }

  /**
  Additional representations for the concept - other languages, aliases, specialised purposes, used for particular purposes, etc.
  @returns {Array} an array of {@link ConceptDefinitionDesignationComponent} objects
  */
  designation () {
    if (this.json['designation']) {
      return this.json['designation'].map(item => new ConceptDefinitionDesignationComponent(item))
    }
  }

  /**
  Child Concepts (is-a / contains).
  @returns {Array} an array of {@link ConceptDefinitionComponent} objects
  */
  concept () {
    if (this.json['concept']) {
      return this.json['concept'].map(item => new ConceptDefinitionComponent(item))
    }
  }
}

/**
Embedded class
@class ValueSetDefineComponent
@exports  ValueSetDefineComponent as ValueSetDefineComponent
*/
class ValueSetDefineComponent extends BackboneElement {
  /**
  URI to identify the code system.
  @returns {Array} an array of {@link String} objects
  */
  system () { return this.json['system'] }

  /**
  The version of this code system that defines the codes. Note that the version is optional because a well maintained code system does not suffer from versioning, and therefore the version does not need to be maintained. However many code systems are not well maintained, and the version needs to be defined and tracked.
  @returns {Array} an array of {@link String} objects
  */
  version () { return this.json['version'] }

  /**
  If code comparison is case sensitive when codes within this system are compared to each other.
  @returns {Array} an array of {@link boolean} objects
  */
  caseSensitive () { return this.json['caseSensitive'] }

  /**
  Concepts in the code system.
  @returns {Array} an array of {@link ConceptDefinitionComponent} objects
  */
  concept () {
    if (this.json['concept']) {
      return this.json['concept'].map(item => new ConceptDefinitionComponent(item))
    }
  }
}

/**
Embedded class
@class ConceptReferenceComponent
@exports  ConceptReferenceComponent as ConceptReferenceComponent
*/
class ConceptReferenceComponent extends BackboneElement {
  /**
  Specifies a code for the concept to be included or excluded.
  @returns {Array} an array of {@link String} objects
  */
  code () { return this.json['code'] }

  /**
  The text to display to the user for this concept in the context of this valueset. If no display is provided, then applications using the value set use the display specified for the code by the system.
  @returns {Array} an array of {@link String} objects
  */
  display () { return this.json['display'] }

  /**
  Additional representations for this concept when used in this value set - other languages, aliases, specialised purposes, used for particular purposes, etc.
  @returns {Array} an array of {@link ConceptDefinitionDesignationComponent} objects
  */
  designation () {
    if (this.json['designation']) {
      return this.json['designation'].map(item => new ConceptDefinitionDesignationComponent(item))
    }
  }
}

/**
Embedded class
@class ConceptSetFilterComponent
@exports  ConceptSetFilterComponent as ConceptSetFilterComponent
*/
class ConceptSetFilterComponent extends BackboneElement {
  /**
  A code that identifies a property defined in the code system.
  @returns {Array} an array of {@link String} objects
  */
  property () { return this.json['property'] }

  /**
  The kind of operation to perform as a part of the filter criteria.
  @returns {Array} an array of {@link String} objects
  */
  op () { return this.json['op'] }

  /**
  The match value may be either a code defined by the system, or a string value which is used a regex match on the literal string of the property value.
  @returns {Array} an array of {@link String} objects
  */
  value () { return this.json['value'] }
}

/**
Embedded class
@class ConceptSetComponent
@exports  ConceptSetComponent as ConceptSetComponent
*/
class ConceptSetComponent extends BackboneElement {
  /**
  The code system from which the selected codes come from.
  @returns {Array} an array of {@link String} objects
  */
  system () { return this.json['system'] }

  /**
  The version of the code system that the codes are selected from.
  @returns {Array} an array of {@link String} objects
  */
  version () { return this.json['version'] }

  /**
  Specifies a concept to be included or excluded.
  @returns {Array} an array of {@link ConceptReferenceComponent} objects
  */
  concept () {
    if (this.json['concept']) {
      return this.json['concept'].map(item => new ConceptReferenceComponent(item))
    }
  }

  /**
  Select concepts by specify a matching criteria based on the properties (including relationships) defined by the system. If multiple filters are specified, they SHALL all be true.
  @returns {Array} an array of {@link ConceptSetFilterComponent} objects
  */
  filter () {
    if (this.json['filter']) {
      return this.json['filter'].map(item => new ConceptSetFilterComponent(item))
    }
  }
}

/**
Embedded class
@class ValueSetComposeComponent
@exports  ValueSetComposeComponent as ValueSetComposeComponent
*/
class ValueSetComposeComponent extends BackboneElement {
  /**
  Includes the contents of the referenced value set as a part of the contents of this value set.
  @returns {Array} an array of {@link String} objects
  */
  import () { return this.json['import'] }

  /**
  Include one or more codes from a code system.
  @returns {Array} an array of {@link ConceptSetComponent} objects
  */
  include () {
    if (this.json['include']) {
      return this.json['include'].map(item => new ConceptSetComponent(item))
    }
  }

  /**
  Exclude one or more codes from the value set.
  @returns {Array} an array of {@link ConceptSetComponent} objects
  */
  exclude () {
    if (this.json['exclude']) {
      return this.json['exclude'].map(item => new ConceptSetComponent(item))
    }
  }
}

/**
Embedded class
@class ValueSetExpansionContainsComponent
@exports  ValueSetExpansionContainsComponent as ValueSetExpansionContainsComponent
*/
class ValueSetExpansionContainsComponent extends BackboneElement {
  /**
  The system in which the code for this item in the expansion is defined.
  @returns {Array} an array of {@link String} objects
  */
  system () { return this.json['system'] }

  /**
  If true, this entry is included in the expansion for navigational purposes, and the user cannot select the code directly as a proper value.
  @returns {Array} an array of {@link boolean} objects
  */
  abstract () { return this.json['abstract'] }

  /**
  The version of this code system that defined this code and/or display. This should only be used with code systems that do not enforce concept permanence.
  @returns {Array} an array of {@link String} objects
  */
  version () { return this.json['version'] }

  /**
  Code - if blank, this is not a choosable code.
  @returns {Array} an array of {@link String} objects
  */
  code () { return this.json['code'] }

  /**
  User display for the concept.
  @returns {Array} an array of {@link String} objects
  */
  display () { return this.json['display'] }

  /**
  Codes contained in this concept.
  @returns {Array} an array of {@link ValueSetExpansionContainsComponent} objects
  */
  contains () {
    if (this.json['contains']) {
      return this.json['contains'].map(item => new ValueSetExpansionContainsComponent(item))
    }
  }
}

/**
Embedded class
@class ValueSetExpansionComponent
@exports  ValueSetExpansionComponent as ValueSetExpansionComponent
*/
class ValueSetExpansionComponent extends BackboneElement {
  /**
  An identifier that uniquely identifies this expansion of the valueset. Systems may re-use the same identifier as long as the expansion and the definition remain the same, but are not required to do so.
  @returns {Identifier}
  */
  identifier () { if (this.json['identifier']) { return new Identifier(this.json['identifier']) } }

  /**
  The time at which the expansion was produced by the expanding system.
  @returns {Array} an array of {@link Date} objects
  */
  timestamp () { if (this.json['timestamp']) { return DT.DateTime.parse(this.json['timestamp']) } }

  /**
  The codes that are contained in the value set expansion.
  @returns {Array} an array of {@link ValueSetExpansionContainsComponent} objects
  */
  contains () {
    if (this.json['contains']) {
      return this.json['contains'].map(item => new ValueSetExpansionContainsComponent(item))
    }
  }
}

/**
A value set specifies a set of codes drawn from one or more code systems.
@class ValueSet
@exports ValueSet as ValueSet
*/
export class ValueSet extends DomainResource {
  /**
  The identifier that is used to identify this value set when it is referenced in a specification, model, design or an instance (should be globally unique OID, UUID, or URI).
  @returns {Array} an array of {@link String} objects
  */
  identifier () { return this.json['identifier'] }

  /**
  The identifier that is used to identify this version of the value set when it is referenced in a specification, model, design or instance. This is an arbitrary value managed by the profile author manually and the value should be a timestamp.
  @returns {Array} an array of {@link String} objects
  */
  version () { return this.json['version'] }

  /**
  A free text natural language name describing the value set.
  @returns {Array} an array of {@link String} objects
  */
  name () { return this.json['name'] }

  /**
  This should describe "the semantic space" to be included in the value set. This can also describe the approach taken to build the value set.
  @returns {Array} an array of {@link String} objects
  */
  purpose () { return this.json['purpose'] }

  /**
  If this is set to 'true', then no new versions of the content logical definition can be created.  Note: Other metadata might still change.
  @returns {Array} an array of {@link boolean} objects
  */
  immutable () { return this.json['immutable'] }

  /**
  The name of the individual or organization that published the value set.
  @returns {Array} an array of {@link String} objects
  */
  publisher () { return this.json['publisher'] }

  /**
  Contacts of the publisher to assist a user in finding and communicating with the publisher.
  @returns {Array} an array of {@link ContactPoint} objects
  */
  telecom () {
    if (this.json['telecom']) {
      return this.json['telecom'].map(item => new ContactPoint(item))
    }
  }

  /**
  A free text natural language description of the use of the value set - reason for definition, conditions of use, etc. The description may include a list of expected usages for the value set.
  @returns {Array} an array of {@link String} objects
  */
  description () { return this.json['description'] }

  /**
  A copyright statement relating to the value set and/or its contents. These are generally legal restrictions on the use and publishing of the value set.
  @returns {Array} an array of {@link String} objects
  */
  copyright () { return this.json['copyright'] }

  /**
  The status of the value set.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  This valueset was authored for testing purposes (or education/evaluation/marketing), and is not intended to be used for genuine usage.
  @returns {Array} an array of {@link boolean} objects
  */
  experimental () { return this.json['experimental'] }

  /**
  Whether this is intended to be used with an extensible binding or not.
  @returns {Array} an array of {@link boolean} objects
  */
  extensible () { return this.json['extensible'] }

  /**
  The date that the value set status was last changed.
  @returns {Array} an array of {@link Date} objects
  */
  date () { if (this.json['date']) { return DT.DateTime.parse(this.json['date']) } }

  /**
  If a Stability Date is expanded by evaluating the Content Logical Definition using the current version of all referenced code system(s) and value sets as of the Stability Date.
  @returns {Array} an array of {@link Date} objects
  */
  stableDate () { if (this.json['stableDate']) { return DT.DateTime.parse(this.json['stableDate']) } }

  /**
  When value set defines its own codes.
  @returns {ValueSetDefineComponent}
  */
  define () { if (this.json['define']) { return new ValueSetDefineComponent(this.json['define']) } }

  /**
  When value set includes codes from elsewhere.
  @returns {ValueSetComposeComponent}
  */
  compose () { if (this.json['compose']) { return new ValueSetComposeComponent(this.json['compose']) } }

  /**
  A value set can also be "expanded", where the value set is turned into a simple collection of enumerated codes. This element holds the expansion, if it has been performed.
  @returns {ValueSetExpansionComponent}
  */
  expansion () { if (this.json['expansion']) { return new ValueSetExpansionComponent(this.json['expansion']) } }
}
