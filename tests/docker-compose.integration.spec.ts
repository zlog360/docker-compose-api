// DEBUG=zlog360:* ts-mocha -p tsconfig.json tests/docker-compose.integration.spec.ts --timeout 100000
import expect from 'expect';
import { DockerCompose, ISetOpts } from '../src';
import {
	Services_List,
	serviceBuild,
	ConfigsShort,
	CapAddStr,
	CapDropArr,
	CgroupParent,
	ContainerName,
	DependsOnStr,
	Deploy,
	DeviceStr,
	DnsArr,
	DnsSearchArr,
	EntryPointArr,
	EnvFileArr,
	ExposeArr,
	ExternalLinksArr,
	ExtraHostsArr,
	ExtraHostsStr,
	HealthCheck,
	Image,
	labelsObj,
	labelsArr,
	linksStr,
	linksArr,
	Logging,
	NetworkMode,
	Networks,
	PortStr,
	PortsArr,
	restart,
	SecretStr,
	SecOptsStrArr,
	StopSignal,
	StopGracePeriod,
	SystCallArray,
	TempFsArroObj,
	Ulimits,
	UserNsMode,
	VolumesArr,
	CommandArr,
	isolation,
	PauseConfig,
	RmConfig,
	StartConfig,
	StopConfig,
	UpConfig,
} from './data.service';
import { StrArrtoObj } from '../src/util';
// import { doesNotMatch } from 'assert';

