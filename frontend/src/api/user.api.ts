import { axiosClient } from "../lib/axios";
import type { SignInData, SignUpData, UserProfile } from "../types/User/User";

export const signIn = async (signInData: SignInData) => {
  return axiosClient.post("/auth/sign-in", signInData);
};

export const signUp = async (signUpData: SignUpData) => {
  return axiosClient.post("/auth/sign-up", signUpData);
};

export const signOut = async () => {
  return axiosClient.post("/auth/sign-out");
};

export const getCurrentUser = async () => {
  return axiosClient.get("/auth/me");
};

export const updateUser = async (updateUserData: Partial<UserProfile>) => {
  return axiosClient.put("/auth/update-profile", updateUserData);
};

export const getVerificationToken = async () => {
  return axiosClient.get("/auth/verification-token");
};

export const verifyEmail = async (token: string) => {
  return axiosClient.post("/auth/verify-email", { token });
};

export const geytPasswordResetToken = async (email: string) => {
  return axiosClient.post("/auth/reset-password-token", { email });
};

export const resetPassword = async (token: string, newPassword: string) => {
  return axiosClient.post(`/auth/reset-password/${token}`, { newPassword });
};

export const getAllUsers = async (): Promise<UserProfile[]> => {
  const response = await axiosClient.get("/auth/");
  return response.data.data;
};