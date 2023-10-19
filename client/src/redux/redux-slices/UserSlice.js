import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    isLoggedIn: false,
    error: false,
  },
  reducers: {
    //GET ALL
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Top Balance
    topBalanceStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    topBalanceSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser.balance = action.payload;
    },
    topBalanceFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //LOGOOUT
    logOutStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    logOutSuccess: (state) => {
      state.isFetching = false;
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    logOutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  logOutStart,
  logOutSuccess,
  logOutFailure,
} = userSlice.actions;

export default userSlice.reducer;
