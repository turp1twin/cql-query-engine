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
import { Resource, BackboneElement } from './core'

/**
Embedded class
@class BundleLinkComponent
@exports  BundleLinkComponent as BundleLinkComponent
*/
class BundleLinkComponent extends BackboneElement {
  /**
  A name which details the functional use for this link - see [[http://www.iana.org/assignments/link-relations/link-relations.xhtml]].
  @returns {Array} an array of {@link String} objects
  */
  relation () { return this.json['relation'] }

  /**
  The reference details for the link.
  @returns {Array} an array of {@link String} objects
  */
  url () { return this.json['url'] }
}

/**
Embedded class
@class BundleEntryDeletedComponent
@exports  BundleEntryDeletedComponent as BundleEntryDeletedComponent
*/
class BundleEntryDeletedComponent extends BackboneElement {
  /**
  The type of resource that was deleted (required to construct the identity).
  @returns {Array} an array of {@link String} objects
  */
  type () { return this.json['type'] }

  /**
  The id of the resource that was deleted.
  @returns {Array} an array of {@link String} objects
  */
  id () { return this.json['id'] }

  /**
  Version id for releted resource.
  @returns {Array} an array of {@link String} objects
  */
  versionId () { return this.json['versionId'] }

  /**
  The date/time that the resource was deleted.
  @returns {Array} an array of {@link Date} objects
  */
  instant () { if (this.json['instant']) return DT.DateTime.parse(this.json['instant']) }
}

/**
Embedded class
@class BundleEntryComponent
@exports  BundleEntryComponent as BundleEntryComponent
*/
class BundleEntryComponent extends BackboneElement {
  /**
  The Base URL for the resource, if different to the base URL specified for the bundle as a whole.
  @returns {Array} an array of {@link String} objects
  */
  base () { return this.json['base'] }

  /**
  The status of a resource in the bundle. Used for search (to differentiate between resources included as a match, and resources included as an _include), for history (deleted resources), and for transactions (create/update/delete).
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  Search URL for this resource when processing a transaction (see transaction documentation).
  @returns {Array} an array of {@link String} objects
  */
  search () { return this.json['search'] }

  /**
  When searching, the server's search ranking score for the entry.
  @returns {Array} an array of {@link Number} objects
  */
  score () { return this.json['score'] }

  /**
  If this is an entry that represents a deleted resource. Only used when the bundle is a transaction or a history type. See RESTful API documentation for further informatino.
  @returns {BundleEntryDeletedComponent}
  */
  deleted () { if (this.json['deleted']) return new BundleEntryDeletedComponent(this.json['deleted']) }

  /**
  The Resources for the entry.
  @returns {Resource}
  */
  resource () {
    if (this.json['resource']) {
      const typeName = this.json['resource'].resourceType
      const Req = require(`./${typeName.toLowerCase()}`)[typeName]
      return new Req(this.json['resource'])
    }
  }
}

/**
A container for a group of resources.
@class Bundle
@exports Bundle as Bundle
*/
export class Bundle extends Resource {
  /**
  Indicates the purpose of this bundle- how it was intended to be used.
  @returns {Array} an array of {@link String} objects
  */
  type () { return this.json['type'] }

  /**
  The base URL for the service that provided these resources. All relative URLs are relative to this one (equivalent to xml:base).
  @returns {Array} an array of {@link String} objects
  */
  base () { return this.json['base'] }

  /**
  If a set of search matches, this is the total number of matches for the search (as opposed to the number of results in this bundle).
  @returns {Array} an array of {@link Number} objects
  */
  total () { return this.json['total'] }

  /**
  A series of links that provide context to this bundle.
  @returns {Array} an array of {@link BundleLinkComponent} objects
  */
  link () {
    if (this.json['link']) {
      return this.json['link'].map(item => new BundleLinkComponent(item))
    }
  }

  /**
  An entry in a bundle resource - will either contain a resource, or a deleted entry (transaction and history bundles only).
  @returns {Array} an array of {@link BundleEntryComponent} objects
  */
  entry () {
    if (this.json['entry']) {
      return this.json['entry'].map(item => new BundleEntryComponent(item))
    }
  }

  /**
  XML Digital Signature - base64 encoded.
  @returns {Array} an array of {@link } objects
  */
  signature () { return this.json['signature'] }
}

