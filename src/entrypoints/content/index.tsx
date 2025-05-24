import "@/styles/globals.css";

import ReactDOM from "react-dom/client";

import Content from "@/entrypoints/content/content";

export default defineContentScript({
  matches: ["*://meet.google.com/*", "*://*.zoom.us/*", "*://teams.live.com/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    let isMounted = false;

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
        root.render(
          <Content
            onClose={async () => {
              await browser.runtime.sendMessage({ type: "stop-audio-capture" });
              ui.remove();
              isMounted = false;
            }}
          />
        );
        return root;
      },

      onRemove: (root) => {
        root?.unmount();
        isMounted = false;
      },
    });

    browser.runtime.onMessage.addListener((message) => {
      if (message.action === "inject-content" && !isMounted) {
        ui.mount();
        isMounted = true;
      }
    });
  },
});
