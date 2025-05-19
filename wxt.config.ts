import path from "path";
import { defineConfig } from "wxt";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  srcDir: "src",
  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }),
  manifest: {
    permissions: ["storage", "offscreen", "tabs", "activeTab", "tabCapture"],
  },
});
