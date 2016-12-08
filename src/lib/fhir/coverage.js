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
import { Identifier, DomainResource, Reference, Coding, Period } from './core'

/**
Financial instrument which may be used to pay for or reimburse for health care products and services.
@class Coverage
@exports Coverage as Coverage
*/
export class Coverage extends DomainResource {
  /**
  The program or plan underwriter or payor.
  @returns {Reference}
  */
  issuer () { if (this.json['issuer']) return new Reference(this.json['issuer']) }

  /**
  Time period during which the coverage is in force. A missing start date indicates the start date isn't known, a missing end date means the coverage is continuing to be in force.
  @returns {Period}
  */
  period () { if (this.json['period']) return new Period(this.json['period']) }

  /**
  The type of coverage: social program, medical plan, accident coverage (workers compensation, auto), group health.
  @returns {Coding}
  */
  type () { if (this.json['type']) return new Coding(this.json['type']) }

  /**
  The main (and possibly only) identifier for the coverage - often referred to as a Subscriber Id, Certificate number or Personal Health Number or Case ID.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  Identifies a style or collective of coverage issues by the underwriter, for example may be used to identify a class of coverage or employer group. May also be referred to as a Policy or Group ID.
  @returns {Array} an array of {@link String} objects
  */
  group () { return this.json['group'] }

  /**
  Identifies a style or collective of coverage issues by the underwriter, for example may be used to identify a class of coverage or employer group. May also be referred to as a Policy or Group ID.
  @returns {Array} an array of {@link String} objects
  */
  plan () { return this.json['plan'] }

  /**
  Identifies a sub-style or sub-collective of coverage issues by the underwriter, for example may be used to identify a specific employer group within a class of employers. May be referred to as a Section or Division ID.
  @returns {Array} an array of {@link String} objects
  */
  subplan () { return this.json['subplan'] }

  /**
  A unique identifier for a dependent under the coverage.
  @returns {Array} an array of {@link Number} objects
  */
  dependent () { return this.json['dependent'] }

  /**
  An optional counter for a particular instance of the identified coverage which increments upon each renewal.
  @returns {Array} an array of {@link Number} objects
  */
  sequence () { return this.json['sequence'] }

  /**
  The party who 'owns' the insurance contractual relationship to the policy or to whom the benefit of the policy is due.
  @returns {Reference}
  */
  subscriber () { if (this.json['subscriber']) return new Reference(this.json['subscriber']) }

  /**
  The identifier for a community of providers.
  @returns {Identifier}
  */
  network () { if (this.json['network']) return new Identifier(this.json['network']) }

  /**
  The policy(s) which constitute this insurance coverage.
  @returns {Array} an array of {@link Reference} objects
  */
  contract () {
    if (this.json['contract']) {
      return this.json['contract'].map(item => new Reference(item))
    }
  }
}

