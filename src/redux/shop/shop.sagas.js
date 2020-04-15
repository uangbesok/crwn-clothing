import { call, put, takeLatest } from 'redux-saga/effects';

import { ShopActionTypes } from './shop.types';
import { firestore, convertCollectionSnapshotToMap } from "../../firebase/firebase.utils";
import { fetchCollectionsSuccess, fetchCollectionsFailure } from "./shop.actions";

export function* fetchCollectionsAsync() {
    try {
        //to think about how can i keep listener pattern together with thunk
        // so that i still get all data updates from backend live
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMaps = yield call(convertCollectionSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMaps));

    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}