export const SDATA = [
    {
        webapp: {
            build: "src"
        }
    }
]

export const Services_List = ["s1", "s2", "s3"];
export const S4_Service = {
    key: "s4",
    c: { command: "exec 123" },
    u: { depends_on: ["abc", "cde", "fgh"] }
};


export const serviceBuild = {
    context: "./dir",
    dockerfile: "Dockerfile-alternate",
    args:{
        buildno: 1
    }
};

export const ConfigsShort = {
    my_config: {
      file: "./my_config.txt"
    },
    my_other_config: {
      external: true
    }
}

export const ConfigsLong = [{
    source: "my_config",
    target: "/redis_config",
    uid: '103',
    gid: '103',
    mode: "0440"
}];

export const isolation = ["default", "process", "hyperv"]

export const CapAddStr = "ALL"
export const CapAddArr = ["ALL", "NET"];

export const CapDropStr = "ALL"
export const CapDropArr = ["ALL", "NET"];

export const CgroupParent = "m-executor-abcd"

export const ContainerName = "nats";

export const DependsOnStr = "nats";
export const DependsOnArr = ["nats", "redis"];


export const Deploy = {
    replicas: 6,
    placement: {
      max_replicas_per_node: 1
    },
    update_config: {
      parallelism: 2,
      delay: "10s"
    },
    restart_policy: {
      condition: "on-failure"
    }
};

export const DeviceStr = "/dev/ttyUSB0:/dev/ttyUSB0"

export const DeviceArr = ["/dev/ttyUSB2:/dev/ttyUSB1223", "/dev/ttyUSB1:/dev/ttyUSB1222"]

export const DnsStr = "0.0.0.0"

export const DnsArr = ["8.8.8.8", "9.9.9.9"];


export const DnsSearchStr = "example.com"

export const DnsSearchArr = ["dc1.example.com", "dc2.example.com"];


export const EntryPointStr = "/code/entrypoint.sh"

export const EntryPointArr = ["php", "-d", "memory_limit=-1", "vendor/bin/phpunit"];


export const EnvFileStr = ".env"

export const EnvFileArr = ["./common.env", "./apps/web.env", "/opt/runtime_opts.env"];

export const EnvironmentObj = {
    RACK_ENV: "development",
    SHOW: 'true',
    SESSION_SECRET: {}
}

export const EnvironmentArray = [
  "RACK_ENV=development",
  "SHOW=true",
  "SESSION_SECRET"
];

export const ExposeStr = "9000"
export const ExposeArr = [
   "3000",
   "8000"
];

export const ExternalLinksStr = "redis_1"
export const ExternalLinksArr = [
    "redis_2",
    "project_db_1:mysql",
    "project_db_1:postgresql"
];

export const ExtraHostsStr = "somehost:162.242.195.82"
export const ExtraHostsArr = [
    "somehostI:162.242.195.95",
    "otherhost:50.31.209.229"
];

export const HealthCheck = {
    test: ["CMD", "curl", "-f", "http://localhost"],
    interval: "1m30s",
    timeout: "10s",
    retries: 3,
    start_period: "40s"
};

export const Image = "example-registry.com:4000/postgresql";

export const labelsObj = {
    "com.example.description": "Accounting webapp",
    "com.example.department": "Finance",
    "com.example.label-with-empty-value": ""
}

export const labelsArr = [
    "com.example.description.1=Accounting webapp",
    "com.example.department.1=Finance",
    "com.example.label-with-empty-value.1"
]


export const linksStr = "db-mongo";

export const linksArr = [
    "db",
    "db:database",
    "redis"
];

export const Logging = {
    driver: "syslog",
    options: {
        "syslog-address": "tcp://192.168.0.42:123",
        "max-size": "200k",
        "max-file": "10"
    }
};

export const NetworkMode = "bridge";

export const Networks = [
    "some-network-a",
    "some-network-b"
];

