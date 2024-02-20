import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import sucrase from "@rollup/plugin-sucrase";

const libConfig = {
    input: "src/index.ts",
    output: {
      dir: "dist/lib",
      name: "Lib",
    },
    external: [],
    plugins: [
      resolve({ browser: true, mainFields: ["module"] }),
      commonjs({}),
      sucrase({ transforms: ["typescript"] }),
    ],
  };

// const demoConfig = {
//   input: "src-demo/index.ts",
//   output: {
//     dir: "demo/js",
//     name: "Demo",
//   },
//   external: [],
//   plugins: [
//     resolve({ browser: true, mainFields: ["module"] }),
//     commonjs({}),
//     sucrase({ transforms: ["typescript"] }),
//   ],
// };

export default [libConfig, demoConfig];