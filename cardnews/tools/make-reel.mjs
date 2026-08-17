/* ===================================================================
   카드 PNG → 릴스용 세로 영상 (1080x1920)

   사용법:
     node cardnews/tools/make-reel.mjs <세트이름> [장당초]
   예:
     node cardnews/tools/make-reel.mjs offline-marketing 3.5

   결과: cardnews/out/<세트이름>-reel.mp4

   카드는 4:5(1080x1350)라 9:16 캔버스에 위아래 여백이 생긴다.
   여백은 각 카드의 배경색으로 채운다 — 다크/크림이 섞여 있어서
   한 색으로 깔면 카드마다 띠가 보인다.
   =================================================================== */

import { spawnSync } from 'node:child_process';
import { readdirSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '..', 'out');
const setName = process.argv[2] || 'offline-marketing';
const perCard = Number(process.argv[3] || 3.5);

const cards = readdirSync(outDir)
  .filter((f) => f.startsWith(setName + '-') && f.endsWith('.png') && !f.includes('reel'))
  .sort();

if (!cards.length) {
  console.error(`${setName} 카드 PNG 가 없습니다. 먼저 render.mjs 를 실행하세요.`);
  process.exit(1);
}

/* ffmpeg 경로 : PATH 에 없으면 imageio-ffmpeg 가 받아둔 바이너리를 쓴다 */
function findFfmpeg() {
  if (spawnSync('ffmpeg', ['-version']).status === 0) return 'ffmpeg';
  const py = spawnSync('python3', [
    '-c',
    'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())',
  ]);
  const p = String(py.stdout || '').trim();
  if (p && existsSync(p)) return p;
  console.error('ffmpeg 를 찾지 못했습니다.  pip install imageio-ffmpeg  후 다시 시도하세요.');
  process.exit(1);
}
const FF = findFfmpeg();

/* 카드마다 배경색을 뽑아 9:16 캔버스에 얹는다 */
const padDir = join(outDir, '_reel_frames');
rmSync(padDir, { recursive: true, force: true });
mkdirSync(padDir, { recursive: true });

const py = `
from PIL import Image
import os, sys
src = ${JSON.stringify(cards.map((c) => join(outDir, c)))}
dst = ${JSON.stringify(padDir)}
for i, p in enumerate(src):
    im = Image.open(p).convert('RGB')
    bg = im.getpixel((6, 6))          # 모서리 = 카드 배경색
    canvas = Image.new('RGB', (1080, 1920), bg)
    canvas.paste(im, (0, (1920 - im.height) // 2))
    canvas.save(os.path.join(dst, 'f_%03d.png' % i))
print(len(src))
`;
const r = spawnSync('python3', ['-c', py], { encoding: 'utf8' });
if (r.status !== 0) {
  console.error('프레임 생성 실패:', r.stderr);
  process.exit(1);
}

/* concat 목록 : 마지막 장은 한 번 더 적어야 지속시간이 적용된다 */
const listPath = join(padDir, 'list.txt');
const frames = readdirSync(padDir).filter((f) => f.endsWith('.png')).sort();
let list = frames.map((f) => `file '${join(padDir, f)}'\nduration ${perCard}`).join('\n');
list += `\nfile '${join(padDir, frames[frames.length - 1])}'\n`;
writeFileSync(listPath, list);

const outFile = join(outDir, `${setName}-reel.mp4`);
const args = [
  '-y', '-loglevel', 'error',
  '-f', 'concat', '-safe', '0', '-i', listPath,
  '-vf', 'fps=30,format=yuv420p',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
  '-movflags', '+faststart',
  outFile,
];
const enc = spawnSync(FF, args, { encoding: 'utf8' });
if (enc.status !== 0) {
  console.error('인코딩 실패:', enc.stderr);
  process.exit(1);
}

rmSync(padDir, { recursive: true, force: true });
console.log(`${frames.length}장 × ${perCard}초 → ${outFile}`);
