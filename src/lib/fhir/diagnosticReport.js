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
import { Identifier, DomainResource, Reference, BackboneElement, CodeableConcept, Attachment, Period } from './core'

/**
Embedded class
@class DiagnosticReportImageComponent
@exports  DiagnosticReportImageComponent as DiagnosticReportImageComponent
*/
class DiagnosticReportImageComponent extends BackboneElement {
  /**
  A comment about the image. Typically, this is used to provide an explanation for why the image is included, or to draw the viewer's attention to important features.
  @returns {Array} an array of {@link String} objects
  */
  comment () { return this.json['comment'] }

  /**
  Reference to the image source.
  @returns {Reference}
  */
  link () { if (this.json['link']) { return new Reference(this.json['link']) } }
}

/**
The findings and interpretation of diagnostic  tests performed on patients, groups of patients, devices, and locations, and/or specimens derived from these. The report includes clinical context such as requesting and provider information, and some mix of atomic results, images, textual and coded interpretation, and formatted representation of diagnostic reports.
@class DiagnosticReport
@exports DiagnosticReport as DiagnosticReport
*/
export class DiagnosticReport extends DomainResource {
  /**
  A code or name that describes this diagnostic report.
  @returns {CodeableConcept}
  */
  name () { if (this.json['name']) { return new CodeableConcept(this.json['name']) } }

  /**
  The status of the diagnostic report as a whole.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  The date and/or time that this version of the report was released from the source diagnostic service.
  @returns {Array} an array of {@link Date} objects
  */
  issued () { if (this.json['issued']) { return DT.DateTime.parse(this.json['issued']) } }

  /**
  The subject of the report. Usually, but not always, this is a patient. However diagnostic services also perform analyses on specimens collected from a variety of other sources.
  @returns {Reference}
  */
  subject () { if (this.json['subject']) { return new Reference(this.json['subject']) } }

  /**
  The diagnostic service that is responsible for issuing the report.
  @returns {Reference}
  */
  performer () { if (this.json['performer']) { return new Reference(this.json['performer']) } }

  /**
  The local ID assigned to the report by the order filler, usually by the Information System of the diagnostic service provider.
  @returns {Identifier}
  */
  identifier () { if (this.json['identifier']) { return new Identifier(this.json['identifier']) } }

  /**
  Details concerning a test requested.
  @returns {Array} an array of {@link Reference} objects
  */
  requestDetail () {
    if (this.json['requestDetail']) {
      return this.json['requestDetail'].map(item => new Reference(item))
    }
  }

  /**
  The section of the diagnostic service that performs the examination e.g. biochemistry, hematology, MRI.
  @returns {CodeableConcept}
  */
  serviceCategory () { if (this.json['serviceCategory']) { return new CodeableConcept(this.json['serviceCategory']) } }

  /**
  The time or time-period the observed values are related to. This is usually either the time of the procedure or of specimen collection(s), but very often the source of the date/time is not known, only the date/time itself.
  @returns {Array} an array of {@link Date} objects
  */
  diagnosticDateTime () { if (this.json['diagnosticDateTime']) { return DT.DateTime.parse(this.json['diagnosticDateTime']) } }
  /**
  The time or time-period the observed values are related to. This is usually either the time of the procedure or of specimen collection(s), but very often the source of the date/time is not known, only the date/time itself.
  @returns {Period}
  */
  diagnosticPeriod () { if (this.json['diagnosticPeriod']) { return new Period(this.json['diagnosticPeriod']) } }

  /**
  Details about the specimens on which this Disagnostic report is based.
  @returns {Array} an array of {@link Reference} objects
  */
  specimen () {
    if (this.json['specimen']) {
      return this.json['specimen'].map(item => new Reference(item))
    }
  }

  /**
  Observations that are part of this diagnostic report. Observations can be simple name/value pairs (e.g. "atomic" results), or they can be grouping observations that include references to other members of the group (e.g. "panels").
  @returns {Array} an array of {@link Reference} objects
  */
  result () {
    if (this.json['result']) {
      return this.json['result'].map(item => new Reference(item))
    }
  }

  /**
  One or more links to full details of any imaging performed during the diagnostic investigation. Typically, this is imaging performed by DICOM enabled modalities, but this is not required. A fully enabled PACS viewer can use this information to provide views of the source images.
  @returns {Array} an array of {@link Reference} objects
  */
  imagingStudy () {
    if (this.json['imagingStudy']) {
      return this.json['imagingStudy'].map(item => new Reference(item))
    }
  }

  /**
  A list of key images associated with this report. The images are generally created during the diagnostic process, and may be directly of the patient, or of treated specimens (i.e. slides of interest).
  @returns {Array} an array of {@link DiagnosticReportImageComponent} objects
  */
  image () {
    if (this.json['image']) {
      return this.json['image'].map(item => new DiagnosticReportImageComponent(item))
    }
  }

  /**
  Concise and clinically contextualized narrative interpretation of the diagnostic report.
  @returns {Array} an array of {@link String} objects
  */
  conclusion () { return this.json['conclusion'] }

  /**
  Codes for the conclusion.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  codedDiagnosis () {
    if (this.json['codedDiagnosis']) {
      return this.json['codedDiagnosis'].map(item => new CodeableConcept(item))
    }
  }

  /**
  Rich text representation of the entire result as issued by the diagnostic service. Multiple formats are allowed but they SHALL be semantically equivalent.
  @returns {Array} an array of {@link Attachment} objects
  */
  presentedForm () {
    if (this.json['presentedForm']) {
      return this.json['presentedForm'].map(item => new Attachment(item))
    }
  }
}

