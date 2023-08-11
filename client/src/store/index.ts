import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user/user.slice";

const rootReducer = combineReducers({
  user: userSlice
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch