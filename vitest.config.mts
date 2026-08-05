import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      // Match the path alias used by Next.js and TypeScript in application imports.
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
