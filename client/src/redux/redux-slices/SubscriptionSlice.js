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
    //DELETE
    deleteMessageStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteMessageSuccess: (state, action) => {
      state.isFetching = false;
      state.messages.splice(
        state.messages.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteMessageFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateMessageStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateMessageSuccess: (state, action) => {
      state.isFetching = false;
      state.messages[
        state.messages.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.updateInput;
      state.messages.sort((a, b) => a.createdAt - b.createdAt)
    },
    updateMessageFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addMessageStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addMessageSuccess: (state, action) => {
      state.isFetching = false;
      state.messages.push(action.payload);
      state.messages.sort((a, b) => a.createdAt - b.createdAt)
    },
    addMessageFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getMessageStart,
  getMessageSuccess,
  getMessageFailure,
  deleteMessageStart,
  deleteMessageSuccess,
  deleteMessageFailure,
  updateMessageStart,
  updateMessageSuccess,
  updateMessageFailure,
  addMessageStart,
  addMessageSuccess,
  addMessageFailure,
} = messageSlice.actions;

export default messageSlice.reducer;
