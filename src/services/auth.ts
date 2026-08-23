import axios from "axios";
import { publicApi } from "./api";

export type SignupPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type User = {
  _id: number | string;
  email: string;
  fullName: string;
  profileImage: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};

export function signupUser(payload: SignupPayload) {
  return publicApi.post("/api/auth/signup", payload);
}

export function loginUser(payload: LoginPayload) {
  return publicApi.post<AuthResponse>("/api/auth/login", payload);
}

export function refreshAccessToken() {
  return publicApi.post<AuthResponse>("/api/auth/refresh");
}

export function logoutUser() {
  return publicApi.post("/api/auth/logout");
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string") return message;
  }

  return fallback;
}
