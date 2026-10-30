/**
 * Converte os prints fornecidos pelo usuario (~/Downloads) em WebP otimizados
 * para os cards de projetos, recortando barras de status, selos de debug,
 * widgets flutuantes e espacos vazios.
 *
 * Uso: node scripts/process-user-shots.mjs
 */
import { mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const SRC = join(homedir(), "Downloads");
const OUT = join(process.cwd(), "public", "images", "projects");

/** Recortes (x, y, largura, altura) e nome de saida. */
const SHOTS = [
  {
    // App mobile: remove barra de status + selo DEBUG do Flutter e o rodape vazio.
    from: "ludare.png",
    to: "ludare.webp",
    extract: { left: 0, top: 180, width: 1080, height: 1835 },
    maxWidth: 1080,
  },
  {
    // Dashboard: remove widget flutuante do portfólio e a area vazia inferior.
    from: "fintrack.png",
    to: "fintrack.webp",
    extract: { left: 0, top: 0, width: 3360, height: 1480 },
    maxWidth: 1600,
  },
  {
    // Painel do servidor: recorta margens brancas e a area vazia inferior.
    from: "minecraft-panel.png",
    to: "minecraft-panel.webp",
    extract: { left: 440, top: 0, width: 2480, height: 840 },
    maxWidth: 1600,
  },
];

await mkdir(OUT, { recursive: true });

for (const { from, to, extract, maxWidth } of SHOTS) {
  const input = join(SRC, from);
  const width = Math.min(maxWidth, extract.width);
  const result = await sharp(input)
    .extract(extract)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(OUT, to));
  console.log(
    `${from} -> ${to}  ${extract.width}x${extract.height} -> ${result.width}x${result.height}  ` +
      `${(result.size / 1024).toFixed(0)}KB`,
  );
}
