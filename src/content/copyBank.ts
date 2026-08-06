// Banco de copy curado a partir de reference-voice/{banco-frases,copy-redes}.md
// (Claude Design → Altara Design System Final 01). Curado a mano para caber en
// piezas gráficas: frases cortas, sin las que son de WhatsApp en 1a persona singular.
import type { LandingCombo } from "../types/content";

export const eyebrowLabels: string[] = [
  "NOVEDADES",
  "LA MÁS PEDIDA",
  "DE TEMPORADA",
  "PARA BODAS",
  "AGENDA ABIERTA",
  "CUPOS LIMITADOS",
];

export const hooksMarcaPersonal: string[] = [
  "Así se ve un sábado de tres entregas",
  "Lo que pasa antes de que llegue tu torta",
  "El pedido que casi me hace cerrar",
  "El día que dejé de aceptar pedidos urgentes",
  "Dejé de vender torta, empecé a vender encargo",
];

export const hooksProblema: string[] = [
  "La verdad sobre las tortas de $50.000",
  "El error más grande al calcular porciones",
  "Por qué el fondant no es la respuesta a todo",
  "Por qué la foto de Pinterest no siempre se replica",
];

export const hooksReencuadre: string[] = [
  "Si organizar el cumpleaños se siente abrumador",
  "No necesitas cinco postres, necesitas uno que valga",
  "No necesitas saber de diseño para pedir algo único",
];

export const titleHooks: string[] = [...hooksMarcaPersonal, ...hooksProblema, ...hooksReencuadre];

export const valuePhrases = {
  oficio: [
    "Cada torta se hornea el día anterior a tu entrega, nada se congela.",
    "Cada torta se arma a mano, por eso trabajamos con agenda y no por inventario.",
    "El diseño se define contigo antes de empezar, para que no haya sorpresas.",
  ],
  anticipacion: [
    "Reserva con al menos 5 días de anticipación y asegura tu lugar.",
    "Para diseños personalizados, se necesita una semana de anticipación.",
    "La agenda de esta semana casi se llena; el cupo se aparta con el abono.",
  ],
  porciones: [
    "Con 20 porciones alcanza cómodo para 15 personas, si hay más postres en la mesa.",
    "Si es el único postre de la mesa, sube un tamaño.",
  ],
};

export const closings: string[] = [
  "¿Te aparto el cupo?",
  "¿Para qué fecha la necesitas?",
  "¿Quieres otra combinación? Escríbenos.",
];

// Frases de marca en voz propia — no son testimonios de clientes, son la voz de ALTARA.
export const brandQuotes: { quoteText: string; author?: string }[] = [
  {
    quoteText: "Cada semana rechazamos pedidos por falta de cupo, y aun así cada pastel sale con el mismo cuidado.",
    author: "Reserva la tuya con tiempo",
  },
  {
    quoteText: "No hacemos producción en serie. Hacemos una torta a la vez, para una celebración a la vez.",
  },
  {
    quoteText: "El lujo se demuestra con detalle, no con superlativos.",
  },
];

