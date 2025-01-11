"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import CustomerState from "../types/customerTypes";
import ICustomer from "@/models/customer/ICustomer";

const initialState: CustomerState = {
  customers: [],
  status: "idle",
  error: null,
  alertMessage: "",
  alertResult: "info",
};

export const fetchCustomers = createAsyncThunk("customers/fetchAll", async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data.customers;
});

export const addCustomer = createAsyncThunk("customers/add", async (customer: Partial<ICustomer>) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`, customer, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data.customer;
});

export const deleteCustomer = createAsyncThunk("customers/delete", async (id: string) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { id },
  });
  return id;
});

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ id, updatedCustomer }: { id: string; updatedCustomer: Partial<ICustomer> }) => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`, {
      id,
      ...updatedCustomer,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.customer;
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<ICustomer[]>) => {
        state.status = "succeeded";
        state.customers = action.payload;
        state.alertMessage = "Müşteriler başarıyla yüklendi";
        state.alertResult = "success";
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
        state.alertMessage = "Müşteriler yüklenirken bir hata oluştu";
        state.alertResult = "error";
      })

      .addCase(addCustomer.pending, (state) => {
        state.status = "loading";
      })

      .addCase(addCustomer.fulfilled, (state, action: PayloadAction<ICustomer>) => {
        state.customers.push(action.payload);
        state.alertMessage = "Müşteri başarıyla eklendi";
        state.alertResult = "success";
        state.status = "succeeded";
      })

      .addCase(addCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
        state.alertMessage = "Müşteri eklenirken bir hata oluştu";
        state.alertResult = "error";
        state.status = "failed";
      })

      .addCase(deleteCustomer.pending, (state) => {
        state.status = "loading";
      })

      .addCase(deleteCustomer.fulfilled, (state, action: PayloadAction<string>) => {
        state.customers = state.customers.filter((customer) => customer._id !== action.payload);
        state.alertMessage = "Müşteri başarıyla silindi";
        state.alertResult = "success";
        state.status = "succeeded";
      })

      .addCase(deleteCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
        state.alertMessage = "Müşteri silinirken bir hata oluştu";
        state.alertResult = "error";
        state.status = "failed";
      })

      .addCase(updateCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCustomer.fulfilled, (state, action: PayloadAction<ICustomer>) => {
        state.status = "succeeded";
        state.customers = state.customers.map((customer) => (customer._id === action.payload._id ? action.payload : customer));
        state.alertMessage = "Müşteri başarıyla güncellendi";
        state.alertResult = "success";
        state.status = "succeeded";
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
        state.alertMessage = "Müşteri güncellenirken bir hata oluştu";
        state.alertResult = "error";
        state.status = "failed";
      });

    // .addMatcher(
    //   (action) => action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"),
    //   (state) => {
    //     setTimeout(() => {
    //       state.alertMessage = "";
    //       state.alertResult = "";
    //     }, 3000);
    //   }
    // );
  },
});

export default customerSlice;
