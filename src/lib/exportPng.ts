import { toPng } from "html-to-image";
import { downloadDataUrl } from "./download";

/** Captura un nodo a su tamaño real en px (pixelRatio 1 — el nodo ya está dimensionado
 * al tamaño final de exportación; el preview en pantalla lo escala visualmente con CSS
 * transform, que no afecta el offsetWidth/Height que usa html-to-image). */
export async function exportNodeToPng(node: HTMLElement, filename: string) {
  await document.fonts.ready;
  const dataUrl = await toPng(node, { pixelRatio: 1, cacheBust: true });
  downloadDataUrl(dataUrl, filename);
}
