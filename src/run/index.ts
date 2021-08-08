import startMock from "../core";
import useCommand from "../utils/command";
import logger from "../utils/logger";

function help() {
  logger(
    `
    Usage:
      [api-path]  start mock
      help        get help for how to use mock-lite
      version     check the version of mock-lite    
    `
  );
}

function version() {
  const version = require('../../package.json').version;
  logger(version);
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
  if(arg._) startMock(arg._);
}

run();