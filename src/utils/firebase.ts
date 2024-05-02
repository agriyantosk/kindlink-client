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
    apiKey: "AIzaSyD_s18kJkL67XniuznlRHRYXlaz24xRNyQ",
    authDomain: "kindlink-42347.firebaseapp.com",
    projectId: "kindlink-42347",
    storageBucket: "kindlink-42347.appspot.com",
    messagingSenderId: "943140626359",
    appId: "1:943140626359:web:9714890ef64b9254045232",
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
