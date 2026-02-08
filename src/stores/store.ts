import { configureStore } from '@reduxjs/toolkit'
import resourceReducer from "./slices/resourceSlice";

export const store = configureStore({
  reducer: { resource: resourceReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
