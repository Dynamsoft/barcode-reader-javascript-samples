import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

function compileDceUi() {
  const sourcePath = path.resolve('src/dce.ui.ts')
  const outputPath = path.resolve('public/dce.ui.js')
  const source = fs.readFileSync(sourcePath, 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2023,
      module: ts.ModuleKind.UMD,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      skipLibCheck: true,
    },
    fileName: sourcePath,
  })
  const searchPattern = /else\s+if\s*\(\s*typeof\s+define\s*===\s*["']function["']\s*&&\s*define\.amd\s*\)\s*\{\s*define\s*\(\s*\[["']require["']\s*,\s*["']exports["']\]\s*,\s*factory\s*\)\s*;\s*\}/;
  const match = outputText.match(searchPattern);
  if (!match || match.index === undefined) { throw Error('The `else if (typeof define === "function" && define.amd)` not found'); }


  const matchStart = match.index;
  const matchEnd = matchStart + match[0].length;
  const insertCode = ' else { factory(null, {}); }';
  const newContent = outputText.slice(0, matchEnd) + insertCode + outputText.slice(matchEnd);

  fs.writeFileSync(outputPath, newContent, 'utf8')
}

compileDceUi();

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
})
