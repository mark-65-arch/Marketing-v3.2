#!/usr/bin/env node
/**
 * Generate Responsive Images
 * Creates optimized WebP and AVIF images in multiple sizes for responsive loading
 *
 * Usage: node scripts/generate-responsive-images.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const INPUT_IMAGE = path.join(__dirname, '../public/Plumber.webp');
const OUTPUT_DIR = path.join(__dirname, '../public');
const SIZES = [
  { width: 400, suffix: '-400w' },
  { width: 600, suffix: '-600w' },
  { width: 840, suffix: '-840w' }  // Changed from 780 to match original image width
];

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate responsive images
async function generateImages() {
  console.log('🖼️  Generating responsive images...\n');

  // Check if source file exists
  if (!fs.existsSync(INPUT_IMAGE)) {
    console.error(`❌ Source image not found: ${INPUT_IMAGE}`);
    process.exit(1);
  }

  const startTime = Date.now();
  let processedCount = 0;

  for (const size of SIZES) {
    const basename = 'Plumber';

    // Generate WebP
    const webpOutput = path.join(OUTPUT_DIR, `${basename}${size.suffix}.webp`);
    try {
      await sharp(INPUT_IMAGE)
        .resize(size.width, null, {  // null height = preserve aspect ratio
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 85, effort: 6 })
        .toFile(webpOutput);

      const stats = fs.statSync(webpOutput);
      console.log(`✅ ${basename}${size.suffix}.webp - ${(stats.size / 1024).toFixed(1)}KB`);
      processedCount++;
    } catch (error) {
      console.error(`❌ Failed to generate ${webpOutput}:`, error.message);
    }

    // Generate AVIF
    const avifOutput = path.join(OUTPUT_DIR, `${basename}${size.suffix}.avif`);
    try {
      await sharp(INPUT_IMAGE)
        .resize(size.width, null, {  // null height = preserve aspect ratio
          fit: 'inside',
          withoutEnlargement: true
        })
        .avif({ quality: 80, effort: 6 })
        .toFile(avifOutput);

      const stats = fs.statSync(avifOutput);
      console.log(`✅ ${basename}${size.suffix}.avif - ${(stats.size / 1024).toFixed(1)}KB`);
      processedCount++;
    } catch (error) {
      console.error(`❌ Failed to generate ${avifOutput}:`, error.message);
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n🎉 Generated ${processedCount} images in ${duration}s`);

  // Show size comparison
  console.log('\n📊 Size Comparison:');
  const originalStats = fs.statSync(INPUT_IMAGE);
  console.log(`Original (780px): ${(originalStats.size / 1024).toFixed(1)}KB`);

  SIZES.forEach(size => {
    const webpPath = path.join(OUTPUT_DIR, `Plumber${size.suffix}.webp`);
    const avifPath = path.join(OUTPUT_DIR, `Plumber${size.suffix}.avif`);

    if (fs.existsSync(webpPath)) {
      const webpStats = fs.statSync(webpPath);
      console.log(`${size.width}px WebP: ${(webpStats.size / 1024).toFixed(1)}KB`);
    }

    if (fs.existsSync(avifPath)) {
      const avifStats = fs.statSync(avifPath);
      console.log(`${size.width}px AVIF: ${(avifStats.size / 1024).toFixed(1)}KB`);
    }
  });
}

// Run the generator
generateImages().catch(error => {
  console.error('❌ Error generating images:', error);
  process.exit(1);
});
