import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../../api/models/services/AuthService';
import { IAuthResponse } from '../../../api/models/models/AuthResponse';
import { BASE_URL } from '../../../api/models/http';
import axios from 'axios';

const login = createAsyncThunk('login', async (payload: {email: string, password: string}, {rejectWithValue}) => {
  try {
    const response = await authService.login(payload.email, payload.password)
    console.log(response)
    localStorage.setItem('token', response.data.accessToken)
    return response.data;
  }
  catch (e) {
    alert(e)
    return rejectWithValue(e)
  }
});

const checkAuth = createAsyncThunk('checkAuth', async (_, {rejectWithValue}) => {
  try {
    const {data} = await axios.get<IAuthResponse>(`${BASE_URL}auth/refresh`, {withCredentials: true})
    console.log(data)
    localStorage.setItem('token', data.accessToken)
    return data;
  }
  catch (e) {
    return rejectWithValue(e)
  }
});

const registration = createAsyncThunk('registration', async (payload: {email: string, password: string}, {rejectWithValue}) => {
  try {
    const response = await authService.registration(payload.email, payload.password)
    console.log(response)
    localStorage.setItem('token', response.data.accessToken)
    return response.data
  }
  catch (e) {
    alert(e)
    return rejectWithValue(e)
  }
});

const logout = createAsyncThunk('logout', async (_, {rejectWithValue}) => {
  try {
    await authService.logout()
    localStorage.removeItem('token')
  }
  catch (e) {
    alert(e)
    return rejectWithValue(e)
  }
});

export { login, registration, logout, checkAuth };