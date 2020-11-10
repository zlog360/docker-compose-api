// cls && DEBUG=docker-compose:commander ts-mocha -p tsconfig.json tests/commander.spec.ts --timeout 3000
import shelljs from 'shelljs';

import { Client } from 'ssh2';
import SFTP from 'ssh2-sftp-client';
import debug from 'debug';

export interface ISSHConfigs {
	host: string;
	port: number;
	username: string;
	password?: string;
	privateKey?: string;
}

export interface IResponse {
	stderr: string;
	stdout: string;
	code: number;
}

// Base Commander will be distributed later on in a base-providor package
export abstract class BaseCommander {
	abstract shCmd: string;
	abstract shell: unknown;
	abstract set shCommand(cmd: string);
	abstract get shCommand(): string;
	abstract ls(): Promise<IResponse>;
	abstract mv(o: string, n: string): Promise<IResponse>;
	abstract cp(op: string, np: string): Promise<IResponse>;
	abstract rm(p: string): Promise<IResponse>;
	abstract exec(): void;
}

const logger = debug('docker-compose:commander');
// TODO: 1) add ssh access in Commander
// TODO: 2) mv, cp from local to remote
// TODO: 3) list, remove from remote or target host
export class Commander extends BaseCommander {
	shCmd = '';
	rp = '';
	shell = shelljs;
	sshShell: Client;
	sftp: SFTP;
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
	set remotePath(rp: string) {
		this.rp = rp;
	}
	get remotePath(): string {
		return this.rp;
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
	async exists(name: string): Promise<IResponse | boolean> {
		try {
			if (this.sshConfig) {
				await this.sftp.connect(this.sshConfig);
				const res = await this.sftp.exists(name);
				this.sftp.end();
				return res as boolean;
			} else {
				this.shCommand = `[ -d "${name}" ] && echo "true"`;
				const { stdout } = await this.exec();
				return stdout.length ? true : false;
			}
		} catch (e) {
			return { stderr: e, code: 0, stdout: '' };
		}
	}
	async mv(op: string, np: string): Promise<IResponse> {
		this.shCommand = `mv ${op} ${np}`;
		return this.exec();
	}
	async cp(op: string, np: string): Promise<IResponse> {
		try {
			if (!this.sshConfig) {
				this.shCommand = `cp -r ${op} ${np}`;
				return this.exec();
			} else {
				const exists = await this.exists(np);
				if (!exists) {
					await this.mkdir(np);
				}
				await this.sftp.connect(this.sshConfig);
				const res = await this.sftp.uploadDir(op, np);
				this.sftp.end();
				return { stdout: res, code: 0, stderr: '' };
			}
		} catch (e) {
			return { stdout: '', code: 0, stderr: e };
		}
	}
	rm(p: string): Promise<IResponse> {
		this.shCommand = `rm -r ${p}`;
		return this.exec();
	}
	exec(
		command: string = this.shCommand,
		opts?: unknown /* = {async: true}*/,
		shell = new Client()
	): Promise<IResponse> {
		logger(`Executing Command: ${command}`);
		if (this.sshConfig) {
			return new Promise((rs, rj) => {
				const finalData: unknown[] = [];
				let errorData: string;
				shell
					.on('ready', () => {
						logger('Client :: ready');
						shell.exec(command, (err, stream) => {
							if (err) return rj(err);
							stream
								.on('close', (code: number, signal: number) => {
									logger(
										'Remote:Stream :: close :: code: ' +
											code +
											', signal: ' +
											signal
									);
									shell.end();
									if (errorData && !finalData.length)
										return rj({
											code: code || signal,
											stdout: '',
											stderr: errorData,
										});
									else
										return rs({
											code: code || signal,
											stdout: finalData.join('\n'),
											stderr: '',
										});
								})
								.on('data', (data: unknown) => {
									logger('Remote:STDOUT: ' + data);
									finalData.push(data.toString());
								})
								.stderr.on('data', (data: string) => {
									logger('Remote:STDERR: ' + data);
									errorData =
										!data.includes('Building') &&
										!data.includes('Creating') &&
										!data.includes('Starting') &&
										!data.includes('Stopping')
											? data.toString()
											: undefined;
								});
						});
					})
					.connect(this.sshConfig);
			});
		} else return Promise.resolve(this.shell.exec(command, opts));
	}
}
