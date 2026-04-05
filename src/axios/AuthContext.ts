/**
 * AuthContext + AuthProvider
 *
 * - Bootstraps auth state on app load (checks existing tokens)
 * - Listens to authEvents.LOGOUT → clears state and redirects
 * - Exposes: user, isAuthenticated, isLoading, login, logout
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { tokenManager } from "./TokenManager";
import { AUTH_EVENTS, authEvents } from "./AuthEvent";
import { authService } from "@/service/AuthService";
import { LoginDto } from "@/dtos/LoginDto";
import { UserProfileDto } from "@/dtos/UserProfileDto";
import { ROUTES } from "@/constant/routes";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfileDto | null>(null);
  const [isLoading, setIsLoading] = useState(true); // true until bootstrap done

  const redirectToSignIn = useCallback(
    (reason?: string) => {
      console.log("Redirecting to sign-in...");
      console.log("Reason for redirect:", reason);
      navigate(ROUTES.SIGN_IN, {
        replace: true,
        state: reason ? { reason } : undefined,
      });
    },
    [navigate],
  );

  // ── Bootstrap: restore session on mount ───────────────────
  useEffect(() => {
    const bootstrap = async () => {
      const me = await authService.getMe();

      if (tokenManager.getAccessToken()) {
        try {
          const me = await authService.getMe();
          console.log("[Auth] Bootstrapped user:", me);
          setUser(me);
        } catch {
          // Token might be expired and refresh will happen via interceptor.
          // If that also fails, LOGOUT event fires automatically.
          tokenManager.clearTokens();
        }
      }

      setIsLoading(false);
    };

    bootstrap();
  }, []);
  // ── Listen for token refresh event ───────────────────────
  useEffect(() => {
    const unsubscribeRefresh = authEvents.on(
      AUTH_EVENTS.TOKEN_REFRESHED,
      (args: unknown) => {
        const { newAccessToken, newRefreshToken } =
          (args as { newAccessToken: string; newRefreshToken: string }) || {};
        console.log("[Auth] Token refreshed:", {
          newAccessToken,
          newRefreshToken,
        });

        // Set new token
        tokenManager.setTokens({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });

        // Fetch updated user info after token refresh
        authService
          .getMe()
          .then((me) => {
            setUser(me);
          })
          .catch((error) => {
            console.error("Error fetching user after token refresh:", error);
          });
      },
    );

    return unsubscribeRefresh;
  }, []);

  // ── Listen for forced logout from interceptor ─────────────
  useEffect(() => {
    const unsubscribe = authEvents.on(AUTH_EVENTS.LOGOUT, (args: unknown) => {
      const { reason } = (args as { reason?: string }) || {};
      console.warn("[Auth] Forced logout — reason:", reason);
      tokenManager.clearTokens();
      setUser(null);
      redirectToSignIn(reason);
    });

    return unsubscribe;
  }, [redirectToSignIn]);

  // ── Actions ───────────────────────────────────────────────
  const login = useCallback(async (credentials: LoginDto) => {
    const loggedInUser = await authService.login(credentials);
    tokenManager.setTokens({
      accessToken: loggedInUser.accessToken,
      refreshToken: loggedInUser.refreshToken,
    });

    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    tokenManager.clearTokens();
    redirectToSignIn();
  }, [redirectToSignIn]);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    logout,
  };
  return React.createElement(AuthContext.Provider, { value }, children);
}

// ── Hook ───────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
