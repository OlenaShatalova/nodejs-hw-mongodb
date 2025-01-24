import path from 'node:path';

export * from './upload.js';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
