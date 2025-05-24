import { create } from "zustand";

export const DeepgramStore = create<Deepgram>((set) => ({
  finalTranscript: "",
  interimTranscript: "",
  isListening: true,
  transcriptEntries: [],
  pendingTranscript: "",
  committedTranscriptLength: 0,
  setFinalTranscript: (update) =>
    set((state) => ({ finalTranscript: update(state.finalTranscript) })),
  setInterimTranscript: (transcriptText: string) =>
    set({ interimTranscript: transcriptText }),
  setIsListening: (isListening: boolean) => set({ isListening }),
  addTranscriptEntry: (entry) =>
    set((state) => ({
      transcriptEntries: [...state.transcriptEntries, entry],
    })),
  updateTranscriptEntry: (entryIndex: number, answerQuestion: string) =>
    set((state) => ({
      transcriptEntries: state.transcriptEntries.map((entry, index) =>
        index === entryIndex
          ? { ...entry, answerQuestion: answerQuestion }
          : entry
      ),
    })),
  setPendingTranscript: (transcriptText: string) =>
    set({ pendingTranscript: transcriptText }),
  setCommittedTranscriptLength: (length: number) =>
    set({ committedTranscriptLength: length }),
}));
