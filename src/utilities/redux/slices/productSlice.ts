import ProductState from "@/utilities/types/productTypes";
import { createSlice } from "@reduxjs/toolkit";

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
