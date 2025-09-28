import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'client'),
  plugins: [
    tailwindcss({
      content: ['client/**/*.{js,ts}', 'server/**/*.{ejs,html}'],
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, 'client/dist'),
  },
});
