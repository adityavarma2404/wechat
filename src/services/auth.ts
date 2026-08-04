import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export type SignupPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export function signupUser(payload: SignupPayload) {
  return axios.post(`${API_BASE_URL}/api/auth/signup`, payload);
}

export function loginUser(payload: LoginPayload) {
  return axios.post(`${API_BASE_URL}/api/auth/login`, payload);
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string") return message;
  }

  return fallback;
}
