import type { MutableRefObject, RefObject } from "react";
import { exportNodeToPng, captureNodeToPngBlob } from "../../lib/exportPng";
import { exportNodeToPdf } from "../../lib/exportPdf";
import { saveFile, saveFiles } from "../../lib/download";
import { buildFilename } from "../../lib/filename";
import { Button } from "../ds/Button";
import type { AnyAssetConfig } from "../../assets-registry/types";

// Duck-typed: cada content shape tiene un campo de título distinto (title / quoteText / slides[0].title).
function shortTitleOf(content: any): string { // eslint-disable-line @typescript-eslint/no-explicit-any
  return content.title || content.quoteText || content.slides?.[0]?.title || "asset";
}

export function DownloadButton({
  config,
  content,
  captureRef,
  slideRefs,
}: {
  config: AnyAssetConfig;
  content: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  captureRef: RefObject<HTMLDivElement>;
  slideRefs: MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  async function handleDownload() {
    const shortTitle = shortTitleOf(content);
    if (config.kind === "capture-png" && captureRef.current) {
      await exportNodeToPng(captureRef.current, buildFilename(config.categoryId, config.id, shortTitle, "png"));
    } else if (config.kind === "capture-pdf" && captureRef.current) {
      await exportNodeToPdf(captureRef.current, buildFilename(config.categoryId, config.id, shortTitle, "pdf"));
    } else if (config.kind === "carousel") {
      const files = [];
      for (let i = 0; i < content.slides.length; i++) {
        const node = slideRefs.current[i];
        if (!node) continue;
        const slideTitle = content.slides[i].title || `${shortTitle}-${i + 1}`;
        const blob = await captureNodeToPngBlob(node);
        files.push({ blob, filename: buildFilename(config.categoryId, config.id, `${slideTitle}-slide-${i + 1}`, "png") });
      }
      // Un solo share sheet con los N archivos si el navegador lo soporta (Web
      // Share Level 2); si no, cae a descargas secuenciales por link.
      await saveFiles(files);
    } else if (config.kind === "html") {
      const html = await config.buildHtml(content);
      const blob = new Blob([html], { type: "text/html" });
      await saveFile(blob, buildFilename(config.categoryId, config.id, shortTitle, "html"));
    }
  }

  const label =
    config.kind === "html"
      ? "Descargar HTML"
      : config.kind === "capture-pdf"
        ? "Descargar PDF"
        : config.kind === "carousel"
          ? `Descargar PNG × ${content.slides?.length ?? 0}`
          : "Descargar PNG";

  return (
    <Button variant="primary" onClick={handleDownload}>
      {label}
    </Button>
  );
}
