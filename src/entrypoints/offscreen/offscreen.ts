import { browser } from "#imports";

import { deepgramService } from "@/services/deepgram-service";

browser.runtime.onMessage.addListener(async (message) => {
  if (message.type !== "offscreen-start-audio-capture") return;

  try {
    deepgramService(message.streamId, (transcript, isFinal) => {
      browser.runtime.sendMessage({
        type: "transcript",
        transcript,
        isFinal,
      });
    });
  } catch (error) {
    console.error(error);
  }
});
