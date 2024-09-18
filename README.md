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
outDir: '../com.erpsuccess.scheduler/vanilla-vite-app-bundle/',
assetsDir: 'assets',
rollupOptions: {
output: {
entryFileNames: 'app.js', // JavaScript file naming convention
chunkFileNames: 'app.chunk.js', // Chunk file naming
assetFileNames: ({ name }) => {
if (name && name.endsWith('.css')) {
return 'index.css'; // For CSS files
} else if (name === 'vite.svg') {
return 'assets/images/[name].[ext]'; // Move vite.svg to assets/images folder
}
return 'assets/[name].[ext]'; // Other assets like images, fonts, etc.
},
}
},
codeSplit: false
}
});

6. Install FullCalendar dependencies
   npm install @fullcalendar/core @fullcalendar/adaptive @fullcalendar/interaction @fullcalendar/resource-timeline @fullcalendar/daygrid

7. npm run build
   - This will generate bundle/build (html, js, css files) (see config > rollupOptions > output)
8. Load the bundle/build files to the suitelet

NOTE: execute 'npm run build' everytime changes happen under vanilla-vite-app folder before deployment
