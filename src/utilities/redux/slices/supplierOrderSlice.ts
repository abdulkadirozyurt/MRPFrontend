"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import SupplierOrdersState from "../types/supplierOrderTypes";
import { ISupplierOrder } from "@/models/order/ISupplierOrder";

const alertMessages = {
  fetchSupplierOrdersSuccess: "Tedarikçi siparişleri başarıyla getirildi.",
  fetchSupplierOrdersError: "Tedarikçi siparişleri getirilirken hata oluştu.",
  addSupplierOrderSuccess: "Tedarikçi siparişi başarıyla eklendi.",
  addSupplierOrderError: "Tedarikçi siparişi eklenirken hata oluştu.",
  updateSupplierOrderSuccess: "Tedarikçi siparişi başarıyla güncellendi.",
  updateSupplierOrderError: "Tedarikçi siparişi güncellenirken hata oluştu.",
  deleteSupplierOrderSuccess: "Tedarikçi siparişi başarıyla silindi.",
  deleteSupplierOrderError: "Tedarikçi siparişi silinirken hata oluştu.",
};

const initialState: SupplierOrdersState = {
  orders: [],
  status: "idle",
  error: null,
  alertMessage: "",
  alertResult: "",
};

export const fetchSupplierOrders = createAsyncThunk("supplierOrder/fetchSupplierOrders", async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/supplier-orders`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data.orders;
});

export const addSupplierOrder = createAsyncThunk(
  "supplierOrder/addSupplierOrder",
  async (newOrder: ISupplierOrder, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/supplier-orders`, newOrder, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.supplierOrder;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Tedarikçi siparişi ekleme başarısız oldu.");
    }
  }
);

export const updateSupplierOrder = createAsyncThunk(
  "supplierOrder/update",
  async ({ id, updatedOrder }: { id: string; updatedOrder: ISupplierOrder }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/supplier-orders`,
        {
          id,
          ...updatedOrder,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.order;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "Failed to update order");
    }
  }
);

export const deleteSupplierOrder = createAsyncThunk("supplierOrder/delete", async (id: string, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/supplier-orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        id,
      },
    });
    return response.data.message;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || "Failed to delete order");
  }
});

const supplierOrderSlice = createSlice({
  name: "supplierOrder",
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

      // fetchSupplierOrders
      .addCase(fetchSupplierOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSupplierOrders.fulfilled, (state, action: PayloadAction<ISupplierOrder[]>) => {
        state.status = "succeeded";
        state.orders = action.payload;
        state.alertMessage = alertMessages.fetchSupplierOrdersSuccess;
        state.alertResult = "success";
      })
      .addCase(fetchSupplierOrders.rejected, (state, action) => {
        state.status = "failed";
        state.alertMessage = alertMessages.fetchSupplierOrdersError;
        state.alertResult = "error";
        state.error = (action.payload as string) || "Tedarikçi siparişleri getirilirken hata oluştu.";
      })

      // addSupplierOrder
      .addCase(addSupplierOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSupplierOrder.fulfilled, (state, action: PayloadAction<ISupplierOrder>) => {
        state.status = "succeeded";
        state.alertMessage = alertMessages.addSupplierOrderSuccess;
        state.alertResult = "success";
        state.orders.push(action.payload);
      })
      .addCase(addSupplierOrder.rejected, (state, action) => {
        state.status = "failed";
        state.alertMessage = alertMessages.addSupplierOrderError;
        state.alertResult = "error";
        state.error = (action.payload as string) || "Tedarikçi siparişi eklenirken hata oluştu.";
      })

      // updateSupplierOrder
      .addCase(updateSupplierOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSupplierOrder.fulfilled, (state, action: PayloadAction<ISupplierOrder>) => {
        state.status = "succeeded";
        
        state.alertMessage = alertMessages.updateSupplierOrderSuccess;
        state.alertResult = "success";
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? { ...order, ...action.payload } : order
        );
      })
      .addCase(updateSupplierOrder.rejected, (state, action) => {
        state.status = "failed";
        state.alertMessage = alertMessages.updateSupplierOrderError;
        state.alertResult = "error";
        state.error = action.error.message||null;
      })

      // deleteSupplierOrder
      .addCase(deleteSupplierOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSupplierOrder.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "succeeded";
        state.alertMessage = alertMessages.deleteSupplierOrderSuccess;
        state.alertResult = "success";
        state.orders = state.orders.filter((order) => order._id !== action.payload);
      })
      .addCase(deleteSupplierOrder.rejected, (state, action) => {
        state.status = "failed";
        state.alertMessage = alertMessages.deleteSupplierOrderError;
        state.alertResult = "error";
        state.error = action.payload as string;
      })

      // Diğer matcher'lar (Fulfilled & Rejected genel durumları)
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

export const { resetError, resetAlert } = supplierOrderSlice.actions;
export default supplierOrderSlice;
