import { autoThemedContent } from "../../content/copyBank";
import type { PiezaGraficaContent } from "../../types/content";
import type { CaptureAssetConfig } from "../../assets-registry/types";
import { PIEZA_DIMS } from "../../components/shared/PostStoryShell";
import { PostCuadradoTemplate } from "./Template";

export const postCuadradoConfig: CaptureAssetConfig<PiezaGraficaContent> = {
  id: "post-cuadrado",
  categoryId: "redes-sociales",
  label: "Post cuadrado",
  kind: "capture-png",
  width: PIEZA_DIMS.post.width,
  height: PIEZA_DIMS.post.height,
  Template: PostCuadradoTemplate,
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
    title: "Cada semana rechazamos pedidos por falta de cupo",
    subtitle: "Reserva tu pastel con al menos 5 días de anticipación y asegura tu lugar.",
    logoStyle: "completo",
  }),
  autoContent: () => ({
    ...autoThemedContent(),
    logoStyle: "completo",
  }),
};
