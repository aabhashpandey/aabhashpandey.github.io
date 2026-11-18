#!/usr/bin/env node
/*
 * Swaps the Pendo API key placeholder in the built index.html for the real key.
 *
 * The key is intentionally NOT stored in this repo (master keeps the placeholder
 * `YOUR-PENDO-API-KEY-HERE` in public/index.html). Run this after `react-scripts build`
 * and before publishing the build to gh-pages. It runs automatically as part of
 * the `predeploy` npm script.
 *
 * Usage:
 *   PENDO_API_KEY=<your-key> node scripts/patch-pendo-key.js [path/to/index.html]
 *
 * The path defaults to build/index.html.
 */
const fs = require('fs');
const path = require('path');

const PLACEHOLDER = 'YOUR-PENDO-API-KEY-HERE';
const file = path.resolve(process.argv[2] || 'build/index.html');
const key = (process.env.PENDO_API_KEY || '').trim();

function fail(message) {
  console.error(`patch-pendo-key: ${message}`);
  process.exit(1);
}

if (!key) {
  fail(
    'PENDO_API_KEY is not set. Run it like: PENDO_API_KEY=<your-key> yarn deploy'
  );
}

// The key ends up inside an inline <script> string, so only allow plain key characters
if (!/^[A-Za-z0-9_-]+$/.test(key)) {
  fail('PENDO_API_KEY contains unexpected characters.');
}

if (!fs.existsSync(file)) {
  fail(`${file} not found. Run the build first.`);
}

const html = fs.readFileSync(file, 'utf8');

if (!html.includes(PLACEHOLDER)) {
  fail(
    `placeholder "${PLACEHOLDER}" not found in ${file} (already patched, or the snippet in public/index.html changed).`
  );
}

const patched = html.split(PLACEHOLDER).join(key);

if (patched.includes(PLACEHOLDER) || !patched.includes(key)) {
  fail('replacement did not apply cleanly; not writing the file.');
}

fs.writeFileSync(file, patched);

// Deliberately does not print the key
console.log(`patch-pendo-key: patched ${file}`);
