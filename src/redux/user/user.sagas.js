import { all, call, put, takeLatest } from 'redux-saga/effects';
import { auth, googleProvider, createUserProfileDocument, signInWithGooglePopup } from '../../firebase/firebase.utils'
import { googleSignInSuccess, googleSignInFailure } from "./user.actions";

import UserActionTypes from './user.types';

function* signInWithGoogle() {
    try {
        // to check later why can't we use method already exported in firebase utils
        // const userRef = yield auth.signInWithPopup(googleProvider);     
        const { user } = yield call(signInWithGooglePopup);   
        const userRef = yield call(createUserProfileDocument, user);
        const snapShot = yield call(() => userRef.get());
        yield put(
            googleSignInSuccess({
                id: snapShot.id,
                ...snapShot.data()
            })
        )
    } catch (error) {
        yield put(googleSignInFailure(error))
    }
}

function* googleSignInStart() {
    yield takeLatest(
        UserActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    )
}

export function* userSagas() {
    yield all(
        [call(googleSignInStart)]
    )
}