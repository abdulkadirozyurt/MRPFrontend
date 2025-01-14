"use client";

import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import authSlice from "./slices/authSlice";
import materialSlice from "./slices/materialSlice";
import supplierSlice from "./slices/supplierSlice";
import customerOrdersSlice from "./slices/customerOrderSlice";
import supplierOrdersSlice from "./slices/supplierOrderSlice";
import customerSlice from "./slices/customerSlice";
import userSlice from "./slices/userSlice";
import mrpSlice from "./slices/mrpSlice";
import warehouseSlice from "./slices/warehouseSlice";

const rootReducer = combineReducers({
  mrp: mrpSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  product: productSlice.reducer,
  material: materialSlice.reducer,
  supplier: supplierSlice.reducer,
  customer: customerSlice.reducer,
  warehouse: warehouseSlice.reducer,
  customerOrders: customerOrdersSlice.reducer,
  supplierOrders: supplierOrdersSlice.reducer,
});

export default rootReducer;
