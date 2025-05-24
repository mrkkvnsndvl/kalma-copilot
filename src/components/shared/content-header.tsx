import {
  GripHorizontalIcon,
  MaximizeIcon,
  MinimizeIcon,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDrag } from "@/hooks/use-drag";
import { useMinimize } from "@/hooks/use-minimize";

const ContentHeader = ({ onClose }: ContentHeader) => {
  const { startDragging } = useDrag();
  const { isMinimized, setIsMinimized } = useMinimize();

  return (
    <header
      className={`flex flex-row justify-between ${
        isMinimized ? "p-0 border-none" : "p-1 border-b border-secondary"
      }`}
    >
      {!isMinimized && (
        <div className="flex flex-row items-center gap-x-1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M48 0H24H0V48H48L24 23.5L48 0Z" fill="white" />
          </svg>
          <span className="text-sm text-secondary">Kalma Copilot</span>
        </div>
      )}
      <div className={`flex flex-row ${isMinimized ? "gap-0" : "gap-1"}`}>
        <Button
          className="hover:bg-transparent active:bg-primary cursor-grab active:cursor-grabbing"
          variant="ghost"
          onMouseDown={startDragging}
        >
          <GripHorizontalIcon className="w-4 h-4 text-secondary" />
        </Button>
        <Button
          className="cursor-pointer hover:bg-transparent active:bg-primary"
          variant="ghost"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? (
            <MaximizeIcon className="w-4 h-4 text-secondary" />
          ) : (
            <MinimizeIcon className="w-4 h-4 text-secondary" />
          )}
        </Button>
        <Button
          className="cursor-pointer hover:bg-transparent active:bg-primary"
          variant="ghost"
          onClick={onClose}
        >
          <XIcon className="w-4 h-4 text-secondary" />
        </Button>
      </div>
    </header>
  );
};

export default ContentHeader;
