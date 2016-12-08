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
import { Address, Identifier, DomainResource, Reference, ContactPoint, BackboneElement, CodeableConcept, HumanName } from './core'

/**
Embedded class
@class OrganizationContactComponent
@exports  OrganizationContactComponent as OrganizationContactComponent
*/
class OrganizationContactComponent extends BackboneElement {
  /**
  Indicates a purpose for which the contact can be reached.
  @returns {CodeableConcept}
  */
  purpose () { if (this.json['purpose']) { return new CodeableConcept(this.json['purpose']) } }

  /**
  A name associated with the contact.
  @returns {HumanName}
  */
  name () { if (this.json['name']) { return new HumanName(this.json['name']) } }

  /**
  A contact detail (e.g. a telephone number or an email address) by which the party may be contacted.
  @returns {Array} an array of {@link ContactPoint} objects
  */
  telecom () {
    if (this.json['telecom']) {
      return this.json['telecom'].map(item => new ContactPoint(item))
    }
  }

  /**
  Visiting or postal addresses for the contact.
  @returns {Address}
  */
  address () { if (this.json['address']) { return new Address(this.json['address']) } }

  /**
  Administrative Gender - the gender that the person is considered to have for administration and record keeping purposes.
  @returns {Array} an array of {@link String} objects
  */
  gender () { return this.json['gender'] }
}

/**
A formally or informally recognized grouping of people or organizations formed for the purpose of achieving some form of collective action.  Includes companies, institutions, corporations, departments, community groups, healthcare practice groups, etc.
@class Organization
@exports Organization as Organization
*/
export class Organization extends DomainResource {
  /**
  Identifier for the organization that is used to identify the organization across multiple disparate systems.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  A name associated with the organization.
  @returns {Array} an array of {@link String} objects
  */
  name () { return this.json['name'] }

  /**
  The kind of organization that this is.
  @returns {CodeableConcept}
  */
  type () { if (this.json['type']) { return new CodeableConcept(this.json['type']) } }

  /**
  A contact detail for the organization.
  @returns {Array} an array of {@link ContactPoint} objects
  */
  telecom () {
    if (this.json['telecom']) {
      return this.json['telecom'].map(item => new ContactPoint(item))
    }
  }

  /**
  An address for the organization.
  @returns {Array} an array of {@link Address} objects
  */
  address () {
    if (this.json['address']) {
      return this.json['address'].map(item => new Address(item))
    }
  }

  /**
  The organization of which this organization forms a part.
  @returns {Reference}
  */
  partOf () { if (this.json['partOf']) { return new Reference(this.json['partOf']) } }

  /**
  Contact for the organization for a certain purpose.
  @returns {Array} an array of {@link OrganizationContactComponent} objects
  */
  contact () {
    if (this.json['contact']) {
      return this.json['contact'].map(item => new OrganizationContactComponent(item))
    }
  }

  /**
  Location(s) the organization uses to provide services.
  @returns {Array} an array of {@link Reference} objects
  */
  location () {
    if (this.json['location']) {
      return this.json['location'].map(item => new Reference(item))
    }
  }

  /**
  Whether the organization's record is still in active use.
  @returns {Array} an array of {@link boolean} objects
  */
  active () { return this.json['active'] }
}
