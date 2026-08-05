import { defaultCombos } from "../../content/copyBank";
import type { LandingContent } from "../../types/content";
import type { HtmlAssetConfig } from "../../assets-registry/types";
import { buildLandingHtml } from "./buildHtml";

export const landingConfig: HtmlAssetConfig<LandingContent> = {
  id: "landing-campana",
  categoryId: "presentaciones",
  label: "Landing page de campaña",
  kind: "html",
  buildHtml: buildLandingHtml,
  fields: [
    { key: "title", label: "Titular (hero)", kind: "textarea" },
    { key: "subtitle", label: "Subtítulo (hero)", kind: "textarea" },
    { key: "ctaLabel", label: "Texto del botón", kind: "text" },
    { key: "ctaLink", label: "Link del botón (WhatsApp, etc.)", kind: "text" },
    { key: "contactHeadline", label: "Titular de contacto", kind: "textarea" },
    { key: "contactSubtext", label: "Subtexto de contacto", kind: "textarea" },
  ],
  defaultContent: () => ({
    title: "Tortas de autor para el día que no se repite",
    subtitle: "Diseño personalizado, hecho a mano en Neiva. Cada torta se hornea el día anterior a tu entrega — nada se congela.",
    ctaLabel: "Escríbenos por WhatsApp",
    ctaLink: "https://wa.me/573000000000",
    combos: defaultCombos,
    contactHeadline: "Cada semana rechazamos pedidos por falta de cupo",
    contactSubtext: "Reserva con al menos 5 días de anticipación y asegura tu lugar en la agenda.",
  }),
  autoContent: () => ({
    title: "Tortas de autor para el día que no se repite",
    subtitle: "Diseño personalizado, hecho a mano en Neiva. Cada torta se hornea el día anterior a tu entrega — nada se congela.",
    ctaLabel: "Escríbenos por WhatsApp",
    ctaLink: "https://wa.me/573000000000",
    combos: defaultCombos,
    contactHeadline: "Cada semana rechazamos pedidos por falta de cupo",
    contactSubtext: "Reserva con al menos 5 días de anticipación y asegura tu lugar en la agenda.",
  }),
};
