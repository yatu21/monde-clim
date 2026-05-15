import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// ============================================================
// VITE CONFIGURATION — MONDE CLIM
// ============================================================
// To change the dev server port, edit the `server.port` below.
// To change the build output directory, edit `build.outDir`.
// ============================================================

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // @/ maps to the src/ directory — use it in imports like:
      // import Navbar from "@/components/Navbar"
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,          // Change port here if needed
    host: true,          // Allow external connections (LAN, etc.)
    open: true,          // Auto-open browser on dev start
  },
  build: {
    outDir: "dist",
    sourcemap: true,     // Set to false for smaller production build
  },
});