export const defaultCombos: LandingCombo[] = [
  {
    eyebrow: "La más pedida",
    title: "Vainilla y arequipe",
    desc: "Bizcocho de vainilla con relleno de arequipe y nueces",
    price: "Desde $180.000 · 20 porciones",
  },
  {
    eyebrow: "Para bodas",
    title: "Chocolate y frambuesa",
    desc: "Bizcocho de chocolate con relleno de frambuesa",
    price: "Desde $260.000 · 30 porciones",
  },
  {
    eyebrow: "De temporada",
    title: "Maracuyá y merengue",
    desc: "Bizcocho de vainilla con relleno de maracuyá y merengue suizo",
    price: "Desde $190.000 · 20 porciones",
  },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------------------------------------------------------------------------
// Banco temático — escrito usando como guía los frameworks de posicionamiento
// y "wrapping paper" de la memoria "How to Start a Personal Brand" (Caleb
// Ralston) aplicados a ALTARA: cada pieza vende confianza y oficio, no
// viralidad. Cada tema agrupa eyebrow + title + subtitle que funcionan
// juntos, para que "Auto-generar" produzca una pieza coherente en vez de
// tres campos sueltos elegidos al azar. Generado una sola vez, sin costo de
// API — no hay llamadas a ningún modelo en producción.
// ---------------------------------------------------------------------------

export interface CopyTheme {
  id: string;
  label: string; // para debug / futuro selector manual de tema
  eyebrow: string[];
  title: string[];
  subtitle: string[];
}

export const copyThemes: CopyTheme[] = [
  {
    id: "cupos",
    label: "Cupos y agenda",
    eyebrow: ["CUPOS ABIERTOS", "AGENDA DE ESTA SEMANA", "CUPOS LIMITADOS", "RESERVA TU FECHA", "AGENDA ACTIVA"],
    title: [
      "Los cupos de esta semana ya se están llenando",
      "Reserva antes de que se agote el cupo",
      "Quedan pocos lugares en la agenda",
      "Tu fecha, asegurada con el abono",
      "Así de rápido se llena la agenda cada semana",
    ],
    subtitle: [
      "Reserva con al menos 5 días de anticipación y asegura tu lugar.",
      "Cada semana solo tomamos los pedidos que podemos hornear con cuidado.",
      "El cupo se aparta con el abono, no con la fecha en el calendario.",
      "Para diseños personalizados se necesita una semana de anticipación.",
      "No trabajamos por inventario, trabajamos por agenda.",
    ],
  },
  {
    id: "estatus",
    label: "Estatus y percepción",
    eyebrow: ["ARTESANÍA PREMIUM", "HECHO A LA MEDIDA", "DISEÑO PERSONALIZADO", "PARA OCASIONES QUE IMPORTAN"],
    title: [
      "No es una torta más, es la que todos van a recordar",
      "El postre que va a estar en cada foto de la celebración",
      "Diseñada para tu celebración, no para el catálogo",
      "El detalle que hace que la mesa se vea distinta",
    ],
    subtitle: [
      "El diseño se define contigo antes de empezar, para que no haya sorpresas.",
      "No hacemos producción en serie. Una torta a la vez, para una celebración a la vez.",
      "El lujo se demuestra con detalle, no con superlativos.",
      "Cada diseño se piensa para tu ocasión, no se repite de un catálogo.",
    ],
  },
  {
    id: "prueba_social",
    label: "Prueba social",
    eyebrow: ["LA MÁS PEDIDA", "LA FAVORITA DE LA AGENDA", "LA QUE MÁS SE REPITE", "RECOMENDADA POR QUIEN YA LA PROBÓ"],
    title: [
      "La combinación que más veces hemos horneado este mes",
      "La que casi todos terminan pidiendo",
      "La favorita de quienes ya celebraron con nosotros",
      "La que se repite en más celebraciones que ninguna otra",
    ],
    subtitle: [
      "Cada semana rechazamos pedidos por falta de cupo, y aun así cada torta sale con el mismo cuidado.",
      "No es la más publicitada, es la que la gente vuelve a pedir.",
      "Elegida una y otra vez por quienes ya celebraron con nosotros.",
      "¿Quieres otra combinación? Escríbenos.",
    ],
  },
  {
    id: "oficio",
    label: "Oficio y proceso",
    eyebrow: ["DETRÁS DEL OFICIO", "HECHO A MANO", "EL PROCESO", "CÓMO TRABAJAMOS"],
    title: [
      "Lo que pasa antes de que tu torta llegue a la mesa",
      "Cada torta se arma a mano, por eso trabajamos con agenda y no por inventario",
      "Así se ve un sábado de tres entregas",
      "Nada se congela, nada se improvisa",
    ],
    subtitle: [
      "Cada torta se hornea el día anterior a tu entrega, nada se congela.",
      "El diseño se define contigo antes de empezar, para que no haya sorpresas.",
      "Todo se arma a mano, torta por torta, no en línea de producción.",
      "El cuidado no cambia si es la primera torta de la semana o la última.",
    ],
  },
  {
    id: "problema_solucion",
    label: "Problema / solución",
    eyebrow: ["LA VERDAD SOBRE LAS TORTAS ECONÓMICAS", "EL ERROR MÁS COMÚN", "ANTES DE QUE PIDAS", "UN CONSEJO ANTES DE RESERVAR"],
    title: [
      "El error más grande al calcular las porciones",
      "Por qué la foto de Pinterest no siempre se replica igual",
      "La verdad sobre las tortas de $50.000",
      "Lo que nadie te dice antes de pedir una torta grande",
    ],
    subtitle: [
      "Con 20 porciones alcanza cómodo para 15 personas, si hay más postres en la mesa.",
      "Si es el único postre de la mesa, sube un tamaño.",
      "Cada diseño se adapta a lo que sí se puede hacer con tu presupuesto y tiempo, sin prometer de más.",
      "Mejor una torta bien pensada que una improvisada a última hora.",
    ],
  },
  {
    id: "ocasion",
    label: "Ocasiones especiales",
    eyebrow: ["PARA BODAS", "PARA CUMPLEAÑOS", "PARA CELEBRACIONES EN GRANDE", "FECHAS ESPECIALES"],
    title: [
      "El postre que merece tu celebración más importante",
      "Para el cumpleaños que sí quieres recordar",
      "Diseñada para acompañar el día más especial del año",
      "No necesitas cinco postres, necesitas uno que valga",
    ],
    subtitle: [
      "Para diseños personalizados se necesita una semana de anticipación.",
      "Cuéntanos la ocasión y armamos el diseño contigo.",
      "Desde bodas hasta cumpleaños íntimos, cada torta se piensa para el momento.",
      "¿Quieres otra combinación? Escríbenos.",
    ],
  },
  {
    id: "temporada",
    label: "Temporada y novedades",
    eyebrow: ["DE TEMPORADA", "NOVEDADES", "NUEVO EN LA CARTA", "POR TIEMPO LIMITADO"],
    title: [
      "La combinación de temporada que estábamos esperando",
      "Nueva en la carta, ya disponible para agendar",
      "Algo distinto para esta temporada",
      "Disponible solo por unas semanas",
    ],
    subtitle: [
      "Bizcocho de vainilla con relleno de maracuyá y merengue suizo.",
      "Reserva con al menos 5 días de anticipación y asegura tu lugar.",
      "¿Quieres otra combinación? Escríbenos.",
      "Una edición limitada mientras dura la temporada.",
    ],
  },
];

/** Elige un tema completo y coherente (eyebrow + title + subtitle emparejados),
 * en vez de tres campos independientes al azar. Sin llamadas a ningún API. */
export function autoThemedContent(): { eyebrow: string; title: string; subtitle: string } {
  const theme = pick(copyThemes);
  return {
    eyebrow: pick(theme.eyebrow),
    title: pick(theme.title),
    subtitle: pick(theme.subtitle),
  };
}

/** Elige un valor sin repetir dentro de una misma tanda (p. ej. un carrusel),
 * cayendo de nuevo al arreglo completo si ya se usaron todas las opciones. */
function pickUnique<T>(arr: T[], used: Set<T>): T {
  const available = arr.filter((v) => !used.has(v));
  const value = available.length > 0 ? pick(available) : pick(arr);
  used.add(value);
  return value;
}

/** Arma N slides coherentes de UN mismo tema, con estructura de carrusel:
 * gancho al inicio, valor en el medio, y cierre con pregunta de la sección
 * "closings" en el último slide. Sin llamadas a ningún API. */
export function autoCarouselSlides(
  count: number
): { eyebrow: string; title: string; subtitle: string; logoStyle: "completo" }[] {
  const theme = pick(copyThemes);
  const usedTitles = new Set<string>();
  const usedSubtitles = new Set<string>();

  return Array.from({ length: count }, (_, i) => {
    const isLastSlide = i === count - 1 && count > 1;
    return {
      eyebrow: pick(theme.eyebrow),
      title: isLastSlide ? pick(closings) : pickUnique(theme.title, usedTitles),
      subtitle: pickUnique(theme.subtitle, usedSubtitles),
      logoStyle: "completo" as const,
    };
  });
}

export function autoEyebrow(): string {
  return pick(eyebrowLabels);
}

export function autoTitle(): string {
  return pick(titleHooks);
}

export function autoSubtitle(): string {
  return pick([...valuePhrases.oficio, ...valuePhrases.anticipacion, ...valuePhrases.porciones]);
}

export function autoQuote(): { quoteText: string; author?: string } {
  return pick(brandQuotes);
}
