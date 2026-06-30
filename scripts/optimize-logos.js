const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'scripts'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

let updated = 0;

for (const file of walk(root)) {
  const original = fs.readFileSync(file, 'utf8');
  const next = original.replace(
    /src="([^"]*logo)\.png"/g,
    'src="$1.webp" width="250" height="172"'
  );

  if (next !== original) {
    fs.writeFileSync(file, next);
    updated += 1;
  }
}

console.log(`Updated logo references in ${updated} files.`);
