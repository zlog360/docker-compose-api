import { writeFile } from 'fs';
// ts-mocha -p tsconfig.json tests/docker-file.spec.ts
import { isObjectl, isArrayl } from './util';
import { isString } from 'util';
export interface IFrom {
   platform?: string;
   image?: string;
   version?: string;
};
export interface IHealthCheck {
    interval: string;
    timeout: string;
    ['start-period']: string;
    retries: number;
    CMD: IDockerFile['CMD'];
};
export interface IOnBuild {
    RUN?: IDockerFile['RUN'];
    CMD?: IDockerFile['CMD'];
    LABEL?: IDockerFile['LABEL'];
    EXPOSE?: IDockerFile['EXPOSE'];
    ENV?: IDockerFile['ENV'];
    ADD?: IDockerFile['ADD'];
    COPY?: IDockerFile['COPY'];
    ENTRYPOINT?: IDockerFile['ENTRYPOINT'];
    VOLUME?: IDockerFile['VOLUME'];
    USER?: IDockerFile['USER'];
    WORKDIR?: IDockerFile['WORKDIR'];
    ARG?: IDockerFile['ARG'];
    STOPSIGNAL?: IDockerFile['STOPSIGNAL'];
    HEALTHCHECK?: IDockerFile['HEALTHCHECK'];
    SHELL?: IDockerFile['SHELL'];
}
export interface IDockerFile {
    PATH?: string;
    FROM?: string|IFrom;
    RUN?: string|string[];
    CMD?: string|string[];
    LABEL?: string|string[];
    MAINTAINER?: string|string[]; //deprecated
    EXPOSE?: string|string[];
    ENV?: string|string[];
    ADD?: string|string[];
    COPY?: string|string[];
    ENTRYPOINT?: string|string[];
    VOLUME?: string|string[];
    USER?: string;
    WORKDIR?: string|string[];
    ARG?: string|string[];
    ONBUILD?: string[]|IOnBuild;
    STOPSIGNAL?: string;
    HEALTHCHECK?: string|IHealthCheck;
    SHELL?: string|string[];
}

let Commands = {
    from: 'FROM',
    run: 'RUN',
    cmd: 'CMD',
    label: 'LABEL',
    maintainer: 'MAINTAINER',
    expose: 'EXPOSE',
    env:'ENV',
    add: 'ADD',
    copy: 'COPY',
    entrypoint: 'ENTRYPOINT',
    volume:'VOLUME',
    user: 'USER',
    workdir: 'WORKDIR',
    arg: 'ARG',
    onbuild: 'ONBUILD',
    stopsignal:'STOPSIGNAL',
    healthcheck:'HEALTHCHECK',
    shell: 'SHELL'
}

class  DockerFile {
    private df: IDockerFile = { FROM: 'ubuntu' };
    private keyCounter = 0;
    // order: { timestamp_FROM:[values...] }
    private order: { [key: string]: { key: string, value: string; }; } = {};
    // aliases:
    private FROM = this.setFrom;
    private RUN = this.setRun;
    private CMD = this.setCmd;
    private LABEL = this.setLabel;
    private MAINTAINER = this.setMaintainer;
    private EXPOSE = this.setExpose;
    private ENV = this.setEnv;
    private ADD = this.setAdd;
    private COPY = this.setCpy;
    private ENTRYPOINT = this.setEntrpoint;
    private VOLUME = this.setVolume;
    private USER = this.setUser;
    private WORKDIR = this.setWorkdir;
    // private ARG = this.setAr
    private ONBUILD = this.setOnBuild;    
    private STOPSIGNAL = this.setStopSignal;
    private HEALTHCHECK = this.setHealthCheck;
    private PATH = this.setPath;
    // private SHELL = this

