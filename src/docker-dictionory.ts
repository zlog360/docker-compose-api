export const BASE_FLAGS = {
    file: {flag: "--file", deli: " ", value: true }, 
    f: {flag: "-f", deli: " ", value: true }, 
    service: { flag:"", value: true, deli: " " },
}
export const BASE_QUIET_FLAGS = {
    q: { flag:"-q", deli:" ", value: false }, 
    quiet: { flag: "--quiet", deli: " ", value: false },
}
export const BUILD_FLAGS = {
    ...{
        parallel: { flag: "--parallel", deli: " ", value: false }, 
        progress: { flag: "--progress", deli: " ", value: true } , 
        pull: { flag: "--pull", deli: " ", value: false }, 
        m: { flag: "-m", deli: " ", value: true }, 
        memory: { flag: "--memory", deli: " ", value: true }, 
        compress: { flag: "--compress", deli: " ", value: false },
        ["build-arg"]: { flag: "--build-arg", deli:" ", value: true },
        ["no-cache"]: { flag: "--no-cache", value: false },
        ["no-rm"]: { flag: "--no-rm", value: false },
        ["force-rm"]: { flag: "--force-rm", value: false }
    },
    ...BASE_FLAGS,
    ...BASE_QUIET_FLAGS    
};

export const CONFIG_FLAGS = {
    ["resolve-image-digests"]: { flag: "--resolve-image-digests", value: false, deli: " " },
    ["no-interpolate"]: { flag: "--no-interpolate", value: false, deli: " " },
    services: { flag: "--services", value: false, deli: " " },
    volumes: { flag: "--volumes", value: false, deli: " " },
    hash: { flag: "--hash", value: true, deli: "=" },
}

export const CREATE_FLAGS = {
    ["force-recreate"]: { flag: "--force-recreate", deli: " ", value: false },
    ["no-recreate"]: { flag: "--no-recreate", deli: " ", value: false },
    ["no-build "]: { flag: "--no-build", deli: " ", value: false },
    build: { flag: "--build ", deli: " ", value: false },
    service: BASE_FLAGS.service
};

