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
import { Identifier, DomainResource, Reference, CodeableConcept } from './core'

/**
A manifest that defines a set of documents.
@class DocumentManifest
@exports DocumentManifest as DocumentManifest
*/
export class DocumentManifest extends DomainResource {
  /**
  A single identifier that uniquely identifies this manifest. Principally used to refer to the manifest in non-FHIR contexts.
  @returns {Identifier}
  */
  masterIdentifier () { if (this.json['masterIdentifier']) { return new Identifier(this.json['masterIdentifier']) } }

  /**
  Other identifiers associated with the document, including version independent, source record and workflow related identifiers.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map((item) => new Identifier(item))
    }
  }

  /**
  Who or what the set of documents is about. The documents can be about a person, (patient or healthcare practitioner), a device (i.e. machine) or even a group of subjects (such as a document about a herd of farm animals, or a set of patients that share a common exposure). If the documents cross more than one subject, then more than one subject is allowed here (unusual use case).
  @returns {Array} an array of {@link Reference} objects
  */
  subject () {
    if (this.json['subject']) {
      return this.json['subject'].map(item => new Reference(item))
    }
  }

  /**
  A patient, practitioner, or organization for which this set of documents is intended.
  @returns {Array} an array of {@link Reference} objects
  */
  recipient () {
    if (this.json['recipient']) {
      return this.json['recipient'].map(item => new Reference(item))
    }
  }

  /**
  Specifies the kind of this set of documents (e.g. Patient Summary, Discharge Summary, Prescription, etc.). The type of a set of documents may be the same as one of the documents in it - especially if there is only one - but it may be wider.
  @returns {CodeableConcept}
  */
  type () { if (this.json['type']) { return new CodeableConcept(this.json['type']) } }

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
  When the document manifest was created for submission to the server (not necessarily the same thing as the actual resource last modified time, since it may be modified, replicated etc).
  @returns {Array} an array of {@link Date} objects
  */
  created () { if (this.json['created']) { return DT.DateTime.parse(this.json['created']) } }

  /**
  Identifies the source system, application, or software that produced the document manifest.
  @returns {Array} an array of {@link String} objects
  */
  source () { return this.json['source'] }

  /**
  The status of this document manifest.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  Whether this document manifest replaces another.
  @returns {Reference}
  */
  supercedes () { if (this.json['supercedes']) { return new Reference(this.json['supercedes']) } }

  /**
  Human-readable description of the source document. This is sometimes known as the "title".
  @returns {Array} an array of {@link String} objects
  */
  description () { return this.json['description'] }

  /**
  A code specifying the level of confidentiality of this set of Documents.
  @returns {CodeableConcept}
  */
  confidentiality () { if (this.json['confidentiality']) { return new CodeableConcept(this.json['confidentiality']) } }

  /**
  The list of resources that describe the parts of this document reference. Usually, these would be document references, but direct references to binary attachments and images are also allowed.
  @returns {Array} an array of {@link Reference} objects
  */
  content () {
    if (this.json['content']) {
      return this.json['content'].map(item => new Reference(item))
    }
  }
}

