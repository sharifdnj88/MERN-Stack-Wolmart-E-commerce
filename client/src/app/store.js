import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import userReducer from "../features/user/userSlice.js";
import productReducer from "../features/product/productSlice.js";


// create store
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        product: productReducer,
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
    devTools: true
});


// export
export default store;