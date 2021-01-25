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

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

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

export const addCollectionAndDocuments = async (
    collectionKey,
    ObjectsToAdd
) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    ObjectsToAdd.forEach((obj) => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map((doc) => {
        const { title, items } = doc.data();

        return {
            title,
            items,
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
        };
    });

    return transformedCollections.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((userAuth) => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
};

export const getCartRef = async (userId) => {
    const cartRef = firestore.doc(`/carts/${userId}`);
    const cartSnapshot = await cartRef.get();

    if (!cartSnapshot.exists) cartRef.set({ cartItems: [] });

    return cartRef;
};

export default firebase;
