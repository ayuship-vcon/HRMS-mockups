import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../reducer/userSlice'
import { baseApi } from "../api/baseApi";


const store = configureStore({
    reducer:{
        user: userReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export default store;