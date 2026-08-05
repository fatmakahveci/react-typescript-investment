const endpoint = process.env.NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT || '/api/errors';

const sendError = (error: unknown) => {
  try {
    const value = error instanceof Error ? error : new Error(String(error));
    const payload = JSON.stringify({
      message: value.message,
      stack: value.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });
    navigator.sendBeacon(endpoint, new Blob([payload], { type: 'application/json' }));
  } catch {
    // Monitoring must never break the application.
  }
};

window.addEventListener('error', (event) => sendError(event.error ?? event.message));
window.addEventListener('unhandledrejection', (event) => sendError(event.reason));
