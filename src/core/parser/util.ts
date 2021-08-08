import * as t from 'proto-parser';

const ROOT = 'root';
const NESTED = 'nested';
const SERVICE_DEFINITION = 'ServiceDefinition';

export const getDefinitionList = (pbTree:  t.ProtoDocument) => (
  pbTree[ROOT][NESTED]
);