import * as t from 'proto-parser';
import { getDefinitionList } from './util';

function strcutJSON(
  pbTree:  t.ProtoDocument
) {
  const definitions = getDefinitionList(pbTree);
}

export default strcutJSON;