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
import { Identifier, DomainResource, Reference, BackboneElement, CodeableConcept, Quantity, Period } from './core'

/**
Embedded class
@class SupplyDispenseComponent
@exports  SupplyDispenseComponent as SupplyDispenseComponent
*/
class SupplyDispenseComponent extends BackboneElement {
  /**
  Identifier assigned by the dispensing facility when the dispense occurs.
  @returns {Identifier}
  */
  identifier () { if (this.json['identifier']) { return new Identifier(this.json['identifier']) } }

  /**
  A code specifying the state of the dispense event.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  Indicates the type of dispensing event that is performed. Examples include: Trial Fill, Completion of Trial, Partial Fill, Emergency Fill, Samples, etc.
  @returns {CodeableConcept}
  */
  type () { if (this.json['type']) { return new CodeableConcept(this.json['type']) } }

  /**
  The amount of supply that has been dispensed. Includes unit of measure.
  @returns {Quantity}
  */
  quantity () { if (this.json['quantity']) { return new Quantity(this.json['quantity']) } }

  /**
  Identifies the medication or substance or device being dispensed. This is either a link to a resource representing the details of the item or a simple attribute carrying a code that identifies the item from a known list.
  @returns {Reference}
  */
  suppliedItem () { if (this.json['suppliedItem']) { return new Reference(this.json['suppliedItem']) } }

  /**
  The individual responsible for dispensing the medication, supplier or device.
  @returns {Reference}
  */
  supplier () { if (this.json['supplier']) { return new Reference(this.json['supplier']) } }

  /**
  The time the dispense event occurred.
  @returns {Period}
  */
  whenPrepared () { if (this.json['whenPrepared']) { return new Period(this.json['whenPrepared']) } }

  /**
  The time the dispensed item was sent or handed to the patient (or agent).
  @returns {Period}
  */
  whenHandedOver () { if (this.json['whenHandedOver']) { return new Period(this.json['whenHandedOver']) } }

  /**
  Identification of the facility/location where the Supply was shipped to, as part of the dispense event.
  @returns {Reference}
  */
  destination () { if (this.json['destination']) { return new Reference(this.json['destination']) } }

  /**
  Identifies the person who picked up the Supply.
  @returns {Array} an array of {@link Reference} objects
  */
  receiver () {
    if (this.json['receiver']) {
      return this.json['receiver'].map(item => new Reference(item))
    }
  }
}

/**
A supply - a  request for something, and provision of what is supplied.
@class Supply
@exports Supply as Supply
*/
export class Supply extends DomainResource {
  /**
  Category of supply, e.g.  central, non-stock, etc. This is used to support work flows associated with the supply process.
  @returns {CodeableConcept}
  */
  kind () { if (this.json['kind']) { return new CodeableConcept(this.json['kind']) } }

  /**
  Unique identifier for this supply request.
  @returns {Identifier}
  */
  identifier () { if (this.json['identifier']) { return new Identifier(this.json['identifier']) } }

  /**
  Status of the supply request.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  The item that is requested to be supplied.
  @returns {Reference}
  */
  orderedItem () { if (this.json['orderedItem']) { return new Reference(this.json['orderedItem']) } }

  /**
  A link to a resource representing the person whom the ordered item is for.
  @returns {Reference}
  */
  patient () { if (this.json['patient']) { return new Reference(this.json['patient']) } }

  /**
  Indicates the details of the dispense event such as the days supply and quantity of a supply dispensed.
  @returns {Array} an array of {@link SupplyDispenseComponent} objects
  */
  dispense () {
    if (this.json['dispense']) {
      return this.json['dispense'].map(item => new SupplyDispenseComponent(item))
    }
  }
}
