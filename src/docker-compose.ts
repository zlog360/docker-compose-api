import { writeFile } from 'fs';
import { getPackageVersion, Formatter } from './my-lib';
import { Commander, ISSHConfigs } from './commander';
import { config } from 'process';
import { isArray, isString } from 'util';
import { setMatchers } from 'expect/build/jestMatchersObject';
import {
	ConcatSMUnitString,
	StrArrtoObj,
	ConcatObject,
	isArrayl,
} from './util';
import { serviceBuild, ConfigsShort } from '../tests/data.service';
// import { version } from '../src/my-lib';
import DockerFile from './docker-file';
import {
	BUILD_FLAGS,
	CONFIG_FLAGS,
	CREATE_FLAGS,
	Dictionory,
} from './docker-dictionory';
import { IDockerFile } from './docker-file';

const YAML = require('json-to-pretty-yaml');
const logger = require('debug')('zlog360:docker-compose');

export type SMUnitString = string | string[];
export type SMUnitConfig = IComposeGeneric | IConfig | IConfig[];
export type Config = SMUnitString | SMUnitConfig;
export type Cmd = string | string[];
export type Build = string | IDockerComposeBuild;
export type Environment = IComposeGeneric | string[];
export type Label = IComposeGeneric | string[];
export type Network = IComposeGeneric | string[];
export type Secret = string | IComposeGeneric | string[];
export type Systctls = IComposeGeneric | string[];
export type TmpFs = SMUnitString | ITmpFsConfig | ITmpFsConfig[];
export type Volume = string[] | IVolumeConfig | IVolumeConfig[];
export type Port = string[] | (string | IPortConfig)[];

interface IPortConfig {
	target: number;
	published: number;
	protocol: string;
	mode: string;
}
interface ITmpFsConfig {
	type: string;
	target: string;
	tmpfs: {
		size: number;
	};
}
interface INetworkConfig {
	[key: string]: {
		driver: string;
		external: boolean | { name: string };
		name: string;
		driver_opts: IComposeGeneric;
		attachable: boolean;
		enable_ipv6: boolean;
		ipam: {
			driver: string;
			config: { subnet: string }[];
		};
		internal: boolean;
		labels: SMUnitString;
	};
}
interface IVolumeConfig {
	type: string;
	source?: string;
	volume?: {
		nocopy: boolean;
	};
	target?: string;
	read_only?: boolean;
	bind?: {
		propagation: string;
	};
	tmpfs?: {
		size: number;
	};
	consistency?: string;
	cached?: string;
	volumes?: IComposeGeneric;
}
interface IServiceUlimits {
	nproc?: number;
	nofile?: {
		soft?: number;
		hard?: number;
	};
}
export interface IDockerComposeConfig {
	format?: string;
}

interface IDeployResources {
	limits?: IComposeGeneric;
	reservations?: IComposeGeneric;
}

interface IDeployPlacement {
	constraints?: SMUnitString;
	preferences?: IComposeGeneric[];
	max_replicas_per_node?: number;
}

interface IDeployRestart {
	condition?: string;
	delay?: string;
	max_attempts?: number;
	window?: string;
}

interface IDeploy {
	endpoint_mode?: string;
	labels?: IComposeGeneric | SMUnitString;
	mode?: string;
	placement?: IDeployPlacement;
	replicas?: number;
	resources?: IDeployResources;
	restart_policy?: IDeployRestart;
	rollback_config?: IRollbackConfig;
	update_config?: IUpdateConfig;
}

interface IComposeGeneric {
	[key: string]: unknown;
}

interface IDockerComposeBuild {
	context?: string;
	dockerfile?: string;
	args?: IComposeGeneric | string[];
	cache_from?: string[];
	labels?: string[] | IComposeGeneric;
	network?: string;
	shm_size?: number | string;
	target?: string;
}

interface IConfig {
	source: string;
	target: string;
	uid: string;
	gid: string;
	mode: string;
}

interface IRollbackConfig {
	parallelism?: number;
	delay?: string;
	failure_action?: string; //default || pause
	monitor?: string; //0s
	max_failure_ratio?: number; // (default 0).
	order?: string; // (default stop-first).
}

interface IUpdateConfig {
	parallelism?: number;
	delay?: string;
	failure_action?: string; //default || pause
	monitor?: string; //0s
	max_failure_ratio?: number; // (default 0).
	order?: string; // (default stop-first).
}

interface ISwarmDeploy {
	replicas: number;
	placement: {
		max_replicas_per_node: number;
		constraints: string[];
	};
	delay: string;
	restart_policy: {
		condition: string;
		delay: string;
		max_attempts: number;
		window: string;
	};
	endpoint_mode: string;
	labels: string | string[];
	mode: string;
	resources: {
		limits: IComposeGeneric;
		reservations: IComposeGeneric;
	};
	rollback_config: IRollbackConfig;
	update_config: IUpdateConfig;
}

interface ILogging {
	driver: string;
	options: IComposeGeneric;
}
interface IServiceHealthCheck {
	test?: SMUnitString;
	interval?: string;
	timeout?: string;
	retries?: number;
	start_period?: string;
	disable?: boolean;
}

interface IDriverOpts {
	type: string;
	o: string;
	device: string;
}

interface IServiceConfig {
	driver_opts?: IDriverOpts;
	driver?: string;
	image?: string;
	init?: boolean;
	build?: Build;
	cap_add?: SMUnitString;
	cap_drop?: string[];
	cgroup_parent?: string;
	command?: Cmd;
	configs?: Config;
	container_name?: string;
	depends_on?: string[];
	deploy?: IDeploy;
	devices?: string | string[];
	dns?: string | string[];
	dns_search?: string | string[];
	entrypoint?: string | string[];
	env_file?: string | string[];
	environment?: string[] | IComposeGeneric;
	expose?: string[];
	external_links?: string[];
	extra_hosts?: string[];
	healthcheck?: IComposeGeneric;
	isolation?: string;
	labels?: IComposeGeneric | string[];
	links?: string[];
	logging?: ILogging;
	services?: IComposeGeneric;
	network_mode?: string;
	networks?: string[] | IComposeGeneric;
	pid?: string;
	ports?: string[] | IComposeGeneric[];
	restart?: string;
	secrets?: IConfig | IComposeGeneric;
	security_opt?: string;
	stop_grace_period?: string;
	stop_signal?: string;
	sysctls?: string[] | IComposeGeneric;
	tmpfs?: string | string[];
	ulimits?: IServiceUlimits;
	volumes?:
		| string
		| {
				type?: string;
				source?: string;
				target?: string;
				volume?: {
					nocopy?: boolean;
				};
		  }[];
	userns_mode?: string;
}

