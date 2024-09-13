import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: '../com.erpsuccess.scheduler/vanilla-vite-app-bundle/',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'app.js',  // JavaScript file naming convention
        chunkFileNames: 'app.chunk.js',  // Chunk file naming
        // assetFileNames: 'assets/index.css', // Asset file naming
        assetFileNames: ({ name }) => {
          console.log(`>>> ${name}`);
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
