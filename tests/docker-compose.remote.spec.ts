//DEBUG=zlog360:*,docker-compose:commander ts-mocha -p tsconfig.json tests/docker-compose.remote.spec.ts --timeout 100000 --trace-warnings
import expect from 'expect';
import { DockerCompose, ISetOpts } from '../src/my-lib';
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
		host: '192.168.0.99',
		port: 22,
		username: 'zee',
		password: 'zee',
	});
	const dc_1 = new DockerCompose(
		{},
		undefined,
		undefined,
		'nodejs_docker_web',
		{
			host: '192.168.0.99',
			port: 22,
			username: 'zee',
			password: 'zee',
		}
	);
	// it('#1 Constrcutor', () =>
	//   expect(dc).toHaveProperty('sshConfig')
	// );
	it('#2 Integration tests with set', async () => {
		const srvc = 's12';
		const conf: ISetOpts = {
			build: { data: serviceBuild },
			configs: { data: ConfigsShort },
			cgroup_parent: { data: CgroupParent },
			cap_add: { data: CapAddStr, append: true },
			cap_drop: { data: CapDropArr, append: true },
			container_name: { data: 'my_container' },
		};
		dc.set(srvc, conf);
		const build = await dc.composeBuild();
		expect(build).toMatchObject(RemoteBuildBAsic);
		await dc.composeUp();
		await dc.composeStart(StartConfig);
		await dc.composeStop(StopConfig);
	});
	// TODO:Deploy, and Undeploy Functions --> takes(remoteConfigs,Dockerfile, Docer-stack)
	// Exec: 1) DockerFileref build
	// Exec: 2) prepare Compose File
	// Exec: 3) deploy on remote
	// Exec: 3i) prepare image and container
	// Exec: 3ii) start, stop container
	it('#3 build app which is local into remote', async () => {
		// test scanario
		// 1) one app is existing in local data dir
		// 2) build the exact same app in remote environment and launch ut as part of the containers
		const path = `${process.cwd()}/data/nodejs_docker_web`;

		dc_1.DockerFile.setPath(`${path}/Dockerfile`)
			.setFrom('node:12')
			.setRun('mkdir -p /usr/src/app')
			.setWorkdir('/usr/src/app')
			.setCpy('package*.json ./')
			.setRun('npm install')
			.setCpy('. .')
			.setExpose('3002')
			.setCmd('node server.js')
			.toFile();
		const buildInfo = { ...serviceBuild, context: '.' };
		const conf: ISetOpts = {
			build: { data: buildInfo },
			depends_on: { data: ['traefik'], append: false },
			ports: { data: ['3002:3002'], append: true },
		};
		dc_1.set('nodejs_docker_web', conf);
		dc_1.set('traefik', { image: { data: 'traefik' } });
		dc_1.toFile(path, 'nodejs_docker_web');
		const copy = await dc_1.cp(path, 'nodejs_docker_web');
		expect(copy.stdout.includes('uploaded')).toBeTruthy();
		const up = await dc_1.composeUp();
		expect(up.join('\n').includes('Successfully built')).toBeTruthy();
		await dc_1.UnDeploy();
	});
	it('#5 Deploy in one call', (done) => {
		const path = `${process.cwd()}/data/nodejs_docker_web`;
		const df: unknown = {
			PATH: `${path}/Dockerfile`,
			FROM: 'node:12',
			RUN_1: 'mkdir -p /usr/src/app',
			WORKDIR: '/usr/src/app',
			COPY_1: 'package*.json ./',
			RUN_2: 'npm install',
			COPY_2: '. .',
			EXPOSE: '3002',
			CMD: 'node server.js',
		};
		const buildInfo = { ...serviceBuild, context: '.' };
		const conf: ISetOpts = {
			build: { data: buildInfo },
			depends_on: { data: ['traefik'], append: false },
			ports: { data: ['3002:3002'], append: true },
		};
		const dataobj = {
			nodejs_docker_web: conf,
			traefik: { image: { data: 'traefik' } },
		};
		dc_1.Deploy(df, dataobj, {
			local: path,
			remote: 'nodejs_docker_web',
		}).then(async (data) => {
			expect(data.join('\n').includes('Successfully built')).toBeTruthy();
			await dc_1.UnDeploy();
			done();
		});
	});
});
