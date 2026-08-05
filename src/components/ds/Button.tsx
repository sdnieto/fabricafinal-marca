import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled,
  style,
}: {
  variant?: Variant;
  size?: "sm" | "md";
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style?: CSSProperties;
}) {
  const base: CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: size === "sm" ? "var(--text-body-sm)" : "var(--text-body)",
    fontWeight: 600,
    letterSpacing: "0.02em",
    padding: size === "sm" ? "8px 18px" : "13px 28px",
    borderRadius: "var(--radius-pill)",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition:
      "background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  };
  const variants: Record<Variant, CSSProperties> = {
    primary: { background: "var(--gold-500)", color: "#fff" },
    secondary: { background: "transparent", color: "var(--gold-500)", borderColor: "var(--gold-500)" },
    ghost: { background: "transparent", color: "var(--text-on-dark-primary)", borderColor: "rgba(250,246,239,0.35)" },
  };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (variant === "primary") e.currentTarget.style.background = "var(--gold-300)";
        if (variant === "secondary") {
          e.currentTarget.style.background = "var(--gold-500)";
          e.currentTarget.style.color = "#fff";
        }
        if (variant === "ghost") e.currentTarget.style.borderColor = "var(--gold-500)";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        if (variant === "primary") e.currentTarget.style.background = "var(--gold-500)";
        if (variant === "secondary") {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "var(--gold-500)";
        }
        if (variant === "ghost") e.currentTarget.style.borderColor = "rgba(250,246,239,0.35)";
      }}
    >
      {children}
    </button>
  );
}
