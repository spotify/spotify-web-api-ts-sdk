import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: "example",
  server: {
    port: 3000,
    strictPort: true,
    host: '127.0.0.1',
  },
  plugins: [],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
