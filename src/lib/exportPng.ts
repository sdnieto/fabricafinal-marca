import { toBlob } from "html-to-image";
import { saveFile } from "./download";

/** pixelRatio 2: el nodo ya está al tamaño final (1080×1350, etc.), pero capturar a 1x
 * produce bordes de texto suaves/pixelados — Instagram y el resto de plataformas aceptan
 * imágenes más grandes que el mínimo recomendado sin problema, así que se sobre-muestrea
 * a 2x (2160×2700, etc.) para que el texto se vea nítido, casi vectorial, al hacer zoom. */
export async function captureNodeToPngBlob(node: HTMLElement): Promise<Blob> {
  await document.fonts.ready;
  const blob = await toBlob(node, { pixelRatio: 2, cacheBust: true });
  if (!blob) throw new Error("No se pudo generar el PNG");
  return blob;
}

export async function exportNodeToPng(node: HTMLElement, filename: string) {
  const blob = await captureNodeToPngBlob(node);
  await saveFile(blob, filename);
}
