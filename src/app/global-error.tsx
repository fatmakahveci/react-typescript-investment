'use client';

export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: '3rem 1rem', color: '#f4f7fb', background: '#07111f', fontFamily: 'system-ui', textAlign: 'center' }}>
        <title>Something went wrong</title>
        <h1>We couldn&apos;t load the calculator.</h1>
        <p>Your data stays in this browser. Try loading the page again.</p>
        <button type="button" onClick={retry} style={{ padding: '0.75rem 1rem', border: 0, borderRadius: '0.5rem', background: '#5ee1b3', cursor: 'pointer' }}>
          Try again
        </button>
      </body>
    </html>
  );
}
