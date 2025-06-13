import { axiosClient } from "../lib/axios";
import type { SignInData, UserProfile } from "../types/User/User";

export const signIn = async (
  signInData: SignInData
): Promise<Partial<UserProfile>> => {
  const response = await axiosClient.post("/auth/sign-in", signInData);

  return response.data.data;
};

export const signUp = async (
  signUpData: Partial<UserProfile>
): Promise<UserProfile> => {
  const response = await axiosClient.post("/auth/sign-up", signUpData);

  return response.data.data;
};

export const signOut = async (): Promise<string> => {
  const response = await axiosClient.post("/auth/sign-out");

  return response.data.message;
};

export const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await axiosClient.get("/auth/me");

  return response.data.data;
};

export const updateUser = async (
  updateUserData: Partial<UserProfile>
): Promise<UserProfile> => {
  const response = await axiosClient.put(
    "/auth/update-profile",
    updateUserData
  );

  return response.data.data;
};

export const getVerificationToken = async (): Promise<string> => {
  const response = await axiosClient.get("/auth/verification-token");

  return response.data.message;
};

export const verifyEmail = async (
  verification_token: string
): Promise<string> => {
  const response = await axiosClient.post("/auth/verify", {
    verification_token,
  });

  return response.data.message;
};

export const geytPasswordResetToken = async (
  email: string
): Promise<string> => {
  const response = await axiosClient.post("/auth/reset-password-token", {
    email,
  });

  return response.data.message;
};

export const resetPassword = async (
  reset_password_token: string,
  new_password: string,
  confirm_new_password: string
): Promise<string> => {
  const response = await axiosClient.post(
    `/auth/reset-password/${reset_password_token}`,
    {
      new_password,
      confirm_new_password,
    }
  );

  return response.data.message;
};

export const getAllUsers = async (): Promise<UserProfile[]> => {
  const response = await axiosClient.get("/auth/");
  return response.data.data;
};

export const banUser = async (id: string) => {
  const response = await axiosClient.put("/auth/ban", { user_id: id });
  return response.data.data;
};
