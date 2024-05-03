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
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const initialize = (collectionName: string) => {
    initializeApp(firebaseConfig);
    const db = getFirestore();
    const colRef = collection(db, collectionName);
    return colRef;
};

export const fetchData = async (collectionName: string) => {
    try {
        const ref = initialize(collectionName);
        const snapshot = await getDocs(ref);
        let foundations: any = [];
        snapshot.forEach((doc) => {
            foundations.push({ ...doc.data(), id: doc.id });
        });
        return foundations;
    } catch (error) {
        console.log(error);
    }
};

export const addData = async (name: string, description: string) => {
    try {
        const ref = initialize();
        const add = await addDoc(ref, {
            name,
            description,
            createdAt: serverTimestamp,
        });
        console.log(
            `Successfully Addded New Foundations: ${JSON.stringify(add)}`
        );
        await fetchData();
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
        await fetchData();
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
        console.log(collectionName, key, value);
        const ref = initialize(collectionName);
        const q = query(ref, where(key, "==", value));
        const querySnapshot = await getDocs(q);

        const queryResult: any[] = [];
        querySnapshot.forEach((doc) => {
            queryResult.push({ ...doc.data(), id: doc.id });
        });
        console.log(queryResult);
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
