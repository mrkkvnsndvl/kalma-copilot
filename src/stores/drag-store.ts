import { create } from "zustand";

export const useDragStore = create<Drag>((set) => ({
  isDragging: false,
  position: { x: 0, y: 0 },
  elementRef: null,
  setIsDragging: (isDragging) => set({ isDragging }),
  setPosition: (position) => set({ position }),
  setElementRef: (ref) => set({ elementRef: ref }),
}));
