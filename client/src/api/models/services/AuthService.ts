import { AxiosResponse } from "axios";
import { IAuthResponse } from "../models/AuthResponse";
import $api from "../http";

export const authService = {
  async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>>{
    return $api.post('auth/login', {email, password})
  },
  async registration(email: string, password: string): Promise<AxiosResponse<IAuthResponse>>{
    return $api.post('auth/registration', {email, password})
  },
   async logout(): Promise<AxiosResponse<void>>{
    return $api.post('auth/logout')
  }
}

