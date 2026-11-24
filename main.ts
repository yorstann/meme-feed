// Entry program for the "Post the Meme, Win the Feed" bounty on make.fun.
//
// The real entry here is the X post itself — a meme about a wiped-out robot
// entering a $2 bounty at 3 a.m. like it is the World Cup final. Nothing in
// this file is scored. Its single job is to hand POST.json (which names that
// post) from the repository root over to the output directory, where the
// gate picks it up and reads the post on X.
//
// Node 22, standard library only.

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// Inside the grader's container the repo root is /bot and the gate reads
// from /output; the environment variables let the same layout be mirrored
// when the program is run anywhere else.
const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'POST.json');
const target = join(outputDir, 'POST.json');

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(source, target);
} catch (err) {
  console.error(
    `Failed to deliver POST.json (copy ${source} -> ${target}): ${(err as Error).message}`,
  );
  process.exit(1);
}

console.log(`POST.json delivered to ${target}`);
