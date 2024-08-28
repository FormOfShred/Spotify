import { createSelector } from "@reduxjs/toolkit";
import { resetSearchResults, SearchState } from "./slice";
import { RootState } from "../../store/store";

const selectSearchState = (state: RootState): SearchState => state.search;

export const searchSelectors = {
    getSearchResults: createSelector(selectSearchState, (searchState: SearchState) => searchState.searchResults),
    resetSearchResults: createSelector(selectSearchState, (searchState: SearchState) => searchState.searchResults = [])
}