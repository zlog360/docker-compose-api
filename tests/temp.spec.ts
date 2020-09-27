//DEBUG=zlog360:*,docker-compose:commander ts-mocha -p tsconfig.json tests/temp.spec.ts --timeout 100000 --trace-warnings
import expect from 'expect';
import { DockerCompose, ISetOpts } from '../src/my-lib';
import {
  serviceBuild, ConfigsShort, CapAddStr,
  CapDropArr, CgroupParent,
  StartConfig, StopConfig, RemoteBuildBAsic
} from './data.service';
// import { StrArrtoObj } from '../src/util';
import { IDockerFile } from '../src/docker-file';

describe('docker-compose api remote unit tests', () => {
  // const initlist = Services_List;
  const dc = new DockerCompose({}, undefined, undefined, 'a', {
      host: '192.168.0.94',
      port: 22,
      username: 'dockeruser',
      password: 'emallates123#'
  });
  it('#1 DockerCompose Scale',async () =>{
    const data = await dc.composeScale({ serviceArray: ["traefik=3 web=2"] })
    // expect(data.length > 0).toBeTruthy();
  });
});
