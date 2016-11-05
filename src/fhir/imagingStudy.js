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
import { Identifier, DomainResource, Reference, BackboneElement, Coding } from './core'

/**
Embedded class
@class ImagingStudySeriesInstanceComponent
@exports  ImagingStudySeriesInstanceComponent as ImagingStudySeriesInstanceComponent
*/
class ImagingStudySeriesInstanceComponent extends BackboneElement {
  /**
  The number of this image in the series.
  @returns {Array} an array of {@link Number} objects
  */
  number () { return this.json['number'] }

  /**
  Formal identifier for this image.
  @returns {oid}
  */
  uid () { if (this.json['uid']) { return new oid(this.json['uid']) } }

  /**
  DICOM Image type.
  @returns {oid}
  */
  sopclass () { if (this.json['sopclass']) { return new oid(this.json['sopclass']) } }

  /**
  The type of the instance.
  @returns {Array} an array of {@link String} objects
  */
  type () { return this.json['type'] }

  /**
  The description of the instance.
  @returns {Array} an array of {@link String} objects
  */
  title () { return this.json['title'] }

  /**
  WADO-RS url where image is available.
  @returns {Array} an array of {@link String} objects
  */
  url () { return this.json['url'] }

  /**
  A FHIR resource with content for this instance.
  @returns {Reference}
  */
  attachment () { if (this.json['attachment']) { return new Reference(this.json['attachment']) } }
}

/**
Embedded class
@class ImagingStudySeriesComponent
@exports  ImagingStudySeriesComponent as ImagingStudySeriesComponent
*/
class ImagingStudySeriesComponent extends BackboneElement {
  /**
  The Numeric identifier of this series in the study.
  @returns {Array} an array of {@link Number} objects
  */
  number () { return this.json['number'] }

  /**
  The modality of this series sequence.
  @returns {Array} an array of {@link String} objects
  */
  modality () { return this.json['modality'] }

  /**
  Formal identifier for this series.
  @returns {oid}
  */
  uid () { if (this.json['uid']) { return new oid(this.json['uid']) } }

  /**
  A description of the series.
  @returns {Array} an array of {@link String} objects
  */
  description () { return this.json['description'] }

  /**
  Sequence that contains attributes from the.
  @returns {Array} an array of {@link Number} objects
  */
  numberOfInstances () { return this.json['numberOfInstances'] }

  /**
  Availability of series (online, offline or nearline).
  @returns {Array} an array of {@link String} objects
  */
  availability () { return this.json['availability'] }

  /**
  WADO-RS URI where Series is available.
  @returns {Array} an array of {@link String} objects
  */
  url () { return this.json['url'] }

  /**
  Body part examined. See  DICOM Part 16 Annex L for the mapping from DICOM to Snomed.
  @returns {Coding}
  */
  bodySite () { if (this.json['bodySite']) { return new Coding(this.json['bodySite']) } }

  /**
  The date when the series was started.
  @returns {Array} an array of {@link Date} objects
  */
  dateTime () { if (this.json['dateTime']) { return DT.DateTime.parse(this.json['dateTime']) } }

  /**
  A single image taken from a patient.
  @returns {Array} an array of {@link ImagingStudySeriesInstanceComponent} objects
  */
  instance () {
    if (this.json['instance']) {
      return this.json['instance'].map(item => new ImagingStudySeriesInstanceComponent(item))
    }
  }
}

/**
Representation of the content produced in a DICOM imaging study. A study comprises a set of Series, each of which includes a set of Service-Object Pair Instances (SOP Instances - images or other data) acquired or produced in a common context.  A Series is of only one modality (e.g., X-ray, CT, MR, ultrasound), but a Study may have multiple Series of different modalities.
@class ImagingStudy
@exports ImagingStudy as ImagingStudy
*/
export class ImagingStudy extends DomainResource {
  /**
  Date and Time the study started.
  @returns {Array} an array of {@link Date} objects
  */
  started () { if (this.json['started']) { return DT.DateTime.parse(this.json['started']) } }

  /**
  The patient for whom the images are of.
  @returns {Reference}
  */
  patient () { if (this.json['patient']) { return new Reference(this.json['patient']) } }

  /**
  Formal identifier for the study.
  @returns {oid}
  */
  uid () { if (this.json['uid']) { return new oid(this.json['uid']) } }

  /**
  Accession Number.
  @returns {Identifier}
  */
  accession () { if (this.json['accession']) { return new Identifier(this.json['accession']) } }

  /**
  Other identifiers for the study.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  A list of the diagnostic orders that resulted in this imaging study being performed.
  @returns {Array} an array of {@link Reference} objects
  */
  order () {
    if (this.json['order']) {
      return this.json['order'].map(item => new Reference(item))
    }
  }

  /**
  A list of all the Series.ImageModality values that are actual acquisition modalities, i.e. those in the DICOM Context Group 29 (value set OID 1.2.840.10008.6.1.19).
  @returns {Array} an array of {@link String} objects
  */
  modalityList () { return this.json['modalityList'] }

  /**
  The requesting/referring physician.
  @returns {Reference}
  */
  referrer () { if (this.json['referrer']) { return new Reference(this.json['referrer']) } }

  /**
  Availability of study (online, offline or nearline).
  @returns {Array} an array of {@link String} objects
  */
  availability () { return this.json['availability'] }

  /**
  WADO-RS URI where Study is available.
  @returns {Array} an array of {@link String} objects
  */
  url () { return this.json['url'] }

  /**
  Number of Series in Study.
  @returns {Array} an array of {@link Number} objects
  */
  numberOfSeries () { return this.json['numberOfSeries'] }

  /**
  Number of SOP Instances in Study.
  @returns {Array} an array of {@link Number} objects
  */
  numberOfInstances () { return this.json['numberOfInstances'] }

  /**
  Diagnoses etc provided with request.
  @returns {Array} an array of {@link String} objects
  */
  clinicalInformation () { return this.json['clinicalInformation'] }

  /**
  Type of procedure performed.
  @returns {Array} an array of {@link Coding} objects
  */
  procedure () {
    if (this.json['procedure']) {
      return this.json['procedure'].map(item => new Coding(item))
    }
  }

  /**
  Who read study and interpreted the images.
  @returns {Reference}
  */
  interpreter () { if (this.json['interpreter']) { return new Reference(this.json['interpreter']) } }

  /**
  Institution-generated description or classification of the Study (component) performed.
  @returns {Array} an array of {@link String} objects
  */
  description () { return this.json['description'] }

  /**
  Each study has one or more series of image instances.
  @returns {Array} an array of {@link ImagingStudySeriesComponent} objects
  */
  series () {
    if (this.json['series']) {
      return this.json['series'].map(item => new ImagingStudySeriesComponent(item))
    }
  }
}
