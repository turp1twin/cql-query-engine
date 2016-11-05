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
import { Identifier, DomainResource, Reference, CodeableConcept, Period, Timing } from './core'

/**
A request for a procedure to be performed. May be a proposal or an order.
@class ProcedureRequest
@exports ProcedureRequest as ProcedureRequest
*/
export class ProcedureRequest extends DomainResource {
  /**
  Identifiers assigned to this order by the order or by the receiver.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  The patient who will receive the procedure.
  @returns {Reference}
  */
  subject () { if (this.json['subject']) { return new Reference(this.json['subject']) } }

  /**
  The specific procedure that is ordered. Use text if the exact nature of the procedure can't be coded.
  @returns {CodeableConcept}
  */
  type () { if (this.json['type']) { return new CodeableConcept(this.json['type']) } }

  /**
  The site where the procedure is to be performed.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  bodySite () {
    if (this.json['bodySite']) {
      return this.json['bodySite'].map(item => new CodeableConcept(item))
    }
  }

  /**
  The reason why the procedure is proposed or ordered. This procedure request may be motivated by a Condition for instance.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  indication () {
    if (this.json['indication']) {
      return this.json['indication'].map(item => new CodeableConcept(item))
    }
  }

  /**
  The timing schedule for the proposed or ordered procedure. The Schedule data type allows many different expressions, for example. "Every 8 hours"; "Three times a day"; "1/2 an hour before breakfast for 10 days from 23-Dec 2011:"; "15 Oct 2013, 17 Oct 2013 and 1 Nov 2013".
  @returns {Array} an array of {@link Date} objects
  */
  timingDateTime () { if (this.json['timingDateTime']) { return DT.DateTime.parse(this.json['timingDateTime']) } }
  /**
  The timing schedule for the proposed or ordered procedure. The Schedule data type allows many different expressions, for example. "Every 8 hours"; "Three times a day"; "1/2 an hour before breakfast for 10 days from 23-Dec 2011:"; "15 Oct 2013, 17 Oct 2013 and 1 Nov 2013".
  @returns {Period}
  */
  timingPeriod () { if (this.json['timingPeriod']) { return new Period(this.json['timingPeriod']) } }
  /**
  The timing schedule for the proposed or ordered procedure. The Schedule data type allows many different expressions, for example. "Every 8 hours"; "Three times a day"; "1/2 an hour before breakfast for 10 days from 23-Dec 2011:"; "15 Oct 2013, 17 Oct 2013 and 1 Nov 2013".
  @returns {Timing}
  */
  timingTiming () { if (this.json['timingTiming']) { return new Timing(this.json['timingTiming']) } }

  /**
  The encounter within which the procedure proposal or request was created.
  @returns {Reference}
  */
  encounter () { if (this.json['encounter']) { return new Reference(this.json['encounter']) } }

  /**
  E.g. surgeon, anaethetist, endoscopist.
  @returns {Reference}
  */
  performer () { if (this.json['performer']) { return new Reference(this.json['performer']) } }

  /**
  The status of the order.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  The status of the order.
  @returns {Array} an array of {@link String} objects
  */
  mode () { return this.json['mode'] }

  /**
  Any other notes associated with this proposal or order - e.g., provider instructions.
  @returns {Array} an array of {@link String} objects
  */
  notes () { return this.json['notes'] }

  /**
  If a CodeableConcept is present, it indicates the pre-condition for performing the procedure.
  @returns {Array} an array of {@link boolean} objects
  */
  asNeededBoolean () { return this.json['asNeededBoolean'] }
  /**
  If a CodeableConcept is present, it indicates the pre-condition for performing the procedure.
  @returns {CodeableConcept}
  */
  asNeededCodeableConcept () { if (this.json['asNeededCodeableConcept']) { return new CodeableConcept(this.json['asNeededCodeableConcept']) } }

  /**
  The time when the request was made.
  @returns {Array} an array of {@link Date} objects
  */
  orderedOn () { if (this.json['orderedOn']) { return DT.DateTime.parse(this.json['orderedOn']) } }

  /**
  The healthcare professional responsible for proposing or ordering the procedure.
  @returns {Reference}
  */
  orderer () { if (this.json['orderer']) { return new Reference(this.json['orderer']) } }

  /**
  The clinical priority associated with this order.
  @returns {Array} an array of {@link String} objects
  */
  priority () { return this.json['priority'] }
}
