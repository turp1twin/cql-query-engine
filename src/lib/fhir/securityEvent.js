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
import { Identifier, DomainResource, Reference, BackboneElement, CodeableConcept, Coding } from './core'

/**
Embedded class
@class SecurityEventEventComponent
@exports  SecurityEventEventComponent as SecurityEventEventComponent
*/
class SecurityEventEventComponent extends BackboneElement {
  /**
  Identifier for a family of the event.
  @returns {CodeableConcept}
  */
  type () { if (this.json['type']) { return new CodeableConcept(this.json['type']) } }

  /**
  Identifier for the category of event.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  subtype () {
    if (this.json['subtype']) {
      return this.json['subtype'].map(item => new CodeableConcept(item))
    }
  }

  /**
  Indicator for type of action performed during the event that generated the audit.
  @returns {Array} an array of {@link String} objects
  */
  action () { return this.json['action'] }

  /**
  The time when the event occurred on the source.
  @returns {Array} an array of {@link Date} objects
  */
  dateTime () { if (this.json['dateTime']) { return DT.DateTime.parse(this.json['dateTime']) } }

  /**
  Indicates whether the event succeeded or failed.
  @returns {Array} an array of {@link String} objects
  */
  outcome () { return this.json['outcome'] }

  /**
  A free text description of the outcome of the event.
  @returns {Array} an array of {@link String} objects
  */
  outcomeDesc () { return this.json['outcomeDesc'] }
}

/**
Embedded class
@class SecurityEventParticipantNetworkComponent
@exports  SecurityEventParticipantNetworkComponent as SecurityEventParticipantNetworkComponent
*/
class SecurityEventParticipantNetworkComponent extends BackboneElement {
  /**
  An identifier for the network access point of the user device for the audit event.
  @returns {Array} an array of {@link String} objects
  */
  identifier () { return this.json['identifier'] }

  /**
  An identifier for the type of network access point that originated the audit event.
  @returns {Array} an array of {@link String} objects
  */
  type () { return this.json['type'] }
}

/**
Embedded class
@class SecurityEventParticipantComponent
@exports  SecurityEventParticipantComponent as SecurityEventParticipantComponent
*/
class SecurityEventParticipantComponent extends BackboneElement {
  /**
  Specification of the role(s) the user plays when performing the event. Usually the codes used in this element are local codes defined by the role-based access control security system used in the local context.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  role () {
    if (this.json['role']) {
      return this.json['role'].map(item => new CodeableConcept(item))
    }
  }

  /**
  Direct reference to a resource that identifies the participant.
  @returns {Reference}
  */
  reference () { if (this.json['reference']) { return new Reference(this.json['reference']) } }

  /**
  Unique identifier for the user actively participating in the event.
  @returns {Array} an array of {@link String} objects
  */
  userId () { return this.json['userId'] }

  /**
  Alternative Participant Identifier. For a human, this should be a user identifier text string from authentication system. This identifier would be one known to a common authentication system (e.g., single sign-on), if available.
  @returns {Array} an array of {@link String} objects
  */
  altId () { return this.json['altId'] }

  /**
  Human-meaningful name for the user.
  @returns {Array} an array of {@link String} objects
  */
  name () { return this.json['name'] }

  /**
  Indicator that the user is or is not the requestor, or initiator, for the event being audited.
  @returns {Array} an array of {@link boolean} objects
  */
  requestor () { return this.json['requestor'] }

  /**
  Type of media involved. Used when the event is about exporting/importing onto media.
  @returns {Coding}
  */
  media () { if (this.json['media']) { return new Coding(this.json['media']) } }

  /**
  Logical network location for application activity, if the activity has a network location.
  @returns {SecurityEventParticipantNetworkComponent}
  */
  network () { if (this.json['network']) { return new SecurityEventParticipantNetworkComponent(this.json['network']) } }
}

/**
Embedded class
@class SecurityEventSourceComponent
@exports  SecurityEventSourceComponent as SecurityEventSourceComponent
*/
class SecurityEventSourceComponent extends BackboneElement {
  /**
  Logical source location within the healthcare enterprise network.
  @returns {Array} an array of {@link String} objects
  */
  site () { return this.json['site'] }