export const NetworksObj = {
    "some-network": {
        aliases:[
          "alias1",
          "alias3"
        ],
        app_net: {
          "ipv4_address": "172.16.238.10",
          "ipv6_address": "2001:3984:3989::10"
        }
    },
    "other-network": {
        "aliases": ["alias2"]
    }
}

export const PID = "235468987"

export const PortStr = "9000";

export const PortsArr = [
    "3000",
    "3000-3005",
    "8000:8000",
    "9090-9091:8080-8081",
    "49100:22",
    "127.0.0.1:8001:8001",
    "127.0.0.1:5000-5010:5000-5010",
    "6060:6060/udp",
    "12400-12500:1240",
    {    target: 80,
        published: 8080,
        protocol: "tcp",
        mode: "host"
    }
];

export const restart = [
    "no",
    "always",
    "on-failure",
    "unless-stopped"
];


export const SecretStr = "my_secret_1"
export const SecretStrArr = [
    "my_secret",
    "my_other_secret"
]
export const SecretObj = {
    my_secret: {
      file: "./my_secret.txt"
    },
    my_other_secret: {
      external: true
    }
}
export const SecretObjArr = [{
    source: "my_secret",
    target: "redis_secret",
    uid: '103',
    gid: '103',
    mode: parseInt("0440")
}]


export const SecOptStr = "label:USER:Admin";

export const SecOptsStrArr = [
    "label:user:USER",
    "label:role:ROLE"
]

export const StopSignal = "SIGUSR1";

export const StopGracePeriod = "1s";

export const SystCallsObj  = {
    "net.core.somaxconn": 1024,
    "net.ipv4.tcp_syncookies": 0
}

export const SystCallArray = [
   "net.core.somaxconn.1=1024",
   "net.ipv4.tcp_syncookies.1=0"
];



export const TempFsStr = "/run";

export const TepmFsArrofStr = ["/run1", "/tmp"];

export const TempFsObj = {
    type: "tmpfs",
    target: "/app",
    tmpfs:{
      size: 1000
    }
}

export const TempFsArroObj = [
    {
        type: "tmpfs",
        target: "/app123456",
        tmpfs:{
          size: 10000
        }
    }
];

export const Ulimits = {
    nproc: 65535,
    nofile: { 
        soft: 20000,
        hard: 40000
    }
};

export const UserNsMode = "host";

export const VolumesStr = "/var/run/postgres/postgres.sock:/var/run/postgres/postgres.sock";

export const VolumesArr = [
   "/var/lib/mysql",
  "/opt/data:/var/lib/mysql",
  "./cache:/tmp/cache",
  "~/configs:/etc/configs/:ro",
  "datavolume:/var/lib/mysql"
]

export const VolumesObj = {
    type: "bind",
    source: "./static",
    target: "/opt/app/static"
}

export const VolumesArroObj = [
    {
        type: "volume",
        source: "mydata",
        target: "/data",
        volume:{
          nocopy: true
        }
    },
    {
        type: "volume",
        source: "mydata1",
        target: "/data1",
        volume: {
          nocopy: true
        }
    }
]

export const CommandStr  = "bundle exec thin -p 3000";

export const CommandArr = ["bundle", "exec", "thin", "-p", "3000"];




export const Services  = [{
    service: "db",
    image: "postgres",
    environment: [
        "POSTGRES_DB=postgres",
        "POSTGRES_USER=postgres",
        "POSTGRES_PASSWORD=postgres"
    ],
},  
{
    service: "web",
    build: ".",
    command: "python manage.py runserver 0.0.0.0:8004",
    volumes: "- .:/code",
    ports: ["8004:8000"],
    depends_on: ["db"]
}
];


