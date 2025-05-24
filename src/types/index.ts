interface PopupForm {
  jobTitle: string;
  companyName: string;
  jobDescription: File | string | null;
  resume: File | string | null;
  openRouterAPIKey: string;
  aiModel: string;
}

interface Drag {
  isDragging: boolean;
  position: { x: number; y: number };
  elementRef: HTMLDivElement | null;
  setIsDragging: (isDragging: boolean) => void;
  setPosition: (position: { x: number; y: number }) => void;
  setElementRef: (ref: HTMLDivElement | null) => void;
}

interface Minimize {
  isMinimized: boolean;
  setIsMinimized: (isMinimized: boolean) => void;
}

interface ContentHeader {
  onClose?: () => void;
}

interface TranscriptEntry {
  transcriptText: string;
  isQuestion: boolean;
  answerQuestion?: string;
}

interface Deepgram {
  finalTranscript: string;
  interimTranscript: string;
  isListening: boolean;
  transcriptEntries: TranscriptEntry[];
  pendingTranscript: string;
  committedTranscriptLength: number;
  setFinalTranscript: (update: (prev: string) => string) => void;
  setInterimTranscript: (transcriptText: string) => void;
  setIsListening: (isListening: boolean) => void;
  addTranscriptEntry: (entry: {
    transcriptText: string;
    isQuestion: boolean;
  }) => void;
  updateTranscriptEntry: (entryIndex: number, answerQuestion: string) => void;
  setPendingTranscript: (transcriptText: string) => void;
  setCommittedTranscriptLength: (length: number) => void;
}
