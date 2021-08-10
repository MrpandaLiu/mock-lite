import parser from "./parser";
import { DEFAULT_PATH } from "./server";

function genProxy(path: string): Record<string, string> {
  const res = parser(path);
  const proxy = {};
  if(!res) return proxy;
  (res || []).forEach((api) => {
    if(!api) return;
    proxy[api.path] = DEFAULT_PATH
  });
  return proxy;
}

export default genProxy;
