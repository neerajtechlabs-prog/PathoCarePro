#!/usr/bin/env node

/**
 * Screenshot Analysis Tool
 * Recursively analyzes a screenshot folder, generates a tree structure,
 * and produces a Markdown report with AI-powered feature descriptions.
 * 
 * Usage: node tools/analyzeScreenshots.js [path-to-screenshot-folder]
 * Or: npm run analyze:screenshots
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SCREENSHOT_FOLDER = process.argv[2] || 'c:\\Users\\PC\\Desktop\\Advik\\ScreenshotFromSoft';
const OUTPUT_FILE = path.join(path.dirname(__dirname), 'analysis-report.md');
const CACHE_FILE = path.join(__dirname, '.analysis-cache.json');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Utility functions
function sanitizePath(filePath) {
  return filePath.replace(/\\/g, '/');
}

async function loadCache() {
  try {
    if (await fs.pathExists(CACHE_FILE)) {
      return await fs.readJSON(CACHE_FILE);
    }
  } catch (error) {
    console.warn('⚠️  Could not load cache:', error.message);
  }
  return {};
}

async function saveCache(cache) {
  try {
    await fs.writeJSON(CACHE_FILE, cache, { spaces: 2 });
  } catch (error) {
    console.warn('⚠️  Could not save cache:', error.message);
  }
}

async function generateImageDescription(imagePath, cache) {
  const cacheKey = sanitizePath(imagePath);
  
  // Return cached description if available
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    console.log(`📸 Analyzing: ${path.basename(imagePath)}`);
    
    // Read image file as base64
    const imageBuffer = await fs.readFile(imagePath);
    const base64Image = imageBuffer.toString('base64');
    
    // Call Gemini vision API
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const response = await model.generateContent([
      {
        inlineData: {
          mimeType: 'image/png',
          data: base64Image,
        },
      },
      {
        text: 'This is a screenshot from a diagnostic center management software. Briefly describe the main UI elements, features, and purpose visible in this screenshot in 2-3 lines. Be specific about what the user can do on this screen.'
      }
    ]);

    const description = response.response.text();
    cache[cacheKey] = description;
    return description;
  } catch (error) {
    console.error(`❌ Error analyzing ${path.basename(imagePath)}:`, error.message);
    const fallbackDescription = 'Unable to analyze image. Manual review required.';
    cache[cacheKey] = fallbackDescription;
    return fallbackDescription;
  }
}

async function scanDirectory(dir) {
  const result = {
    folders: {},
    files: [],
    totalFiles: 0
  };

  try {
    const items = await fs.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        result.folders[item.name] = await scanDirectory(fullPath);
      } else if (item.isFile() && item.name.toLowerCase().endsWith('.png')) {
        result.files.push({
          name: item.name,
          path: fullPath,
          size: (await fs.stat(fullPath)).size
        });
        result.totalFiles++;
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }

  return result;
}

function generateAsciiTree(structure, prefix = '', isLast = true, folderName = '') {
  let output = '';
  
  if (folderName) {
    const connector = isLast ? '└── ' : '├── ';
    output += prefix + connector + folderName + '/\n';
    prefix += isLast ? '    ' : '│   ';
  }

  // Add files
  const files = structure.files || [];
  files.forEach((file, index) => {
    const isLastFile = index === files.length - 1 && Object.keys(structure.folders || {}).length === 0;
    const connector = isLastFile ? '└── ' : '├── ';
    output += prefix + connector + `📄 ${file.name}\n`;
  });

  // Add folders
  const folders = Object.keys(structure.folders || {}).sort();
  folders.forEach((folderKey, index) => {
    const isLastFolder = index === folders.length - 1;
    output += generateAsciiTree(structure.folders[folderKey], prefix, isLastFolder, folderKey);
  });

  return output;
}

async function collectAllImages(structure, basePath = '') {
  let images = [];

  // Collect files in current level
  structure.files?.forEach(file => {
    images.push({
      path: file.path,
      name: file.name,
      folder: basePath || 'root'
    });
  });

  // Recursively collect from subdirectories
  for (const [folderName, subStructure] of Object.entries(structure.folders || {})) {
    const subImages = await collectAllImages(subStructure, basePath ? `${basePath}/${folderName}` : folderName);
    images = images.concat(subImages);
  }

  return images;
}

function groupImagesByFolder(images) {
  const grouped = {};
  images.forEach(img => {
    if (!grouped[img.folder]) {
      grouped[img.folder] = [];
    }
    grouped[img.folder].push(img);
  });
  return grouped;
}

async function generateMarkdownReport(structure, imageDescriptions) {
  const timestamp = new Date().toLocaleString();
  const statistics = {
    totalFolders: Object.keys(structure.folders).length,
    totalFiles: structure.totalFiles
  };

  let markdown = `# Diagnostic Software Screenshot Analysis Report

**Generated:** ${timestamp}

## 📊 Summary

| Metric | Value |
|--------|-------|
| **Total Screenshots** | ${statistics.totalFiles} |
| **Total Folders** | ${statistics.totalFolders} |
| **Analysis Method** | AI Vision + Manual Review Hybrid |

---

## 📁 Directory Structure

\`\`\`
ScreenshotFromSoft/
${generateAsciiTree(structure)}\`\`\`

---

## 📋 Detailed Folder Analysis

`;

  // Collect and group all images
  const allImages = await collectAllImages(structure);
  const groupedImages = groupImagesByFolder(allImages);

  // Sort folders for consistent output
  const sortedFolders = Object.keys(groupedImages).sort();

  for (const folderName of sortedFolders) {
    const images = groupedImages[folderName];
    markdown += `### ${folderName}\n\n`;
    markdown += `**Files in this folder:** ${images.length}\n\n`;
    markdown += `| # | Screenshot | Features |\n`;
    markdown += `|---|-----------|----------|\n`;

    images.forEach((img, index) => {
      const description = imageDescriptions[img.path] || 'Analysis pending...';
      const displayName = img.name;
      markdown += `| ${index + 1} | \`${displayName}\` | ${description} |\n`;
    });

    markdown += '\n---\n\n';
  }

  markdown += `## 🔍 How to Use This Report

1. **Review Descriptions**: Each screenshot has an AI-generated feature description in the Features column
2. **Verify Accuracy**: Check if the descriptions match what you see in the images
3. **Refine as Needed**: Edit this markdown file to add details or corrections
4. **Use for Documentation**: Reference this report when building the cloud version

## ⚙️ Architecture Reference

Based on these screenshots, the diagnostic software includes:
- **Master Options Menu**: Configuration and setup screens
- **Top Menu**: Main navigation bar with various modules
- **Billing Module**: Doctor billing and financial transactions
- **Radiology Module**: Radiology-specific features
- **MIS Module**: Management Information System
- **Account Management**: User accounts and permissions
- **Transaction Processing**: Financial and operational transactions

---

*Report generated automatically by analyzeScreenshots.js*`;

  return markdown;
}

async function main() {
  console.log('🚀 Starting Screenshot Analysis Tool...\n');
  
  // Check if screenshot folder exists
  if (!await fs.pathExists(SCREENSHOT_FOLDER)) {
    console.error(`❌ Screenshot folder not found: ${SCREENSHOT_FOLDER}`);
    console.log(`\nUsage: npm run analyze:screenshots [path-to-screenshots]`);
    process.exit(1);
  }

  console.log(`📂 Analyzing folder: ${SCREENSHOT_FOLDER}\n`);

  try {
    // Step 1: Scan directory structure
    console.log('📂 Scanning directory structure...');
    const structure = await scanDirectory(SCREENSHOT_FOLDER);
    console.log(`✅ Found ${structure.totalFiles} PNG files in ${Object.keys(structure.folders).length} folders\n`);

    // Step 2: Load cache
    console.log('💾 Loading cache...');
    const cache = await loadCache();
    const cachedCount = Object.keys(cache).length;
    console.log(`✅ Cache contains ${cachedCount} previous analyses\n`);

    // Step 3: Analyze images
    console.log('🔍 Analyzing images with AI Vision...\n');
    const allImages = await collectAllImages(structure);
    const imageDescriptions = {};

    for (const img of allImages) {
      imageDescriptions[img.path] = await generateImageDescription(img.path, cache);
    }

    // Step 4: Save cache
    await saveCache(cache);

    // Step 5: Generate markdown report
    console.log('\n📝 Generating markdown report...');
    const markdownReport = await generateMarkdownReport(structure, imageDescriptions);

    // Step 6: Write report
    await fs.writeFile(OUTPUT_FILE, markdownReport, 'utf-8');
    console.log(`✅ Report saved to: ${OUTPUT_FILE}\n`);

    // Summary
    console.log('═══════════════════════════════════════════');
    console.log('✨ Analysis Complete!');
    console.log('═══════════════════════════════════════════\n');
    console.log(`📊 Analysis Summary:`);
    console.log(`   - Screenshots analyzed: ${allImages.length}`);
    console.log(`   - Folders processed: ${Object.keys(structure.folders).length}`);
    console.log(`   - Output file: ${OUTPUT_FILE}`);
    console.log(`\n📖 Next steps:`);
    console.log(`   1. Open ${OUTPUT_FILE}`);
    console.log(`   2. Review the AI-generated feature descriptions`);
    console.log(`   3. Refine or add details as needed`);
    console.log(`   4. Use this documentation for cloud migration planning`);

  } catch (error) {
    console.error('❌ Error during analysis:', error.message);
    process.exit(1);
  }
}

// Run the tool
main();
