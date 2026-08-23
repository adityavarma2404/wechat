import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  type LoginPayload,
  type User,
} from "../services/auth";
import { api } from "../services/api";
import { AuthContext } from "./auth-context";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const accessTokenRef = useRef<string | null>(null);
  const refreshPromiseRef = useRef<Promise<string> | null>(null);

  const updateAccessToken = useCallback((token: string | null) => {
    accessTokenRef.current = token;
  }, []);

  const clearAuth = useCallback(() => {
    updateAccessToken(null);
    setUser(null);
  }, [updateAccessToken]);

  const renewAccessToken = useCallback(async () => {
    try {
      const { data } = await refreshAccessToken();
      updateAccessToken(data.accessToken);
      return data.accessToken;
    } catch (error) {
      clearAuth();
      throw error;
    }
  }, [clearAuth, updateAccessToken]);

  useEffect(() => {
    let isActive = true;
    refreshAccessToken()
      .then(({ data }) => {
        if (!isActive) return;
        updateAccessToken(data.accessToken);
        setUser(data.user);
      })
      .catch(() => {
        if (!isActive) return;
        updateAccessToken(null);
        setUser(null);
      })
      .finally(() => {
        if (isActive) setIsInitializing(false);
      });

    return () => {
      isActive = false;
    };
  }, [updateAccessToken]);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      const token = accessTokenRef.current;

      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }

      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const request = error.config as RetryableRequestConfig | undefined;
        if (error.response?.status !== 401 || !request || request._retry) {
          return Promise.reject(error);
        }

        request._retry = true;

        try {
          refreshPromiseRef.current ??= renewAccessToken().finally(() => {
            refreshPromiseRef.current = null;
          });

          const newAccessToken = await refreshPromiseRef.current;
          request.headers.set("Authorization", `Bearer ${newAccessToken}`);
          return api(request);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [renewAccessToken]);

  const login = useCallback(
    async (payload: LoginPayload) => {
      const { data } = await loginUser(payload);
      updateAccessToken(data.accessToken);
      setUser(data.user);
    },
    [updateAccessToken],
  );

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      isInitializing,
      login,
      logout,
    }),
    [user, isInitializing, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
