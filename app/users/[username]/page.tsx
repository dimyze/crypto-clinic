"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUserContext } from "@/app/components/UserProvider";
import PatientInformation from "@/app/components/PatientInformation";
import MedicalHistory from "@/app/components/MedicalHistory";
import MedicationObservations from "@/app/components/MedicationObservations";
import BlockCreationResult from "@/app/components/BlockCreationResult";
import PatiendRecordCollapsible from "@/app/components/PatiendRecordCollapsible";
import {
  createBlock,
  verifyTransaction,
  mineBlock,
} from "@/actions/clientActions";
import { getBlockDataOfUser, removeSession } from "@/actions/serverActions";
import { DocumentData } from "firebase/firestore";
import Pagination from "@/app/components/Pagination";
import { getTimeOfTheDay } from "@/utils/utils";

interface MinedBlock {
  hash: string;
  difficulty: number;
  timestamp: number;
}

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

interface BlockDataFromDb {
  hash: string;
  patientInformationData: PatientInformationData;
  medicalHistoryData: MedicalHistoryData;
  medicationObservationsData: MedicationObservationsData;
  timestamp: number;
}

export default function Dashboard() {
  const router = useRouter();

  const user = useUserContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [patientInformationData, setPatientInformationData] = useState<{
    fullName: string;
    dateOfBirth: string;
    gender: string;
    contactNumber: string;
    emergencyContactNumber: string;
    medicalRecordNumber: number;
  } | null>(null);
  const [medicalHistoryData, setMedicalHistoryData] = useState<{
    pastConditions: string;
    surgicalProcedures: string;
    allergies: string;
    familyHistory: string;
  } | null>(null);
  const [medicationObservationsData, setMedicationObservationsData] = useState<{
    medicationAndDosage: string;
    prescribingPhysician: string;
    physicalExamination: string;
    testResults: string;
  } | null>(null);
  const [isBlockMined, setIsBlockMined] = useState<boolean>(false);
  const [minedBlock, setMinedBlock] = useState<MinedBlock | null>(null);
  const [blockDataFromDb, setBlockFromDb] = useState<BlockDataFromDb[] | null>(
    null
  );

  useEffect(() => {
    const blockCreation = async () => {
      if (
        patientInformationData === null ||
        medicalHistoryData === null ||
        medicationObservationsData === null
      )
        return;
      const block = createBlock(
        patientInformationData,
        medicalHistoryData,
        medicationObservationsData,
        user.username
      );
      console.log("Successfully created block: ", block);
      const result = await verifyTransaction(user.username, user.privateKey);
      if (result === "success") {
        const [generatedHash, difficulty, timestamp] = await mineBlock(block);
        console.log("Block will now be mined");
        setIsBlockMined(true);
        setMinedBlock({
          hash: String(generatedHash),
          difficulty: Number(difficulty),
          timestamp: Number(timestamp),
        });
        console.log(
          `Successfully mined block with hash "${String(
            generatedHash
          )}" at difficulty ${Number(difficulty)} at ${new Date(timestamp)})}`
        );
      }
    };
    if (currentPage === 4) {
      blockCreation();
    }
  }, [currentPage]);

  return (
    <>
      <p className="text-center font-medium">
        Good {getTimeOfTheDay(Date.now())}, {user.username}
      </p>
      {currentPage !== 5 && (
        <div className="w-full flex flex-col items-center gap-6">
          {currentPage === 1 && (
            <PatientInformation
              setCurrentPage={setCurrentPage}
              setPatientInformationData={setPatientInformationData}
            />
          )}
          {currentPage === 2 && (
            <MedicalHistory
              setCurrentPage={setCurrentPage}
              setMedicalHistoryData={setMedicalHistoryData}
            />
          )}
          {currentPage === 3 && (
            <MedicationObservations
              setCurrentPage={setCurrentPage}
              setMedicationObservationsData={setMedicationObservationsData}
            />
          )}
          {currentPage === 4 && (
            <BlockCreationResult
              isBlockMined={isBlockMined}
              minedBlock={minedBlock}
            />
          )}
          {currentPage >= 1 && currentPage <= 3 && (
            <Pagination currentPage={currentPage} />
          )}
        </div>
      )}

      {currentPage === 5 && blockDataFromDb !== null && (
        <div className="overflow-auto">
          {blockDataFromDb.map((blockData) => (
            <PatiendRecordCollapsible key={Math.random()} block={blockData} />
          ))}
        </div>
      )}
      <div className="flex gap-6">
        {currentPage !== 5 && (
          <button
            className=""
            onClick={async () => {
              const blockDataOfUser = await getBlockDataOfUser(user.username);
              setBlockFromDb(
                blockDataOfUser.map((blockData: DocumentData) => ({
                  hash: blockData.hash,
                  patientInformationData: blockData.patientInformationData,
                  medicalHistoryData: blockData.medicalHistoryData,
                  medicationObservationsData:
                    blockData.medicationObservationsData,
                  timestamp: blockData.timestamp,
                  username: blockData.username,
                }))
              );
              setCurrentPage(5);
            }}
          >
            View submitted records
          </button>
        )}
        {(currentPage === 4 || currentPage === 5) && (
          <button
            className=""
            onClick={async () => {
              setCurrentPage(1);
              setPatientInformationData(null);
              setMedicalHistoryData(null);
              setMedicationObservationsData(null);
              setIsBlockMined(false);
              setMinedBlock(null);
              setBlockFromDb(null);
            }}
          >
            Create new record
          </button>
        )}

        <button
          className=""
          onClick={async () => {
            await removeSession(user.username);
            router.push("/auth/signin");
          }}
        >
          Sign out
        </button>
      </div>
    </>
  );
}
