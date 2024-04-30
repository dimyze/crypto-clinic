"use client";

import { PT_Serif } from "next/font/google";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";

const ptSerif = PT_Serif({ weight: ["400", "700"], subsets: ["latin"] });

const action = (
  prevState: {
    pastConditions: string;
    surgicalProcedures: string;
    allergies: string;
    familyHistory: string;
  } | null,
  formData: FormData
) => {
  const pastConditions = String(formData.get("past-conditions"));
  const surgicalProcedures = String(formData.get("surgical-procedures"));
  const allergies = String(formData.get("allergies"));
  const familyHistory = String(formData.get("family-history"));
  return {
    pastConditions,
    surgicalProcedures,
    allergies,
    familyHistory,
  };
};

export default function MedicalHistory({
  setCurrentPage,
  setMedicalHistoryData,
}: {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setMedicalHistoryData: Dispatch<
    SetStateAction<null | {
      pastConditions: string;
      surgicalProcedures: string;
      allergies: string;
      familyHistory: string;
    }>
  >;
}) {
  const [state, formAction] = useFormState(action, null);

  useEffect(() => {
    if (state) setMedicalHistoryData(state);
  }, [state]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-8">
        <h2 className={`${ptSerif.className} font-normal text-4xl mb-6`}>
          Medical History
        </h2>
        <p className="text-[#999] text-sm">
          Relevant medical history of the patient
        </p>
      </div>
      <form
        className="w-full flex flex-col items-center"
        action={formAction}
        onSubmit={() => {
          if (state !== null) {
            setCurrentPage(3);
          }
        }}
      >
        <div className="flex gap-4 w-[min(100%,_45rem)]">
          <div className="flex flex-col gap-2 mb-6 flex-1">
            <label className="text-xs text-[#666]" htmlFor="past-conditions">
              Past Conditions
            </label>
            <input
              className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
              id="past-conditions"
              name="past-conditions"
              placeholder="Enter patient's past conditions ..."
              required
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-2 mb-6 flex-1">
            <label
              className="text-xs text-[#666]"
              htmlFor="surgical-procedures"
            >
              Surgical Procedures
            </label>
            <input
              className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
              id="surgical-procedures"
              name="surgical-procedures"
              placeholder="Enter patient's surgical procedures"
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="flex gap-4 w-[min(100%,_45rem)]">
          <div className="flex flex-col gap-2 mb-6 flex-1">
            <label className="text-xs text-[#666]" htmlFor="allergies">
              Allergies
            </label>
            <input
              className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
              id="allergies"
              name="allergies"
              placeholder="Enter patient's allergies"
              required
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-2 mb-6 flex-1">
            <label className="text-xs text-[#666]" htmlFor="family-history">
              Family History
            </label>
            <input
              className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
              id="family-history"
              name="family-history"
              placeholder="Enter patient's familry history ..."
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
          Next (Medication Observations) {"->"}
        </button>
      </form>
    </div>
  );
}
