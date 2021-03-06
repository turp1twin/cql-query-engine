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
import { Identifier, DomainResource, Reference, BackboneElement, CodeableConcept, Period, Timing, Ratio, Quantity, Duration } from './core'

/**
Embedded class
@class MedicationPrescriptionDosageInstructionComponent
@exports  MedicationPrescriptionDosageInstructionComponent as MedicationPrescriptionDosageInstructionComponent
*/
class MedicationPrescriptionDosageInstructionComponent extends BackboneElement {
  /**
  Free text dosage instructions for cases where the instructions are too complex to code.
  @returns {Array} an array of {@link String} objects
  */
  text () { return this.json['text'] }

  /**
  Additional instructions such as "Swallow with plenty of water" which may or may not be coded.
  @returns {CodeableConcept}
  */
  additionalInstructions () { if (this.json['additionalInstructions']) { return new CodeableConcept(this.json['additionalInstructions']) } }

  /**
  The timing schedule for giving the medication to the patient.  The Schedule data type allows many different expressions, for example.  "Every  8 hours"; "Three times a day"; "1/2 an hour before breakfast for 10 days from 23-Dec 2011:";  "15 Oct 2013, 17 Oct 2013 and 1 Nov 2013".
  @returns {Array} an array of {@link Date} objects
  */
  scheduledDateTime () { if (this.json['scheduledDateTime']) { return DT.DateTime.parse(this.json['scheduledDateTime']) } }

  /**
  The timing schedule for giving the medication to the patient.  The Schedule data type allows many different expressions, for example.  "Every  8 hours"; "Three times a day"; "1/2 an hour before breakfast for 10 days from 23-Dec 2011:";  "15 Oct 2013, 17 Oct 2013 and 1 Nov 2013".
  @returns {Period}
  */
  scheduledPeriod () { if (this.json['scheduledPeriod']) { return new Period(this.json['scheduledPeriod']) } }

  /**
  The timing schedule for giving the medication to the patient.  The Schedule data type allows many different expressions, for example.  "Every  8 hours"; "Three times a day"; "1/2 an hour before breakfast for 10 days from 23-Dec 2011:";  "15 Oct 2013, 17 Oct 2013 and 1 Nov 2013".
  @returns {Timing}
  */
  scheduledTiming () { if (this.json['scheduledTiming']) { return new Timing(this.json['scheduledTiming']) } }

  /**
  If set to true or if specified as a CodeableConcept, indicates that the medication is only taken when needed within the specified schedule rather than at every scheduled dose.  If a CodeableConcept is present, it indicates the pre-condition for taking the Medication.
  @returns {Array} an array of {@link boolean} objects
  */
  asNeededBoolean () { return this.json['asNeededBoolean'] }

  /**
  If set to true or if specified as a CodeableConcept, indicates that the medication is only taken when needed within the specified schedule rather than at every scheduled dose.  If a CodeableConcept is present, it indicates the pre-condition for taking the Medication.
  @returns {CodeableConcept}
  */
  asNeededCodeableConcept () { if (this.json['asNeededCodeableConcept']) { return new CodeableConcept(this.json['asNeededCodeableConcept']) } }

  /**
  A coded specification of the anatomic site where the medication first enters the body.
  @returns {CodeableConcept}
  */
  site () { if (this.json['site']) { return new CodeableConcept(this.json['site']) } }

  /**
  A code specifying the route or physiological path of administration of a therapeutic agent into or onto a patient.
  @returns {CodeableConcept}
  */
  route () { if (this.json['route']) { return new CodeableConcept(this.json['route']) } }

  /**
  A coded value indicating the method by which the medication is introduced into or onto the body. Most commonly used for injections.  Examples:  Slow Push; Deep IV.

Terminologies used often pre-coordinate this term with the route and or form of administration.
  @returns {CodeableConcept}
  */
  method () { if (this.json['method']) { return new CodeableConcept(this.json['method']) } }

  /**
  The amount of therapeutic or other substance given at one administration event.
  @returns {Quantity}
  */
  doseQuantity () { if (this.json['doseQuantity']) { return new Quantity(this.json['doseQuantity']) } }

  /**
  Identifies the speed with which the substance is introduced into the subject. Typically the rate for an infusion. 200ml in 2 hours.
  @returns {Ratio}
  */
  rate () { if (this.json['rate']) { return new Ratio(this.json['rate']) } }

  /**
  The maximum total quantity of a therapeutic substance that may be administered to a subject over the period of time. E.g. 1000mg in 24 hours.
  @returns {Ratio}
  */
  maxDosePerPeriod () { if (this.json['maxDosePerPeriod']) { return new Ratio(this.json['maxDosePerPeriod']) } }
}

/**
Embedded class
@class MedicationPrescriptionDispenseComponent
@exports  MedicationPrescriptionDispenseComponent as MedicationPrescriptionDispenseComponent
*/
class MedicationPrescriptionDispenseComponent extends BackboneElement {
  /**
  Identifies the medication that is to be dispensed.  This may be a more specifically defined than the medicationPrescription.medication . This is either a link to a resource representing the details of the medication or a simple attribute carrying a code that identifies the medication from a known list of medications.
  @returns {Reference}
  */
  medication () { if (this.json['medication']) { return new Reference(this.json['medication']) } }

