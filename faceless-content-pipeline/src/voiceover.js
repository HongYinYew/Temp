import { writeFile } from 'node:fs/promises';

// Stitch the spoken narration from a reel script: hook + each beat's VO + CTA.
export function buildNarration(script) {
  const parts = [];
  if (script.hook) parts.push(script.hook);
  for (const b of script.beats ?? []) if (b.vo) parts.push(b.vo);
  if (script.cta?.vo) parts.push(script.cta.vo);
  return parts.join(' ');
}

// Generate a voiceover. In mock mode (or when no key is set) it writes the exact
// text that WOULD be synthesised, so the pipeline is fully runnable with zero keys.
export async function generateVoiceover({ narration, outPath, brand, mock }) {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (mock || !apiKey) {
    const txtPath = outPath.replace(/\.mp3$/, '.NARRATION.txt');
    await writeFile(txtPath, narration, 'utf8');
    return { mode: 'mock', file: txtPath, chars: narration.length };
  }

  const voiceId = process.env.ELEVENLABS_VOICE_ID || brand.voice.elevenLabsVoiceId;
  const modelId = process.env.ELEVENLABS_MODEL_ID || brand.voice.modelId;
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: narration, model_id: modelId, voice_settings: brand.voice.settings })
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);

  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(outPath, buf);
  return { mode: 'live', file: outPath, chars: narration.length };
}
