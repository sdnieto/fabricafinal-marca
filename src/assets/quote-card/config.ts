import { autoQuote } from "../../content/copyBank";
import type { QuoteCardContent } from "../../types/content";
import type { CaptureAssetConfig } from "../../assets-registry/types";
import { PIEZA_DIMS } from "../../components/shared/PostStoryShell";
import { QuoteCardTemplate } from "./Template";

export const quoteCardConfig: CaptureAssetConfig<QuoteCardContent> = {
  id: "quote-card",
  categoryId: "redes-sociales",
  label: "Quote card",
  kind: "capture-png",
  width: PIEZA_DIMS.post.width,
  height: PIEZA_DIMS.post.height,
  Template: QuoteCardTemplate,
  fields: [
    { key: "quoteText", label: "Cita", kind: "textarea" },
    { key: "author", label: "Atribución (opcional)", kind: "text" },
  ],
  defaultContent: () => ({
    quoteText: "El lujo se demuestra con detalle, no con superlativos.",
    logoStyle: "completo",
  }),
  autoContent: () => {
    const q = autoQuote();
    return { quoteText: q.quoteText, author: q.author, logoStyle: "completo" };
  },
};
