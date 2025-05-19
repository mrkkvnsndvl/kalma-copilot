interface PopupForm {
  jobTitle: string;
  companyName: string;
  jobDescription: File | string | null;
  resume: File | string | null;
  openRouterAPIKey: string;
  aiModel: string;
  deepgramAPIKey: string;
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
