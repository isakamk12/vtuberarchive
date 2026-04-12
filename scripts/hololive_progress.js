#!/usr/bin/env node
/**
 * Hololive progress check:
 * - Counts member cards in Hololive/hololive_index.html
 * - Compares against Hololive/characters/**\/*.html
 * - Reports duplicates in index, missing pages, and extra pages
 */
const fs = require('fs');
const path = require('path');

function readUtf8(p) {
  return fs.readFileSync(p, 'utf8');
}

function walkHtmlFiles(rootDir) {
  const out = [];
  const stack = [rootDir];
  while (stack.length) {
    const dir = stack.pop();
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) stack.push(full);
      else if (ent.isFile() && full.toLowerCase().endsWith('.html')) out.push(full);
    }
  }
  return out;
}

function normalizeSlashes(p) {
  return p.replace(/\\/g, '/');
}

function parseMemberCards(html) {
  // We only care about hrefs; names/titles are optional diagnostics.
  const aRe = /<a\s+href="(characters\/[^"]+)"\s+class="member-card">([\s\S]*?)<\/a>/g;
  const nameRe = /class="m-name">([\s\S]*?)<\/span>/;
  const titleRe = /class="m-title">([\s\S]*?)<\/span>/;

  const rows = [];
  let m;
  while ((m = aRe.exec(html))) {
    const href = m[1];
    const inner = m[2];
    const nm = inner.match(nameRe);
    const tm = inner.match(titleRe);
    const name = nm ? nm[1].replace(/\s+/g, ' ').trim() : '';
    const title = tm ? tm[1].replace(/\s+/g, ' ').trim() : '';
    rows.push({ href, name, title });
  }
  return rows;
}

function countOccurrences(list) {
  const m = new Map();
  for (const x of list) m.set(x, (m.get(x) || 0) + 1);
  return m;
}

function main() {
  const indexPath = path.join('Hololive', 'hololive_index.html');
  const charactersRoot = path.join('Hololive', 'characters');

  if (!fs.existsSync(indexPath)) {
    console.error(`Missing: ${indexPath}`);
    process.exit(2);
  }
  if (!fs.existsSync(charactersRoot)) {
    console.error(`Missing: ${charactersRoot}`);
    process.exit(2);
  }

  const html = readUtf8(indexPath);
  const cards = parseMemberCards(html);
  const hrefs = cards.map((c) => c.href);
  const hrefCounts = countOccurrences(hrefs);
  const uniqueHrefs = [...new Set(hrefs)];
  const duplicateHrefs = uniqueHrefs
    .filter((h) => (hrefCounts.get(h) || 0) > 1)
    .sort()
    .map((h) => ({
      href: h,
      count: hrefCounts.get(h) || 0,
      label: (() => {
        const seen = new Set();
        const parts = [];
        for (const c of cards.filter((x) => x.href === h)) {
          const t = `${c.name}${c.title ? ` / ${c.title}` : ''}`.trim();
          if (t && !seen.has(t)) {
            seen.add(t);
            parts.push(t);
          }
        }
        return parts.join(' | ');
      })()
    }));

  const fsHtmlFiles = walkHtmlFiles(charactersRoot)
    .map((p) => normalizeSlashes(p))
    .filter((p) => p.toLowerCase().endsWith('.html'));

  // Convert filesystem paths to index-style hrefs: "characters/<dir>/<file>.html"
  const fsHrefs = fsHtmlFiles
    .map((p) => p.replace(/^Hololive\//, ''))
    .filter((p) => p.startsWith('characters/'));

  const fsHrefSet = new Set(fsHrefs);
  const indexHrefSet = new Set(uniqueHrefs);

  const missingInFs = [...indexHrefSet].filter((h) => !fsHrefSet.has(h)).sort();
  const extraNotInIndex = [...fsHrefSet].filter((h) => !indexHrefSet.has(h)).sort();

  const report = {
    index_cards: hrefs.length,
    index_unique: indexHrefSet.size,
    index_duplicate_count: duplicateHrefs.length,
    fs_pages: fsHrefSet.size,
    missing_in_fs: missingInFs,
    extra_not_in_index: extraNotInIndex,
    duplicates: duplicateHrefs
  };

  console.log(JSON.stringify(report, null, 2));

  // Non-zero exit if there is any mismatch that makes manual checking annoying.
  if (missingInFs.length || extraNotInIndex.length) process.exit(3);
}

main();

