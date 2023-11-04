import { createSlice } from "@reduxjs/toolkit";

export const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    tickets: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getTicketStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getTicketSuccess: (state, action) => {
      state.isFetching = false;
      state.tickets = action.payload;
    },
    getTicketFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteTicketStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteTicketSuccess: (state, action) => {
      state.isFetching = false;
      state.tickets.splice(
        state.tickets.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteTicketFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateTicketStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateTicketSuccess: (state, action) => {
      state.isFetching = false;
      state.tickets[
        state.tickets.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.ticket;
    },
    updateTicketFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addTicketStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addTicketSuccess: (state, action) => {
      state.isFetching = false;
      state.tickets.push(action.payload);
      state.tickets.sort((a, b) => a.createdAt - b.createdAt)
    },
    addTicketFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getTicketStart,
  getTicketSuccess,
  getTicketFailure,
  deleteTicketStart,
  deleteTicketSuccess,
  deleteTicketFailure,
  updateTicketStart,
  updateTicketSuccess,
  updateTicketFailure,
  addTicketStart,
  addTicketSuccess,
  addTicketFailure,
} = ticketSlice.actions;

export default ticketSlice.reducer;
