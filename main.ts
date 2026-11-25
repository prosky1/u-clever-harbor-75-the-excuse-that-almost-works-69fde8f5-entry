// The Excuse That Almost Works
// Entry: the one line a gamer texts the boss to skip work on GTA 6 launch
// week. The program writes the excuse verbatim to /output/entry.txt,
// exactly as the judge will read it — one line, at most 20 words, plain
// text that reads like a real person typing in a hurry.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { Buffer } from "node:buffer";

// The approved excuse, word for word. A parent's kid sent home from
// school with nits, and now everything the kid owns is in the wash —
// along with the parent. A boring, specific, real-life detail with no
// wild story and no mention of the game: the kind of thing a tired
// manager has heard twice and would almost believe.
const EXCUSE =
  "School sent my boy home with nits. Everything he owns is in the wash, and so am I.";

const OUT_PATH = "/output/entry.txt";

// The sealed gate only accepts UTF-8 text of 1 to 140 characters, not only
// whitespace, and the brief caps the excuse at 20 words. The ranking
// tie-break also counts bytes, so guard the byte length too: a multi-byte
// character must never silently push the file past the character limit.
const charCount = [...EXCUSE].length;
const byteCount = Buffer.byteLength(EXCUSE, "utf8");
if (charCount < 1 || charCount > 140) {
  throw new Error(`Excuse must be 1-140 characters, got ${charCount}`);
}
if (byteCount < 1 || byteCount > 140) {
  throw new Error(`Excuse must be 1-140 bytes, got ${byteCount}`);
}
if (EXCUSE.trim().length === 0) {
  throw new Error("Excuse must not be only whitespace");
}

const words = EXCUSE.trim().split(/\s+/);
if (words.length > 20) {
  throw new Error(`Excuse must be at most 20 words, got ${words.length}`);
}
if (/[\r\n]/.test(EXCUSE)) {
  throw new Error("Excuse must be a single line with no line breaks");
}
if (/gta/i.test(EXCUSE)) {
  throw new Error("Excuse must never mention the game by name");
}

// Guard the excuse against silent drift: every word must still be there,
// in order, exactly as approved.
const EXPECTED_WORDS = [
  "School",
  "sent",
  "my",
  "boy",
  "home",
  "with",
  "nits.",
  "Everything",
  "he",
  "owns",
  "is",
  "in",
  "the",
  "wash,",
  "and",
  "so",
  "am",
  "I.",
];
if (words.length !== EXPECTED_WORDS.length) {
  throw new Error(
    `Excuse must be ${EXPECTED_WORDS.length} words, got ${words.length}`,
  );
}
for (let i = 0; i < EXPECTED_WORDS.length; i++) {
  if (words[i] !== EXPECTED_WORDS[i]) {
    throw new Error(
      `Excuse word ${i + 1} changed: expected "${EXPECTED_WORDS[i]}", got "${words[i]}"`,
    );
  }
}

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, EXCUSE, "utf8");

// Read back what was written and confirm it is byte-identical to the
// excuse, so a partial write or encoding slip can never reach the judge.
const written = readFileSync(OUT_PATH, "utf8");
if (written !== EXCUSE) {
  throw new Error("Verification failed: /output/entry.txt differs from the excuse");
}
if (Buffer.byteLength(written, "utf8") !== byteCount) {
  throw new Error("Verification failed: /output/entry.txt byte length changed");
}
console.log(`Wrote ${charCount} characters (${byteCount} bytes, ${words.length} words) to ${OUT_PATH}`);
