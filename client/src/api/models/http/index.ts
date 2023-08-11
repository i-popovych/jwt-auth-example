import axios from 'axios'
import { IAuthResponse } from '../models/AuthResponse'

export const BASE_URL = 'http://localhost:5000/api/'

const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL
}) 

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${ localStorage.getItem('token') }`
  return config;
})

$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
          const {data} = await axios.get<IAuthResponse>(`${BASE_URL}auth/refresh`, {withCredentials: true})
          localStorage.setItem('token', data.accessToken);
          return $api.request(originalRequest);
      } catch (e) {
          alert('User is not authorized')
      }
  }
  throw error;
})

export default $api;