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
import { Identifier, DomainResource, Reference, Period, Timing, CodeableConcept } from './core'

/**
Represents a request for the use of a device.
@class DeviceUseRequest
@exports DeviceUseRequest as DeviceUseRequest
*/
export class DeviceUseRequest extends DomainResource {
  /**
  Body site where the device is to be used.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  bodySite () {
    if (this.json['bodySite']) {
      return this.json['bodySite'].map(item => new CodeableConcept(item))
    }
  }

  /**
  The status of the request.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  The mode of the request.
  @returns {Array} an array of {@link String} objects
  */
  mode () { return this.json['mode'] }

  /**
  The details of the device  to be used.
  @returns {Reference}
  */
  device () { if (this.json['device']) return new Reference(this.json['device']) }

  /**
  An encounter that provides additional context in which this request is made.
  @returns {Reference}
  */
  encounter () { if (this.json['encounter']) return new Reference(this.json['encounter']) }

  /**
  Identifiers assigned to this order by the orderer or by the receiver.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  Reason or justification for the use of this device.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  indication () {
    if (this.json['indication']) {
      return this.json['indication'].map(item => new CodeableConcept(item))
    }
  }

  /**
  Details about this request that were not represented at all or sufficiently in one of the attributes provided in a class. These may include for example a comment, an instruction, or a note associated with the statement.
  @returns {Array} an array of {@link String} objects
  */
  notes () { return this.json['notes'] }

  /**
  The proposed act must be performed if the indicated conditions occur, e.g.., shortness of breath, SpO2 less than x%.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  prnReason () {
    if (this.json['prnReason']) {
      return this.json['prnReason'].map(item => new CodeableConcept(item))
    }
  }

  /**
  The time when the request was made.
  @returns {Array} an array of {@link Date} objects
  */
  orderedOn () { if (this.json['orderedOn']) return DT.DateTime.parse(this.json['orderedOn']) }

  /**
  The time at which the request was made/recorded.
  @returns {Array} an array of {@link Date} objects
  */
  recordedOn () { if (this.json['recordedOn']) return DT.DateTime.parse(this.json['recordedOn']) }

  /**
  The patient who will use the device.
  @returns {Reference}
  */
  subject () { if (this.json['subject']) return new Reference(this.json['subject']) }

  /**
  The timing schedule for the use of the device The Schedule data type allows many different expressions, for example. "Every 8 hours"; "Three times a day"; "1/2 an hour before breakfast for 10 days from 23-Dec 2011:"; "15 Oct 2013, 17 Oct 2013 and 1 Nov 2013".
  @returns {Timing}
  */
  timingTiming () { if (this.json['timingTiming']) return new Timing(this.json['timingTiming']) }

  /**
  The timing schedule for the use of the device The Schedule data type allows many different expressions, for example. "Every 8 hours"; "Three times a day"; "1/2 an hour before breakfast for 10 days from 23-Dec 2011:"; "15 Oct 2013, 17 Oct 2013 and 1 Nov 2013".
  @returns {Period}
  */
  timingPeriod () { if (this.json['timingPeriod']) return new Period(this.json['timingPeriod']) }

  /**
  The timing schedule for the use of the device The Schedule data type allows many different expressions, for example. "Every 8 hours"; "Three times a day"; "1/2 an hour before breakfast for 10 days from 23-Dec 2011:"; "15 Oct 2013, 17 Oct 2013 and 1 Nov 2013".
  @returns {Array} an array of {@link Date} objects
  */
  timingDateTime () { if (this.json['timingDateTime']) return DT.DateTime.parse(this.json['timingDateTime']) }

  /**
  Characterizes how quickly the  use of device must be initiated. Includes concepts such as stat, urgent, routine.
  @returns {Array} an array of {@link String} objects
  */
  priority () { return this.json['priority'] }
}

