

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SupplierState from "../types/supplierTypes";
import axios from "axios";
import ISupplier from "@/models/supplier/ISupplier";

const alertMessages = {
  addSupplierSuccess: "Tedarikçi başarıyla eklendi.",
  addSupplierError: "Tedarikçi eklenirken bir hata oluştu!",
  fetchSupplierSuccess: "Tedarikçiler listelendi.",
  fetchSupplierError: "Tedarikçiler listelenirken hata oluştu!",
};

const initialState: SupplierState = {
  suppliers: [],
  status: "idle",
  error: null,
  alertMessage: "",
  alertResult: "",
};

export const fetchSuppliers = createAsyncThunk("supplier/fetchSuppliers", async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/suppliers`);
  return response.data.suppliers;
});

export const addSupplier = createAsyncThunk(
  "supplier/addSupplier",
  async (newSupplier: ISupplier, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/suppliers`,
        newSupplier
      );
      return response.data.supplier;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "supplier add failed");
    }
  }
);

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchSuppliers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.alertMessage = alertMessages.fetchSupplierSuccess;
        state.alertResult = "info";
        state.suppliers = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.status = "failed";
        state.alertMessage = alertMessages.fetchSupplierError;
        state.alertResult = "error";
        state.error = action.error.message || "supplier fetch failed";
      })

      .addCase(addSupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.alertMessage = alertMessages.addSupplierSuccess;
        state.alertResult = "success";
        state.suppliers.push(action.payload);
      })
      .addCase(addSupplier.rejected, (state, action) => {
        state.status = "failed";
        state.alertMessage = alertMessages.addSupplierError;
        state.alertResult = "error";
        state.error = action.error.message || "supplier add failed";
      })


      .addMatcher(
        (action) => action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"),
        (state) => {
          setTimeout(() => {
            state.alertMessage = "";
            state.alertResult = "";
          }, 2000);
        }
      );
  },
});

export const {} = supplierSlice.actions;
export default supplierSlice;
