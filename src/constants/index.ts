import * as pdfjs from "pdfjs-dist";

import pdfjsWorker from "./pdf.worker.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const matches: string[] = [
  "*://meet.google.com/*",
  "*://*.zoom.us/*",
  "*://teams.live.com/*",
];

const isSupportedPlatform = (url: string, patterns: string[]): boolean => {
  return patterns.some((pattern) => {
    const escaped = pattern.replace(/[-/\\^$+?.()|[\]{}]/g, "\\$&");
    const regexPattern = "^" + escaped.replace(/\*/g, ".*") + "$";
    const regex = new RegExp(regexPattern);
    return regex.test(url);
  });
};

export { pdfjs, matches, isSupportedPlatform };
