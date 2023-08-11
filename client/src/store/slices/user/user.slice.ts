import { IUser } from "../../../models/user.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { login, registration, logout, checkAuth } from "./actions";
import { IAuthResponse } from "../../../api/models/models/AuthResponse";

interface InitialState {
  user: IUser | null;
  message: string | null;
  isLoading: boolean;
}

const initialState = {
  user: null,
  message: null,
  isLoading: false,
} as InitialState;

const userSclice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(login.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
      state.isLoading = false;
      state.user = action.payload.user;
    })
    builder.addCase(login.rejected, (state, {error}) => {
      state.isLoading = false;
      state.message = error.message as string;
    })
    builder.addCase(registration.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(registration.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
      state.isLoading = false;
      state.user = action.payload.user;
    })
    builder.addCase(registration.rejected, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
    })
    builder.addCase(checkAuth.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
      state.user = action.payload.user;
      state.isLoading = false;
    })
    builder.addCase(checkAuth.rejected, (state) => {
      state.isLoading = false;
    })
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
    })
  },
});


export default userSclice.reducer;
