import { axiosClient } from "../lib/axios";

export interface LoginData {
  username: string;
  password: string;
}

export const login = (loginData: LoginData) => {
  return axiosClient.post("/login", loginData);
};
