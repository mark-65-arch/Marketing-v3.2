#!/usr/bin/env node
/**
 * Optimize All Images
 * Master script that handles all image optimization tasks
 * - Generates responsive images for hero content
 * - Converts social sharing images to optimized formats
 *
 * Usage: node scripts/optimize-all-images.js
 *        npm run optimize:images
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// List of optimization scripts to run
const scripts = [
  {
    name: '📸 Hero Images',
    script: 'generate-responsive-images.js',
    description: 'Creating responsive variants (400px, 600px, 840px) in WebP/AVIF'
  },
  {
    name: '🖼️ OG Image',
    script: 'convert-og-image.js',
    description: 'Converting social sharing image to optimized WebP'
  }
];

console.log('\n🚀 Starting comprehensive image optimization...\n');
console.log('═'.repeat(60));

let completedCount = 0;
let failedCount = 0;
const startTime = Date.now();

/**
 * Run a single optimization script
 */
function runScript(scriptInfo) {
  return new Promise((resolve) => {
    console.log(`\n${scriptInfo.name}`);
    console.log(`${scriptInfo.description}`);
    console.log('-'.repeat(60));

    const scriptPath = path.join(__dirname, scriptInfo.script);
    const child = spawn('node', [scriptPath], { stdio: 'inherit' });

    child.on('close', (code) => {
      if (code === 0) {
        completedCount++;
        console.log(`✅ ${scriptInfo.name} completed successfully\n`);
      } else {
        failedCount++;
        console.log(`❌ ${scriptInfo.name} failed with exit code ${code}\n`);
      }
      resolve(code);
    });

    child.on('error', (error) => {
      failedCount++;
      console.error(`❌ Error running ${scriptInfo.script}:`, error.message);
      resolve(1);
    });
  });
}

/**
 * Run all optimization scripts sequentially
 */
async function optimizeAllImages() {
  try {
    for (const scriptInfo of scripts) {
      await runScript(scriptInfo);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('═'.repeat(60));
    console.log('\n📊 Optimization Summary:');
    console.log(`   Completed: ${completedCount}/${scripts.length}`);
    console.log(`   Failed: ${failedCount}/${scripts.length}`);
    console.log(`   Duration: ${duration}s`);

    if (failedCount === 0) {
      console.log('\n✅ All image optimization tasks completed successfully!\n');
      console.log('🎯 Next steps:');
      console.log('   • Review optimized images in the public/ directory');
      console.log('   • Test in dev server: npm run dev');
      console.log('   • Build for production: npm run build\n');
      process.exit(0);
    } else {
      console.log(`\n⚠️  Some optimization tasks failed. Please review the errors above.\n`);
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Unexpected error during optimization:', error.message);
    process.exit(1);
  }
}

// Run the optimization
optimizeAllImages();
