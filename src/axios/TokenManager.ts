/**
 * TokenManager
 * Centralizes all token operations and manages refresh state.
 * Prevents race conditions with a pending-refresh queue pattern.
 */

const TOKEN_KEYS = {
  ACCESS: "access_token",
  REFRESH: "refresh_token",
};

const MAX_REFRESH_RETRIES = 3;

class TokenManager {
  private _refreshRetryCount: number;
  private _isRefreshing: boolean;
  private _pendingQueue: Array<{
    resolve: (newToken: string) => void;
    reject: (err: any) => void;
  }>;
  constructor() {
    this._refreshRetryCount = 0;
    this._isRefreshing = false;
    this._pendingQueue = [];
  }

  // ─── Storage ─────────────────────────────────────────────
  getAccessToken() {
    return localStorage.getItem(TOKEN_KEYS.ACCESS);
  }

  getRefreshToken() {
    return localStorage.getItem(TOKEN_KEYS.REFRESH);
  }

  setTokens({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) {
    if (accessToken) localStorage.setItem(TOKEN_KEYS.ACCESS, accessToken);
    if (refreshToken) localStorage.setItem(TOKEN_KEYS.REFRESH, refreshToken);
  }

  clearTokens() {
    localStorage.removeItem(TOKEN_KEYS.ACCESS);
    localStorage.removeItem(TOKEN_KEYS.REFRESH);
  }

  // ─── Refresh Queue ────────────────────────────────────────
  get isRefreshing() {
    return this._isRefreshing;
  }

  setRefreshing(value: boolean) {
    this._isRefreshing = value;
  }

  enqueueRequest(
    resolve: (newToken: string) => void,
    reject: (err: any) => void,
  ) {
    this._pendingQueue.push({ resolve, reject });
  }

  /**
   * After refresh succeeds → inject new token into all queued requests
   */
  resolveQueue(newAccessToken: string) {
    this._pendingQueue.forEach(({ resolve }) => resolve(newAccessToken));
    this._pendingQueue = [];
  }

  /**
   * After refresh fails → reject all queued requests
   */
  rejectQueue(error: any) {
    this._pendingQueue.forEach(({ reject }) => reject(error));
    this._pendingQueue = [];
  }

  // ─── Retry Counter ────────────────────────────────────────
  get refreshRetryCount() {
    return this._refreshRetryCount;
  }

  incrementRetryCount() {
    this._refreshRetryCount += 1;
  }

  resetRetryCount() {
    this._refreshRetryCount = 0;
  }

  get hasExceededRetryLimit() {
    return this._refreshRetryCount >= MAX_REFRESH_RETRIES;
  }
}

// Singleton
export const tokenManager = new TokenManager();
export { MAX_REFRESH_RETRIES };
