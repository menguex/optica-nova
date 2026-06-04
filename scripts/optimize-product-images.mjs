/**
 * Mejora y exporta fotos de /public/productos a WebP (más liviano y nítido en web).
 * Uso: npm run optimize:productos
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const productDir = path.join(root, "public", "productos");

const pipeline = (input) =>
  sharp(input)
    .rotate()
    .resize(960, 1280, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .modulate({ brightness: 1.04, saturation: 1.08 })
    .sharpen({ sigma: 0.65, m1: 0.5, m2: 0.35 })
    .webp({ quality: 88, effort: 6 });

async function main() {
  const entries = await fs.readdir(productDir);
  const sources = entries.filter((name) => /\.(jpe?g)$/i.test(name));

  if (sources.length === 0) {
    console.log("No hay JPEG en public/productos");
    return;
  }

  for (const name of sources) {
    const input = path.join(productDir, name);
    const base = name.replace(/\.(jpe?g)$/i, "");
    const webpOut = path.join(productDir, `${base}.webp`);

    const buffer = await pipeline(input).toBuffer();
    await fs.writeFile(webpOut, buffer);

    const meta = await sharp(buffer).metadata();
    console.log(`✓ ${base}.webp (${meta.width}×${meta.height})`);
  }

  console.log(`\nListo: ${sources.length} imágenes optimizadas.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
