# CFI-Work-Order-Scheduler

Features:

TBD

# VanillaJS-Vite

Create Project:

1. npm create vite@latest [projectName] -- --template vanilla
2. cd [projectName]
3. npm install
4. npm run dev
5. Create vite.config.js

Sample:

import { defineConfig } from 'vite';

export default defineConfig({
build: {
outDir: '../com.erpsuccess.scheduler/bundle/',
assetsDir: 'assets',
rollupOptions: {
output: {
entryFileNames: 'js/app.js', // JavaScript file naming convention
chunkFileNames: 'js/app.js', // Chunk file naming
assetFileNames: 'assets/index.css', // Asset file naming
}
},
codeSplit: false
}
});

6. npm run build
   - This will generate bundle (html, js, css files) (see config > rollupOptions > output)
7. Load the bundle files to the suitelet

NOTE: execute 'npm run build' everytime changes happen under vanilla-vite-app folder before deployment
