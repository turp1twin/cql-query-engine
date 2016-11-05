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
import { Identifier, DomainResource, Reference, BackboneElement, CodeableConcept, Quantity } from './core'

/**
Embedded class
@class GroupCharacteristicComponent
@exports  GroupCharacteristicComponent as GroupCharacteristicComponent
*/
class GroupCharacteristicComponent extends BackboneElement {
  /**
  A code that identifies the kind of trait being asserted.
  @returns {CodeableConcept}
  */
  code () { if (this.json['code']) { return new CodeableConcept(this.json['code']) } }

  /**
  The value of the trait that holds (or does not hold - see 'exclude') for members of the group.
  @returns {CodeableConcept}
  */
  valueCodeableConcept () { if (this.json['valueCodeableConcept']) { return new CodeableConcept(this.json['valueCodeableConcept']) } }

  /**
  The value of the trait that holds (or does not hold - see 'exclude') for members of the group.
  @returns {Array} an array of {@link boolean} objects
  */
  valueBoolean () { return this.json['valueBoolean'] }

  /**
  The value of the trait that holds (or does not hold - see 'exclude') for members of the group.
  @returns {Quantity}
  */
  valueQuantity () { if (this.json['valueQuantity']) { return new Quantity(this.json['valueQuantity']) } }

  /**
  The value of the trait that holds (or does not hold - see 'exclude') for members of the group.
  @returns {Range}
  */
  valueRange () { if (this.json['valueRange']) { return new Range(this.json['valueRange']) } }

  /**
  If true, indicates the characteristic is one that is NOT held by members of the group.
  @returns {Array} an array of {@link boolean} objects
  */
  exclude () { return this.json['exclude'] }
}

/**
Represents a defined collection of entities that may be discussed or acted upon collectively but which are not expected to act collectively and are not formally or legally recognized.  I.e. A collection of entities that isn't an Organization.
@class Group
@exports Group as Group
*/
export class Group extends DomainResource {
  /**
  A unique business identifier for this group.
  @returns {Identifier}
  */
  identifier () { if (this.json['identifier']) { return new Identifier(this.json['identifier']) } }

  /**
  Identifies the broad classification of the kind of resources the group includes.
  @returns {Array} an array of {@link String} objects
  */
  type () { return this.json['type'] }

  /**
  If true, indicates that the resource refers to a specific group of real individuals.  If false, the group defines a set of intended individuals.
  @returns {Array} an array of {@link boolean} objects
  */
  actual () { return this.json['actual'] }

  /**
  Provides a specific type of resource the group includes.  E.g. "cow", "syringe", etc.
  @returns {CodeableConcept}
  */
  code () { if (this.json['code']) { return new CodeableConcept(this.json['code']) } }

  /**
  A label assigned to the group for human identification and communication.
  @returns {Array} an array of {@link String} objects
  */
  name () { return this.json['name'] }

  /**
  A count of the number of resource instances that are part of the group.
  @returns {Array} an array of {@link Number} objects
  */
  quantity () { return this.json['quantity'] }

  /**
  Identifies the traits shared by members of the group.
  @returns {Array} an array of {@link GroupCharacteristicComponent} objects
  */
  characteristic () {
    if (this.json['characteristic']) {
      return this.json['characteristic'].map(item => new GroupCharacteristicComponent(item))
    }
  }

  /**
  Identifies the resource instances that are members of the group.
  @returns {Array} an array of {@link Reference} objects
  */
  member () {
    if (this.json['member']) {
      return this.json['member'].map(item => new Reference(item))
    }
  }
}

