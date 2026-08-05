import { Divider } from "../../components/ds/Divider";
import { Badge } from "../../components/ds/Badge";
import type { OnePagerContent } from "../../types/content";

// Nuevo — sin template previo en Claude Design. Diseñado con los mismos tokens/
// componentes del design system (ivory + dorado, modo día — "piezas funcionales").
export function OnePagerTemplate({ content }: { content: OnePagerContent }) {
  return (
    <div
      style={{
        position: "relative",
        width: 1191,
        height: 1684,
        background: "var(--bg-ivory)",
        fontFamily: "var(--font-body)",
        padding: "72px 88px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <img src="/logo/altara-logo.png" alt="Altara Pastelería" style={{ height: 48, width: "auto" }} />
      </div>

      <div style={{ marginTop: 56 }}>
        <div style={{ fontSize: "var(--text-eyebrow)", letterSpacing: "var(--tracking-eyebrow)", color: "var(--gold-300)", fontWeight: 700 }}>
          {content.eyebrow}
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 46, color: "var(--charcoal)", marginTop: 14, lineHeight: 1.15 }}>
          {content.title}
        </div>
        <div style={{ fontSize: 19, lineHeight: 1.6, color: "var(--text-on-light-muted)", marginTop: 20, maxWidth: "82%" }}>
          {content.intro}
        </div>
      </div>

      <div style={{ marginTop: 44 }}>
        <Divider tone="light" />
      </div>

      <div style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 32, flex: 1 }}>
        {content.sections.map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--gold-700)" }}>{s.heading}</div>
            <div style={{ fontSize: 17, lineHeight: 1.6, color: "var(--text-on-light-primary)" }}>{s.body}</div>
          </div>
        ))}
      </div>

      {content.priceAnchor && (
        <div style={{ marginTop: 32 }}>
          <Badge tone="gold">{content.priceAnchor}</Badge>
        </div>
      )}

      <div style={{ marginTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "var(--text-caption)", color: "var(--text-on-light-muted)" }}>
          Neiva, Huila · Pastelería artesanal por encargo
        </span>
        <img src="/logo/fleur-ornament.png" alt="" style={{ height: 26, width: "auto", opacity: 0.85 }} />
      </div>
    </div>
  );
}
