import { defineConfig } from 'vitest/config';

export default defineConfig({  
  root: "src",
  plugins: [],
  test: {
    globals: true, 
    environment: 'jsdom', 
  },
});
