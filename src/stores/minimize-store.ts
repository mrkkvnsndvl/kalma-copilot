import { create } from "zustand";

export const useMinimizeStore = create<Minimize>((set) => ({
  isMinimized: false,
  setIsMinimized: (isMinimized) => set({ isMinimized }),
}));
