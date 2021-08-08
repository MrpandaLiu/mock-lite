import { BaseType, Field, IdentifierType, ResponseStruct } from "../../types";

const createInt32 = () => (123);

const createInt64 = () => ('123456789');

const createBool = () => (true);

const createEnum = (field: Field) => (field.fields && (field.fields[0]).value);

function genMockData(response: ResponseStruct | Field): Record<string, unknown> {
  const obj = {};
  (response.fields || []).forEach((field) => {
    const { name } = field;
    let val: unknown;
    if(field.syntaxType === BaseType.int32) 
      val = createInt32(); 
    if(field.syntaxType === BaseType.int64) 
      val = createInt64();
    if(field.syntaxType === BaseType.bool) 
      val = createBool();
    if(field.syntaxType === IdentifierType.enum)
      val = createEnum(field);
    if(field.syntaxType === IdentifierType.object)
      if(field.fields) {
        val = genMockData(field);
      }
    if(field.isList)
      val = [val, val];
    if(val) 
      obj[name] = val;
  });
  return obj;
}

export default genMockData;