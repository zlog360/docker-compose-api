// function onlyUnique(value: unknown, index: number, self: unknown) {
//     return self.indexOf(value) === index;
// }
export const ConcatSMUnitString = (o, n: unknown, a: boolean) => {
	if (Array.isArray(o) && a) {
		if (typeof n === 'string') {
			o.push(n);
		}
		if (Array.isArray(n)) {
			o = o.concat(n);
		}
		o = Array.from(new Set(o));
	} else if (typeof o === 'string' && a) {
		o =
			typeof n === 'string'
				? [o, n]
				: Array.isArray(n)
				? Array.from(new Set([o].concat(n)))
				: o;
	} else o = n;
	return o;
};

export const ConcatSMUnitConfig = (o: unknown, n: unknown, a: boolean) => {
	if (Array.isArray(o) && a) {
		if (typeof n === 'string') {
			o.push(n);
		}
		if (Array.isArray(n)) {
			o.concat(n);
		}
	} else if (typeof o === 'string' && a) {
		o =
			typeof n === 'string'
				? [o, n]
				: Array.isArray(n)
				? [o].concat(n)
				: o;
	} else o = n;
	return o;
};

export const getType = (o: unknown): string =>
	Object.prototype.toString.call(o).split(' ')[1].slice(0, -1);
export const isArrayl = (o: unknown) => getType(o) === 'Array';
export const isObjectl = (o: unknown) => getType(o) === 'Object';

export const ConcatObject = (o, n, a: boolean) => {
	if (!a) {
		return n;
	} else if (isObjectl(o) && isObjectl(n)) {
		return { ...o, ...n };
	} else {
		return isObjectl(o) ? [o].concat(n) : o.concat(n);
	}
};

export const StrArrtoObj = <T = Record<string, unknown>>(
	arr: string[],
	obj: unknown = {}
): T => {
	arr.forEach((e: string) => {
		const keyVal = e.split('=');
		obj[keyVal[0]] = keyVal[1];
	});
	return obj as T;
};
