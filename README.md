# CryptoClinic: Decentralized Medical Records on the Blockchain

CryptoClinic is a web application built with Next.js, TailwindCSS, and Firebase, that allows hospital staff to securely store and manage patients' medical records on the blockchain. The application uses blockchain technology to ensure the integrity and immutability of the medical data, providing a decentralized and tamper-proof solution for storing sensitive health information.

## Project Overview

The main features of CryptoClinic include:

1. **User Authentication**: Hospital staff can sign up and securely log in to the application using their username and password. The application uses JWT (cookie-based) authentication along with HMAC verification for secure user authentication.

2. **Medical Record Creation**: Hospital staff can create medical records for patients by providing patient information, medical history, and medication observations. The application collects this data through a step-by-step process.

3. **Block Creation and Mining**: After entering the medical record details, the application creates a block containing the encrypted medical data and mines it using a proof-of-work algorithm. The mined block is then added to the blockchain.

4. **Blockchain Storage**: The application stores the blockchain (hash, previousHash, timestamp, username) and the data of the blockchain (hash, blockData, username, timestamp) separately in Firebase.

5. **Record Retrieval**: Hospital staff can view previously submitted medical records for patients, accessible from the corresponding block hash which are then displayed in a collapsible format.

6. **Encryption and Decryption**: The user's username and password are used to encrypt the private key that the user gets on sign-up before storing it. The algorithm used for this is AES-128-CBC.

## Steps to run the code

Before proceeding, ensure that you have the **Latest LTS version of Node.js** installed on your system.

To run the CryptoClinic application locally, follow these steps:

1. Install the dependencies:

   npm install

2. Start the build process:

   npm run build

3. Start the production build:

   npm run start

4. Open your web browser and navigate to `http://localhost:3000` to access the web application.
