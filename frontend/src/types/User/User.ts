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

export interface UserProfile {
  user_id: string;
  username: string;
  email: string;
  phone_number: string;
  role: string;
  fullname: string | null;
  profile_pic: string | null;
}
