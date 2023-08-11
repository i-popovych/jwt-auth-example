import { AxiosResponse } from "axios";
import $api from "../http";
import { IUser } from "../../../models/user.model";

export const userService = {
  async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get('users');
  }
}



