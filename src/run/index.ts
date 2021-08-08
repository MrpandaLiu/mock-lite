import startMock from "../core";
import useCommand from "../utils/command";
import log from "../utils/logger";

function help() {
  log.logger(
    `
    Usage:
      [api-path]  start mock
      help        get help for how to use mock-lite
      version     check the version of mock-lite    
    `
  );
}

function version() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const version = require('../../package.json').version;
  log.logger(version);
}

function run() {
  const arg = useCommand({
    help: false,
    version: false
  }, {
    help: 'h',
    version: 'v'
  });
  if(arg.help) help();
  if(arg.version) version();
  if(arg._) startMock(arg._ as string);
}

run();