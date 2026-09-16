import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 基座：本地 8000 端口，子应用按注册表 entry 加载
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
    cors: true,
  },
});
