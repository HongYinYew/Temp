#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFile } from 'node:fs/promises';
import { readJson, ensureDir, pad2, log } from './lib.js';
import { buildNarration, generateVoiceover } from './voiceover.js';
import { planBroll } from './broll.js';
import { writeReelOverlays, writeCarouselSlides } from './render.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const args = { week: null, mock: false, out: path.join(ROOT, 'output') };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--week') args.week = argv[++i];
    else if (a === '--mock') args.mock = true;
    else if (a === '--out') args.out = argv[++i];
  }
  return args;
}

async function loadScript(scriptId) {
  try {
    return await readJson(path.join(ROOT, 'content', 'scripts', `${scriptId}.json`));
  } catch {
    return null;
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const mock = args.mock || !process.env.ELEVENLABS_API_KEY;

  const brand = await readJson(path.join(ROOT, 'content', 'brand.json'));
  const calendar = await readJson(path.join(ROOT, 'content', 'calendar.json'));

  const week = args.week ?? Object.keys(calendar.weeks)[0];
  const posts = calendar.weeks[week];
  if (!posts) {
    console.error(`✖ No week "${week}" found in content/calendar.json`);
    process.exit(1);
  }

  console.log(`\n🗓️  Week ${week} — ${posts.length} posts   [${mock ? 'MOCK · no API calls' : 'LIVE'}]\n`);

  const weekDir = path.join(args.out, `week-${pad2(Number(week))}`);
  await ensureDir(weekDir);

  const manifest = [];
  for (const post of posts) {
    const folder = `${post.day}-${post.format}-${post.scriptId}`;
    const postDir = path.join(weekDir, folder);
    await ensureDir(postDir);

    console.log(`▶ Day ${post.day} — ${post.format.toUpperCase()} — ${post.scriptId}`);

    const script = await loadScript(post.scriptId);
    if (!script) {
      console.log(`    ⚠ missing content/scripts/${post.scriptId}.json — flagged for authoring\n`);
      await writeFile(path.join(postDir, 'TODO-author-script.txt'),
        `Author a script and save it as content/scripts/${post.scriptId}.json\n`);
      manifest.push({ ...post, status: 'needs-script', folder });
      continue;
    }

    // 1. paste-ready caption + hashtags
    const tags = (script.hashtags?.length ? script.hashtags : brand.defaultHashtags).join(' ');
    await writeFile(path.join(postDir, 'caption.txt'), `${script.caption}\n\n${tags}\n`, 'utf8');
    log('caption', 'caption.txt');

    // 2. archived script copy
    await writeFile(path.join(postDir, 'script.json'), JSON.stringify(script, null, 2), 'utf8');

    if (post.format === 'reel') {
      await writeReelOverlays({ script, outPath: path.join(postDir, 'overlays.txt') });
      log('overlays', 'overlays.txt');

      const narration = buildNarration(script);
      const vo = await generateVoiceover({
        narration, outPath: path.join(postDir, 'voiceover.mp3'), brand, mock
      });
      log('voiceover', `${path.basename(vo.file)}  (${vo.chars} chars · ${vo.mode})`);

      const { terms } = await planBroll({ script, outPath: path.join(postDir, 'broll.txt'), mock });
      log('broll', `broll.txt  (${terms.length} shots)`);
    } else if (post.format === 'carousel') {
      await writeCarouselSlides({ script, outPath: path.join(postDir, 'slides.txt') });
      log('slides', `slides.txt  (${script.slides?.length ?? 0} slides)`);
    }

    console.log('');
    manifest.push({ ...post, status: 'ready', hook: script.hook, folder });
  }

  await writeFile(path.join(weekDir, 'manifest.json'),
    JSON.stringify({ week, mock, generatedAt: new Date().toISOString(), posts: manifest }, null, 2));
  await writeFile(path.join(weekDir, 'INDEX.md'), buildIndex(week, manifest, mock));

  const ready = manifest.filter(m => m.status === 'ready').length;
  console.log(`✅ ${ready}/${posts.length} posts packaged → ${path.relative(ROOT, weekDir)}`);
  console.log(`   Next: drop in screen-recordings, then schedule from each caption.txt in Meta Business Suite.\n`);
}

function buildIndex(week, manifest, mock) {
  const rows = manifest
    .map(m => `| ${m.day} | ${m.format} | ${m.status} | ${(m.hook ?? '').replace(/\|/g, '')} |`)
    .join('\n');
  return [
    `# Week ${week} — content pack ${mock ? '_(mock run — no audio synthesised)_' : ''}`,
    '',
    '| Day | Format | Status | Hook |',
    '|---|---|---|---|',
    rows,
    '',
    '## Your steps',
    '1. Record any app/screen demos and drop them into the matching post folder.',
    '2. _(Phase 3)_ Run the renderer to turn each folder into `reel.mp4` / carousel PNGs.',
    '3. Open each `caption.txt`, then upload + schedule the asset in **Meta Business Suite**.',
    ''
  ].join('\n');
}

main().catch(err => {
  console.error('✖ Pipeline failed:', err);
  process.exit(1);
});
