// ts-mocha -p tsconfig.json tests/commander.spec.ts
import expect from 'expect';
import { Commander, ISSHConfigs } from '../src';
// import DockerFile, { IHealthCheck } from '../src/docker-file';
import { LsLocal } from './data.service';
import { existsSync, mkdirSync, rmdirSync } from 'fs';

const config: ISSHConfigs = {
	host: '192.168.0.95',
	port: 22,
	username: 'dockeruser',
	password: 'emallates123#',
};
// const stdout = require('mute-stdout');
// stdout.mute();

describe('commander api unit tests', () => {
	const remoteCmd = new Commander(config);
	const localCmd = new Commander();
	describe('Remote Ssh', () => {
		it('#1 Construction', () => {
			expect(remoteCmd.sshConfig).toBeTruthy();
		});
		it('#2 set shCommand', () => {
			remoteCmd.shCommand = 'ls .';
			expect(remoteCmd.shCommand).toBe('ls .');
		});
		it('#3 exec', async () => {
			remoteCmd.shCommand = 'ls .';
			const { stdout } = await remoteCmd.exec();
			expect(stdout.length > 0).toBeTruthy();
		});
		it('#4 ls without path', async () => {
			await remoteCmd.ls();
			// expect(stdout.split('\n')).toMatchObject([
			//   'a',
			//   'b',
			//   'c',
			//   'composeexample',
			//   'db.sqlite3',
			//   'dmltest.moved',
			//   'docker-compose.yaml',
			//   'Dockerfile',
			//   'manage.py',
			//   'requirements.txt',
			//   ''
			// ]);
		});
		it('#5 ls with path', async () => {
			await remoteCmd.ls('.');
			// expect(stdout).toBe('d\n');
		});
		it('#6 cp', async () => {
			const path =
				'/home/zeeshan/work_space/zlogjs-modules/docker-compose-api/tests/docker/test-dir';
			const np = 'dmltest.moved';
			const { stdout } = await remoteCmd.cp(path, np);
			expect(stdout.includes('uploaded')).toBeTruthy();
		});
		// now add more tests then finish with this project yayyyyyy
		it('#7 mkdir', async () => {
			const path = 'efghii/abic/deif';
			// const np = 'efghi.moved';
			const data = await remoteCmd.mkdir(path);
			expect(!data).toBe(false);
		});
		it('#8 exists', async () => {
			const path = 'efghii/abic/deif';
			const data = await remoteCmd.exists(path);
			expect(!data).toBe(false);
		});
		it('#9 rm', async () => {
			const path = 'efghii/abic/deif';
			const exists = await remoteCmd.exists(path);
			if (!exists) {
				await remoteCmd.mkdir(path);
			}
			const data = await remoteCmd.rm(path);
			expect(!data).toBe(false);
		});
		it('#10 mv', async () => {
			const path = 'efghi/abc/def';
			const np = 'efghi.moved';
			const exists = await remoteCmd.exists(path);
			if (!exists) {
				await remoteCmd.mkdir(path);
			}
			const data = await remoteCmd.mv(path, np);
			expect(!data).toBe(false);
		});
	});
	describe('Local Shell', () => {
		it('#1 Construction', () => {
			expect(!localCmd.sshConfig).toBeTruthy();
		});
		it('#2 set shCommand', () => {
			localCmd.shCommand = 'ls .';
			expect(localCmd.shCommand).toBe('ls .');
		});
		it('#3 exec', async () => {
			localCmd.shCommand = 'ls .';
			const data = await localCmd.exec();
			expect(data.code).toBe(0);
			expect(!data.stderr.length).toBeTruthy();
			expect(data.stdout.length > 0).toBeTruthy();
		});
		it('#4 ls without path', async () => {
			const { stdout } = await localCmd.ls();
			expect(stdout.split('\n')).toMatchObject(LsLocal);
		});
		it('#5 ls with path', async () => {
			await localCmd.ls('/home/zeeshan');
			// expect(stdout.split('\n')).toMatchObject(LSLocalPath);
		});
		it('#6 mv', async () => {
			const path =
				'/home/zeeshan/work_space/zlogjs-modules/docker-compose-api/tests/docker/test-dir/dmltest';
			const np =
				'/home/zeeshan//work_space/zlogjs-modules/docker-compose-api/tests/docker/test-dir/dmltest.moved';
			if (existsSync(np)) {
				rmdirSync(np);
			}
			if (existsSync(path)) {
				rmdirSync(path);
			}
			mkdirSync(path);
			const { code } = await localCmd.mv(path, np);
			expect(!code).toBeTruthy();
		});
		it('#7 cp', async () => {
			const path =
				'/home/zeeshan/work_space/zlogjs-modules/docker-compose-api/tests/docker/test-dir';
			const np =
				'/home/zeeshan//work_space/zlogjs-modules/docker-compose-api/tests/docker/test-dir.moved';
			if (existsSync(np)) {
				rmdirSync(np, { recursive: true });
			}
			const { code } = await localCmd.cp(path, np);
			expect(!code).toBeTruthy();
		});
		it('#8 rm', async () => {
			const path =
				'/home/zeeshan/work_space/zlogjs-modules/docker-compose-api/tests/docker/test-dir.moved.1';
			if (!existsSync(path)) {
				mkdirSync(path);
			}
			const { code } = await localCmd.rm(path);
			expect(!code).toBeTruthy();
		});
	});
});
