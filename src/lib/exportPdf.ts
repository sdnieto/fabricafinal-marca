import { toCanvas } from "html-to-image";
import { jsPDF } from "jspdf";
import { saveFile } from "./download";

/** px por pulgada usado para dimensionar la página PDF a partir del tamaño CSS
 * del nodo (1920x1080 a 144dpi = 13.33x7.5in, el ancho estándar de slide widescreen;
 * 1191x1684 a 144dpi ≈ A4). pixelRatio 2 sobre eso da nitidez de impresión. */
const PDF_DPI = 144;

export async function exportNodeToPdf(node: HTMLElement, filename: string) {
  await document.fonts.ready;
  const canvas = await toCanvas(node, { pixelRatio: 2, cacheBust: true });
  const widthIn = node.offsetWidth / PDF_DPI;
  const heightIn = node.offsetHeight / PDF_DPI;
  const pdf = new jsPDF({
    orientation: widthIn >= heightIn ? "landscape" : "portrait",
    unit: "in",
    format: [widthIn, heightIn],
  });
  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, widthIn, heightIn);
  // pdf.output("blob") + saveFile en vez de pdf.save(): mismo mecanismo de guardado
  // (Web Share con fallback a blob: URL) que PNG y HTML, más confiable en móvil.
  const blob = pdf.output("blob");
  await saveFile(blob, filename);
}
