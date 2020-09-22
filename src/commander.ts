// cls && DEBUG=docker-compose:commander ts-mocha -p tsconfig.json tests/commander.spec.ts --timeout 3000
import shelljs from "shelljs";

const { Client } = require("ssh2");
let SFTP = require('ssh2-sftp-client');

export interface ISSHConfigs {
    host: string;
    port: number;
    username: string;
    password?: string;
    privateKey? : string;
}

export interface IResponse {
    stderr: string;
    stdout: string;
    code: number;
}

// Base Commander will be distributed later on in a base-providor package
export abstract class BaseCommander {
  abstract shCmd: string;
  abstract shell: any;  
  abstract set shCommand(cmd: string);
  abstract get shCommand(): string;
  abstract ls(): Promise<IResponse>;
  abstract mv(o: string, n: string): Promise<IResponse>;
  abstract cp(op: string,np: string): Promise<IResponse>;
  abstract rm(p: string): Promise<IResponse>;
  abstract exec(): void;
}


const logger = require("debug")("docker-compose:commander");
// TODO: 1) add ssh access in Commander
// TODO: 2) mv, cp from local to remote
// TODO: 3) list, remove from remote or target host
export class Commander extends BaseCommander {
    shCmd: string = '';
    shell: any = shelljs;
    sshShell: any;
    sftp: any;
    constructor(public sshConfig?: ISSHConfigs) {
        super();
        if (this.sshConfig) {
            this.sshShell = new Client();
            this.sftp = new SFTP();
        }
        
    }    
    set shCommand(cmd: string) {
    //    if (!this.shCommand.length) {
        //    this.shCmd = cmd;
    //    }
    //    else {
           this.shCmd = cmd;
    //    }
    }
    get shCommand(): string {
       return this.shCmd; 
    }
    clearCmd(): void {
        this.shCommand = '';
    }

    ls(p?: string): Promise<IResponse> {
        this.shCommand = `/bin/ls ${p || '.'}`;
        return this.exec();
    }
    async mkdir(name: string) {
        this.shCommand = `mkdir -p ${name}`;
        return this.exec();
    }
    async exists(name: string): Promise<IResponse|boolean> {
        try {
            if (this.sshConfig) {
                await this.sftp.connect(this.sshConfig);
                const res = await this.sftp.exists(name);
                this.sftp.end();
                return res;
            } else {
                this.shCommand = `[ -d "${name}" ] && echo "true"`;
                const { stdout } = await this.exec();
                return stdout.length ? true : false;
            }
        }
        catch(e) {
            return { stderr: e, code: 0, stdout: '' };
        }
    }
    async mv(op: string,np: string): Promise<IResponse> {
        this.shCommand = `mv ${op} ${np}`;
        return this.exec(); 
    }
    async cp(op: string,np: string): Promise<IResponse> {
        try {
            if (!this.sshConfig) {
                this.shCommand = `cp -r ${op} ${np}`;
                return this.exec();
            } else {
                await this.sftp.connect(this.sshConfig)
                const res = await this.sftp.uploadDir(op,np)
                this.sftp.end();
                return { stdout: res, code: 0, stderr: '' };
            }
        } catch(e) {
            return { stdout: '', code: 0, stderr: e };
        }
    }
    rm(p: string): Promise<IResponse> {
        this.shCommand = `rm -r ${p}`;
        return this.exec();
    }
    exec(command: string = this.shCommand, opts?: any/* = {async: true}*/, shell = this.sshShell): Promise<any> {
        logger(`Executing Command: ${command}`);
        if (this.sshShell) {
           return new Promise((rs: any, rj: any) => {
               let finalData: any[] = [];
               let errorData: string;
                shell
                .on("ready", () => {
                    logger('Client :: ready');
                    shell.exec(command, (err: any, stream: any) => {
                        if (err) return rj(err);
                        stream.on('close', (code: number, signal: any) => {
                            logger('Stream :: close :: code: ' + code + ', signal: ' + signal);
                            shell.end();
                            if (errorData && !finalData.length)
                                return rj({ code: code || signal, stdout: '', stderr: errorData })
                            else 
                                return rs({ code: code || signal, stdout: finalData.join("\n"), stderr: '' })
                        }).on('data', (data: any) => {
                            logger('STDOUT: ' + data);
                            finalData.push(data.toString());
                        })
                        .stderr.on('data', (data: any) => {
                            logger('STDERR: ' + data);
                            errorData = !data.includes("Building") && !data.includes("Creating") && !data.includes("Starting")
                            ? data.toString() : undefined;
                        });
                    });
                })
                .connect(this.sshConfig)
           });
        } else
           return this.shell.exec(command, opts);          
    }
}