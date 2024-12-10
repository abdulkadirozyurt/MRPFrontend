import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import authSlice from "./slices/authSlice";

const rootReducer = combineReducers({
  products: productSlice.reducer,
  auth: authSlice.reducer,
});

export default rootReducer;
