import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

export const isExsit: (path: string) => boolean = (path: string) => (
  existsSync(resolve(process.cwd(), path)) ? true : false
);

export const readFile: (path: string) => string = (path: string) => {
  const file = readFileSync(resolve(process.cwd(), path), 'utf8');
  return file;
}