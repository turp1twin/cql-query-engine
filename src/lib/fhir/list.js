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
import { Identifier, DomainResource, Reference, BackboneElement, CodeableConcept } from './core'

/**
Embedded class
@class ListEntryComponent
@exports  ListEntryComponent as ListEntryComponent
*/
class ListEntryComponent extends BackboneElement {
  /**
  The flag allows the system constructing the list to make one or more statements about the role and significance of the item in the list.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  flag () {
    if (this.json['flag']) {
      return this.json['flag'].map(item => new CodeableConcept(item))
    }
  }

  /**
  True if this item is marked as deleted in the list.
  @returns {Array} an array of {@link boolean} objects
  */
  deleted () { return this.json['deleted'] }

  /**
  When this item was added to the list.
  @returns {Array} an array of {@link Date} objects
  */
  date () { if (this.json['date']) { return DT.DateTime.parse(this.json['date']) } }

  /**
  A reference to the actual resource from which data was derived.
  @returns {Reference}
  */
  item () { if (this.json['item']) { return new Reference(this.json['item']) } }
}

/**
A set of information summarized from a list of other resources.
@class List
@exports List as List
*/
export class List extends DomainResource {
  /**
  Identifier for the List assigned for business purposes outside the context of FHIR.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  This code defines the purpose of the list - why it was created.
  @returns {CodeableConcept}
  */
  code () { if (this.json['code']) { return new CodeableConcept(this.json['code']) } }

  /**
  The common subject (or patient) of the resources that are in the list, if there is one.
  @returns {Reference}
  */
  subject () { if (this.json['subject']) { return new Reference(this.json['subject']) } }

  /**
  The entity responsible for deciding what the contents of the list were.
  @returns {Reference}
  */
  source () { if (this.json['source']) { return new Reference(this.json['source']) } }

  /**
  The date that the list was prepared.
  @returns {Array} an array of {@link Date} objects
  */
  date () { if (this.json['date']) { return DT.DateTime.parse(this.json['date']) } }

  /**
  Whether items in the list have a meaningful order.
  @returns {Array} an array of {@link boolean} objects
  */
  ordered () { return this.json['ordered'] }

  /**
  How this list was prepared - whether it is a working list that is suitable for being maintained on an ongoing basis, or if it represents a snapshot of a list of items from another source, or whether it is a prepared list where items may be marked as added, modified or deleted.
  @returns {Array} an array of {@link String} objects
  */
  mode () { return this.json['mode'] }

  /**
  Entries in this list.
  @returns {Array} an array of {@link ListEntryComponent} objects
  */
  entry () {
    if (this.json['entry']) {
      return this.json['entry'].map(item => new ListEntryComponent(item))
    }
  }

  /**
  If the list is empty, why the list is empty.
  @returns {CodeableConcept}
  */
  emptyReason () { if (this.json['emptyReason']) { return new CodeableConcept(this.json['emptyReason']) } }
}
