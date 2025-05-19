import "@/styles/globals.css";

import ReactDOM from "react-dom/client";

import Content from "@/entrypoints/content/content";

export default defineContentScript({
  matches: ["*://meet.google.com/*", "*://*.zoom.us/*", "*://teams.live.com/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "kalma-copilot",
      position: "overlay",
      anchor: "html",
      append: "first",
      zIndex: 99999,

      onMount: (container) => {
        const content = document.createElement("div");
        container.append(content);
        const root = ReactDOM.createRoot(content);
        root.render(<Content />);
        return root;
      },

      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
