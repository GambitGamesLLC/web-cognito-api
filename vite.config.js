import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // The output directory for the build, equivalent to Webpack's `output.path`.
    outDir: 'dist',
    lib: 
    {
      // The entry point for the library build, equivalent to Webpack's `entry`.
      // We use `src/index.js` from your package.json.
      entry: resolve(__dirname, 'src/index.js'),

      // Specify the output formats. Since you only want ESM, we set it to ['es'].
      formats: ['es'],
      
      // The output filename for the bundle. We can simplify this as we only have one format.
      fileName: 'web-aws-cognito-api',
    },
  },
});