interface IDockerComposePack {
	version: string;
	services: IServiceConfig[];
}

interface ServiceConfig {}
interface ServiceKeyConfig {
	key: string;
	c: IServiceConfig;
}
interface BuildConfig {
	service: string;
	c: IDockerComposeBuild;
}

export interface ISetOpts {
	// build service with service or not
	build?: { service?: string; data: Build };
	configs?: { service?: string; data: Config };
	cap_add?: { service?: string; data: SMUnitString; append: boolean };
	cap_drop?: { service?: string; data: SMUnitString; append: boolean };
	cgroup_parent?: { service?: string; data: string };
	container_name?: { service?: string; data: string };
	depends_on?: { service?: string; data: string[]; append: boolean };
	init?: { service?: string; data: boolean };
	deploy?: { service?: string; data: IDeploy };
	devices?: { service?: string; data: SMUnitString; append: boolean };
	dns?: { service?: string; data: SMUnitString; append: boolean };
	dns_search?: { service?: string; data: SMUnitString; append: boolean };
	entrypoint?: { service?: string; data: SMUnitString; append: boolean };
	env_file?: { service?: string; data: SMUnitString; append: boolean };
	environment?: { service?: string; data: Environment };
	expose?: { service?: string; data: SMUnitString; append: boolean };
	external_links?: { service?: string; data: SMUnitString; append: boolean };
	extra_hosts?: { service?: string; data: SMUnitString; append: boolean };
	healthcheck?: { service?: string; data: IServiceHealthCheck };
	image?: { service?: string; data: string };
	isolation?: { service?: string; data: string };
	labels?: { service?: string; data: Label; append: boolean };
	links?: { service?: string; data: SMUnitString; append: boolean };
	logging?: { service?: string; data: ILogging };
	network_mode?: { service?: string; data: string };
	networks?: { service?: string; data: Network };
	pid?: { service?: string; data: string };
	ports?: { service?: string; data: Port; append: boolean };
	restart?: { service?: string; data: string };
	secrets?: { service?: string; data: Secret; append: boolean };
	security_opt?: { service?: string; data: SMUnitString; append: boolean };
	stop_signal?: { service?: string; data: string };
	stop_grace_period?: { service?: string; data: string };
	sysctls?: { service?: string; data: Systctls; append: boolean };
	tmpfs?: { service?: string; data: TmpFs; append: boolean };
	ulimits?: { service?: string; data: IServiceUlimits; append: boolean };
	userns_mode?: { service?: string; data: string };
	volumes?: { service?: string; data: Volume; append: boolean };
	command?: { service?: string; data: SMUnitString };
}

interface ComposeBase {
	service?: string;
	// Don't print unknownthing to STDOUT q or quiet
	q?: boolean;
	quiet?: boolean;
	file?: string;
	f?: string;
}
interface ComposeBuild extends ComposeBase {
	//key=val     Set build-time variables for services
	service?: string;
	['build-arg']?: string;
	// Compress the build context using gzip
	compress?: boolean;
	// Always remove intermediate containers
	['force-rm']?: boolean;
	// Set memory limit for the build container
	m?: number;
	// Do not use cache when building the image
	memory?: number;
	// Do not use cache when building the image
	['no-cache']?: boolean;
	// Do not remove intermediate containers after a successful build
	['no-rm']?: boolean;
	// Build images in parallel
	parallel?: boolean;
	/*
        Set type of progress output (auto, plain, tty).
        EXPERIMENTAL flag for native builder.
        To enable, run with COMPOSE_DOCKER_CLI_BUILD=1)
    */
	progress?: string; //auto, plain, tty
	// Always attempt to pull a newer version of the image
	pull?: boolean;
}

interface ComposeConfig extends ComposeBase {
	// Pin image tags to digests
	['resolve-image-digests']?: boolean;
	// Don't interpolate environment variables
	['no-interpolate']?: boolean;
	// Print the service names, one per line.
	services?: boolean;
	// Print the volume names, one per line.
	volumes?: boolean;
	/*
        can be  "*"
        Print the service config hash, one per line.
        Set "service1,service2" for a list of specified services
        or use the wildcard symbol to display all services
     */
	hash?: string;
}
interface ComposeCreate extends ComposeBase {
	//Recreate containers even if their configuration and
	//image haven't changed. Incompatible with --no-recreate.
	['force-recreate']?: boolean;
	// If containers already exist, don't recreate them.
	// Incompatible with --force-recreate
	['no-recreate']?: boolean;
	// Don't build an image, even if it's missing.
	['no-build']?: boolean;
	// Build images before creating containers
	build?: boolean;
}

interface ComposeDown extends ComposeBase {
	/*
       type
       Remove images. Type must be one of:
        'all': Remove all images used by unknown service.
        'local': Remove only images that don't have a
        custom tag set by the `image` field.
     */
	rmi?: string;
	/*
       Remove named volumes declared in the `volumes`
        section of the Compose file and anonymous volumes
        attached to containers.
    */
	v?: boolean;
	volumes?: boolean;
	/*
       Remove containers for services not defined in the
       Compose file
    */
	['remove-orphans']?: boolean;
	/*
       TIMEOUT   Specify a shutdown timeout in seconds.
       (default: 10)
    */
	t?: number;
	timeout?: number;
}

interface ComposeEvent {
	service?: string;
	// json file
	json?: string;
}

interface ComposeExec {
	service?: string;
	/*
        Detached mode: Run command in the background.
    */
	d?: boolean;
	detach?: boolean;
	// Give extended privileges to the process.
	privileged?: boolean;
	// USER   Run the command as this user.
	u?: string;
	user?: string;
	/*
       Disable pseudo-tty allocation. By default `docker-compose exec`
        allocates a TTY.
    */
	T?: string;
	/*
      index=index
      index of the container if there are multiple
      instances of a service [default: 1]
    */
	index?: number;
	/*
        KEY=VAL Set environment variables (can be used multiple times,
        not supported in API < 1.25)
    */
	e?: string;
	env?: string;
	w?: string;
	// DIR Path to workdir directory for this command.
	workdir?: string;
}
type ComposeImage = ComposeBase;

