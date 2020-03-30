import { createSelector } from 'reselect';

export const selectCollections = createSelector(
    [(state) => state.shop],
    (shop) => shop.collections
);