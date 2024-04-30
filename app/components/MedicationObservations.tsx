"use client";

import { PT_Serif } from "next/font/google";
import { Dispatch, SetStateAction } from "react";
import { useFormState } from "react-dom";
import { useState, useEffect } from "react";

const ptSerif = PT_Serif({ weight: ["400", "700"], subsets: ["latin"] });

const action = (
  prevState: {
    medicationAndDosage: string;
    prescribingPhysician: string;
    physicalExamination: string;
    testResults: string;
  } | null,
  formData: FormData
) => {
  const medicationAndDosage = String(formData.get("medication-and-dosage"));
  const prescribingPhysician = String(formData.get("prescribing-physician"));
  const physicalExamination = String(formData.get("physical-examination"));
  const testResults = String(formData.get("test-results"));
  return {
    medicationAndDosage,
    prescribingPhysician,
    physicalExamination,
    testResults,
  };
};

export default function MedicationObservations({
  setCurrentPage,
  setMedicationObservationsData,
}: {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setMedicationObservationsData: Dispatch<
    SetStateAction<null | {
      medicationAndDosage: string;
      prescribingPhysician: string;
      physicalExamination: string;
      testResults: string;
    }>
  >;
}) {
  const [state, formAction] = useFormState(action, null);

  useEffect(() => {
    if (state) setMedicationObservationsData(state);
  }, [state]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-8">
        <h2 className={`${ptSerif.className} font-normal text-4xl mb-6`}>
          Medication Observations
        </h2>
        <p className="text-[#999] text-sm">
          Current medications and clinical observations of the patient
        </p>
      </div>
      <form
        className="w-full flex flex-col items-center"
        action={formAction}
        onSubmit={() => {
          if (state !== null) {
            setCurrentPage(4);
          }
        }}
      >
        <div className="flex gap-4 w-[min(100%,_45rem)]">
          <div className="flex flex-col gap-2 mb-6 flex-1">
            <label
              className="text-xs text-[#666]"
              htmlFor="medication-and-dosage"
            >
              Name of Medication and Dosage
            </label>
            <input
              className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
              id="medication-and-dosage"
              name="medication-and-dosage"
              placeholder="Enter patient's current medication and dosage ..."
              required
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-2 mb-6 flex-1">
            <label
              className="text-xs text-[#666]"
              htmlFor="prescribing-physician"
            >
              Prescribing Physician
            </label>
            <input
              className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
              id="prescribing-physician"
              name="prescribing-physician"
              placeholder="Enter name of the prescribing physician of the patient ..."
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="flex gap-4 w-[min(100%,_45rem)]">
          <div className="flex flex-col gap-2 mb-6 flex-1">
            <label
              className="text-xs text-[#666]"
              htmlFor="physical-examination"
            >
              Physical Examination
            </label>
            <input
              className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
              id="physical-examination"
              name="physical-examination"
              placeholder="Enter any physical examinations of the patient ..."
              required
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-2 mb-6 flex-1">
            <label className="text-xs text-[#666]" htmlFor="test-results">
              Diagnostic Test Results
            </label>
            <input
              className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
              id="test-results"
              name="test-results"
              placeholder="Enter patient's diagnostic test results ..."
              required
              autoComplete="off"
            />
          </div>
        </div>
        <button
          className={`text-center ${
            state === null
              ? "text-[#290d6b] hover:text-white hover:bg-[#5630ae] hover:shadow-[inset_0_0_0_1px_#5630a] shadow-[inset_0_0_0_1px_#290d6b]"
              : "text-white bg-[#aaaaaa] shadow-[inset_0_0_0_1px_#aaaaaa]"
          } font-medium rounded-2xl p-4 text-base w-[min(100%,_45rem)] transition-all duration-300 mt-4`}
          disabled={state === null ? false : true}
        >
          {state === null ? "Save details" : "Saved!"}
        </button>
        <button
          className="text-center bg-[#290d6b] text-white font-medium rounded-2xl p-4 text-base w-[min(100%,_45rem)] hover:bg-[#5630ae] transition-all duration-300 mt-4"
          type="submit"
        >
          Submit record
        </button>
      </form>
    </div>
  );
}
