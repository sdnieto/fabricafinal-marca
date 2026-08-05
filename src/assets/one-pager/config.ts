import { autoSubtitle } from "../../content/copyBank";
import type { OnePagerContent } from "../../types/content";
import type { CaptureAssetConfig } from "../../assets-registry/types";
import { OnePagerTemplate } from "./Template";

export const onePagerConfig: CaptureAssetConfig<OnePagerContent> = {
  id: "one-pager",
  categoryId: "comercial",
  label: "One-pager de servicio",
  kind: "capture-pdf",
  width: 1191,
  height: 1684,
  Template: OnePagerTemplate,
  fields: [
    { key: "eyebrow", label: "Eyebrow", kind: "text" },
    { key: "title", label: "Título del servicio", kind: "text" },
    { key: "intro", label: "Introducción", kind: "textarea" },
    { key: "priceAnchor", label: "Precio anclado (opcional)", kind: "text" },
  ],
  defaultContent: () => ({
    eyebrow: "SERVICIO",
    title: "Tortas de autor para bodas",
    intro: "Diseño personalizado, hecho a mano en Neiva. Cada torta se hornea el día anterior a tu entrega — nada se congela.",
    sections: [
      { heading: "Cómo funciona", body: "El diseño se define contigo antes de empezar, para que no haya sorpresas el día de la entrega." },
      { heading: "Anticipación", body: "Encargos con mínimo 5 días de anticipación; diseños personalizados, una semana." },
      { heading: "Porciones", body: "Con 20 porciones alcanza cómodo para 15 personas si hay más postres en la mesa." },
    ],
    priceAnchor: "Desde $260.000 · 30 porciones",
  }),
  autoContent: () => ({
    eyebrow: "SERVICIO",
    title: "Tortas de autor para bodas",
    intro: autoSubtitle(),
    sections: [
      { heading: "Cómo funciona", body: "El diseño se define contigo antes de empezar, para que no haya sorpresas el día de la entrega." },
      { heading: "Anticipación", body: autoSubtitle() },
      { heading: "Porciones", body: "Con 20 porciones alcanza cómodo para 15 personas si hay más postres en la mesa." },
    ],
    priceAnchor: "Desde $260.000 · 30 porciones",
  }),
};
