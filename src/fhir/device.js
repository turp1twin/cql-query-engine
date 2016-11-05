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
import { Identifier, DomainResource, Reference, ContactPoint, CodeableConcept } from './core'

/**
This resource identifies an instance of a manufactured thing that is used in the provision of healthcare without being substantially changed through that activity. The device may be a machine, an insert, a computer, an application, etc. This includes durable (reusable) medical equipment as well as disposable equipment used for diagnostic, treatment, and research for healthcare and public health.
@class Device
@exports Device as Device
*/
export class Device extends DomainResource {
  /**
  Identifiers assigned to this device by various organizations. The most likely organizations to assign identifiers are the manufacturer and the owner, though regulatory agencies may also assign an identifier. The identifiers identify the particular device, not the kind of device.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  A kind of this device.
  @returns {CodeableConcept}
  */
  type () { if (this.json['type']) return new CodeableConcept(this.json['type']) }

  /**
  A name of the manufacturer.
  @returns {Array} an array of {@link String} objects
  */
  manufacturer () { return this.json['manufacturer'] }

  /**
  The "model" - an identifier assigned by the manufacturer to identify the product by its type. This number is shared by the all devices sold as the same type.
  @returns {Array} an array of {@link String} objects
  */
  model () { return this.json['model'] }

  /**
  The version of the device, if the device has multiple releases under the same model, or if the device is software or carries firmware.
  @returns {Array} an array of {@link String} objects
  */
  version () { return this.json['version'] }

  /**
  Date of expiry of this device (if applicable).
  @returns {Array} an array of {@link Date} objects
  */
  expiry () { if (this.json['expiry']) return DT.DateTime.parse(this.json['expiry']) }

  /**
  FDA Mandated Unique Device Identifier. Use the human readable information (the content that the user sees, which is sometimes different to the exact syntax represented in the barcode)  - see http://www.fda.gov/MedicalDevices/DeviceRegulationandGuidance/UniqueDeviceIdentification/default.htm.
  @returns {Array} an array of {@link String} objects
  */
  udi () { return this.json['udi'] }

  /**
  Lot number assigned by the manufacturer.
  @returns {Array} an array of {@link String} objects
  */
  lotNumber () { return this.json['lotNumber'] }

  /**
  An organization that is responsible for the provision and ongoing maintenance of the device.
  @returns {Reference}
  */
  owner () { if (this.json['owner']) return new Reference(this.json['owner']) }

  /**
  The resource may be found in a literal location (i.e. GPS coordinates), a logical place (i.e. "in/with the patient"), or a coded location.
  @returns {Reference}
  */
  location () { if (this.json['location']) return new Reference(this.json['location']) }

  /**
  Patient information, if the resource is affixed to a person.
  @returns {Reference}
  */
  patient () { if (this.json['patient']) return new Reference(this.json['patient']) }

  /**
  Contact details for an organization or a particular human that is responsible for the device.
  @returns {Array} an array of {@link ContactPoint} objects
  */
  contact () {
    if (this.json['contact']) {
      return this.json['contact'].map(item => new ContactPoint(item))
    }
  }

  /**
  A network address on which the device may be contacted directly.
  @returns {Array} an array of {@link String} objects
  */
  url () { return this.json['url'] }
}

