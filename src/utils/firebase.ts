import { initializeApp } from "firebase/app";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    onSnapshot,
    query,
    serverTimestamp,
    where,
    Timestamp,
    updateDoc,
    getDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
import { FormData } from "@/interfaces/interface";
import firebase from "firebase/app";

const initialize = (collectionName: string) => {
    initializeApp(firebaseConfig);
    const db = getFirestore();
    const colRef = collection(db, collectionName);
    return colRef;
};

// export const fetchFirebaseWallet = async (
//     collectionName: string,
//     keyName: string
// ) => {
//     try {
//         const ref = initialize(collectionName);
//         const snapshot = await getDocs(ref);
//         let data: any;
//         snapshot.forEach((doc) => {
//             const parsedOwnerAddress = JSON.parse(doc.data()[keyName]);
//             data = parsedOwnerAddress;
//         });
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// };

/* 
FIREBASE CUMAN BUTUH 7 FUNCTION HARUSNYA
1. ADD WALLET [V]
2. DELETE WALLET [V]
3. ADD INFORMATION [V]
4. ADD OWNER WALLETS [V]
5. FETCH FIREBASE WALLET [V]
6. QUERY IN [V]
7. QUERY EQUALS TO [V]
8. DELETE FOUNDATION [V]
*/

// this function is to get all wallets according either to approvalAddresses, candidateAddresses, foundationAddresses, ownerAddresses, or devAddresses
export const fetchFirebaseWallets = async (
    collectionName: string,
    documentId: string,
    keyName: string
) => {
    try {
        initializeApp(firebaseConfig);
        const db = getFirestore();
        const docRef = doc(db, collectionName, documentId);
        const docSnapshot = await getDoc(docRef);
        const existingData = docSnapshot.data();
        const existingAddresses = (existingData && existingData[keyName]) || [];
        const parsed = JSON.parse(existingAddresses);
        return parsed;
    } catch (error) {
        console.log(error);
    }
};

// This function is to get the information regarding foundation to a specific key and value in cases of getting foundation that needs approval, getting the current candidate address, etc
export const queryIn = async (key: string, values: string[]) => {
    try {
        initializeApp(firebaseConfig);
        const db = getFirestore();
        const colRef = collection(db, "information");
        const q = query(colRef, where(key, "in", values));
        const querySnapshot = await getDocs(q);
        const queryResult: any = [];
        querySnapshot.forEach((doc) => {
            queryResult.push({ ...doc.data(), id: doc.id });
        });
        console.log(queryResult);
        return queryResult;
    } catch (error) {
        console.log(error);
    }
};

// THis function is to add wallets either to approvalAddresses, candidateAddresses, foundationAddresses, or ownerAddresses
export const addFirebaseWallets = async (
    collectionName: string,
    formData: any,
    documentId: string,
    keyName: string
) => {
    try {
        initializeApp(firebaseConfig);
        const db = getFirestore();
        const docRef = doc(db, collectionName, documentId);
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot.exists) {
            console.error(`Document ${documentId} does not exist.`);
            return;
        }
        const existingData = docSnapshot.data();
        const existingAddresses = existingData && existingData[keyName];
        const parsed = JSON.parse(existingAddresses);
        parsed.push(formData);
        const addCandidate = await updateDoc(docRef, {
            foundationOwnerAddress: JSON.stringify(parsed),
        });
        return `Successfully Added foundation candidate: ${JSON.stringify(
            addCandidate
        )}`;
    } catch (error) {
        console.log(error);
    }
};

// This functionis to add Foundation information data
export const addInformationData = async (
    collectionName: string,
    formData: any
) => {
    try {
        const db = getFirestore();
        const colRef = collection(db, collectionName);
        const addInformation = await addDoc(colRef, formData);
        return `Successfully Added foundation information: ${JSON.stringify(
            addInformation
        )}`;
    } catch (error) {
        console.log(error);
    }
};

