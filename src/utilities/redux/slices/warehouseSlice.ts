import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import WarehouseState from "../types/warehouseTypes";
import axios from "axios";
import IWarehouse from "@/models/warehouse/IWarehouse";
import { WAREHOUSE_ALERT_MESSAGES } from "@/utilities/constants/warehouse";

const initialState: WarehouseState = {
  warehouses: [],
  status: "idle",
  error: null,
  alertMessage: "",
  alertResult: "",
};

export const fetchWarehouses = createAsyncThunk("warehouse/fetchWarehouses", async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/warehouses`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data.warehouses;
});

export const addWarehouse = createAsyncThunk("warehouse/addWarehouse", async (newWarehouse: IWarehouse, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/warehouses`, newWarehouse, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.warehouse;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Depo eklenirken hata oluştu.");
  }
});

export const updateWarehouse = createAsyncThunk(
  "warehouse/updateWarehouse",
  async ({ id, updatedWarehouse }: { id: string; updatedWarehouse: Partial<IWarehouse> }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/warehouses/id`,
        { id, ...updatedWarehouse },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.warehouse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Depo güncellenirken hata oluştu.");
    }
  }
);

export const deleteWarehouse = createAsyncThunk("warehouse/deleteWarehouse", async (id: string, { rejectWithValue }) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/warehouses`, {
      data: { id },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Depo silinirken hata oluştu.");
  }
});

const warehouseSlice = createSlice({
  name: "warehouse",
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
      // fetchWarehouses
      .addCase(fetchWarehouses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWarehouses.fulfilled, (state, action: PayloadAction<IWarehouse[]>) => {
        state.status = "succeeded";
        state.warehouses = action.payload;
        state.alertMessage = WAREHOUSE_ALERT_MESSAGES.fetchWarehousesSuccess;
        state.alertResult = "success";
      })
      .addCase(fetchWarehouses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
        state.alertMessage = WAREHOUSE_ALERT_MESSAGES.fetchWarehousesError;
        state.alertResult = "error";
      })

      // addWarehouse
      .addCase(addWarehouse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addWarehouse.fulfilled, (state, action: PayloadAction<IWarehouse>) => {
        state.status = "succeeded";
        state.warehouses.push(action.payload);
        state.alertMessage = WAREHOUSE_ALERT_MESSAGES.addWarehouseSuccess;
        state.alertResult = "success";
      })
      .addCase(addWarehouse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
        state.alertMessage = WAREHOUSE_ALERT_MESSAGES.addWarehouseError;
        state.alertResult = "error";
      })

      // updateWarehouse
      .addCase(updateWarehouse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateWarehouse.fulfilled, (state, action: PayloadAction<IWarehouse>) => {
        state.status = "succeeded";
        state.warehouses = state.warehouses.map((warehouse) =>
          warehouse._id === action.payload._id ? action.payload : warehouse
        );
        state.alertMessage = WAREHOUSE_ALERT_MESSAGES.updateWarehouseSuccess;
        state.alertResult = "success";
      })
      .addCase(updateWarehouse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
        state.alertMessage = WAREHOUSE_ALERT_MESSAGES.updateWarehouseError;
        state.alertResult = "error";
      })

      // deleteWarehouse
      .addCase(deleteWarehouse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWarehouse.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "succeeded";
        state.warehouses = state.warehouses.filter((warehouse) => warehouse._id !== action.payload);
        state.alertMessage = WAREHOUSE_ALERT_MESSAGES.deleteWarehouseSuccess;
        state.alertResult = "success";
      })
      .addCase(deleteWarehouse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
        state.alertMessage = WAREHOUSE_ALERT_MESSAGES.deleteWarehouseError;
        state.alertResult = "error";
      });
  },
});

export const { resetError, resetAlert } = warehouseSlice.actions;
export default warehouseSlice;
