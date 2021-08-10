export function randomNum(minNum: number, maxNum: number): number {
  switch (arguments.length) {
    case 1:
      return Math.random() * minNum + 1;
    case 2:
      return Math.random() * (maxNum - minNum + 1) + minNum;
    default:
      return 0;
  }
}

export function randomString(total: number): string {    
  total = total || 32;
  const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  const a = t.length;
  let str = "";
  for(let i=0; i<total; ++i) 
    str = str + t.charAt(Math.floor(Math.random() * a));
  return str;
}