interface ComposeKill {
	service?: string;
	/*
      SIGNAL
      SIGNAL to send to the container.
      Default signal is SIGKILL.
    */
	s?: string | number;
}

interface ComposeLog {
	service?: string;
	// Produce monochrome output.
	['no-color']?: boolean;
	// Follow log output.
	f?: boolean;
	follow?: boolean;
	// Show timestamps.
	t?: boolean;
	timestamps?: boolean;
	/*
      Number of lines to show from the end of the logs
      for each container.
      --tail="all"
    */
	tail?: string;
}

interface ComposePause {
	service?: string;
}

interface ComposePort {
	service?: string;
	/*
       --protocol=proto  tcp or udp [default: tcp]
     */
	protocol?: string;
	/*
     --index=index     index of the container if there are multiple
                      instances of a service [default: 1]
    */
	index?: number;
}
interface ComposePs extends ComposeBase {
	// Display services
	services?: boolean;
	// KEY=VAL     Filter services by a property        //
	filter?: string;
	// Show all stopped containers (including those created by the run command)
	a?: boolean;
	all?: boolean;
}

interface ComposePull extends ComposeBase {
	// Pull what it can and ignores images with pull failures.
	['ignore-pull-failures']?: boolean;
	// Deprecated, pull multiple images in parallel (enabled by default).
	parallel?: string | boolean;
	// Disable parallel pulling.
	['no-parallel']?: boolean;
	// Also pull services declared as dependencies
	['include-deps']?: boolean;
}

interface ComposePush {
	service?: string;
	// Push what it can and ignores images with push failures
	['ignore-push-failures']?: boolean;
}

interface ComposeRestart {
	/*
      TIMEOUT Specify a shutdown timeout in seconds.
      (default: 10)
    */
	t?: number;
	timeout?: number;
}

interface ComposeRm {
	// Don't ask to confirm removal
	f?: boolean;
	force?: boolean;
	// Stop the containers, if required, before removing
	s?: boolean;
	stop?: boolean;
	// Remove unknown anonymous volumes attached to containers
	v?: boolean | string;
	// Deprecated - no effect.
	a?: boolean;
	all?: boolean;
}

interface ComposeRun {
	/*
       Detached mode: Run container in the background, print
       new container name.
    */
	d?: boolean;
	detach?: boolean;
	/*
       NAME Assign a name to the container
    */
	name?: string;
	/*
      CMD Override the entrypoint of the image.
    */
	entrypoint?: string;
	/*
      KEY=VAL Set an environment variable (can be used multiple times)
    */
	e?: string;
	// KEY=VAL   Add or override a label (can be used multiple times)
	l?: string;
	label?: string;
	/*
      Run as specified username or uid
      --user=""
    */
	u?: string;
	user?: string;
	// Don't start linked services.
	['no-deps']?: boolean;
	// Remove container after run. Ignored in detached mode.
	rm?: boolean;
	/*
      --publish=[] Publish a container's port(s) to the host
    */
	p?: string;
	publish?: string[];
	/*
      Run command with the service's ports enabled and mapped
      to the host.
    */
	['service-ports']?: string[];
	/*
     Use the service's network aliases in the network(s) the
     container connects to.
   */
	['use-aliases']?: boolean;
	/*
      Bind mount a volume (default [])
      volume=[]
    */
	v?: string[];
	volume?: string[];
	/*
      Disable pseudo-tty allocation. By default `docker-compose run`
      allocates a TTY.
    */
	T?: boolean;
	/*
      --workdir="" Working directory inside the container
    */
	w?: string;
	workdir?: string;
	service: string;
	serviceCommand?: string;
	args?: string[];
}

interface ComposeScale {
	/*
      TIMEOUT
      Specify a shutdown timeout in seconds.
      (default: 10)
    */
	t?: number;
	timeout?: number;
	serviceArray?: string[];
}

interface ComposeStart {
	service: string;
}

interface ComposeStop {
	service: string;
	/*
       TIMEOUT      Specify a shutdown timeout in seconds.
       (default: 10)
    */
	t?: number;
	timeout?: number;
}

interface ComposeTop {
	service: string;
}

interface ComposeUnPause {}

