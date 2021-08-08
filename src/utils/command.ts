interface ParsedArg {
  [arg: string]: any;
}

function useCommand(
  initValue: Record<string, boolean>, 
  alias?: Record<string, string>
): ParsedArg {
  const arg = process.argv[2];
  if(!arg) return initValue;
  let isExtra = true;
  Object.keys(initValue)
  .forEach((key) => {
    if(arg === `--${key}` || (alias && arg === `-${alias[key]}`)) {
      initValue[key] = true;
      isExtra = false;
    }
  });
  if(isExtra) {
    return { ...initValue, _: arg };
  }
  return initValue;
}

export default useCommand;
