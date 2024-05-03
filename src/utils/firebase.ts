import { initializeApp } from "firebase/app";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
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

const initialize = () => {
    initializeApp(firebaseConfig);
    const db = getFirestore();
    const colRef = collection(db, "foundations");
    return colRef;
};

export const fetchData = async () => {
    try {
        const ref = initialize();
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

export const queryEqualsTo = async (key: string, value: string) => {
    try {
        const ref = initialize();
        const q = query(ref, where(key, "==", value));
        return q;
    } catch (error) {
        console.log(error);
    }
};

export const fetchDataById = async (id: string) => {
    try {
        const db = getFirestore();
        const docRef = doc(db, "foundations", id);
        return docRef;
    } catch (error) {
        console.log(error);
    }
};
