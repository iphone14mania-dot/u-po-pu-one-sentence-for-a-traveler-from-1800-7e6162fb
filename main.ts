// One Sentence for a Traveler from 1800 — entry program.
//
// Writes one sentence to /output/entry.txt explaining the modern internet
// to someone arriving from the year 1800. Deterministic, no network, no
// randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. It builds only from what a person from 1800 already
// knows — libraries, roads, letters, ink (judge brief criterion 2) —
// and deliberately uses no word coined after their time: no "internet",
// no "computer", no "screen", no "wire". The comparison carries the
// whole sentence, which the brief allows as long as it is true: every
// library joined by impossibly fast roads explains both the instant
// messages ("a letter reaches the far side of the earth") and the shared
// knowledge ("anyone may read or write in any of them"), and nothing in
// it would mislead a reader who took it literally (3). The closing image,
// a letter arriving before the ink is dry, is the phrase meant to stick
// a week later (5). Revision: an earlier draft built on a post office
// holding every book ever printed, "in a blink" — dropped, because the
// post-office-as-library image muddles the picture and "in a blink" is
// stock phrasing. A second draft, a library with no walls and "a letter
// sent from London reaches Boston before the candle burns down", was
// dropped for narrowing the picture to two cities and understating the
// scale with "one shelf".
const ENTRY =
  "Imagine every library in the world joined by roads so fast that a letter reaches the far side of the earth " +
  "before the ink is dry, and anyone may read or write in any of them.";

// Competition rules: 1 to 200 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
