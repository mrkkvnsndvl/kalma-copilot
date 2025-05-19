import ContentHeader from "@/components/shared/content-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const Content = () => {
  const { setElementRef, ensurePositionInBounds } = useDrag();
  const { isMinimized } = useMinimize();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setElementRef(containerRef.current);
    }
  }, [setElementRef]);

  useEffect(() => {
    if (!isMinimized) {
      setTimeout(ensurePositionInBounds, 50);
    }
  }, [isMinimized, ensurePositionInBounds]);

  useEffect(() => {
    const handleResize = () => {
      if (!isMinimized) {
        ensurePositionInBounds();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMinimized, ensurePositionInBounds]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-sm font-geist backdrop-sepia-0 bg-primary/30 fixed transition-all duration-300",
        isMinimized && "w-auto h-auto"
      )}
      style={{
        transform: "translate(0px, 0px)",
        transition: "transform 0.1s ease-out",
      }}
    >
      <ContentHeader />
      {!isMinimized && (
        <>
          <main>
            <section className="flex flex-col">
              <ScrollArea className="p-1 h-[532px]">
                <div className="flex flex-col gap-2 p-1 bg-primary/10">
                  <p className="text-sm text-secondary">
                    Transcribing
                    <span className="animate-dots">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </span>
                  </p>
                  <p className="text-sm/6 text-secondary text-pretty"></p>
                </div>
              </ScrollArea>
            </section>
          </main>
        </>
      )}
    </div>
  );
};

export default Content;
