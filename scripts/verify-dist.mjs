import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { resolve, extname, join, relative } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve('dist');
async function walk(path) { const entries = await readdir(path, { withFileTypes: true }); return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(join(path, entry.name)) : join(path, entry.name)))).flat(); }
const files = await walk(root);
const index = await readFile(join(root, 'index.html'), 'utf8');
const htaccess = await readFile(join(root, '.htaccess'), 'utf8');
assert.ok(htaccess.includes('RewriteRule ^ index.html [L]'));
assert.ok(htaccess.includes('RewriteRule ^api(?:/|$) - [L]'));
assert.ok(!index.includes('/src/main.tsx'));
const inventory = JSON.parse(await readFile('docs/nextjs-inventory.json', 'utf8'));
const designBaseline = JSON.parse(await readFile('docs/design-baseline-assets.json', 'utf8'));
for (const [path, hash] of Object.entries(designBaseline.assets)) {
  const asset = await readFile(join(root, path.slice(7)));
  assert.equal(createHash('sha256').update(asset).digest('hex'), hash, `Restored design asset changed: ${path}`);
}
for (const [path, hash] of Object.entries(inventory.files)) {
  const archived = await readFile(join('legacy/nextjs', path));
  assert.equal(createHash('sha256').update(archived).digest('hex'), hash, `Archive changed: ${path}`);
  if (path.startsWith('public/')) {
    const asset = await readFile(join(root, path.slice(7)));
    assert.equal(createHash('sha256').update(asset).digest('hex'), designBaseline.assets[path] ?? hash, `Asset changed: ${path}`);
  }
}
for (const file of files.filter(file => /\.(js|css)$/.test(file))) {
  const source = await readFile(file, 'utf8');
  assert.ok(!/RESEND_API_KEY|DATABASE_URL|SANITY_READ_TOKEN|NEXT_PUBLIC_|\/_next\//.test(source), `Server dependency leaked: ${file}`);
  if (file.endsWith('.css')) {
    for (const [, asset] of source.matchAll(/url\(["']?(\/[^)"']+)["']?\)/g)) assert.ok((await stat(join(root, asset))).isFile(), asset);
  }
}
const mime = { '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.html': 'text/html' };
// Local test harness mirrors the fallback rules. No Node server is deployed.
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = resolve(root, '.' + pathname);
    if (!file.startsWith(root + '\\') && !file.startsWith(root + '/') && file !== root) { response.writeHead(403).end(); return; }
    const info = await stat(file).catch(() => null);
    if (!info?.isFile()) {
      if (pathname.startsWith('/api/') || extname(pathname)) { response.writeHead(404).end(); return; }
      file = join(root, 'index.html');
    }
    response.writeHead(200, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream' });
    response.end(await readFile(file));
  } catch { response.writeHead(500).end(); }
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
const address = server.address();
const origin = `http://127.0.0.1:${address.port}`;
try {
  const pages = ['/', '/about', '/practice-areas', '/our-team', '/experience', '/gallery', '/blog', '/blog/how-to-choose-the-right-legal-structure', '/blog/why-documentation-wins-disputes', '/blog/protecting-brand-identity', '/contact', '/contact/', '/team', '/unknown'];
  for (const path of pages) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 200, path);
    assert.equal(await response.text(), index, `SPA entry mismatch: ${path}`);
  }
  for (const file of files.filter(file => file !== join(root, '.htaccess'))) {
    const path = '/' + relative(root, file).replaceAll('\\', '/');
    assert.equal((await fetch(origin + path)).status, 200, path);
  }
  assert.equal((await fetch(origin + '/assets/missing.js')).status, 404);
  assert.equal((await fetch(origin + '/api/contact')).status, 404);
  console.log(`PASS: ${pages.length} direct URL requests, ${files.length} build files, original assets and archive hashes, no server secrets, missing assets/API never rewritten to HTML.`);
} finally { server.closeAllConnections(); await new Promise(done => server.close(done)); }
