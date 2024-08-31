import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { DarkModeState } from "./slice";

const selectDarkModeState = (state: RootState): DarkModeState => state.darkMode;

export const darkModeSelectors = {
    getDarkMode: createSelector(selectDarkModeState, (darkModeState: DarkModeState) => darkModeState.darkMode),
};