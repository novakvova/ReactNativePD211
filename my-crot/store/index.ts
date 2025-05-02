import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {accountApi} from "@/serices/accountService";
import {categoryApi} from "@/serices/categoryService";
import authReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        user: authReducer,
        [accountApi.reducerPath]: accountApi.reducer, // Додаємо API reducer
        [categoryApi.reducerPath]: categoryApi.reducer, // Додаємо API reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(accountApi.middleware, categoryApi.middleware), // Додаємо API middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector