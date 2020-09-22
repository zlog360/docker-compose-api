import { isArray, isString } from 'util';

// function onlyUnique(value: any, index: number, self: any) { 
//     return self.indexOf(value) === index;
// }
export const ConcatSMUnitString = (o: any, n: any, a: boolean) =>  {
    if (isArray(o) && a) {
        if (isString(n)) {
            o.push(n);
        }
        if (isArray(n)) {
            o = o.concat(n);
        }
        o = Array.from(new Set(o));
    } else if (isString(o)  && a) {
        o = isString(n)
        ? [o, n]
        : isArray(n)
        ? Array.from(new Set([o].concat(n)))
        : o;
    } else
       o = n;
    return o;
}

export const ConcatSMUnitConfig = (o: any, n: any, a: boolean) =>  {
    if (isArray(o) && a) {
        if (isString(n)) {
            o.push(n);
        }
        if (isArray(n)) {
            o.concat(n);
        }
    } else if (isString(o)  && a) {
        o = isString(n)
        ? [o, n]
        : isArray(n)
        ? [o].concat(n)
        : o;
    } else
       o = n;
    return o;
};

export const getType = (o: any): string => Object.prototype.toString.call(o).split(' ')[1].slice(0, -1);
export const isArrayl = (o: any) => getType(o) === 'Array';
export const isObjectl = (o: any) => getType(o) === 'Object';

export const ConcatObject = (o: any, n: any, a: boolean) => {
    if (!a) {
        return n;
    } else if (isObjectl(o) && isObjectl(n)) {
        return { ...o, ...n };
    } else {
      return isObjectl(o)
      ? [o].concat(n)
      : o.concat(n);
    }
}

export const StrArrtoObj = (arr: string [], obj: any = {}): any => {
    arr.forEach((e: string) => {
        const keyVal = e.split('=');
        obj[keyVal[0]] = keyVal[1];
    });
    return obj;
}