  /**
  Design Comments: This indicates the validity period of a prescription (stale dating the Prescription)
It reflects the prescriber perspective for the validity of the prescription. Dispenses must not be made against the prescription outside of this period. The lower-bound of the Dispensing Window signifies the earliest date that the prescription can be filled for the first time. If an upper-bound is not specified then the Prescription is open-ended or will default to a stale-date based on regulations.
Rationale: Indicates when the Prescription becomes valid, and when it ceases to be a dispensable Prescription.
  @returns {Period}
  */
  validityPeriod () { if (this.json['validityPeriod']) { return new Period(this.json['validityPeriod']) } }

  /**
  An integer indicating the number of repeats of the Dispense.
UsageNotes: For example, the number of times the prescribed quantity is to be supplied including the initial standard fill.
  @returns {Array} an array of {@link Number} objects
  */
  numberOfRepeatsAllowed () { return this.json['numberOfRepeatsAllowed'] }

  /**
  The amount that is to be dispensed.
  @returns {Quantity}
  */
  quantity () { if (this.json['quantity']) { return new Quantity(this.json['quantity']) } }

  /**
  Identifies the period time over which the supplied product is expected to be used, or the length of time the dispense is expected to last.
In some situations, this attribute may be used instead of quantity to identify the amount supplied by how long it is expected to last, rather than the physical quantity issued, e.g. 90 days supply of medication (based on an ordered dosage) When possible, it is always better to specify quantity, as this tends to be more precise. expectedSupplyDuration will always be an estimate that can be influenced by external factors.
  @returns {Duration}
  */
  expectedSupplyDuration () { if (this.json['expectedSupplyDuration']) { return new Duration(this.json['expectedSupplyDuration']) } }
}

/**
Embedded class
@class MedicationPrescriptionSubstitutionComponent
@exports  MedicationPrescriptionSubstitutionComponent as MedicationPrescriptionSubstitutionComponent
*/
class MedicationPrescriptionSubstitutionComponent extends BackboneElement {
  /**
  A code signifying whether a different drug should be dispensed from what was prescribed.
  @returns {CodeableConcept}
  */
  type () { if (this.json['type']) { return new CodeableConcept(this.json['type']) } }

  /**
  Indicates the reason for the substitution, or why substitution must or must not be performed.
  @returns {CodeableConcept}
  */
  reason () { if (this.json['reason']) { return new CodeableConcept(this.json['reason']) } }
}

/**
An order for both supply of the medication and the instructions for administration of the medicine to a patient.
@class MedicationPrescription
@exports MedicationPrescription as MedicationPrescription
*/
export class MedicationPrescription extends DomainResource {
  /**
  External identifier - one that would be used by another non-FHIR system - for example a re-imbursement system might issue its own id for each prescription that is created.  This is particularly important where FHIR only provides part of an erntire workflow process where records have to be tracked through an entire system.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier () {
    if (this.json['identifier']) {
      return this.json['identifier'].map(item => new Identifier(item))
    }
  }

  /**
  The date (and perhaps time) when the prescription was written.
  @returns {Array} an array of {@link Date} objects
  */
  dateWritten () { if (this.json['dateWritten']) { return DT.DateTime.parse(this.json['dateWritten']) } }

  /**
  A code specifying the state of the order.  Generally this will be active or completed state.
  @returns {Array} an array of {@link String} objects
  */
  status () { return this.json['status'] }

  /**
  A link to a resource representing the person to whom the medication will be given.
  @returns {Reference}
  */
  patient () { if (this.json['patient']) { return new Reference(this.json['patient']) } }

  /**
  The healthcare professional responsible for authorizing the prescription.
  @returns {Reference}
  */
  prescriber () { if (this.json['prescriber']) { return new Reference(this.json['prescriber']) } }

  /**
  A link to a resource that identifies the particular occurrence of contact between patient and health care provider.
  @returns {Reference}
  */
  encounter () { if (this.json['encounter']) { return new Reference(this.json['encounter']) } }

  /**
  Can be the reason or the indication for writing the prescription.
  @returns {CodeableConcept}
  */
  reasonCodeableConcept () { if (this.json['reasonCodeableConcept']) { return new CodeableConcept(this.json['reasonCodeableConcept']) } }

  /**
  Can be the reason or the indication for writing the prescription.
  @returns {Reference}
  */
  reasonReference () { if (this.json['reasonReference']) { return new Reference(this.json['reasonReference']) } }

  /**
  Identifies the medication being administered. This is either a link to a resource representing the details of the medication or a simple attribute carrying a code that identifies the medication from a known list of medications.
  @returns {Reference}
  */
  medication () { if (this.json['medication']) { return new Reference(this.json['medication']) } }

  /**
  Indicates how the medication is to be used by the patient.
  @returns {Array} an array of {@link MedicationPrescriptionDosageInstructionComponent} objects
  */
  dosageInstruction () {
    if (this.json['dosageInstruction']) {
      return this.json['dosageInstruction'].map(item => new MedicationPrescriptionDosageInstructionComponent(item))
    }
  }

  /**
  Deals with details of the dispense part of the order.
  @returns {MedicationPrescriptionDispenseComponent}
  */
  dispense () { if (this.json['dispense']) { return new MedicationPrescriptionDispenseComponent(this.json['dispense']) } }

  /**
  Indicates whether or not substitution can or should be part of the dispense. In some cases substitution must happen, in other cases substitution must not happen, and in others it does not matter. This block explains the prescriber's intent. If nothing is specified substitution may be done.
  @returns {MedicationPrescriptionSubstitutionComponent}
  */
  substitution () { if (this.json['substitution']) { return new MedicationPrescriptionSubstitutionComponent(this.json['substitution']) } }
}

