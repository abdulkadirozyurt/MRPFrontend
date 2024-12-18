import IMaterial from "@/models/material/IMaterial";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import MaterialState from "../types/materialTypes";

const initialState: MaterialState = {
  materials: [],
  status: "idle",
  error: null,
};

export const fetchMaterials = createAsyncThunk("material/fetchMaterials", async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/materials`);
  return response.data.materials;
});

export const addMaterial = createAsyncThunk(
  "material/addMaterial",
  async (newMaterial: IMaterial, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/materials`,
        newMaterial
      );
      return response.data.material;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "material add failed");
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
  },
  extraReducers: (builder) => {
    builder

      // fetchMaterials
      .addCase(fetchMaterials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.materials = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "failed to fetch materials";
      })

      // add material
      .addCase(addMaterial.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMaterial.fulfilled, (state, action: PayloadAction<IMaterial>) => {
        state.status = "succeeded";
        state.materials.push(action.payload);
      })
      .addCase(addMaterial.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "failed to add material";
      });
  },
});

export const {} = materialSlice.actions;
export default materialSlice;
