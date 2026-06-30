const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const toggleBlock =
  /(<button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" tabindex="0">\s*<span class="hamburger"><\/span>\s*<\/button>\s*)(<ul class="nav-menu" id="navMenu">)/;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'scripts'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function relPrefix(relativeDir) {
  const depth = relativeDir ? relativeDir.split(/[\\/]/).filter(Boolean).length : 0;
  return depth ? '../'.repeat(depth) : '';
}

let updated = 0;

for (const file of walk(root)) {
  const relativeDir = path.relative(root, path.dirname(file));
  const prefix = relPrefix(relativeDir);
  const content = fs.readFileSync(file, 'utf8');

  if (content.includes('nav-mobile-brand')) continue;
  if (!toggleBlock.test(content)) continue;

  const homeHref = `${prefix}index.html`;
  const brandBlock =
    `<a href="${homeHref}" class="nav-mobile-brand" aria-label="Denver Interior & Doors Co. Home">\n` +
    `                <img src="${prefix}assets/logo.webp" alt="Denver Interior & Doors Co." class="nav-mobile-logo" width="250" height="172">\n` +
    `            </a>\n            `;

  const next = content.replace(toggleBlock, `$1${brandBlock}$2`);
  fs.writeFileSync(file, next);
  updated += 1;
}

console.log(`Added mobile nav logo to ${updated} pages.`);
