import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'client'), // point Vite to client folder
  plugins: [tailwindcss()],
  build: {
    outDir: path.resolve(__dirname, 'dist'), // optional: output folder
  },
});
