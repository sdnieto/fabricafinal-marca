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
  /** px del titular (o de la cita, en variant "cita"). Eyebrow y subtítulo/
   * atribución escalan en la misma proporción para mantener la jerarquía. */
  titleSize?: number;
}

const DEFAULT_TITLE_SIZE: Record<PiezaVariant, number> = { novedad: 120, imagen: 120, cita: 120 };
// Proporciones fijadas como ratio (eyebrow y subtítulo/atribución escalan con el titular).
const EYEBROW_RATIO: Record<PiezaVariant, number> = { novedad: 0.25, imagen: 0.25, cita: 0.31 };
const SUBTITLE_RATIO: Record<PiezaVariant, number> = { novedad: 0.325, imagen: 0.325, cita: 0.34 };
// Extra fijo pedido para la línea de subtítulo/atribución, encima de lo que da la proporción.
const SUBTITLE_EXTRA_PX = 8;
// Franja "marcador" translúcida detrás del subtítulo — var(--gold-300) al 22%.
// box-decoration-break: clone hace que cada línea envuelta tenga su propia franja
// ajustada al texto (en vez de un solo rectángulo del ancho del contenedor).
const SUBTITLE_HIGHLIGHT = "rgba(228,146,89,0.22)";
const subtitleHighlightStyle = (fontSize: number): CSSProperties => ({
  fontSize,
  color: "var(--text-on-light-muted)",
  background: SUBTITLE_HIGHLIGHT,
  padding: "3px 8px",
  borderRadius: 4,
  boxDecorationBreak: "clone",
  WebkitBoxDecorationBreak: "clone",
});

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
  titleSize,
}: PostStoryShellProps) {
  const { width, height } = PIEZA_DIMS[format];
  // Solo la variante "cita" (quote card) conserva el logo arriba; post/historia
  // ("novedad"/"imagen") lo muestran únicamente abajo.
  const showHeaderLogo = variant === "cita";
  const logoSrc = logoStyle === "completo" ? "/logo/altara-logo.png" : "/logo/fleur-ornament.png";

  const baseSize = titleSize ?? DEFAULT_TITLE_SIZE[variant];
  const eyebrowSize = Math.round(baseSize * EYEBROW_RATIO[variant]);
  const subtitleSize = Math.round(baseSize * SUBTITLE_RATIO[variant]) + SUBTITLE_EXTRA_PX;

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
          <div style={{ fontSize: eyebrowSize, fontWeight: 600, letterSpacing: "0.18em", color: "var(--gold-300)" }}>
            {eyebrow}
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: baseSize, lineHeight: 1.12, color: "var(--charcoal)", marginTop: 20 }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ marginTop: 24, maxWidth: "88%", lineHeight: 1.7 }}>
              <span style={subtitleHighlightStyle(subtitleSize)}>{subtitle}</span>
            </div>
          )}
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
            <div style={{ fontSize: eyebrowSize, fontWeight: 600, letterSpacing: "0.18em", color: "var(--gold-500)" }}>{eyebrow}</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: baseSize, lineHeight: 1.12, color: "var(--charcoal)", marginTop: 16 }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ marginTop: 18, maxWidth: "90%", lineHeight: 1.7 }}>
                <span style={subtitleHighlightStyle(subtitleSize)}>{subtitle}</span>
              </div>
            )}
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
            <div style={{ fontSize: eyebrowSize, fontWeight: 600, letterSpacing: "0.18em", color: "var(--gold-500)" }}>{eyebrow}</div>
          )}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: baseSize,
              lineHeight: 1.35,
              color: "var(--charcoal)",
              marginTop: 26,
            }}
          >
            &ldquo;{quoteText}&rdquo;
          </div>
          {quoteAuthor && (
            <div style={{ fontSize: subtitleSize, letterSpacing: "0.04em", color: "var(--text-on-light-muted)", marginTop: 26 }}>
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