interface ComposeUp {
	/*
       Detached mode: Run containers in the background,
       print new container names. Incompatible with
    */
	d?: boolean;
	detach?: boolean;
	['abort-on-container-exit']?: boolean;
	// Produce monochrome output.
	['no-color']?: boolean;
	// Pull without printing progress information
	['quiet-pull']?: boolean;
	// Don't start linked services.
	['no-deps']?: boolean;
	// Recreate containers even if their configuration
	// and image haven't changed.
	['force-recreate']?: boolean;
	/*
       Recreate dependent containers.
       Incompatible with --no-recreate.
    */
	['always-recreate-deps']?: boolean;
	/*
        If containers already exist, don't recreate
        them. Incompatible with --force-recreate and -V.
    */
	['no-recreate']?: boolean;
	// Don't build an image, even if it's missing.
	['no-build']?: boolean;
	// Don't start the services after creating them.
	['no-start']?: boolean;
	// Build images before starting containers.
	['build']?: boolean | string;
	/*
      Stops all containers if unknown container was
      stopped. Incompatible with -d.
    */
	['abort-on-container-exit']?: boolean;
	//     Attach to dependent containers
	['attach-dependencies']?: boolean;
	/*
      TIMEOUT
      Use this timeout in seconds for container
      shutdown when attached or when containers are
      already running. (default: 10)
    */
	t?: number;
	timeout?: number;
	/*
      Recreate anonymous volumes instead of retrieving
      data from the previous containers.
    */
	V?: boolean;
	['renew-anon-volumes']?: boolean;
	/*
      Remove containers for services not defined
      in the Compose file.
    */
	['remove-orphans']?: boolean;
	/*
      SERVICE   Return the exit code of the selected service
      container. Implies --abort-on-container-exit.
    */
	['exit-code-from']?: string;
	/*
      SERVICE=NUM
      Scale SERVICE to NUM instances. Overrides the
      `scale` setting in the Compose file if present.
    */
	scale?: string;
}
// TODO: copy the root dokcer dir first to the localhost or ssh
export class DockerCompose extends Commander {
	// private formatter: Formatter;
	private _composeFileVersion = '3.3';
	private _version = '3.3';
	private _services = new Map();
	// Aliases
	private service = this.setService.bind(this);
	private build = this.setBuild.bind(this);
	private configs = this.setConfig.bind(this);
	private cap_add = this.setCapAdd.bind(this);
	private cap_drop = this.setCapDrop.bind(this);
	private cgroup_parent = this.setCGroupParent.bind(this);
	private container_name = this.setContainerName.bind(this);
	private depends_on = this.setDependsOn.bind(this);
	private deploy = this.setDeploy.bind(this);
	private devices = this.setDevices.bind(this);
	private dns = this.setDns.bind(this);
	private dns_search = this.setDnsSearch.bind(this);
	private entrypoint = this.setEntryPoint.bind(this);
	private env_file = this.setEnvFile.bind(this);
	private environment = this.setEnvironment.bind(this);
	private expose = this.setExpose.bind(this);
	public external_links = this.setExternalLinks.bind(this);
	public extra_hosts = this.setExtraHosts.bind(this);
	public healthcheck = this.setHealthCheck.bind(this);
	public image = this.setImage.bind(this);
	public init = this.setInit.bind(this);
	public isolation = this.setIsolation.bind(this);
	public labels = this.setLabels.bind(this);
	public links = this.setLinks.bind(this);
	public logging = this.setLogging.bind(this);
	public network_mode = this.setNetworkMode.bind(this);
	public networks = this.setNetwork.bind(this);
	public pid = this.setPid.bind(this);
	public ports = this.setPort.bind(this);
	public restart = this.setRestart.bind(this);
	public secrets = this.setSecret.bind(this);
	public security_opt = this.setSecurityOpts.bind(this);
	public stop_signal = this.setStopSignal.bind(this);
	public stop_grace_period = this.setStopGracePeriod.bind(this);
	public sysctls = this.setSysctls.bind(this);
	public tmpfs = this.setTempFs.bind(this);
	public ulimits = this.setUlimits.bind(this);
	public userns_mode = this.setUserNsMode.bind(this);
	public volumes = this.setVolume.bind(this);
	public command = this.setCommand.bind(this);
	private currentService: string;
	public DockerFile: DockerFile;
	private dict: unknown = Dictionory;

