import type { AnyAssetConfig, CategoryDef } from "./types";
import { postCuadradoConfig } from "../assets/post-cuadrado/config";
import { historiaConfig } from "../assets/historia/config";
import { quoteCardConfig } from "../assets/quote-card/config";
import { carruselConfig } from "../assets/carrusel/config";
import { onePagerConfig } from "../assets/one-pager/config";
import { portadaConfig } from "../assets/portada-presentacion/config";
import { landingConfig } from "../assets/landing-campana/config";

export const categories: CategoryDef[] = [
  { id: "redes-sociales", label: "Redes sociales" },
  { id: "comercial", label: "Comercial" },
  { id: "presentaciones", label: "Presentaciones" },
];

export const assetRegistry: AnyAssetConfig[] = [
  postCuadradoConfig,
  carruselConfig,
  quoteCardConfig,
  historiaConfig,
  onePagerConfig,
  portadaConfig,
  landingConfig,
];

export function assetsByCategory(categoryId: string): AnyAssetConfig[] {
  return assetRegistry.filter((a) => a.categoryId === categoryId);
}

export function assetById(id: string): AnyAssetConfig | undefined {
  return assetRegistry.find((a) => a.id === id);
}
