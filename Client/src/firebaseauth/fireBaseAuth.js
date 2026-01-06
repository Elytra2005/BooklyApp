// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
 // add details here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export const createUserandPass = async (data) => {
    try {
        const email = data.email;
        const firstName = data.firstName;
        const lastName = data.lastName;
        const password = data.password;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            email,
            firstName,
            lastName,
            uid: user.uid,
            createdAt: new Date(),
        });
    } catch (e) {
        const error = e.code;
        const errorMsg = e.message;
        console.error(e);
        alert(error, errorMsg);
    }
}
