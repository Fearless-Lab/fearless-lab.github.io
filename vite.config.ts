import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    base: isProd ? "/data-visualization/" : "/",
    plugins: [react(), tailwindcss()],
  };
});
