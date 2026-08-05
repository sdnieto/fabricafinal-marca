export function Card({
  image,
  eyebrow,
  title,
  description,
  price,
  tone = "light",
}: {
  image?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  price?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      style={{
        background: dark ? "var(--surface-card-dark)" : "var(--surface-card-light)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: dark ? "var(--shadow-card-dark)" : "var(--shadow-card-light)",
        border: dark ? "1px solid var(--border-on-dark)" : "1px solid var(--border-on-light)",
        width: 280,
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          aspectRatio: "4/3",
          background: image ? `url(${image}) center/cover` : "linear-gradient(135deg,#e8d3ba,#cfa876)",
        }}
      />
      <div style={{ padding: "18px 20px 22px", display: "flex", flexDirection: "column", gap: 8 }}>
        {eyebrow && (
          <div style={{ fontSize: "var(--text-caption)", letterSpacing: "0.16em", color: "var(--gold-500)", fontWeight: 700 }}>
            {eyebrow.toUpperCase()}
          </div>
        )}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            color: dark ? "var(--text-on-dark-primary)" : "var(--text-on-light-primary)",
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: "var(--text-body-sm)",
              lineHeight: 1.5,
              color: dark ? "var(--text-on-dark-muted)" : "var(--text-on-light-muted)",
            }}
          >
            {description}
          </div>
        )}
        {price && (
          <div
            style={{
              fontSize: "var(--text-body-sm)",
              fontWeight: 600,
              color: dark ? "var(--gold-100)" : "var(--gold-700)",
              marginTop: 4,
            }}
          >
            {price}
          </div>
        )}
      </div>
    </div>
  );
}
