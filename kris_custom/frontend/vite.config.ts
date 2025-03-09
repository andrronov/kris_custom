import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const resolve = (path: string) => {
  return fileURLToPath(new URL(path, import.meta.url));
};

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
  base: "./"
});