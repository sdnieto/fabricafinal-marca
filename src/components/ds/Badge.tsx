import type { CSSProperties, ReactNode } from "react";

export function Badge({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "onDark" }) {
  const tones: Record<string, CSSProperties> = {
    gold: { background: "rgba(188,140,92,0.14)", color: "var(--gold-700)", border: "1px solid rgba(188,140,92,0.4)" },
    onDark: { background: "rgba(188,140,92,0.16)", color: "var(--gold-100)", border: "1px solid rgba(188,140,92,0.4)" },
  };
  return (
    <span
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-caption)",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "6px 14px",
        borderRadius: "var(--radius-pill)",
        display: "inline-block",
        ...tones[tone],
      }}
    >
      {children}
    </span>
  );
}
