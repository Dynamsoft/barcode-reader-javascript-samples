import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

// https://rollupjs.org/guide/en/#configuration-files
export default () => {
  // cvr.js: Only use for <script>, compatibility target to es6. Will never through webpack/rollup again
  // cvr.esm.js: same as .mjs, webpack 4 don't know mjs, so current we still set .esm.js as package.json->browser
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
