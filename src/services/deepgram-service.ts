import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";

export const deepgramService = async (
  streamId: string,
  onTranscript: (transcript: string, isFinal?: boolean) => void
) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: streamId,
        },
      } as MediaTrackConstraints,
    });

    const output = new AudioContext();
    const source = output.createMediaStreamSource(stream);
    source.connect(output.destination);

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
    });

    const deepgramAPIKey = "YOUR_DEEPGRAM_API_KEY";

    const deepgram = createClient(deepgramAPIKey);
    const connection = deepgram.listen.live({
      model: "nova-3",
      language: "en-US",
      smart_format: true,
      filler_words: true,
      punctuate: true,
      interim_results: true,
    });

    connection.on(LiveTranscriptionEvents.Open, () => {
      mediaRecorder.ondataavailable = async (event: BlobEvent) => {
        if (
          event.data.size > 0 &&
          connection.getReadyState() === WebSocket.OPEN
        ) {
          const arrayBuffer = await event.data.arrayBuffer();
          connection.send(arrayBuffer);
        }
      };
      mediaRecorder.start(250);
    });

    connection.on(LiveTranscriptionEvents.Transcript, (data) => {
      const transcript = data.channel.alternatives[0].transcript;
      const isFinal: boolean = data?.is_final;
      if (transcript) {
        onTranscript(transcript, isFinal);
      }
    });
  } catch (error) {
    console.error(error);
  }
};
