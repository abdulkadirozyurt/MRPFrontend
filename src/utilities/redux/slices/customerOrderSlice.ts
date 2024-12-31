import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import CustomerOrdersState from "@/utilities/redux/types/customerOrderTypes";
import { ICustomerOrder } from "@/models/order/ICustomerOrder";

const initialState: CustomerOrdersState = {
  orders: [],
  status: "idle",
  error: null,
  alertMessage: "",
  alertResult: "",
};

export const fetchCustomerOrders = createAsyncThunk("customerOrders/fetchAll", async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customer-orders`);
  return response.data.orders;
});

// Delete a customer order
export const deleteCustomerOrder = createAsyncThunk(
  "customerOrders/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/customer-orders`, {
        data: { id },
      });
      return response.data.message;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "Failed to delete order");
    }
  }
);

const customerOrdersSlice = createSlice({
  name: "customerOrders",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetAlert: (state) => {
      state.alertMessage = "";
      state.alertResult = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomerOrders.fulfilled, (state, action: PayloadAction<ICustomerOrder[]>) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchCustomerOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch orders";
      })
      .addCase(deleteCustomerOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCustomerOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.alertMessage = "Sipariş başarıyla silindi.";
        state.alertResult = "success";
      })
      .addCase(deleteCustomerOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.alertMessage = "Sipariş silinirken hata oluştu.";
        state.alertResult = "error";
      });
  },
});

export const { resetError, resetAlert } = customerOrdersSlice.actions;
export default customerOrdersSlice;