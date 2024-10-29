import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signOut} from "firebase/auth"
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyArePmppujF84wbm0f7jJ9C3fCKuBrnZMI",
  authDomain: "netflix-clone-daa32.firebaseapp.com",
  projectId: "netflix-clone-daa32",
  storageBucket: "netflix-clone-daa32.appspot.com",
  messagingSenderId: "909489286032",
  appId: "1:909489286032:web:30674504a509efa885e115"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        await createUserWithEmailAndPassword(auth, email, password);
const user = res.user;
await addDoc(collection(db, "user"),{
    uid: user.uid,
    name,
    authProvider: "local",
    email,
});
    } catch (error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        toast.error(error.codesplit('/')[1].split('-').join(" "));
    }
}
const logout = ()=> {
    signOut(auth);
}

export {auth, db, login, signup, logout};
