import type { ComponentType } from "react";
import type { CategoryId, FieldSpec, PiezaGraficaContent } from "../types/content";

interface BaseAssetConfig<T> {
  id: string;
  categoryId: CategoryId;
  label: string;
  fields: FieldSpec<T>[];
  defaultContent: () => T;
  autoContent: () => T;
}

/** Se captura a PNG o PDF desde un único nodo React ya dimensionado en px. */
export interface CaptureAssetConfig<T> extends BaseAssetConfig<T> {
  kind: "capture-png" | "capture-pdf";
  width: number;
  height: number;
  Template: ComponentType<{ content: T }>;
}

/** N slides, cada uno un PNG separado (post-cuadrado repetido). Cada slide es una
 * PiezaGraficaContent — no el CarouselContent completo que envuelve T. */
export interface CarouselAssetConfig<T> extends BaseAssetConfig<T> {
  kind: "carousel";
  width: number;
  height: number;
  SlideTemplate: ComponentType<{ content: PiezaGraficaContent }>;
}

/** No se captura: genera un .html autocontenido. */
export interface HtmlAssetConfig<T> extends BaseAssetConfig<T> {
  kind: "html";
  buildHtml: (content: T) => Promise<string>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyAssetConfig = CaptureAssetConfig<any> | CarouselAssetConfig<any> | HtmlAssetConfig<any>;

export interface CategoryDef {
  id: CategoryId;
  label: string;
}
