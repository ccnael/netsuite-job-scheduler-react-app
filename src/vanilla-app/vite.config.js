import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    outDir: '../FileCabinet/SuiteApps/com.erpsuccess.scheduler/vanilla-app-bundle/',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'app.js',  // JavaScript file naming convention
        chunkFileNames: 'app.chunk.js',  // Chunk file naming
        assetFileNames: ({ name }) => {
          if (name && name.endsWith('.css')) {
            return 'index.css'; // For CSS files
          } else if (name.match(/svg|png/gi)) {
            return 'assets/images/[name].[ext]'; // Move vite.svg to assets/images folder
          } else {
            return 'assets/[name].[ext]'; // Other assets like images, fonts, etc.
          }
        },
      }
    },
    plugins: [
      tailwindcss(),
    ],
    codeSplit: false
  }
});
