import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const assets = [
  ["phoenix-dactylifera", "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Phoenix_dactylifera0.jpg/1920px-Phoenix_dactylifera0.jpg"],
  ["ziziphus-spina-christi", "https://upload.wikimedia.org/wikipedia/commons/8/84/Ziziphus-areva-israel.jpg"],
  ["vachellia-tortilis", "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Acacia_%28Vachellia_tortilis%29%2C_parque_nacional_de_Amboseli%2C_Kenia%2C_2024-05-22%2C_DD_98.jpg/1920px-Acacia_%28Vachellia_tortilis%29%2C_parque_nacional_de_Amboseli%2C_Kenia%2C_2024-05-22%2C_DD_98.jpg"],
  ["tamarix-aphylla", "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Tamarix_Aphylla.jpg/1920px-Tamarix_Aphylla.jpg"],
  ["salvadora-persica", "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Salvadora_persica_kz08.jpg/1920px-Salvadora_persica_kz08.jpg"],
  ["prosopis-cineraria", "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Prosopis_cineraria_-_Khejri.jpg/1920px-Prosopis_cineraria_-_Khejri.jpg"],
  ["hyphaene-thebaica", "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Hyphaene_thebaica_kz04.jpg/1920px-Hyphaene_thebaica_kz04.jpg"],
  ["washingtonia-robusta", "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Washingtonia_robusta_-_Lanzarote.JPG/1920px-Washingtonia_robusta_-_Lanzarote.JPG"],
  ["roystonea-regia", "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Roystonea_regia.jpg/1920px-Roystonea_regia.jpg"],
  ["ficus-benjamina", "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Ficus_benjamina-weeping_fig-benjamin_fig_02.jpg/1920px-Ficus_benjamina-weeping_fig-benjamin_fig_02.jpg"],
  ["azadirachta-indica", "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Neem_Tree_%28Azadirachta_indica%29.jpg/1920px-Neem_Tree_%28Azadirachta_indica%29.jpg"],
  ["delonix-regia", "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Flame_tree_mali.jpg/1920px-Flame_tree_mali.jpg"],
];

const destination = path.join(process.cwd(), "public", "trees", "guide");
await fs.mkdir(destination, { recursive: true });

for (const [slug, url] of assets) {
  const response = await fetch(url, { headers: { "user-agent": "ShajiratiSite/1.0" } });
  if (!response.ok) throw new Error(`${slug}: ${response.status}`);
  const input = Buffer.from(await response.arrayBuffer());
  await sharp(input)
    .rotate()
    .resize({ width: 1500, height: 1100, fit: "cover", position: "attention", withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(path.join(destination, `${slug}.webp`));
  console.log(`saved ${slug}`);
}
