import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services/axios_helper";
import getToken from "../../services/getToken";
export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: any) => {
    // Логин и пароль
    const { data } = await instance.post("/auth/authenticate", params);
    return data; // Объект с информациоей о пользователе
  }
);
export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: any) => {
    const { data } = await instance.post("/auth/register", params);
    return data; // Объект с информациоей о пользователе
  }
);

const initialState = {
  auth: { data: null, status: "loading" },
  register: { data: null, status: "loading" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.auth.status = "loading";
        state.auth.data = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.auth.status = "loaded";
        state.auth.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.auth.status = "error";
        state.auth.data = null;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.register.status = "loading";
        state.register.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.register.status = "loaded";
        state.register.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.register.status = "error";
        state.register.data = null;
      });
  },
});

// Проверка авторизован ли пользователь
export const selectIsAuth = (state: any) => Boolean(state.auth.auth.data);
export const selectUserData = (state: any) => state.auth.auth.data;
export const authReducer = authSlice.reducer;
