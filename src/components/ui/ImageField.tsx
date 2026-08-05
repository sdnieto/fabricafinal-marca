export function ImageField({ label, value, onChange }: { label: string; value?: string; onChange: (dataUrl: string | undefined) => void }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-body)" }}>
      <span style={{ fontSize: "var(--text-body-sm)", color: "var(--text-on-light-muted)" }}>{label}</span>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return onChange(undefined);
          const reader = new FileReader();
          reader.onload = () => onChange(reader.result as string);
          reader.readAsDataURL(file);
        }}
      />
      {value && <img src={value} alt="" style={{ maxWidth: 160, borderRadius: "var(--radius-sm)", marginTop: 4 }} />}
    </label>
  );
}
