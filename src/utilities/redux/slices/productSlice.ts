import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ProductState from "../types/productTypes";
import { IProduct } from "@/models/product/IProduct";

const alertMessages = {
  fetchProductsSuccess: "Ürünler listelendi.",
  fetchProductsError: "Ürünler listelenirken hata oluştu!",
};

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
  alertMessage: "",
  alertResult: "",
};

export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  return response.data.products;
});

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id: string) => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`, {
    data: { id },
  });
  return response.data.message;
});

export const addProduct = createAsyncThunk( "product/addProduct", async (newProduct: IProduct, { rejectWithValue }) => {  
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, newProduct);
    return response.data.product;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || "Ürün ekleme başarısız oldu.");
  }
});

const productSlice = createSlice({
  name: "product",
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
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.alertMessage = alertMessages.fetchProductsSuccess;
        state.alertResult = "info";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
        state.alertMessage = alertMessages.fetchProductsError;
        state.alertResult = "error";
      })

      .addMatcher(
        (action) => action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"),
        (state) => {
          setTimeout(() => {
            state.alertMessage = "";
            state.alertResult = "";
          }, 3000);
        }
      );
  },
});

export const { resetError, resetAlert } = productSlice.actions;
export default productSlice;
