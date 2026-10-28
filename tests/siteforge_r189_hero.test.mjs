import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import assert from "node:assert/strict";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const original = readFileSync(join(root, "index.html"), "utf8");
const candidate = readFileSync(join(root, "r189-hero-candidate.html"), "utf8");
const hash = (x) => createHash("sha256").update(x, "utf8").digest("hex");
const originalSourcePin = "dd5244eee8945b1f7d2180d114586c5c61eb0fde904419a1cb8a575ba56532b6";
const scripts = (html) => [...html.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/g)].map((x) => x[0]);
function invariant(html) {
  assert.match(html, /<body class="r189-composition">/);
  assert.equal((html.match(/class="core-r109-canvas"/g) || []).length, 1);
  assert.equal((html.match(/class="r189-system-map"/g) || []).length, 1);
  assert.deepEqual(scripts(html), scripts(original), "WebGL scripts must not be rewritten");
  assert.match(html, /@media\(max-width:680px\)/);
  assert.match(html, /@media\(prefers-reduced-motion:reduce\)/);
  assert.doesNotMatch(html, /\.r189-geometry::before\{[^}]*border-radius:50%/s);
  assert.doesNotMatch(html, /\.r189-geometry::after\{[^}]*border-radius:50%/s);
}
test("R189: source pin remains exact and original index is untouched", () => {
  assert.equal(hash(original), originalSourcePin);
  assert.equal(original.includes("r189-composition"), false);
});
test("R189: the candidate is additive, one canvas, unchanged engine/CSP", () => {
  invariant(candidate);
  const csp = (html) => html.match(/<meta http-equiv="Content-Security-Policy"[^>]*>/)?.[0];
  assert.equal(csp(candidate), csp(original));
});
test("R189: original navigation, three products, focus and mobile reflow remain", () => {
  for (const slug of ["./siteforge/", "./connect/", "./bridge/"]) assert.ok(candidate.includes('href="' + slug + '"'));
  assert.match(candidate, /class="r189-system-map" aria-hidden="true"/);
  assert.match(candidate, /class="core-r108-links"/);
  assert.match(candidate, /:focus-visible/);
  assert.match(candidate, /@media\(max-width:1040px\)/);
});
test("R189 failure-first: candidate missing engine is rejected", () => {
  assert.throws(() => invariant(candidate.replace('<canvas class="core-r109-canvas"', '<canvas class="broken"')));
});
test("R189 failure-first: duplicated HUD and mutated engine are rejected", () => {
  assert.throws(() => invariant(candidate.replace('class="r189-system-map"', 'class="r189-system-map" class="r189-system-map"')));
  assert.throws(() => invariant(candidate.replace(/<script\b/, '<script type="module"')));
});
