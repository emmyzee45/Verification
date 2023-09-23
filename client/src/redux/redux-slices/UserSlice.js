import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    isFetching: false,
    isLoggedIn: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getCurrentUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCurrentUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    getCurrentUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateCurrentUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCurrentUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    updateCurrentUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //LOGOOUT
    logOutStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    logOutSuccess: (state) => {
      state.walletAddress = null;
      state.isFetching = false;
      state.isLoggedIn = false;
      state.currentUser = {};
    },
    logOutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCurrentUserStart,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  updateCurrentUserStart,
  updateCurrentUserSuccess,
  updateCurrentUserFailure,
  logOutStart,
  logOutSuccess,
  logOutFailure,
} = userSlice.actions;

export default userSlice.reducer;
