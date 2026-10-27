
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
	export const WINDOWID: string;
	export const npm_config_userconfig: string;
	export const COLORTERM: string;
	export const GTK_THEME: string;
	export const npm_config_cache: string;
	export const CLAUDE_CODE_CHILD_SESSION: string;
	export const LESS: string;
	export const ZSH_CACHE_DIR: string;
	export const AI_AGENT: string;
	export const CLAUDE_CODE_SESSION_ID: string;
	export const NODE: string;
	export const VSSCRIPT_PATH: string;
	export const CLAUDE_PID: string;
	export const XDG_DATA_HOME: string;
	export const CLAUDE_EFFORT: string;
	export const XDG_CONFIG_HOME: string;
	export const COLOR: string;
	export const npm_config_local_prefix: string;
	export const DISABLE_UPDATES: string;
	export const npm_config_globalconfig: string;
	export const GPG_TTY: string;
	export const EDITOR: string;
	export const XDG_SEAT: string;
	export const PWD: string;
	export const LOGNAME: string;
	export const QT_QPA_PLATFORMTHEME: string;
	export const XDG_SESSION_TYPE: string;
	export const npm_config_init_module: string;
	export const CLAUDE_CODE_MESSAGING_SOCKET: string;
	export const _: string;
	export const XAUTHORITY: string;
	export const NoDefaultCurrentDirectoryInExePath: string;
	export const FZF_DEFAULT_COMMAND: string;
	export const CLAUDECODE: string;
	export const WINDOWPATH: string;
	export const MOTD_SHOWN: string;
	export const VIRTUALENVWRAPPER_SCRIPT: string;
	export const HOME: string;
	export const LANG: string;
	export const EMACS_WM: string;
	export const LS_COLORS: string;
	export const _VIRTUALENVWRAPPER_API: string;
	export const npm_package_version: string;
	export const CLAUDE_CODE_SESSION_ATTENDED: string;
	export const INSIDE_EXWM: string;
	export const STARSHIP_SHELL: string;
	export const CLOUDSDK_ROOT_DIR: string;
	export const MANROFFOPT: string;
	export const VIRTUALENVWRAPPER_PYTHON: string;
	export const BAT_THEME: string;
	export const INIT_CWD: string;
	export const STARSHIP_SESSION_KEY: string;
	export const XDG_CACHE_HOME: string;
	export const ALACRITTY_SOCKET: string;
	export const npm_lifecycle_script: string;
	export const WORKON_HOME: string;
	export const npm_config_npm_version: string;
	export const XDG_SESSION_CLASS: string;
	export const TERM: string;
	export const npm_package_name: string;
	export const DISABLE_INSTALLATION_CHECKS: string;
	export const FZF_CTRL_T_COMMAND: string;
	export const ZSH: string;
	export const npm_config_prefix: string;
	export const ZDOTDIR: string;
	export const GOOGLE_CLOUD_SDK_HOME: string;
	export const USER: string;
	export const FZF_ALT_C_COMMAND: string;
	export const ZSH_CUSTOM: string;
	export const MANPAGER: string;
	export const VISUAL: string;
	export const DISPLAY: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const GIT_EDITOR: string;
	export const PAGER: string;
	export const XDG_VTNR: string;
	export const XDG_SESSION_ID: string;
	export const npm_config_user_agent: string;
	export const ROCM_PATH: string;
	export const XDG_STATE_HOME: string;
	export const npm_execpath: string;
	export const LD_LIBRARY_PATH: string;
	export const XDG_RUNTIME_DIR: string;
	export const CLAUDE_CODE_ENTRYPOINT: string;
	export const DEBUGINFOD_URLS: string;
	export const npm_package_json: string;
	export const XDG_DATA_DIRS: string;
	export const CLAUDE_CODE_EXECPATH: string;
	export const npm_config_noproxy: string;
	export const PATH: string;
	export const npm_config_node_gyp: string;
	export const ALACRITTY_LOG: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const FZF_DEFAULT_OPTS: string;
	export const npm_config_global_prefix: string;
	export const MAIL: string;
	export const npm_config_global_ignore_file: string;
	export const ALACRITTY_WINDOW_ID: string;
	export const npm_node_execpath: string;
	export const OLDPWD: string;
	export const CLAUDE_CODE_MESSAGING_TOKEN: string;
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
		WINDOWID: string;
		npm_config_userconfig: string;
		COLORTERM: string;
		GTK_THEME: string;
		npm_config_cache: string;
		CLAUDE_CODE_CHILD_SESSION: string;
		LESS: string;
		ZSH_CACHE_DIR: string;
		AI_AGENT: string;
		CLAUDE_CODE_SESSION_ID: string;
		NODE: string;
		VSSCRIPT_PATH: string;
		CLAUDE_PID: string;
		XDG_DATA_HOME: string;
		CLAUDE_EFFORT: string;
		XDG_CONFIG_HOME: string;
		COLOR: string;
		npm_config_local_prefix: string;
		DISABLE_UPDATES: string;
		npm_config_globalconfig: string;
		GPG_TTY: string;
		EDITOR: string;
		XDG_SEAT: string;
		PWD: string;
		LOGNAME: string;
		QT_QPA_PLATFORMTHEME: string;
		XDG_SESSION_TYPE: string;
		npm_config_init_module: string;
		CLAUDE_CODE_MESSAGING_SOCKET: string;
		_: string;
		XAUTHORITY: string;
		NoDefaultCurrentDirectoryInExePath: string;
		FZF_DEFAULT_COMMAND: string;
		CLAUDECODE: string;
		WINDOWPATH: string;
		MOTD_SHOWN: string;
		VIRTUALENVWRAPPER_SCRIPT: string;
		HOME: string;
		LANG: string;
		EMACS_WM: string;
		LS_COLORS: string;
		_VIRTUALENVWRAPPER_API: string;
		npm_package_version: string;
		CLAUDE_CODE_SESSION_ATTENDED: string;
		INSIDE_EXWM: string;
		STARSHIP_SHELL: string;
		CLOUDSDK_ROOT_DIR: string;
		MANROFFOPT: string;
		VIRTUALENVWRAPPER_PYTHON: string;
		BAT_THEME: string;
		INIT_CWD: string;
		STARSHIP_SESSION_KEY: string;
		XDG_CACHE_HOME: string;
		ALACRITTY_SOCKET: string;
		npm_lifecycle_script: string;
		WORKON_HOME: string;
		npm_config_npm_version: string;
		XDG_SESSION_CLASS: string;
		TERM: string;
		npm_package_name: string;
		DISABLE_INSTALLATION_CHECKS: string;
		FZF_CTRL_T_COMMAND: string;
		ZSH: string;
		npm_config_prefix: string;
		ZDOTDIR: string;
		GOOGLE_CLOUD_SDK_HOME: string;
		USER: string;
		FZF_ALT_C_COMMAND: string;
		ZSH_CUSTOM: string;
		MANPAGER: string;
		VISUAL: string;
		DISPLAY: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		GIT_EDITOR: string;
		PAGER: string;
		XDG_VTNR: string;
		XDG_SESSION_ID: string;
		npm_config_user_agent: string;
		ROCM_PATH: string;
		XDG_STATE_HOME: string;
		npm_execpath: string;
		LD_LIBRARY_PATH: string;
		XDG_RUNTIME_DIR: string;
		CLAUDE_CODE_ENTRYPOINT: string;
		DEBUGINFOD_URLS: string;
		npm_package_json: string;
		XDG_DATA_DIRS: string;
		CLAUDE_CODE_EXECPATH: string;
		npm_config_noproxy: string;
		PATH: string;
		npm_config_node_gyp: string;
		ALACRITTY_LOG: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		FZF_DEFAULT_OPTS: string;
		npm_config_global_prefix: string;
		MAIL: string;
		npm_config_global_ignore_file: string;
		ALACRITTY_WINDOW_ID: string;
		npm_node_execpath: string;
		OLDPWD: string;
		CLAUDE_CODE_MESSAGING_TOKEN: string;
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
