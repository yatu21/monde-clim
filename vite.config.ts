import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// ============================================================
// VITE CONFIGURATION — MONDE CLIM
// ============================================================

export default defineConfig({
  base: "/monde-clim/",

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  server: {
    port: 3000,
    host: true,
    open: true,
  },

  build: {
    outDir: "dist",
    sourcemap: true,
  },
});