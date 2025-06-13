export interface SignInData {
  identifier: string;
  password: string;
}

// export interface SignUpData {
//   username: string;
//   phone_number: string;
//   email: string;
//   password: string;
//   confirm_password: string;
// }

// export interface UserProfile {
//   user_id: string;
//   username: string;
//   email: string;
//   phone_number: string;
//   role: string;
//   fullname: string | null;
//   profile_pic: string | null;
// }

export interface UserProfile {
  user_id: string;
  google_id: string;
  username: string;
  email: string;
  phone_number: string;
  password: string;
  role: "ADMIN" | "USER" | string;
  fullname: string | null;
  profile_pic: string | null;
  created_at: string;
  is_verified: boolean;
  reset_password_token: string | null;
  reset_password_token_expires_at: string | null;
  verification_token: string | null;
  verification_token_expires_at: string | null;
  is_banned: boolean;
}
