import type { LandingContent } from "../../types/content";

// Portado de Landing.dc.html + ui_kits/landing/{Hero,Combos,ContactCTA}.jsx
// (Claude Design → Altara Design System Final 01), con el contenido parametrizado
// en vez de fijo y el CTA como link real (no el toggle de estado del ui_kit).
async function fetchAsBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function buildLandingHtml(content: LandingContent): Promise<string> {
  const [diotima, elmsSans, elmsSansItalic, logo, fleur] = await Promise.all([
    fetchAsBase64("/fonts/DiotimaClassic.ttf"),
    fetchAsBase64("/fonts/ElmsSans-Variable.ttf"),
    fetchAsBase64("/fonts/ElmsSans-Italic-Variable.ttf"),
    fetchAsBase64("/logo/altara-logo.png"),
    fetchAsBase64("/logo/fleur-ornament.png"),
  ]);

  const combosHtml = content.combos
    .slice(0, 3)
    .map(
      (c) => `
      <div style="width:300px;background:#fff;border-radius:14px;box-shadow:0 12px 28px -16px rgba(60,40,20,0.22);border:1px solid rgba(28,21,18,0.12);overflow:hidden">
        <div style="aspect-ratio:4/3;background:linear-gradient(135deg,#e8d3ba,#cfa876)"></div>
        <div style="padding:20px 22px 24px;display:flex;flex-direction:column;gap:8px">
          <span style="font-size:12px;letter-spacing:0.14em;color:var(--gold-500);font-weight:700">${escapeHtml(c.eyebrow.toUpperCase())}</span>
          <span style="font-family:var(--font-display);font-size:23px;color:var(--charcoal)">${escapeHtml(c.title)}</span>
          <span style="font-size:14px;color:rgba(28,21,18,0.6);line-height:1.5">${escapeHtml(c.desc)}</span>
          <span style="font-size:14px;font-weight:600;color:var(--gold-700);margin-top:4px">${escapeHtml(c.price)}</span>
        </div>
      </div>`
    )
    .join("");

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(content.title)} — ALTARA Pastelería</title>
<style>
@font-face{font-family:"Diotima Classic";src:url("${diotima}") format("truetype");font-weight:400;font-style:normal}
@font-face{font-family:"Elms Sans";src:url("${elmsSans}") format("truetype-variations");font-weight:100 900;font-style:normal}
@font-face{font-family:"Elms Sans";src:url("${elmsSansItalic}") format("truetype-variations");font-weight:100 900;font-style:italic}
:root{
  --gold-100:#f3ceab; --gold-300:#e49259; --gold-500:#bc8c5c; --gold-700:#a06f42;
  --neutral-50:#faf6ef; --neutral-950:#0b0806; --charcoal:#1c1512;
  --bg-velvet-gradient:linear-gradient(160deg,#3a2416 0%,#0c0806 78%);
  --font-display:"Diotima Classic",Georgia,serif; --font-body:"Elms Sans",-apple-system,"Segoe UI",sans-serif;
}
*{box-sizing:border-box}
body{margin:0;font-family:var(--font-body);background:var(--neutral-50)}
a{color:var(--gold-500)}
</style>
</head>
<body>
<section style="background:var(--bg-velvet-gradient);padding:90px 8vw 110px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:22px">
  <img src="${logo}" alt="ALTARA Pastelería" style="height:74px;filter:brightness(1.15)">
  <h1 style="font-family:var(--font-display);font-weight:400;color:var(--neutral-50);font-size:clamp(2.25rem,5vw,4.5rem);line-height:1.08;max-width:780px;margin:0">${escapeHtml(content.title)}</h1>
  <p style="color:rgba(250,246,239,0.62);font-size:1.15rem;max-width:560px;line-height:1.6;margin:0">${escapeHtml(content.subtitle)}</p>
  <div style="display:flex;gap:14px;margin-top:8px;flex-wrap:wrap;justify-content:center">
    <a href="#combos" style="font-weight:600;background:var(--gold-500);color:#fff;padding:13px 30px;border-radius:999px;text-decoration:none">Ver combos</a>
    <a href="${escapeHtml(content.ctaLink)}" style="font-weight:600;border:1px solid rgba(250,246,239,0.35);color:var(--neutral-50);padding:13px 30px;border-radius:999px;text-decoration:none">${escapeHtml(content.ctaLabel)}</a>
  </div>
</section>
<section id="combos" style="padding:80px 8vw;background:var(--neutral-50);display:flex;flex-direction:column;gap:40px;align-items:center">
  <div style="text-align:center;display:flex;flex-direction:column;gap:10px">
    <span style="font-size:0.8rem;letter-spacing:0.22em;color:var(--gold-300);font-weight:700">TRES QUE MÁS SE PIDEN</span>
    <h2 style="font-family:var(--font-display);font-weight:400;font-size:clamp(2rem,3.5vw,2.75rem);color:var(--charcoal);margin:0">¿Quieres otra combinación? Escríbenos.</h2>
  </div>
  <div style="display:flex;gap:28px;flex-wrap:wrap;justify-content:center">${combosHtml}</div>
</section>
<section id="contacto" style="background:var(--charcoal);padding:80px 8vw;display:flex;flex-direction:column;align-items:center;gap:26px;text-align:center">
  <img src="${fleur}" alt="" style="height:34px">
  <h2 style="font-family:var(--font-display);font-weight:400;color:var(--neutral-50);font-size:2rem;max-width:620px;margin:0">${escapeHtml(content.contactHeadline)}</h2>
  <p style="color:rgba(250,246,239,0.62);max-width:480px;line-height:1.6;margin:0">${escapeHtml(content.contactSubtext)}</p>
  <a href="${escapeHtml(content.ctaLink)}" style="font-weight:600;background:var(--gold-500);color:#fff;padding:14px 34px;border-radius:999px;text-decoration:none;font-size:16px">${escapeHtml(content.ctaLabel)}</a>
</section>
<footer style="background:var(--neutral-950);padding:30px 8vw;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
  <span style="font-family:var(--font-display);color:var(--gold-500);font-size:20px">ALTARA</span>
  <span style="color:rgba(250,246,239,0.62);font-size:13px">Neiva, Huila · Pastelería artesanal por encargo</span>
</footer>
</body>
</html>`;
}
