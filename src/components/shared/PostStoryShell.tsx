import type { CSSProperties } from "react";
import type { LogoStyle } from "../../types/content";

export type PiezaFormat = "post" | "story";
export type PiezaVariant = "novedad" | "imagen" | "cita";

export const PIEZA_DIMS: Record<PiezaFormat, { width: number; height: number }> = {
  post: { width: 1080, height: 1350 },
  story: { width: 1080, height: 1920 },
};

interface PostStoryShellProps {
  format: PiezaFormat;
  variant: PiezaVariant;
  logoStyle: LogoStyle;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  imageDataUrl?: string;
  quoteText?: string;
  quoteAuthor?: string;
}

const blobBase: CSSProperties = { position: "absolute", borderRadius: "50%", background: "var(--bg-ivory-bloom)" };

/** Portado de "Altara Plantilla.dc.html" (Claude Design → proyecto "Plantilla assets Altara"),
 * la plantilla paramétrica que generó post-fleur/post-logo-completo/story-fleur/story-logo-completo.png.
 * Header + footer con el logo (ausentes en el .dc.html original pero presentes en los 4 PNG ya
 * aprobados por la marca — se portan desde el PNG, que es la referencia visual definitiva). */
export function PostStoryShell({
  format,
  variant,
  logoStyle,
  eyebrow,
  title,
  subtitle,
  imageDataUrl,
  quoteText,
  quoteAuthor,
}: PostStoryShellProps) {
  const { width, height } = PIEZA_DIMS[format];
  // Solo la variante "cita" (quote card) conserva el logo arriba; post/historia
  // ("novedad"/"imagen") lo muestran únicamente abajo.
  const showHeaderLogo = variant === "cita";
  const logoSrc = logoStyle === "completo" ? "/logo/altara-logo.png" : "/logo/fleur-ornament.png";

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        background: "var(--bg-ivory)",
        overflow: "hidden",
        fontFamily: "var(--font-body)",
      }}
    >
      <div style={{ ...blobBase, width: "34%", aspectRatio: "1", top: "-13%", left: "-15%", opacity: 0.65 }} />
      <div style={{ ...blobBase, width: "26%", aspectRatio: "1", bottom: "-9%", right: "-12%", opacity: 0.5 }} />

      {showHeaderLogo && (
        <div style={{ position: "relative", display: "flex", justifyContent: "center", paddingTop: "6%" }}>
          <img src={logoSrc} alt="Altara Pastelería" style={{ height: logoStyle === "completo" ? 56 : 34, width: "auto" }} />
        </div>
      )}

      {variant === "novedad" && (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "0 9%",
            marginTop: format === "story" ? "10%" : "6%",
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "0.18em", color: "var(--gold-300)" }}>
            {eyebrow}
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 58, lineHeight: 1.15, color: "var(--charcoal)", marginTop: 18 }}>
            {title}
          </div>
          <div style={{ fontSize: 21, lineHeight: 1.5, color: "var(--text-on-light-muted)", marginTop: 20, maxWidth: "88%" }}>
            {subtitle}
          </div>
        </div>
      )}

      {variant === "imagen" && (
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ width: "100%", height: "56%", position: "relative" }}>
            {imageDataUrl ? (
              <img src={imageDataUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#e8d3ba,#cfa876)" }} />
            )}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8% 9% 0" }}>
            <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "0.18em", color: "var(--gold-500)" }}>{eyebrow}</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 51, lineHeight: 1.14, color: "var(--charcoal)", marginTop: 14 }}>
              {title}
            </div>
            <div style={{ fontSize: 20, lineHeight: 1.5, color: "var(--text-on-light-muted)", marginTop: 16, maxWidth: "90%" }}>
              {subtitle}
            </div>
          </div>
        </div>
      )}

      {variant === "cita" && (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 12%",
            marginTop: format === "story" ? "24%" : "12%",
          }}
        >
          {eyebrow && (
            <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "0.18em", color: "var(--gold-500)" }}>{eyebrow}</div>
          )}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 44,
              lineHeight: 1.4,
              color: "var(--charcoal)",
              marginTop: 22,
            }}
          >
            &ldquo;{quoteText}&rdquo;
          </div>
          {quoteAuthor && (
            <div style={{ fontSize: 17, letterSpacing: "0.04em", color: "var(--text-on-light-muted)", marginTop: 24 }}>
              — {quoteAuthor}
            </div>
          )}
        </div>
      )}

      <div style={{ position: "absolute", left: 0, right: 0, bottom: "4%", display: "flex", justifyContent: "center" }}>
        <img src={logoSrc} alt="Altara Pastelería" style={{ height: logoStyle === "completo" ? 118 : 82, width: "auto" }} />
      </div>
    </div>
  );
}
