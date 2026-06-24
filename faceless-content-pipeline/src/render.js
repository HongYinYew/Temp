import { writeFile } from 'node:fs/promises';

// Phase 1 stub: emit the on-screen text the editor/renderer will burn in.
// Phase 3 replaces these with a Remotion render -> reel.mp4 / carousel PNGs.

export async function writeReelOverlays({ script, outPath }) {
  const lines = ['# ON-SCREEN OVERLAYS (timestamped)', ''];
  lines.push(`[0-2]   HOOK: ${script.hook}`);
  for (const b of script.beats ?? []) {
    if (!b.overlay) continue;
    if (b.overlay.trim() === script.hook.trim()) continue; // hook already shown at 0-2
    lines.push(`[${b.t}]   ${b.overlay}`);
  }
  if (script.cta?.overlay) lines.push(`[CTA]   ${script.cta.overlay}`);
  await writeFile(outPath, lines.join('\n') + '\n', 'utf8');
}

export async function writeCarouselSlides({ script, outPath }) {
  const lines = ['# CAROUSEL SLIDES', ''];
  for (const s of script.slides ?? []) {
    lines.push(`--- Slide ${s.n} ---`);
    lines.push(`TITLE: ${s.title}`);
    lines.push(`BODY:  ${s.body}`);
    lines.push('');
  }
  await writeFile(outPath, lines.join('\n'), 'utf8');
}
