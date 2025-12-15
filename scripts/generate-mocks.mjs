
import fs from 'fs';
import path from 'path';

const POSTMAN_FILE = String.raw`c:\Users\Joshua Osagie\projects\primelane\.agent\rules\postman-collection-response-for-primelane.md`;
const OUTPUT_FILE = String.raw`c:\Users\Joshua Osagie\projects\primelane\src\mocks\handlers.ts`;

function generateHandlers() {
  console.log('Reading Postman file...');
  const fileContent = fs.readFileSync(POSTMAN_FILE, 'utf-8');

  // Extract JSON object from Markdown (find first { and last })
  const start = fileContent.indexOf('{');
  const end = fileContent.lastIndexOf('}');
  
  if (start === -1 || end === -1) {
    console.error('Could not find JSON content in file.');
    process.exit(1);
  }

  const jsonString = fileContent.slice(start, end + 1);
  let collection;
  try {
    collection = JSON.parse(jsonString);
  } catch (e) {
    console.error('Failed to parse JSON:', e);
    process.exit(1);
  }

  const handlers = [];

  function processItems(items) {
    for (const item of items) {
      if (item.item) {
        // It's a folder, recurse
        processItems(item.item);
      } else if (item.request && item.response && item.response.length > 0) {
        // It's a request with responses
        const successResponse = item.response.find(r => r.code >= 200 && r.code < 300) || item.response[0];
        if (!successResponse) continue;

        let method = item.request.method.toLowerCase(); // get, post, put, etc.
        let url = item.request.url.raw;

        // Clean up URL
        // Replace {{base_url}} with empty string (we'll prepend API_BASE_URL in the template)
        // Also remove query params for the matcher path
        let pathPattern = url.replace('{{base_url}}', '');
        pathPattern = pathPattern.split('?')[0];

        // Format body
        let responseBody = successResponse.body;
        // Try to ensure body is valid JSON object text
        try {
            const parsed = JSON.parse(responseBody);
            responseBody = JSON.stringify(parsed, null, 2); 
            // Indent for readability
            responseBody = responseBody.split('\n').map(l => '      ' + l).join('\n');
        } catch {
            // If body isn't JSON, treat as string? Or skip?
            // Usually API responses are JSON.
             console.warn(`Skipping non-JSON response for ${pathPattern}`);
             continue;
        }

        const handlerCode = `
  // ${item.name}
  http.${method}(\`\${API_BASE_URL}${pathPattern}\`, () => {
    return HttpResponse.json(${responseBody.trim()})
  })`;
        handlers.push(handlerCode);
      }
    }
  }

  if (collection.item) {
    processItems(collection.item);
  }

  const fileOutput = `import { http, HttpResponse } from 'msw'

const API_BASE_URL = import.meta.env.VITE_PRIMELANE_API_BASE_URL || 'https://prime-lane-uvtut.ondigitalocean.app'

export const handlers = [
${handlers.join(',\n')}
]
`;

  console.log(`Generated ${handlers.length} handlers.`);
  fs.writeFileSync(OUTPUT_FILE, fileOutput);
  console.log(`Wrote to ${OUTPUT_FILE}`);
}

generateHandlers();
