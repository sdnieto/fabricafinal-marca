interface NamedBlob {
  blob: Blob;
  filename: string;
}

// navigator.share/canShare con archivos también existe en Chrome/Edge de escritorio
// (abre el selector de apps de Windows/macOS) — ahí se prefiere la descarga directa
// de siempre, así que el share sheet solo se intenta en dispositivos móviles reales.
function isMobileDevice(): boolean {
  const uaData = (navigator as Navigator & { userAgentData?: { mobile?: boolean } }).userAgentData;
  if (uaData && typeof uaData.mobile === "boolean") return uaData.mobile;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

/** Guarda uno o más archivos. En móvil intenta primero el share sheet nativo —
 * el <a download> con blob: URL es poco confiable o no hace nada en la mayoría
 * de Safari/Chrome iOS y Android, mientras que Web Share con archivos sí abre
 * el diálogo real de "Guardar imagen / Guardar en Archivos". En desktop (o si
 * el share sheet no está disponible o se cancela) cae a la descarga clásica. */
export async function saveFiles(files: NamedBlob[]): Promise<void> {
  if (files.length === 0) return;
  const shareFiles = files.map((f) => new File([f.blob], f.filename, { type: f.blob.type }));
  if (isMobileDevice() && navigator.share && navigator.canShare?.({ files: shareFiles })) {
    try {
      await navigator.share({ files: shareFiles });
      return;
    } catch {
      // cancelado o falló el share sheet — seguimos con la descarga por link
    }
  }
  for (const f of files) {
    const url = URL.createObjectURL(f.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = f.filename;
    a.click();
    URL.revokeObjectURL(url);
    // ponytail: pausa entre descargas — los navegadores bloquean descargas
    // automáticas simultáneas; solo aplica si el share sheet no estuvo disponible.
    if (files.length > 1) await new Promise((r) => setTimeout(r, 350));
  }
}

export function saveFile(blob: Blob, filename: string): Promise<void> {
  return saveFiles([{ blob, filename }]);
}
