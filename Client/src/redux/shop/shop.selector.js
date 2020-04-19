import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    (collections) => 
        collections ? Object.values(collections) : []
);

export const selectCollection = categoryId => createSelector(
    [selectCollections],
    (collections) => collections ? collections[categoryId] : null,
)

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    (shop) => !!shop.collections
);