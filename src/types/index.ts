export type MockEntry = string;
export type SyntaxType = 'enum' | 'object' | 'int32' | 'int64' | 'string' | 'bool';

export interface Field {
  isList: boolean;
  syntaxType?: SyntaxType;
  name: string;
  fields?: Field[];
  value?: number;
}

export interface ResponseStruct {
  name: string;
  fields: Field[];
}

export interface ApiStrcut {
  name: string;
  path: string;
  method: HttpMethod;
  response: ResponseStruct;
}

export interface StructResponse {
  name: string;
  fields: Field[];
}

export const enum HttpMethod {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete'
}

export const enum BaseType {
  int32 = 'int32',
  int64 = 'int64',
  string = 'string',
  bool = 'bool'
}

export const enum IdentifierType {
  enum = 'enum',
  object = 'object'
}