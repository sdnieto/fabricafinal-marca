import type { PortadaContent } from "../../types/content";
import type { CaptureAssetConfig } from "../../assets-registry/types";
import { PortadaTemplate } from "./Template";

export const portadaConfig: CaptureAssetConfig<PortadaContent> = {
  id: "portada-presentacion",
  categoryId: "presentaciones",
  label: "Portada de presentación",
  kind: "capture-pdf",
  width: 1920,
  height: 1080,
  Template: PortadaTemplate,
  fields: [
    { key: "eyebrow", label: "Eyebrow", kind: "text" },
    { key: "title", label: "Título", kind: "textarea" },
    { key: "subtitle", label: "Subtítulo", kind: "textarea" },
    { key: "titleSize", label: "Tamaño de texto", kind: "slider", min: 50, max: 140, step: 2 },
  ],
  defaultContent: () => ({
    eyebrow: "PROPUESTA",
    title: "Tortas de autor para el día que no se repite",
    subtitle: "Diseño personalizado, hecho a mano en Neiva.",
    titleSize: 72,
  }),
  autoContent: () => ({
    eyebrow: "PROPUESTA",
    title: "Tortas de autor para el día que no se repite",
    subtitle: "Diseño personalizado, hecho a mano en Neiva. Cada torta se hornea el día anterior a tu entrega.",
    titleSize: 72,
  }),
};
