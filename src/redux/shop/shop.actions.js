import { ShopActionTypes } from './shop.types';
import { firestore, convertCollectionSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => (
    {
        type: ShopActionTypes.FETCH_COLLECTIONS_START,
    }
)

export const fetchCollectionsSuccess = (collectionsMap) => (
    {
        type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
        payload: collectionsMap,
    }
)

export const fetchCollectionsFailure = (errorMessage) => (
    {
        type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
        payload: errorMessage,
    }
)

export const fetchCollectionsStartAsync = () => 
    {   
        return dispatch => {
            try {
                //to think about how can i keep listener pattern together with thunk
                // so that i still get all data updates from backend live
                const collectionRef = firestore.collection('collections');
                dispatch(fetchCollectionsStart());
                collectionRef.get().then(snapshot => {
                const collectionsMaps = convertCollectionSnapshotToMap(snapshot)
                dispatch(fetchCollectionsSuccess(collectionsMaps));
                });
            } catch (error) {
                dispatch(fetchCollectionsFailure(error.message));
            }
        }
        
    }
