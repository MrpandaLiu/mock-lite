import * as t from 'proto-parser';
import { ApiStrcut } from '../../types';
import { getDefinitionList, isProtoApi } from './util';

function strcutApi(
  api: t.NamespaceBase
): ApiStrcut 
{
  const { name,  } =api;
  return {
    name,
    path:
  };
}

function strcutJSON(
  pbTree:  t.ProtoDocument
) {
  const definitions = getDefinitionList(pbTree);
  if(!definitions) return;
  const apiList = (Object.keys(definitions) || [])
  .reduce((total, cur) => {
    const item = definitions[cur];
    if(isProtoApi(item)) {
      total = getApiList(item);
    }
    return total;
  }, [] as t.NamespaceBase[])
  .map((item) => );
}

export default strcutJSON;