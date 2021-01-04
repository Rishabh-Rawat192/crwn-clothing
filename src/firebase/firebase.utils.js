import firebase from "firebase/app";
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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`/users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log("Error creating user", error.message);
        }
    }

    return userRef;
};

export default firebase;
