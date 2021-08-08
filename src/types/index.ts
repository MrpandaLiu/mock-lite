export type MockEntry = string;
export type HttpMethod = 'get' | 'post' | 'delete' | 'put';
export type SyntaxType = 'BaseType' | 'Identifier';

export interface Field {
  syntaxType: SyntaxType;
  value: string;
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