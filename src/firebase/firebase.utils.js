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


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth)
        return;

    //Get reference from firestore for currently authenticated user    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    //Get detailed data about authenticated user as a snapshot
    const snapShot = await userRef.get();

    //If authenticated user doesn't exist in firestore database 
    // then create user in users collection
    if(!snapShot.exists)
    {
        //Destructure user details from authenticated user object
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {

            await userRef.set(
                {
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                }
            )
            
        } catch (error) {
            console.log('User creating error', error.message)
        }
    }

    return userRef;
}



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider  = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

//Util method to add static data to firestore collection
export const addCollectionAndDocuments = async (collectionKey, docsToAdd) =>
{
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();

    docsToAdd.forEach(doc => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, doc);        
    });

    return await batch.commit();
}

export const convertCollectionSnapshotToMap = (collection) => {
    const transformedCollection = collection.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        }
    });

    return transformedCollection.reduce((shopData, collection) => {
        shopData[collection.title.toLowerCase()] = collection;
        return shopData;
    }, {});  
}

//Export method for popup login with Google account
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
