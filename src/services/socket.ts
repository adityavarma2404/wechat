import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:5000" : undefined);

if (!SOCKET_URL) {
  throw new Error("VITE_API_URL must be configured for production builds");
}

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

export function updateSocketAccessToken(accessToken: string | null) {
  if (!accessToken) {
    socket.disconnect();
    socket.auth = {};
    return;
  }

  socket.auth = { token: accessToken };

  if (!socket.connected) socket.connect();
}
