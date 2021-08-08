import * as t from 'proto-parser';
import { readFile } from "../../utils/file";
import log from '../../utils/logger';

function parser(path: string) {
  try {
    const file = t.parse(readFile(path));
  } catch(err) {
    log.error(err);
  }
}

export default parser;