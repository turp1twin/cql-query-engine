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
import { BackboneElement, DomainResource, Reference, ContactPoint, Period, HumanName, CodeableConcept } from './core'

/**
Embedded class
@class NamingSystemUniqueIdComponent
@exports  NamingSystemUniqueIdComponent as NamingSystemUniqueIdComponent
*/
class NamingSystemUniqueIdComponent extends BackboneElement {
  /**
  Identifies the unique identifier scheme used for this particular identifier.
  @returns {Array} an array of {@link String} objects
  */
  type () { return this.json['type'] }

  /**
  The string that should be sent over the wire to identify the code system or identifier system.
  @returns {Array} an array of {@link String} objects
  */
  value () { return this.json['value'] }

  /**
  Indicates whether this identifier is the "preferred" identifier of this type.
  @returns {Array} an array of {@link boolean} objects
  */
  preferred () { return this.json['preferred'] }

  /**
  Identifies the period of time over which this identifier is considered appropriate to refer to the namingsystem.  Outside of this window, the identifier might be non-deterministic.
  @returns {Period}
  */
  period () { if (this.json['period']) { return new Period(this.json['period']) } }
}

/**
Embedded class
@class NamingSystemContactComponent
@exports  NamingSystemContactComponent as NamingSystemContactComponent
*/
class NamingSystemContactComponent extends BackboneElement {
  /**
  Names of the person who can be contacted.
  @returns {HumanName}
  */
  name () { if (this.json['name']) { return new HumanName(this.json['name']) } }

  /**
  Identifies the mechanism(s) by which they can be contacted.
  @returns {Array} an array of {@link ContactPoint} objects
  */
  telecom () {
    if (this.json['telecom']) {
      return this.json['telecom'].map(item => new ContactPoint(item))
    }
  }
}

/**
A curated namespace that issues unique symbols within that namespace for the identification of concepts, people, devices, etc.  Represents a "System" used within the Identifier and Coding data types.
@class NamingSystem
@exports NamingSystem as NamingSystem
*/
export class NamingSystem extends DomainResource {
  /**
  Indicates the purpose for the namingsystem - what kinds of things does it make unique?.
  @returns {Array} an array of {@link String} objects
  */
  type () { return this.json['type'] }

  /**
  The descriptive name of this particular identifier type or code system.
  @returns {Array} an array of {@link String} objects
  */
  name () { return this.json['name'] }

  /**
  Indicates whether the namingsystem is "ready for use" or not.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  If present, indicates that the identifier or code system is principally intended for use or applies to entities within the specified country.  For example, the country associated with a national code system.
  @returns {Array} an array of {@link String} objects
  */
  country () { return this.json['country'] }

  /**
  Categorizes a namingsystem for easier search by grouping related namingsystems.
  @returns {CodeableConcept}
  */
  category () { if (this.json['category']) { return new CodeableConcept(this.json['category']) } }

  /**
  The name of the organization that is responsible for issuing identifiers or codes for this namespace and ensuring their non-collision.
  @returns {Array} an array of {@link String} objects
  */
  responsible () { return this.json['responsible'] }

  /**
  Details about what the namespace identifies including scope, granularity, version labeling, etc.
  @returns {Array} an array of {@link String} objects
  */
  description () { return this.json['description'] }

  /**
  Provides guidance on the use of the namespace, including the handling of formatting characters, use of upper vs. lower case, etc.
  @returns {Array} an array of {@link String} objects
  */
  usage () { return this.json['usage'] }

  /**
  Indicates how the system may be identified when referenced in electronic exchange.
  @returns {Array} an array of {@link NamingSystemUniqueIdComponent} objects
  */
  uniqueId () {
    if (this.json['uniqueId']) {
      return this.json['uniqueId'].map(item => new NamingSystemUniqueIdComponent(item))
    }
  }

  /**
  The person who can be contacted about this system registration entry.
  @returns {NamingSystemContactComponent}
  */
  contact () { if (this.json['contact']) { return new NamingSystemContactComponent(this.json['contact']) } }

  /**
  For namingsystems that are retired, indicates the namingsystem that should be used in their place (if any).
  @returns {Reference}
  */
  replacedBy () { if (this.json['replacedBy']) { return new Reference(this.json['replacedBy']) } }
}

