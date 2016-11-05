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
import { Identifier, DomainResource, Reference, ContactPoint, BackboneElement, CodeableConcept } from './core'

/**
Embedded class
@class ServiceTypeComponent
@exports  ServiceTypeComponent as ServiceTypeComponent
*/
class ServiceTypeComponent extends BackboneElement {
  /**
   The specific type of service being delivered or performed.
   @returns {CodeableConcept}
   */
  type () {
    if (this.json['type']) {
      return new CodeableConcept(this.json['type'])
    }
  }

  /**
   Collection of Specialties handled by the Service Site. This is more of a Medical Term.
   @returns {Array} an array of {@link CodeableConcept} objects
   */
  specialty () {
    if (this.json['specialty']) {
      return this.json['specialty'].map(item => new CodeableConcept(item))
    }
  }
}

/**
Embedded class
@class HealthcareServiceAvailableTimeComponent
@exports  HealthcareServiceAvailableTimeComponent as HealthcareServiceAvailableTimeComponent
*/
class HealthcareServiceAvailableTimeComponent extends BackboneElement {
  /**
  Indicates which Days of the week are available between the Start and End Times.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  daysOfWeek () {
    if (this.json['daysOfWeek']) {
      return this.json['daysOfWeek'].map(item => new CodeableConcept(item))
    }
  }

  /**
  Is this always available? (hence times are irrelevant) e.g. 24 hour service.
  @returns {Array} an array of {@link boolean} objects
  */
  allDay () { return this.json['allDay'] }

  /**
  The opening time of day (the date is not included). Note: If the AllDay flag is set, then this time is ignored.
  @returns {Array} an array of {@link Date} objects
  */
  availableStartTime () { if (this.json['availableStartTime']) { return DT.DateTime.parse(this.json['availableStartTime']) } }

  /**
  The closing time of day (the date is not included). Note: If the AllDay flag is set, then this time is ignored.
  @returns {Array} an array of {@link Date} objects
  */
  availableEndTime () { if (this.json['availableEndTime']) { return DT.DateTime.parse(this.json['availableEndTime']) } }
}

/**
Embedded class
@class HealthcareServiceNotAvailableTimeComponent
@exports  HealthcareServiceNotAvailableTimeComponent as HealthcareServiceNotAvailableTimeComponent
*/
class HealthcareServiceNotAvailableTimeComponent extends BackboneElement {
  /**
  The reason that can be presented to the user as to why this time is not available.
  @returns {Array} an array of {@link String} objects
  */
  description () { return this.json['description'] }

  /**
  Service is not available (seasonally or for a public holiday) from this date.
  @returns {Array} an array of {@link Date} objects
  */
  startDate () { if (this.json['startDate']) { return DT.DateTime.parse(this.json['startDate']) } }

  /**
  Service is not available (seasonally or for a public holiday) until this date.
  @returns {Array} an array of {@link Date} objects
  */
  endDate () { if (this.json['endDate']) { return DT.DateTime.parse(this.json['endDate']) } }
}

/**
(informative) The details of a Healthcare Service available at a location.
@class HealthcareService
@exports HealthcareService as HealthcareService
*/
export class HealthcareService extends DomainResource {
  /**
  External Ids for this item.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  The location where this healthcare service may be provided.
  @returns {Reference}
  */
  location () { if (this.json['location']) { return new Reference(this.json['location']) } }

  /**
  Identifies the broad category of service being performed or delivered. Selecting a Service Category then determines the list of relevant service types that can be selected in the Primary Service Type.
  @returns {CodeableConcept}
  */
  serviceCategory () { if (this.json['serviceCategory']) { return new CodeableConcept(this.json['serviceCategory']) } }

  /**
  A specific type of service that may be delivered or performed.
  @returns {Array} an array of {@link ServiceTypeComponent} objects
  */
  serviceType () {
    if (this.json['serviceType']) {
      return this.json['serviceType'].map(item => new ServiceTypeComponent(item))
    }
  }

  /**
  Further description of the service as it would be presented to a consumer while searching.
  @returns {Array} an array of {@link String} objects
  */
  serviceName () { return this.json['serviceName'] }

  /**
  Additional description of the  or any specific issues not covered by the other attributes, which can be displayed as further detail under the serviceName.
  @returns {Array} an array of {@link String} objects
  */
  comment () { return this.json['comment'] }

  /**
  Extra details about the service that can't be placed in the other fields.
  @returns {Array} an array of {@link String} objects
  */
  extraDetails () { return this.json['extraDetails'] }

