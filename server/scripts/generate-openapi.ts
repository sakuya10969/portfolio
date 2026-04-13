import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getOpenAPIDocument } from '../src/openapi/document';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.resolve(__dirname, '..', 'openapi');
const outputPath = path.join(outputDirectory, 'openapi.json');

async function main() {
  const document = getOpenAPIDocument();

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(document, null, 2)}\n`, 'utf8');

  console.log(`OpenAPI document generated: ${outputPath}`);
}

await main();
