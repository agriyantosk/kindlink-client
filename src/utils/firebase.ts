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

export const fetchFirebaseWallet = async (collectionName: string) => {
    try {
        const ref = initialize(collectionName);
        const snapshot = await getDocs(ref);
        let data: any;
        snapshot.forEach((doc) => {
            const parsedOwnerAddress = JSON.parse(
                doc.data().foundationOwnerAddress
            );
            data = parsedOwnerAddress;
        });
        console.log(data, "dari firebase");
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchFirebaseData = async (
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

export const addCandidateData = async (
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
        const existingAddresses = existingData?.foundationOwnerAddress || [];
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

export const addApprovalData = async (
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
        const existingAddresses = existingData?.contractAddress || [];
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

export const addFoundationData = async (
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
        const existingAddresses = existingData?.contractAddress || [];
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

export const deleteData = async (id: string) => {
    try {
        const db = getFirestore();
        const docRef = doc(db, "foundations", id);
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

export const deleteCandidate = async (
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

export const fetchDataById = async (collectionName: string, id: string) => {
    try {
        const db = getFirestore();
        const docRef = doc(db, collectionName, id);
        return docRef;
    } catch (error) {
        console.log(error);
    }
};
