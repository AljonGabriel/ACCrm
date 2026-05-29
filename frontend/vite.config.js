import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // or '127.0.0.1'
    port: 5173,
    allowedHosts: [
      "station-frontend-194g.onrender.com", // <-- add your Render frontend host
    ],
  },
});
