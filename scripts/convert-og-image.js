import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputFile = './public/og-image.png';
const outputWebP = './public/og-image.webp';

console.log('🖼️  Converting OG image to WebP format...\n');

// Check if input file exists
if (!fs.existsSync(inputFile)) {
  console.error(`❌ Error: ${inputFile} not found`);
  process.exit(1);
}

// Get input file size
const inputStats = fs.statSync(inputFile);
const inputSizeKb = (inputStats.size / 1024).toFixed(2);

console.log(`📊 Input: ${inputFile} (${inputSizeKb}KB)`);

// Convert PNG to WebP with optimal settings
sharp(inputFile)
  .webp({
    quality: 82,        // Balance quality and size
    alphaQuality: 100,  // Preserve transparency if any
    effort: 6           // Compression effort (max is 6)
  })
  .toFile(outputWebP)
  .then(info => {
    const outputSizeKb = (info.size / 1024).toFixed(2);
    const reductionPercent = (((inputStats.size - info.size) / inputStats.size) * 100).toFixed(1);
    const savings = ((inputStats.size - info.size) / 1024).toFixed(2);

    console.log(`\n✅ Conversion successful!\n`);
    console.log(`📊 Output: ${outputWebP}`);
    console.log(`   Size: ${outputSizeKb}KB`);
    console.log(`\n📈 Compression Results:`);
    console.log(`   Original: ${inputSizeKb}KB`);
    console.log(`   WebP:     ${outputSizeKb}KB`);
    console.log(`   Saved:    ${savings}KB (${reductionPercent}% reduction)\n`);
    console.log(`🎯 Next steps:`);
    console.log(`   1. Update og-image references in HTML to use og-image.webp`);
    console.log(`   2. Keep PNG as fallback for browsers that don't support WebP`);
    console.log(`   3. Consider using picture element for format negotiation\n`);
  })
  .catch(err => {
    console.error(`❌ Error during conversion:`, err.message);
    process.exit(1);
  });
