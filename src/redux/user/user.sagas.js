import { all, call, put, takeLatest } from 'redux-saga/effects';
import { auth, getCurrentUser, createUserProfileDocument, signInWithGooglePopup } from '../../firebase/firebase.utils'
import { 
    signInSuccess,
    signInFailure, 
    signOutSuccess, 
    signOutFailure,
    signUpSuccess,
    signUpFailure, 
} from "./user.actions";
import { clearCart } from '../cart/cart.actions'

import UserActionTypes from './user.types';

// Firebase flow has to be revised/refactored cause i feeel there is a redundancy and no needed calls to firestore
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function* getSnapshotFromUserAuth(userAuth, additionalData)
{
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const snapShot = yield call(() => userRef.get());
        yield put(
            signInSuccess({
                id: snapShot.id,
                ...snapShot.data()
            })
        );
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function* signInWithGoogle() {
    try {
        // to check later why can't we use method already exported in firebase utils
        // const userRef = yield auth.signInWithPopup(googleProvider);     
        const { user } = yield call(signInWithGooglePopup);   
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailure(error))
    }
}

function* signInWithEmail({ payload: {email, password} }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(
            email,
            password
        );   
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailure(error))
    }
}

function* isUserAuthenticated() {
    try {
        const user = yield getCurrentUser();
        if(!user)
            return;
        yield call(getSnapshotFromUserAuth, user);
        
    } catch (error) {
        yield put(signInFailure(error))
    }
}

function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());  
        yield put(clearCart());
    } catch (error) {
        yield put(signOutFailure(error));  
    }
}

function* signUp({payload: {email, password, displayName}}) {
    try {
         //Create user in authentication of firebase and sign user in automatically
      const { user } = yield auth.createUserWithEmailAndPassword(
        email,
        password
      );
      yield put(signUpSuccess({user, displayName}))  
        
    } catch (error) {
        yield put(signUpFailure(error))        
    }
}


function* signInAfterSignUp({payload: {user, displayName}}) {
    try {
         //Create user in firestore
        yield call(getSnapshotFromUserAuth, user, { displayName });
    } catch (error) {
        yield put(signInFailure(error)) 
    }
}

// ////////////////////////////////////////////////
// Listeners
// ///////////////////////////////////////////////

function* onGoogleSignInStart() {
    yield takeLatest(
        UserActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    )
}

function* onEmailSignInStart() {
    yield takeLatest(
        UserActionTypes.EMAIL_SIGN_IN_START,
        signInWithEmail
    )
}

function* onCheckUserSession() {
    yield takeLatest(
        UserActionTypes.CHECK_USER_SESSION,
        isUserAuthenticated
    )
}

function* onSignOutStart() {
    yield takeLatest(
        UserActionTypes.SIGN_OUT_START,
        signOut
    )
}

function* onSignUpStart() {
    yield takeLatest(
        UserActionTypes.SIGN_UP_START,
        signUp
    )
}

function* onSignUpSuccess() {
    yield takeLatest(
        UserActionTypes.SIGN_UP_SUCCESS,
        signInAfterSignUp
    )
}

export function* userSagas() {
    yield all(
        [
            call(onGoogleSignInStart), 
            call(onEmailSignInStart),
            call(onCheckUserSession),
            call(onSignOutStart),
            call(onSignUpStart),
            call(onSignUpSuccess)
        ]

    )
}