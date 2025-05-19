import { useTheme } from "@/components/shared/theme-provider";

const PopupHeader = () => {
  const { theme } = useTheme();

  const iconMode =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme === "dark"
      ? "dark"
      : "light";

  return (
    <header className="flex flex-row items-center p-4 border-b gap-x-2">
      <img
        className="w-7 h-7"
        src={`/kalma-copilot-${iconMode}.svg`}
        alt="Kalma Copilot Icon"
      />
      <span className="text-base font-bold">Kalma Copilot</span>
    </header>
  );
};

export default PopupHeader;
