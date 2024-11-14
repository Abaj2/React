// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/React/Random-quote-machine/", // Set this to your GitHub Pages subdirectory
});
