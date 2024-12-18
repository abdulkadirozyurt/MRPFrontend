import { createSlice } from "@reduxjs/toolkit";
import ProductState from "../types/productTypes";

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

export const {} = productSlice.actions;
export default productSlice;