	constructor(
		private config: IDockerComposeConfig,
		services: SMUnitString = [],
		pack?: IDockerComposePack,
		private rootP: string = `${process.cwd()}/tests/docker`,
		private remoteConfig?: ISSHConfigs
	) {
		super(remoteConfig);
		this.setService(services);
		this.DockerFile = new DockerFile();
	}
	// Api Methods
	// After these integrate to zlog-common
	async version(): Promise<unknown> {
		try {
			this.shCommand = 'docker-compose version';
			const data = await this.exec();
			return Formatter.json(data) || data;
		} catch (e) {
			return e;
		}
	}
	/**
	 * @description Build or rebuild services
	 * @param opts {ComposeBuild}  optional parameter
	 * */
	async composeBuild(opts?: ComposeBuild) {
		const target = 'build';
		return this.runCompose(target, opts);
	}
	//   config             Validate and view the Compose file
	/**
	 * @description Validate and view the Compose file
	 * @param opts {ComposeConfig}
	 */
	async composeConfig(opts?: ComposeConfig) {
		const target = 'config';
		return this.runCompose(target, opts);
	}
	/**
	 * @description Create services
	 * @param opts {ComposeCreate}
	 * */
	async composeCreate(opts?: ComposeCreate) {
		const target = 'create';
		return this.runCompose(target, opts);
	}
	/**
	 * @description Stop and remove containers, networks, images, and volumes
	 * @param opts {ComposeDown}
	 */
	async composeDown(opts?: ComposeDown) {
		const target = 'down';
		return this.runCompose(target, opts);
	}
	/**
	 * @description Receive real time events from containers
	 * @param opts {ComposeEvent}
	 */
	async composeEvents(opts: ComposeEvent) {
		const target = 'events';
		return this.runCompose(target, opts);
	}
	/**
	 * @description Execute a command in a running container
	 * @param opts {ComposeExec}
	 */
	async composeExec(opts: ComposeExec) {
		const target = 'exec';
		return this.runCompose(target, opts);
	}
	/**
	 * @description List images
	 * @param opts {ComposeKill}
	 */
	async compseImages(opts?: ComposeImage) {
		const target = 'images';
		return this.runCompose(target, opts);
	}
	/**
	 * @description Kill containers
	 * @param opts {ComposeKill}
	 */
	async composeKill(opts: ComposeKill) {
		const target = 'kill';
		return this.runCompose(target, opts);
	}
	/**
	 * @description View output from containers
	 * @param opts {ComposeLog}
	 */
	async composeLogs(opts: ComposeLog) {
		const target = 'logs';
		return this.runCompose(target, opts);
	}
	/**
	 * @description Pause services
	 * @param opts {ComposePause}
	 */
	async composePause(opts: ComposePause) {
		const target = 'pause';
		return this.runCompose(target, opts);
	}
	/**
	 * @description Print the public port for a port binding
	 * @param opts {ComposePort}
	 */
	async composePorts(opts: ComposePort) {
		const target = 'port';
		return this.runCompose(target, opts);
	}
	/**
	 * @description List containers
	 * @param opts {ComposePs}
	 */
	async composePs(opts: ComposePs) {
		const target = 'ps';
		return this.runCompose(target, opts);
	}
	/**
	 * @description Pull service images
	 * @param opts {ComposePull}
	 */
	async composePull(opts: ComposePull) {
		const target = 'pull';
		return this.runCompose(target, opts);
	}
	/**
	 * Push service images
	 * @param opts {ComposePush}
	 */
	async composePush(opts: ComposePush) {
		const target = 'push';
		return this.runCompose(target, opts);
	}
	/**
	 * @description Restart services
	 * @param opts {ComposeRestart}
	 */
	async composeRestart(opts: ComposeRestart) {
		const target = 'restart';
		return this.runCompose(target, opts);
	}
	/**
	 * @description Remove stopped containers
	 * @param opts {ComposeRm}
	 */
	async composeRm(opts?: ComposeRm) {
		const target = 'rm';
		return this.runCompose(target, opts);
	}
	/**
	 * @description Run a one-off command
	 * @param opts {ComposeRun}
	 */
	async composeRun(opts: ComposeRun) {
		const target = 'run';
		return this.runCompose(target, opts);
	}
	/**
	 * @description Set number of containers for a service
	 * @param opts {ComposeScale}
	 */
	async composeScale(opts: ComposeScale) {
		const target = 'scale';
		return this.runCompose(target, opts);
	}
	/**
	 * @description  Start services
	 * @param opts {ComposeStart}
	 */
	async composeStart(opts?: ComposeStart) {
		const target = 'start';
		return this.runCompose(target, opts);
	}
	/**
	 * @description  Stop services
	 * @param opts {ComposeStop}
	 */
	async composeStop(opts?: ComposeStop) {
		const target = 'stop';
		return this.runCompose(target, opts);
	}
	/**
	 * @description  Display the running processes
	 * @param opts {ComposeTop}
	 */
	async composeTop(opts: ComposeTop) {
		const target = 'top';
		return this.runCompose(target, opts);
	}
	/**
	 * @description  Unpause services
	 * @param opts {ComposeUnPause}
	 */
	async composeUnPause(opts: ComposeUnPause) {
		const target = 'unpause';
		return this.runCompose(target, opts);
	}
	/**
	 * @description  Create and start containers
	 * @param opts {ComposeUp}
	 */
	async composeUp(opts?: ComposeUp) {
		const args = { build: true, d: true };
		opts = { ...opts, ...args };
		const target = 'up';
		return this.runCompose(target, opts);
	}
	/** Clears the all the services */
	clear() {
		this._services.clear();
		return this;
	}
	/**
	 * @description converts the objects into a compose file
	 * @param path {string} local file path where it should be stored
	 * @param remotePath {string} remote file path for services
	 * @returns {Promise<boolean>}
	 */
	async toFile(
		path = 'docker-compose.yaml',
		remotePath = 'docker-compose.yaml'
	) {
		const version = this._version;
		const services: unknown = {};
		const skeys = Array.from(this._services.keys());
		const fun = (key: string) => (services[key] = this.getService(key));
		skeys.forEach(fun);
		const data = { version, services };
		const filedata = YAML.stringify(data);
		return new Promise((rs: unknown, rj: unknown) => {
			writeFile(
				`${path}/docker-compose.yaml`,
				filedata,
				async (e: unknown) => {
					if (e) rj(e);
					else rs(true);
					// if (remotePath && this.sshConfig) {
					//     await this.sftp.connect(this.sshConfig)
					//     console.log(remotePath);
					//     // this.sftp.fastPut(path, remotePath);
					//     this.sftp.end();
					// }
				}
			);
		});
	}
	/**
	 * @description returns the compose file version
	 * @returns {Promise<number>}
	 */
	fileVersion(): Promise<string> {
		return Promise.resolve(this._composeFileVersion);
	}
	/**
	 * @description Function runs the target command of docker compose with flags schema
	 * @param target {string} command e.g. build, up, down
	 * @param opts {unknown} options or flags for the object
	 */
	async runCompose(target: string, opts: unknown) {
		const { flags } = this.dict.get(target);
		return this.execActionCommand(target, opts, flags);
	}
	// Setter && Getters
	/**
	 * @description set function based on the object parameter for a service
	 * @param service {string} service name
	 * @param opts {ISetOpts} all the set options for compose commands
	 * @param noappend
	 * @returns {DockerCompose}
	 */
	set(service: string, opts: ISetOpts, noappend: string[] = []) {
		const funcs = Object.keys(opts);
		this.setCurrentService(service);
		funcs.forEach((fun) => (this as unknown)[fun]((opts as unknown)[fun]));
		return this;
	}
	/**
	 * @description returns the service configs
	 * @param service {string}
	 * @returns {Service}
	 */
	get(service: string) {
		return this.getService(service);
	}
	setCurrentService(service: string) {
		this.currentService = service;
		if (!this.isServiceExits(service)) this.setService(service);
		return this;
	}
	isServiceExits(service: string): boolean {
		return this.get(service) ? true : false;
	}

