// 2026-11-24: re-encode the poster files whose bytes do not match their
// extension.
//
// Why: Cloudflare Pages serves a static file with the Content-Type implied by
// its extension. A PNG named .jpg is delivered as image/jpeg, and browsers
// refuse to decode it, so the artwork silently does not appear on the board.
// Ten posters are in this state (found 2026-11-24). Seven are already
// archived and unreferenced; three are on the board.
//
// The fix keeps the same pixels and re-encodes to the format the extension
// promises, so the file name, the site's poster.src and the record in
// POSTER-SOURCES.json stay as they are. The record's sha256 and bytes are
// re-stamped to the re-encoded file, and the record notes that the file is a
// re-encode of the original download.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const root = path.join(__dirname, '..');
const postersDir = path.join(root, 'web', 'assets', 'posters');
const recsFile = path.join(root, 'POSTER-SOURCES.json');

const kind = (b) => (b[0] === 0x89 && b[1] === 0x50) ? 'png'
  : (b[0] === 0xff && b[1] === 0xd8) ? 'jpeg'
  : b.slice(0, 4).toString('ascii') === 'RIFF' ? 'webp' : 'other';
const want = (src) => { const e = src.split('.').pop().toLowerCase(); return e === 'jpg' ? 'jpeg' : e; };

const recs = JSON.parse(fs.readFileSync(recsFile, 'utf8'));
let fixed = 0;

for (const r of recs) {
  if (!r.src) continue;
  const file = path.join(root, 'web', r.src.replace(/^\//, ''));
  if (!fs.existsSync(file)) continue;
  const before = fs.readFileSync(file);
  const real = kind(before), target = want(r.src);
  if (real === target) continue;

  // ffmpeg reads the real format from the bytes and writes the target format.
  // The output format has to be named explicitly: a temp file ending in
  // ".recode" has no extension for ffmpeg to infer the muxer from.
  const tmp = file + '.recode.jpg';
  const codec = target === 'jpeg' ? ['-c:v', 'mjpeg', '-q:v', '2'] : target === 'png' ? ['-c:v', 'png'] : [];
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', file, ...codec, '-f', 'image2', tmp], { stdio: 'inherit' });
  const after = fs.readFileSync(tmp);
  const newKind = kind(after);
  if (newKind !== target) {
    fs.unlinkSync(tmp);
    console.error(`SKIP ${r.src}: re-encode produced ${newKind}, expected ${target}`);
    continue;
  }
  fs.renameSync(tmp, file);

  const sha = crypto.createHash('sha256').update(after).digest('hex');
  r.bytes = after.length;
  r.sha256 = sha;
  r.format_note = `Re-encoded from ${real} bytes to ${target} on 2026-11-24 so the file extension matches the bytes and the CDN serves the right Content-Type. Pixels are unchanged from ${r.original_image_url || 'the original download'}.`;
  console.log(`fixed ${r.src}: ${real} -> ${target}  ${before.length}B -> ${after.length}B`);
  fixed++;
}

fs.writeFileSync(recsFile, JSON.stringify(recs, null, 1) + '\n');
console.log(`\nre-encoded ${fixed} poster(s)`);
