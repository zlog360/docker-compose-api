//DEBUG=zlog360:*,docker-compose:commander ts-mocha -p tsconfig.json tests/docker-compose.remote.spec.ts --timeout 100000 --trace-warnings
import expect from 'expect';
import { getPackageVersion, DockerCompose, ISetOpts } from '../src/my-lib';
import { SDATA, Services_List, S4_Service, serviceBuild, ConfigsShort, ConfigsLong, CapAddStr, CapAddArr, CapDropStr, CapDropArr, CgroupParent, ContainerName, DependsOnArr, DependsOnStr, Deploy, DeviceStr, DeviceArr, DnsStr, DnsArr, DnsSearchStr, DnsSearchArr, EntryPointStr, EntryPointArr, EnvFileStr, EnvFileArr, EnvironmentObj, EnvironmentArray, Expose, ExposeStr, ExposeArr, ExternalLinksStr, ExternalLinksArr, ExtraHostsArr, ExtraHostsStr, HealthCheck, Image, labelsObj, labelsArr, linksStr, linksArr, Logging, NetworkMode, Networks, NetworksObj, PID, PortStr, PortsArr, restart, SecretStr, SecretStrArr, SecretObj, SecretObjArr, SecOptStr, SecOptsStrArr, StopSignal, StopGracePeriod, SystCallsObj, SystCallArray, TempFsStr, TepmFsArrofStr, TempFsArroObj, TempFsObj, Ulimits, UserNsMode, VolumesStr, VolumesArr, VolumesObj, VolumesArroObj, CommandStr, CommandArr, ServiceAndConfig, ConfigRes7, ConfigOpts, cwithservice, cwithoutservice, DownConfig, ExecConfigs, ImagesConfig, KillConfig, LogsConfig, PauseConfig, PortConfig, PsConfig, ConfigRes8, PullConfig, PushConfig, RestartConfig, RmConfig, ScaleConfig, StartConfig, StopConfig, TopConfig, UnPauseConfig, UpConfig, RemoteBuildBAsic } from './data.service';
import { StrArrtoObj } from '../src/util';

describe('docker-compose api remote unit tests', () => {
  const initlist = Services_List;
  const dc = new DockerCompose({}, undefined, undefined, 'a', {
      host: "192.168.0.94",
      port: 22,
      username: "dockeruser",
      password: "emallates123#"
  });
  it("#1 Constrcutor", () => 
    expect(dc).toHaveProperty("sshConfig")
  );
  it('#2 Integration tests with set', async () => {
        const srvc = "s12";
        const conf: ISetOpts = { 
            build: { data: serviceBuild },  
            configs: {data: ConfigsShort},
            cgroup_parent: { data: CgroupParent },
            cap_add: { data: CapAddStr, append: true },
            cap_drop: { data: CapDropArr, append: true },
            container_name: { data: "my_container" }   
        };
        dc.set(srvc, conf);
        const build = await dc.composeBuild();
        expect(build).toMatchObject(RemoteBuildBAsic);
        await dc.composeUp();
        await dc.composeStart(StartConfig);
        await dc.composeStop(StopConfig);
    });
});