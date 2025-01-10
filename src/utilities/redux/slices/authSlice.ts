"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AuthState from "../types/authTypes";
import { jwtDecode } from "jwt-decode";

const initialState: AuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  status: "idle",
  error: null,
  isRegistered: false,
  isAuthenticated: typeof window !== "undefined" && !!localStorage.getItem("token"),
};

export const register = createAsyncThunk("auth/register", async (user: { firstname: string; lastname: string; email: string; password: string }) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, user);
  return response.data.token;
});

// export const login = createAsyncThunk(
//   "auth/login",
//   async (credentials: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
//         credentials
//       );
//       return response.data.token;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );
export const login = createAsyncThunk("auth/login", async (credentials: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, credentials);
    const decodedToken = jwtDecode(response.data.token);
    return { token: response.data.token, user: decodedToken };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    resetRegistrationState(state) {
      state.isRegistered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { loginSuccess, logout, resetRegistrationState } = authSlice.actions;
export default authSlice;
