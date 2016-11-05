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
import { DomainResource, Reference, BackboneElement, Ratio, CodeableConcept, Quantity } from './core'

/**
Embedded class
@class MedicationProductIngredientComponent
@exports  MedicationProductIngredientComponent as MedicationProductIngredientComponent
*/
class MedicationProductIngredientComponent extends BackboneElement {
  /**
  The actual ingredient - either a substance (simple ingredient) or another medication.
  @returns {Reference}
  */
  item () { if (this.json['item']) { return new Reference(this.json['item']) } }

  /**
  Specifies how many (or how much) of the items there are in this Medication.  E.g. 250 mg per tablet.
  @returns {Ratio}
  */
  amount () { if (this.json['amount']) { return new Ratio(this.json['amount']) } }
}

/**
Embedded class
@class MedicationProductComponent
@exports  MedicationProductComponent as MedicationProductComponent
*/
class MedicationProductComponent extends BackboneElement {
  /**
  Describes the form of the item.  Powder; tables; carton.
  @returns {CodeableConcept}
  */
  form () { if (this.json['form']) { return new CodeableConcept(this.json['form']) } }

  /**
  Identifies a particular constituent of interest in the product.
  @returns {Array} an array of {@link MedicationProductIngredientComponent} objects
  */
  ingredient () {
    if (this.json['ingredient']) {
      return this.json['ingredient'].map(item => new MedicationProductIngredientComponent(item))
    }
  }
}

/**
Embedded class
@class MedicationPackageContentComponent
@exports  MedicationPackageContentComponent as MedicationPackageContentComponent
*/
class MedicationPackageContentComponent extends BackboneElement {
  /**
  Identifies one of the items in the package.
  @returns {Reference}
  */
  item () { if (this.json['item']) { return new Reference(this.json['item']) } }

  /**
  The amount of the product that is in the package.
  @returns {Quantity}
  */
  amount () { if (this.json['amount']) { return new Quantity(this.json['amount']) } }
}

/**
Embedded class
@class MedicationPackageComponent
@exports  MedicationPackageComponent as MedicationPackageComponent
*/
class MedicationPackageComponent extends BackboneElement {
  /**
  The kind of container that this package comes as.
  @returns {CodeableConcept}
  */
  container () { if (this.json['container']) { return new CodeableConcept(this.json['container']) } }

  /**
  A set of components that go to make up the described item.
  @returns {Array} an array of {@link MedicationPackageContentComponent} objects
  */
  content () {
    if (this.json['content']) {
      return this.json['content'].map(item => new MedicationPackageContentComponent(item))
    }
  }
}

/**
Primarily used for identification and definition of Medication, but also covers ingredients and packaging.
@class Medication
@exports Medication as Medication
*/
export class Medication extends DomainResource {
  /**
  The common/commercial name of the medication absent information such as strength, form, etc.  E.g. Acetaminophen, Tylenol 3, etc.  The fully coordinated name is communicated as the display of Medication.code.
  @returns {Array} an array of {@link String} objects
  */
  name () { return this.json['name'] }

  /**
  A code (or set of codes) that identify this medication.   Usage note: This could be a standard drug code such as a drug regulator code, RxNorm code, SNOMED CT code, etc. It could also be a local formulary code, optionally with translations to the standard drug codes.
  @returns {CodeableConcept}
  */
  code () { if (this.json['code']) { return new CodeableConcept(this.json['code']) } }

  /**
  Set to true if the item is attributable to a specific manufacturer (even if we don't know who that is).
  @returns {Array} an array of {@link boolean} objects
  */
  isBrand () { return this.json['isBrand'] }

  /**
  Describes the details of the manufacturer.
  @returns {Reference}
  */
  manufacturer () { if (this.json['manufacturer']) { return new Reference(this.json['manufacturer']) } }

  /**
  Medications are either a single administrable product or a package that contains one or more products.
  @returns {Array} an array of {@link String} objects
  */
  kind () { return this.json['kind'] }

  /**
  Information that only applies to products (not packages).
  @returns {MedicationProductComponent}
  */
  product () { if (this.json['product']) { return new MedicationProductComponent(this.json['product']) } }

  /**
  Information that only applies to packages (not products).
  @returns {MedicationPackageComponent}
  */
  package () { if (this.json['package']) { return new MedicationPackageComponent(this.json['package']) } }
}
