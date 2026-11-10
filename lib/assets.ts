// Adds ?v=<content hash> to CSS/JS links so every browser loads the new file after a change.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const cache: Record<string, string> = {};
export function asset(p: string): string {
  if (!cache[p]) {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", p));
    cache[p] = `${p}?v=${crypto.createHash("md5").update(buf).digest("hex").slice(0, 10)}`;
  }
  return cache[p];
}
