import type { CarouselContent, PiezaGraficaContent } from "../../types/content";
import { Input } from "../ds/Input";
import { Button } from "../ds/Button";
import { ImageField } from "./ImageField";

const textAreaStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-body-sm)",
  padding: "10px 14px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--border-on-light)",
  background: "#fff",
  resize: "vertical",
};

function blankSlide(): PiezaGraficaContent {
  return { eyebrow: "NOVEDADES", title: "", subtitle: "", logoStyle: "completo", titleSize: 120 };
}

export function CarouselEditor({ content, onChange }: { content: CarouselContent; onChange: (next: CarouselContent) => void }) {
  function updateSlide(i: number, patch: Partial<PiezaGraficaContent>) {
    const slides = content.slides.map((s, idx) => (idx === i ? { ...s, ...patch } : s));
    onChange({ slides });
  }
  function removeSlide(i: number) {
    onChange({ slides: content.slides.filter((_, idx) => idx !== i) });
  }
  function addSlide() {
    onChange({ slides: [...content.slides, blankSlide()] });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {content.slides.map((slide, i) => (
        <div
          key={i}
          style={{
            border: "1px solid var(--border-on-light)",
            borderRadius: "var(--radius-md)",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--gold-700)", fontWeight: 700 }}>SLIDE {i + 1}</span>
            {content.slides.length > 1 && (
              <Button variant="ghost" size="sm" onClick={() => removeSlide(i)} style={{ color: "var(--gold-700)", padding: "4px 12px" }}>
                Quitar
              </Button>
            )}
          </div>
          <Input label="Eyebrow" value={slide.eyebrow} onChange={(e) => updateSlide(i, { eyebrow: e.target.value })} />
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: "var(--text-body-sm)", color: "var(--text-on-light-muted)" }}>Titular</span>
            <textarea rows={2} style={textAreaStyle} value={slide.title} onChange={(e) => updateSlide(i, { title: e.target.value })} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: "var(--text-body-sm)", color: "var(--text-on-light-muted)" }}>Subtítulo</span>
            <textarea rows={2} style={textAreaStyle} value={slide.subtitle} onChange={(e) => updateSlide(i, { subtitle: e.target.value })} />
          </label>
          <ImageField label="Imagen (opcional)" value={slide.imageDataUrl} onChange={(v) => updateSlide(i, { imageDataUrl: v })} />
        </div>
      ))}
      <Button variant="secondary" size="sm" onClick={addSlide}>
        + Agregar slide
      </Button>
    </div>
  );
}
