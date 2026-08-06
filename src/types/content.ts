export type LogoStyle = "completo" | "fleur";

/** post-cuadrado / historia / un slide de carrusel — layout se deriva de si hay imagen */
export interface PiezaGraficaContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  imageDataUrl?: string;
  logoStyle: LogoStyle;
  /** px del titular; eyebrow y subtítulo escalan en proporción. */
  titleSize?: number;
}

export interface QuoteCardContent {
  quoteText: string;
  author?: string;
  logoStyle: LogoStyle;
  /** px de la cita; eyebrow y atribución escalan en proporción. */
  titleSize?: number;
}

export interface CarouselContent {
  slides: PiezaGraficaContent[];
}

export interface OnePagerSection {
  heading: string;
  body: string;
}

export interface OnePagerContent {
  eyebrow: string;
  title: string;
  intro: string;
  sections: OnePagerSection[];
  priceAnchor?: string;
  /** px del titular; eyebrow e intro escalan en proporción. */
  titleSize?: number;
}

export interface PortadaContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** px del titular; eyebrow y subtítulo escalan en proporción. */
  titleSize?: number;
}

export interface LandingCombo {
  eyebrow: string;
  title: string;
  desc: string;
  price: string;
}

export interface LandingContent {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string;
  combos: LandingCombo[];
  contactHeadline: string;
  contactSubtext: string;
}

export type AnyAssetContent =
  | PiezaGraficaContent
  | QuoteCardContent
  | CarouselContent
  | OnePagerContent
  | PortadaContent
  | LandingContent;

export type ExportFormat = "png" | "pdf" | "html";

export type CategoryId = "redes-sociales" | "comercial" | "presentaciones";

export interface FieldSpec<T> {
  key: keyof T;
  label: string;
  kind: "text" | "textarea" | "image" | "select" | "slider";
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}
