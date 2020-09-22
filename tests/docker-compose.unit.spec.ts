//DEBUG=zlog360:* ts-mocha -p tsconfig.json tests/docker-compose.unit.spec.ts --timeout 100000
import expect from 'expect';
import { getPackageVersion, DockerCompose } from '../src/my-lib';
import {
  Services_List, S4_Service, serviceBuild,
  ConfigsShort, ConfigsLong, CapAddStr,
  CapAddArr, CapDropStr, CapDropArr,
  CgroupParent, ContainerName, DependsOnArr,
  DependsOnStr, Deploy, DeviceStr,
  DeviceArr, DnsStr, DnsArr,
  DnsSearchStr, DnsSearchArr,
  EntryPointStr, EntryPointArr, EnvFileStr,
  EnvFileArr, EnvironmentObj, EnvironmentArray,
  ExposeStr, ExposeArr, ExternalLinksStr,
  ExternalLinksArr, ExtraHostsArr, ExtraHostsStr,
  HealthCheck, Image, labelsObj,
  labelsArr, linksStr, linksArr,
  Logging, NetworkMode, Networks,
  NetworksObj, PID, PortStr,
  PortsArr, restart, SecretStr,
  SecretStrArr, SecretObj, SecretObjArr,
  SecOptStr, SecOptsStrArr, StopSignal,
  StopGracePeriod, SystCallsObj, SystCallArray,
  TempFsStr, TepmFsArrofStr, TempFsArroObj,
  TempFsObj, Ulimits, UserNsMode, VolumesStr,
  VolumesArr, VolumesObj, VolumesArroObj,
  CommandStr, CommandArr, ServiceAndConfig,
  ConfigRes7, ConfigOpts, cwithservice,
  cwithoutservice, DownConfig, ExecConfigs,
  ImagesConfig, KillConfig, LogsConfig,
  PauseConfig, PortConfig, PsConfig,
  ConfigRes8, PullConfig, PushConfig,
  RestartConfig, RmConfig, ScaleConfig,
  StartConfig, StopConfig, TopConfig,
  UnPauseConfig, UpConfig } from './data.service';
import { StrArrtoObj } from '../src/util';

