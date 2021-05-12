import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCIDKj0fIb_NeFPv3cEu8yrFPgNwO-XkhM",
    authDomain: "clothing-app-3b6db.firebaseapp.com",
    projectId: "clothing-app-3b6db",
    storageBucket: "clothing-app-3b6db.appspot.com",
    messagingSenderId: "165803423112",
    appId: "1:165803423112:web:d0c57ae661ac2afb58763d",
    measurementId: "G-M67LJKTVXK"
  };

  export const createUserProfileDocument = async (userAuth ,additionalData) =>{
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists)
    {
      const { displayName,email} = userAuth;
      const createdAt = new Date;
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error in creating',error);
      }
    }
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;