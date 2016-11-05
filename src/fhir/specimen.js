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
import { Identifier, DomainResource, Reference, BackboneElement, Period, Quantity, CodeableConcept } from './core'

/**
Embedded class
@class SpecimenSourceComponent
@exports  SpecimenSourceComponent as SpecimenSourceComponent
*/
class SpecimenSourceComponent extends BackboneElement {
  /**
  Whether this relationship is to a parent or to a child.
  @returns {Array} an array of {@link String} objects
  */
  relationship () { return this.json['relationship'] }

  /**
  The specimen resource that is the target of this relationship.
  @returns {Array} an array of {@link Reference} objects
  */
  target () {
    if (this.json['target']) {
      return this.json['target'].map(item => new Reference(item))
    }
  }
}

/**
Embedded class
@class SpecimenCollectionComponent
@exports  SpecimenCollectionComponent as SpecimenCollectionComponent
*/
class SpecimenCollectionComponent extends BackboneElement {
  /**
  Person who collected the specimen.
  @returns {Reference}
  */
  collector () { if (this.json['collector']) { return new Reference(this.json['collector']) } }

  /**
  To communicate any details or issues encountered during the specimen collection procedure.
  @returns {Array} an array of {@link String} objects
  */
  comment () { return this.json['comment'] }

  /**
  Time when specimen was collected from subject - the physiologically relevant time.
  @returns {Array} an array of {@link Date} objects
  */
  collectedDateTime () { if (this.json['collectedDateTime']) { return DT.DateTime.parse(this.json['collectedDateTime']) } }

  /**
  Time when specimen was collected from subject - the physiologically relevant time.
  @returns {Period}
  */
  collectedPeriod () { if (this.json['collectedPeriod']) { return new Period(this.json['collectedPeriod']) } }

  /**
  The quantity of specimen collected; for instance the volume of a blood sample, or the physical measurement of an anatomic pathology sample.
  @returns {Quantity}
  */
  quantity () { if (this.json['quantity']) { return new Quantity(this.json['quantity']) } }

  /**
  A coded value specifying the technique that is used to perform the procedure.
  @returns {CodeableConcept}
  */
  method () { if (this.json['method']) { return new CodeableConcept(this.json['method']) } }

  /**
  Anatomical location from which the specimen should be collected (if subject is a patient). This element is not used for environmental specimens.
  @returns {CodeableConcept}
  */
  sourceSite () { if (this.json['sourceSite']) { return new CodeableConcept(this.json['sourceSite']) } }
}

/**
Embedded class
@class SpecimenTreatmentComponent
@exports  SpecimenTreatmentComponent as SpecimenTreatmentComponent
*/
class SpecimenTreatmentComponent extends BackboneElement {
  /**
  Textual description of procedure.
  @returns {Array} an array of {@link String} objects
  */
  description () { return this.json['description'] }

  /**
  A coded value specifying the procedure used to process the specimen.
  @returns {CodeableConcept}
  */
  procedure () { if (this.json['procedure']) { return new CodeableConcept(this.json['procedure']) } }

  /**
  Material used in the processing step.
  @returns {Array} an array of {@link Reference} objects
  */
  additive () {
    if (this.json['additive']) {
      return this.json['additive'].map(item => new Reference(item))
    }
  }
}

/**
Embedded class
@class SpecimenContainerComponent
@exports  SpecimenContainerComponent as SpecimenContainerComponent
*/
class SpecimenContainerComponent extends BackboneElement {
  /**
  Id for container. There may be multiple; a manufacturer's bar code, lab assigned identifier, etc. The container ID may differ from the specimen id in some circumstances.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  Textual description of the container.
  @returns {Array} an array of {@link String} objects
  */
  description () { return this.json['description'] }

  /**
  The type of container associated with the specimen (e.g. slide, aliquot, etc).
  @returns {CodeableConcept}
  */
  type () { if (this.json['type']) { return new CodeableConcept(this.json['type']) } }

  /**
  The capacity (volume or other measure) the container may contain.
  @returns {Quantity}
  */
  capacity () { if (this.json['capacity']) { return new Quantity(this.json['capacity']) } }

  /**
  The quantity of specimen in the container; may be volume, dimensions, or other appropriate measurements, depending on the specimen type.
  @returns {Quantity}
  */
  specimenQuantity () { if (this.json['specimenQuantity']) { return new Quantity(this.json['specimenQuantity']) } }

  /**
  Introduced substance to preserve, maintain or enhance the specimen. examples: Formalin, Citrate, EDTA.
  @returns {CodeableConcept}
  */
  additiveCodeableConcept () { if (this.json['additiveCodeableConcept']) { return new CodeableConcept(this.json['additiveCodeableConcept']) } }

  /**
  Introduced substance to preserve, maintain or enhance the specimen. examples: Formalin, Citrate, EDTA.
  @returns {Reference}
  */
  additiveReference () { if (this.json['additiveReference']) { return new Reference(this.json['additiveReference']) } }
}

/**
Sample for analysis.
@class Specimen
@exports Specimen as Specimen
*/
export class Specimen extends DomainResource {
  /**
  Id for specimen.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  Kind of material that forms the specimen.
  @returns {CodeableConcept}
  */
  type () { if (this.json['type']) { return new CodeableConcept(this.json['type']) } }

  /**
  Parent specimen from which the focal specimen was a component.
  @returns {Array} an array of {@link SpecimenSourceComponent} objects
  */
  source () {
    if (this.json['source']) {
      return this.json['source'].map(item => new SpecimenSourceComponent(item))
    }
  }

  /**
  Where the specimen came from. This may be the patient(s) or from the environment or  a device.
  @returns {Reference}
  */
  subject () { if (this.json['subject']) { return new Reference(this.json['subject']) } }

  /**
  The identifier assigned by the lab when accessioning specimen(s). This is not necessarily the same as the specimen identifier, depending on local lab procedures.
  @returns {Identifier}
  */
  accessionIdentifier () { if (this.json['accessionIdentifier']) { return new Identifier(this.json['accessionIdentifier']) } }

  /**
  Time when specimen was received for processing or testing.
  @returns {Array} an array of {@link Date} objects
  */
  receivedTime () { if (this.json['receivedTime']) { return DT.DateTime.parse(this.json['receivedTime']) } }

  /**
  Details concerning the specimen collection.
  @returns {SpecimenCollectionComponent}
  */
  collection () { if (this.json['collection']) { return new SpecimenCollectionComponent(this.json['collection']) } }

  /**
  Details concerning treatment and processing steps for the specimen.
  @returns {Array} an array of {@link SpecimenTreatmentComponent} objects
  */
  treatment () {
    if (this.json['treatment']) {
      return this.json['treatment'].map(item => new SpecimenTreatmentComponent(item))
    }
  }

  /**
  The container holding the specimen.  The recursive nature of containers; i.e. blood in tube in tray in rack is not addressed here.
  @returns {Array} an array of {@link SpecimenContainerComponent} objects
  */
  container () {
    if (this.json['container']) {
      return this.json['container'].map(item => new SpecimenContainerComponent(item))
    }
  }
}
