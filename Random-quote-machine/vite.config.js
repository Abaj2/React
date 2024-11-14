import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // This is the default; you can leave it as "/"
  server: {
    port: 3000, // Port can be customized here
  },
});
