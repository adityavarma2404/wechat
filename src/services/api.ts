import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:5000" : undefined);

if (!API_BASE_URL) {
  throw new Error("VITE_API_URL must be configured for production builds");
}

const clientOptions = {
  baseURL: API_BASE_URL,
  withCredentials: true,
};

// Use this client for endpoints that require an access token.
export const api = axios.create(clientOptions);

// Authentication endpoints must bypass the 401 refresh interceptor.
export const publicApi = axios.create(clientOptions);
