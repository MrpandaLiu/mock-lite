import * as t from 'proto-parser';
import { ApiStrcut, Field, SyntaxType } from '../../types';
import { getApiList, getDefinitionList, 
  getFieldType, getIdentifier, getPathAndMethod, isProtoApi } from './util';

class ProtoStructor {
  private definitions: Record<string, t.NamespaceBase>;

  constructor(pbTree:  t.ProtoDocument) {
    this.definitions = getDefinitionList(pbTree) || {};
  }

  struct() {
    if(!this.definitions) return;
    const apiList = (Object.keys(this.definitions) || [])
    .reduce((total, cur) => {
      const item = this.definitions!![cur];
      if(isProtoApi(item)) {
        total = getApiList(item as t.ServiceDefinition);
      }
      return total;
    }, [] as t.MethodDefinition[])
    .map((api) => {
      return this.strcutApi(api);
    });
    return apiList;
  }

  strcutApi(
    api: t.MethodDefinition
  ): ApiStrcut | undefined
  {
    const { name, options, responseType } = api;
    if(!options) return;
    const { method, path } = getPathAndMethod(options);
    if(!method || !path) return;
    return {
      name,
      path,
      method,
      response: this.structRes(responseType)
    };
  }

  structRes(
    struct: t.FieldType
  ) {
    const { name, fields } = getIdentifier(this.definitions, struct.value) as t.MessageDefinition;
    return {
      name,
      fields: this.structField(fields)
    }
  }

  structField(fields: Record<string, t.FieldDefinition>) {
    const fieldList: Field[] = [];
    Object.keys(fields).forEach((key) => {
      const field = fields[key];
      const type = getFieldType(field);
      const obj = {
        name: field.name,
        isList: field.repeated,
        syntaxType: field.type.value as SyntaxType
      };
      switch(type) {
        case t.SyntaxType.BaseType:
          fieldList.push(obj);
          break;
        case t.SyntaxType.Identifier:
          const identifier = getIdentifier(this.definitions, field.type.value) as t.MessageDefinition | t.EnumDefinition;
          const isObject = identifier.syntaxType === t.SyntaxType.MessageDefinition;
          if(isObject) {
            fieldList.push({
              ...obj,
              syntaxType: 'object',
              fields: this.structField((identifier as t.MessageDefinition).fields)
            });
          } else {
            fieldList.push({
              ...obj,
              syntaxType: 'enum',
              fields: this.structEnum((identifier as t.EnumDefinition).values)
            });
          }
      }
    });
    return fieldList;
  }

  structEnum(values: Record<string, number>) {
    const fieldList: Field[] = [];
    Object.keys(values).forEach(key => {
      values[key]
      fieldList.push({
        name: key,
        value: values[key],
        isList: false
      });
    });
    return fieldList;
  }
}

export default ProtoStructor;