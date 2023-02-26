import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return defineConfig({
    plugins: [react(), eslint({ useEslintrc: true, emitError: true })],
    server: {
      port: parseInt(env.VITE_UI_PORT),
    }
  });
};
