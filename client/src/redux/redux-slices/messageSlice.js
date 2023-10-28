import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getMessageStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getMessageSuccess: (state, action) => {
      state.isFetching = false;
      state.messages = action.payload;
    },
    getMessageFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

  },
});

export const {
  getMessageStart,
  getMessageSuccess,
  getMessageFailure,
} = messageSlice.actions;

export default messageSlice.reducer;
