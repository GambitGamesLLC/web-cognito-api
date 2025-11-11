import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

const vendorDir = path.resolve(__dirname, 'vendor');
const vendorPackages = fs.readdirSync(vendorDir);

const alias = vendorPackages.reduce((acc, dir) => {
  const packagePath = path.join(vendorDir, dir);
  if (fs.statSync(packagePath).isDirectory()) {
    const packageJsonPath = path.join(packagePath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      // Resolve to the main export or module export if available
      const entry = packageJson.module || packageJson.main || 'index.js';
      acc[dir] = path.resolve(packagePath, entry);
    }
  }
  return acc;
}, {});

export default defineConfig({
  resolve: {
    alias,
  },
  // Your other Vite config...
});