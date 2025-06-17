import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  build: {
    outDir: '../FileCabinet/SuiteApps/com.erpsuccess.scheduler/react-app-bundle/',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'app.js',
        assetFileNames: ({ name }) => {
          console.log('NAME', name);
          if (name?.endsWith('.css')) {
            return 'index.css'; // For CSS files
          } else if (name?.match(/svg|png/gi)) {
            return 'assets/images/[name].[ext]'; // Move vite.svg to assets/images folder
          } else {
            return 'assets/[name].[ext]'; // Other assets like images, fonts, etc.
          }
        },
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
}));
