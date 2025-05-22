// instrumentation-client.ts
import * as Sentry from '@sentry/nextjs';

// Global flag to prevent duplicate initialization
declare global {
  interface Window {
    __SENTRY_INITIALIZED__?: boolean;
  }
}

export function register() {
  if (typeof window !== 'undefined' && !window.__SENTRY_INITIALIZED__) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      integrations: [Sentry.replayIntegration()],
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      debug: false
    });
    window.__SENTRY_INITIALIZED__ = true;
  }
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;