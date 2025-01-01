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

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ id, updatedCustomer }: { id: string; updatedCustomer: Partial<ICustomer> }) => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`, {
      id,
      ...updatedCustomer,
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
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      .addCase(addCustomer.pending, (state) => {
        state.status = "loading";
      })

      .addCase(addCustomer.fulfilled, (state, action: PayloadAction<ICustomer>) => {
        state.customers.push(action.payload);
      })

      .addCase(addCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      .addCase(deleteCustomer.pending, (state) => {
        state.status = "loading";
      })

      .addCase(deleteCustomer.fulfilled, (state, action: PayloadAction<string>) => {
        state.customers = state.customers.filter((customer) => customer._id !== action.payload);
      })

      .addCase(deleteCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      .addCase(updateCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCustomer.fulfilled, (state, action: PayloadAction<ICustomer>) => {
        state.status = "succeeded";
        state.customers = state.customers.map((customer) => (customer._id === action.payload._id ? action.payload : customer));
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      .addMatcher(
        (action) => action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"),
        (state) => {
          setTimeout(() => {
            state.alertMessage = "";
            state.alertResult = "";
          }, 3000);
        }
      );
  },
});

export default customerSlice;
