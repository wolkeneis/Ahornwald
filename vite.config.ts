import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { dependencies } from "./package.json";

function renderChunks(dependencies: Record<string, string>) {
  const chunks: {
    [key: string]: unknown;
  } = {};
  Object.keys(dependencies).forEach((key) => {
    if (["react", "react-dom", "react-router-dom"].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig({
  server: {
    port: 3000,
    hmr: {
      clientPort: 443
    }
  },
  plugins: [react(), VitePWA({ registerType: "prompt" })],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ...renderChunks(dependencies)
        }
      }
    }
  }
});
