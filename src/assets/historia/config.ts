import { autoEyebrow, autoSubtitle, autoTitle } from "../../content/copyBank";
import type { PiezaGraficaContent } from "../../types/content";
import type { CaptureAssetConfig } from "../../assets-registry/types";
import { PIEZA_DIMS } from "../../components/shared/PostStoryShell";
import { HistoriaTemplate } from "./Template";

export const historiaConfig: CaptureAssetConfig<PiezaGraficaContent> = {
  id: "historia",
  categoryId: "redes-sociales",
  label: "Historia vertical",
  kind: "capture-png",
  width: PIEZA_DIMS.story.width,
  height: PIEZA_DIMS.story.height,
  Template: HistoriaTemplate,
  fields: [
    { key: "eyebrow", label: "Eyebrow", kind: "text" },
    { key: "title", label: "Titular", kind: "textarea" },
    { key: "subtitle", label: "Subtítulo", kind: "textarea" },
    { key: "imageDataUrl", label: "Imagen (opcional)", kind: "image" },
    {
      key: "logoStyle",
      label: "Logo",
      kind: "select",
      options: [
        { value: "completo", label: "Marca completa" },
        { value: "fleur", label: "Flor de lis" },
      ],
    },
  ],
  defaultContent: () => ({
    eyebrow: "NOVEDADES",
    title: "Cupos de agosto abiertos",
    subtitle: "Reserva con 5 días de anticipación y asegura tu lugar.",
    logoStyle: "completo",
  }),
  autoContent: () => ({
    eyebrow: autoEyebrow(),
    title: autoTitle(),
    subtitle: autoSubtitle(),
    logoStyle: "completo",
  }),
};
