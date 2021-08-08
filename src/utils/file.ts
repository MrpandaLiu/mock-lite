import { existsSync } from 'fs';
import { resolve } from 'path';

export const isExsit = (path: string) => (
  existsSync(resolve(__dirname, path)) ? true : false
);