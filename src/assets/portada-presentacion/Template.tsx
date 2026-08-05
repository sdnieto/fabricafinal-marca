import { Divider } from "../../components/ds/Divider";
import type { PortadaContent } from "../../types/content";

// Nuevo — sin template previo en Claude Design. Modo velvet (noche): el readme del
// design system lo marca como "el modo principal... usado en piezas de producto
// premium", el registro que le corresponde a una portada de presentación.
export function PortadaTemplate({ content }: { content: PortadaContent }) {
  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        background: "var(--bg-velvet-gradient)",
        fontFamily: "var(--font-body)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 12%",
        boxSizing: "border-box",
        gap: 28,
      }}
    >
      <img src="/logo/altara-logo.png" alt="Altara Pastelería" style={{ height: 84, filter: "brightness(1.15)" }} />

      <div style={{ fontSize: "var(--text-eyebrow)", letterSpacing: "var(--tracking-eyebrow)", color: "var(--gold-500)", fontWeight: 700 }}>
        {content.eyebrow}
      </div>

      <div
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--neutral-50)",
          fontSize: 72,
          lineHeight: "var(--leading-display)",
          maxWidth: 1200,
        }}
      >
        {content.title}
      </div>

      <div style={{ width: 320 }}>
        <Divider tone="dark" />
      </div>

      <div style={{ color: "var(--text-on-dark-muted)", fontSize: "var(--text-body-lg)", maxWidth: 780, lineHeight: "var(--leading-body)" }}>
        {content.subtitle}
      </div>
    </div>
  );
}