  /**
  Identifier of the source where the event originated.
  @returns {Array} an array of {@link String} objects
  */
  identifier () { return this.json['identifier'] }

  /**
  Code specifying the type of source where event originated.
  @returns {Array} an array of {@link Coding} objects
  */
  type () {
    if (this.json['type']) {
      return this.json['type'].map(item => new Coding(item))
    }
  }
}

/**
Embedded class
@class SecurityEventObjectDetailComponent
@exports  SecurityEventObjectDetailComponent as SecurityEventObjectDetailComponent
*/
class SecurityEventObjectDetailComponent extends BackboneElement {
  /**
  Name of the property.
  @returns {Array} an array of {@link String} objects
  */
  type () { return this.json['type'] }

  /**
  Property value.
  @returns {Array} an array of {@link } objects
  */
  value () { return this.json['value'] }
}

/**
Embedded class
@class SecurityEventObjectComponent
@exports  SecurityEventObjectComponent as SecurityEventObjectComponent
*/
class SecurityEventObjectComponent extends BackboneElement {
  /**
  Identifies a specific instance of the participant object. The reference should always be version specific.
  @returns {Identifier}
  */
  identifier () { if (this.json['identifier']) { return new Identifier(this.json['identifier']) } }

  /**
  Identifies a specific instance of the participant object. The reference should always be version specific.
  @returns {Reference}
  */
  reference () { if (this.json['reference']) { return new Reference(this.json['reference']) } }

  /**
  Object type being audited.
  @returns {Array} an array of {@link String} objects
  */
  type () { return this.json['type'] }

  /**
  Code representing the functional application role of Participant Object being audited.
  @returns {Array} an array of {@link String} objects
  */
  role () { return this.json['role'] }

  /**
  Identifier for the data life-cycle stage for the participant object.
  @returns {Array} an array of {@link String} objects
  */
  lifecycle () { return this.json['lifecycle'] }

  /**
  Denotes policy-defined sensitivity for the Participant Object ID such as VIP, HIV status, mental health status or similar topics.
  @returns {CodeableConcept}
  */
  sensitivity () { if (this.json['sensitivity']) { return new CodeableConcept(this.json['sensitivity']) } }

  /**
  An instance-specific descriptor of the Participant Object ID audited, such as a person's name.
  @returns {Array} an array of {@link String} objects
  */
  name () { return this.json['name'] }

  /**
  Text that describes the object in more detail.
  @returns {Array} an array of {@link String} objects
  */
  description () { return this.json['description'] }

  /**
  The actual query for a query-type participant object.
  @returns {Array} an array of {@link } objects
  */
  query () { return this.json['query'] }

  /**
  Additional Information about the Object.
  @returns {Array} an array of {@link SecurityEventObjectDetailComponent} objects
  */
  detail () {
    if (this.json['detail']) {
      return this.json['detail'].map(item => new SecurityEventObjectDetailComponent(item))
    }
  }
}

/**
A record of an event made for purposes of maintaining a security log. Typical uses include detection of intrusion attempts and monitoring for inappropriate usage.
@class SecurityEvent
@exports SecurityEvent as SecurityEvent
*/
export class SecurityEvent extends DomainResource {
  /**
  Identifies the name, action type, time, and disposition of the audited event.
  @returns {SecurityEventEventComponent}
  */
  event () { if (this.json['event']) { return new SecurityEventEventComponent(this.json['event']) } }

  /**
  A person, a hardware device or software process.
  @returns {Array} an array of {@link SecurityEventParticipantComponent} objects
  */
  participant () {
    if (this.json['participant']) {
      return this.json['participant'].map(item => new SecurityEventParticipantComponent(item))
    }
  }

  /**
  Application systems and processes.
  @returns {SecurityEventSourceComponent}
  */
  source () { if (this.json['source']) { return new SecurityEventSourceComponent(this.json['source']) } }

  /**
  Specific instances of data or objects that have been accessed.
  @returns {Array} an array of {@link SecurityEventObjectComponent} objects
  */
  object () {
    if (this.json['object']) {
      return this.json['object'].map(item => new SecurityEventObjectComponent(item))
    }
  }
}
