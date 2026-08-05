import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Investment Calculator',
  description: 'Calculate a year-by-year projection for your investment.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
