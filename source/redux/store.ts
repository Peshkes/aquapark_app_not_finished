import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from "./settings/settingsSlice.ts";
import authReducer from "./auth/authSlice.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
