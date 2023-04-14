import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: "example",
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
  plugins: [],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
