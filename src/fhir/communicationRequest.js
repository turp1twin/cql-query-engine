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
import { Identifier, CodeableConcept, Reference, BackboneElement, Attachment, DomainResource } from './core'

/**
Embedded class
@class CommunicationRequestMessagePartComponent
@exports  CommunicationRequestMessagePartComponent as CommunicationRequestMessagePartComponent
*/
class CommunicationRequestMessagePartComponent extends BackboneElement {
  /**
  An individual message part for multi-part messages.
  @returns {Array} an array of {@link String} objects
  */
  contentString () { return this.json['contentString'] }

  /**
  An individual message part for multi-part messages.
  @returns {Attachment}
  */
  contentAttachment () { if (this.json['contentAttachment']) return new Attachment(this.json['contentAttachment']) }

  /**
  An individual message part for multi-part messages.
  @returns {Reference}
  */
  contentReference () { if (this.json['contentReference']) return new Reference(this.json['contentReference']) }
}

/**
A request to convey information. E.g., the CDS system proposes that an alert be sent to a responsible provider, the CDS system proposes that the public health agency be notified about a reportable condition.
@class CommunicationRequest
@exports CommunicationRequest as CommunicationRequest
*/
export class CommunicationRequest extends DomainResource {
  /**
  A unique ID of this request for reference purposes. It must be provided if user wants it returned as part of any output, otherwise it will be auto-generated, if needed, by CDS system. Does not need to be the actual ID of the source system.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  The type of message such as alert, notification, reminder, instruction, etc.
  @returns {CodeableConcept}
  */
  category () { if (this.json['category']) return new CodeableConcept(this.json['category']) }

  /**
  The entity (e.g., person, organization, clinical information system, or device) which is the source of the communication.
  @returns {Reference}
  */
  sender () { if (this.json['sender']) return new Reference(this.json['sender']) }

  /**
  The entity (e.g., person, organization, clinical information system, or device) which is the intended target of the communication.
  @returns {Array} an array of {@link Reference} objects
  */
  recipient () {
    if (this.json['recipient']) {
      return this.json['recipient'].map(item => new Reference(item))
    }
  }

  /**
  Text, attachment(s), or resource(s) to be communicated to the recipient.
  @returns {Array} an array of {@link CommunicationRequestMessagePartComponent} objects
  */
  messagePart () {
    if (this.json['messagePart']) {
      return this.json['messagePart'].map(item => new CommunicationRequestMessagePartComponent(item))
    }
  }

  /**
  The communication medium, e.g., email, fax.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  medium () {
    if (this.json['medium']) {
      return this.json['medium'].map(item => new CodeableConcept(item))
    }
  }

  /**
  The responsible person who authorizes this order, e.g., physician. This may be different than the author of the order statement, e.g., clerk, who may have entered the statement into the order entry application.
  @returns {Reference}
  */
  requester () { if (this.json['requester']) return new Reference(this.json['requester']) }

  /**
  The status of the proposal or order.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  Whether the communication is proposed, ordered, or planned.
  @returns {Array} an array of {@link String} objects
  */
  mode () { return this.json['mode'] }

  /**
  The encounter within which the communication request was created.
  @returns {Reference}
  */
  encounter () { if (this.json['encounter']) return new Reference(this.json['encounter']) }

  /**
  The time when this communication is to occur.
  @returns {Array} an array of {@link Date} objects
  */
  scheduledTime () { if (this.json['scheduledTime']) return DT.DateTime.parse(this.json['scheduledTime']) }

  /**
  The reason or justification for the communication request.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  indication () {
    if (this.json['indication']) {
      return this.json['indication'].map(item => new CodeableConcept(item))
    }
  }

  /**
  The time when the request was made.
  @returns {Array} an array of {@link Date} objects
  */
  orderedOn () { if (this.json['orderedOn']) return DT.DateTime.parse(this.json['orderedOn']) }

  /**
  The patient who is the focus of this communication request.
  @returns {Reference}
  */
  subject () { if (this.json['subject']) return new Reference(this.json['subject']) }

  /**
  Characterizes how quickly the proposed act must be initiated. Includes concepts such as stat, urgent, routine.
  @returns {CodeableConcept}
  */
  priority () { if (this.json['priority']) return new CodeableConcept(this.json['priority']) }
}

