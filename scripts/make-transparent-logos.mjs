/**
 * Generates transparent logo PNGs from official brand files.
 * Run: node scripts/make-transparent-logos.mjs
 */
import sharp from "sharp";
import { join } from "path";
import { readFile, writeFile } from "fs/promises";

const brandDir = join(process.cwd(), "public", "assets", "brand");

function isBlackBg(r, g, b) {
  return r <= 50 && g <= 50 && b <= 50;
}

function isWhiteBg(r, g, b) {
  return r >= 240 && g >= 240 && b >= 240;
}

/** Flood-fill background from image edges — preserves interior logo pixels */
function removeEdgeBackground(data, width, height, isBg) {
  const total = width * height;
  const visited = new Uint8Array(total);
  const queue = [];

  const seed = (x, y) => {
    const idx = y * width + x;
    if (visited[idx]) return;
    const px = idx * 4;
    if (isBg(data[px], data[px + 1], data[px + 2])) {
      visited[idx] = 1;
      queue.push(idx);
    }
  };

  for (let x = 0; x < width; x++) {
    seed(x, 0);
    seed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    seed(0, y);
    seed(width - 1, y);
  }

  while (queue.length) {
    const idx = queue.pop();
    const px = idx * 4;
    data[px + 3] = 0;

    const x = idx % width;
    const y = Math.floor(idx / width);
    const neighbors = [
      x > 0 ? idx - 1 : -1,
      x < width - 1 ? idx + 1 : -1,
      y > 0 ? idx - width : -1,
      y < height - 1 ? idx + width : -1,
    ];

    for (const n of neighbors) {
      if (n < 0 || visited[n]) continue;
      const npx = n * 4;
      if (isBg(data[npx], data[npx + 1], data[npx + 2])) {
        visited[n] = 1;
        queue.push(n);
      }
    }
  }
}

async function processLogo(input, output, mode) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const buffer = Buffer.from(data);
  removeEdgeBackground(
    buffer,
    info.width,
    info.height,
    mode === "black" ? isBlackBg : isWhiteBg
  );

  await sharp(buffer, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(output);

  console.log(`Created ${output}`);
}

/** Trim empty transparent padding so the logo renders larger at the same height */
async function trimTransparent(input, output) {
  await sharp(input).trim().png().toFile(output);
  console.log(`Created ${output}`);
}

/** White silhouette from any transparent logo — for dark backgrounds */
async function makeWhiteLogo(input, output) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const buffer = Buffer.from(data);
  for (let i = 0; i < info.width * info.height; i++) {
    const px = i * 4;
    if (buffer[px + 3] > 0) {
      buffer[px] = 255;
      buffer[px + 1] = 255;
      buffer[px + 2] = 255;
    }
  }

  await sharp(buffer, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(output);

  console.log(`Created ${output}`);
}

/** Stacked vertical logos from official PNGs */
await processLogo(
  join(brandDir, "logo-horizontal-light.png"),
  join(brandDir, "logo-white-transparent.png"),
  "black"
);

await processLogo(
  join(brandDir, "logo-horizontal.png"),
  join(brandDir, "logo-colored-transparent.png"),
  "white"
);

/** Horizontal logo from official SVG (لوغو ميترون-24 عرضي.svg) */
const horizontalSvg = join(brandDir, "logo-horizontal.svg");
const horizontalWhiteSvg = join(brandDir, "logo-horizontal-white.svg");

if (await sharp(horizontalSvg).metadata().then(() => true).catch(() => false)) {
  const coloredOut = join(brandDir, "logo-horizontal-colored.png");
  const whiteOut = join(brandDir, "logo-horizontal-white.png");

  const svgSource = await readFile(horizontalSvg, "utf8");
  const whiteSvgSource = svgSource
    .replace(/fill: #[0-9a-fA-F]{3,8}/gi, "fill: #ffffff")
    .replace(/stroke: #[0-9a-fA-F]{3,8}/gi, "stroke: #ffffff");
  await writeFile(horizontalWhiteSvg, whiteSvgSource);

  const renderOpts = { density: 150 };
  const pngOpts = { compressionLevel: 9 };

  await sharp(horizontalSvg, renderOpts)
    .png()
    .trim()
    .resize(1200)
    .png(pngOpts)
    .toFile(coloredOut);
  console.log(`Created ${coloredOut}`);

  await sharp(horizontalWhiteSvg, renderOpts)
    .png()
    .trim()
    .resize(1200)
    .png(pngOpts)
    .toFile(whiteOut);
  console.log(`Created ${whiteOut}`);
}

console.log("Done.");