describe('docker-compose api unit tests', () => {
	const initlist = Services_List;
	const dc = new DockerCompose({}, initlist);
	it('#1 Integration tests with set', () => {
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
		expect(dc.getBuild(srvc)).toMatchObject(serviceBuild);
		expect(dc.getConfig(srvc)).toMatchObject(ConfigsShort);
		expect(dc.getCGroupParent(srvc)).toBe(CgroupParent);
		expect(dc.getCapAdd(srvc)).toBe(CapAddStr);
		expect(dc.getCapDrop(srvc)).toMatchObject(CapDropArr);
		expect(dc.getContainerName(srvc)).toBe(conf.container_name.data);
	});
	it('#2 Integration tests with chaining', () => {
		const srvc = 's13';
		dc.setCurrentService(srvc)
			.setBuild({ data: serviceBuild })
			.setConfig({ data: ConfigsShort })
			.setCGroupParent({ data: CgroupParent })
			.setCapAdd({ data: CapAddStr, append: true })
			.setIsolation({ data: isolation[0] })
			.setCapDrop({ data: CapDropArr, append: true })
			.setContainerName({ data: ContainerName })
			.setDependsOn({ data: [DependsOnStr], append: true })
			.setDeploy({ data: Deploy })
			.setDevices({ data: DeviceStr, append: true })
			.setDns({ data: DnsArr, append: true })
			.setDnsSearch({ data: DnsSearchArr, append: true })
			.setEntryPoint({ data: EntryPointArr, append: true })
			.setEnvFile({ data: EnvFileArr, append: true })
			.setExpose({ data: ExposeArr, append: true })
			.setExternalLinks({ data: ExternalLinksArr, append: true })
			.setExtraHosts({ data: ExtraHostsArr, append: true })
			.setExtraHosts({ data: ExtraHostsStr, append: true })
			.setHealthCheck({ data: HealthCheck })
			.setImage({ data: Image })
			.setLabels({ data: labelsObj, append: true })
			.setLabels({ data: labelsArr, append: true })
			.setLinks({ data: linksArr, append: true })
			.setLogging({ data: Logging })
			.setLinks({ data: linksStr, append: true })
			.setNetworkMode({ data: NetworkMode })
			.setNetwork({ data: Networks })
			.setPid({ data: '123' })
			.setPort({ data: [PortStr], append: true })
			.setRestart({ data: restart[0] })
			.setPort({ data: PortsArr, append: true })
			.setSecret({ data: SecretStr, append: true })
			.setSecurityOpts({ data: SecOptsStrArr, append: true })
			.setStopSignal({ data: StopSignal })
			.setStopGracePeriod({ data: StopGracePeriod })
			.setSysctls({ data: SystCallArray, append: true })
			.setTempFs({ data: TempFsArroObj, append: true })
			.setUlimits({ data: Ulimits, append: true })
			.setUserNsMode({ data: UserNsMode })
			.setVolume({ data: VolumesArr, append: true })
			.setCommand({ data: CommandArr })
			.setInit({ data: true });

		expect(dc.getBuild(srvc)).toMatchObject(serviceBuild);
		expect(dc.getCGroupParent(srvc)).toBe(CgroupParent);
		expect(dc.getCapAdd(srvc)).toBe(CapAddStr);
		expect(dc.getInit(srvc)).toBeTruthy();
		expect(dc.getCommand(srvc)).toMatchObject(CommandArr);
		expect(dc.getVolume(srvc)).toMatchObject(VolumesArr);
		expect(dc.getUserNsMode(srvc)).toBe(UserNsMode);
		expect(dc.getUlimits(srvc)).toMatchObject(Ulimits);
		expect(dc.getTempFs(srvc)).toBe(TempFsArroObj);
		expect(dc.getSysctls(srvc)).toMatchObject(StrArrtoObj(SystCallArray));
		expect(dc.getInit(srvc)).toBe(true);
		expect(dc.getStopGracePeriod(srvc)).toBe(StopGracePeriod);
		expect(dc.getStopSignal(srvc)).toBe(StopSignal);
		expect(dc.getStopSignal(srvc)).toBe(StopSignal);
		expect(dc.getSecurityOpts(srvc)).toBe(SecOptsStrArr);
		expect(dc.getSecret(srvc)).toBe(SecretStr);
		expect(dc.getPort(srvc)).toMatchObject([PortStr, ...PortsArr]);
		expect(dc.getRestart(srvc)).toBe(restart[0]);
		expect(dc.getPid(srvc)).toBe('123');
		expect(dc.getNetwork(srvc)).toBe(Networks);
		expect(dc.getNetworkMode(srvc)).toBe(NetworkMode);
		expect(dc.getLinks(srvc)).toMatchObject([...linksArr]);
		expect(dc.getLogging(srvc)).toMatchObject(Logging);
		expect(dc.getLabels(srvc)).toBeTruthy();
		expect(dc.getImage(srvc)).toBe(Image);
		expect(dc.getHealthCheck(srvc)).toMatchObject(HealthCheck);
		expect(dc.getExtraHosts(srvc)).toMatchObject([...ExtraHostsArr]);
		expect(dc.getExpose(srvc)).toMatchObject(ExposeArr);
		expect(dc.getExpose(srvc)).toMatchObject(ExposeArr);
		expect(dc.getExternalLinks(srvc)).toMatchObject(ExternalLinksArr);
		expect(dc.getEnvFile(srvc)).toMatchObject(EnvFileArr);
		expect(dc.getEntryPoint(srvc)).toMatchObject(EntryPointArr);
		expect(dc.getDnsSearch(srvc)).toMatchObject(DnsSearchArr);
		expect(dc.getDns(srvc)).toMatchObject(DnsArr);
		expect(dc.getDevices(srvc)).toBe(DeviceStr);
		expect(dc.getDeploy(srvc)).toMatchObject(Deploy);
		expect(dc.getDependsOn(srvc)).toMatchObject([DependsOnStr]);
		expect(dc.getContainerName(srvc)).toBe(ContainerName);
		expect(dc.getCapDrop(srvc)).toBe(CapDropArr);
		expect(dc.getConfig(srvc)).toBe(ConfigsShort);
		expect(dc.getIsolation(srvc)).toBe(isolation[0]);
	});
	it('#3 Integration tests with setters to build, create, and remove', async () => {
		dc.DockerFile.setPath('tests/docker/zlog-compose/Dockerfile')
			.setFrom('python:3')
			.setEnv('PYTHONUNBUFFERED 1')
			.setRun('mkdir /code')
			.setWorkdir('/code')
			.setCpy('requirements.txt /code/')
			.setRun('pip install -r requirements.txt')
			.setCpy('. /code/')
			.setRun('python manage.py migrate')
			.toFile();
		dc.clear()
			.setRootDir('tests/docker/zlog-compose')
			.setCurrentService('web')
			.setBuild({ data: '.' })
			.setCommand({ data: 'python manage.py runserver 0.0.0.0:8004' })
			.setVolume({ data: ['.:/code'], append: true })
			.setPort({ data: ['8004:8000'], append: true })
			.setDependsOn({ data: ['db'], append: true })
			.setCurrentService('traefik')
			.setImage({ data: 'traefik' })
			.setCurrentService('cadvisor')
			.setImage({ data: 'google/cadvisor' })
			.setCurrentService('db')
			.setImage({ data: 'postgres' })
			.setEnvironment({
				data: [
					'POSTGRES_DB=postgres',
					'POSTGRES_USER=postgres',
					'POSTGRES_PASSWORD=postgres',
				],
			});
		const toFile = await dc.toFile(
			'tests/docker/zlog-compose/docker-compose.yaml'
		);
		expect(toFile).toBeTruthy();
		const build = await dc.composeBuild();
		expect(build.join('\n').includes('Successfully built')).toBeTruthy();
		const create = await dc.composeCreate();
		// const start = await dc.composeStart({ service: 'db' });
		// const stop = await dc.composeStart({ service: 'db' });
		// const rm = await dc.composeRm();
		console.log('create ------> ', create);
	});
	it('#4 Integration tests with toFile with simple set', async () => {
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
		const rsponse = await dc.toFile();
		expect(rsponse).toBeTruthy();
	});
	// create, start, stop, remove
	it('#5 check docker-compose flow', async () => {
		const df1 = await dc.composeCreate();
		await dc.composeStart(StartConfig);
		await dc.composeStop(StopConfig);
		await dc.composeStart(StartConfig);
		await dc.composePause(PauseConfig);
		const df6 = await dc.composeRm(RmConfig);
		await dc.composeUp(UpConfig);
		expect(df1.length > 0).toBeTruthy();
		expect(df6).toMatchObject(['Going to remove zlog-compose_web_1']);
	});
});
