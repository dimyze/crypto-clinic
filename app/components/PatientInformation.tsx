"use client";

import { PT_Serif } from "next/font/google";
import { Dispatch, SetStateAction } from "react";
import { useFormState } from "react-dom";
import { useEffect } from "react";

const ptSerif = PT_Serif({ weight: ["400", "700"], subsets: ["latin"] });

const action = (
  prevState: {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    contactNumber: string;
    emergencyContactNumber: string;
    medicalRecordNumber: number;
  } | null,
  formData: FormData
) => {
  const fullName = String(formData.get("full-name"));
  const dateOfBirth = String(formData.get("date-of-birth"));
  const gender = String(formData.get("gender"));
  const contactNumber = String(formData.get("contact-number"));
  const emergencyContactNumber = String(
    formData.get("emergency-contact-number")
  );
  const medicalRecordNumber = Number(formData.get("medical-record-number"));
  return {
    fullName,
    dateOfBirth,
    gender,
    contactNumber,
    emergencyContactNumber,
    medicalRecordNumber,
  };
};

export default function PatientInformation({
  setCurrentPage,
  setPatientInformationData,
}: {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setPatientInformationData: Dispatch<
    SetStateAction<null | {
      fullName: string;
      dateOfBirth: string;
      gender: string;
      contactNumber: string;
      emergencyContactNumber: string;
      medicalRecordNumber: number;
    }>
  >;
}) {
  const [state, formAction] = useFormState(action, null);

  useEffect(() => {
    if (state) setPatientInformationData(state);
  }, [state]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-8">
        <h2 className={`${ptSerif.className} font-normal text-4xl mb-6`}>
          Patient Information
        </h2>
        <p className="text-[#999] text-sm">
          Important general information about the patient
        </p>
      </div>
      <form
        className="w-full flex flex-col items-center"
        action={formAction}
        onSubmit={() => {
          if (state !== null) {
            setCurrentPage(2);
          }
        }}
      >
        <div className="flex gap-4 w-[min(100%,_45rem)]">
          <div className="flex flex-col gap-2 mb-6 flex-1">
            <label className="text-xs text-[#666]" htmlFor="full-name">
              Full Name
            </label>
            <input
              className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
              id="full-name"
              name="full-name"
              placeholder="Enter patient's full name ..."
              required
              autoComplete="name"
            />
          </div>
          <div className="flex flex-col gap-2 mb-6 flex-1">
            <label className="text-xs text-[#666]" htmlFor="date-of-birth">
              Date of Birth
            </label>
            <input
              className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
              id="date-of-birth"
              name="date-of-birth"
              type="date"
              required
              autoComplete="bday"
            />
          </div>
        </div>
        <div className="flex gap-4 w-[min(100%,_45rem)]">
          <div className="flex flex-col gap-2 mb-6 flex-1">
            <label className="text-xs text-[#666]" htmlFor="gender">
              Gender
            </label>
            <div className="relative after:content-['↓'] after:top-[1.25rem] after:right-5 after:absolute after:text-sm">
              <select
                className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d] w-full"
                id="gender"
                name="gender"
                required
                autoComplete="sex"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-6 flex-1">
            <label className="text-xs text-[#666]" htmlFor="contact-number">
              Contact number
            </label>
            <input
              className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
              id="contact-number"
              name="contact-number"
              placeholder="Enter patient's contact number ..."
              required
              autoComplete="tel-local"
            />
          </div>
        </div>
        <div className="flex gap-4 w-[min(100%,_45rem)]">
          <div className="flex flex-col gap-2 mb-6 flex-1">
            <label
              className="text-xs text-[#666]"
              htmlFor="emergency-contact-number"
            >
              Emergency Contact Number
            </label>
            <input
              className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
              id="emergency-contact-number"
              name="emergency-contact-number"
              placeholder="Enter patient's emergency contact number ..."
              required
              autoComplete="tel-local"
            />
          </div>
          <div className="flex flex-col gap-2 mb-6 flex-1">
            <label
              className="text-xs text-[#666]"
              htmlFor="medical-record-number"
            >
              Medical Record Number
            </label>
            <input
              className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
              id="medical-record-number"
              name="medical-record-number"
              placeholder="Enter patient's medical record number ..."
              type="number"
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
          Next (Medical History) {"->"}
        </button>
      </form>
    </div>
  );
}
