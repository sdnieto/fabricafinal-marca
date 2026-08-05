import type { InputHTMLAttributes } from "react";

export function Input({
  label,
  tone = "light",
  ...rest
}: { label?: string; tone?: "light" | "dark" } & InputHTMLAttributes<HTMLInputElement>) {
  const dark = tone === "dark";
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-body)", width: "100%" }}>
      {label && (
        <span style={{ fontSize: "var(--text-body-sm)", color: dark ? "var(--text-on-dark-muted)" : "var(--text-on-light-muted)" }}>
          {label}
        </span>
      )}
      <input
        {...rest}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-body)",
          padding: "12px 16px",
          borderRadius: "var(--radius-md)",
          border: dark ? "1px solid var(--border-on-dark)" : "1px solid var(--border-on-light)",
          background: dark ? "rgba(255,255,255,0.04)" : "#fff",
          color: dark ? "var(--text-on-dark-primary)" : "var(--text-on-light-primary)",
          outline: "none",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold-500)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = dark ? "var(--border-on-dark)" : "var(--border-on-light)")}
      />
    </label>
  );
}
