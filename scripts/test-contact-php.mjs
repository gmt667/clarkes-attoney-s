import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';
import { createServer } from 'node:net';
import { resolve } from 'node:path';

execFileSync('php', ['server/php/tests/contact-test.php'], { stdio: 'inherit' });
const reservation = createServer();
await new Promise(done => reservation.listen(0, '127.0.0.1', done));
const port = reservation.address().port;
await new Promise(done => reservation.close(done));
const server = spawn('php', ['-S', `127.0.0.1:${port}`, '-t', resolve('server/php/public_html'), resolve('server/php/tests/router.php')], { stdio: 'ignore', windowsHide: true });
let startupError;
server.on('error', error => { startupError = error; });
const origin = `http://127.0.0.1:${port}`;
try {
  let response;
  const deadline = Date.now() + 8000;
  while (!response && Date.now() < deadline) {
    if (startupError) throw startupError;
    try { response = await fetch(origin + '/api/contact'); } catch { await new Promise(done => setTimeout(done, 50)); }
  }
  assert.ok(response, 'PHP server started');
  assert.equal(response.status, 503);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal((await response.json()).ok, false);
  const invalid = await fetch(origin + '/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
  assert.equal(invalid.status, 400);
  assert.ok((await invalid.json()).details.email);
  const unsupported = await fetch(origin + '/api/contact', { method: 'DELETE' });
  assert.equal(unsupported.status, 405);
  assert.equal((await unsupported.json()).ok, false);
  const wrongType = await fetch(origin + '/api/contact', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: '{}' });
  assert.equal(wrongType.status, 415);
  assert.equal((await wrongType.json()).ok, false);
  assert.equal((await fetch(origin + '/api/contact.php')).status, 503);
  console.log('PASS: PHP HTTP endpoint, JSON errors, health configuration, method handling and direct .php path.');
} finally { server.kill(); }
