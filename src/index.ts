import { readFileSync } from 'fs';
import { join } from 'path';

export function getPackageVersion() {
	const cwd = process.cwd();
	const rawPkg = readFileSync(join(cwd, 'package.json')).toString();
	const pkg = JSON.parse(rawPkg);

	return pkg.version || 'no version';
}

export * from './stdio-formatter';
export * from './docker-compose';
export * from './commander';
