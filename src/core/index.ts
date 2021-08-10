import { ApiStrcut, MockEntry } from "../types";
import { isExsit } from "../utils/file";
import log from "../utils/logger";
import parser from "./parser";
import createKoaServer from "./server";

function startMock(path: MockEntry): void {
  log.logger('start mock 🚀🚀🚀');
  if(!isExsit(path)) log.error('please check the path.'); 
  const res = parser(path);
  createKoaServer(res as ApiStrcut[]);
}

export default startMock;