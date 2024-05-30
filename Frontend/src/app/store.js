import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { productReducer } from "../features/product/productSlice";
import { cartReducer } from "../features/cart/cartSlice";
import { billReducer } from "../features/bill/billSlice";



export const store = configureStore({
  reducer: {
    auth:authReducer,
    product: productReducer,
    cart :cartReducer,
    bill:billReducer
  },
});