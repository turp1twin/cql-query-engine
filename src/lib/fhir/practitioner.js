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
import { Identifier, DomainResource, Reference, ContactPoint, BackboneElement, CodeableConcept, Period, HumanName, Address } from './core'

/**
Embedded class
@class PractitionerQualificationComponent
@exports  PractitionerQualificationComponent as PractitionerQualificationComponent
*/
class PractitionerQualificationComponent extends BackboneElement {
  /**
  An identifier that applies to this person's qualification in this role.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  Coded representation of the qualification.
  @returns {CodeableConcept}
  */
  code () { if (this.json['code']) { return new CodeableConcept(this.json['code']) } }

  /**
  Period during which the qualification is valid.
  @returns {Period}
  */
  period () { if (this.json['period']) { return new Period(this.json['period']) } }

  /**
  Organization that regulates and issues the qualification.
  @returns {Reference}
  */
  issuer () { if (this.json['issuer']) { return new Reference(this.json['issuer']) } }
}

/**
A person who is directly or indirectly involved in the provisioning of healthcare.
@class Practitioner
@exports Practitioner as Practitioner
*/
export class Practitioner extends DomainResource {
  /**
  An identifier that applies to this person in this role.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  A name associated with the person.
  @returns {HumanName}
  */
  name () { if (this.json['name']) { return new HumanName(this.json['name']) } }

  /**
  A contact detail for the practitioner, e.g. a telephone number or an email address.
  @returns {Array} an array of {@link ContactPoint} objects
  */
  telecom () {
    if (this.json['telecom']) {
      return this.json['telecom'].map(item => new ContactPoint(item))
    }
  }

/**
  The postal address where the practitioner can be found or visited or to which mail can be delivered.
  @returns {Array} an array of {@link Address} objects
  */
  address () {
    if (this.json['address']) {
      return this.json['address'].map(item => new Address(item))
    }
  }

  /**
  Administrative Gender - the gender that the person is considered to have for administration and record keeping purposes.
  @returns {Array} an array of {@link String} objects
  */
  gender () { return this.json['gender'] }

  /**
  The date and time of birth for the practitioner.
  @returns {Array} an array of {@link Date} objects
  */
  birthDate () { if (this.json['birthDate']) { return DT.DateTime.parse(this.json['birthDate']) } }

  /**
  Image of the person.
  @returns {Array} an array of {@link Attachment} objects
  */
  photo () {
    if (this.json['photo']) {
      return this.json['photo'].map(item => new Attachment(item))
    }
  }

  /**
  The organization that the practitioner represents.
  @returns {Reference}
  */
  organization () { if (this.json['organization']) { return new Reference(this.json['organization']) } }

  /**
  Roles which this practitioner is authorized to perform for the organization.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  role () {
    if (this.json['role']) {
      return this.json['role'].map(item => new CodeableConcept(item))
    }
  }

  /**
  Specific specialty of the practitioner.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  specialty () {
    if (this.json['specialty']) {
      return this.json['specialty'].map(item => new CodeableConcept(item))
    }
  }

  /**
  The period during which the person is authorized to act as a practitioner in these role(s) for the organization.
  @returns {Period}
  */
  period () { if (this.json['period']) { return new Period(this.json['period']) } }

  /**
  The location(s) at which this practitioner provides care.
  @returns {Array} an array of {@link Reference} objects
  */
  location () {
    if (this.json['location']) {
      return this.json['location'].map(item => new Reference(item))
    }
  }

  /**
  Qualifications obtained by training and certification.
  @returns {Array} an array of {@link PractitionerQualificationComponent} objects
  */
  qualification () {
    if (this.json['qualification']) {
      return this.json['qualification'].map(item => new PractitionerQualificationComponent(item))
    }
  }

  /**
  A language the practitioner is able to use in patient communication.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  communication () {
    if (this.json['communication']) {
      return this.json['communication'].map(item => new CodeableConcept(item))
    }
  }
}
