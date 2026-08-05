import { toBlob } from "html-to-image";
import { saveFile } from "./download";

/** Captura un nodo a su tamaño real en px (pixelRatio 1 — el nodo ya está dimensionado
 * al tamaño final de exportación; el preview en pantalla lo escala visualmente con CSS
 * transform, que no afecta el offsetWidth/Height que usa html-to-image). */
export async function captureNodeToPngBlob(node: HTMLElement): Promise<Blob> {
  await document.fonts.ready;
  const blob = await toBlob(node, { pixelRatio: 1, cacheBust: true });
  if (!blob) throw new Error("No se pudo generar el PNG");
  return blob;
}

export async function exportNodeToPng(node: HTMLElement, filename: string) {
  const blob = await captureNodeToPngBlob(node);
  await saveFile(blob, filename);
}
