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
import { Identifier, DomainResource, Reference, BackboneElement, CodeableConcept } from './core'

/**
Embedded class
@class DeviceComponentProductionSpecificationComponent
@exports  DeviceComponentProductionSpecificationComponent as DeviceComponentProductionSpecificationComponent
*/
class DeviceComponentProductionSpecificationComponent extends BackboneElement {
  /**
  Describes the specification type, such as, serial number, part number, hardware revision, software revision, etc.
  @returns {CodeableConcept}
  */
  specType () { if (this.json['specType']) return new CodeableConcept(this.json['specType']) }

  /**
  Describes the internal component unique identification. This is a provision for manufacture specific standard components using a private OID. 11073-10101 has a partition for private OID semantic that the manufacture can make use of.
  @returns {Identifier}
  */
  componentId () { if (this.json['componentId']) return new Identifier(this.json['componentId']) }

  /**
  Describes the printable string defining the component.
  @returns {Array} an array of {@link String} objects
  */
  productionSpec () { return this.json['productionSpec'] }
}

/**
Describes the characteristics, operational status and capabilities of a medical-related component of a medical device.
@class DeviceComponent
@exports DeviceComponent as DeviceComponent
*/
export class DeviceComponent extends DomainResource {
  /**
  Describes the specific component type as defined in the object-oriented or metric nomenclature partition.
  @returns {CodeableConcept}
  */
  type () { if (this.json['type']) return new CodeableConcept(this.json['type']) }

  /**
  Describes the local assigned unique identification by the software. For example: handle ID.
  @returns {Identifier}
  */
  identifier () { if (this.json['identifier']) return new Identifier(this.json['identifier']) }

  /**
  Describes the timestamp for the most recent system change which includes device configuration or setting change.
  @returns {Array} an array of {@link Date} objects
  */
  lastSystemChange () { if (this.json['lastSystemChange']) return DT.DateTime.parse(this.json['lastSystemChange']) }

  /**
  Describes the link to the source Device that contains administrative device information such as manufacture, serial number, etc.
  @returns {Reference}
  */
  source () { if (this.json['source']) return new Reference(this.json['source']) }

  /**
  Describes the link to the parent resource. For example: Channel is linked to its VMD parent.
  @returns {Reference}
  */
  parent () { if (this.json['parent']) return new Reference(this.json['parent']) }

  /**
  Indicates current operational status of the device. For example: On, Off, Standby, etc.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  operationalStatus () {
    if (this.json['operationalStatus']) {
      return this.json['operationalStatus'].map(item => new CodeableConcept(item))
    }
  }

  /**
  Describes the parameter group supported by the current device component that is based on some nomenclature, e.g., cardiovascular.
  @returns {CodeableConcept}
  */
  parameterGroup () { if (this.json['parameterGroup']) return new CodeableConcept(this.json['parameterGroup']) }

  /**
  Describes the physical principle of the measurement. For example: thermal, chemical, acoustical, etc.
  @returns {Array} an array of {@link String} objects
  */
  measurementPrinciple () { return this.json['measurementPrinciple'] }

  /**
  Describes the production specification such as component revision, serial number, etc.
  @returns {Array} an array of {@link DeviceComponentProductionSpecificationComponent} objects
  */
  productionSpecification () {
    if (this.json['productionSpecification']) {
      return this.json['productionSpecification'].map(item => new DeviceComponentProductionSpecificationComponent(item))
    }
  }

  /**
  Describes the language code for the human-readable text string produced by the device. This language code will follow the IETF language tag. Example: en-US.
  @returns {CodeableConcept}
  */
  languageCode () { if (this.json['languageCode']) { return new CodeableConcept(this.json['languageCode']); } }
}

