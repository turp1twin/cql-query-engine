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
import { Address, Identifier, DomainResource, Reference, ContactPoint, BackboneElement, CodeableConcept, HumanName, Period, Attachment } from './core'

/**
Embedded class
@class ContactComponent
@exports  ContactComponent as ContactComponent
*/
class ContactComponent extends BackboneElement {
  /**
  The nature of the relationship between the patient and the contact person.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  relationship () {
    if (this.json['relationship']) {
      return this.json['relationship'].map(item => new CodeableConcept(item))
    }
  }

  /**
  A name associated with the person.
  @returns {HumanName}
  */
  name () { if (this.json['name']) { return new HumanName(this.json['name']) } }

  /**
  A contact detail for the person, e.g. a telephone number or an email address.
  @returns {Array} an array of {@link ContactPoint} objects
  */
  telecom () {
    if (this.json['telecom']) {
      return this.json['telecom'].map(item => new ContactPoint(item))
    }
  }

  /**
  Address for the contact person.
  @returns {Address}
  */
  address () { if (this.json['address']) { return new Address(this.json['address']) } }

  /**
  Administrative Gender - the gender that the person is considered to have for administration and record keeping purposes.
  @returns {Array} an array of {@link String} objects
  */
  gender () { return this.json['gender'] }

  /**
  Organization on behalf of which the contact is acting or for which the contact is working.
  @returns {Reference}
  */
  organization () { if (this.json['organization']) { return new Reference(this.json['organization']) } }

  /**
  The period during which this person or organisation is valid to be contacted relating to this patient.
  @returns {Period}
  */
  period () { if (this.json['period']) { return new Period(this.json['period']) } }
}

/**
Embedded class
@class AnimalComponent
@exports  AnimalComponent as AnimalComponent
*/
class AnimalComponent extends BackboneElement {
  /**
  Identifies the high level categorization of the kind of animal.
  @returns {CodeableConcept}
  */
  species () { if (this.json['species']) { return new CodeableConcept(this.json['species']) } }

  /**
  Identifies the detailed categorization of the kind of animal.
  @returns {CodeableConcept}
  */
  breed () { if (this.json['breed']) { return new CodeableConcept(this.json['breed']) } }

  /**
  Indicates the current state of the animal's reproductive organs.
  @returns {CodeableConcept}
  */
  genderStatus () { if (this.json['genderStatus']) { return new CodeableConcept(this.json['genderStatus']) } }
}

/**
Embedded class
@class PatientLinkComponent
@exports  PatientLinkComponent as PatientLinkComponent
*/
class PatientLinkComponent extends BackboneElement {
  /**
  The other patient resource that the link refers to.
  @returns {Reference}
  */
  other () { if (this.json['other']) { return new Reference(this.json['other']) } }

  /**
  The type of link between this patient resource and another patient resource.
  @returns {Array} an array of {@link String} objects
  */
  type () { return this.json['type'] }
}

/**
Demographics and other administrative information about a person or animal receiving care or other health-related services.
@class Patient
@exports Patient as Patient
*/
export class Patient extends DomainResource {
  /**
  An identifier that applies to this person as a patient.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  A name associated with the individual.
  @returns {Array} an array of {@link HumanName} objects
  */
  name () {
    if (this.json['name']) {
      return this.json['name'].map(item => new HumanName(item))
    }
  }

  /**
  A contact detail (e.g. a telephone number or an email address) by which the individual may be contacted.
  @returns {Array} an array of {@link ContactPoint} objects
  */
  telecom () {
    if (this.json['telecom']) {
      return this.json['telecom'].map(item => new ContactPoint(item))
    }
  }

  /**
  Administrative Gender - the gender that the patient is considered to have for administration and record keeping purposes.
  @returns {Array} an array of {@link String} objects
  */
  gender () { return this.json['gender'] }

  /**
  The date and time of birth for the individual.
  @returns {Array} an array of {@link Date} objects
  */
  birthDate () { if (this.json['birthDate']) { return DT.DateTime.parse(this.json['birthDate']) } }

  /**
  Indicates if the individual is deceased or not.
  @returns {Array} an array of {@link boolean} objects
  */
  deceasedBoolean () { return this.json['deceasedBoolean'] }

  /**
  Indicates if the individual is deceased or not.
  @returns {Array} an array of {@link Date} objects
  */
  deceasedDateTime () { if (this.json['deceasedDateTime']) { return DT.DateTime.parse(this.json['deceasedDateTime']) } }

  /**
  Addresses for the individual.
  @returns {Array} an array of {@link Address} objects
  */
  address () {
    if (this.json['address']) {
      return this.json['address'].map(item => new Address(item))
    }
  }

  /**
  This field contains a patient's most recent marital (civil) status.
  @returns {CodeableConcept}
  */
  maritalStatus () { if (this.json['maritalStatus']) { return new CodeableConcept(this.json['maritalStatus']) } }

  /**
  Indicates whether the patient is part of a multiple or indicates the actual birth order.
  @returns {Array} an array of {@link boolean} objects
  */
  multipleBirthBoolean () { return this.json['multipleBirthBoolean'] }
  /**
  Indicates whether the patient is part of a multiple or indicates the actual birth order.
  @returns {Array} an array of {@link Number} objects
  */
  multipleBirthInteger () { return this.json['multipleBirthInteger'] }

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
  A contact party (e.g. guardian, partner, friend) for the patient.
  @returns {Array} an array of {@link ContactComponent} objects
  */
  contact () {
    if (this.json['contact']) {
      return this.json['contact'].map(item => new ContactComponent(item))
    }
  }

  /**
  This element has a value if the patient is an animal.
  @returns {AnimalComponent}
  */
  animal () { if (this.json['animal']) { return new AnimalComponent(this.json['animal']) } }

  /**
  Languages which may be used to communicate with the patient about his or her health.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  communication () {
    if (this.json['communication']) {
      return this.json['communication'].map(item => new CodeableConcept(item))
    }
  }

  /**
  Patient's nominated care provider.
  @returns {Array} an array of {@link Reference} objects
  */
  careProvider () {
    if (this.json['careProvider']) {
      return this.json['careProvider'].map(item => new Reference(item))
    }
  }

  /**
  Organization that is the custodian of the patient record.
  @returns {Reference}
  */
  managingOrganization () { if (this.json['managingOrganization']) { return new Reference(this.json['managingOrganization']) } }

  /**
  Link to another patient resource that concerns the same actual person.
  @returns {Array} an array of {@link PatientLinkComponent} objects
  */
  link () {
    if (this.json['link']) {
      return this.json['link'].map(item => new PatientLinkComponent(item))
    }
  }

  /**
  Whether this patient record is in active use.
  @returns {Array} an array of {@link boolean} objects
  */
  active () { return this.json['active'] }
}

