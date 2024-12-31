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

// Fetch all customer orders
export const fetchCustomerOrders = createAsyncThunk("customerOrders/fetchAll", async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customer-orders`);
  return response.data.orders;
});

// Add a customer order
export const addCustomerOrder = createAsyncThunk(
  "customerOrders/add",
  async (newOrder: ICustomerOrder, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/customer-orders`, newOrder);
      return response.data.order;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "Failed to add order");
    }
  }
);

// Update a customer order
export const updateCustomerOrder = createAsyncThunk(
  "customerOrders/update",
  async ({ id, updatedOrder }: { id: string; updatedOrder: Partial<ICustomerOrder> }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/customer-orders`, {
        id,
        ...updatedOrder,
      });
      return response.data.order;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "Failed to update order");
    }
  }
);

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
      // Fetch
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

      // Add
      .addCase(addCustomerOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCustomerOrder.fulfilled, (state, action: PayloadAction<ICustomerOrder>) => {
        state.status = "succeeded";
        state.alertMessage = "Sipariş başarıyla eklendi.";
        state.alertResult = "success";
        state.orders.push(action.payload);
      })
      .addCase(addCustomerOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.alertMessage = "Sipariş eklenirken hata oluştu.";
        state.alertResult = "error";
      })

      // Update
      .addCase(updateCustomerOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCustomerOrder.fulfilled, (state, action: PayloadAction<ICustomerOrder>) => {
        state.status = "succeeded";
        state.alertMessage = "Sipariş başarıyla güncellendi.";
        state.alertResult = "success";
        const index = state.orders.findIndex((order) => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateCustomerOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.alertMessage = "Sipariş güncellenirken hata oluştu.";
        state.alertResult = "error";
      })

      // Delete
      .addCase(deleteCustomerOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCustomerOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.alertMessage = "Sipariş başarıyla silindi.";
        state.alertResult = "success";
        state.orders = state.orders.filter((order) => order._id !== action.meta.arg);
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