// This function is to add owner addresses data
export const addOwnerAddress = async (
    collectionName: string,
    formData: any,
    documentId: string
) => {
    try {
        const db = getFirestore();
        const docRef = doc(db, collectionName, documentId);
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot.exists) {
            console.error(`Document ${documentId} does not exist.`);
            return;
        }
        const existingData = docSnapshot.data();
        const existingAddresses = existingData?.address || [];
        const parsed = JSON.parse(existingAddresses);
        parsed.push(formData[0]);
        parsed.push(formData[1]);
        const addCandidate = await updateDoc(docRef, {
            foundationOwnerAddress: JSON.stringify(parsed),
        });
        return `Successfully Added foundation candidate: ${JSON.stringify(
            addCandidate
        )}`;
    } catch (error) {
        console.log(error);
    }
};

// This function is to delete foundation information data based onn their ids
export const deleteInformationData = async (id: string) => {
    try {
        const db = getFirestore();
        const docRef = doc(db, "information", id);
        const deleteFoundation = await deleteDoc(docRef);
        console.log(
            `Successfully Deleted Foundations with id ${JSON.stringify(
                deleteFoundation
            )}`
        );
    } catch (error) {
        console.log(error);
    }
};

// This function is to delete wallets either on either to approvalAddresses, candidateAddresses, or foundationAddresses
export const deleteFirebaseWallet = async (
    collectionName: string,
    addressToDelete: string,
    documentId: string,
    keyName: string
) => {
    try {
        const db = getFirestore();
        const docRef = doc(db, collectionName, documentId);
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot.exists) {
            console.error(`Document ${documentId} does not exist.`);
            return;
        }
        const existingData = docSnapshot.data();
        const existingAddresses = existingData && existingData[keyName];
        const parsed = JSON.parse(existingAddresses);
        const newArray = parsed.filter((el: any) => el !== addressToDelete);
        const updateCandidate = await updateDoc(docRef, {
            [keyName]: JSON.stringify(newArray),
        });
        return `Successfully Added foundation candidate: ${JSON.stringify(
            updateCandidate
        )}`;
    } catch (error) {
        console.log(error);
    }
};

// This function is to get information to a specific key and value respective to one foundation
export const queryEqualsTo = async (
    collectionName: string,
    key: string,
    value: string
) => {
    try {
        const ref = initialize(collectionName);
        const q = query(ref, where(key, "==", value));
        const querySnapshot = await getDocs(q);

        const queryResult: any[] = [];
        querySnapshot.forEach((doc) => {
            queryResult.push({ ...doc.data(), id: doc.id });
        });
        return queryResult;
    } catch (error) {
        console.error(error);
    }
};

export const updateCandidateWinningVote = async (
    collectionName: string,
    formData: any,
    documentId: string
) => {
    try {
        initializeApp(firebaseConfig);
        const db = getFirestore();
        const foundationRef = doc(collection(db, collectionName), documentId);
        const docSnap = await getDoc(foundationRef);
        if (docSnap.exists()) {
            await updateDoc(foundationRef, formData);
            console.log("Foundation data updated successfully!");
        } else {
            console.log("Document does not exist!");
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateCandidateLosingVote = async (
    collectionName: string,
    documentId: string
) => {
    try {
        initializeApp(firebaseConfig);
        const db = getFirestore();
        const candidateRef = doc(collection(db, collectionName), documentId);
        const docSnap = await getDoc(candidateRef);
        if (docSnap.exists()) {
            await deleteDoc(candidateRef);
            console.log("Candidate data deleted successfully!");
        } else {
            console.log("Candidate document does not exist!");
        }
    } catch (error) {
        console.log(error);
    }
};

// export const fetchDataById = async (collectionName: string, id: string) => {
//     try {
//         const db = getFirestore();
//         const docRef = doc(db, collectionName, id);
//         return docRef;
//     } catch (error) {
//         console.log(error);
//     }
// };
