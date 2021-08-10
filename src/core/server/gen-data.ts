import { BaseType, Field, IdentifierType, ResponseStruct } from "../../types";
import { randomNum, randomString } from "../../utils/random";

const createString = () => (randomString(10));

const createInt32 = () => (parseInt(`${randomNum(1,10000)}`));

const createInt64 = () => (`${new Date().getTime()}`);

const createBool = () => (true);

const createEnum = (field: Field) => (field.fields && (field.fields[0]).value);

const _createMockData:(field: Field) => unknown = (field: Field) => {
  let val: unknown;
  if(field.syntaxType === BaseType.string) 
    val = createString();  
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
  return val;
}

const createArray = (item: Field) => {
  const n = randomNum(1,10);
  const arr: unknown[] = [];
  for(let i=0; i<n; ++i)
    arr.push(_createMockData(item));
  return arr;
}

function genMockData(response: ResponseStruct | Field): Record<string, unknown> {
  const obj = {};
  (response.fields || []).forEach((field) => {
    const { name } = field;
    let val: unknown;
    val = _createMockData(field);
    if(field.isList)
      val = createArray(field);
    if(val) 
      obj[name] = val;
  });
  return obj;
}

export default genMockData;