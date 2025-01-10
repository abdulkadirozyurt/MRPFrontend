"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import ProductState from "../types/productTypes";
import { IProduct } from "@/models/product/IProduct";

const alertMessages = {
  fetchProductsSuccess: "Ürünler listelendi.",
  fetchProductsError: "Ürünler listelenirken hata oluştu!",
  deleteProductSuccess: "Ürün başarıyla silindi.",
  deleteProductError: "Ürün silinirken hata oluştu!",
  updateProductSuccess: "Ürün başarıyla güncellendi.",
  updateProductError: "Ürün güncellenirken hata oluştu!",
};

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
  alertMessage: "",
  alertResult: "",
};

export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data.products;
});

export const addProduct = createAsyncThunk("product/addProduct", async (newProduct: IProduct, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, newProduct);
    return response.data.product;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || "Ürün ekleme başarısız oldu.");
  }
});

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id: string, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`, {
      data: { id },
    });
    return response.data.message;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || "Ürün silme başarısız oldu.");
  }
});

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, updatedProduct }: { id: string; updatedProduct: IProduct }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, { id, ...updatedProduct });
      return response.data.product;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "Ürün güncelleme başarısız oldu.");
    }
  }
);

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

      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })

      .addCase(addProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
        state.products.push(action.payload);
      })

      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })

      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
        state.status = "succeeded";
        state.products = state.products.map((product) => (product._id === action.payload._id ? action.payload : product));
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })

      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
        state.alertMessage = alertMessages.deleteProductSuccess;
        state.alertResult = "success";
        state.status = "succeeded";
      })

      .addCase(deleteProduct.rejected, (state, action) => {
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

export const { resetError, resetAlert } = productSlice.actions;
export default productSlice;
