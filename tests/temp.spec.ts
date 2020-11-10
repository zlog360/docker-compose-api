//DEBUG=zlog360:*,docker-compose:commander ts-mocha -p tsconfig.json tests/temp.spec.ts --timeout 100000 --trace-warnings
import expect from 'expect';
import { DockerCompose, ISetOpts } from '../src';
import {
	serviceBuild,
	ConfigsShort,
	CapAddStr,
	CapDropArr,
	CgroupParent,
	StartConfig,
	StopConfig,
	RemoteBuildBAsic,
} from './data.service';
// import { StrArrtoObj } from '../src/util';
import { IDockerFile } from '../src/docker-file';

describe('docker-compose api remote unit tests', () => {
	// const initlist = Services_List;
	const dc = new DockerCompose({}, undefined, undefined, 'a', {
		host: '192.168.0.96',
		port: 22,
		username: 'zee',
		password: 'zee',
	});
	it('#1 DockerCompose Scale', async () => {
		// const data = await dc.composeScale({ serviceArray: ["traefik=3 web=2"] })
		// expect(data.length > 0).toBeTruthy();
	});
	it('#1 DockerCompose Stop', async () => {
		// dc.setRootDir("5f6c31be69b8b566871f3b08")
		// const data = await dc.composeStop({ service: ["traefik cadvisor"].join(" ") })
		// console.log(data);
		// expect(data.length > 0).toBeTruthy();
	});
	it('#1 DockerCompose Without Dockerfile', async () => {
		const db = {
			image: { data: 'mysql:5.7' },
			volumes: {
				data: ['/var/lib/mysql'],
				append: true,
			},
			restart: { data: 'always' },
			environment: {
				data: {
					MYSQL_ROOT_PASSWORD: 'somewordpress',
					MYSQL_DATABASE: 'wordpress',
					MYSQL_USER: 'wordpress',
					MYSQL_PASSWORD: 'wordpress',
				},
			},
		};
		const wordpress = {
			depends_on: { data: ['db'], append: true },
			image: { data: 'wordpress:latest' },
			ports: { data: ['8006:80'], append: true },
			restart: { data: 'always' },
			environment: {
				data: {
					WORDPRESS_DB_HOST: 'db:3306',
					WORDPRESS_DB_USER: 'wordpress',
					WORDPRESS_DB_PASSWORD: 'wordpress',
					WORDPRESS_DB_NAME: 'wordpress',
				},
			},
		};
		const volumes = {
			db_data: {},
		};
		const id = 'abc';
		dc.setRootDir(id);
		await dc.Deploy(
			{},
			{ db, wordpress },
			{ local: `${process.cwd()}/data/${id}`, remote: id }
		);
		// const data = await dc.composeStop({ service: ["traefik cadvisor"].join(" ") })
		// console.log(data);
		// expect(data.length > 0).toBeTruthy();
	});
});
