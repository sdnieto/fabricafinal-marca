import { autoCarouselSlides } from "../../content/copyBank";
import type { CarouselContent } from "../../types/content";
import type { CarouselAssetConfig } from "../../assets-registry/types";
import { PIEZA_DIMS } from "../../components/shared/PostStoryShell";
import { PostCuadradoTemplate } from "../post-cuadrado/Template";

const SLIDE_COUNT = 3;

function blankSlide() {
  return { eyebrow: "NOVEDADES", title: "", subtitle: "", logoStyle: "completo" as const, titleSize: 80 };
}

export const carruselConfig: CarouselAssetConfig<CarouselContent> = {
  id: "carrusel",
  categoryId: "redes-sociales",
  label: "Carrusel",
  kind: "carousel",
  width: PIEZA_DIMS.post.width,
  height: PIEZA_DIMS.post.height,
  SlideTemplate: PostCuadradoTemplate,
  fields: [],
  defaultContent: () => ({ slides: Array.from({ length: SLIDE_COUNT }, blankSlide) }),
  // Los 3 slides salen del mismo tema: gancho -> valor -> cierre con pregunta,
  // en vez de 3 piezas sueltas elegidas al azar sin relación entre sí.
  autoContent: () => ({ slides: autoCarouselSlides(SLIDE_COUNT) }),
};