describe('docker-compose api unit tests', () => {
  const initlist = Services_List;
  const dc = new DockerCompose({}, initlist);
  dc.setRootDir('tests/docker/zlog-compose')
  describe('#getPackageVersion()', () => {
    it('should get the package version', () => {
      const version = getPackageVersion();
      expect(version).toBe('0.0.0');
    });
  });
  describe('docker-compose class setters and getters', () => {
    it('#1 setService', () => {
      const { key, c } = S4_Service;
      initlist.push(key);
      dc.setService({key, c});
      expect(dc.getService(key)).toMatchObject(c);
    });
    it('#2 getServicesList', () => {
      expect(dc.getServicesList().length).toBe(initlist.length);
    });
    it('#3 getService', () => {
      expect(dc.getService(initlist[0])).toMatchObject({});
    });
    it('#4 getServiceConfigKey', () => {
      expect(dc.getService(S4_Service.key)).toMatchObject(S4_Service.c);
    });
    it('#5 setServiceWithConfig', () => {
      dc.setServiceWithConfig(S4_Service.key, { ...S4_Service.u });
      expect(dc.getService(S4_Service.key)).toMatchObject({ ...S4_Service.c, ...S4_Service.u });
    });
    it('#6 getServiceConfigKey', () => {
      // const orgobj = { ...S4_Service.c, ...S4_Service.u }
      // console.log(orgobj);
      // expect(dc.getServiceConfigKey(S4_Service.key, 'depends_on')).toMatchObject(orgobj.depends_on);
    });
    it('#7 setBuild', () => {
      const orgobj = serviceBuild;
      dc.setBuild({service: S4_Service.key, data: orgobj});
      expect(dc.getServiceConfigKey(S4_Service.key, 'build')).toMatchObject(orgobj);
    });
    it('#8 setConfig Short', () => {
      const orgobj = ConfigsShort;
      dc.setConfig({service: S4_Service.key, data: orgobj});
      expect(dc.getServiceConfigKey(S4_Service.key, 'configs')).toMatchObject(orgobj);
    });
    it('#9 getServsetConfig Long', () => {
      const orgobj = [ConfigsLong];
      dc.setConfig({service: S4_Service.key, data: orgobj});
      expect(dc.getServiceConfigKey(S4_Service.key, 'configs')).toMatchObject(orgobj);
    });
    it('#9 setCapAdd Str', () => {
      const orgobj = CapAddStr;
      dc.setCapAdd({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'cap_add')).toBe(orgobj);
    });
    it('#10 setCapAdd Arr', () => {
      const orgobj = CapAddArr;
      dc.setCapAdd({service: S4_Service.key, data: orgobj, append: false});
      expect(dc.getServiceConfigKey(S4_Service.key, 'cap_add')).toBe(orgobj);
    });
    it('#11 setCapDrop Str', () => {
      const orgobj = CapDropStr;
      dc.setCapDrop({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'cap_drop')).toBe(orgobj);
    });
    it('#12 setCapDrop Arr', () => {
      const orgobj = CapDropArr;
      dc.setCapDrop({service: S4_Service.key, data: orgobj, append: false});
      expect(dc.getServiceConfigKey(S4_Service.key, 'cap_drop')).toBe(orgobj);
    });
    it('#13 setCGroupParent', () => {
      const orgobj = CgroupParent;
      dc.setCGroupParent({service: S4_Service.key, data: orgobj});
      expect(dc.getServiceConfigKey(S4_Service.key, 'cgroup_parent')).toBe(orgobj);
    });
    it('#14 setContainerName', () => {
      const orgobj = ContainerName;
      dc.setContainerName({service: S4_Service.key, data: orgobj});
      expect(dc.getServiceConfigKey(S4_Service.key, 'container_name')).toBe(orgobj);
    });
    it('#15 setDependsOn Str', () => {
      const orgobj = DependsOnStr;
      dc.setDependsOn({service: S4_Service.key, data: [orgobj], append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'depends_on'))
      .toMatchObject(Array.from(new Set([...S4_Service.u.depends_on, orgobj])));
    });
    it('#16 setDependsOn Arr', () => {
      const orgobj = DependsOnArr;
      dc.setDependsOn({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'depends_on'))
      .toMatchObject(Array.from(new Set([...S4_Service.u.depends_on, ...orgobj])));
    });
    it('#17 setDeploy', () => {
      const orgobj = Deploy;
      dc.setDeploy({service: S4_Service.key, data: orgobj});
      expect(dc.getServiceConfigKey(S4_Service.key, 'deploy')).toMatchObject(orgobj);
    });
    it('#18 setDeploy', () => {
      const orgobj = Deploy;
      dc.setDeploy({service: S4_Service.key, data: orgobj});
      expect(dc.getServiceConfigKey(S4_Service.key, 'deploy')).toMatchObject(orgobj);
    });
    it('#19 setDevices str', () => {
      const orgobj = DeviceStr;
      dc.setDevices({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'devices')).toBe(orgobj);
    });
    it('#19 setDevices Arr', () => {
      const orgobj = DeviceArr;
      dc.setDevices({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'devices')).toMatchObject([DeviceStr,...orgobj]);
    });
    it('#20 setDns Str', () => {
      const orgobj = DnsStr;
      dc.setDns({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'dns')).toBe(orgobj);
    });
    it('#21 setDns Arr', () => {
      const orgobj = DnsArr;
      dc.setDns({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'dns')).toMatchObject([DnsStr,...orgobj]);
    });
    it('#22 setDnsSearch Str', () => {
      const orgobj = DnsSearchStr;
      dc.setDnsSearch({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'dns_search')).toBe(orgobj);
    });
    it('#23 setDnsSearch Arr', () => {
      const orgobj = DnsSearchArr;
      dc.setDnsSearch({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'dns_search')).toMatchObject([DnsSearchStr,...orgobj]);
    });
    it('#24 setEntryPoint Str', () => {
      const orgobj = EntryPointStr;
      dc.setEntryPoint({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'entrypoint')).toBe(EntryPointStr);
    });
    it('#25 setEntryPoint Arr', () => {
      const orgobj = EntryPointArr;
      dc.setEntryPoint({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'entrypoint')).toMatchObject([EntryPointStr, ...EntryPointArr]);
    });
    it('#26 setEnvFile Str', () => {
      const orgobj = EnvFileStr;
      dc.setEnvFile({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'env_file')).toBe(EnvFileStr);
    });
    it('#27 setEnvFile Arr', () => {
      const orgobj = EnvFileArr;
      dc.setEnvFile({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'env_file')).toMatchObject([EnvFileStr, ...EnvFileArr]);
    });
    it('#28 setEnvironment Obj', () => {
      const orgobj = EnvironmentObj;
      dc.setEnvironment({service: S4_Service.key, data: orgobj});
      expect(dc.getServiceConfigKey(S4_Service.key, 'environment')).toBe(orgobj);
    });
    it('#29 setEnvironment Arr', () => {
      const orgobj = EnvironmentArray;
      dc.setEnvironment({service: S4_Service.key, data: orgobj});
      expect(dc.getServiceConfigKey(S4_Service.key, 'environment')).toMatchObject(orgobj);
    });
    it('#30 setExpose Str', () => {
      const orgobj = ExposeStr;
      dc.setExpose({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'expose')).toBe(orgobj);
    });
    it('#31 setExpose Str', () => {
      const orgobj = ExposeArr;
      dc.setExpose({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'expose')).toMatchObject([ExposeStr,...orgobj]);
    });
    it('#32 setExternalLinks Str', () => {
      const orgobj = ExternalLinksStr;
      dc.setExternalLinks({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'external_links')).toBe(orgobj);
    });
    it('#33 setExternalLinks Str', () => {
      const orgobj = ExternalLinksArr;
      dc.setExternalLinks({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'external_links')).toMatchObject([ExternalLinksStr ,...orgobj]);
    });
    it('#34 setExtraHosts Str', () => {
      const orgobj = ExtraHostsStr;
      dc.setExtraHosts({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'extra_hosts')).toBe(orgobj);
    });
    it('#35 setExtraHosts Arr', () => {
      const orgobj = ExtraHostsArr;
      dc.setExtraHosts({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getServiceConfigKey(S4_Service.key, 'extra_hosts')).toMatchObject([ExtraHostsStr,...orgobj]);
    });
    it('#37 setHealthCheck', () => {
      const orgobj = HealthCheck;
      dc.setHealthCheck({service: S4_Service.key, data: orgobj});
      expect(dc.getServiceConfigKey(S4_Service.key, 'healthcheck')).toMatchObject(orgobj);
    });
    it('#38 setImage', () => {
      const orgobj = Image;
      dc.setImage({service: S4_Service.key, data: orgobj});
      expect(dc.getServiceConfigKey(S4_Service.key, 'image')).toBe(orgobj);
    });
    it('#39 setInit', () => {
      const orgobj = true;
      dc.setInit({service: S4_Service.key, data: orgobj});
      expect(dc.getServiceConfigKey(S4_Service.key, 'init')).toBe(orgobj);
    });

    it('#40 setInit', () => {
      const orgobj = true;
      dc.setInit({service: S4_Service.key, data: orgobj});
      expect(dc.getServiceConfigKey(S4_Service.key, 'init')).toBe(orgobj);
    });

    it('#41 setIsolation', () => {
      const orgobj = 'process';
      dc.setIsolation({service: S4_Service.key, data: orgobj});
      expect(dc.getServiceConfigKey(S4_Service.key, 'isolation')).toBe(orgobj);
    });

    it('#42 setLabels Obj', () => {
      const orgobj = labelsObj;
      dc.setLabels({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getLabels(S4_Service.key)).toBe(orgobj);
    });

    it('#43 setLabels Arr', () => {
      const orgobj = labelsArr;
      dc.setLabels({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getLabels(S4_Service.key)).toMatchObject({...StrArrtoObj(orgobj), ...labelsObj});
    });
    it('#44 setLinks Str', () => {
      const orgobj = linksStr;
      dc.setLinks({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getLinks(S4_Service.key)).toBe(orgobj);
    });
    it('#45 setLinks Arr', () => {
      const orgobj = linksArr;
      dc.setLinks({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getLinks(S4_Service.key)).toMatchObject([linksStr, ...linksArr]);
    });
    it('#46 setLogging Arr', () => {
      const orgobj = Logging;
      dc.setLogging({service: S4_Service.key, data: orgobj});
      expect(dc.getLogging(S4_Service.key)).toMatchObject(orgobj);
    });
    it('#47 setNetworkMode', () => {
      const orgobj = NetworkMode;
      dc.setNetworkMode({service: S4_Service.key, data: orgobj});
      expect(dc.getNetworkMode(S4_Service.key)).toBe(orgobj);
    });
    it('#48 setNetwork ArrOfStr', () => {
      const orgobj = Networks;
      dc.setNetwork({service: S4_Service.key, data: orgobj});
      expect(dc.getNetwork(S4_Service.key)).toBe(orgobj);
    });
    it('#48 setNetwork Obj', () => {
      const orgobj = NetworksObj;
      dc.setNetwork({service: S4_Service.key, data: orgobj});
      expect(dc.getNetwork(S4_Service.key)).toBe(orgobj);
    });
    it('#49 setPid', () => {
      const orgobj = PID;
      dc.setPid({service: S4_Service.key, data: orgobj});
      expect(dc.getPid(S4_Service.key)).toBe(orgobj);
    });

    it('#50 setPort Str', () => {
      const orgobj = PortStr;
      dc.setPort({service: S4_Service.key, data: [orgobj], append: true});
      expect(dc.getPort(S4_Service.key)).toBe(orgobj);
    });

    it('#51 setPort Arr', () => {
      const orgobj = PortsArr;
      dc.setPort({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getPort(S4_Service.key)).toMatchObject([PortStr,...orgobj]);
    });

    it('#52 setRestart', () => {
      const orgobj = restart[0];
      dc.setRestart({service: S4_Service.key, data: orgobj});
      expect(dc.getRestart(S4_Service.key)).toBe(orgobj);
    });
    it('#53 setSecret Str', () => {
      const orgobj = SecretStr;
      dc.setSecret({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getSecret(S4_Service.key)).toBe(orgobj);
    });
    it('#53 setSecret Str Arr', () => {
      const orgobj = SecretStrArr;
      dc.setSecret({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getSecret(S4_Service.key)).toMatchObject([SecretStr,...orgobj]);
    });
    it('#54 setSecret Obj', () => {
      const orgobj = SecretObj;
      dc.setSecret({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getSecret(S4_Service.key)).toMatchObject([SecretStr, ...SecretStrArr,orgobj]);
    });
    it('#55 setSecret Obj Arr', () => {
      const orgobj = SecretObjArr;
      dc.setSecret({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getSecret(S4_Service.key)).toMatchObject([SecretStr, ...SecretStrArr, SecretObj,...orgobj]);
    });
    it('#56 setSecurityOpts Str', () => {
      const orgobj = SecOptStr;
      dc.setSecurityOpts({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getSecurityOpts(S4_Service.key)).toBe(orgobj);
    });
    it('#57 setSecurityOpts Str Arr', () => {
      const orgobj = SecOptsStrArr;
      dc.setSecurityOpts({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getSecurityOpts(S4_Service.key)).toMatchObject([SecOptStr,...orgobj]);
    });

    it('#58 setStopSignal', () => {
      const orgobj = StopSignal;
      dc.setStopSignal({service: S4_Service.key, data: orgobj});
      expect(dc.getStopSignal(S4_Service.key)).toBe(orgobj);
    });

    it('#59 setStopGracePeriod', () => {
      const orgobj = StopGracePeriod;
      dc.setStopGracePeriod({service: S4_Service.key, data: orgobj});
      expect(dc.getStopGracePeriod(S4_Service.key)).toBe(orgobj);
    });

    it('#60 setStopGracePeriod', () => {
      const orgobj = StopGracePeriod;
      dc.setStopGracePeriod({service: S4_Service.key, data: orgobj});
      expect(dc.getStopGracePeriod(S4_Service.key)).toBe(orgobj);
    });

    it('#61 setSysctls Obj', () => {
      const orgobj = SystCallsObj;
      dc.setSysctls({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getSysctls(S4_Service.key)).toBe(orgobj);
    });

    it('#62 setSysctls Arr', () => {
      const orgobj = SystCallArray;
      dc.setSysctls({service: S4_Service.key, data: orgobj, append: false});
      expect(dc.getSysctls(S4_Service.key)).toMatchObject({...SystCallsObj,...StrArrtoObj(orgobj)});
    });

    it('#63 setTempFs Str', () => {
      const orgobj = TempFsStr;
      dc.setTempFs({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getTempFs(S4_Service.key)).toBe(orgobj);
    });
    it('#64 setTempFs Str Arr', () => {
      const orgobj = TepmFsArrofStr;
      dc.setTempFs({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getTempFs(S4_Service.key)).toMatchObject([TempFsStr,...orgobj]);
    });
    it('#65 setTempFs Obj', () => {
      const orgobj = TempFsObj;
      dc.setTempFs({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getTempFs(S4_Service.key)).toMatchObject([TempFsStr, ...TepmFsArrofStr, orgobj]);
    });
    it('#66 setTempFs Arr of Obj', () => {
      const orgobj = TempFsArroObj;
      dc.setTempFs({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getTempFs(S4_Service.key)).toMatchObject([TempFsStr, ...TepmFsArrofStr, TempFsObj,...orgobj]);
    });
    it('#67 setUlimits', () => {
      const orgobj = Ulimits;
      dc.setUlimits({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getUlimits(S4_Service.key)).toMatchObject(Ulimits);
    });
    it('#68 setUserNsMode', () => {
      const orgobj = UserNsMode;
      dc.setUserNsMode({service: S4_Service.key, data: orgobj});
      expect(dc.getUserNsMode(S4_Service.key)).toBe(orgobj);
    });
    it('#69 setVolume Str', () => {
      const orgobj = VolumesStr;
      dc.setVolume({service: S4_Service.key, data: [orgobj], append: true});
      expect(dc.getVolume(S4_Service.key)).toBe(orgobj);
    });
    it('#70 setVolume Arr', () => {
      const orgobj = VolumesArr;
      dc.setVolume({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getVolume(S4_Service.key)).toMatchObject([VolumesStr,...orgobj]);
    });
    it('#71 setVolume Obj', () => {
      const orgobj = VolumesObj;
      dc.setVolume({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getVolume(S4_Service.key)).toMatchObject([VolumesStr, ...VolumesArr,orgobj]);
    });
    it('#72 setVolume Obj Arr', () => {
      const orgobj = VolumesArroObj;
      dc.setVolume({service: S4_Service.key, data: orgobj, append: true});
      expect(dc.getVolume(S4_Service.key)).toMatchObject([VolumesStr, ...VolumesArr, VolumesObj, ...orgobj]);
    });
    it('#73 setCommand Str', () => {
      const orgobj = CommandStr;
      dc.setCommand({service: S4_Service.key, data: orgobj});
      expect(dc.getCommand(S4_Service.key)).toBe(orgobj);
    });
    it('#74 setCommand Arr', () => {
      const orgobj = CommandArr;
      dc.setCommand({service: S4_Service.key, data: orgobj});
      expect(dc.getCommand(S4_Service.key)).toBe(orgobj);
    });
    it('#75 Integration tests composeBuild Empty', async () => {
      const data = await dc.composeBuild();
      expect(data.join('\n').includes('Successfully')).toBeTruthy();
  });
  it('#76 Integration tests composeBuild Service', async () => {
      const data = await dc.composeBuild({service: 'web'});
      expect(data.join('\n').includes('Successfully')).toBeTruthy();
  });
  it('#77 Integration tests composeBuild Service && Configs', async () => {
      const data = await dc.composeBuild(ServiceAndConfig);
      expect(data.join('\n').includes('Successfully')).toBeTruthy();
  });
  it('#78 Integration tests composeConfig Empty', async () => {
      const data = await dc.composeConfig();
      expect(data).toMatchObject(ConfigRes7);
  });
  it('#79 Integration tests composeConfig Config', async () => {
      const data = await dc.composeConfig(ConfigOpts);
      expect(data.join('\n').includes('cadvisor')).toBeTruthy();
  });
  it('#80 Integration tests composeCreate Empty', async () => {
      await dc.composeCreate();
      // expect(data).toEqual(CreateSuccess);
  });
  it('#81 Integration tests composeCreate Service Config', async () => {
      const data = await dc.composeCreate(cwithservice);
      expect(data.length > 1).toBeTruthy();
  });
  it('#82 Integration tests composeCreate Service Without Config', async () => {
      const data = await dc.composeCreate(cwithoutservice);
      expect(data.join('\n').includes('Successfully')).toBeTruthy();
  });
  it('#83 Integration tests composeDown Empty', async () => {
      const data = await dc.composeDown();
      expect(data.includes('done')).toBeTruthy();
  });

  it('#84 Integration tests composeDown Config', async () => {
      await dc.composeDown(DownConfig);
      // expect(data.includes('done')).toBeTruthy();
  });

  // it('#14 Integration tests composeEvents Config', async () => {
  //     const data = await dc.composeEvents(EventConfig);
  //     console.log('data --------> ',data);
  //     // expect(data.includes('done')).toBeTruthy();
  // });

  it('#85 Integration tests composeExec Config', async () => {
      await dc.composeExec(ExecConfigs);
      // console.log('data ---------------> ', data);
      // expect(data.includes('done')).toBeTruthy();
  });
  it('#86 Integration tests composeExec Config', async () => {
      const data = await dc.compseImages();
      expect(data.length > 0).toBeTruthy();
  });
  it('#87 Integration tests composeExec Config', async () => {
      const data = await dc.compseImages(ImagesConfig);
      expect(data.length > 0).toBeTruthy();
  });

  it('#88 Integration tests composeKill', async () => {
      await dc.composeKill(KillConfig);
      // expect(data.length > 0).toBeTruthy();
  });

  it('#89 Integration tests composeLogs', async () => {
      const data = await dc.composeLogs(LogsConfig);
      expect(data.length > 0).toBeTruthy();
  });

  it('#90 Integration tests composePause', async () => {
      const data = await dc.composePause(PauseConfig);
      expect(data.length > 0).toBeTruthy();
  });

  it('#91 Integration tests composePorts', async () => {
      const data = await dc.composePorts(PortConfig);
      expect(data.length > 0).toBeTruthy();
  });

  it('#92 Integration tests composePorts', async () => {
      const data = await dc.composePorts(PortConfig);
      expect(data.length > 0).toBeTruthy();
  });

  it('#93 Integration tests composePs', async () => {
      const data = await dc.composePs(PsConfig);
      expect(data).toMatchObject(ConfigRes8);
  });

  it('#94 Integration tests composePull', async () => {
      const data = await dc.composePull(PullConfig);
      expect(data.length > 0).toBeTruthy();
  });
  it('#95 Integration tests composePush', async () => {
      await dc.composePush(PushConfig);
      // expect(data.length > 0).toBeTruthy();
  });

  it('#96 Integration tests composeRestart', async () => {
      const data = await dc.composeRestart(RestartConfig);
      expect(data.length > 0).toBeTruthy();
  });
  it('#97 Integration tests composeRm', async () => {
      const data = await dc.composeRm(RmConfig);
      expect(data.length > 0).toBeTruthy();
  });
  // Failing the test because of timeout at 25000
  // it('#98 Integration tests composeRun', async () => {
  //     const data = await dc.composeRun(RunConfig);
  //     expect(data.join('\n').includes('Successfully built')).toBeTruthy();
  //     return true;
  // });
  it('#99 Integration tests composeRun', async () => {
      const data = await dc.composeScale(ScaleConfig);
      expect(data.length > 0).toBeTruthy();
  });
  it('#100 Integration tests composeStart', async () => {
      const data = await dc.composeStart(StartConfig);
      expect(data.length > 0).toBeTruthy();
  });
  it('#101 Integration tests composeStop', async () => {
      const data = await dc.composeStop(StopConfig);
      expect(typeof data).toBe('string');
  });
  it('#102 Integration tests composeTop', async () => {
      const data = await dc.composeTop(TopConfig);
      expect(typeof data).toBe('string');
  });

  it('#103 Integration tests composeUnPause', async () => {
      const data = await dc.composeUnPause(UnPauseConfig);
      expect(typeof data).toBe('string');
  });
  it('#104 Integration tests composeUp', async () => {
      const data = await dc.composeUp(UpConfig);
      expect(typeof data).toBe('string');
  });
  it('#105 Integration tests setRootD', async () => {
      dc.setRootDir('test');
      expect(dc.getRootDir()).toBe('test');
  });
  });
});
