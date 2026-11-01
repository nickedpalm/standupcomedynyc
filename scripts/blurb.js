// Shared "first sentence" extractor for the Instagram card dek and the post caption.
//
// Why this exists: both used to run a raw /^[^.!?]{12,180}[.!?]/ match on the pick
// description, which treats the dot in an initialism as a sentence end. "D.F. Sweedler's"
// became "with D." and "St. Marks" became "at St." — a reader-facing truncation on the
// card and in the caption. Mask the periods inside initialisms and common abbreviations
// before splitting, then put them back.
//
// The split logic below is otherwise identical to the code it replaces, so the only
// behaviour change is that initials no longer end a sentence.
'use strict';

// A run of initials (D.F., U.S., A.T.M.) or a common abbreviation (Mr., St., Dr., vs., etc.).
const ABBREV = /\b(?:[A-Z]\.){1,3}|\b(?:Mr|Mrs|Ms|Dr|Prof|St|Jr|Sr|vs|etc|approx|est|Inc|Ltd|Co)\./g;
const MASK = '\u0001';

const mask = (s) => String(s).replace(ABBREV, (m) => m.replace(/\./g, MASK));
const unmask = (s) => String(s).replace(new RegExp(MASK, 'g'), '.');

// First sentence of a blurb. `limit` caps the sentence length; `headLen` caps the
// fallback clause cut. They differ because the card and the caption were written with
// slightly different caps and are kept that way to avoid changing unrelated output.
function firstSentence(description, limit = 180, headLen = limit + 2) {
  const d = String(description || '').trim();
  if (!d) return '';
  const masked = mask(d);
  const m = masked.match(new RegExp('^[^.!?]{12,' + limit + '}[.!?]'));
  if (m) return unmask(m[0]);
  if (masked.length <= 12) return '';
  const first = (masked.match(/^[^.!?]+/) || [masked])[0];
  const head = first.slice(0, headLen);
  let cut = -1;
  for (const sep of [' with ', ' featuring ', ' plus ', ', ', ' and ']) {
    const i = head.lastIndexOf(sep);
    if (i > 40 && i > cut) cut = i;
  }
  const trimmed = cut > 0 ? head.slice(0, cut) : head.slice(0, head.lastIndexOf(' '));
  return unmask(trimmed.replace(/[,;:\s]+$/, '') + '.');
}

module.exports = { firstSentence, ABBREV };
