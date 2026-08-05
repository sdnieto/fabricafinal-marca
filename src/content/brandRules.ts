// Reglas duras de reference-voice/SKILL.md (Claude Design → Altara Design System Final 01)

export const allowedEmojis = ["🤍", "✨", "🍰", "🎂"] as const;
export const maxCombosPorPieza = 3;

export function formatFlavorLine(base: string, relleno: string): string {
  return `Bizcocho de ${base} con relleno de ${relleno}`;
}

export function formatPriceAnchor(price: string, porciones: number): string {
  return `Desde ${price} · ${porciones} porciones`;
}
