import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDP78d-iv0z_3U1GzAJGd326bQlKvfvRXM",
    authDomain: "crwn-db-b1b86.firebaseapp.com",
    databaseURL: "https://crwn-db-b1b86.firebaseio.com",
    projectId: "crwn-db-b1b86",
    storageBucket: "crwn-db-b1b86.appspot.com",
    messagingSenderId: "304345836898",
    appId: "1:304345836898:web:9ac8249dcc712e6f33503b",
    measurementId: "G-7HZ9K5JEL8"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider  = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
