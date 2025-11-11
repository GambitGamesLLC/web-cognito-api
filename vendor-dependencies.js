import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const vendorDir = path.join(projectRoot, 'vendor');
const nodeModulesDir = path.join(projectRoot, 'node_modules');
const packageJsonPath = path.join(projectRoot, 'package.json');

if (fs.existsSync(vendorDir)) {
  fs.rmSync(vendorDir, { recursive: true, force: true });
}
fs.mkdirSync(vendorDir, { recursive: true });

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const dependencies = Object.keys(packageJson.dependencies || {});

const copied = new Set();

const ALLOWED_SCOPES = ['@aws-amplify', '@aws-sdk', '@smithy', '@aws-crypto'];
const ALWAYS_INCLUDE = ['tslib', 'uuid', 'js-cookie', 'rxjs'];

function shouldVendor(packageName) {
  if (ALWAYS_INCLUDE.includes(packageName)) {
    return true;
  }
  return ALLOWED_SCOPES.some(scope => packageName.startsWith(scope));
}

function copyPackage(packageName) 
{
  if (copied.has(packageName)) 
  {
    return;
  }

  if (!shouldVendor(packageName)) return;

  const packagePath = path.join(nodeModulesDir, packageName);
  if (!fs.existsSync(packagePath)) {
    console.warn(`Package not found: ${packageName}`);
    return;
  }

  const destPath = path.join(vendorDir, packageName);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.cpSync(packagePath, destPath, { recursive: true });
  copied.add(packageName);
  console.log(`Copied ${packageName} to vendor directory.`);

  const depPackageJsonPath = path.join(packagePath, 'package.json');
  if (fs.existsSync(depPackageJsonPath)) {
    const depPackageJson = JSON.parse(fs.readFileSync(depPackageJsonPath, 'utf-8'));
    const subDependencies = Object.keys(depPackageJson.dependencies || {});
    for (const subDep of subDependencies) {
      copyPackage(subDep);
    }
  }
}

console.log('Starting to vendor dependencies...');
for (const dep of dependencies) {
  copyPackage(dep);
}
console.log('Vendoring complete.');