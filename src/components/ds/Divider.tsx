export function Divider({ tone = "light" }: { tone?: "light" | "dark" }) {
  const lineColor = tone === "dark" ? "rgba(250,246,239,0.25)" : "rgba(188,140,92,0.35)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", width: "100%" }}>
      <div style={{ flex: 1, height: 1, background: lineColor }} />
      <img
        src="/logo/fleur-ornament.png"
        alt=""
        style={{ height: 22, width: "auto", opacity: tone === "dark" ? 0.9 : 0.85 }}
      />
      <div style={{ flex: 1, height: 1, background: lineColor }} />
    </div>
  );
}
