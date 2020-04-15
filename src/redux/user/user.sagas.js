import { all, call, put, takeLatest } from 'redux-saga/effects';
import { auth, googleProvider, createUserProfileDocument, signInWithGooglePopup } from '../../firebase/firebase.utils'
import { signInSuccess, signInFailure } from "./user.actions";

import UserActionTypes from './user.types';

function* getSnapshotFromUserAuth(user)
{
    try {
        const userRef = yield call(createUserProfileDocument, user);
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

function* googleSignInStart() {
    yield takeLatest(
        UserActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    )
}

function* emailSignInStart() {
    yield takeLatest(
        UserActionTypes.EMAIL_SIGN_IN_START,
        signInWithEmail
    )
}

export function* userSagas() {
    yield all(
        [call(googleSignInStart), call(emailSignInStart)
        ]

    )
}