import { axiosClient } from "../lib/axios";

export interface SignInData {
  identifier: string;
  password: string;
}

export interface SignUpData {
  username: string;
  phone_number: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const signIn = (signInData: SignInData) => {
  return axiosClient.post("/auth/sign-in", signInData);
};

export const signUp = (signUpData: SignUpData) => {
  return axiosClient.post("/auth/sign-up", signUpData);
};

export const signOut = () => {
  return axiosClient.post("/auth/sign-out");
};

export const getCurrentUser = async () => {
  return axiosClient.get("/auth/me");
};