    constructor(private fp: string = 'tests/docker/test.dockerfile/Dockerfile') {
    }
    setPath(p: string) {
        this.fp = p;
        return this;
    }
    getPath() {
        return this.fp;
    }
    clearKeyCounter() {
        this.keyCounter = 0;
    }
    setFrom(form: IDockerFile['FROM']): DockerFile {
        if (isObjectl(form)) {
           form = (form as IFrom);
           this.df.FROM = `${form.platform}:${form.image}:${form.version}`;  
        } else {
            this.df.FROM = form;
        }
        this.pushValue(Commands.from, this.df.FROM)
        return this;
    }
    getFrom(): IDockerFile['FROM'] { 
        return this.df.FROM;
    }
    pushOrderedValue(key: string, value: any) {
        const refValue = this.keyCounter++;
        this.order[refValue] = { key, value };
    }
    setRun(r: IDockerFile['RUN']): DockerFile {
        this.pushValue('RUN', r);
        return this;
    }
    getRun(): IDockerFile['RUN'] {
        return this.df.RUN;
    }
    setCpy(c: IDockerFile['COPY']) {
        this.pushValue('COPY', c);
        return this;
    }
    getCpy(): IDockerFile['COPY'] {
        return this.df.COPY;
    }
    setAdd(a: IDockerFile['ADD']) {
        this.pushValue('ADD', a);
        return this;
    }
    getAdd() {
        return this.df.ADD;
    }
    setEnv(e: IDockerFile['ENV']) {
        this.pushValue('ENV', e);
        return this;
    }
    getEnv() {
        return this.df.ENV;
    }
    setWorkdir(w: IDockerFile['WORKDIR']) {
        this.pushValue('WORKDIR', w);
        return this;
    }
    getWorkdir() {}
    setExpose(e: IDockerFile['EXPOSE']) {
        this.pushValue('EXPOSE', e);
        return this;
    }
    getExpose() {
        return this.df.EXPOSE;
    }
    setLabel(l: IDockerFile['LABEL']) {
        this.pushValue('LABEL', l);
        return this;
    }
    getLabel() {
        return this.df.LABEL;
    }
    setEntrpoint(e: IDockerFile['ENTRYPOINT']) {
        this.pushValue('ENTRYPOINT', e);
        return this;
    }
    getEntrypoint() {
        return this.df.ENTRYPOINT;
    }
    setMaintainer(m: IDockerFile['MAINTAINER']) {
        this.pushValue('MAINTAINER', m);
        return this;
    }
    getMaintainer() {
        return this.df.MAINTAINER;
    }
    setStopSignal(ss: IDockerFile['STOPSIGNAL']) {
        this.df.STOPSIGNAL = ss;
        return this;
    }
    getStopSignal() {
        return this.df.STOPSIGNAL;
    }
    setHealthCheck(hc: IDockerFile['HEALTHCHECK']) {
        if (isString(hc)) {
            this.df.HEALTHCHECK = hc;
            return this;
        }
        const { interval, timeout, retries, CMD } = (hc as IHealthCheck);
        let cmd = `HEALTHCHECK`
        if (interval.length) {
            cmd += ` --interval=${interval}`
        }
        if (timeout.length) {
            cmd += ` --timeout=${timeout}`
        }
        if (retries) {
            cmd += ` --retries=${retries}`;
        }
        cmd += '\\'
        if (CMD) {
           cmd += isArrayl(CMD) 
           ? ` CMD ${(CMD as string[]).join(' ')}` 
           : ` CMD ${CMD}`; 
        }
        this.df.HEALTHCHECK = cmd;
        return this;
    }
    getHealthCheck() {
        return this.df.HEALTHCHECK;
    }
    setUser(user: IDockerFile['USER']) {
      this.df.USER = user;
      return this;
    }
    getUser() {
        return this.df.USER;
    }
    setVolume(vol: IDockerFile['VOLUME']) {
        this.pushValue('VOLUME', vol);
        return this;
    }
    getVolume() {
        return this.df.VOLUME;
    }
    setOnBuild(onb: IDockerFile['ONBUILD']) {
        const keys = Object.keys(onb) || [];
        const fd: string[] = (keys as string[])
        .map((inst: string) => {
          let data = (onb as any)[inst];  
          if (isArrayl(data)) {
             return data.map((itr: string) => `${inst} ${itr}`).join('\n'); 
          } else {
            return `${inst} ${data}`;
          }
        });
        this.df.ONBUILD = fd;
        return this;
    }
    getOnBuild() {
        return this.df.ONBUILD;
    }
    setCmd(cmd: IDockerFile['CMD']) {
        if (isArrayl(cmd)) {
            cmd = (cmd as string[]).join(' && ')
        } else {
            cmd  = cmd;
        }
        this.pushValue('CMD', cmd);
        return this;
    }
    getCmd() {
        return this.df.CMD;
    }
    pushValue(key: string, v: any) {
        let target = (this.df as any)[key];
        if (target && !isArrayl(target)) {
            target = [target].concat(v) as string[];  
        } else if (target && isArrayl(target)) {
            if (isArrayl(v)) {
                (v as string[]).forEach(
                    i => (this.df.RUN as string[]).push(i)
                );
            } else {
                (target as string[]).push(v as string);
            }    
        } 
        (this.df as any)[key] = target || v;
        this.pushOrderedValue(key, v);
        return this;
    }
    set(opts: IDockerFile) {
        const props = Object.keys(opts);
        props.forEach((p: string) => {
            let key = p.includes("_") ? p.split("_").slice(0, 1).join("") : p;
            (this as any)[key]((opts as any)[p]);
        })
        return this;
    }
    toFile() {
       const cmds = Object.keys(this.order).sort((a, b) => parseInt(a) - parseInt(b));
       const data = cmds.map(
           (c: string) => `${this.order[c].key} ${this.order[c].value}`
       );
       return new Promise(
           (rs: any, rj: any) => 
            writeFile(this.fp, data.join('\n'), (e) => {
                if (!e) {
                    this.order = {};
                }
                return e ? rj(e) : rs(true)
            })
        );
    }
}

export default DockerFile;