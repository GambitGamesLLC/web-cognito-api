import { defineConfig } from 'vite';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'examples',
  server: {
    port: 8100,
    host: 'localhost',
  },
  build: {
    // Generate a source map for easier debugging.
    sourcemap: true,
    // Allow cleaning the output directory even if it's outside the project root.
    emptyOutDir: true,
    // The output directory for the build, relative to the project root.
    outDir: path.resolve(__dirname, 'dist'),
    // Configure the library build.
    lib: {
      // The entry point for the library.
      entry: path.resolve(__dirname, 'src/index.js'),
      // The name of the global variable when used in a UMD build.
      name: 'WebCognitoApi',
      // The output formats for the library. 'es' is for ESM.
      formats: ['es'],
      // The base name for the output file(s).
      fileName: (format) => `web-cognito-api.${format}.js`,
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled
      // into your library. This is crucial for libraries.
      external: ['@aws-amplify/auth', '@aws-amplify/core'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps. Not strictly needed for ESM-only builds,
        // but good practice if you add other formats later.
        globals: {},
      },
    },
  },
});