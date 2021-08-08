import * as t from 'proto-parser';

const ROOT = 'root';
const NESTED = 'nested';
const SERVICE_DEFINITION = 'ServiceDefinition';
const METHODS = 'methods';

export const getDefinitionList = (pbTree:  t.ProtoDocument) => (
  pbTree[ROOT][NESTED]
);

export const isProtoApi = (ns: t.NamespaceBase) => (
  ns.syntaxType === SERVICE_DEFINITION
); 

export const getApiList = (ns: t.NamespaceBase) => {
  Object.keys(ns[METHODS])
  .reduce((total, cur) => (total.push(ns[METHODS][cur])), []);
}