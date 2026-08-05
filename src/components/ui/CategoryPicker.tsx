import { categories, assetsByCategory } from "../../assets-registry/registry";

export function CategoryPicker({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--charcoal)" }}>
          Fábrica de assets de marca
        </div>
        <div style={{ color: "var(--text-on-light-muted)", marginTop: 6 }}>Elige una categoría para empezar.</div>
      </div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            style={{
              width: 260,
              textAlign: "left",
              padding: "24px 24px 22px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-on-light)",
              background: "var(--surface-card-light)",
              boxShadow: "var(--shadow-card-light)",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
            }}
          >
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--charcoal)" }}>{c.label}</div>
            <div style={{ color: "var(--text-on-light-muted)", fontSize: "var(--text-body-sm)", marginTop: 8 }}>
              {assetsByCategory(c.id)
                .map((a) => a.label)
                .join(" · ")}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
