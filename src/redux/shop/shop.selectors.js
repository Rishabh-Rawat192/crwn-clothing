import memoize from "lodash.memoize";
import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    (collections) => (collections ? Object.values(collections) : [])
);

export const selectCollection = memoize((collectionUrlParam) =>
    createSelector([selectCollections], (collections) =>
        collections ? collections[collectionUrlParam] : null
    )
);

export const selectIsCollectionsFetching = createSelector(
    [selectShop],
    (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    (shop) => !!shop.collections
);
