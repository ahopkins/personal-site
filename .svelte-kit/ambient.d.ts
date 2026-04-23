
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into public-facing code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const LSCOLORS: string;
	export const COREPACK_ENABLE_AUTO_PIN: string;
	export const SESSION_MANAGER: string;
	export const npm_config_userconfig: string;
	export const COLORTERM: string;
	export const OTEL_EXPORTER_OTLP_PROTOCOL: string;
	export const XDG_CONFIG_DIRS: string;
	export const npm_config_cache: string;
	export const KGLOBALACCELD_PLATFORM: string;
	export const LESS: string;
	export const XDG_SESSION_PATH: string;
	export const XDG_MENU_PREFIX: string;
	export const ICEAUTHORITY: string;
	export const NODE: string;
	export const SSH_AUTH_SOCK: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const COLOR: string;
	export const npm_config_local_prefix: string;
	export const DESKTOP_SESSION: string;
	export const LC_MONETARY: string;
	export const __ETC_PROFILE_NIX_SOURCED: string;
	export const GTK_RC_FILES: string;
	export const GREP_COLORS: string;
	export const npm_config_globalconfig: string;
	export const OTEL_METRICS_EXPORTER: string;
	export const GPG_TTY: string;
	export const CLOUDSDK_PYTHON_ARGS: string;
	export const EDITOR: string;
	export const XDG_SEAT: string;
	export const ZEITGEIST_DATA_PATH: string;
	export const PWD: string;
	export const NIX_PROFILES: string;
	export const OTEL_RESOURCE_ATTRIBUTES: string;
	export const XDG_SESSION_DESKTOP: string;
	export const LOGNAME: string;
	export const XDG_SESSION_TYPE: string;
	export const PNPM_HOME: string;
	export const npm_config_init_module: string;
	export const SYSTEMD_EXEC_PID: string;
	export const _: string;
	export const XAUTHORITY: string;
	export const NoDefaultCurrentDirectoryInExePath: string;
	export const VIRTUALENVWRAPPER_VIRTUALENV: string;
	export const CLAUDECODE: string;
	export const MOTD_SHOWN: string;
	export const VIRTUALENVWRAPPER_SCRIPT: string;
	export const GTK2_RC_FILES: string;
	export const HOME: string;
	export const OTEL_EXPORTER_OTLP_ENDPOINT: string;
	export const LANG: string;
	export const LS_COLORS: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const _VIRTUALENVWRAPPER_API: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const npm_package_version: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const STARSHIP_SHELL: string;
	export const VTE_VERSION: string;
	export const CLOUDSDK_ROOT_DIR: string;
	export const WAYLAND_DISPLAY: string;
	export const NIX_SSL_CERT_FILE: string;
	export const VIRTUALENVWRAPPER_WORKON_CD: string;
	export const VIRTUAL_ENV_DISABLE_PROMPT: string;
	export const XDG_SEAT_PATH: string;
	export const VIRTUALENVWRAPPER_PYTHON: string;
	export const INVOCATION_ID: string;
	export const MANAGERPID: string;
	export const INIT_CWD: string;
	export const STARSHIP_SESSION_KEY: string;
	export const KDE_SESSION_UID: string;
	export const npm_lifecycle_script: string;
	export const CLOUDSDK_PYTHON: string;
	export const NVM_DIR: string;
	export const WORKON_HOME: string;
	export const XDG_ACTIVATION_TOKEN: string;
	export const npm_config_npm_version: string;
	export const XDG_SESSION_CLASS: string;
	export const TERM: string;
	export const npm_package_name: string;
	export const ZSH: string;
	export const OTEL_LOG_USER_PROMPTS: string;
	export const npm_config_prefix: string;
	export const GOOGLE_CLOUD_SDK_HOME: string;
	export const OTEL_LOGS_EXPORT_INTERVAL: string;
	export const USER: string;
	export const CLAUDE_CODE_ENABLE_TELEMETRY: string;
	export const QT_WAYLAND_RECONNECT: string;
	export const KDE_SESSION_VERSION: string;
	export const PAM_KWALLET5_LOGIN: string;
	export const VIRTUALENVWRAPPER_PROJECT_FILENAME: string;
	export const DISPLAY: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const GIT_EDITOR: string;
	export const PAGER: string;
	export const XDG_VTNR: string;
	export const XDG_SESSION_ID: string;
	export const MANAGERPIDFDID: string;
	export const npm_config_user_agent: string;
	export const KUBECONFIG: string;
	export const OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string;
	export const npm_execpath: string;
	export const LD_LIBRARY_PATH: string;
	export const TILIX_ID: string;
	export const XDG_RUNTIME_DIR: string;
	export const CLAUDE_CODE_ENTRYPOINT: string;
	export const DEBUGINFOD_URLS: string;
	export const npm_package_json: string;
	export const LC_TIME: string;
	export const BUN_INSTALL: string;
	export const LC_ALL: string;
	export const JOURNAL_STREAM: string;
	export const XDG_DATA_DIRS: string;
	export const KDE_FULL_SESSION: string;
	export const OTEL_METRIC_EXPORT_INTERVAL: string;
	export const OTEL_LOGS_EXPORTER: string;
	export const CLAUDE_CODE_EXECPATH: string;
	export const npm_config_noproxy: string;
	export const PATH: string;
	export const npm_config_node_gyp: string;
	export const VIRTUALENVWRAPPER_HOOK_DIR: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const npm_config_global_prefix: string;
	export const KDE_APPLICATIONS_AS_SCOPE: string;
	export const MAIL: string;
	export const PROJECT_HOME: string;
	export const npm_node_execpath: string;
	export const USE_GKE_GCLOUD_AUTH_PLUGIN: string;
	export const OLDPWD: string;
	export const GOPATH: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {

}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * This module cannot be imported into public-facing code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		LSCOLORS: string;
		COREPACK_ENABLE_AUTO_PIN: string;
		SESSION_MANAGER: string;
		npm_config_userconfig: string;
		COLORTERM: string;
		OTEL_EXPORTER_OTLP_PROTOCOL: string;
		XDG_CONFIG_DIRS: string;
		npm_config_cache: string;
		KGLOBALACCELD_PLATFORM: string;
		LESS: string;
		XDG_SESSION_PATH: string;
		XDG_MENU_PREFIX: string;
		ICEAUTHORITY: string;
		NODE: string;
		SSH_AUTH_SOCK: string;
		MEMORY_PRESSURE_WRITE: string;
		COLOR: string;
		npm_config_local_prefix: string;
		DESKTOP_SESSION: string;
		LC_MONETARY: string;
		__ETC_PROFILE_NIX_SOURCED: string;
		GTK_RC_FILES: string;
		GREP_COLORS: string;
		npm_config_globalconfig: string;
		OTEL_METRICS_EXPORTER: string;
		GPG_TTY: string;
		CLOUDSDK_PYTHON_ARGS: string;
		EDITOR: string;
		XDG_SEAT: string;
		ZEITGEIST_DATA_PATH: string;
		PWD: string;
		NIX_PROFILES: string;
		OTEL_RESOURCE_ATTRIBUTES: string;
		XDG_SESSION_DESKTOP: string;
		LOGNAME: string;
		XDG_SESSION_TYPE: string;
		PNPM_HOME: string;
		npm_config_init_module: string;
		SYSTEMD_EXEC_PID: string;
		_: string;
		XAUTHORITY: string;
		NoDefaultCurrentDirectoryInExePath: string;
		VIRTUALENVWRAPPER_VIRTUALENV: string;
		CLAUDECODE: string;
		MOTD_SHOWN: string;
		VIRTUALENVWRAPPER_SCRIPT: string;
		GTK2_RC_FILES: string;
		HOME: string;
		OTEL_EXPORTER_OTLP_ENDPOINT: string;
		LANG: string;
		LS_COLORS: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		_VIRTUALENVWRAPPER_API: string;
		XDG_CURRENT_DESKTOP: string;
		npm_package_version: string;
		MEMORY_PRESSURE_WATCH: string;
		STARSHIP_SHELL: string;
		VTE_VERSION: string;
		CLOUDSDK_ROOT_DIR: string;
		WAYLAND_DISPLAY: string;
		NIX_SSL_CERT_FILE: string;
		VIRTUALENVWRAPPER_WORKON_CD: string;
		VIRTUAL_ENV_DISABLE_PROMPT: string;
		XDG_SEAT_PATH: string;
		VIRTUALENVWRAPPER_PYTHON: string;
		INVOCATION_ID: string;
		MANAGERPID: string;
		INIT_CWD: string;
		STARSHIP_SESSION_KEY: string;
		KDE_SESSION_UID: string;
		npm_lifecycle_script: string;
		CLOUDSDK_PYTHON: string;
		NVM_DIR: string;
		WORKON_HOME: string;
		XDG_ACTIVATION_TOKEN: string;
		npm_config_npm_version: string;
		XDG_SESSION_CLASS: string;
		TERM: string;
		npm_package_name: string;
		ZSH: string;
		OTEL_LOG_USER_PROMPTS: string;
		npm_config_prefix: string;
		GOOGLE_CLOUD_SDK_HOME: string;
		OTEL_LOGS_EXPORT_INTERVAL: string;
		USER: string;
		CLAUDE_CODE_ENABLE_TELEMETRY: string;
		QT_WAYLAND_RECONNECT: string;
		KDE_SESSION_VERSION: string;
		PAM_KWALLET5_LOGIN: string;
		VIRTUALENVWRAPPER_PROJECT_FILENAME: string;
		DISPLAY: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		GIT_EDITOR: string;
		PAGER: string;
		XDG_VTNR: string;
		XDG_SESSION_ID: string;
		MANAGERPIDFDID: string;
		npm_config_user_agent: string;
		KUBECONFIG: string;
		OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string;
		npm_execpath: string;
		LD_LIBRARY_PATH: string;
		TILIX_ID: string;
		XDG_RUNTIME_DIR: string;
		CLAUDE_CODE_ENTRYPOINT: string;
		DEBUGINFOD_URLS: string;
		npm_package_json: string;
		LC_TIME: string;
		BUN_INSTALL: string;
		LC_ALL: string;
		JOURNAL_STREAM: string;
		XDG_DATA_DIRS: string;
		KDE_FULL_SESSION: string;
		OTEL_METRIC_EXPORT_INTERVAL: string;
		OTEL_LOGS_EXPORTER: string;
		CLAUDE_CODE_EXECPATH: string;
		npm_config_noproxy: string;
		PATH: string;
		npm_config_node_gyp: string;
		VIRTUALENVWRAPPER_HOOK_DIR: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		npm_config_global_prefix: string;
		KDE_APPLICATIONS_AS_SCOPE: string;
		MAIL: string;
		PROJECT_HOME: string;
		npm_node_execpath: string;
		USE_GKE_GCLOUD_AUTH_PLUGIN: string;
		OLDPWD: string;
		GOPATH: string;
		NODE_ENV: string;
		[key: string]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: string]: string | undefined;
	}
}
