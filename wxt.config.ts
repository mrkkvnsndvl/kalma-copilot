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
    name: "Kalma Copilot",
    version: "1.0",
    description:
      "Your AI assistant for online interviews. Provides real-time support during virtual meeting platforms.",
    homepage_url: "https://mrkkvnsndvl.vercel.app/",
    permissions: ["storage", "offscreen", "tabs", "activeTab", "tabCapture"],
  },
});
