import { categories, assetsByCategory } from "../../assets-registry/registry";
import { Button } from "../ds/Button";

export function AssetTypePicker({
  categoryId,
  onSelect,
  onBack,
}: {
  categoryId: string;
  onSelect: (id: string) => void;
  onBack: () => void;
}) {
  const category = categories.find((c) => c.id === categoryId);
  const items = assetsByCategory(categoryId);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <Button variant="ghost" size="sm" onClick={onBack} style={{ color: "var(--gold-500)", borderColor: "var(--border-on-light)" }}>
          ← Categorías
        </Button>
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--charcoal)" }}>{category?.label}</div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {items.map((a) => (
          <button
            key={a.id}
            onClick={() => onSelect(a.id)}
            style={{
              width: 220,
              padding: "20px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-on-light)",
              background: "var(--surface-card-light)",
              boxShadow: "var(--shadow-card-light)",
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "var(--font-body)",
            }}
          >
            <div style={{ fontFamily: "var(--font-display)", fontSize: 19, color: "var(--charcoal)" }}>{a.label}</div>
            <div style={{ color: "var(--gold-700)", fontSize: "var(--text-caption)", marginTop: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {a.kind === "capture-png" && "PNG"}
              {a.kind === "capture-pdf" && "PDF"}
              {a.kind === "carousel" && "PNG × N"}
              {a.kind === "html" && "HTML"}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
