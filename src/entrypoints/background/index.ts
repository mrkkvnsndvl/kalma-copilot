import { browser } from "#imports";

export default defineBackground(() => {
  browser.runtime.onMessage.addListener(async (message) => {
    if (message.type === "start-audio-capture") {
      if (await browser.offscreen.hasDocument?.()) {
        await browser.offscreen.closeDocument();
      }
      await browser.offscreen.createDocument({
        url: "/offscreen.html",
        reasons: [browser.offscreen.Reason.USER_MEDIA],
        justification: "USER_MEDIA is required for audio capture.",
      });
      browser.tabCapture.getMediaStreamId(
        { targetTabId: message.tabId },
        (streamId: string) => {
          if (browser.runtime.lastError) {
            console.error(browser.runtime.lastError.message);
            return;
          }
          if (streamId) {
            browser.runtime
              .sendMessage({
                type: "offscreen-start-audio-capture",
                target: "offscreen",
                streamId,
                tabId: message.tabId,
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            console.error(Error);
          }
        }
      );
    } else if (message.type === "transcript") {
      const activeTabs = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (activeTabs[0]?.id) {
        try {
          await browser.tabs.sendMessage(activeTabs[0].id, message);
        } catch (error) {
          console.error(error);
        }
      }
    } else if (message.type === "stop-audio-capture") {
      if (await browser.offscreen.hasDocument?.()) {
        await browser.offscreen.closeDocument();
      }
    }
  });
});
