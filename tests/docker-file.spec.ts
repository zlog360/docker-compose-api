// ts-mocha -p tsconfig.json tests/docker-file.spec.ts
import expect from 'expect';
import DockerFile from '../src/docker-file';
// ts-mocha -p tsconfig.json tests/docker-file.spec.ts
const base = {
	fp: 'tests/docker/test.dockerfile/Dockerfile',
	df: { FROM: 'ubuntu' },
};
const cp = '/tests/docker';
// const run = 'echo \'we are running some # of cool things\'';
const formObj = { platform: 'linux', image: 'redis', version: '1.0.0' };
const formObjStr = `${formObj.platform}:${formObj.image}:${formObj.version}`;
const formStr = 'redis:1.0.0';
const RUNstr = 'ls -l';
const RUNArray = ['cat syslog', 'more syslog'];
const CPYStr = 'requirements.txt /code/';
const CPYArr = ['. /code/', 'syslog syslog.1'];
// const AddStr = 'hom* /mydir/';
// const AddArr = ['test.txt relativeDir/', 'test.txt /absoluteDir/'];

// const EnvStr = 'myName John Doe';
// const EnvArr = [
//   'myDog Rex The Dog',
//   'myCat fluffy'
// ];

// const WorkDir = ['a', '/home/zeeshan/.code', 'b'];

// const ExposeStr = '80/tcp';
// const ExposeArr =  ['80/udp', '9001/tcp'];

// const Label = 'Description=\'This image is used to start the foobar executable\' Vendor=\'ACME Products\' Version=\'1.0\'';

// const StopSignal = '1';

// const HealthCheck: IHealthCheck = {
//   retries: 10,
//   interval: '30s',
//   timeout: '1m',
//   ['start-period']: '10m',
//   CMD: 'ls -l',
// };

// const user = 'patrick';

// const volStr = '/myvol';

const onbuilddata = {
	ADD: '. /app/src',
	RUN: '/usr/local/bin/python-build --dir /app/src',
	CMD: ['ls -l', 'mv syslog syslog.10'],
};

const cmd = ['mv a b', 'ls -l .', 'cp -r a b', 'chmod 777 .'];

describe('docker-file api unit tests', () => {
	const dc = new DockerFile();
	it('#1 Construction', () => {
		expect(dc).toMatchObject(base);
	});
	it('#2 setPath', () => {
		dc.setPath(cp);
		expect(dc.getPath()).toBe(cp);
		dc.setPath(base.fp);
		expect(dc.getPath()).toBe(base.fp);
	});
	it('#3 setFrom', () => {
		dc.setFrom(formObj);
		expect(dc.getFrom()).toMatchObject([formObjStr, formObjStr]);
		dc.setFrom(formStr);
		expect(dc.getFrom()).toMatchObject(['redis:1.0.0', 'redis:1.0.0']);
	});
	it('#4 setRun', () => {
		dc.setRun(RUNstr).setRun(RUNArray);
		expect(dc.getRun()).toMatchObject([RUNstr, ...RUNArray]);
	});

	it('#5 setCpy', () => {
		dc.setCpy(CPYStr).setCpy(CPYArr);
		expect(dc.getCpy()).toMatchObject([CPYStr, ...CPYArr]);
	});

	it('#6 setCpy', () => {
		dc.setCpy(CPYStr).setCpy(CPYArr);
		// expect(dc.getCpy()).toMatchObject([CPYStr, ...CPYArr]);
	});

	it('#7 setOnBuild', () => {
		dc.setOnBuild(onbuilddata);
		expect(dc.getOnBuild()).toMatchObject([
			'ADD . /app/src',
			'RUN /usr/local/bin/python-build --dir /app/src',
			'CMD ls -l\nCMD mv syslog syslog.10',
		]);
	});

	it('#8 setCmd', () => {
		dc.setCmd(cmd);
		expect(dc.getCmd()).toBe((cmd as string[]).join(' && '));
	});

	it('#i toFile', async () => {
		const rslts = await dc.toFile();
		expect(rslts).toBeTruthy();
	});
});
