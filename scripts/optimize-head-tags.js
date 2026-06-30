const fs = require('fs');
const path = require('path');

const root = __dirname.replace(/[\\/]scripts$/, '');
const fontUrl =
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap';

function relPrefix(relativeDir) {
  const depth = relativeDir ? relativeDir.split(/[\\/]/).filter(Boolean).length : 0;
  return depth ? '../'.repeat(depth) : '';
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'scripts') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function optimizeHead(content, prefix) {
  let next = content;

  next = next.replace(
    /<!-- Google tag \(gtag\.js\) -->[\s\S]*?gtag\('config', 'G-EN085Q6YPQ'\);\s*<\/script>\s*/g,
    `<script src="${prefix}analytics.js" defer></script>\n    `
  );

  next = next.replace(
    /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\s*<link[\s\S]*?rel="stylesheet">\s*/g,
    `<link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link rel="preload" as="style" href="${fontUrl}">\n    <link href="${fontUrl}" rel="stylesheet" media="print" onload="this.media='all'">\n    <noscript><link href="${fontUrl}" rel="stylesheet"></noscript>\n    `
  );

  return next;
}

function optimizeServiceCards(content, htmlDir) {
  return content.replace(
    /(<div class="service-card"\s+)style="background-image: url\('([^']+)'\);"/g,
    function (match, prefix, imageUrl) {
      const absoluteImage = path.resolve(htmlDir, imageUrl);
      const webpImage = absoluteImage.replace(/\.jpe?g$/i, '.webp');
      const relativeWebp = path.relative(htmlDir, webpImage).split(path.sep).join('/');

      if (/\.jpe?g$/i.test(imageUrl) && fs.existsSync(webpImage)) {
        return `${prefix}data-bg="${imageUrl}" data-bg-webp="${relativeWebp}"`;
      }

      return `${prefix}data-bg="${imageUrl}"`;
    }
  );
}

const htmlFiles = walk(root);
let updated = 0;

for (const file of htmlFiles) {
  const relativeDir = path.relative(root, path.dirname(file));
  const prefix = relPrefix(relativeDir);
  const original = fs.readFileSync(file, 'utf8');
  let content = optimizeHead(original, prefix);
  content = optimizeServiceCards(content, path.dirname(file));

  if (content !== original) {
    fs.writeFileSync(file, content);
    updated += 1;
  }
}

console.log(`Updated ${updated} HTML files.`);
