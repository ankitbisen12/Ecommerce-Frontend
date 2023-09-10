import { configureStore, createReducer } from "@reduxjs/toolkit";
import productReducer from "./../features/product/ProductListSlice";
import authReducer from "./../features/auth/authSlice";
import cartReducer from "./../features/Cart/cartSlice";
import orderReducer  from "./../features/order/orderSlice";
import userReducer from './../features/user/userSlice';


export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order:orderReducer,
    user:userReducer
  },
});
