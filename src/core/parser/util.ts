import * as t from 'proto-parser';
import { HttpMethod } from '../../types';

const ROOT = 'root';
const NESTED = 'nested';
const SERVICE_DEFINITION = 'ServiceDefinition';
const TYPE = 'type';
const SYNTAX_TYPE = 'syntaxType';

export const getDefinitionList: (pbTree: t.ProtoDocument) => Record<string, t.NamespaceBase> | undefined
  = (pbTree: t.ProtoDocument) => (
    pbTree[ROOT][NESTED]
  );

export const isProtoApi: (ns: t.NamespaceBase) => boolean
  = (ns: t.NamespaceBase) => (
    ns.syntaxType === SERVICE_DEFINITION
  );

export const getApiList: (ns: t.ServiceDefinition) => t.MethodDefinition[]
  = (ns: t.ServiceDefinition) => {
    return Object.keys(ns.methods)
      .reduce((total, cur) => {
        total.push(ns.methods[cur]);
        return total;
      }, [] as t.MethodDefinition[]);
  }

export const getPathAndMethod = (options: Record<string, string>) => {
  let method: HttpMethod | undefined, path = '';
  Object.keys(options).forEach((key) => {
    if (key.indexOf(HttpMethod.get) !== -1) method = HttpMethod.get;
    if (key.indexOf(HttpMethod.post) !== -1) method = HttpMethod.post;
    if (key.indexOf(HttpMethod.put) !== -1) method = HttpMethod.put;
    if (key.indexOf(HttpMethod.delete) !== -1) method = HttpMethod.delete;
    if (method) path = options[key];
  });
  return { method, path };
}

export const getIdentifier: (definitions: Record<string, t.NamespaceBase>, value: string) => t.NamespaceBase
  = (definitions: Record<string, t.NamespaceBase>, value: string) => (
    definitions[value]
  );

export const getFieldType: (field: t.FieldDefinition) => t.SyntaxType.BaseType | t.SyntaxType.Identifier
  = (field: t.FieldDefinition) => (
    field[TYPE][SYNTAX_TYPE]
  );