  /**
  The free provision code provides a link to the Free Provision reference entity to enable the selection of one free provision type.
  @returns {CodeableConcept}
  */
  freeProvisionCode () { if (this.json['freeProvisionCode']) { return new CodeableConcept(this.json['freeProvisionCode']) } }

  /**
  Does this service have specific eligibility requirements that need to be met in order to use the service.
  @returns {CodeableConcept}
  */
  eligibility () { if (this.json['eligibility']) { return new CodeableConcept(this.json['eligibility']) } }

  /**
  The description of service eligibility should, in general, not exceed one or two paragraphs. It should be sufficient for a prospective consumer to determine if they are likely to be eligible or not. Where eligibility requirements and conditions are complex, it may simply be noted that an eligibility assessment is required. Where eligibility is determined by an outside source, such as an Act of Parliament, this should be noted, preferably with a reference to a commonly available copy of the source document such as a web page.
  @returns {Array} an array of {@link String} objects
  */
  eligibilityNote () { return this.json['eligibilityNote'] }

  /**
  Indicates whether or not a prospective consumer will require an appointment for a particular service at a Site to be provided by the Organization. Indicates if an appointment is required for access to this service. If this flag is 'NotDefined', then this flag is overridden by the Site's availability flag. (ConditionalIndicator Enum).
  @returns {CodeableConcept}
  */
  appointmentRequired () { if (this.json['appointmentRequired']) { return new CodeableConcept(this.json['appointmentRequired']) } }

  /**
  If there is an image associated with this Service Site, its URI can be included here.
  @returns {Array} an array of {@link String} objects
  */
  imageURI () { return this.json['imageURI'] }

  /**
  A Collection of times that the Service Site is available.
  @returns {Array} an array of {@link HealthcareServiceAvailableTimeComponent} objects
  */
  availableTime () {
    if (this.json['availableTime']) {
      return this.json['availableTime'].map(item => new HealthcareServiceAvailableTimeComponent(item))
    }
  }

  /**
  Not avail times - need better description.
  @returns {Array} an array of {@link HealthcareServiceNotAvailableTimeComponent} objects
  */
  notAvailableTime () {
    if (this.json['notAvailableTime']) {
      return this.json['notAvailableTime'].map(item => new HealthcareServiceNotAvailableTimeComponent(item))
    }
  }

  /**
  A description of Site availability exceptions, e.g., public holiday availability. Succinctly describing all possible exceptions to normal Site availability as details in the Available Times and Not Available Times.
  @returns {Array} an array of {@link String} objects
  */
  availabilityExceptions () { return this.json['availabilityExceptions'] }

  /**
  The public part of the 'keys' allocated to an Organization by an accredited body to support secure exchange of data over the internet. To be provided by the Organization, where available.
  @returns {Array} an array of {@link String} objects
  */
  publicKey () { return this.json['publicKey'] }

  /**
  Program Names that can be used to categorize the service.
  @returns {Array} an array of {@link String} objects
  */
  programName () { return this.json['programName'] }

  /**
  List of contacts related to this specific healthcare service. If this is empty, then refer to the location's contacts.
  @returns {Array} an array of {@link ContactPoint} objects
  */
  contactPoint () {
    if (this.json['contactPoint']) {
      return this.json['contactPoint'].map(item => new ContactPoint(item))
    }
  }

  /**
  Collection of Characteristics (attributes).
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  characteristic () {
    if (this.json['characteristic']) {
      return this.json['characteristic'].map(item => new CodeableConcept(item))
    }
  }

  /**
  Ways that the service accepts referrals.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  referralMethod () {
    if (this.json['referralMethod']) {
      return this.json['referralMethod'].map(item => new CodeableConcept(item))
    }
  }

  /**
  The setting where this service can be provided, such is in home, or at location in organisation.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  setting () {
    if (this.json['setting']) {
      return this.json['setting'].map(item => new CodeableConcept(item))
    }
  }

  /**
  Collection of Target Groups for the Service Site (The target audience that this service is for).
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  targetGroup () {
    if (this.json['targetGroup']) {
      return this.json['targetGroup'].map(item => new CodeableConcept(item))
    }
  }

  /**
  Need better description.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  coverageArea () {
    if (this.json['coverageArea']) {
      return this.json['coverageArea'].map(item => new CodeableConcept(item))
    }
  }

  /**
  Need better description.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  catchmentArea () {
    if (this.json['catchmentArea']) {
      return this.json['catchmentArea'].map(item => new CodeableConcept(item))
    }
  }

  /**
  List of the specific.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  serviceCode () {
    if (this.json['serviceCode']) {
      return this.json['serviceCode'].map(item => new CodeableConcept(item))
    }
  }
}