export const buildResponse = [
    'Step 1/8 : FROM python:3',
    ' ---> 28a4c88cdbbf',
    'Step 2/8 : ENV PYTHONUNBUFFERED 1',
    ' ---> Using cache',
    ' ---> 63d653e9e17f',
    'Step 3/8 : RUN mkdir /code',
    ' ---> Using cache',
    ' ---> 386a8607acc0',
    'Step 4/8 : WORKDIR /code',
    ' ---> Using cache',
    ' ---> 98b8babbde1c',
    'Step 5/8 : COPY requirements.txt /code/',
    ' ---> Using cache',
    ' ---> 8bea96e6ec0c',
    'Step 6/8 : RUN pip install -r requirements.txt',
    ' ---> Using cache',
    ' ---> be1db0211edc',
    'Step 7/8 : COPY . /code/',
    ' ---> Using cache',
    ' ---> 8e39008f06af',
    'Step 8/8 : RUN python manage.py migrate',
    ' ---> Using cache',
    ' ---> cd9235bb6120',
    'Successfully built cd9235bb6120',
    'Successfully tagged docker_web:latest'
  ]

  export const buildResponse5 = [
    'Step 1/8 : FROM python:3',
    ' ---> 28a4c88cdbbf',
    'Step 2/8 : ENV PYTHONUNBUFFERED 1',
    ' ---> Using cache',
    ' ---> 63d653e9e17f',
    'Step 3/8 : RUN mkdir /code',
    ' ---> Using cache',
    ' ---> 386a8607acc0',
    'Step 4/8 : WORKDIR /code',
    ' ---> Using cache',
    ' ---> 98b8babbde1c',
    'Step 5/8 : COPY requirements.txt /code/',
    ' ---> Using cache',
    ' ---> 8bea96e6ec0c',
    'Step 6/8 : RUN pip install -r requirements.txt',
    ' ---> Using cache',
    ' ---> be1db0211edc',
    'Step 7/8 : COPY . /code/',
    ' ---> Using cache',
    ' ---> 8e39008f06af',
    'Step 8/8 : RUN python manage.py migrate',
    ' ---> Using cache',
    ' ---> cd9235bb6120',
    'Successfully built cd9235bb6120',
    'Successfully tagged docker_web:latest'
  ];

  export const swithcRes = [
    "Step 1/8 : FROM python:3",
    "3: Pulling from library/python",
    "Digest: sha256:c7853c950ced571d51987ba48ba5153c640ae78794639891806e03e57a321439",
    "Status: Image is up to date for python:3",
    " ---> 28a4c88cdbbf",
    "Step 2/8 : ENV PYTHONUNBUFFERED 1",
    " ---> Using cache",
    " ---> 63d653e9e17f",
    "Step 3/8 : RUN mkdir /code",
    " ---> Using cache",
    " ---> 386a8607acc0",
    "Step 4/8 : WORKDIR /code",
    " ---> Using cache",
    " ---> 98b8babbde1c",
    "Step 5/8 : COPY requirements.txt /code/",
    " ---> Using cache",
    " ---> 8bea96e6ec0c",
    "Step 6/8 : RUN pip install -r requirements.txt",
    " ---> Using cache",
    " ---> be1db0211edc",
    "Step 7/8 : COPY . /code/",
    " ---> Using cache",
    " ---> 8e39008f06af",
    "Step 8/8 : RUN python manage.py migrate",
    " ---> Using cache",
    " ---> cd9235bb6120",
    "Successfully built cd9235bb6120",
    "Successfully tagged docker_web:latest",
  ]

  export const CreateSuccess = "The create command is deprecated. Use the up command with the --no-start flag instead.\n"


  export const PushConfig = {
      service: "web",
      "ignore-push-failure": true
  }
  export const RestartConfig = {
      service: "web",
      t: 15000
  };

  export const RmConfig = {
      service: "web",
      f: true,
      s: true,
      v: true,
      a: true
  }

  export const RunConfig = {
      detach: true,
      name: "container-docker-compose",
      e: "Key1=Value1,Key2=Value2",
      label: "label=hi,label2=bye",
      u: "zeeshan",
      ["no-deps"]: true,
      service: "web",
    //   "servcieCommand": "ls syslog"
  };

  export const StartConfig = {
      service: "web",
  }
  export const StopConfig = {
     service: "web"
  }
  export const TopConfig = {
    service: "db"
 }
 export const UnPauseConfig = {
    service: "db"
 }
 export const UpConfig = {
     scale: "web=2 cadvisor=1",
     "remove-orphans": true,
     "no-build": true,
     "no-color": true,
     "exit-code-from": "web",
 }
  export const ScaleConfig = {
      t: 10,
      serviceArray: "web=2 cadvisor=2"
  }
  export const Config11 = ["Step 1/8 : FROM python:3", " ---> 28a4c88cdbbf", "Step 2/8 : ENV PYTHONUNBUFFERED 1", " ---> Using cache", " ---> 63d653e9e17f", "Step 3/8 : RUN mkdir /code", " ---> Using cache", " ---> 386a8607acc0", "Step 4/8 : WORKDIR /code", " ---> Using cache", " ---> 98b8babbde1c", "Step 5/8 : COPY requirements.txt /code/", " ---> Using cache", " ---> 8bea96e6ec0c", "Step 6/8 : RUN pip install -r requirements.txt", " ---> Using cache", " ---> be1db0211edc", "Step 7/8 : COPY . /code/", " ---> Using cache", " ---> 8e39008f06af", "Step 8/8 : RUN python manage.py migrate", " ---> Using cache", " ---> cd9235bb6120", "Successfully built cd9235bb6120", "Successfully tagged docker_web:latest"]
  export const ConfigRes7 = 
  [
    'services:',
    '  cadvisor:',
    '    image: google/cadvisor',
    '  db:',
    '    environment:',
    '      POSTGRES_DB: postgres',
    '      POSTGRES_PASSWORD: postgres',
    '      POSTGRES_USER: postgres',
    '    image: postgres',
    '  traefik:',
    '    image: traefik',
    '  web:',
    '    build:',
    "      context: /home/zeeshan/work_space/zlogjs-modules/docker-compose-api/tests/docker/zlog-compose",
    '    command: python manage.py runserver 0.0.0.0:8004',
    '    depends_on:',
    '    - db',
    '    ports:',
    '    - published: 8004',
    '      target: 8000',
    '    volumes:',
    '    - /home/zeeshan/work_space/zlogjs-modules/docker-compose-api/tests/docker/zlog-compose:/code:rw',
    "version: '3.3'"
  ]

  export const ConfigRes8 = [ 'traefik','cadvisor','db', 'web' ]

  export const PullConfig = {
      service: "traefik",
      parallel: true

  }

  export const ConfigOpts = {
    // "resolve-image-digests": false,
    "services": true,
    "volumes": true
  };
  export const PsConfig = {
      service: "cadvisor",
      services: true,
      a: true
  }
  export const cwithoutservice = {
      build: true
  }
  export const cwithservice = {
      service: "web",
      ["no-build"]: true
  }
  export const DownConfig = {
    rmi: 'local',
    // v: true,
    "remove-orphans": true,
    timeout: 20000
  } 
  export const EventConfig = {
      json: "output.json",
      service: "web",
  }

  export const ExecConfigs = {
      d: true,
      u: "zeeshan",
      e: "ABC=true,CDE=false",
      serviceCommand: "web"
  };

  export const ImagesConfig = {
      service: "web",
      q: false
  }

  export const KillConfig = {
      service: "web",
      s: "SIGKILL"
  }
  export const LogsConfig = {
      service: "web",
      f: true,
      t: true,
      tail: "all"
  };

  export const PauseConfig = {
      service: "cadvisor"
  };

  export const PortConfig = {
      service: "cadvisor",
      private_port: 8080,
      protocol: "tcp",
      index: 1
  }

  export const ServiceAndConfig = {
      service: "web",
      pull: true,
    //   q: true,
      progress: "auto",
      m: 125,
      compress: true
  }