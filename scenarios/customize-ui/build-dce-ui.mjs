import { execSync } from "child_process";
import fs from "fs";

execSync('npx tsc dce.ui.ts --outDir public --module umd --moduleResolution node --skipLibCheck');

let content = fs.readFileSync('public/dce.ui.js', 'utf8');

const searchPattern = /else\s+if\s*\(\s*typeof\s+define\s*===\s*["']function["']\s*&&\s*define\.amd\s*\)\s*\{\s*define\s*\(\s*\[["']require["']\s*,\s*["']exports["']\]\s*,\s*factory\s*\)\s*;\s*\}/;
const match = content.match(searchPattern);
if(!match){ throw Error('The `else if (typeof define === "function" && define.amd)` not found'); }


const matchStart = match.index;
const matchEnd = matchStart + match[0].length;
const insertCode = ' else { factory(null, {}); }';
const newContent = content.slice(0, matchEnd) + insertCode + content.slice(matchEnd);

fs.writeFileSync('public/dce.ui.js', newContent, 'utf8');
