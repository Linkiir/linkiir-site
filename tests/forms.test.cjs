const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../assets/forms.js'), 'utf8');
const flush = () => new Promise(resolve => setImmediate(resolve));

function setup(sandbox = false, url = 'https://linkiir.com/contact/') {
  const events = [];
  const requests = [];
  const button = { innerHTML: 'Submit', disabled: false };
  const status = { hidden: true };
  let submit;
  const form = {
    action: 'https://api.web3forms.com/submit', valid: true, resets: 0,
    checkValidity() { return this.valid; },
    querySelector(selector) { return selector === '[data-form-status]' ? status : button; },
    hasAttribute() { return sandbox; },
    reset() { this.resets++; },
    addEventListener(name, listener) { assert.equal(name, 'submit'); submit = listener; }
  };
  vm.runInNewContext(source, {
    document: { querySelectorAll: () => [form] },
    window: { gtag: (...args) => events.push(args), location: new URL(url) },
    location: new URL(url),
    FormData: class {},
    fetch: () => new Promise((resolve, reject) => requests.push({ resolve, reject }))
  });
  return { form, button, status, events, requests, submit: () => submit({ preventDefault() {} }) };
}
const response = (ok, success) => ({ ok, json: async () => ({ success }) });

for (const sandbox of [false, true]) {
  test(`${sandbox ? 'Sandbox' : 'Contact'} tracks confirmed success once and permits later submissions`, async () => {
    const h = setup(sandbox);
    assert.equal(h.events.length, 0);
    h.submit(); h.submit();
    assert.equal(h.requests.length, 1);
    assert.equal(h.events.length, 0);
    h.requests[0].resolve(response(true, true));
    await flush();
    assert.equal(h.events.length, 1);
    const [name, type, payload] = h.events[0];
    assert.equal(name, 'event'); assert.equal(type, 'conversion');
    assert.equal(payload.send_to, 'AW-18360438570/2asFCUit--McEKqe-LJE');
    assert.equal(payload.value, 1.0); assert.equal(payload.currency, 'CAD');
    assert.equal(h.button.disabled, false);
    assert.equal(h.form.resets, 1);
    h.submit();
    h.requests[1].resolve(response(true, true));
    await flush();
    assert.equal(h.events.length, 2);
  });
}

for (const [name, result] of [
  ['HTTP failure', response(false, true)],
  ['API rejection', response(true, false)],
  ['missing success', response(true, undefined)],
  ['non-boolean success', response(true, 'true')],
  ['invalid JSON', { ok: true, json: async () => { throw Error('invalid JSON'); } }],
  ['network failure', null]
]) {
  test(`${name} sends no conversion and permits retry`, async () => {
    const h = setup(); h.submit();
    if (result) h.requests[0].resolve(result);
    else h.requests[0].reject(Error('network'));
    await flush();
    assert.equal(h.events.length, 0);
    assert.equal(h.form.resets, 0);
    assert.equal(h.button.disabled, false);
    h.submit(); assert.equal(h.requests.length, 2);
    h.requests[1].resolve(response(true, true));
    await flush(); assert.equal(h.events.length, 1);
  });
}

test('invalid form sends neither a request nor a conversion', () => {
  const h = setup(); h.form.valid = false; h.submit();
  assert.equal(h.requests.length, 0); assert.equal(h.events.length, 0);
});

function pageSource(route) {
  return fs.readFileSync(require('node:path').join(__dirname, '..', route, 'index.html'), 'utf8');
}

for (const route of ['contact', 'sandbox', 'hl7-fhir-integration', 'healthcare-integration-engine']) {
  test(`${route} loads the base tag and shared form handler once`, () => {
    const html = pageSource(route);
    assert.equal((html.match(/src="https:\/\/www.googletagmanager.com\/gtag\/js\?id=AW-18360438570"/g) || []).length, 1);
    assert.equal((html.match(/gtag\('config', 'AW-18360438570'\)/g) || []).length, 1);
    assert.equal((html.match(/<script defer src="\.\.\/assets\/forms.js"><\/script>/g) || []).length, 1);
    if (route === 'contact' || route === 'sandbox') {
      assert.match(html, /<form data-web3form[^>]*action="https:\/\/api.web3forms.com\/submit"/);
    }
  });
}

for (const landing of ['hl7-fhir-integration', 'healthcare-integration-engine']) {
  for (const destination of ['contact', 'sandbox']) {
    test(`${landing} campaign link to ${destination} tracks confirmed submissions`, async () => {
      const html = pageSource(landing);
      const links = [...html.matchAll(/href="([^"]+)"/g)].map(match => new URL(match[1], `https://linkiir.com/${landing}/`));
      const url = links.find(link => link.pathname === `/${destination}/` && link.searchParams.get('campaign') === `google_${landing.replaceAll('-', '_')}`);
      assert.ok(url, 'Campaign CTA must reach a tracked form');
      const h = setup(destination === 'sandbox', url.href);
      h.submit(); h.submit();
      assert.equal(h.requests.length, 1);
      assert.equal(h.events.length, 0);
      h.requests[0].resolve(response(true, true));
      await flush();
      assert.equal(h.events.length, 1);
      assert.equal(h.events[0][2].send_to, 'AW-18360438570/2asFCUit--McEKqe-LJE');
    });
  }
}
