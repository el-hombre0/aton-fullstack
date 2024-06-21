import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../services/axios_helper";
import getToken from "../../services/getToken";

export const fetchClients = createAsyncThunk("clients/fetchClients", async () => {
  const token = getToken();
  const { data } = await instance.get("/clients", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
});

const initialState = {
  clients: {
    items: [],
    status: "loading",
  },
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.clients.status = "loading";
        state.clients.items = [];
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.clients.status = "loaded";
        state.clients.items = action.payload;
      })
      .addCase(fetchClients.rejected, (state) => {
        state.clients.status = "error";
        state.clients.items = [];
      });
  },
});

export const clientsReducer = clientsSlice.reducer;

