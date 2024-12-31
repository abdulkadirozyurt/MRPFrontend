import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import SupplierOrdersState from "../types/supplierOrderTypes";
import { ISupplierOrder } from "@/models/order/ISupplierOrder";

const alertMessages = {
  fetchSuccess: "Tedarikçi siparişleri başarıyla listelendi.",
  fetchError: "Tedarikçi siparişleri listelenirken bir hata oluştu!",
};

const initialState: SupplierOrdersState = {
  orders: [],
  status: "idle",
  error: null,
  alertMessage: "",
  alertResult: "",
};

// Supplier Orders Fetch
export const fetchSupplierOrders = createAsyncThunk("supplierOrder/fetchSupplierOrders", async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier-orders`);
  return response.data.orders;
});

const supplierOrderSlice = createSlice({
  name: "supplierOrder",
  initialState,
  reducers: {
    resetAlert: (state) => {
      state.alertMessage = "";
      state.alertResult = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupplierOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSupplierOrders.fulfilled, (state, action: PayloadAction<ISupplierOrder[]>) => {
        state.status = "succeeded";
        state.orders = action.payload;
        state.alertMessage = alertMessages.fetchSuccess;
        state.alertResult = "info";
      })
      .addCase(fetchSupplierOrders.rejected, (state) => {
        state.status = "failed";
        state.alertMessage = alertMessages.fetchError;
        state.alertResult = "error";
      });
  },
});

export const { resetAlert } = supplierOrderSlice.actions;
export default supplierOrderSlice;
