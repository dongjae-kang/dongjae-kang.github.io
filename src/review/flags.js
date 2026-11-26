/* Review-only switches (branch review/landing-1126, never deployed).
   Read from the query string before the hash, e.g. http://localhost:5179/?graph=a&font=b#/ */
const params = typeof window === 'undefined' ? new URLSearchParams() : new URLSearchParams(window.location.search);

export const reviewGraph = params.get('graph'); // null (current) | 'a' | 'b' | 'c'
export const reviewFont = params.get('font'); // null (current) | key of HEADING_FONTS

/* Every heading element on the site asks for some weight between 500 and 700. Each candidate
   registers ONE file under the alias 'ReviewHeading' covering weights 100-900, so whatever a
   component asks for, the browser draws that file: font against font at one chosen weight,
   with no faux bold. `css` is the provider stylesheet; the latin (or only) block's file is used. */
export const HEADING_FONTS = {
  montreal500: { name: 'PP Neue Montreal Medium (500), no stroke', css: 'https://fonts.cdnfonts.com/css/pp-neue-montreal', match: 'ppneuemontreal-medium' },
  montreal400: { name: 'PP Neue Montreal Book (400)', css: 'https://fonts.cdnfonts.com/css/pp-neue-montreal', match: 'ppneuemontreal-book' },
  sourceserif: { name: 'Source Serif 4 (500, optical sizes)', css: 'https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500&display=swap' },
  spectral: { name: 'Spectral (500)', css: 'https://fonts.googleapis.com/css2?family=Spectral:wght@500&display=swap' },
  schibsted: { name: 'Schibsted Grotesk (400)', css: 'https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400&display=swap' },
};

export async function loadReviewFont() {
  const spec = reviewFont && HEADING_FONTS[reviewFont];
  if (!spec) return null;
  const cssText = await fetch(spec.css).then((r) => r.text());
  const urls = [...cssText.matchAll(/url\((['"]?)([^'")]+)\1\)/g)].map((m) => m[2]);
  let url = spec.match ? urls.find((u) => u.includes(spec.match)) : null;
  if (!url) {
    const latin = cssText.split('/* latin */')[1];
    url = latin ? latin.match(/url\(([^)]+)\)/)[1] : urls[0];
  }
  const face = new FontFace('ReviewHeading', `url(${url})`, { weight: '100 900', style: 'normal' });
  document.fonts.add(await face.load());
  return { family: `'ReviewHeading', 'PP Neue Montreal', 'Inter', sans-serif`, url, ...spec };
}
