/**
 * axiosInstance
 *
 * Configured axios with:
 *  1. Request interceptor  → attach Authorization header
 *  2. Response interceptor → on 401, attempt token refresh (max 3x), then auto-logout
 *
 * Queue pattern: while refresh is in-flight, all other 401s are queued and
 * resolved/rejected together when refresh settles — no duplicate refresh calls.
 */

import axios from "axios";
import { tokenManager } from "./TokenManager";
import { AUTH_EVENTS, authEvents } from "./AuthEvent";
import { authService } from "@/service/AuthService";

const BASE_URL =
  import.meta.env.VITE_API_BASE_AUTH_URL || "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ─────────────────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ────────────────────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 and avoid infinite loops with _retry flag
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If refresh retries exceeded → force logout immediately
    if (tokenManager.hasExceededRetryLimit) {
      authEvents.emit(AUTH_EVENTS.LOGOUT, { reason: "refresh_limit_exceeded" });
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // ── Queue pattern: if already refreshing, wait in line ──────────────────
    if (tokenManager.isRefreshing) {
      return new Promise((resolve, reject) => {
        tokenManager.enqueueRequest(
          (newToken: string) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          },
          (err: any) => reject(err),
        );
      });
    }

    // ── This request becomes the "refresh leader" ────────────────────────────
    tokenManager.setRefreshing(true);
    tokenManager.incrementRetryCount();

    try {
      const refreshToken = tokenManager.getRefreshToken();
      if (!refreshToken) throw new Error("No refresh token available");

      // Call refresh endpoint (use plain axios to avoid interceptor loop)
      const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
        refreshToken,
      });
      const { accessToken, refreshToken: newRefreshToken } = data.data;
      // Persist new tokens
      tokenManager.setTokens({ accessToken, refreshToken: newRefreshToken });
      tokenManager.resetRetryCount();
      authEvents.emit(AUTH_EVENTS.TOKEN_REFRESHED, {
        newAccessToken: accessToken,
        newRefreshToken,
      });
      console.log("[Axios] Token refreshed successfully");

      // Drain queue with new token
      tokenManager.resolveQueue(accessToken);

      // Retry original request
      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      tokenManager.rejectQueue(refreshError);

      // If we've now hit the limit after this failure → logout
      if (tokenManager.hasExceededRetryLimit) {
        authEvents.emit(AUTH_EVENTS.LOGOUT, { reason: "refresh_failed" });
      }

      return Promise.reject(refreshError);
    } finally {
      tokenManager.setRefreshing(false);
    }
  },
);

export default axiosInstance;
