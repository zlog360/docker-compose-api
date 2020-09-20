// ts-mocha -p tsconfig.json tests/commander.spec.ts
import expect from 'expect';
import { Commander, ISSHConfigs } from '../src/my-lib';
import DockerFile, { IHealthCheck } from "../src/docker-file";
import { CommanderExecKeys, LsLocal, LSLocalPath } from './data.service';
import { existsSync, mkdir, mkdirSync, rmdirSync } from 'fs';

const config: ISSHConfigs = {
   host: "192.168.0.95",
   port: 22,
   username: "dockeruser",
   password: "emallates123#"
}
const stdout = require('mute-stdout');
// stdout.mute();

describe('commander api unit tests', () => {
  const remoteCmd = new  Commander(config);
  const localCmd = new Commander();
  describe("Remote Ssh", ()=> {
      it("#1 Construction", () => {
          expect((remoteCmd as any).sshConfig).toBeTruthy();
      });
      it("#2 set shCommand", () => {
        remoteCmd.shCommand = "ls .";
        expect(remoteCmd.shCommand).toBe("ls .");    
      });
      it("#3 exec", async () => {
        remoteCmd.shCommand = "ls .";
        const { stdout, code } = await remoteCmd.exec();
        expect(stdout.length > 0).toBeTruthy();
      });
      it("#4 ls without path", async () => {
        const { stderr, stdout, code } = await remoteCmd.ls();
        expect(stdout.split("\n")).toMatchObject([
          'a',
          'b',
          'c',
          'composeexample',
          'db.sqlite3',
          'dmltest.moved',
          'docker-compose.yaml',
          'Dockerfile',
          'manage.py',
          'requirements.txt',
          ''
        ]);
      });
      it("#5 ls with path", async () => {
        const { stderr, stdout, code } = await remoteCmd.ls('.');
        // expect(stdout).toBe('d\n');
      });
      it("#6 cp", async () => {
            const path = "/home/zeeshan/work_space/zlogjs-modules/docker-compose-api/tests/docker/test-dir";
            const np = "dmltest.moved";
            const { stdout } = await remoteCmd.cp(path, np);
            expect(stdout.includes('uploaded')).toBeTruthy();
      });
      it("#6 mv", async () => {
        const path = "/home/zeeshan/work_space/zlogjs-modules/docker-compose-api/tests/docker/test-dir";
        const np = "dmltest.moved";
        const { stdout } = await remoteCmd.cp(path, np);
        expect(stdout.includes('uploaded')).toBeTruthy();
      });
  });
//   describe("Local Shell", () => {
//     it("#1 Construction", () => {
//         expect(!(localCmd as any).sshConfig).toBeTruthy();
//     });
//     it("#2 set shCommand", () => {
//         localCmd.shCommand = "ls .";
//         expect(localCmd.shCommand).toBe("ls .");    
//     });
//     it("#3 exec", async () => {
//         localCmd.shCommand = "ls .";
//         const data = await localCmd.exec();
//         expect(data.code).toBe(0);
//         expect(!data.stderr.length).toBeTruthy();
//         expect(data.stdout.length > 0).toBeTruthy();
//     });
//     it("#4 ls without path", async () => {
//         const { stderr, stdout, code } = await localCmd.ls();
//         expect(stdout.split("\n")).toMatchObject(LsLocal);
//     });
//     it("#5 ls with path", async () => {
//         const { stderr, stdout, code } = await localCmd.ls('/home/zeeshan');
//         expect(stdout.split("\n")).toMatchObject(LSLocalPath);
//     });
//     it("#6 mv", async () => {
//         const path = "/home/zeeshan/work_space/zlogjs-modules/docker-compose-api/tests/docker/test-dir/dmltest";
//         const np = "/home/zeeshan//work_space/zlogjs-modules/docker-compose-api/tests/docker/test-dir/dmltest.moved";
//         if (existsSync(np)) {
//           rmdirSync(np);
//         }
//         if (existsSync(path)) {
//           rmdirSync(path);
//         }
//         mkdirSync(path);
//         const { code } = await localCmd.mv(path, np);
//         expect(!code).toBeTruthy();
//     });
//     it("#7 cp", async () => {
//         const path = "/home/zeeshan/work_space/zlogjs-modules/docker-compose-api/tests/docker/test-dir";
//         const np = "/home/zeeshan//work_space/zlogjs-modules/docker-compose-api/tests/docker/test-dir.moved";
//         if (existsSync(np)) {
//           rmdirSync(np, { recursive: true });
//         }
//         const { code } = await localCmd.cp(path, np);
//         expect(!code).toBeTruthy();
//     });
//     it("#8 rm", async () => {
//         const path = "/home/zeeshan/work_space/zlogjs-modules/docker-compose-api/tests/docker/test-dir.moved.1";
//         if (!existsSync(path)) {
//           mkdirSync(path);
//         }
//         const { code } = await localCmd.rm(path);
//         expect(!code).toBeTruthy();
//     });
//   });
})