export const DOWN_FLAGS = {
    rmi: { flag: "--rmi", deli: " ", value: true }, //all, local
    v: { flag: "-v", deli: " ", value: false },
    volumes: { flag: "--volumes", deli: " ", value: false },
    ["remove-orphans"]: { flag: "--remove-orphans", deli: " ", value: false},
    t: { flag: "-t", deli:" ", value: true },
    timeout: { flag: "--timeout", deli: " ",  value: true }
};
export const EVENTS_FLAGS = {
    service: { flag:"", value: true, deli: " " },
    json: { flag: "--json", deli: " ", value: true },
};
export const EXEC_FLAGS = {
    d: { flag: "-d", value: false, deli: " " },
    detach: { flag: "--detach", value: false, deli: " " },
    privileged: { flag: "--privileged", value: false, deli: " " },
    u: { flag: "-u", value: true, deli: " " },
    user: { flag: "--user", value: true, deli: " " },
    index: { flag: "--index", value: true, deli: "=" },
    e: { flag: "-e", value: true, deli: " " },
    env: { flag: "--env", value: true, deli: " " },
    w: { flag: "-w", value: true, deli: " " },
    workdir: { flag: "--workdir", value: true, deli: " " },
    serviceCommand: { flag:"", value: true, deli: "" }
};
export const IMAGES_FLAGS = {
    ...BASE_QUIET_FLAGS,
    service: BASE_FLAGS.service
};
export const KILL_FLAGS = {
    service: BASE_FLAGS.service,
    s: { flag: '-s', deli: " ", value: true }
};
export const LOGS_FLAGS = {
    ["no-color"]: { flag: "--no-color", value: false, deli:" " },
    f: { flag: "-f", value: false, deli: " " },
    follow: { flag: "--follow", value: false, deli: " " },
    t: { flag: "-t", value: false, deli: " " },
    timestamps: { flag: "--timestamps", value: false, deli: " " },
    tail: { flag: "--tail", value: true, deli: "=" }, 
};
export const PAUSE_FLAGS = {
    service: BASE_FLAGS.service
};
export const PORT_FLAGS = {
    service: BASE_FLAGS.service,
    private_port: { flag: "", value: true, deli: " " },
    protocol: { flag: "--protocol", value: true, deli: " " },
    index: { flag: "--index", value: true, deli: "=" },
};
export const PS_FLAGS = {
    ...BASE_QUIET_FLAGS,
    ... {
        service: BASE_FLAGS.service,
        services: { flag: "--services", deli: " ", value: false },
        filter: { flag: "--filter", deli: " ", value: true },
        a: { flag:"-a", value: false, deli: " " },
        all: { flag:"--all", value: false, deli: " " },
    }
};
export const PULL_FLAGS = {
    ...BASE_QUIET_FLAGS,
    service: BASE_FLAGS.service,
    "ignore-pull-failures": { flag: "--ignore-pull-failures", value: false, deli: " " },
    "no-parallel": { flag: "--no-parallel", value: false, deli: " " },
    "parallel": { flag: "--parallel", value: false, deli: " " },
    "include-deps": { flag: "--include-deps", value: false, deli: " " },
};
export const PUSH_FLAGS = {
    service: BASE_FLAGS.service,
    "ignore-push-failures": { flag: "--ignore-push-failures", value: false, deli: " " },
};
export const RESTART_FLAGS = {
    service: BASE_FLAGS.service,
    t: { flag: "-t", value: true, deli: " " },
    timeout: { flag: "timeout", value: true, deli: " " },
};
export const RM_FLAGS = {
    service: BASE_FLAGS.service,
    f: { flag: "-f", value: false, deli: " " },
    force: { flag: "--force", value: false, deli: " " },
    s: { flag: "-s", value: false, deli: " " },
    stop: { flag: "--stop", value: false, deli: " " },
    v: { flag: "-v", value: false, deli: " " },
    a: { flag: "-a", value: false, deli: " " },
    all: { flag: "--all", value: false, deli: " " },
};  
export const RUN_FLAGS = {
    d: { flag: "-d", value: false, deli: " " },
    detach: { flag: "--detach", value: false, deli: " " },
    name: { flag: "--name", deli: " ", value: true },
    entrypoint: { flag: "--entrypoint", deli: " ", value: true },
    e: { flag: "-e", deli: " ", value: true },
    l: { flag: "-l", deli: " ", value: true },
    label: { flag: "--label", deli: " ", value: true },
    u: { flag: "-u", value: true, deli: "=" },
    user: { flag: "--user", value: true, deli: "=" },
    ["no-deps"]: { flag: "--no-deps", value: false, deli: " " },
    rm: { flag: "--rm", value: false, deli: " "},
    p: { flag: "-p", value: true, deli: "=" },
    publish: { flag: "--publish", value: true, deli: "=" },
    ["service-ports"]: { flag: "--service-ports", value: false, deli: " " },
    ["use-aliases"]: { flag: "--use-aliases", value: false, deli: " " },
    v: { flag: "-v", value: true, deli: "=" },
    volumes: { flag: "--volumes", value: false, deli: " " },
    T: { flag: "-T", value: false, deli: " " },
    w: { flag: "-w", value: true, deli: " " },
    workdir: { flag: "--workdir", value: true, deli: " " },
    service: { flag: "", value: true, deli: "" },
    serviceCommand: { flag:"", value: true, deli: "" },
    args: { flag:"", value: true, deli: ""}
};
export const SCALE_FLAGS = {
    serviceArray: { flag: "", value: true, deli:" " }, //web=2 worker=3
    t: { flag: "-t", deli:" ", value: true },
    timeout: { flag: "--timeout", deli: " ",  value: true }
};
export const START_FLAGS = {
    service: BASE_FLAGS.service,
};
export const STOP_FLAGS= {
    service: BASE_FLAGS.service,
    t: { flag: "-t", deli:" ", value: true },
    timeout: { flag: "--timeout", deli: " ",  value: true }
};
export const TOP_FLAGS = {
    service: BASE_FLAGS.service,
};
export const UNPAUSE_FLAGS = {
    service: BASE_FLAGS.service,
};
export const UP_FLAGS = {
    d: { flag: "-d", value: false, deli: " " },
    detach: { flag: "--detach", value: false, deli: " " },
    ["no-color"]: { flag: "--no-color", value: false, deli:" " },
    ["quiet-pull"]: { flag: "--quiet-pull", value: false, deli:" " },
    ["no-deps"]: { flag: "--no-deps", value: false, deli: " " },
    ["force-recreate"]: { flag: "--force-recreate", deli: " ", value: false },
    ["always-recreate-deps"]: { flag: "--always-recreate-deps ", deli: " ", value: false },
    ["no-recreate"]: { flag: "--no-recreate ", deli: " ", value: false },
    ["no-build "]: { flag: "--no-build", deli: " ", value: false },
    ["no-start"]: { flag: "--no-start", deli: " ", value: false },
    build: { flag: "--build ", deli: " ", value: false },
    ["abort-on-container-exit"]: { flags: "--abort-on-container-exit", deli: " ", value: false },
    ["attach-dependencies"]: { flags: "--attach-dependencies", deli:" ", value: false },
    t: { flag: "-t", deli:" ", value: true },
    timeout: { flag: "--timeout", deli: " ",  value: true },
    V: { flag: "-V", deli: " ",  value: false },
    ["renew-anon-volumes"]: { flag: "--renew-anon-volumes", deli: " ",  value: false },
    ["remove-orphans"]: { flag: "--remove-orphans", deli: " ",  value: false },
    ["exit-code-from"]: { flag: "--exit-code-from", deli: " ",  value: true },
    ["scale"]: { flag: "--scale", deli: " ",  value: true },
};
export const VERSION_FLAGS = {};

