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
import { Identifier, DomainResource, Reference, BackboneElement, CodeableConcept, Period } from './core'

/**
Embedded class
@class DocumentReferenceRelatesToComponent
@exports  DocumentReferenceRelatesToComponent as DocumentReferenceRelatesToComponent
*/
class DocumentReferenceRelatesToComponent extends BackboneElement {
  /**
  The type of relationship that this document has with anther document.
  @returns {Array} an array of {@link String} objects
  */
  code () { return this.json['code'] }

  /**
  The target document of this relationship.
  @returns {Reference}
  */
  target () { if (this.json['target']) { return new Reference(this.json['target']) } }
}

/**
Embedded class
@class DocumentReferenceServiceParameterComponent
@exports  DocumentReferenceServiceParameterComponent as DocumentReferenceServiceParameterComponent
*/
class DocumentReferenceServiceParameterComponent extends BackboneElement {
  /**
  The name of a parameter.
  @returns {Array} an array of {@link String} objects
  */
  name () { return this.json['name'] }

  /**
  The value of the named parameter.
  @returns {Array} an array of {@link String} objects
  */
  value () { return this.json['value'] }
}

/**
Embedded class
@class DocumentReferenceServiceComponent
@exports  DocumentReferenceServiceComponent as DocumentReferenceServiceComponent
*/
class DocumentReferenceServiceComponent extends BackboneElement {
  /**
  The type of the service that can be used to access the documents.
  @returns {CodeableConcept}
  */
  type () { if (this.json['type']) { return new CodeableConcept(this.json['type']) } }

  /**
  Where the service end-point is located.
  @returns {Array} an array of {@link String} objects
  */
  address () { return this.json['address'] }

  /**
  A list of named parameters that is used in the service call.
  @returns {Array} an array of {@link DocumentReferenceServiceParameterComponent} objects
  */
  parameter () {
    if (this.json['parameter']) {
      return this.json['parameter'].map(item => new DocumentReferenceServiceParameterComponent(item))
    }
  }
}

/**
Embedded class
@class DocumentReferenceContextComponent
@exports  DocumentReferenceContextComponent as DocumentReferenceContextComponent
*/
class DocumentReferenceContextComponent extends BackboneElement {
  /**
  This list of codes represents the main clinical acts, such as a colonoscopy or an appendectomy, being documented. In some cases, the event is inherent in the typeCode, such as a "History and Physical Report" in which the procedure being documented is necessarily a "History and Physical" act.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  event () {
    if (this.json['event']) {
      return this.json['event'].map(item => new CodeableConcept(item))
    }
  }

  /**
  The time period over which the service that is described by the document was provided.
  @returns {Period}
  */
  period () { if (this.json['period']) { return new Period(this.json['period']) } }

  /**
  The kind of facility where the patient was seen.
  @returns {CodeableConcept}
  */
  facilityType () { if (this.json['facilityType']) { return new CodeableConcept(this.json['facilityType']) } }
}

/**
A reference to a document.
@class DocumentReference
@exports DocumentReference as DocumentReference
*/
export class DocumentReference extends DomainResource {
  /**
  Document identifier as assigned by the source of the document. This identifier is specific to this version of the document. This unique identifier may be used elsewhere to identify this version of the document.
  @returns {Identifier}
  */
  masterIdentifier () { if (this.json['masterIdentifier']) { return new Identifier(this.json['masterIdentifier']) } }

  /**
  Other identifiers associated with the document, including version independent, source record and workflow related identifiers.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  Who or what the document is about. The document can be about a person, (patient or healthcare practitioner), a device (I.e. machine) or even a group of subjects (such as a document about a herd of farm animals, or a set of patients that share a common exposure).
  @returns {Reference}
  */
  subject () { if (this.json['subject']) { return new Reference(this.json['subject']) } }

