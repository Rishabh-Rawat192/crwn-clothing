import firebase from "firebase";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyDsdPrJpW1sx-bhRwOOY8pNE8Lw-X6dwdc",
    authDomain: "crwn-db-658f2.firebaseapp.com",
    projectId: "crwn-db-658f2",
    storageBucket: "crwn-db-658f2.appspot.com",
    messagingSenderId: "728266532365",
    appId: "1:728266532365:web:84c7dc856773878cb79744",
    measurementId: "G-6QE299XQDL",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
