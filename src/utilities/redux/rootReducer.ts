import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import authSlice from "./slices/authSlice";
import materialSlice from "./slices/materialSlice";
import supplierSlice from "./slices/supplierSlice";
import customerOrdersSlice from "./slices/customerOrderSlice";
import supplierOrdersSlice from "./slices/supplierOrderSlice";
import customerSlice from "./slices/customerSlice";

const rootReducer = combineReducers({
  product: productSlice.reducer,
  auth: authSlice.reducer,
  material: materialSlice.reducer,
  supplier: supplierSlice.reducer,
  customer: customerSlice.reducer,
  customerOrders: customerOrdersSlice.reducer,
  supplierOrders: supplierOrdersSlice.reducer,
});

export default rootReducer;
