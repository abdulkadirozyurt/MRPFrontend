"use client";

import IMaterial from "@/models/material/IMaterial";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import MaterialState from "../types/materialTypes";

const alertMessages = {
  addMaterialSuccess: "Malzeme başarıyla eklendi.",
  addMaterialError: "Malzeme eklenirken bir hata oluştu!",
  fetchMaterialsSuccess: "Malzemeler listelendi.",
  fetchMaterialsError: "Malzemeler listelenirken hata oluştu!",
  deleteMaterialSuccess: "Malzeme başarıyla silindi.",
  deleteMaterialError: "Malzeme silinirken bir hata oluştu!",
  updateMaterialSuccess: "Malzeme başarıyla güncellendi.",
  updateMaterialError: "Malzeme güncellenirken bir hata oluştu!",
};

const initialState: MaterialState = {
  materials: [],
  status: "idle",
  error: null,
  alertMessage: "",
  alertResult: "",
};

export const fetchMaterials = createAsyncThunk("material/fetchMaterials", async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/materials`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data.materials;
});

export const addMaterial = createAsyncThunk("material/addMaterial", async (newMaterial: IMaterial, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/materials`, newMaterial, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.material;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || "material add failed");
  }
});

export const deleteMaterial = createAsyncThunk("material/deleteMaterial", async (id: string, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/materials`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: { id },
    });
    return response.data.message;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || "material delete failed");
  }
});

export const updateMaterial = createAsyncThunk(
  "material/updateMaterial",
  async ({ id, updatedMaterial }: { id: string; updatedMaterial: IMaterial }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/materials`,
        { id, ...updatedMaterial },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.material;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "material update failed");
    }
  }
);

export const fetchMaterialsBySupplier = createAsyncThunk(
  "material/fetchMaterialsBySupplier",
  async (supplierId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/materials/get-supplier`,
        { supplierId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.materials;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Malzeme bilgileri alınamadı.");
    }
  }
);

const materialSlice = createSlice({
  name: "material",
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

      // fetchMaterials
      .addCase(fetchMaterials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.alertMessage = alertMessages.fetchMaterialsSuccess;
        state.alertResult = "info";
        state.materials = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.status = "failed";
        state.alertMessage = alertMessages.fetchMaterialsError;
        state.alertResult = "error";
        state.error = action.error.message || "failed to fetch materials";
      })

      // add material
      .addCase(addMaterial.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMaterial.fulfilled, (state, action: PayloadAction<IMaterial>) => {
        state.status = "succeeded";
        state.alertMessage = alertMessages.addMaterialSuccess;
        state.alertResult = "success";
        state.materials.push(action.payload);
      })
      .addCase(addMaterial.rejected, (state, action) => {
        state.status = "failed";
        state.alertMessage = alertMessages.addMaterialError;
        state.alertResult = "error";
        state.error = (action.payload as string) || "failed to add material";
      })
      .addCase(deleteMaterial.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.alertMessage = alertMessages.deleteMaterialSuccess;
        state.alertResult = "success";
        state.materials = state.materials.filter((material) => material._id !== action.payload);
      })
      .addCase(deleteMaterial.rejected, (state, action) => {
        state.status = "failed";
        state.alertMessage = alertMessages.deleteMaterialError || "failed to delete material";
        state.alertResult = "error";
      })
      .addCase(updateMaterial.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMaterial.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.alertMessage = alertMessages.updateMaterialSuccess;
        state.alertResult = "success";
        state.materials = state.materials.map((material) => (material._id === action.payload._id ? action.payload : material));
      })
      .addCase(updateMaterial.rejected, (state, action) => {
        state.status = "failed";
        state.alertMessage = alertMessages.updateMaterialError;
        state.alertResult = "error";
        state.error = (action.payload as string) || "failed to update material";
      })
      
      .addCase(fetchMaterialsBySupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMaterialsBySupplier.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = "succeeded";
        state.materials = action.payload;
      })
      .addCase(fetchMaterialsBySupplier.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
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

export const { resetError, resetAlert } = materialSlice.actions;
export default materialSlice;
