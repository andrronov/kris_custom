import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const resolve = (path: string) => {
  return fileURLToPath(new URL(path, import.meta.url));
};

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
  base: "./",
});
