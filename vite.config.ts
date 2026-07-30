import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/chen-kunge-portfolio/",
  plugins: [react()],
});
