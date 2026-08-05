import { useRef, useState } from "react";
import { assetById } from "./assets-registry/registry";
import { CategoryPicker } from "./components/ui/CategoryPicker";
import { AssetTypePicker } from "./components/ui/AssetTypePicker";
import { ContentForm } from "./components/ui/ContentForm";
import { CarouselEditor } from "./components/ui/CarouselEditor";
import { PreviewPane } from "./components/ui/PreviewPane";
import { DownloadButton } from "./components/ui/DownloadButton";
import { Button } from "./components/ds/Button";
import type { CarouselContent } from "./types/content";

export default function App() {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [assetId, setAssetId] = useState<string | null>(null);
  const [content, setContent] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  const captureRef = useRef<HTMLDivElement>(null!);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const config = assetId ? assetById(assetId) : undefined;

  function selectAsset(id: string) {
    const cfg = assetById(id)!;
    setAssetId(id);
    setContent(cfg.defaultContent());
    slideRefs.current = [];
  }

  function backToAssets() {
    setAssetId(null);
    setContent(null);
  }

  return (
    <div style={{ minHeight: "100vh", padding: "40px 6vw", boxSizing: "border-box" }}>
      {!categoryId && <CategoryPicker onSelect={setCategoryId} />}

      {categoryId && !config && (
        <AssetTypePicker categoryId={categoryId} onSelect={selectAsset} onBack={() => setCategoryId(null)} />
      )}

      {config && content && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <Button variant="ghost" size="sm" onClick={backToAssets} style={{ color: "var(--gold-500)", borderColor: "var(--border-on-light)" }}>
              ← {config.label}
            </Button>
          </div>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "flex-start" }}>
            <div style={{ width: 380, display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--charcoal)" }}>{config.label}</div>
                <Button variant="secondary" size="sm" onClick={() => setContent(config.autoContent())}>
                  Auto-generar
                </Button>
              </div>
              {config.kind === "carousel" ? (
                <CarouselEditor content={content as CarouselContent} onChange={setContent} />
              ) : (
                <ContentForm fields={config.fields} content={content} onChange={setContent} />
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1, minWidth: 320 }}>
              <div style={{ fontSize: "var(--text-caption)", color: "var(--text-on-light-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Vista previa
              </div>
              <PreviewPane config={config} content={content} captureRef={captureRef} slideRefs={slideRefs} />
              <div>
                <DownloadButton config={config} content={content} captureRef={captureRef} slideRefs={slideRefs} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
