import { readFile, mkdir } from 'node:fs/promises';

export async function readJson(p) {
  return JSON.parse(await readFile(p, 'utf8'));
}

export async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

export function pad2(n) {
  return String(n).padStart(2, '0');
}

export function log(step, msg) {
  console.log(`    ${step.padEnd(10)} ${msg}`);
}
