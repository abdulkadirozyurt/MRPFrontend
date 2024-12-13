import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import authSlice from "./slices/authSlice";
import materialSlice from "./slices/materialSlice";

const rootReducer = combineReducers({
  product: productSlice.reducer,
  auth: authSlice.reducer,
  material: materialSlice.reducer,
});

export default rootReducer;
