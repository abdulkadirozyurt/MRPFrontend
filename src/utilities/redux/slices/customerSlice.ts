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
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`);
  return response.data.customers;
});

export const addCustomer = createAsyncThunk("customers/add", async (customer: Partial<ICustomer>) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`, customer);
  return response.data.customer;
});

export const deleteCustomer = createAsyncThunk("customers/delete", async (id: string) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`, { data: { id } });
  return id;
});

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
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addCustomer.fulfilled, (state, action: PayloadAction<ICustomer>) => {
        state.customers.push(action.payload);
      })
      .addCase(deleteCustomer.fulfilled, (state, action: PayloadAction<string>) => {
        state.customers = state.customers.filter((customer) => customer._id !== action.payload);
      });
  },
});

export default customerSlice;
