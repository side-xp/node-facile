// This script runs on "prebuild" lifecycle hook when running "npm run build" command.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootFolderPath = path.resolve(__dirname, '..');
const srcFolderPath = path.resolve(__dirname, '../src');
const docsFolderPath = path.resolve(__dirname, '../docs');
const indexFilePath = path.resolve(srcFolderPath, 'index.ts');
const typedocFilePath = path.resolve(rootFolderPath, 'typedoc.json');

const srcFilePaths = fs.readdirSync(srcFolderPath, { recursive: true });
const docsFilePaths = fs.readdirSync(docsFolderPath, { recursive: true });
const indexExports = [];
const typedocEntryPoints = [];
const typedocDocuments = [];

// For each source file from "./src"
for (let srcFilePath of srcFilePaths) {
  // Exclude "index.ts" and folders
  if (path.basename(srcFilePath) === 'index.ts') {
    continue;
  }

  srcFilePath = srcFilePath.replaceAll('\\', '/');
  indexExports.push(srcFilePath);
  typedocEntryPoints.push(`./src/${srcFilePath}`);
}

// For each doc file from "./docs"
for (let docFilePath of docsFilePaths) {
  // Exclude "README.md" and folders
  if (path.basename(docFilePath) === 'README.md' || !path.extname(docFilePath)) {
    continue;
  }

  docFilePath = docFilePath.replaceAll('\\', '/');
  typedocDocuments.push(`./docs/${docFilePath}`);
}

// Overwrite index.ts
fs.writeFileSync(indexFilePath, indexExports.map(p =>`export * from './${p}';`).join('\n'), 'utf-8');
// Overwrite entry points in typedoc.json
const typedocStr = fs.readFileSync(typedocFilePath, 'utf-8');
const typedocJson = JSON.parse(typedocStr);
typedocJson.projectDocuments = typedocDocuments;
typedocJson.entryPoints = typedocEntryPoints;
fs.writeFileSync(typedocFilePath, JSON.stringify(typedocJson, null, 2), 'utf-8');