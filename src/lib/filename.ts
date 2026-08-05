export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
}

export function buildFilename(categoria: string, tipo: string, tituloCorto: string, ext: string): string {
  const fecha = new Date().toISOString().slice(0, 10); // YYYY-MM-DD, hoy
  return `${categoria}-${tipo}-${fecha}-${slugify(tituloCorto)}.${ext}`;
}

if (import.meta.env.DEV) {
  console.assert(slugify("¡Torta de Vainilla!") === "torta-de-vainilla", "slugify: acentos/puntuación");
  console.assert(slugify("  espacios   dobles  ") === "espacios-dobles", "slugify: espacios y bordes");
  console.assert(slugify("a".repeat(60)).length === 40, "slugify: límite de 40 chars");
  console.assert(
    /^redes-post-\d{4}-\d{2}-\d{2}-mi-titulo\.png$/.test(buildFilename("redes", "post", "Mi título", "png")),
    "buildFilename: patrón esperado"
  );
}
