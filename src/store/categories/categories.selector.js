import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories; // This is the first and only thing checked works like a cache
//                                                       preventing the under functions to be executed when they don't need to

export const selectCategories = createSelector(
  [selectCategoryReducer], // another value added here, is added down too
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, { title, items }) => {
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
