import { isArray, isString } from 'util';

// function onlyUnique(value: unknown, index: number, self: unknown) {
//     return self.indexOf(value) === index;
// }
export const ConcatSMUnitString = (o: unknown, n: unknown, a: boolean) => {
	if (isArray(o) && a) {
		if (isString(n)) {
			o.push(n);
		}
		if (isArray(n)) {
			o = o.concat(n);
		}
		o = Array.from(new Set(o));
	} else if (isString(o) && a) {
		o = isString(n)
			? [o, n]
			: isArray(n)
			? Array.from(new Set([o].concat(n)))
			: o;
	} else o = n;
	return o;
};

export const ConcatSMUnitConfig = (o: unknown, n: unknown, a: boolean) => {
	if (isArray(o) && a) {
		if (isString(n)) {
			o.push(n);
		}
		if (isArray(n)) {
			o.concat(n);
		}
	} else if (isString(o) && a) {
		o = isString(n) ? [o, n] : isArray(n) ? [o].concat(n) : o;
	} else o = n;
	return o;
};

export const getType = (o: unknown): string =>
	Object.prototype.toString.call(o).split(' ')[1].slice(0, -1);
export const isArrayl = (o: unknown) => getType(o) === 'Array';
export const isObjectl = (o: unknown) => getType(o) === 'Object';

export const ConcatObject = (o: unknown, n: unknown, a: boolean) => {
	if (!a) {
		return n;
	} else if (isObjectl(o) && isObjectl(n)) {
		return { ...o, ...n };
	} else {
		return isObjectl(o) ? [o].concat(n) : o.concat(n);
	}
};

export const StrArrtoObj = (arr: string[], obj: unknown = {}): unknown => {
	arr.forEach((e: string) => {
		const keyVal = e.split('=');
		obj[keyVal[0]] = keyVal[1];
	});
	return obj;
};
