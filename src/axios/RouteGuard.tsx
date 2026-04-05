/**
 * Route Guards
 *
 * ProtectedRoute — redirects to /login if not authenticated
 * PublicRoute    — redirects to /dashboard if already authenticated (login page, etc.)
 */

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { ROUTES } from "@/constant/routes";

// ── ProtectedRoute ─────────────────────────────────────────
export function ProtectedRoute({ redirectTo = ROUTES.SIGN_IN }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Prevent redirect flicker while bootstrapping
    return <FullScreenLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

// ── PublicRoute ────────────────────────────────────────────
export function PublicRoute({ redirectTo = ROUTES.DASHBOARD }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <FullScreenLoader />;

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

// ── Internal ───────────────────────────────────────────────
function FullScreenLoader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#0f0f0f",
        color: "#fff",
        fontFamily: "monospace",
        fontSize: 14,
        letterSpacing: 2,
      }}
    >
      LOADING...
    </div>
  );
}
