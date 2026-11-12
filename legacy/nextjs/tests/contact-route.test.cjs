const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

// Execute the actual handler with isolated configuration and provider doubles.
// No network requests or email delivery are made by this test suite.
function handler({ configured = true, providerError = false, databaseError = false } = {}) {
  const sent = [];
  const output = ts.transpileModule(fs.readFileSync('app/api/contact/route.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const context = {
    exports: {}, Request, Response, Date, Map,
    console: { error() {} },
    process: { env: configured ? { RESEND_API_KEY: 'test-only' } : {} },
    require(name) {
      if (name === 'next/server') return { NextResponse: { json: (data, init) => Response.json(data, init) } };
      if (name === 'zod') return require('zod');
      if (name === '@/lib/prisma') return { getPrismaClient: () => {
        if (databaseError) throw new Error('database unavailable');
        return null;
      } };
      if (name === 'resend') return { Resend: class {
        emails = { send: async (message) => {
          sent.push(message);
          return providerError ? { error: { message: 'provider rejected request' } } : { data: { id: 'test-id' } };
        } };
      } };
      throw new Error(`Unexpected import: ${name}`);
    },
  };
  vm.runInNewContext(output, context);
  return { ...context.exports, sent };
}

const valid = {
  name: 'Test <Client>', email: 'client@example.com', phone: '+265999000000',
  subject: 'Test enquiry', legalService: 'Litigation',
  message: 'A test enquiry containing <script>markup</script> for safe rendering.',
  company: '', startedAt: Date.now() - 5000,
};
function request(body = valid, ip = '192.0.2.10') {
  return new Request('http://localhost/api/contact', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-forwarded-for': ip },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

test('availability is uncached and reports missing email configuration', async () => {
  const service = handler({ configured: false });
  const response = await service.GET();
  assert.equal(response.status, 503);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal((await response.json()).ok, false);
  assert.equal((await service.POST(request())).status, 503);
  assert.equal(service.sent.length, 0);
});

test('configured endpoint reports availability', async () => {
  const response = await handler().GET();
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
});

test('invalid JSON and invalid fields are rejected before delivery', async () => {
  const service = handler();
  assert.equal((await service.POST(request('{broken'))).status, 400);
  const response = await service.POST(request({ ...valid, email: 'invalid', message: 'short' }));
  assert.equal(response.status, 400);
  const data = await response.json();
  assert.ok(data.details.email);
  assert.ok(data.details.message);
  assert.equal(service.sent.length, 0);
});

test('success sends to both firm addresses, preserves reply-to and escapes HTML', async () => {
  const service = handler();
  const response = await service.POST(request());
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.deepEqual(Array.from(service.sent[0].to), ['info@clarkesattorneys.mw', 'geoffrey@clarkesattorneys.mw']);
  assert.equal(service.sent[0].replyTo, valid.email);
  assert.ok(service.sent[0].html.includes('&lt;script&gt;'));
  assert.ok(!service.sent[0].html.includes('<script>'));
});

test('provider rejection does not return a false success', async () => {
  const response = await handler({ providerError: true }).POST(request());
  assert.equal(response.status, 502);
  assert.equal((await response.json()).ok, false);
});

test('optional database initialization failure does not prevent email', async () => {
  const service = handler({ databaseError: true });
  const response = await service.POST(request());
  assert.equal(response.status, 200);
  assert.equal(service.sent.length, 1);
  assert.equal((await response.json()).savedToDb, false);
});

test('honeypot and implausibly fast submissions are rejected', async () => {
  const service = handler();
  assert.equal((await service.POST(request({ ...valid, company: 'bot' }))).status, 400);
  assert.equal((await service.POST(request({ ...valid, startedAt: Date.now() }))).status, 400);
  assert.equal(service.sent.length, 0);
});

test('sixth valid submission from the same IP is rate limited', async () => {
  const service = handler();
  for (let count = 0; count < 5; count++) assert.equal((await service.POST(request())).status, 200);
  assert.equal((await service.POST(request())).status, 429);
  assert.equal(service.sent.length, 5);
});
