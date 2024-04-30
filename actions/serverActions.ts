"use server";

import { db } from "@/firebase/firebase";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { randomBytes } from "crypto";
import { createHmac } from "crypto";
import jwt from "jsonwebtoken";

import keypair from "keypair";
import { cookies } from "next/headers";

interface User {
  privateKey: string;
  username: string;
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

interface Block {
  patientInformationData: PatientInformationData;
  medicalHistoryData: MedicalHistoryData;
  medicationObservationsData: MedicationObservationsData;
  timestamp: number;
  username: string;
}

interface BlockWithHash extends Block {
  hash: string;
}

interface BlockchainBlock {
  prevHash: string;
  hash: string;
  timestamp: number;
  username: string;
}

const difficulty = 4;

export const addUserToDb = async (username: string) => {
  const keyPair = keypair();
  const existingUser = await getDoc(doc(db, "users", username));
  if (existingUser.data()) {
    return false;
  }
  await setDoc(doc(db, "users", username), {
    privateKey: keyPair.private,
    username,
  });
  const result = await getDoc(doc(db, "users", username));
  return result.data();
};

export const createHMAC = async (randomChallenge: string, username: string) => {
  const randomString = randomBytes(20).toString("hex");
  const user = (await getDoc(doc(db, "users", username))).data();
  const hmac = createHmac("sha256", String(user?.privateKey))
    .update(randomChallenge + randomString)
    .digest("hex");
  console.log("HMAC generated by server: ", hmac);
  const hmacDocServerLocation = randomBytes(32).toString("hex");
  await setDoc(doc(db, "hmac", hmacDocServerLocation), {
    hmac,
  });
  return {
    hmacDocServerLocation,
    randomString,
  };
};

export const setClientHMAC = async (
  hmac: string,
  hmacDocClientLocation: string
) => {
  await setDoc(doc(db, "hmac", hmacDocClientLocation), {
    hmac,
  });
};

export const verifyHMACs = async (
  hmacDocServerLocation: string,
  hmacDocClientLocation: string
) => {
  const hmacServer = (
    await getDoc(doc(db, "hmac", hmacDocServerLocation))
  ).data();
  const hmacClient = (
    await getDoc(doc(db, "hmac", hmacDocClientLocation))
  ).data();
  console.log("Client HMAC:", hmacClient?.hmac);
  console.log("Server HMAC:", hmacServer?.hmac);
  await deleteDoc(doc(db, "hmac", hmacDocServerLocation));
  await deleteDoc(doc(db, "hmac", hmacDocClientLocation));
  return String(hmacServer?.hmac) === String(hmacClient?.hmac);
};

export const signInWithJwt = async (username: string) => {
  const user = (await getDoc(doc(db, "users", username))).data();
  const signInJwt = jwt.sign(
    {
      username,
      privateKey: user?.privateKey,
    },
    String(process.env.JWT_SECRET_KEY),
    { expiresIn: 1800 }
  );
  const expires = new Date(Date.now() + 1800 * 1000);
  cookies().set(`${username}_session`, signInJwt, { expires, httpOnly: true });
};

export const getSession = async (username: string) => {
  const session = cookies().get(`${username}_session`)?.value;
  if (!session) {
    return "session-expired";
  }
  try {
    const decryptedSession = Object(
      jwt.verify(session, String(process.env.JWT_SECRET_KEY))
    );
    return JSON.stringify(decryptedSession);
  } catch (error) {}
};

export const removeSession = async (username: string) => {
  cookies().delete(`${username}_session`);
};

export const getDifficulty = async () => difficulty;

export const getLastBlock = async () => {
  const blockchainSnap = await getDocs(collection(db, "blockchain"));
  const blockchain: DocumentData[] = [];
  blockchainSnap.forEach((block) =>
    blockchain.push({ ...block.data(), blockId: block.id })
  );
  blockchain.sort(
    (a, b) => Number(a.blockId.slice(5)) - Number(b.blockId.slice(5))
  );
  return blockchain.at(-1);
};

export const addBlockToBlockchainWithData = async (
  block: BlockchainBlock,
  blockData: BlockWithHash
) => {
  const lastBlock = await getLastBlock();
  const newBlockId = String(Number(lastBlock?.blockId.slice(5)) + 1);
  await setDoc(doc(db, "blockchain", `block${newBlockId}`), block);
  await setDoc(doc(db, "blockchain-data", `block${newBlockId}`), blockData);
  console.log(
    "Blockchain updated! with block ",
    block,
    "and with block data",
    blockData
  );
};

export const getBlockDataOfUser = async (username: string) => {
  const q = query(
    collection(db, "blockchain-data"),
    where("username", "==", username)
  );
  const querySnap = await getDocs(q);
  const result: DocumentData[] = [];
  querySnap.forEach((blockchainData) => result.push(blockchainData.data()));
  result.sort((a, b) => b.timestamp - a.timestamp);
  return result;
};
