"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MrpState from "../types/mrpTypes";
import axios from "axios";
import build from "next/dist/build";
import { MRP_ALERT_MESSAGES } from "@/utilities/constants/mrp";

const initialState: MrpState = {
  data: {},
  status: "idle",
  error: null,
  alertMessage: "",
  alertResult: "",
};

export const calculateMRP = createAsyncThunk(
  "mrp/calculate",
  async ({ productId, requiredQuantity }: { productId: string; requiredQuantity: number }) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/mrp/calculate`,
      { productId, requiredQuantity },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.result;
  }
);

// export const updateStock = createAsyncThunk(
//   "mrp/updateStock",
//   async (updates: { materialId: string; quantityToAdd: number }[], { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/mrp/update-stock`, updates, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       return response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Stock update failed");
//     }
//   }
// );

export const createSupplierOrdersFromMRP = createAsyncThunk(
  "mrp/createSupplierOrdersFromMRP",
  async ({ warehouseId, mrpResult }: { warehouseId: string; mrpResult: any }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/mrp/create-supplier-order`,
        {
          warehouseId,
          mrpResult,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.orders;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Sipariş oluşturma işlemi başarısız oldu.");
    }
  }
);

const mrpSlice = createSlice({
  name: "mrp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(calculateMRP.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(calculateMRP.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.alertMessage = MRP_ALERT_MESSAGES.calculateMRPSuccess;
      state.alertResult = "success";
    });
    builder.addCase(calculateMRP.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "MRP calculation failed";
    });

    builder.addCase(createSupplierOrdersFromMRP.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createSupplierOrdersFromMRP.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.alertMessage = MRP_ALERT_MESSAGES.createSupplierOrderSuccess;
      state.alertResult = "success";
    });
    builder.addCase(createSupplierOrdersFromMRP.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Supplier order creation failed";
    });
  },
});

export default mrpSlice;
