import MaterialState from "@/utilities/types/materialTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: MaterialState = {
  materials: [],
  status: "idle",
  error: null,
};

export const fetchMaterials = createAsyncThunk("material/fetchMaterials", async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/materials`);
  return response.data.materials;
});

const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const {} = materialSlice.actions;
export default materialSlice;
