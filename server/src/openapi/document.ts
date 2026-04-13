import { createApp } from '../app';
import { openAPIDocumentConfig } from './schemas';

export function getOpenAPIDocument() {
  const app = createApp();
  return app.getOpenAPIDocument(openAPIDocumentConfig);
}
