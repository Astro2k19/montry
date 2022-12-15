import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import viteSvgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteSvgr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@styles": path.resolve(__dirname, "./src/scss"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@navigation": path.resolve(__dirname, "./src/navigation"),
      "@redux": path.resolve(__dirname, "./src/redux"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/settings.scss";`,
      },
    },
  },
});
