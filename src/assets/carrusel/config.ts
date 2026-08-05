import { autoEyebrow, autoSubtitle, autoTitle } from "../../content/copyBank";
import type { CarouselContent } from "../../types/content";
import type { CarouselAssetConfig } from "../../assets-registry/types";
import { PIEZA_DIMS } from "../../components/shared/PostStoryShell";
import { PostCuadradoTemplate } from "../post-cuadrado/Template";

function blankSlide() {
  return { eyebrow: "NOVEDADES", title: "", subtitle: "", logoStyle: "completo" as const };
}

function autoSlide() {
  return { eyebrow: autoEyebrow(), title: autoTitle(), subtitle: autoSubtitle(), logoStyle: "completo" as const };
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
  defaultContent: () => ({ slides: [blankSlide(), blankSlide(), blankSlide()] }),
  autoContent: () => ({ slides: [autoSlide(), autoSlide(), autoSlide()] }),
};
