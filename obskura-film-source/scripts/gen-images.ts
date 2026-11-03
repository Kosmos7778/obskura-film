import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT = '/home/z/my-project/public/images';

const STYLE =
  'cinematic film still, shot on 35mm film, anamorphic lens, subtle film grain, moody atmospheric lighting, muted desaturated color palette, deep shadows, independent arthouse cinema aesthetic, high quality, detailed, photorealistic';

interface Spec {
  file: string;
  size: string;
  prompt: string;
}

const specs: Spec[] = [
  // ---------- HERO frames (wide) ----------
  {
    file: 'hero-1.jpg',
    size: '2048x1152',
    prompt: `rain-soaked night city street, glowing neon signs reflecting in puddles, lone figure with umbrella walking away, dense atmospheric fog, ${STYLE}`,
  },
  {
    file: 'hero-2.jpg',
    size: '2048x1152',
    prompt: `vast snowy field at blue hour dusk, single distant wooden house with one warm lit window, low fog, fading light on horizon, ${STYLE}`,
  },
  {
    file: 'hero-3.jpg',
    size: '2048x1152',
    prompt: `woman looking through night train window, warm dim interior light on her face, blurred dark landscape rushing outside, reflections on glass, ${STYLE}`,
  },
  {
    file: 'hero-4.jpg',
    size: '2048x1152',
    prompt: `empty desert road at golden hour, old dusty sedan car seen from behind, long shadows, heat haze, distant mountains, ${STYLE}`,
  },
  {
    file: 'hero-5.jpg',
    size: '2048x1152',
    prompt: `foggy sea shore at dawn, two distant silhouettes standing at waterline, pale grey light, minimal composition, vast negative space, ${STYLE}`,
  },
  // ---------- FILMOGRAPHY stills ----------
  {
    file: 'film-tishe-snega.jpg',
    size: '1344x768',
    prompt: `snowy northern village at night, warm amber windows of wooden houses, falling snow, deep blue twilight, footprints in snow, ${STYLE}`,
  },
  {
    file: 'film-tramvay.jpg',
    size: '1344x768',
    prompt: `old tram crossing empty night bridge, glowing windows, wet asphalt reflections, city lights bokeh in distance, lonely atmosphere, ${STYLE}`,
  },
  {
    file: 'film-sol.jpg',
    size: '1344x768',
    prompt: `sun-bleached salt flats by the sea, lone figure carrying a bucket, harsh white light, cracked earth texture, almost monochromatic pale palette, ${STYLE}`,
  },
  {
    file: 'film-deti-maya.jpg',
    size: '1344x768',
    prompt: `documentary style scene, children running through tall grass meadow at sunset, hand-held camera feel, wildflowers, warm backlight, candid moment, ${STYLE}`,
  },
  {
    file: 'film-steklyanniy-les.jpg',
    size: '1344x768',
    prompt: `misty dark forest with strange cold light between trees, translucent glassy reflections, thin fog layers, eerie stillness, teal shadows, ${STYLE}`,
  },
  {
    file: 'film-aprel.jpg',
    size: '1344x768',
    prompt: `black and white photograph, empty city courtyard with laundry lines, old man feeding pigeons, 1960s eastern european architecture, high contrast monochrome, ${STYLE}`,
  },
  // ---------- PROJECTS ----------
  {
    file: 'proj-molchanie.jpg',
    size: '1344x768',
    prompt: `empty abandoned apartment interior, dust particles floating in beams of window light, peeling wallpaper, single chair, stillness, ${STYLE}`,
  },
  {
    file: 'proj-zimnyaya-doroga.jpg',
    size: '1344x768',
    prompt: `night winter road through forest, car headlights cutting through snowfall, taillights in distance, tire tracks, cold blue darkness, ${STYLE}`,
  },
  {
    file: 'proj-kassiogeya.jpg',
    size: '1344x768',
    prompt: `old astronomical observatory dome under brilliant starry sky, milky way, silhouette of telescope, deep night blue, sense of wonder, ${STYLE}`,
  },
  // ---------- PRODUCERS portraits ----------
  {
    file: 'producer-1.jpg',
    size: '864x1152',
    prompt: `portrait of a confident woman in her late 40s, film producer, short grey-streaked hair, dark turtleneck, dramatic chiaroscuro studio lighting against near-black background, calm intelligent gaze, ${STYLE}`,
  },
  {
    file: 'producer-2.jpg',
    size: '864x1152',
    prompt: `portrait of a thoughtful man in his early 50s, film producer, beard with grey patches, dark shirt, dramatic side lighting against near-black background, warm serious expression, ${STYLE}`,
  },
  {
    file: 'producer-3.jpg',
    size: '864x1152',
    prompt: `portrait of a young woman in her mid 30s, executive producer, dark hair tied back, minimal black outfit, dramatic chiaroscuro lighting against near-black background, focused expression, ${STYLE}`,
  },
  // ---------- AI PRODUCTION ----------
  {
    file: 'ai-1.jpg',
    size: '1344x768',
    prompt: `abstract visualization, classic cinematic film frame dissolving into thousands of luminous particles and thin neural network lines, dark background, amber and pale grey glow, elegant, ${STYLE}`,
  },
 {
    file: 'ai-2.jpg',
    size: '1344x768',
    prompt: `film set with vintage cinema camera on tripod, wireframe digital terrain and volumetric grid overlay projected on studio wall, operator silhouette, blend of analog and digital, dark, ${STYLE}`,
  },
];

async function generateOne(zai: Awaited<ReturnType<typeof ZAI.create>>, spec: Spec, attempt = 1): Promise<boolean> {
  const outPath = path.join(OUT, spec.file);
  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 20000) {
    console.log(`skip (exists): ${spec.file}`);
    return true;
  }
  try {
    const response = await zai.images.generations.create({
      prompt: spec.prompt,
      size: spec.size,
    });
    const base64 = response?.data?.[0]?.base64;
    if (!base64) throw new Error('empty base64 in response');
    const buffer = Buffer.from(base64, 'base64');
    const pngPath = outPath.replace(/\.jpg$/, '.png');
    fs.writeFileSync(pngPath, buffer);
    fs.renameSync(pngPath, outPath);
    console.log(`ok: ${spec.file} (${Math.round(buffer.length / 1024)} KB)`);
    return true;
  } catch (e) {
    console.error(`fail [attempt ${attempt}]: ${spec.file} — ${(e as Error).message}`);
    if (attempt < 6) {
      const backoff = attempt <= 2 ? 5000 * attempt : 15000;
      await new Promise((r) => setTimeout(r, backoff));
      return generateOne(zai, spec, attempt + 1);
    }
    return false;
  }
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const zai = await ZAI.create();

  const queue = [...specs];
  const CONCURRENCY = 2;
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length > 0) {
      const spec = queue.shift();
      if (!spec) break;
      await generateOne(zai, spec);
      await new Promise((r) => setTimeout(r, 4000));
    }
  });
  await Promise.all(workers);

  const missing = specs.filter((s) => {
    const p = path.join(OUT, s.file);
    return !fs.existsSync(p) || fs.statSync(p).size < 20000;
  });
  if (missing.length > 0) {
    console.log(`MISSING (${missing.length}): ${missing.map((m) => m.file).join(', ')}`);
    process.exitCode = 1;
  } else {
    console.log(`ALL ${specs.length} IMAGES DONE`);
  }
}

main().catch((e) => {
  console.error('fatal:', e);
  process.exit(1);
});
