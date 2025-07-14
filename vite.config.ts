import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/data-visualization/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@commonComponents": path.resolve(__dirname, "./src/components"),
      "@componentsAboutHome": path.resolve(
        __dirname,
        "./src/pages/components/Home"
      ),
      "@animationHooks": path.resolve(__dirname, "./src/hooks/animation"),
    },
  },
});
