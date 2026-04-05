/**
 * authEvents
 * A tiny event bus that decouples the axios layer from React state.
 * The axios interceptor fires 'logout' and AuthProvider listens.
 * This avoids circular imports between services and React context.
 */

type Listener = (...args: unknown[]) => void;

class AuthEventBus {
  private listeners: Record<string, Listener[]> = {};

  on(event: string, cb: Listener) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(cb);
    // Return unsubscribe function
    return () => this.off(event, cb);
  }

  off(event: string, cb: Listener) {
    this.listeners[event] = (this.listeners[event] || []).filter(
      (fn) => fn !== cb
    );
  }

  emit(event: string, ...args: unknown[]) {
    (this.listeners[event] || []).forEach((fn) => fn(...args));
  }
}

export const authEvents = new AuthEventBus();
export const AUTH_EVENTS = {
  LOGOUT: 'logout',
  TOKEN_REFRESHED: 'token_refreshed',
} as const;