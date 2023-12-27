import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readFileSync } from 'fs';
import { resolve } from "path";

const data = JSON.parse(readFileSync('./tsconfig.json', 'utf8'));

let target = data.compilerOptions.target;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
	build: {
    lib: {
      // src/index.ts is where we have exported the component(s)
      entry: resolve(__dirname, "src/index.ts"),
      name: "MfmComponent",
      // the name of the output files when the build is run
      fileName: "index",
    }, 
		target: target,
    rollupOptions: {
      external: ['vue', './sb-preview/runtime.js'],
    },
    output: {
      // Provide global variables to use in the UMD build
      // for externalized deps
      globals: {
        vue: "Vue",
      },
    },
	},
  assetsInclude: ['/sb-preview/runtime.js'],
})