	setService(config: SMUnitString | ServiceKeyConfig | ServiceKeyConfig[]) {
		if (isString(config)) {
			this._services.set(config, {});
		}
		if (isArray(config)) {
			config.forEach((itr: unknown) => this.setService(itr));
		}
		if (!isString(config) && !isArray(config)) {
			const { key, c } = config;
			this._services.set(key, c);
		}
		return this;
	}
	getServicesList() {
		return Array.from(this._services.keys());
	}
	getService(service: string): ServiceKeyConfig {
		return this._services.get(service);
	}
	setServiceWithConfig(service: string, config: IServiceConfig) {
		try {
			const c = this.getService(service);
			this.setService({ key: service, c: { ...c, ...config } });
		} catch (e) {
			this.setService({ key: service, c: { ...config } });
		}
	}
	getServiceConfigKey(service: string, prop: SMUnitString) {
		const c = this.getService(service);
		if (isString(prop)) {
			return (c as unknown)[prop];
		}
		if (isArray(prop)) {
			return prop.map((k: string) => (c as unknown)[k]);
		}
		return c;
	}
	setBuild(opts: ISetOpts['build']) {
		const { service = this.currentService, data } = opts;
		this.setServiceWithConfig(service, { build: data });
		return this;
	}
	getBuild(service: string) {
		return this.getServiceConfigKey(service, 'build');
	}
	getConfig(service: string): Config {
		return this.getServiceConfigKey(service, 'configs');
	}
	setConfig(opts: ISetOpts['configs']) {
		const { service = this.currentService, data } = opts;
		let configs = this.getConfig(service);
		if (isArray(configs)) {
			(configs as unknown[]).push(data);
		} else configs = data;
		this.setServiceWithConfig(service, { configs });
		return this;
	}
	getCapAdd(service: string): SMUnitString {
		return this.getServiceConfigKey(service, 'cap_add');
	}
	setCapAdd(opts: ISetOpts['cap_add']) {
		const { service = this.currentService, data, append = false } = opts;
		let cap_add = this.getServiceConfigKey(service, 'cap_add');
		cap_add = ConcatSMUnitString(cap_add, data, append);
		this.setServiceWithConfig(service, { cap_add });
		return this;
	}
	setInit(opts: ISetOpts['init']) {
		const { service = this.currentService, data } = opts;
		this.setServiceWithConfig(service, { init: data });
		return this;
	}
	getInit(service: string) {
		return this.getServiceConfigKey(service, 'init');
	}
	setIsolation(opts: ISetOpts['isolation']) {
		const { service = this.currentService, data = 'default' } = opts;
		this.setServiceWithConfig(service, { isolation: data });
		return this;
	}
	getIsolation(service: string) {
		return this.getServiceConfigKey(service, 'isolation');
	}
	getCapDrop(service: string) {
		return this.getServiceConfigKey(service, 'cap_drop');
	}
	setCapDrop(opts: ISetOpts['cap_drop']) {
		const { service = this.currentService, data, append = false } = opts;
		let cap_drop = this.getServiceConfigKey(service, 'cap_drop');
		cap_drop = ConcatSMUnitString(cap_drop, data, append);
		this.setServiceWithConfig(service, { cap_drop });
		return this;
	}
	setCGroupParent(opts: ISetOpts['cgroup_parent']) {
		const { service = this.currentService, data } = opts;
		let cgroup_parent = this.getServiceConfigKey(service, 'cgroup_parent');
		cgroup_parent = data;
		this.setServiceWithConfig(service, { cgroup_parent });
		return this;
	}
	getCGroupParent(service: string) {
		return this.getServiceConfigKey(service, 'cgroup_parent');
	}
	setContainerName(opts: ISetOpts['container_name']) {
		const { service = this.currentService, data } = opts;
		let container_name = this.getServiceConfigKey(
			service,
			'container_name'
		);
		container_name = data;
		this.setServiceWithConfig(service, { container_name });
		return this;
	}
	getContainerName(service: string) {
		return this.getServiceConfigKey(service, 'container_name');
	}
	setDependsOn(opts: ISetOpts['depends_on']) {
		const { service = this.currentService, data, append = true } = opts;
		let depends_on = this.getServiceConfigKey(service, 'depends_on');
		depends_on = ConcatSMUnitString(depends_on, data, append);
		this.setServiceWithConfig(service, { depends_on });
		return this;
	}
	getDependsOn(service: string) {
		return this.getServiceConfigKey(service, 'depends_on');
	}
	setDeploy(opts: ISetOpts['deploy']) {
		const { service = this.currentService, data } = opts;
		let deploy = this.getServiceConfigKey(service, 'deploy');
		deploy = { ...deploy, ...data };
		this.setServiceWithConfig(service, { deploy });
		return this;
	}
	getDeploy(service: string): IDeploy {
		return this.getServiceConfigKey(service, 'deploy');
	}
	setDevices(opts: ISetOpts['devices']) {
		const { service = this.currentService, data, append = true } = opts;
		let devices = this.getServiceConfigKey(service, 'devices');
		devices = ConcatSMUnitString(devices, data, append);
		this.setServiceWithConfig(service, { devices });
		return this;
	}
	getDevices(service: string): SMUnitString {
		return this.getServiceConfigKey(service, 'devices');
	}
	setDns(opts: ISetOpts['dns']) {
		const { service = this.currentService, data, append = true } = opts;
		let dns = this.getServiceConfigKey(service, 'dns');
		dns = ConcatSMUnitString(dns, data, append);
		this.setServiceWithConfig(service, { dns });
		return this;
	}
	getDns(service: string) {
		return this.getServiceConfigKey(service, 'dns');
	}
	setDnsSearch(opts: ISetOpts['dns_search']) {
		const { service = this.currentService, data, append = true } = opts;
		let dns_search = this.getServiceConfigKey(service, 'dns_search');
		dns_search = ConcatSMUnitString(dns_search, data, append);
		this.setServiceWithConfig(service, { dns_search });
		return this;
	}
	getDnsSearch(service: string) {
		return this.getServiceConfigKey(service, 'dns_search');
	}
	setEntryPoint(opts: ISetOpts['entrypoint']) {
		const { service = this.currentService, data, append = true } = opts;
		let entrypoint = this.getServiceConfigKey(service, 'entrypoint');
		entrypoint = ConcatSMUnitString(entrypoint, data, append);
		this.setServiceWithConfig(service, { entrypoint });
		return this;
	}
	getEntryPoint(service: string) {
		return this.getServiceConfigKey(service, 'entrypoint');
	}
	setEnvFile(opts: ISetOpts['env_file']) {
		const { service = this.currentService, data, append = true } = opts;
		let env_file = this.getServiceConfigKey(service, 'env_file');
		env_file = ConcatSMUnitString(env_file, data, append);
		this.setServiceWithConfig(service, { env_file });
		return this;
	}
	getEnvFile(service: string) {
		return this.getServiceConfigKey(service, 'env_file');
	}
	setEnvironment(opts: ISetOpts['environment']) {
		const { service = this.currentService, data } = opts;
		let environment = this.getServiceConfigKey(service, 'environment');
		environment = data;
		this.setServiceWithConfig(service, { environment });
		return this;
	}
	getEnvironment(service: string) {
		return this.getServiceConfigKey(service, 'environment');
	}
	setExpose(opts: ISetOpts['expose']) {
		const { service = this.currentService, data, append = true } = opts;
		let expose = this.getServiceConfigKey(service, 'expose');
		expose = ConcatSMUnitString(expose, data, append);
		this.setServiceWithConfig(service, { expose });
		return this;
	}
	getExpose(service: string) {
		return this.getServiceConfigKey(service, 'expose');
	}
	setExternalLinks(opts: ISetOpts['external_links']) {
		const { service = this.currentService, data, append = true } = opts;
		let external_links = this.getServiceConfigKey(
			service,
			'external_links'
		);
		external_links = ConcatSMUnitString(external_links, data, append);
		this.setServiceWithConfig(service, { external_links });
		return this;
	}
	getExternalLinks(service: string) {
		return this.getServiceConfigKey(service, 'external_links');
	}
	setExtraHosts(opts: ISetOpts['extra_hosts']) {
		const { service = this.currentService, data, append = true } = opts;
		let extra_hosts = this.getServiceConfigKey(service, 'extra_hosts');
		extra_hosts = ConcatSMUnitString(extra_hosts, data, append);
		this.setServiceWithConfig(service, { extra_hosts });
		return this;
	}
	getExtraHosts(service: string) {
		return this.getServiceConfigKey(service, 'extra_hosts');
	}
	setHealthCheck(opts: ISetOpts['healthcheck']) {
		const { service = this.currentService, data } = opts;
		let healthcheck = this.getServiceConfigKey(service, 'healthcheck');
		healthcheck = { ...healthcheck, ...data };
		this.setServiceWithConfig(service, { healthcheck });
		return this;
	}
	getHealthCheck(service: string) {
		return this.getServiceConfigKey(service, 'healthcheck');
	}
	setImage(opts: ISetOpts['image']) {
		const { service = this.currentService, data } = opts;
		let image = this.getServiceConfigKey(service, 'image');
		image = data;
		this.setServiceWithConfig(service, { image });
		return this;
	}
	getImage(service: string) {
		return this.getServiceConfigKey(service, 'image');
	}
	setLabels(opts: ISetOpts['labels']) {
		const { service = this.currentService, append = true } = opts;
		let { data } = opts;
		let labels = this.getServiceConfigKey(service, 'labels');
		data = isArray(data) ? StrArrtoObj(data as string[], labels) : data;
		if (typeof data !== typeof labels) {
			labels = data;
		} else if (!isArray(data) && !isString(data)) {
			labels = append ? { labels: { ...labels, ...data } } : data;
		}
		this.setServiceWithConfig(service, { labels });
		return this;
	}
	getLabels(service: string) {
		const data = this.getServiceConfigKey(service, 'labels');
		return data.labels || data;
	}
	setLinks(opts: ISetOpts['links']) {
		const { service = this.currentService, data, append = true } = opts;
		let links = this.getServiceConfigKey(service, 'links');
		links = ConcatSMUnitString(links, data, append);
		this.setServiceWithConfig(service, { links });
		return this;
	}
	getLinks(service: string) {
		return this.getServiceConfigKey(service, 'links');
	}
	setLogging(opts: ISetOpts['logging']) {
		const { service = this.currentService, data } = opts;
		this.setServiceWithConfig(service, { logging: data });
		return this;
	}
	getLogging(service: string) {
		return this.getServiceConfigKey(service, 'logging');
	}
	setNetworkMode(opts: ISetOpts['network_mode']) {
		const { service = this.currentService, data } = opts;
		this.setServiceWithConfig(service, { network_mode: data });
		return this;
	}
	getNetworkMode(service: string) {
		return this.getServiceConfigKey(service, 'network_mode');
	}
	setNetwork(opts: ISetOpts['networks']) {
		const { service = this.currentService, data } = opts;
		this.setServiceWithConfig(service, { networks: data });
		return this;
	}
	getNetwork(service: string) {
		return this.getServiceConfigKey(service, 'networks');
	}
	setPid(opts: ISetOpts['pid']) {
		const { service = this.currentService, data } = opts;
		this.setServiceWithConfig(service, { pid: data });
		return this;
	}
	getPid(service: string) {
		return this.getServiceConfigKey(service, 'pid');
	}
	setPort(opts: ISetOpts['ports']) {
		const { service = this.currentService, data, append = true } = opts;
		let ports = this.getServiceConfigKey(service, 'ports');
		ports = ConcatSMUnitString(ports, data, append);
		this.setServiceWithConfig(service, { ports });
		return this;
	}
	getPort(service: string) {
		return this.getServiceConfigKey(service, 'ports');
	}
	setRestart(opts: ISetOpts['restart']) {
		const { service = this.currentService, data } = opts;
		this.setServiceWithConfig(service, { restart: data });
		return this;
	}
	getRestart(service: string) {
		return this.getServiceConfigKey(service, 'restart');
	}
	setSecret(opts: ISetOpts['secrets']) {
		const { service = this.currentService, data, append = true } = opts;
		let secrets = this.getServiceConfigKey(service, 'secrets');
		if (!isArray(data) && !isString(data)) {
			secrets = ConcatObject(secrets, data, append);
		} else {
			secrets = ConcatSMUnitString(secrets, data, append);
		}
		this.setServiceWithConfig(service, { secrets });
		return this;
	}
	getSecret(service: string) {
		return this.getServiceConfigKey(service, 'secrets');
	}
	// security_opt
	setSecurityOpts(opts: ISetOpts['security_opt']) {
		const { service = this.currentService, data, append = true } = opts;
		let security_opt = this.getServiceConfigKey(service, 'security_opt');
		security_opt = ConcatSMUnitString(security_opt, data, append);
		this.setServiceWithConfig(service, { security_opt });
		return this;
	}
	getSecurityOpts(service: string) {
		return this.getServiceConfigKey(service, 'security_opt');
	}
	setStopSignal(opts: ISetOpts['stop_signal']) {
		const { service = this.currentService, data } = opts;
		this.setServiceWithConfig(service, { stop_signal: data });
		return this;
	}
	getStopSignal(service: string) {
		return this.getServiceConfigKey(service, 'stop_signal');
	}
	setStopGracePeriod(opts: ISetOpts['stop_grace_period']) {
		const { service = this.currentService, data } = opts;
		this.setServiceWithConfig(service, { stop_grace_period: data });
		return this;
	}
	getStopGracePeriod(service: string) {
		return this.getServiceConfigKey(service, 'stop_grace_period');
	}
	setSysctls(opts: ISetOpts['sysctls']) {
		const { service = this.currentService, append = false } = opts;
		let { data } = opts;
		let sysctls = this.getServiceConfigKey(service, 'sysctls');
		data = isArray(data) ? StrArrtoObj(data as string[], sysctls) : data;
		if (typeof sysctls !== typeof data) {
			sysctls = data;
		} else if (!isArray(sysctls) && !isString(sysctls)) {
			sysctls = append ? { sysctls: { ...sysctls, ...data } } : data;
		}
		this.setServiceWithConfig(service, { sysctls });
		return this;
	}
	getSysctls(service: string) {
		return this.getServiceConfigKey(service, 'sysctls');
	}
	// tmpfs
	setTempFs(opts: ISetOpts['tmpfs']) {
		const { service = this.currentService, data, append = true } = opts;
		let tmpfs = this.getServiceConfigKey(service, 'tmpfs');
		if (!isArray(data) && !isString(data)) {
			tmpfs = ConcatObject(tmpfs, data, append);
		} else {
			tmpfs = ConcatSMUnitString(tmpfs, data, append);
		}
		this.setServiceWithConfig(service, { tmpfs });
		return this;
	}
	getTempFs(service: string) {
		return this.getServiceConfigKey(service, 'tmpfs');
	}
	// ulimits
	setUlimits(opts: ISetOpts['ulimits']) {
		const { service = this.currentService, data, append = true } = opts;
		let ulimits = this.getServiceConfigKey(service, 'ulimits');
		ulimits = !append ? data : { ...ulimits, ...data };
		this.setServiceWithConfig(service, { ulimits });
		return this;
	}
	getUlimits(service: string) {
		return this.getServiceConfigKey(service, 'ulimits');
	}
	// userns_mode
	setUserNsMode(opts: ISetOpts['userns_mode']) {
		const { service = this.currentService, data } = opts;
		this.setServiceWithConfig(service, { userns_mode: data });
		return this;
	}
	getUserNsMode(service: string) {
		return this.getServiceConfigKey(service, 'userns_mode');
	}
	// volumes
	setVolume(opts: ISetOpts['volumes']) {
		const { service = this.currentService, data, append = true } = opts;
		let volumes = this.getServiceConfigKey(service, 'volumes');
		if (!isArray(data) && !isString(data)) {
			volumes = ConcatObject(volumes, data, append);
		} else {
			volumes = ConcatSMUnitString(volumes, data, append);
		}
		this.setServiceWithConfig(service, { volumes });
		return this;
	}
	getVolume(service: string) {
		return this.getServiceConfigKey(service, 'volumes');
	}
	setCommand(opts: ISetOpts['command']) {
		const { service = this.currentService, data } = opts;
		this.setServiceWithConfig(service, { command: data });
		return this;
	}
	getCommand(service: string) {
		return this.getServiceConfigKey(service, 'command');
	}
	// other methods
	parseCommand(flags: unknown, data: unknown, strcommand = '') {
		const keys = Object.keys(flags);
		let cmd = keys
			.map((key: string) => {
				if (key !== 'service' && key !== 'private_port') {
					const { flag, deli, value } = flags[key];
					return data[key]
						? `${flag}${deli}${value ? data[key] : ''}`
						: '';
				} else {
					return '';
				}
			})
			.filter((c: string) => c.length > 1)
			.join(' ');
		cmd = data.service ? `${cmd} ${data.service}` : cmd;
		cmd = data.private_port ? `${cmd} ${data.private_port}` : cmd;
		return cmd;
	}
	setRootDir(d: string) {
		this.rootP = d;
		return this;
	}
	getRootDir() {
		return this.rootP;
	}
	changePath(cp: string = this.rootP) {
		this.clearCmd();
		this.shCommand = `cd ${cp} && `;
	}
	baseCommand(action = '') {
		this.changePath();
		this.shCommand = `${this.shCommand} docker-compose ${action}`;
	}
	execActionCommand(action: string, opts?: unknown, flags?: unknown) {
		this.clearCmd();
		this.baseCommand(action);

		if (opts) {
			this.shCommand = `${this.shCommand} ${this.parseCommand(
				flags,
				opts
			)}`;
		}
		logger('commad: ', this.shCommand);
		return this.execRes();
	}
	async execRes() {
		try {
			const data = await this.exec();

			const res =
				data.stdout.length > 1
					? data.stdout
							.split('\n')
							.filter((i: string) => i.length > 1)
					: data.stderr;

			this.clearCmd();
			return res;
		} catch (e) {
			return e;
		}
	}
	async Deploy(
		df: IDockerFile,
		stack: { [key: string]: ISetOpts | unknown },
		path: { local: string; remote: string }
	) {
		try {
			if (df) {
				this.DockerFile.set(df).toFile();
			}
			const services = Object.keys(stack);
			services.forEach((s) => this.set(s, stack[s]));
			this.toFile(path.local, path.remote);
			await this.cp(path.local, path.remote);
			return this.composeUp();
		} catch (e) {
			console.log(e);
			return e;
		}
	}
	async UnDeploy() {
		try {
			// await this.composeStop();
			// return this.composeRm({f: true});
			return this.composeDown();
		} catch (e) {
			return e;
		}
	}
	// setDriver(service: string, driver: string) {
	//     this.setServiceWithConfig(service, { driver });
	// }
	// getDriver(service: string) {
	//     return this.getServiceConfigKey(service, "driver");
	// }
	// setDriverOpts(service: string, driver_opts: IDriverOpts) {
	//     this.setServiceWithConfig(service, { driver_opts });
	// }
	// getDriverOpts(service: string) {
	//     return this.getServiceConfigKey(service, "driver_opts");
	// }

	//    create             Create services
	//   down               Stop and remove containers, networks, images, and volumes
	//   events             Receive real time events from containers
	//   exec               Execute a  in a running container
	//   help               Get help on a
	//   kill               Kill containers
	//   logs               View output from containers
	//   pause              Pause services
	//   ps                 List containers
	//   pull               Pull service images
	//   push               Push service images
	//   restart            Restart services
	//   rm                 Remove stopped containers
	//   run                Run a one-off command
	//   scale              Set number of containers for a service
	//   start              Start services
	//   stop               Stop services
	//   top                Display the running processes
	//   unpause            Unpause services
	//   up                 Create and start containers
	// Finalize -> write Compose file for services and execute run compose command
	// set build(args: string|IDockerComposeBuild) {}
	// set build(args: string|IDockerComposeBuild) {}
}
