import { writeFile } from 'node:fs/promises';

export function collectBrollTerms(script) {
  const terms = [];
  for (const b of script.beats ?? []) for (const t of b.broll ?? []) terms.push(t);
  return terms;
}

// Phase 1: emit a shot list keyed to each beat.
// Phase 2: when PEXELS_API_KEY is set, this is where auto-download lands.
export async function planBroll({ script, outPath, mock }) {
  const terms = collectBrollTerms(script);
  const hasKey = !!process.env.PEXELS_API_KEY;
  const header = (!mock && hasKey)
    ? '# B-ROLL — Pexels key detected. Phase 2 auto-fetch will save clips here.\n\n'
    : '# B-ROLL SHOT LIST — search these on Pexels/Mixkit (Phase 2 auto-fetches them).\n\n';
  const body = terms.map((t, i) => `${i + 1}. ${t}`).join('\n');
  await writeFile(outPath, header + body + '\n', 'utf8');
  return { terms };
}
