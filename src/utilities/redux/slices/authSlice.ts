"use client";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AuthState from "../types/authTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DecodedToken {
  role: string;
  userId: string;
  exp: number;
  iat: number;
}

const initialState: AuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  status: "idle",
  error: null,
  userRole:
    typeof window !== "undefined" && localStorage.getItem("token")
      ? (jwtDecode<DecodedToken>(localStorage.getItem("token") || "") as DecodedToken).role
      : null,
  isRegistered: false,
  isAuthenticated: typeof window !== "undefined" && !!localStorage.getItem("token"),
  alertMessage: "",
  alertResult: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user: { firstname: string; lastname: string; email: string; password: string }) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, user);
    return { token: response.data.token, role: response.data.role };
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, credentials);
      return { token: response.data.token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.message;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Logout failed");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetRegistrationState(state) {
      state.isRegistered = false;
    },
    updateUserRole: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload;
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
        state.userRole = action.payload.role;
        state.isRegistered = true;
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
        const decodedToken: any = jwtDecode(action.payload.token);

        state.userRole = decodedToken?.role;

        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.token = null;
        state.isAuthenticated = false;
        state.userRole = null;
        localStorage.removeItem("token");
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { resetRegistrationState, updateUserRole } = authSlice.actions;
export default authSlice;
