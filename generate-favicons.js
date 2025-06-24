const sharp = require('sharp');
const path = require('path');

const sizes = [16, 32, 96, 128];
const inputFile = path.join(__dirname, 'src', 'assets', 'logo.svg');
const outputDir = path.join(__dirname, 'public', 'icons');

async function generateFavicons() {
  // Create a base PNG from SVG with padding
  const base = sharp(inputFile)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }  // Transparent background
    })
    .toFormat('png');

  // Generate different sizes
  for (const size of sizes) {
    await base
      .clone()
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }  // Transparent background
      })
      .toFile(path.join(outputDir, `favicon-${size}x${size}.png`));
  }

  // Generate ICO file (which will be the first letter "C" nicely centered)
  await sharp(inputFile)
    .extract({ left: 0, top: 0, width: 300, height: 100 })  // Extract just the logo area
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }  // Transparent background
    })
    .toFile(path.join(outputDir, 'favicon.ico'));
}

generateFavicons().catch(console.error); 