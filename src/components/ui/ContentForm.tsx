import { Input } from "../ds/Input";
import { ImageField } from "./ImageField";
import type { FieldSpec } from "../../types/content";

const fieldWrap: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-body)" };
const labelStyle: React.CSSProperties = { fontSize: "var(--text-body-sm)", color: "var(--text-on-light-muted)" };
const textAreaStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-body)",
  padding: "12px 16px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--border-on-light)",
  background: "#fff",
  color: "var(--text-on-light-primary)",
  resize: "vertical",
};

export function ContentForm<T extends Record<string, unknown>>({
  fields,
  content,
  onChange,
}: {
  fields: FieldSpec<T>[];
  content: T;
  onChange: (next: T) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {fields.map((f) => {
        const key = f.key as string;
        const value = (content[f.key] as string) ?? "";
        if (f.kind === "image") {
          return (
            <ImageField
              key={key}
              label={f.label}
              value={value}
              onChange={(dataUrl) => onChange({ ...content, [f.key]: dataUrl })}
            />
          );
        }
        if (f.kind === "textarea") {
          return (
            <label key={key} style={fieldWrap}>
              <span style={labelStyle}>{f.label}</span>
              <textarea
                value={value}
                rows={3}
                style={textAreaStyle}
                onChange={(e) => onChange({ ...content, [f.key]: e.target.value })}
              />
            </label>
          );
        }
        if (f.kind === "select") {
          return (
            <div key={key} style={fieldWrap}>
              <span style={labelStyle}>{f.label}</span>
              <div style={{ display: "flex", gap: 8 }}>
                {f.options?.map((opt) => {
                  const selected = value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onChange({ ...content, [f.key]: opt.value })}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-body-sm)",
                        padding: "9px 16px",
                        borderRadius: "var(--radius-pill)",
                        border: `1px solid ${selected ? "var(--gold-500)" : "var(--border-on-light)"}`,
                        background: selected ? "var(--gold-500)" : "transparent",
                        color: selected ? "#fff" : "var(--text-on-light-primary)",
                        cursor: "pointer",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }
        return (
          <Input key={key} label={f.label} value={value} onChange={(e) => onChange({ ...content, [f.key]: e.target.value })} />
        );
      })}
    </div>
  );
}
