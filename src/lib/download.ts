interface NamedBlob {
  blob: Blob;
  filename: string;
}

/** Guarda uno o más archivos. Intenta primero el share sheet nativo — en la
 * mayoría de navegadores móviles (Safari/Chrome iOS y Android) el <a download>
 * con blob: URL es poco confiable o no hace nada, mientras que Web Share con
 * archivos sí abre el diálogo real de "Guardar imagen / Guardar en Archivos".
 * Si no está disponible o el usuario cancela, cae a la descarga clásica por link. */
export async function saveFiles(files: NamedBlob[]): Promise<void> {
  if (files.length === 0) return;
  const shareFiles = files.map((f) => new File([f.blob], f.filename, { type: f.blob.type }));
  if (navigator.share && navigator.canShare?.({ files: shareFiles })) {
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