export const Dictionory = {
   actions: {
       build: { flags: BUILD_FLAGS, key: 'build' },
       config: { flags: BUILD_FLAGS, key: 'config' },
       create: { flags: CREATE_FLAGS, key: 'create' },
       down: { flags: DOWN_FLAGS, key: 'down' },
       events: { flags: EVENTS_FLAGS, key: 'events' },
       exec: { flags: EXEC_FLAGS, key: 'exec' },
       images: { flags: IMAGES_FLAGS, key: 'images' },
       kill: { flags: KILL_FLAGS, key: 'kill' },
       logs: { flags: LOGS_FLAGS, key: "logs" },
       pause: { flags: PAUSE_FLAGS, key: "pause" },
       port: { flags: PORT_FLAGS, key: "port" },
       ps: { flags: PS_FLAGS, key: "ps" },
       pull: { flags: PULL_FLAGS, key: "pull"},
       push: { flags: PUSH_FLAGS, key: "push"},
       // should start test cases from here
       restart: { flags: RESTART_FLAGS, key: "restart" },
       rm: { flags: RM_FLAGS, key: "rm" },
       run: { flags: RUN_FLAGS, key: "run" },
       scale: { flags: SCALE_FLAGS, key: "scale" },
       start: { flags: START_FLAGS, key: "start" },
       stop: { flags: STOP_FLAGS, key: "stop" },
       top: { flags: TOP_FLAGS, key: "top" },
       unpause: { flags: UNPAUSE_FLAGS, key: "unpause" },
       up: { flags: UP_FLAGS, key: "up" }
   },
   list: () => Object.keys(Dictionory.actions),
   add: (key: string, data: any) => { (Dictionory.actions as any)[key] = data; },
   get: (key: string) => (Dictionory.actions as any)[key],
   remove: (key: string) => delete (Dictionory as any).actions[key]
}