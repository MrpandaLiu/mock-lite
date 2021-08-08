import { MockEntry } from "../types";
import logger from "../utils/logger";
import createKoaServer from "./server";

function startMock(path: MockEntry) {
  logger('start mock 🚀🚀🚀');
  if(!path) logger('please check the path.'); 
  createKoaServer();
}

export default startMock;