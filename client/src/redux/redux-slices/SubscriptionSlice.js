import { createSlice } from "@reduxjs/toolkit";

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    subscriptions: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getSubscriptionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getSubscriptionSuccess: (state, action) => {
      state.isFetching = false;
      state.subscriptions = action.payload;
      state.subscriptions.sort((a, b) => a.createdAt - b.createdAt)
    },
    getSubscriptionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

  },
});

export const {
  getSubscriptionStart,
  getSubscriptionSuccess,
  getSubscriptionFailure,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
