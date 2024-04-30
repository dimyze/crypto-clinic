"use client";

import { PT_Serif } from "next/font/google";
import { useState, useEffect, useRef } from "react";

interface PatientInformationData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  emergencyContactNumber: string;
  medicalRecordNumber: number;
}

interface MedicalHistoryData {
  pastConditions: string;
  surgicalProcedures: string;
  allergies: string;
  familyHistory: string;
}

interface MedicationObservationsData {
  medicationAndDosage: string;
  prescribingPhysician: string;
  physicalExamination: string;
  testResults: string;
}

interface Block {
  hash: string;
  patientInformationData: PatientInformationData;
  medicalHistoryData: MedicalHistoryData;
  medicationObservationsData: MedicationObservationsData;
  timestamp: number;
}

const ptSerif = PT_Serif({ weight: ["400", "700"], subsets: ["latin"] });

export default function PatiendRecordCollapsible({ block }: { block: Block }) {
  const [height, setHeight] = useState<number>(0);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);
  const refComplete = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsCollapsed((currIsCollapsed) => !currIsCollapsed);
    setHeight((currHeight) =>
      currHeight === 0 ? Number(ref.current?.clientHeight) : 0
    );
  };

  useEffect(() => {
    refComplete.current?.addEventListener("click", handleClick);
    return () => {
      refComplete.current?.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <div
        ref={refComplete}
        className="p-5 pl-5 pr-5 rounded-2xl shadow-[inset_0_0_0_1px_#d2d0c9] last-of-type:mb-0 mb-2 cursor-pointer transition-all duration-300"
      >
        <div className="flex justify-between gap-6">
          <div>
            <h4 className="mb-2">{block.hash}</h4>
            <p className="text-[#999] text-sm">
              {String(new Date(block.timestamp))}
            </p>
          </div>
          <button
            className={`${
              isCollapsed ? "rotate-0" : "rotate-180"
            } transition-all duration-300`}
          >
            ↓
          </button>
        </div>
        <div
          className="transition-all duration-200"
          style={{
            height: height + "px",
            overflow: isCollapsed ? "hidden" : "none",
          }}
        >
          <div ref={ref}>
            <div className="pt-6">
              {/* title */}
              <div className="mb-6">
                <h2 className={`${ptSerif.className} font-normal text-xl mb-2`}>
                  Patient Information
                </h2>
                <p className="text-[#999] text-sm">
                  Important general information about the patient
                </p>
              </div>
              <div>
                <div className="flex gap-2 mb-3">
                  <div className="flex-1">
                    <h5 className="text-xs text-[#666] mb-2">Full Name</h5>
                    <input
                      className="bg-[#f8f8f5] rounded-2xl p-4 text-sm w-full"
                      value={block.patientInformationData.fullName}
                      disabled
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs text-[#666] mb-2">Date of Birth</h5>
                    <input
                      className="bg-[#f8f8f5] rounded-2xl p-4 text-sm w-full"
                      value={block.patientInformationData.dateOfBirth}
                      disabled
                    />
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <div className="flex-1">
                    <h5 className="text-xs text-[#666] mb-2">Gender</h5>
                    <input
                      className="bg-[#f8f8f5] rounded-2xl p-4 text-sm w-full"
                      value={block.patientInformationData.gender}
                      disabled
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs text-[#666] mb-2">Contact Number</h5>
                    <input
                      className="bg-[#f8f8f5] rounded-2xl p-4 text-sm w-full"
                      value={block.patientInformationData.contactNumber}
                      disabled
                    />
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <div className="flex-1">
                    <h5 className="text-xs text-[#666] mb-2">
                      Emergency Contact Number
                    </h5>
                    <input
                      className="bg-[#f8f8f5] rounded-2xl p-4 text-sm w-full"
                      value={
                        block.patientInformationData.emergencyContactNumber
                      }
                      disabled
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs text-[#666] mb-2">
                      Medical Record Number
                    </h5>
                    <input
                      className="bg-[#f8f8f5] rounded-2xl p-4 text-sm w-full"
                      value={block.patientInformationData.medicalRecordNumber}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="mb-6">
                <h2 className={`${ptSerif.className} font-normal text-xl mb-2`}>
                  Medical History
                </h2>
                <p className="text-[#999] text-sm">
                  Relevant medical history of the patient
                </p>
              </div>
              <div>
                <div className="flex gap-2 mb-3">
                  <div className="flex-1">
                    <h5 className="text-xs text-[#666] mb-2">
                      Past Conditions
                    </h5>
                    <input
                      className="bg-[#f8f8f5] rounded-2xl p-4 text-sm w-full"
                      value={block.medicalHistoryData.pastConditions}
                      disabled
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs text-[#666] mb-2">
                      Surgical Procedures
                    </h5>
                    <input
                      className="bg-[#f8f8f5] rounded-2xl p-4 text-sm w-full"
                      value={block.medicalHistoryData.surgicalProcedures}
                      disabled
                    />
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <div className="flex-1">
                    <h5 className="text-xs text-[#666] mb-2">Allergies</h5>
                    <input
                      className="bg-[#f8f8f5] rounded-2xl p-4 text-sm w-full"
                      value={block.medicalHistoryData.allergies}
                      disabled
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs text-[#666] mb-2">Family History</h5>
                    <input
                      className="bg-[#f8f8f5] rounded-2xl p-4 text-sm w-full"
                      value={block.medicalHistoryData.familyHistory}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="mb-6">
                <h2 className={`${ptSerif.className} font-normal text-xl mb-2`}>
                  Medication Observations
                </h2>
                <p className="text-[#999] text-sm">
                  Current medications and clinical observations of the patient
                </p>
              </div>
              <div>
                <div className="flex gap-2 mb-3">
                  <div className="flex-1">
                    <h5 className="text-xs text-[#666] mb-2">
                      Name of Medication and Dosage
                    </h5>
                    <input
                      className="bg-[#f8f8f5] rounded-2xl p-4 text-sm w-full"
                      value={
                        block.medicationObservationsData.medicationAndDosage
                      }
                      disabled
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs text-[#666] mb-2">
                      Prescribing Physician
                    </h5>
                    <input
                      className="bg-[#f8f8f5] rounded-2xl p-4 text-sm w-full"
                      value={
                        block.medicationObservationsData.prescribingPhysician
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <div className="flex-1">
                    <h5 className="text-xs text-[#666] mb-2">
                      Physical Examination
                    </h5>
                    <input
                      className="bg-[#f8f8f5] rounded-2xl p-4 text-sm w-full"
                      value={
                        block.medicationObservationsData.physicalExamination
                      }
                      disabled
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs text-[#666] mb-2">
                      Diagnostic Test Results
                    </h5>
                    <input
                      className="bg-[#f8f8f5] rounded-2xl p-4 text-sm w-full"
                      value={block.medicationObservationsData.testResults}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
