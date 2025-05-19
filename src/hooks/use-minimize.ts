import { useMinimizeStore } from "@/stores/minimize-store";

export const useMinimize = () => {
  const { isMinimized, setIsMinimized } = useMinimizeStore();

  return {
    isMinimized,
    setIsMinimized,
  };
};
