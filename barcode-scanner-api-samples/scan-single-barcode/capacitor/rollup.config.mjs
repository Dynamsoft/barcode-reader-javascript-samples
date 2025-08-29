import fs from 'fs/promises';
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

// https://rollupjs.org/guide/en/#configuration-files
export default async() => {
  await fs.mkdir("./dist", { recursive: true, force: true });
  fs.cp("./public/", "./dist/", { recursive: true, force: true })
  return [
    {
      input: "./index.ts",
      plugins: [
        typescript({
          tsconfig: "./tsconfig.json"
        }),
        nodeResolve({
          exportConditions: ["browser", "default", "module", "import"],
        }),
      ],
      output: [
        {
          file: "./dist/index.js",
          format: "umd",
        },
      ],
    },
  ];
};
