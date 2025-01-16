"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import IUser from "@/models/user/IUser";
import UserState from "../types/userTypes";
import { jwtDecode } from "jwt-decode";

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
  alertMessage: "",
  alertResult: "info",
  user: null,
  userRole: (() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode<{ role: string }>(token);
        return decodedToken.role;
      }
    } catch {
      return "user";
    }
    return "user"; // Varsayılan rol
  })(),
};

// Fetch Users
export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data.users;
});

// Add User
export const addUser = createAsyncThunk("users/add", async (user: Partial<IUser>) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, user, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data.user;
});

// Update User
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, updatedUser }: { id: string; updatedUser: Partial<IUser> }) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
      { id, ...updatedUser },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.user;
  }
);

// Delete User
export const deleteUser = createAsyncThunk("users/delete", async (id: string) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    data: { id },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return id;
});

export const fetchCurrentUser = createAsyncThunk("user/fetchCurrentUser", async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data.user;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserRole: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
        state.alertMessage = "Kullanıcılar başarıyla yüklendi";
        state.alertResult = "success";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
        state.alertMessage = "Kullanıcılar yüklenirken bir hata oluştu";
        state.alertResult = "error";
      })
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.users.push(action.payload);
        state.alertMessage = "Kullanıcı başarıyla eklendi";
        state.alertResult = "success";
        state.status = "succeeded";
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
        state.alertMessage = "Kullanıcı eklenirken bir hata oluştu";
        state.alertResult = "error";
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.status = "succeeded";
        state.users = state.users.map((user) => (user._id === action.payload._id ? action.payload : user));
        state.alertMessage = "Kullanıcı başarıyla güncellendi";
        state.alertResult = "success";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
        state.alertMessage = "Kullanıcı güncellenirken bir hata oluştu";
        state.alertResult = "error";
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
        state.alertMessage = "Kullanıcı başarıyla silindi";
        state.alertResult = "success";
        state.status = "succeeded";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
        state.alertMessage = "Kullanıcı silinirken bir hata oluştu";
        state.alertResult = "error";
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});
export const {updateUserRole} = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.user;
export default userSlice;
