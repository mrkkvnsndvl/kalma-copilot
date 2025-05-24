import { LoaderCircleIcon } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import ContentHeader from "@/components/shared/content-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { openrouterService } from "@/services/openrouter-service";

const Content = ({ onClose }: ContentHeader) => {
  const { setElementRef, ensurePositionInBounds } = useDrag();
  const { isMinimized } = useMinimize();
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    isListening,
    transcriptEntries,
    pendingTranscript,
    updateTranscriptEntry,
  } = useDeepgram();

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

  useEffect(() => {
    transcriptEntries.forEach((entry, index) => {
      if (entry.isQuestion && !entry.answerQuestion) {
        openrouterService(entry.transcriptText).then((answer) => {
          updateTranscriptEntry(index, answer);
        });
      }
    });
  }, [transcriptEntries, updateTranscriptEntry]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-sm font-geist antialiased backdrop-sepia-0 bg-primary/30 fixed transition-all duration-300",
        isMinimized && "w-auto h-auto"
      )}
      style={{
        transform: "translate(0px, 0px)",
        transition: "transform 0.1s ease-out",
      }}
    >
      <ContentHeader onClose={onClose} />
      {!isMinimized && (
        <>
          <main>
            <section className="flex flex-col">
              <ScrollArea className="p-1 h-[532px]">
                <div className="flex flex-col gap-2">
                  {transcriptEntries.map((entry, index) => (
                    <div
                      className="flex flex-col p-1 gap-y-3 bg-primary/10"
                      key={`transcript-${index}`}
                    >
                      <p
                        className={`text-sm ${
                          entry.isQuestion
                            ? "text-secondary"
                            : "text-secondary/70"
                        }`}
                      >
                        {entry.transcriptText}&nbsp;
                      </p>

                      {entry.isQuestion && (
                        <div className="text-sm/6 text-secondary text-pretty">
                          {entry.answerQuestion ? (
                            <Markdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                ol: ({ node, ...props }) => (
                                  <ol
                                    className="ml-4 list-decimal"
                                    {...props}
                                  />
                                ),
                                ul: ({ node, ...props }) => (
                                  <ul className="ml-4 list-disc" {...props} />
                                ),
                                li: ({ node, ...props }) => (
                                  <li className="mb-1" {...props} />
                                ),
                              }}
                            >
                              {entry.answerQuestion}
                            </Markdown>
                          ) : (
                            <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {pendingTranscript ? (
                    <p className="p-1 text-sm text-secondary/70 bg-primary/10">
                      {pendingTranscript}
                    </p>
                  ) : (
                    <p className="p-1 text-sm text-secondary bg-primary/10">
                      {isListening && (
                        <>
                          Transcribing
                          <span className="animate-dots">
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                          </span>
                        </>
                      )}
                    </p>
                  )}
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