  /**
  Specifies the particular kind of document (e.g. Patient Summary, Discharge Summary, Prescription, etc.).
  @returns {CodeableConcept}
  */
  type () { if (this.json['type']) { return new CodeableConcept(this.json['type']) } }

  /**
  A categorization for the type of the document. This may be implied by or derived from the code specified in the Document Type.
  @returns {CodeableConcept}
  */
  class () { if (this.json['class']) { return new CodeableConcept(this.json['class']) } }

  /**
  Identifies who is responsible for adding the information to the document.
  @returns {Array} an array of {@link Reference} objects
  */
  author () {
    if (this.json['author']) {
      return this.json['author'].map(item => new Reference(item))
    }
  }

  /**
  Identifies the organization or group who is responsible for ongoing maintenance of and access to the document.
  @returns {Reference}
  */
  custodian () { if (this.json['custodian']) { return new Reference(this.json['custodian']) } }

  /**
  A reference to a domain or server that manages policies under which the document is accessed and/or made available.
  @returns {Array} an array of {@link String} objects
  */
  policyManager () { return this.json['policyManager'] }

  /**
  Which person or organization authenticates that this document is valid.
  @returns {Reference}
  */
  authenticator () { if (this.json['authenticator']) { return new Reference(this.json['authenticator']) } }

  /**
  When the document was created.
  @returns {Array} an array of {@link Date} objects
  */
  created () { if (this.json['created']) { return DT.DateTime.parse(this.json['created']) } }

  /**
  When the document reference was created.
  @returns {Array} an array of {@link Date} objects
  */
  indexed () { if (this.json['indexed']) { return DT.DateTime.parse(this.json['indexed']) } }

  /**
  The status of this document reference.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  The status of the underlying document.
  @returns {CodeableConcept}
  */
  docStatus () { if (this.json['docStatus']) { return new CodeableConcept(this.json['docStatus']) } }

  /**
  Relationships that this document has with other document references that already exist.
  @returns {Array} an array of {@link DocumentReferenceRelatesToComponent} objects
  */
  relatesTo () {
    if (this.json['relatesTo']) {
      return this.json['relatesTo'].map(item => new DocumentReferenceRelatesToComponent(item))
    }
  }

  /**
  Human-readable description of the source document. This is sometimes known as the "title".
  @returns {Array} an array of {@link String} objects
  */
  description () { return this.json['description'] }

  /**
  A code specifying the level of confidentiality of the XDS Document.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  confidentiality () {
    if (this.json['confidentiality']) {
      return this.json['confidentiality'].map(item => new CodeableConcept(item))
    }
  }

  /**
  The primary language in which the source document is written.
  @returns {Array} an array of {@link String} objects
  */
  primaryLanguage () { return this.json['primaryLanguage'] }

  /**
  The mime type of the source document.
  @returns {Array} an array of {@link String} objects
  */
  mimeType () { return this.json['mimeType'] }

  /**
  An identifier that identifies that the format and content of the document conforms to additional rules beyond the base format indicated in the mimeType.
  @returns {Array} an array of {@link String} objects
  */
  format () { return this.json['format'] }

  /**
  The size of the source document this reference refers to in bytes.
  @returns {Array} an array of {@link Number} objects
  */
  size () { return this.json['size'] }

  /**
  A hash of the source document to ensure that changes have not occurred.
  @returns {Array} an array of {@link } objects
  */
  hash () { return this.json['hash'] }

  /**
  A url at which the document can be accessed.
  @returns {Array} an array of {@link String} objects
  */
  location () { return this.json['location'] }

  /**
  A description of a service call that can be used to retrieve the document.
  @returns {DocumentReferenceServiceComponent}
  */
  service () { if (this.json['service']) { return new DocumentReferenceServiceComponent(this.json['service']) } }

  /**
  The clinical context in which the document was prepared.
  @returns {DocumentReferenceContextComponent}
  */
  context () { if (this.json['context']) { return new DocumentReferenceContextComponent(this.json['context']) } }
}

