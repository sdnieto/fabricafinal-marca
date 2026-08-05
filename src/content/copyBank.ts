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
