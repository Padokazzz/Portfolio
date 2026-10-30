/**
 * Converte os prints fornecidos pelo usuario (~/Downloads) em WebP otimizados
 * para os cards de projetos, removendo barras de status, selos de debug,
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

/**
 * Recortes, retangulos pintados sobre o original (para apagar capturas do
 * widget flutuante do portfolio) e nome de saida.
 *
 * FinTrack e Minecraft usam a imagem COMPLETA (~1,8:1, proximo do 16/10 do
 * frame) para que o screenshot ocupe quase todo o card; apenas o widget
 * "N" do canto inferior esquerdo e pintado por cima.
 *
 * Observacao: o sharp aplica `composite` por ultimo, em coordenadas ja
 * transformadas por extract/resize. Por isso a pintura roda numa primeira
 * passada sobre a imagem cheia, e so depois vem recorte + resize.
 */
const SHOTS = [
  {
    // App mobile: remove barra de status + selo DEBUG do Flutter e o rodape vazio.
    from: "ludare.png",
    to: "ludare.webp",
    extract: { left: 0, top: 180, width: 1080, height: 1835 },
    maxWidth: 1080,
  },
  {
    // Dashboard: imagem completa; pinta o widget "N" que cobre o avatar do
    // card "Leonardo / Demo local" no rodape da sidebar (fundo #F8FAFB).
    from: "fintrack.png",
    to: "fintrack.webp",
    paint: [{ left: 20, top: 1704, width: 116, height: 124, color: [248, 250, 251] }],
    maxWidth: 1600,
  },
  {
    // Painel do servidor: recorta as margens brancas laterais (conteudo vai
    // de x 458 a 2889) e ajusta a altura para 16:10 exatos, usando o proprio
    // fundo da pagina abaixo dos cards — o print preenche o frame inteiro e
    // o widget "N" (y 1728+) fica fora do recorte.
    from: "minecraft-panel.png",
    to: "minecraft-panel.webp",
    extract: { left: 440, top: 0, width: 2480, height: 1550 },
    maxWidth: 1600,
  },
];

await mkdir(OUT, { recursive: true });

for (const { from, to, extract, paint, maxWidth } of SHOTS) {
  const input = join(SRC, from);
  const meta = await sharp(input).metadata();
  const region = extract ?? { left: 0, top: 0, width: meta.width, height: meta.height };
  const width = Math.min(maxWidth, region.width);

  // 1) Pintura dos retangulos sobre a imagem cheia (sem extract/resize).
  let base = sharp(input);
  if (paint?.length) {
    const overlays = await Promise.all(
      paint.map(async (rect) => ({
        input: await sharp({
          create: {
            width: rect.width,
            height: rect.height,
            channels: 3,
            background: { r: rect.color[0], g: rect.color[1], b: rect.color[2] },
          },
        })
          .png()
          .toBuffer(),
        left: rect.left,
        top: rect.top,
      })),
    );
    base = sharp(await base.composite(overlays).png().toBuffer());
  }

  // 2) Recorte + reducao + WebP.
  const result = await base
    .extract(region)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(OUT, to));

  console.log(
    `${from} -> ${to}  ${region.width}x${region.height} -> ${result.width}x${result.height}  ` +
      `${(result.size / 1024).toFixed(0)}KB`,
  );
}
