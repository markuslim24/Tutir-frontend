const { createSlice } = require("@reduxjs/toolkit");

const localStorageKey = "darkModeState";

let persistedTheme = false;

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    preferDarkMode: persistedTheme,
  },
  reducers: {
    setDarkMode(state: any, action: any) {
      return action.payload;
    },
  },
});

export function isPreferDarkMode(state: any): boolean {
  return state.darkMode.preferDarkMode;
}

const { setDarkMode } = darkModeSlice.actions;

export function toggleDarkMode(toggle: boolean) {
  window.localStorage.setItem(localStorageKey, toggle.toString());
  return setDarkMode({ preferDarkMode: toggle });
}

export function initializeDarkModeState() {
  persistedTheme = window.localStorage.getItem(localStorageKey) === "true";
  return setDarkMode({ preferDarkMode: persistedTheme });
}

export const darkModeReducer = darkModeSlice.reducer;
