import { IUser } from "../../../models/user.model"

export interface IAuthResponse {
  user: IUser
  refreshToken: string
  accessToken: string
}