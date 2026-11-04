import assert from "node:assert/strict";
import test from "node:test";

test("renders The Current Apartments homepage", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<title>The Current Apartments \| East Peoria, IL<\/title>/i);
  assert.match(html, /Join the Interest List/i); // leasing form submit button stays
  assert.match(html, /500 Centennial Drive/i);
});

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const ctx = { waitUntil() {}, passThroughOnException() {} };
  return (request) => worker.fetch(request, env, ctx);
}

function postQuestion(body, headers = {}) {
  return new Request("http://localhost/api/questions", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

const validQuestion = {
  firstName: "Pat", lastName: "Lee", email: "pat@example.com", phone: "",
  question: "Are cats allowed?", consent: "yes",
};

test("homepage renders the Ask Katie form", async () => {
  const fetch = await loadWorker();
  const html = await (await fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }))).text();
  assert.match(html, /id="ask-katie"/);
  assert.match(html, />Submit</);
  assert.match(html, /I agree to be contacted by a leasing agent at The Current Apartments/);
  assert.doesNotMatch(html, /Not ready to apply or tour/);
  assert.match(html, /name="question"/);
});

test("Ask Katie rejects missing last name, bad email, short phone and empty question", async () => {
  const fetch = await loadWorker();
  for (const patch of [{ lastName: "" }, { email: "nope" }, { phone: "123" }, { question: "" }]) {
    const response = await fetch(postQuestion({ ...validQuestion, ...patch }));
    assert.equal(response.status, 400, JSON.stringify(patch));
    assert.ok((await response.json()).error);
  }
});

test("Ask Katie quietly accepts honeypot submissions", async () => {
  const fetch = await loadWorker();
  const response = await fetch(postQuestion({ ...validQuestion, website: "spam.example" }));
  assert.equal(response.status, 201);
});

test("Ask Katie allows CORS only from The Current's domains", async () => {
  const fetch = await loadWorker();
  const allowed = await fetch(new Request("http://localhost/api/questions", { method: "OPTIONS", headers: { origin: "https://thecurrent500.com" } }));
  assert.equal(allowed.headers.get("access-control-allow-origin"), "https://thecurrent500.com");
  const blocked = await fetch(new Request("http://localhost/api/questions", { method: "OPTIONS", headers: { origin: "https://evil.example" } }));
  assert.equal(blocked.headers.get("access-control-allow-origin"), null);
});
