import { useEffect, useState, type MutableRefObject, type RefObject } from "react";
import type { AnyAssetConfig } from "../../assets-registry/types";
import type { PiezaGraficaContent } from "../../types/content";

const PREVIEW_MAX_WIDTH = 380;

function Scaled({ width, height, children }: { width: number; height: number; children: React.ReactNode }) {
  const scale = Math.min(1, PREVIEW_MAX_WIDTH / width);
  return (
    <div style={{ width: width * scale, height: height * scale, overflow: "hidden", boxShadow: "var(--shadow-card-light)", borderRadius: 4, flexShrink: 0 }}>
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}

function HtmlPreview({ config, content }: { config: AnyAssetConfig & { kind: "html" }; content: unknown }) {
  const [html, setHtml] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    config.buildHtml(content).then((h) => {
      if (!cancelled) setHtml(h);
    });
    return () => {
      cancelled = true;
    };
  }, [config, content]);
  if (!html) return <div style={{ color: "var(--text-on-light-muted)" }}>Generando preview…</div>;
  return (
    <iframe
      title="preview"
      srcDoc={html}
      style={{ width: "100%", height: 640, border: "1px solid var(--border-on-light)", borderRadius: 8 }}
    />
  );
}

export function PreviewPane({
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
  if (config.kind === "html") {
    return <HtmlPreview config={config} content={content} />;
  }
  if (config.kind === "carousel") {
    return (
      <div style={{ display: "flex", gap: 16, overflowX: "auto", padding: 4 }}>
        {content.slides.map((slide: PiezaGraficaContent, i: number) => (
          <Scaled key={i} width={config.width} height={config.height}>
            <div ref={(el) => { slideRefs.current[i] = el; }} style={{ width: config.width, height: config.height }}>
              <config.SlideTemplate content={slide} />
            </div>
          </Scaled>
        ))}
      </div>
    );
  }
  return (
    <Scaled width={config.width} height={config.height}>
      <div ref={captureRef} style={{ width: config.width, height: config.height }}>
        <config.Template content={content} />
      </div>
    </Scaled>
  );
}
