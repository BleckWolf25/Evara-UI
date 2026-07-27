import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { getCurrentScope, ref, watchEffect, getCurrentInstance, onBeforeUnmount, onDeactivated, onActivated, createApp, provide, onErrorCaptured, onServerPrefetch, unref, createVNode, resolveDynamicComponent, shallowReactive, reactive, effectScope, hasInjectionContext, inject, defineAsyncComponent, mergeProps, defineComponent, resolveComponent, withCtx, createTextVNode, isRef, toDisplayString, toRef, computed, watch, h, isReadonly, useSSRContext, isShallow, isReactive, toRaw } from 'vue';
import { c as createError, $ as $fetch, l as isEqual, s as stringifyParsedURL, m as stringifyQuery, p as parseQuery, n as hasProtocol, f as joinURL, o as defu, w as withQuery, q as sanitizeStatusCode, t as parseURL, e as encodePath, v as decodePath, x as isScriptProtocol } from '../nitro/nitro.mjs';
import { i as injectHead$1, V as VueResolver, b as baseURL, h as headSymbol } from '../routes/renderer.mjs';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { walkResolver } from 'unhead/utils';

function useHead(input, options = {}) {
  const head = options.head || injectHead$1();
  return head.ssr ? head.push(input || {}, options) : clientUseHead(head, input, options);
}
function clientUseHead(head, input, options = {}) {
  const scope = getCurrentScope();
  if (scope && !scope.active) {
    return { patch() {
    }, dispose() {
    }, _i: -1 };
  }
  const deactivated = ref(false);
  if (options.onRendered && scope) {
    const _onRendered = options.onRendered;
    options = { ...options, onRendered: (ctx) => scope.run(() => _onRendered(ctx)) };
  }
  let entry;
  watchEffect(() => {
    const i = deactivated.value ? {} : walkResolver(input, VueResolver);
    if (entry) {
      entry.patch(i);
    } else {
      entry = head.push(i, options);
    }
  });
  const vm = getCurrentInstance();
  if (vm) {
    onBeforeUnmount(() => {
      entry.dispose();
    });
    onDeactivated(() => {
      deactivated.value = true;
    });
    onActivated(() => {
      deactivated.value = false;
    });
  }
  return entry;
}

function flatHooks(configHooks, hooks = {}, parentName) {
	for (const key in configHooks) {
		const subHook = configHooks[key];
		const name = parentName ? `${parentName}:${key}` : key;
		if (typeof subHook === "object" && subHook !== null) flatHooks(subHook, hooks, name);
		else if (typeof subHook === "function") hooks[name] = subHook;
	}
	return hooks;
}
const createTask = /* @__PURE__ */ (() => {
	if (console.createTask) return console.createTask;
	const defaultTask = { run: (fn) => fn() };
	return () => defaultTask;
})();
function callHooks(hooks, args, startIndex, task) {
	for (let i = startIndex; i < hooks.length; i += 1) try {
		const result = task ? task.run(() => hooks[i](...args)) : hooks[i](...args);
		if (result && typeof result.then === "function") return Promise.resolve(result).then(() => callHooks(hooks, args, i + 1, task));
	} catch (error) {
		return Promise.reject(error);
	}
}
function serialTaskCaller(hooks, args, name) {
	if (hooks.length > 0) return callHooks(hooks, args, 0, createTask(name));
}
function parallelTaskCaller(hooks, args, name) {
	if (hooks.length > 0) {
		const task = createTask(name);
		return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
	}
}
function callEachWith(callbacks, arg0) {
	for (const callback of [...callbacks]) callback(arg0);
}
var Hookable = class {
	_hooks;
	_before;
	_after;
	_deprecatedHooks;
	_deprecatedMessages;
	constructor() {
		this._hooks = {};
		this._before = void 0;
		this._after = void 0;
		this._deprecatedMessages = void 0;
		this._deprecatedHooks = {};
		this.hook = this.hook.bind(this);
		this.callHook = this.callHook.bind(this);
		this.callHookWith = this.callHookWith.bind(this);
	}
	hook(name, function_, options = {}) {
		if (!name || typeof function_ !== "function") return () => {};
		const originalName = name;
		let dep;
		while (this._deprecatedHooks[name]) {
			dep = this._deprecatedHooks[name];
			name = dep.to;
		}
		if (dep && !options.allowDeprecated) {
			let message = dep.message;
			if (!message) message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
			if (!this._deprecatedMessages) this._deprecatedMessages = /* @__PURE__ */ new Set();
			if (!this._deprecatedMessages.has(message)) {
				console.warn(message);
				this._deprecatedMessages.add(message);
			}
		}
		if (!function_.name) try {
			Object.defineProperty(function_, "name", {
				get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
				configurable: true
			});
		} catch {}
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(function_);
		return () => {
			if (function_) {
				this.removeHook(name, function_);
				function_ = void 0;
			}
		};
	}
	hookOnce(name, function_) {
		let _unreg;
		let _function = (...arguments_) => {
			if (typeof _unreg === "function") _unreg();
			_unreg = void 0;
			_function = void 0;
			return function_(...arguments_);
		};
		_unreg = this.hook(name, _function);
		return _unreg;
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	clearHook(name) {
		this._hooks[name] = void 0;
	}
	deprecateHook(name, deprecated) {
		this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
		const _hooks = this._hooks[name] || [];
		this._hooks[name] = void 0;
		for (const hook of _hooks) this.hook(name, hook);
	}
	deprecateHooks(deprecatedHooks) {
		for (const name in deprecatedHooks) this.deprecateHook(name, deprecatedHooks[name]);
	}
	addHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
		return () => {
			for (const unreg of removeFns) unreg();
			removeFns.length = 0;
		};
	}
	removeHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		for (const key in hooks) this.removeHook(key, hooks[key]);
	}
	removeAllHooks() {
		this._hooks = {};
	}
	callHook(name, ...args) {
		return this.callHookWith(serialTaskCaller, name, args);
	}
	callHookParallel(name, ...args) {
		return this.callHookWith(parallelTaskCaller, name, args);
	}
	callHookWith(caller, name, args) {
		const event = this._before || this._after ? {
			name,
			args,
			context: {}
		} : void 0;
		if (this._before) callEachWith(this._before, event);
		const result = caller(this._hooks[name] ? [...this._hooks[name]] : [], args, name);
		if (result instanceof Promise) return result.finally(() => {
			if (this._after && event) callEachWith(this._after, event);
		});
		if (this._after && event) callEachWith(this._after, event);
		return result;
	}
	beforeEach(function_) {
		this._before = this._before || [];
		this._before.push(function_);
		return () => {
			if (this._before !== void 0) {
				const index = this._before.indexOf(function_);
				if (index !== -1) this._before.splice(index, 1);
			}
		};
	}
	afterEach(function_) {
		this._after = this._after || [];
		this._after.push(function_);
		return () => {
			if (this._after !== void 0) {
				const index = this._after.indexOf(function_);
				if (index !== -1) this._after.splice(index, 1);
			}
		};
	}
};
function createHooks() {
	return new Hookable();
}

function _getAsyncLocalStorage() {
	return globalThis.AsyncLocalStorage || globalThis.process?.getBuiltinModule?.("node:async_hooks")?.AsyncLocalStorage;
}
function createContext(opts = {}) {
	let currentInstance;
	let isSingleton = false;
	const checkConflict = (instance) => {
		if (currentInstance && currentInstance !== instance) throw new Error("Context conflict");
	};
	let als;
	if (opts.asyncContext) {
		const _AsyncLocalStorage = opts.AsyncLocalStorage || _getAsyncLocalStorage();
		if (_AsyncLocalStorage) als = new _AsyncLocalStorage();
		else console.warn("[unctx] `AsyncLocalStorage` is not provided.");
	}
	const _wrapInstance = (instance) => als && instance !== null && typeof instance === "object" ? { __unctx_weak: new WeakRef(instance) } : instance;
	const _unwrapInstance = (store) => store && store.__unctx_weak ? store.__unctx_weak.deref() : store;
	const _getCurrentInstance = () => {
		if (als) {
			const store = als.getStore();
			if (store !== void 0) return _unwrapInstance(store);
		}
		return currentInstance;
	};
	return {
		use: () => {
			const _instance = _getCurrentInstance();
			if (_instance === void 0) throw new Error("Context is not available");
			return _instance;
		},
		tryUse: () => {
			return _getCurrentInstance();
		},
		set: (instance, replace) => {
			if (!replace) checkConflict(instance);
			currentInstance = instance;
			isSingleton = true;
		},
		unset: () => {
			currentInstance = void 0;
			isSingleton = false;
		},
		call: (instance, callback) => {
			checkConflict(instance);
			currentInstance = instance;
			try {
				return als ? als.run(_wrapInstance(instance), callback) : callback();
			} finally {
				if (!isSingleton) currentInstance = void 0;
			}
		},
		async callAsync(instance, callback) {
			currentInstance = instance;
			const onRestore = () => {
				currentInstance = instance;
			};
			const onLeave = () => currentInstance === instance ? onRestore : void 0;
			asyncHandlers.add(onLeave);
			try {
				const r = als ? als.run(_wrapInstance(instance), callback) : callback();
				if (!isSingleton) currentInstance = void 0;
				return await r;
			} finally {
				asyncHandlers.delete(onLeave);
			}
		}
	};
}
function createNamespace(defaultOpts = {}) {
	const contexts = {};
	return { get(key, opts = {}) {
		if (!contexts[key]) contexts[key] = createContext({
			...defaultOpts,
			...opts
		});
		return contexts[key];
	} };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

var captureStackTrace = Error.captureStackTrace;
var Diagnostic = class Diagnostic extends Error {
	name;
	/**
	* The diagnostic code, e.g. `MATH_E001`.
	* Also appears as the `name` property.
	*/
	code;
	/**
	* URL to extended documentation for this diagnostic code.
	* Auto-generated from {@link DefineDiagnosticsOptions.docsBase}.
	*/
	docs;
	/**
	* Optional actionable instructions on how to resolve the problem.
	*/
	fix;
	/**
	* Locations in user code that contributed to this diagnostic, in
	* `file:line:column` format. Relevant when the stack trace doesn't reflect
	* the user's source (e.g. compilers, bundlers), otherwise redundant with the
	* stack and should be omitted.
	*/
	sources;
	/**
	* Alias for {@link Error.message}: the reason this diagnostic was raised.
	*/
	get why() {
		return this.message;
	}
	/**
	* @param init        structured initializer; `why` is required
	* @param captureFrom V8 stack-cutoff frame. Defaults to {@link Diagnostic}
	* so the top of the trace is the `new Diagnostic(...)` call site.
	* `defineDiagnostics` passes its action method to strip its own frames too.
	* Ignored on engines without `Error.captureStackTrace`.
	*/
	constructor(init, captureFrom = Diagnostic) {
		super(init.why, { cause: init.cause });
		this.code = this.name = init.code;
		this.fix = init.fix;
		this.docs = init.docs;
		this.sources = init.sources;
		captureStackTrace?.(this, captureFrom);
	}
	/**
	* Converts the diagnostic into a serializable structured object.
	*/
	toJSON() {
		return {
			name: this.name,
			why: this.why,
			fix: this.fix,
			docs: this.docs,
			sources: this.sources,
			cause: this.cause,
			stack: this.stack
		};
	}
};
/**
* Resolves the docs URL for a code from a `docsBase` (string template or
* resolver function). Shared by {@link defineDiagnostics} and
* {@link defineProdDiagnostics}. Per-code `docs` overrides are handled by the
* caller; this only covers the `docsBase`-derived case.
*
* @internal
*/
function deriveDocs(docsBase, code) {
	return typeof docsBase === "string" ? `${docsBase}/${code.toLowerCase()}` : docsBase?.(code);
}
/**
* Production counterpart to {@link defineDiagnostics}. Returns a `Proxy` that
* builds a minimal {@link Diagnostic} for any accessed code: the code becomes
* the instance `name`, `docs` is derived from `docsBase`, and `why` points to
* the docs URL when one exists (empty otherwise, so the thrown header is just
* the code). It carries no catalog text, so it stays tiny in a bundle.
*
* The strip plugin (`@nostics/unplugin`) can rewrite a `defineDiagnostics()`
* call into a `"production" === 'production'` ternary that selects this
* factory in production, dropping every `why`/`fix` string from the bundle.
*
* @example
* ```ts
* const diagnostics = defineProdDiagnostics({ docsBase: 'https://docs.example.com' })
* throw diagnostics.NUXT_B2011() // NUXT_B2011: https://docs.example.com/nuxt_b2011
* ```
*/
/* @__NO_SIDE_EFFECTS__ */
function defineProdDiagnostics(options = {}) {
	const { docsBase, reporters = [] } = options;
	return new Proxy({}, { get(_target, code) {
		if (typeof code !== "string") return void 0;
		const handle = (params = {}, reporterOptions = {}) => {
			const docs = deriveDocs(docsBase, code);
			const diagnostic = new Diagnostic({
				code,
				why: docs ?? "",
				docs,
				cause: params.cause,
				sources: params.sources
			}, handle);
			for (const reporter of reporters) reporter(diagnostic, reporterOptions);
			return diagnostic;
		};
		return handle;
	} });
}
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/diagnostics/_shared.js
/**
* Shared configuration for the runtime (E<N>xxx) diagnostics catalogs.
*
* Catalogs are split by domain and imported directly where used (no barrel),
* so the browser bundle only pulls in the codes a module references. Pair the
* pure-call annotations on each `defineDiagnostics()` with dev-guarded,
* statement-level report calls so report-only diagnostics strip from production.
*
* Codes are stable, fully-qualified `NUXT_E<NNNN>` identifiers. Codes with a
* dedicated docs page resolve a `see:` URL via {@link docsBase}; the rest opt
* out with `docs: false`.
*/
function docsBase(code) {
	return `https://nuxt.com/docs/4.x/errors/${code.replace("NUXT_", "").toLowerCase()}`;
}
var prodReporter = (diagnostic) => {
	console.error(`[${diagnostic.name}]`);
};
var prodReporters = [prodReporter];
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/diagnostics/core.js
/**
* E1xxx
* Core / Nuxt-instance / lifecycle runtime diagnostics.
*/
var appDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fnuxt.config.mjs
var nuxtLinkDefaults = {
	"componentName": "NuxtLink"};
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/nuxt.js
function getNuxtAppCtx(id = "nuxt-app") {
	return getContext(id, { asyncContext: false });
}
var NuxtPluginIndicator = "__nuxt_plugin";
/** @since 3.0.0 */
function createNuxtApp(options) {
	let hydratingCount = 0;
	const nuxtApp = {
		_id: options.id || "nuxt-app",
		_scope: effectScope(),
		provide: void 0,
		versions: {
			get nuxt() {
				return "4.5.0";
			},
			get vue() {
				return nuxtApp.vueApp.version;
			}
		},
		payload: shallowReactive({
			...options.ssrContext?.payload || {},
			data: shallowReactive({}),
			state: reactive({}),
			once: /* @__PURE__ */ new Set(),
			_errors: shallowReactive({})
		}),
		static: { data: {} },
		runWithContext(fn) {
			if (nuxtApp._scope.active && !getCurrentScope()) return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
			return callWithNuxt(nuxtApp, fn);
		},
		isHydrating: false,
		deferHydration() {
			if (!nuxtApp.isHydrating) return () => {};
			hydratingCount++;
			let called = false;
			return () => {
				if (called) return;
				called = true;
				hydratingCount--;
				if (hydratingCount === 0) {
					nuxtApp.isHydrating = false;
					return nuxtApp.callHook("app:suspense:resolve");
				}
			};
		},
		_asyncDataPromises: {},
		_asyncData: shallowReactive({}),
		_state: shallowReactive({}),
		_payloadRevivers: {},
		...options
	};
	nuxtApp.payload.serverRendered = true;
	if (nuxtApp.ssrContext) {
		nuxtApp.payload.path = nuxtApp.ssrContext.url;
		nuxtApp.ssrContext.nuxt = nuxtApp;
		nuxtApp.ssrContext.payload = nuxtApp.payload;
		nuxtApp.ssrContext.config = {
			public: nuxtApp.ssrContext.runtimeConfig.public,
			app: nuxtApp.ssrContext.runtimeConfig.app
		};
	}
	nuxtApp.hooks = createHooks();
	nuxtApp.hook = nuxtApp.hooks.hook;
	{
		const contextCaller = async function(hooks, args) {
			for (const hook of hooks) await nuxtApp.runWithContext(() => hook(...args));
		};
		nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, args);
	}
	nuxtApp.callHook = nuxtApp.hooks.callHook;
	nuxtApp.provide = (name, value) => {
		const $name = "$" + name;
		defineGetter(nuxtApp, $name, value);
		defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
	};
	defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
	defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
	const runtimeConfig = options.ssrContext.runtimeConfig;
	nuxtApp.provide("config", runtimeConfig);
	return nuxtApp;
}
/** @since 3.0.0 */
async function applyPlugin(nuxtApp, plugin) {
	if (typeof plugin === "function") {
		const run = () => nuxtApp.runWithContext(() => plugin(nuxtApp));
		const { provide } = await run() || {};
		if (provide && typeof provide === "object") for (const key in provide) nuxtApp.provide(key, provide[key]);
	}
}
/** @since 3.0.0 */
async function applyPlugins(nuxtApp, plugins) {
	let error;
	for (const plugin of plugins) try {
		await applyPlugin(nuxtApp, plugin);
	} catch (e) {
		if (!nuxtApp.payload.error) throw e;
		error ||= e;
	}
	if (error) throw nuxtApp.payload.error || error;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtPlugin(plugin) {
	if (typeof plugin === "function") return plugin;
	const _name = plugin._name || plugin.name;
	delete plugin.name;
	return Object.assign(plugin.setup || (() => {}), plugin, {
		[NuxtPluginIndicator]: true,
		_name
	});
}
/**
* Ensures that the setup function passed in has access to the Nuxt instance via `useNuxtApp`.
* @param nuxt A Nuxt instance
* @param setup The function to call
* @since 3.0.0
*/
function callWithNuxt(nuxt, setup, args) {
	const fn = () => setup();
	const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
	return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
}
function tryUseNuxtApp(id) {
	let nuxtAppInstance;
	if (hasInjectionContext()) nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
	nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
	return nuxtAppInstance || null;
}
function useNuxtApp(id) {
	const nuxtAppInstance = tryUseNuxtApp(id);
	if (!nuxtAppInstance) throw appDiagnostics.NUXT_E1001();
	return nuxtAppInstance;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function useRuntimeConfig(_event) {
	return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
	Object.defineProperty(obj, key, { get: () => val });
}
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/utils.js
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/components/injections.js
var PageRouteSymbol = Symbol("route");
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/diagnostics/navigation.js
/**
* E2xxx
* Navigation / routing / middleware runtime diagnostics.
*/
var navigationDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/composables/router.js
/** @since 3.0.0 */
var useRouter = () => {
	return useNuxtApp()?.$router;
};
/** @since 3.0.0 */
var useRoute = (() => {
	if (hasInjectionContext()) return inject(PageRouteSymbol, useNuxtApp()._route);
	return useNuxtApp()._route;
});
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtRouteMiddleware(middleware) {
	return middleware;
}
/** @since 3.0.0 */
var isProcessingMiddleware = () => {
	try {
		if (useNuxtApp()._processingMiddleware) return true;
	} catch {
		return false;
	}
	return false;
};
var HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
var HTML_ATTR_ENCODE_MAP = {
	"&": "&amp;",
	"\"": "&quot;",
	"'": "&#x27;",
	"<": "&lt;",
	">": "&gt;"
};
function encodeForHtmlAttr(value) {
	return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
/**
* A helper that aids in programmatic navigation within your Nuxt application.
*
* Can be called on the server and on the client, within pages, route middleware, plugins, and more.
* @param {RouteLocationRaw | undefined | null} [to] - The route to navigate to. Accepts a route object, string path, `undefined`, or `null`. Defaults to '/'.
* @param {NavigateToOptions} [options] - Optional customization for controlling the behavior of the navigation.
* @returns {Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw} The navigation result, which varies depending on context and options.
* @see https://nuxt.com/docs/4.x/api/utils/navigate-to
* @since 3.0.0
*/
var navigateTo = (to, options) => {
	to ||= "/";
	const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
	const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
	const isExternal = options?.external || isExternalHost;
	if (isExternal) {
		if (!options?.external) throw navigationDiagnostics.NUXT_E2001({ toPath });
		const { protocol } = new URL(toPath, "http://localhost");
		if (protocol && isScriptProtocol(protocol)) throw navigationDiagnostics.NUXT_E2002({
			toPath,
			protocol
		});
	}
	const inMiddleware = isProcessingMiddleware();
	const router = useRouter();
	const nuxtApp = useNuxtApp();
	if (nuxtApp.ssrContext) {
		const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
		const location = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
		const redirect = async function(response) {
			await nuxtApp.callHook("app:redirected");
			const encodedHeader = encodeURL(location, isExternalHost);
			const encodedLoc = encodeForHtmlAttr(encodedHeader);
			nuxtApp.ssrContext["~renderResponse"] = {
				statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
				body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
				headers: { location: encodedHeader }
			};
			return response;
		};
		if (!isExternal && inMiddleware) {
			router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
			return to;
		}
		return redirect(!inMiddleware ? void 0 : false);
	}
	if (isExternal) {
		nuxtApp._scope.stop();
		if (options?.replace) (void 0).replace(toPath);
		else (void 0).href = toPath;
		if (inMiddleware) {
			if (!nuxtApp.isHydrating) return false;
			return new Promise(() => {});
		}
		return Promise.resolve();
	}
	const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
	return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
/**
* @internal
*/
function resolveRouteObject(to) {
	return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
/**
* @internal
*/
function encodeURL(location, isExternalHost = false) {
	const url = new URL(location, "http://localhost");
	if (!isExternalHost) return url.pathname.replace(/^\/{2,}/, "/") + url.search + url.hash;
	if (location.startsWith("//")) return url.toString().replace(url.protocol, "");
	return url.toString();
}
/**
* Encode the pathname of a route location string. Ensures decoded paths like
* `/café` are percent-encoded to match vue-router's encoded route records.
* Already-encoded paths are not double-encoded.
* @internal
*/
function encodeRoutePath(url) {
	const parsed = parseURL(url);
	return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/composables/error.js
var NUXT_ERROR_SIGNATURE = "__nuxt_error";
/** @since 3.0.0 */
var useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
/** @since 3.0.0 */
var showError = (error) => {
	const nuxtError = createError$1(error);
	try {
		const error = /* @__PURE__ */ useError();
		error.value ||= nuxtError;
	} catch {
		throw nuxtError;
	}
	return nuxtError;
};
/** @since 3.0.0 */
var isNuxtError = (error) => !!error && typeof error === "object" && "__nuxt_error" in error;
/** @since 3.0.0 */
var createError$1 = (error) => {
	if (typeof error !== "string" && error.statusText) error.message ??= error.statusText;
	const nuxtError = createError(error);
	Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
		value: true,
		configurable: false,
		writable: false
	});
	Object.defineProperty(nuxtError, "status", {
		get: () => nuxtError.statusCode,
		configurable: true
	});
	Object.defineProperty(nuxtError, "statusText", {
		get: () => nuxtError.statusMessage,
		configurable: true
	});
	return nuxtError;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Ffetch.mjs
if (!globalThis.$fetch) globalThis.$fetch = $fetch.create({ baseURL: baseURL() });
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fglobal-polyfills.mjs
if (!("global" in globalThis)) globalThis.global = globalThis;
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/head/runtime/island-head.js
/**
* No-op `head.push` until the returned `unfreeze` runs. Plugin/transformer
* augmentations on the same head are unaffected.
*/
function freezeHead(head) {
	const realPush = head.push;
	head.push = () => ({
		dispose: () => {},
		patch: () => {},
		_i: 0
	});
	return () => {
		head.push = realPush;
	};
}
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/head/runtime/plugins/unhead.server.js
var plugin$2 = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:head",
	enforce: "pre",
	setup(nuxtApp) {
		const head = nuxtApp.ssrContext.head;
		if (nuxtApp.ssrContext.islandContext) {
			const unfreeze = freezeHead(head);
			nuxtApp.hooks.hookOnce("app:created", unfreeze);
		}
		nuxtApp.vueApp.use(head);
	}
});
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/diagnostics/manifest.js
/**
* E5xxx
* App manifest / route-rules runtime diagnostics.
*/
var manifestDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froute-rules.mjs
var matcher = (m, p) => {
	return [];
};
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default = (path) => defu({}, ...matcher("", typeof path === "string" ? path.toLowerCase() : path).map((r) => r.data).reverse());
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/composables/manifest.js
var routeRulesMatcher = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default;
function getRouteRules(arg) {
	const path = typeof arg === "string" ? arg : arg.path;
	try {
		return routeRulesMatcher(path.toLowerCase());
	} catch (e) {
		manifestDiagnostics.NUXT_E5003({
			path,
			cause: e
		});
		return {};
	}
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fmiddleware.mjs
var globalMiddleware = [/* @__PURE__ */ defineNuxtRouteMiddleware((to) => {})];
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/plugins/router.js
function getRouteFromPath(fullPath) {
	const route = fullPath && typeof fullPath === "object" ? fullPath : {};
	if (typeof fullPath === "object") fullPath = stringifyParsedURL({
		pathname: fullPath.path || "",
		search: stringifyQuery(fullPath.query || {}),
		hash: fullPath.hash || ""
	});
	const url = new URL(fullPath.toString(), "http://localhost");
	return {
		path: url.pathname,
		fullPath,
		query: parseQuery(url.search),
		hash: url.hash,
		params: route.params || {},
		name: void 0,
		matched: route.matched || [],
		redirectedFrom: void 0,
		meta: route.meta || {},
		href: fullPath
	};
}
var plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:router",
	enforce: "pre",
	setup(nuxtApp) {
		const initialURL = nuxtApp.ssrContext.url;
		const routes = [];
		const hooks = {
			"navigate:before": [],
			"resolve:before": [],
			"navigate:after": [],
			"error": []
		};
		const registerHook = (hook, guard) => {
			hooks[hook].push(guard);
			return () => {
				const index = hooks[hook].indexOf(guard);
				if (index !== -1) hooks[hook].splice(index, 1);
			};
		};
		(/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
		const route = reactive(getRouteFromPath(initialURL));
		let navigationCounter = 0;
		async function handleNavigation(url, replace) {
			const navigationId = ++navigationCounter;
			try {
				const to = getRouteFromPath(url);
				for (const middleware of hooks["navigate:before"]) {
					const result = await middleware(to, route);
					if (navigationId !== navigationCounter) return;
					if (result === false || result instanceof Error) return;
					if (typeof result === "string" && result.length) return await handleNavigation(result, true);
				}
				for (const handler of hooks["resolve:before"]) {
					await handler(to, route);
					if (navigationId !== navigationCounter) return;
				}
				Object.assign(route, to);
				for (const middleware of hooks["navigate:after"]) await middleware(to, route);
			} catch (err) {
				for (const handler of hooks.error) await handler(err);
			}
		}
		const router = {
			currentRoute: computed(() => route),
			isReady: () => Promise.resolve(),
			options: {},
			install: () => Promise.resolve(),
			push: (url) => handleNavigation(url),
			replace: (url) => handleNavigation(url),
			back: () => (void 0).history.go(-1),
			go: (delta) => (void 0).history.go(delta),
			forward: () => (void 0).history.go(1),
			beforeResolve: (guard) => registerHook("resolve:before", guard),
			beforeEach: (guard) => registerHook("navigate:before", guard),
			afterEach: (guard) => registerHook("navigate:after", guard),
			onError: (handler) => registerHook("error", handler),
			resolve: getRouteFromPath,
			addRoute: (parentName, route) => {
				routes.push(route);
			},
			getRoutes: () => routes,
			hasRoute: (name) => routes.some((route) => route.name === name),
			removeRoute: (name) => {
				const index = routes.findIndex((route) => route.name === name);
				if (index !== -1) routes.splice(index, 1);
			}
		};
		nuxtApp.vueApp.component("RouterLink", defineComponent({
			functional: true,
			props: {
				to: {
					type: String,
					required: true
				},
				custom: Boolean,
				replace: Boolean,
				activeClass: String,
				exactActiveClass: String,
				ariaCurrentValue: String
			},
			setup: (props, { slots }) => {
				const navigate = () => handleNavigation(props.to, props.replace);
				return () => {
					const route = router.resolve(props.to);
					return props.custom ? slots.default?.({
						href: props.to,
						navigate,
						route
					}) : h("a", {
						href: props.to,
						onClick: (e) => {
							e.preventDefault();
							return navigate();
						}
					}, slots);
				};
			}
		}));
		nuxtApp._route = route;
		nuxtApp._middleware ||= {
			global: [],
			named: {}
		};
		const initialLayout = nuxtApp.payload.state._layout;
		const initialLayoutProps = nuxtApp.payload.state._layoutProps;
		nuxtApp.hooks.hookOnce("app:created", async () => {
			router.beforeEach(async (to, from) => {
				to.meta = reactive(to.meta || {});
				if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
					to.meta.layout = initialLayout;
					to.meta.layoutProps = initialLayoutProps;
				}
				nuxtApp._processingMiddleware = true;
				if (!nuxtApp.ssrContext?.islandContext) {
					const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
					const routeRules = getRouteRules({ path: to.path });
					if (routeRules.appMiddleware) for (const key in routeRules.appMiddleware) {
						const guard = nuxtApp._middleware.named[key];
						if (!guard) continue;
						if (routeRules.appMiddleware[key]) middlewareEntries.add(guard);
						else middlewareEntries.delete(guard);
					}
					for (const middleware of middlewareEntries) {
						const result = await nuxtApp.runWithContext(() => middleware(to, from));
						if (result === false || result instanceof Error) {
							const error = result || createError({
								status: 404,
								statusText: `Page Not Found: ${initialURL}`,
								data: { path: initialURL }
							});
							delete nuxtApp._processingMiddleware;
							return nuxtApp.runWithContext(() => showError(error));
						}
						if (result === true) continue;
						if (result || result === false) return result;
					}
				}
			});
			router.afterEach(() => {
				delete nuxtApp._processingMiddleware;
			});
			await router.replace(initialURL);
			if (!isEqual(route.fullPath, initialURL)) await nuxtApp.runWithContext(() => navigateTo(route.fullPath));
		});
		return { provide: {
			route,
			router
		} };
	}
});
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/diagnostics/head.js
/**
* E6xxx
* Head / unhead runtime diagnostics.
*/
var unheadDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/head/runtime/composables.js
/**
* Injects the head client from the Nuxt context or Vue inject.
*/
function injectHead(nuxtApp) {
	const nuxt = nuxtApp || useNuxtApp();
	return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
		if (hasInjectionContext()) {
			const head = inject(headSymbol);
			if (!head) throw unheadDiagnostics.NUXT_E6001();
			return head;
		}
	});
}
function useHead$1(input, options = {}) {
	return useHead(input, {
		head: options.head || injectHead(options.nuxt),
		...options
	});
}
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/composables/payload.js
/**
* This is an experimental function for configuring passing rich data from server -> client.
* @since 3.4.0
*/
function definePayloadReducer(name, reduce) {
	useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
}
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/plugins/revive-payload.server.js
var reducers = [
	["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
	["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
	["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
	["Ref", (data) => isRef(data) && data.value],
	["Reactive", (data) => isReactive(data) && toRaw(data)]
];
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fplugins.server.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default = [
	plugin$2,
	plugin$1,
	/* @__PURE__ */ defineNuxtPlugin({
		name: "nuxt:revive-payload:server",
		setup() {
			for (const [reducer, fn] of reducers) definePayloadReducer(reducer, fn);
		}
	}),
	/* @__PURE__ */ defineNuxtPlugin({ name: "nuxt:global-components" })
];
//#endregion
//#region ../../packages/core/dist/index.js
var __defProp$1 = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp$1(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var ButtonController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getAriaAttributes() {
		return {
			role: "button",
			"aria-disabled": this.props.disabled || this.props.loading ? true : void 0,
			"aria-busy": this.props.loading ? true : void 0,
			tabIndex: this.props.disabled || this.props.loading ? -1 : 0
		};
	}
	getClassNames() {
		const { variant = "primary", size = "md", fullWidth = false, loading = false, disabled = false } = this.props;
		return [
			"ui-button",
			`ui-button--${variant}`,
			`ui-button--${size}`,
			fullWidth ? "ui-button--full-width" : "",
			loading ? "ui-button--loading" : "",
			disabled ? "ui-button--disabled" : ""
		].filter(Boolean).join(" ");
	}
};
var InputController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getAriaAttributes() {
		const { disabled = false, readOnly = false, required = false, variant = "default" } = this.props;
		return {
			"aria-disabled": disabled ? true : void 0,
			"aria-readonly": readOnly ? true : void 0,
			"aria-required": required ? true : void 0,
			"aria-invalid": variant === "error" ? true : void 0
		};
	}
	getContainerClasses() {
		const { variant = "default", size = "md", disabled = false, readOnly = false } = this.props;
		return [
			"ui-input-container",
			`ui-input-container--${variant}`,
			`ui-input-container--${size}`,
			disabled ? "ui-input-container--disabled" : "",
			readOnly ? "ui-input-container--readonly" : ""
		].filter(Boolean).join(" ");
	}
	getInputClasses() {
		const { disabled = false, readOnly = false } = this.props;
		return [
			"ui-input",
			disabled ? "ui-input--disabled" : "",
			readOnly ? "ui-input--readonly" : ""
		].filter(Boolean).join(" ");
	}
};
var CheckboxController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getAriaAttributes() {
		const { disabled = false, required = false, indeterminate = false, checked = false } = this.props;
		return {
			role: "checkbox",
			"aria-checked": indeterminate ? "mixed" : checked,
			"aria-disabled": disabled ? true : void 0,
			"aria-required": required ? true : void 0
		};
	}
	getClassNames() {
		const { checked = false, indeterminate = false, disabled = false } = this.props;
		return [
			"ui-checkbox-container",
			checked && !indeterminate ? "ui-checkbox-container--checked" : "",
			indeterminate ? "ui-checkbox-container--indeterminate" : "",
			disabled ? "ui-checkbox-container--disabled" : ""
		].filter(Boolean).join(" ");
	}
	getInputClasses() {
		return "ui-checkbox-input";
	}
	getIndicatorClasses() {
		const { checked = false, indeterminate = false } = this.props;
		return [
			"ui-checkbox-indicator",
			checked && !indeterminate ? "ui-checkbox-indicator--checked" : "",
			indeterminate ? "ui-checkbox-indicator--indeterminate" : ""
		].filter(Boolean).join(" ");
	}
};
var RadioController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getAriaAttributes() {
		const { checked = false, disabled = false } = this.props;
		return {
			role: "radio",
			"aria-checked": checked,
			"aria-disabled": disabled ? true : void 0
		};
	}
	getClassNames() {
		const { checked = false, disabled = false } = this.props;
		return [
			"ui-radio-container",
			checked ? "ui-radio-container--checked" : "",
			disabled ? "ui-radio-container--disabled" : ""
		].filter(Boolean).join(" ");
	}
	getInputClasses() {
		return "ui-radio-input";
	}
	getIndicatorClasses() {
		const { checked = false } = this.props;
		return ["ui-radio-indicator", checked ? "ui-radio-indicator--checked" : ""].filter(Boolean).join(" ");
	}
};
var FieldController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getContainerClasses() {
		const { disabled = false, error } = this.props;
		return [
			"ui-field",
			error ? "ui-field--error" : "",
			disabled ? "ui-field--disabled" : ""
		].filter(Boolean).join(" ");
	}
	getLabelClasses() {
		const { required = false } = this.props;
		return ["ui-field__label", required ? "ui-field__label--required" : ""].filter(Boolean).join(" ");
	}
	getHelperTextClasses() {
		return "ui-field__helper-text";
	}
	getErrorTextClasses() {
		return "ui-field__error-text";
	}
	getAriaAttributes() {
		const { error, required = false, disabled = false } = this.props;
		return {
			"aria-invalid": error ? true : void 0,
			"aria-required": required ? true : void 0,
			"aria-disabled": disabled ? true : void 0
		};
	}
	hasError() {
		return !!this.props.error;
	}
	hasHelperText() {
		return !!this.props.helperText;
	}
};
var FieldGroupController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getContainerClasses() {
		const { disabled = false } = this.props;
		return ["ui-field-group", disabled ? "ui-field-group--disabled" : ""].filter(Boolean).join(" ");
	}
	getAriaAttributes() {
		const { required = false, disabled = false } = this.props;
		return {
			"aria-disabled": disabled ? true : void 0,
			"aria-required": required ? true : void 0
		};
	}
	isDisabled() {
		return this.props.disabled;
	}
};
var FormController = class {
	constructor(options) {
		__publicField(this, "values");
		__publicField(this, "initialValues");
		__publicField(this, "errors", {});
		__publicField(this, "touched", {});
		__publicField(this, "isSubmitting", false);
		__publicField(this, "validateFn");
		__publicField(this, "onSubmitFn");
		__publicField(this, "listeners", /* @__PURE__ */ new Set());
		this.initialValues = { ...options.initialValues };
		this.values = { ...options.initialValues };
		this.validateFn = options.validate;
		this.onSubmitFn = options.onSubmit;
	}
	subscribe(listener) {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}
	notify() {
		this.listeners.forEach((listener) => {
			listener();
		});
	}
	getValues() {
		return this.values;
	}
	getValue(name) {
		return this.values[name];
	}
	setFieldValue(name, value, shouldValidate = true) {
		this.values = {
			...this.values,
			[name]: value
		};
		if (shouldValidate && this.validateFn) this.validateForm();
		else this.notify();
	}
	getErrors() {
		return this.errors;
	}
	getFieldError(name) {
		return this.errors[name];
	}
	setFieldError(name, error) {
		this.errors = {
			...this.errors,
			[name]: error
		};
		this.notify();
	}
	getTouched() {
		return this.touched;
	}
	isFieldTouched(name) {
		return !!this.touched[name];
	}
	setFieldTouched(name, isTouched = true, shouldValidate = true) {
		this.touched = {
			...this.touched,
			[name]: isTouched
		};
		if (shouldValidate && this.validateFn) this.validateForm();
		else this.notify();
	}
	getIsSubmitting() {
		return this.isSubmitting;
	}
	async validateForm() {
		if (!this.validateFn) {
			this.errors = {};
			this.notify();
			return {};
		}
		try {
			const res = await this.validateFn(this.values);
			this.errors = res;
		} catch (err) {
			if (err && typeof err === "object" && "errors" in err) this.errors = err.errors;
		}
		this.notify();
		return this.errors;
	}
	async handleSubmit(e) {
		if (e?.preventDefault) e.preventDefault();
		this.isSubmitting = true;
		const allTouched = {};
		Object.keys(this.values).forEach((key) => {
			allTouched[key] = true;
		});
		this.touched = allTouched;
		const validationErrors = await this.validateForm();
		if (!Object.values(validationErrors).some((err) => Boolean(err)) && this.onSubmitFn) try {
			await this.onSubmitFn(this.values);
		} finally {
			this.isSubmitting = false;
			this.notify();
		}
		else {
			this.isSubmitting = false;
			this.notify();
		}
	}
	resetForm(nextValues) {
		const resetTo = nextValues ? { ...nextValues } : { ...this.initialValues };
		this.values = resetTo;
		this.errors = {};
		this.touched = {};
		this.isSubmitting = false;
		this.notify();
	}
};
var FormFieldController = class {
	constructor(options) {
		__publicField(this, "name");
		__publicField(this, "itemId");
		this.name = options.name;
		this.itemId = options.itemId ?? `evara-form-item-${Math.random().toString(36).substring(2, 9)}`;
	}
	getName() {
		return this.name;
	}
	getItemId() {
		return this.itemId;
	}
	getControlId() {
		return `${this.itemId}-control`;
	}
	getDescriptionId() {
		return `${this.itemId}-description`;
	}
	getMessageId() {
		return `${this.itemId}-message`;
	}
	getControlAriaAttributes(hasError, hasDescription) {
		const describedByParts = [];
		if (hasDescription) describedByParts.push(this.getDescriptionId());
		if (hasError) describedByParts.push(this.getMessageId());
		return {
			id: this.getControlId(),
			"aria-invalid": hasError ? "true" : void 0,
			"aria-describedby": describedByParts.length > 0 ? describedByParts.join(" ") : void 0
		};
	}
	getLabelProps() {
		return { htmlFor: this.getControlId() };
	}
};
var InputGroupController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getContainerClasses() {
		const { size = "md", disabled = false } = this.props;
		return [
			"ui-input-group",
			`ui-input-group--${size}`,
			disabled ? "ui-input-group--disabled" : ""
		].filter(Boolean).join(" ");
	}
	getAriaAttributes() {
		const { disabled = false } = this.props;
		return { "aria-disabled": disabled ? true : void 0 };
	}
	isDisabled() {
		return this.props.disabled;
	}
};
var InputOTPController = class {
	constructor(props) {
		__publicField(this, "props");
		__publicField(this, "currentIndex", 0);
		this.props = props;
	}
	getContainerClasses() {
		const { size = "md", disabled = false } = this.props;
		return [
			"ui-input-otp",
			`ui-input-otp--${size}`,
			disabled ? "ui-input-otp--disabled" : ""
		].filter(Boolean).join(" ");
	}
	getInputClasses(index) {
		const { disabled = false } = this.props;
		return [
			"ui-input-otp__input",
			`ui-input-otp__input--${index.toString()}`,
			disabled ? "ui-input-otp__input--disabled" : ""
		].filter(Boolean).join(" ");
	}
	getAriaAttributes() {
		const { disabled = false, length = 6 } = this.props;
		return {
			role: "group",
			"aria-disabled": disabled ? true : void 0,
			"aria-label": `One-time password, ${length.toString()} digits`
		};
	}
	handleKeyDown(event, index, value) {
		const { length = 6, disabled = false } = this.props;
		if (disabled) return;
		const key = event.key;
		if (key === "Backspace") {
			if (!value[index]) this.currentIndex = Math.max(0, index - 1);
			else this.currentIndex = index;
			return;
		}
		if (key === "ArrowLeft") {
			this.currentIndex = Math.max(0, index - 1);
			return;
		}
		if (key === "ArrowRight") {
			this.currentIndex = Math.min(length - 1, index + 1);
			return;
		}
		if (/^\d$/.test(key)) this.currentIndex = Math.min(length - 1, index + 1);
	}
	handlePaste(event, length) {
		const { disabled = false } = this.props;
		if (disabled) return null;
		return (event.clipboardData?.getData("text") ?? "").replace(/\D/g, "").slice(0, length) || null;
	}
	getCurrentIndex() {
		return this.currentIndex;
	}
	setCurrentIndex(index) {
		this.currentIndex = index;
	}
	isDisabled() {
		return this.props.disabled;
	}
	getLength() {
		return this.props.length ?? 6;
	}
};
var CardController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getCardClasses() {
		const { variant = "default", elevation = "md" } = this.props;
		return [
			"ui-card",
			`ui-card--${variant}`,
			`ui-card--elevation-${elevation}`
		].filter(Boolean).join(" ");
	}
	getAriaAttributes() {
		const { disabled } = this.props;
		return { "aria-disabled": disabled ? true : void 0 };
	}
};
var SeparatorController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getSeparatorClasses() {
		const { orientation = "horizontal", color = "default" } = this.props;
		return [
			"ui-separator",
			`ui-separator--${orientation}`,
			`ui-separator--${color}`
		].filter(Boolean).join(" ");
	}
	getAriaAttributes() {
		const { orientation = "horizontal" } = this.props;
		return {
			role: "separator",
			"aria-orientation": orientation
		};
	}
};
var AvatarController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getAvatarClasses() {
		const { size = "md", status } = this.props;
		return [
			"ui-avatar",
			`ui-avatar--${size}`,
			status ? `ui-avatar--status-${status}` : ""
		].filter(Boolean).join(" ");
	}
	getImageClasses() {
		return "ui-avatar__image";
	}
	getInitialsClasses() {
		return "ui-avatar__initials";
	}
	getStatusIndicatorClasses() {
		return "ui-avatar__status-indicator";
	}
	getAriaAttributes() {
		const { alt, status } = this.props;
		return {
			"aria-label": alt ?? "Avatar",
			"aria-hidden": status ? void 0 : void 0
		};
	}
	hasImage() {
		return !!this.props.src;
	}
	hasInitials() {
		return !!this.props.initials;
	}
	hasStatus() {
		return !!this.props.status;
	}
	getStatus() {
		return this.props.status;
	}
};
var BadgeController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getBadgeClasses() {
		const { color = "default", size = "sm", position } = this.props;
		return [
			"ui-badge",
			`ui-badge--${color}`,
			`ui-badge--${size}`,
			position ? `ui-badge--${position}` : ""
		].filter(Boolean).join(" ");
	}
	getAriaAttributes() {
		return { role: "status" };
	}
	getPosition() {
		return this.props.position;
	}
};
var AlertController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getAlertClasses() {
		const { variant = "info" } = this.props;
		return ["ui-alert", `ui-alert--${variant}`].filter(Boolean).join(" ");
	}
	getIconClasses() {
		return "ui-alert__icon";
	}
	getContentClasses() {
		return "ui-alert__content";
	}
	getCloseButtonClasses() {
		return "ui-alert__close-button";
	}
	getAriaAttributes() {
		return {
			role: "alert",
			"aria-live": "polite",
			"aria-atomic": true
		};
	}
	isDismissible() {
		return this.props.dismissible;
	}
	shouldShowIcon() {
		return this.props.showIcon;
	}
	getVariant() {
		return this.props.variant;
	}
};
var ProgressBarController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getProgressBarClasses() {
		const { size = "md", color = "default", indeterminate = false } = this.props;
		return [
			"ui-progress-bar",
			`ui-progress-bar--${size}`,
			`ui-progress-bar--${color}`,
			indeterminate ? "ui-progress-bar--indeterminate" : ""
		].filter(Boolean).join(" ");
	}
	getFillClasses() {
		return "ui-progress-bar__fill";
	}
	getAriaAttributes() {
		const { value = 0, indeterminate = false } = this.props;
		return {
			role: "progressbar",
			"aria-valuenow": indeterminate ? void 0 : value,
			"aria-valuemin": indeterminate ? void 0 : 0,
			"aria-valuemax": indeterminate ? void 0 : 100,
			"aria-valuetext": indeterminate ? "Loading..." : `${value.toString()}%`
		};
	}
	getFillStyle() {
		const { value = 0, indeterminate = false } = this.props;
		if (indeterminate) return;
		return { width: `${Math.min(100, Math.max(0, value)).toString()}%` };
	}
	isIndeterminate() {
		return this.props.indeterminate;
	}
	getValue() {
		return this.props.value;
	}
};
var SkeletonController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getSkeletonClasses() {
		const { shape = "text", animated = true } = this.props;
		return [
			"ui-skeleton",
			`ui-skeleton--${shape}`,
			animated ? "ui-skeleton--animated" : ""
		].filter(Boolean).join(" ");
	}
	getAriaAttributes() {
		return {
			role: "status",
			"aria-label": "Loading..."
		};
	}
	getShape() {
		return this.props.shape;
	}
	isAnimated() {
		return this.props.animated;
	}
};
var SpinnerController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getSpinnerClasses() {
		const { size = "md", color = "default" } = this.props;
		return [
			"ui-spinner",
			`ui-spinner--${size}`,
			`ui-spinner--${color}`
		].filter(Boolean).join(" ");
	}
	getAriaAttributes() {
		return {
			role: "status",
			"aria-label": "Loading..."
		};
	}
	getSize() {
		return this.props.size;
	}
	getColor() {
		return this.props.color;
	}
};
var BreadcrumbController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getBreadcrumbClasses() {
		return "ui-breadcrumb";
	}
	getListClasses() {
		return "ui-breadcrumb__list";
	}
	getItemClasses(isCurrent) {
		return ["ui-breadcrumb__item", isCurrent ? "ui-breadcrumb__item--current" : ""].filter(Boolean).join(" ");
	}
	getLinkClasses() {
		return "ui-breadcrumb__link";
	}
	getCurrentClasses() {
		return "ui-breadcrumb__current";
	}
	getSeparatorClasses() {
		return "ui-breadcrumb__separator";
	}
	getAriaAttributes() {
		return {
			role: "navigation",
			"aria-label": "Breadcrumb"
		};
	}
	getSeparator() {
		return this.props.separator ?? "/";
	}
	getItems() {
		return this.props.items;
	}
};
var PaginationController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getPaginationClasses() {
		const { size = "md" } = this.props;
		return ["ui-pagination", `ui-pagination--${size}`].filter(Boolean).join(" ");
	}
	getListClasses() {
		return "ui-pagination__list";
	}
	getItemClasses(isActive, isDisabled) {
		return [
			"ui-pagination__item",
			isActive ? "ui-pagination__item--active" : "",
			isDisabled ? "ui-pagination__item--disabled" : ""
		].filter(Boolean).join(" ");
	}
	getLinkClasses() {
		return "ui-pagination__link";
	}
	getInfoClasses() {
		return "ui-pagination__info";
	}
	getAriaAttributes() {
		return {
			role: "navigation",
			"aria-label": "Pagination"
		};
	}
	getCurrentPage() {
		return this.props.currentPage;
	}
	getTotalPages() {
		return this.props.totalPages;
	}
	getItemsPerPage() {
		return this.props.itemsPerPage;
	}
	getTotalItems() {
		return this.props.totalItems;
	}
	canGoToPrev() {
		return this.props.currentPage > 1;
	}
	canGoToNext() {
		return this.props.currentPage < this.props.totalPages;
	}
	getVisiblePages() {
		const { currentPage, totalPages } = this.props;
		const pages = [];
		if (totalPages <= 7) for (let i = 1; i <= totalPages; i++) pages.push(i);
		else if (currentPage <= 4) {
			for (let i = 1; i <= 5; i++) pages.push(i);
			pages.push(-1);
			pages.push(totalPages);
		} else if (currentPage >= totalPages - 3) {
			pages.push(1);
			pages.push(-1);
			for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
		} else {
			pages.push(1);
			pages.push(-1);
			for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
			pages.push(-1);
			pages.push(totalPages);
		}
		return pages;
	}
};
var DialogController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getDialogClasses() {
		return "ui-dialog";
	}
	getOverlayClasses() {
		return "ui-dialog__overlay";
	}
	getContentClasses() {
		return "ui-dialog__content";
	}
	getHeaderClasses() {
		return "ui-dialog__header";
	}
	getBodyClasses() {
		return "ui-dialog__body";
	}
	getFooterClasses() {
		return "ui-dialog__footer";
	}
	getCloseButtonClasses() {
		return "ui-dialog__close-button";
	}
	getAriaAttributes() {
		const { id, ariaLabelledBy, ariaDescribedBy } = this.props;
		return {
			role: "dialog",
			"aria-modal": true,
			"aria-labelledby": ariaLabelledBy,
			"aria-describedby": ariaDescribedBy,
			id
		};
	}
	shouldCloseOnEscape() {
		return this.props.closeOnEscape !== false;
	}
	shouldCloseOnOverlayClick() {
		return this.props.closeOnOverlayClick !== false;
	}
	shouldTrapFocus() {
		return this.props.trapFocus !== false;
	}
	isOpen() {
		return this.props.open;
	}
	getDataAttributes() {
		return { "data-state": this.props.open ? "open" : "closed" };
	}
};
var PopoverController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getPopoverClasses() {
		const { position = "bottom" } = this.props;
		return ["ui-popover", `ui-popover--${position}`].filter(Boolean).join(" ");
	}
	getContentClasses() {
		return "ui-popover__content";
	}
	getArrowClasses() {
		return "ui-popover__arrow";
	}
	getAriaAttributes() {
		return {
			role: "dialog",
			"aria-modal": false
		};
	}
	shouldCloseOnClickOutside() {
		return this.props.closeOnClickOutside !== false;
	}
	getPosition() {
		return this.props.position;
	}
	isOpen() {
		return this.props.open;
	}
	getDataAttributes() {
		return {
			"data-state": this.props.open ? "open" : "closed",
			"data-side": this.props.position ?? "bottom"
		};
	}
};
var AlertDialogController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getAlertDialogClasses() {
		return "ui-alert-dialog";
	}
	getOverlayClasses() {
		return "ui-alert-dialog__overlay";
	}
	getContentClasses() {
		return "ui-alert-dialog__content";
	}
	getHeaderClasses() {
		return "ui-alert-dialog__header";
	}
	getTitleClasses() {
		return "ui-alert-dialog__title";
	}
	getBodyClasses() {
		return "ui-alert-dialog__body";
	}
	getDescriptionClasses() {
		return "ui-alert-dialog__description";
	}
	getFooterClasses() {
		return "ui-alert-dialog__footer";
	}
	getConfirmButtonClasses() {
		return "ui-alert-dialog__confirm-button";
	}
	getCancelButtonClasses() {
		return "ui-alert-dialog__cancel-button";
	}
	getAriaAttributes() {
		const { title, description } = this.props;
		return {
			role: "alertdialog",
			"aria-modal": true,
			"aria-labelledby": title ? "alert-dialog-title" : void 0,
			"aria-describedby": description ? "alert-dialog-description" : void 0
		};
	}
	getTitle() {
		return this.props.title;
	}
	getDescription() {
		return this.props.description;
	}
	getConfirmLabel() {
		return this.props.confirmLabel ?? "Confirm";
	}
	getCancelLabel() {
		return this.props.cancelLabel ?? "Cancel";
	}
	isOpen() {
		return this.props.open;
	}
};
var ButtonGroupController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getButtonGroupClasses() {
		const { orientation = "horizontal", size = "md" } = this.props;
		return [
			"ui-button-group",
			`ui-button-group--${orientation}`,
			`ui-button-group--${size}`
		].filter(Boolean).join(" ");
	}
	getAriaAttributes() {
		return { role: "group" };
	}
	getOrientation() {
		return this.props.orientation;
	}
	getSize() {
		return this.props.size;
	}
};
var SelectController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getSelectClasses() {
		const { size = "md", disabled = false, multiple = false } = this.props;
		return [
			"ui-select",
			`ui-select--${size}`,
			disabled ? "ui-select--disabled" : "",
			multiple ? "ui-select--multiple" : ""
		].filter(Boolean).join(" ");
	}
	getTriggerClasses() {
		return "ui-select__trigger";
	}
	getDropdownClasses() {
		return "ui-select__dropdown";
	}
	getOptionClasses(option, isSelected, isHighlighted) {
		return [
			"ui-select__option",
			isSelected ? "ui-select__option--selected" : "",
			isHighlighted ? "ui-select__option--highlighted" : "",
			option.disabled ? "ui-select__option--disabled" : ""
		].filter(Boolean).join(" ");
	}
	getSearchInputClasses() {
		return "ui-select__search";
	}
	getAriaAttributes() {
		const { multiple, disabled, placeholder } = this.props;
		return {
			role: "combobox",
			"aria-expanded": false,
			"aria-haspopup": "listbox",
			"aria-disabled": disabled,
			"aria-placeholder": placeholder,
			"aria-multiselectable": multiple
		};
	}
	getOptions() {
		return this.props.options;
	}
	isMultiple() {
		return this.props.multiple;
	}
	isSearchable() {
		return this.props.searchable;
	}
	isDisabled() {
		return this.props.disabled;
	}
	getPlaceholder() {
		return this.props.placeholder;
	}
	getValue() {
		return this.props.value;
	}
	getDefaultValue() {
		return this.props.defaultValue;
	}
};
var DatePickerController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getDatePickerClasses() {
		const { size = "md", disabled = false, range = false } = this.props;
		return [
			"ui-date-picker",
			`ui-date-picker--${size}`,
			disabled ? "ui-date-picker--disabled" : "",
			range ? "ui-date-picker--range" : ""
		].filter(Boolean).join(" ");
	}
	getTriggerClasses() {
		return "ui-date-picker__trigger";
	}
	getCalendarClasses() {
		return "ui-date-picker__calendar";
	}
	getHeaderClasses() {
		return "ui-date-picker__header";
	}
	getMonthClasses() {
		return "ui-date-picker__month";
	}
	getYearClasses() {
		return "ui-date-picker__year";
	}
	getNavigationClasses() {
		return "ui-date-picker__navigation";
	}
	getDaysHeaderClasses() {
		return "ui-date-picker__days-header";
	}
	getDayClasses() {
		return "ui-date-picker__day";
	}
	getDateClasses(_date, isSelected, isInRange, isDisabled) {
		return [
			"ui-date-picker__date",
			isSelected ? "ui-date-picker__date--selected" : "",
			isInRange ? "ui-date-picker__date--in-range" : "",
			isDisabled ? "ui-date-picker__date--disabled" : ""
		].filter(Boolean).join(" ");
	}
	getAriaAttributes() {
		const { disabled, placeholder } = this.props;
		return {
			role: "textbox",
			"aria-disabled": disabled,
			"aria-placeholder": placeholder
		};
	}
	isRange() {
		return this.props.range;
	}
	isDisabled() {
		return this.props.disabled;
	}
	getPlaceholder() {
		return this.props.placeholder;
	}
	getValue() {
		return this.props.value;
	}
	getDefaultValue() {
		return this.props.defaultValue;
	}
	getMinDate() {
		return this.props.minDate;
	}
	getMaxDate() {
		return this.props.maxDate;
	}
	isDateDisabled(date) {
		const { minDate, maxDate } = this.props;
		if (minDate && date < minDate) return true;
		if (maxDate && date > maxDate) return true;
		return false;
	}
	isDateSelected(date) {
		const value = this.props.value;
		if (!value) return false;
		if (this.isRange()) {
			const range = value;
			const startSelected = range.start ? this.isSameDay(date, range.start) : false;
			const endSelected = range.end ? this.isSameDay(date, range.end) : false;
			if (startSelected) return true;
			if (endSelected) return true;
			return false;
		}
		return this.isSameDay(date, value);
	}
	isDateInRange(date) {
		if (!this.isRange()) return false;
		const value = this.props.value;
		if (!value.start || !value.end) return false;
		return date >= value.start && date <= value.end;
	}
	isSameDay(date1, date2) {
		return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
	}
};
var CalendarController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getCalendarClasses() {
		return "ui-calendar";
	}
	getHeaderClasses() {
		return "ui-calendar__header";
	}
	getMonthClasses() {
		return "ui-calendar__month";
	}
	getYearClasses() {
		return "ui-calendar__year";
	}
	getNavigationClasses() {
		return "ui-calendar__navigation";
	}
	getDaysHeaderClasses() {
		return "ui-calendar__days-header";
	}
	getDayClasses() {
		return "ui-calendar__day";
	}
	getDateClasses(_date, isSelected, isToday, isDisabled) {
		return [
			"ui-calendar__date",
			isSelected ? "ui-calendar__date--selected" : "",
			isToday ? "ui-calendar__date--today" : "",
			isDisabled ? "ui-calendar__date--disabled" : ""
		].filter(Boolean).join(" ");
	}
	getAriaAttributes() {
		return {
			role: "grid",
			"aria-label": "Calendar"
		};
	}
	getValue() {
		return this.props.value;
	}
	getDefaultValue() {
		return this.props.defaultValue;
	}
	getMinDate() {
		return this.props.minDate;
	}
	getMaxDate() {
		return this.props.maxDate;
	}
	getDisabledDates() {
		return this.props.disabledDates;
	}
	isDateDisabled(date) {
		const { minDate, maxDate, disabledDates } = this.props;
		if (minDate && date < minDate) return true;
		if (maxDate && date > maxDate) return true;
		if (disabledDates) return disabledDates.some((disabledDate) => this.isSameDay(date, disabledDate));
		return false;
	}
	isDateSelected(date) {
		const value = this.props.value;
		if (!value) return false;
		return this.isSameDay(date, value);
	}
	isDateToday(date) {
		const today = /* @__PURE__ */ new Date();
		return this.isSameDay(date, today);
	}
	isSameDay(date1, date2) {
		return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
	}
};
var ContextMenuController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getContextMenuClasses() {
		return "ui-context-menu";
	}
	getItemClasses(disabled, divider) {
		return [
			"ui-context-menu__item",
			disabled ? "ui-context-menu__item--disabled" : "",
			divider ? "ui-context-menu__item--divider" : ""
		].filter(Boolean).join(" ");
	}
	getAriaAttributes() {
		return { role: "menu" };
	}
	getItems() {
		return this.props.items;
	}
	getPosition() {
		return {
			x: this.props.x ?? 0,
			y: this.props.y ?? 0
		};
	}
	isOpen() {
		return this.props.open;
	}
};
var CarouselController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getCarouselClasses() {
		return "ui-carousel";
	}
	getTrackClasses() {
		return "ui-carousel__track";
	}
	getSlideClasses() {
		return "ui-carousel__slide";
	}
	getArrowClasses() {
		return "ui-carousel__arrow";
	}
	getArrowPrevClasses() {
		return "ui-carousel__arrow--prev";
	}
	getArrowNextClasses() {
		return "ui-carousel__arrow--next";
	}
	getDotsClasses() {
		return "ui-carousel__dots";
	}
	getDotClasses(isActive) {
		return ["ui-carousel__dot", isActive ? "ui-carousel__dot--active" : ""].filter(Boolean).join(" ");
	}
	getAriaAttributes() {
		return {
			role: "region",
			"aria-label": "Carousel"
		};
	}
	isAutoplay() {
		return this.props.autoplay;
	}
	getInterval() {
		return this.props.interval ?? 5e3;
	}
	isInfinite() {
		return this.props.infinite;
	}
	showArrows() {
		return this.props.showArrows !== false;
	}
	showDots() {
		return this.props.showDots !== false;
	}
};
var ResizableController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getResizableClasses() {
		return "ui-resizable";
	}
	getHandleClasses(handle) {
		return ["ui-resizable__handle", `ui-resizable__handle--${handle}`].filter(Boolean).join(" ");
	}
	getAriaAttributes() {
		return {
			role: "region",
			"aria-label": "Resizable"
		};
	}
	getWidth() {
		return this.props.width;
	}
	getHeight() {
		return this.props.height;
	}
	getMinWidth() {
		return this.props.minWidth;
	}
	getMaxWidth() {
		return this.props.maxWidth;
	}
	getMinHeight() {
		return this.props.minHeight;
	}
	getMaxHeight() {
		return this.props.maxHeight;
	}
	getHandles() {
		return this.props.handles ?? ["se"];
	}
	constrainWidth(width) {
		const minWidth = this.getMinWidth();
		const maxWidth = this.getMaxWidth();
		if (minWidth !== void 0 && width < minWidth) return minWidth;
		if (maxWidth !== void 0 && width > maxWidth) return maxWidth;
		return width;
	}
	constrainHeight(height) {
		const minHeight = this.getMinHeight();
		const maxHeight = this.getMaxHeight();
		if (minHeight !== void 0 && height < minHeight) return minHeight;
		if (maxHeight !== void 0 && height > maxHeight) return maxHeight;
		return height;
	}
};
var SliderController = class {
	constructor(props) {
		__publicField(this, "props");
		this.props = props;
	}
	getSliderClasses() {
		const { size = "md", disabled = false, range = false } = this.props;
		return [
			"ui-slider",
			`ui-slider--${size}`,
			disabled ? "ui-slider--disabled" : "",
			range ? "ui-slider--range" : ""
		].filter(Boolean).join(" ");
	}
	getTrackClasses() {
		return "ui-slider__track";
	}
	getFillClasses() {
		return "ui-slider__fill";
	}
	getThumbClasses(isActive) {
		return ["ui-slider__thumb", isActive ? "ui-slider__thumb--active" : ""].filter(Boolean).join(" ");
	}
	getAriaAttributes() {
		const { disabled, min, max, step } = this.props;
		const value = this.getValue();
		return {
			role: "slider",
			"aria-disabled": disabled,
			"aria-valuemin": min,
			"aria-valuemax": max,
			"aria-valuenow": value,
			"aria-valuetext": value?.toString(),
			"aria-valuetep": step
		};
	}
	getValue() {
		return this.props.value ?? this.props.defaultValue;
	}
	getMin() {
		return this.props.min ?? 0;
	}
	getMax() {
		return this.props.max ?? 100;
	}
	getStep() {
		return this.props.step ?? 1;
	}
	isRange() {
		return this.props.range;
	}
	isDisabled() {
		return this.props.disabled;
	}
	getPercentage(value) {
		const min = this.getMin();
		const max = this.getMax();
		const percentage = (value - min) / (max - min) * 100;
		return Math.max(0, Math.min(100, percentage));
	}
	getValueFromPercentage(percentage) {
		const min = this.getMin();
		const max = this.getMax();
		const step = this.getStep();
		const rawValue = min + percentage / 100 * (max - min);
		const steppedValue = Math.round(rawValue / step) * step;
		return Math.max(min, Math.min(max, steppedValue));
	}
};
/**
* @file utils.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary DOM manipulation, prop merging, and keyboard constants utilities.
*
* @description
* Implements prop merging algorithms with event handler chaining, focusable DOM element querying,
* safe focus execution helpers, and keyboard event code constants.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file index.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Utility functions and string formatting helpers for core controllers.
*
* @description
* Provides class name concatenation helper `cn`, unique DOM ID generator `createId`,
* execution debouncer `debounce`, and re-exports object property merging helpers.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file index.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Core design system constants for sizes, variants, and colors.
*
* @description
* Defines immutable constant maps for element dimensions, visual style variants,
* and semantic status color tokens across all Evara UI component controllers.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Button.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Button component state and accessibility attributes.
*
* @description
* Computes CSS class names, tab index values, and ARIA accessibility properties for framework-agnostic buttons.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Input.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Input text box component.
*
* @description
* Computes class names, sizing indicators, error/success variants, disabled/readonly states, and text input ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Checkbox.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Checkbox form input component.
*
* @description
* Computes checked, unchecked, and indeterminate (mixed) state class names, indicator styles, and ARIA attributes for checkboxes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Radio.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controllers for Radio and RadioGroup components.
*
* @description
* Computes CSS class names, checked radio indicators, disabled state styles, and accessibility radiogroup/radio ARIA roles.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Field.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Field form wrapper component.
*
* @description
* Computes container class names, required label styles, helper/error text styling, and invalid/required ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file FieldGroup.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for FieldGroup form input grouping component.
*
* @description
* Computes CSS class names, disabled states, required field group status, and group accessibility ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Form.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Form state management, validation, and submission processing.
*
* @description
* Manages form field values, validation callbacks, touched flags, submit listeners, error maps, and reset actions.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Field.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless FormFieldController logic for field identification and ARIA binding metadata.
*
* @description
* Manages form field element IDs, label associations, error indicator IDs, and control ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file InputGroup.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for InputGroup container component.
*
* @description
* Computes class names, sizing indicators, disabled states, and ARIA group accessibility attributes for input groups.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file InputOTP.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for InputOTP digit code component.
*
* @description
* Computes class names, digit focus indices, arrow/backspace keyboard navigation, paste extraction, and group ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Card.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Card component styling and accessibility attributes.
*
* @description
* Computes container class names, elevation levels, and ARIA disabled attributes for framework-agnostic cards.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Separator.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Separator divider line component.
*
* @description
* Computes class names for horizontal and vertical layout dividers, color themes, and separator ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Avatar.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Avatar user profile picture components.
*
* @description
* Computes CSS class names, status indicator styling, initials fallback flags, and ARIA labels for user avatars.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Badge.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Badge component styling and accessibility status roles.
*
* @description
* Computes class names, color tokens, sizing indicators, positioning classes, and ARIA status roles for badges.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Alert.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for the Alert component state and accessibility attributes.
*
* @description
* Manages class names, ARIA accessibility attributes, dismissibility flags, and icon rendering states
* for the framework-agnostic Alert component.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file ProgressBar.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for ProgressBar progress indicator component.
*
* @description
* Computes class names, fill bar width styles, indeterminate progress animation flags, and progressbar ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Skeleton.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Skeleton content loading placeholder component.
*
* @description
* Computes class names, shapes (text, circle, rectangle, square), pulse animations, and status loading ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Spinner.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Spinner loading indicator component.
*
* @description
* Computes class names, sizing indicators, color variants, and status loading ARIA attributes for spinning activity indicators.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Breadcrumb.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Breadcrumb navigation links component.
*
* @description
* Computes class names for breadcrumb containers, items, current links, separators, and navigation ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Pagination.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Pagination page navigation component.
*
* @description
* Computes pagination button class names, page ellipsis truncations, prev/next availability, and navigation ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Dialog.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Dialog modal window component.
*
* @description
* Computes class names, focus trap policies, overlay dismiss flags, escape key listeners, and modal ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Popover.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Popover overlay content component.
*
* @description
* Computes class names, positioning alignment flags, click-outside policies, data attributes, and dialog ARIA attributes for popovers.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file AlertDialog.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for AlertDialog modal dialog component.
*
* @description
* Manages class names, accessibility ARIA attributes, modal state flags, and button label accessors for alert dialogs.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file ButtonGroup.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for ButtonGroup layout component.
*
* @description
* Computes CSS class names, orientation layout flags, size overrides, and group ARIA accessibility roles for button groups.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Select.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Select dropdown menu component.
*
* @description
* Computes class names for select triggers, dropdown lists, search filters, multiselect states, and combobox ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file DatePicker.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for DatePicker single and date-range selection components.
*
* @description
* Computes class names, date ranges, min/max bounds checking, selected date highlights, and text input ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Calendar.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Calendar date selection component.
*
* @description
* Computes calendar grid CSS classes, date disability states, min/max bounds checking,
* selection flags, and grid accessibility ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file ContextMenu.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for ContextMenu popup component.
*
* @description
* Computes context menu positioning coordinates, menu item classes, disabled/divider state flags, and menu ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Carousel.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Carousel image and content slider component.
*
* @description
* Computes class names for carousel tracks, slides, arrows, pagination indicators, autoplay intervals, and ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Resizable.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Resizable panel layout component.
*
* @description
* Computes class names for resizable panels, handles, dimension constraints (min/max width and height), and region ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Slider.controller.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Headless controller for Slider numeric range input component.
*
* @description
* Computes slider track class names, thumb drag states, min/max step math conversions, percentage positions, and slider ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file index.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary HTML Custom Elements implementation for framework-agnostic web components.
*
* @description
* Implements native Web Component custom element classes powered by Evara headless controllers,
* encapsulating shadow DOM styles and registration utilities for standalone HTML applications.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Theme.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Core theme tokens and CSS custom property generator engine.
*
* @description
* Defines theme token interface schemas, default light/dark mode color palettes,
* theme mode union types, and dynamic CSS variable dictionary generator functions.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file index.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Main entry point for the @bleckwolf25/core package.
*
* @description
* Re-exports core types, utility functions, constants, headless component controllers,
* HTML custom elements, and the dynamic CSS token theme engine.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/compat/interval.js
var setInterval = (() => {
	appDiagnostics.NUXT_E1004();
});
//#endregion
//#region ../../packages/vue/dist/index.js
var __defProp = Object.defineProperty;
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
};
__export({}, {
	Alert: () => Alert,
	AlertDialog: () => AlertDialog,
	Avatar: () => Avatar,
	Badge: () => Badge,
	Breadcrumb: () => Breadcrumb,
	Button: () => Button,
	ButtonGroup: () => ButtonGroup,
	Calendar: () => Calendar,
	Card: () => Card,
	Carousel: () => Carousel,
	Checkbox: () => Checkbox,
	ContextMenu: () => ContextMenu,
	DatePicker: () => DatePicker,
	Dialog: () => Dialog,
	DialogBody: () => DialogBody,
	DialogClose: () => DialogClose,
	DialogComponent: () => DialogComponent,
	DialogContent: () => DialogContent,
	DialogDescription: () => DialogDescription,
	DialogFooter: () => DialogFooter,
	DialogHeader: () => DialogHeader,
	DialogKey: () => DialogKey,
	DialogOverlay: () => DialogOverlay,
	DialogRoot: () => DialogRoot,
	DialogTitle: () => DialogTitle,
	DialogTrigger: () => DialogTrigger,
	Field: () => Field,
	FieldGroup: () => FieldGroup,
	FieldGroupKey: () => FieldGroupKey,
	Form: () => Form,
	FormComponent: () => FormComponent,
	FormControl: () => FormControl,
	FormDescription: () => FormDescription,
	FormField: () => FormField,
	FormItem: () => FormItem,
	FormLabel: () => FormLabel,
	FormMessage: () => FormMessage,
	Input: () => Input,
	InputGroup: () => InputGroup,
	InputOTP: () => InputOTP,
	Pagination: () => Pagination,
	Popover: () => Popover,
	PopoverClose: () => PopoverClose,
	PopoverComponent: () => PopoverComponent,
	PopoverContent: () => PopoverContent,
	PopoverRoot: () => PopoverRoot,
	PopoverTrigger: () => PopoverTrigger,
	ProgressBar: () => ProgressBar,
	Radio: () => Radio,
	Resizable: () => Resizable,
	Select: () => Select,
	Separator: () => Separator,
	Skeleton: () => Skeleton,
	Slider: () => Slider,
	Spinner: () => Spinner,
	useForm: () => useForm
});
var Button = defineComponent({
	name: "Button",
	props: {
		as: {
			type: [String, Object],
			default: "button"
		},
		variant: {
			type: String,
			default: "primary"
		},
		size: {
			type: String,
			default: "md"
		},
		disabled: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		fullWidth: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: "button"
		}
	},
	emits: ["click"],
	setup(props, { slots, emit, attrs }) {
		return () => {
			const controller = new ButtonController({
				variant: props.variant,
				size: props.size,
				disabled: props.disabled,
				loading: props.loading,
				fullWidth: props.fullWidth
			});
			const handleClick = (event) => {
				if (props.disabled || props.loading) {
					event.preventDefault();
					return;
				}
				emit("click", event);
			};
			const tag = props.as;
			const isNativeButton = tag === "button";
			return h(tag, {
				type: isNativeButton ? props.type : void 0,
				class: [controller.getClassNames(), attrs.class],
				disabled: isNativeButton ? props.disabled || props.loading : void 0,
				"data-disabled": props.disabled || props.loading ? "true" : void 0,
				...controller.getAriaAttributes(),
				onClick: handleClick
			}, [props.loading ? h("span", {
				class: "ui-button__spinner",
				"aria-hidden": "true"
			}) : null, slots.default ? slots.default() : null]);
		};
	}
});
var Input = defineComponent({
	name: "Input",
	props: {
		modelValue: {
			type: [String, Number],
			default: void 0
		},
		value: {
			type: [String, Number],
			default: void 0
		},
		defaultValue: {
			type: [String, Number],
			default: void 0
		},
		variant: {
			type: String,
			default: "default"
		},
		size: {
			type: String,
			default: "md"
		},
		disabled: {
			type: Boolean,
			default: false
		},
		readOnly: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: "text"
		}
	},
	emits: [
		"update:modelValue",
		"update:value",
		"valueChange",
		"input",
		"change"
	],
	setup(props, { slots, emit, attrs }) {
		return () => {
			const activeValue = props.modelValue ?? props.value ?? props.defaultValue;
			const controller = new InputController({
				variant: props.variant,
				size: props.size,
				disabled: props.disabled,
				readOnly: props.readOnly,
				required: props.required
			});
			const handleInput = (event) => {
				const val = event.target.value;
				emit("update:modelValue", val);
				emit("update:value", val);
				emit("valueChange", val);
				emit("input", event);
			};
			const handleChange = (event) => {
				emit("change", event);
			};
			return h("div", { class: [controller.getContainerClasses(), attrs.class] }, [
				slots.prefix ? h("span", { class: "ui-input__prefix" }, slots.prefix()) : null,
				h("input", {
					type: props.type,
					class: controller.getInputClasses(),
					value: activeValue,
					disabled: props.disabled,
					readonly: props.readOnly,
					required: props.required,
					onInput: handleInput,
					onChange: handleChange,
					...controller.getAriaAttributes()
				}),
				slots.suffix ? h("span", { class: "ui-input__suffix" }, slots.suffix()) : null
			]);
		};
	}
});
var Checkbox = defineComponent({
	name: "Checkbox",
	props: {
		checked: {
			type: Boolean,
			default: void 0
		},
		modelValue: {
			type: Boolean,
			default: void 0
		},
		defaultChecked: {
			type: Boolean,
			default: false
		},
		indeterminate: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: void 0
		},
		name: {
			type: String,
			default: void 0
		},
		value: {
			type: [String, Number],
			default: void 0
		}
	},
	emits: [
		"update:checked",
		"update:modelValue",
		"checkedChange",
		"change"
	],
	setup(props, { emit, attrs, expose }) {
		const inputRef = ref(null);
		expose({ input: inputRef });
		const internalChecked = ref(props.defaultChecked);
		const getActiveChecked = () => {
			if (props.modelValue !== void 0) return props.modelValue;
			if (props.checked !== void 0) return props.checked;
			return internalChecked.value;
		};
		watch(() => props.indeterminate, (val) => {
			if (inputRef.value) inputRef.value.indeterminate = val;
		}, { immediate: true });
		const handleChange = (event) => {
			if (props.disabled) {
				event.preventDefault();
				return;
			}
			const newChecked = event.target.checked;
			internalChecked.value = newChecked;
			emit("update:modelValue", newChecked);
			emit("update:checked", newChecked);
			emit("checkedChange", newChecked);
			emit("change", event);
		};
		return () => {
			const isChecked = getActiveChecked();
			const controller = new CheckboxController({
				checked: isChecked,
				defaultChecked: props.defaultChecked,
				indeterminate: props.indeterminate,
				disabled: props.disabled,
				required: props.required
			});
			const checkboxMarkup = h("div", { class: [controller.getClassNames(), attrs.class] }, [h("input", {
				ref: inputRef,
				type: "checkbox",
				name: props.name,
				value: props.value,
				checked: isChecked,
				disabled: props.disabled,
				required: props.required,
				class: controller.getInputClasses(),
				onChange: handleChange,
				...controller.getAriaAttributes()
			}), h("span", { class: controller.getIndicatorClasses() }, [props.indeterminate ? h("svg", {
				class: "ui-checkbox-icon",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "3"
			}, [h("line", {
				x1: "5",
				y1: "12",
				x2: "19",
				y2: "12"
			})]) : null, !props.indeterminate && isChecked ? h("svg", {
				class: "ui-checkbox-icon",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, [h("polyline", { points: "20 6 9 17 4 12" })]) : null])]);
			if (props.label) return h("label", { class: ["ui-checkbox-label-wrapper", props.disabled ? "ui-checkbox-label-wrapper--disabled" : ""] }, [checkboxMarkup, h("span", { class: "ui-checkbox-label-text" }, props.label)]);
			return checkboxMarkup;
		};
	}
});
var RadioGroupKey = /* @__PURE__ */ Symbol("RadioGroupContext");
var Radio = defineComponent({
	name: "Radio",
	props: {
		value: {
			type: [String, Number],
			default: void 0
		},
		checked: {
			type: Boolean,
			default: void 0
		},
		defaultChecked: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: void 0
		}
	},
	emits: ["update:checked", "change"],
	setup(props, { slots, emit, attrs }) {
		const groupContext = inject(RadioGroupKey, null);
		return () => {
			const groupName = groupContext?.name.value;
			const strValue = props.value !== void 0 ? String(props.value) : "";
			const isChecked = groupContext ? groupContext.value.value === strValue : props.checked ?? props.defaultChecked;
			const isDisabled = (groupContext?.disabled.value ?? false) || props.disabled;
			const isRequired = (groupContext?.required.value ?? false) || props.required;
			const controller = new RadioController({
				value: strValue,
				checked: isChecked,
				disabled: isDisabled,
				required: isRequired,
				name: groupName
			});
			const handleChange = (event) => {
				if (isDisabled) {
					event.preventDefault();
					return;
				}
				emit("update:checked", true);
				emit("change", event);
				if (groupContext && strValue !== "") groupContext.onChange(strValue);
			};
			const radioMarkup = h("div", { class: [controller.getClassNames(), attrs.class] }, [h("input", {
				type: "radio",
				name: groupName,
				value: props.value,
				checked: isChecked,
				disabled: isDisabled,
				required: isRequired,
				class: controller.getInputClasses(),
				onChange: handleChange,
				...controller.getAriaAttributes()
			}), h("span", { class: controller.getIndicatorClasses() })]);
			const labelContent = slots.default ? slots.default() : props.label;
			if (labelContent) return h("label", { class: ["ui-radio-label-wrapper", isDisabled ? "ui-radio-label-wrapper--disabled" : ""] }, [radioMarkup, h("span", { class: "ui-radio-label-text" }, labelContent)]);
			return radioMarkup;
		};
	}
});
var FieldGroupKey = /* @__PURE__ */ Symbol("FieldGroupContext");
var FieldGroup = defineComponent({
	name: "FieldGroup",
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { slots, attrs }) {
		provide(FieldGroupKey, {
			disabled: computed(() => props.disabled),
			required: computed(() => props.required)
		});
		return () => {
			const controller = new FieldGroupController({
				disabled: props.disabled,
				required: props.required
			});
			return h("div", {
				class: [controller.getContainerClasses(), attrs.class],
				...controller.getAriaAttributes()
			}, slots.default?.());
		};
	}
});
var Field = defineComponent({
	name: "Field",
	props: {
		label: {
			type: String,
			default: void 0
		},
		helperText: {
			type: String,
			default: void 0
		},
		error: {
			type: String,
			default: void 0
		},
		required: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { slots, attrs }) {
		const groupContext = inject(FieldGroupKey, null);
		const isRequired = computed(() => props.required || (groupContext?.required.value ?? false));
		const isDisabled = computed(() => props.disabled || (groupContext?.disabled.value ?? false));
		return () => {
			const controller = new FieldController({
				label: props.label,
				helperText: props.helperText,
				error: props.error,
				required: isRequired.value,
				disabled: isDisabled.value
			});
			return h("div", {
				class: [controller.getContainerClasses(), attrs.class],
				...controller.getAriaAttributes()
			}, [
				props.label ? h("label", { class: controller.getLabelClasses() }, [props.label, isRequired.value ? h("span", {
					class: "ui-field__required-indicator",
					"aria-hidden": "true"
				}, "*") : null]) : null,
				slots.default ? slots.default() : null,
				props.error ? h("p", { class: controller.getErrorTextClasses() }, props.error) : null,
				!props.error && props.helperText ? h("p", { class: controller.getHelperTextClasses() }, props.helperText) : null
			]);
		};
	}
});
var FormSymbol = /* @__PURE__ */ Symbol("EvaraForm");
var FormItemSymbol = /* @__PURE__ */ Symbol("EvaraFormItem");
function useForm(options) {
	const form = new FormController(options);
	const state = ref({
		values: form.getValues(),
		errors: form.getErrors(),
		touched: form.getTouched(),
		isSubmitting: form.getIsSubmitting()
	});
	form.subscribe(() => {
		state.value = {
			values: { ...form.getValues() },
			errors: { ...form.getErrors() },
			touched: { ...form.getTouched() },
			isSubmitting: form.getIsSubmitting()
		};
	});
	return {
		form,
		state
	};
}
var FormComponent = defineComponent({
	name: "Form",
	props: { form: {
		type: Object,
		required: true
	} },
	emits: ["submit"],
	setup(props, { slots, emit }) {
		provide(FormSymbol, props.form);
		const handleSubmit = (e) => {
			e.preventDefault();
			props.form.handleSubmit().then(() => {
				emit("submit", props.form.getValues());
			});
		};
		return () => h("form", {
			class: "ui-form",
			onSubmit: handleSubmit
		}, slots.default ? slots.default() : []);
	}
});
var FormField = defineComponent({
	name: "FormField",
	props: { name: {
		type: String,
		required: true
	} },
	setup(props, { slots }) {
		const form = inject(FormSymbol);
		if (!form) throw new Error("Form context not found");
		const value = ref(form.getValue(props.name));
		const error = ref(form.getFieldError(props.name));
		const isTouched = ref(form.isFieldTouched(props.name));
		form.subscribe(() => {
			value.value = form.getValue(props.name) ?? void 0;
			error.value = form.getFieldError(props.name);
			isTouched.value = form.isFieldTouched(props.name);
		});
		const onChange = (val) => {
			const rawVal = val instanceof Event && val.target ? val.target.value : val;
			form.setFieldValue(props.name, rawVal);
		};
		const onBlur = () => {
			form.setFieldTouched(props.name, true);
		};
		provide(FormItemSymbol, {
			id: props.name,
			name: props.name,
			error,
			isTouched
		});
		return () => slots.default ? slots.default({
			value: value.value,
			onChange,
			onBlur,
			error: error.value,
			isTouched: isTouched.value
		}) : [];
	}
});
var FormItem = defineComponent({
	name: "FormItem",
	setup(_, { slots }) {
		const existing = inject(FormItemSymbol, null);
		const itemId = existing?.id ?? `evara-form-item-${Math.random().toString(36).substring(2, 9)}`;
		provide(FormItemSymbol, existing ?? { id: itemId });
		return () => h("div", { class: "ui-form-item" }, slots.default ? slots.default() : []);
	}
});
var FormLabel = defineComponent({
	name: "FormLabel",
	setup(_, { slots }) {
		const itemCtx = inject(FormItemSymbol, null);
		const labelProps = new FormFieldController({
			name: itemCtx?.id ?? "",
			itemId: itemCtx?.id
		}).getLabelProps();
		return () => h("label", {
			for: labelProps.htmlFor,
			class: ["ui-form-label", itemCtx?.error?.value ? "ui-form-label--error" : ""]
		}, slots.default ? slots.default() : []);
	}
});
var FormControl = defineComponent({
	name: "FormControl",
	setup(_, { slots }) {
		const itemCtx = inject(FormItemSymbol, null);
		const ariaProps = new FormFieldController({
			name: itemCtx?.id ?? "",
			itemId: itemCtx?.id
		}).getControlAriaAttributes(Boolean(itemCtx?.error?.value), true);
		return () => h("div", {
			class: "ui-form-control",
			id: ariaProps.id,
			"aria-invalid": ariaProps["aria-invalid"],
			"aria-describedby": ariaProps["aria-describedby"]
		}, slots.default ? slots.default() : []);
	}
});
var FormDescription = defineComponent({
	name: "FormDescription",
	setup(_, { slots }) {
		const itemCtx = inject(FormItemSymbol, null);
		const fieldController = new FormFieldController({
			name: itemCtx?.id ?? "",
			itemId: itemCtx?.id
		});
		return () => h("p", {
			id: fieldController.getDescriptionId(),
			class: "ui-form-description"
		}, slots.default ? slots.default() : []);
	}
});
var FormMessage = defineComponent({
	name: "FormMessage",
	setup(_, { slots }) {
		const itemCtx = inject(FormItemSymbol, null);
		const fieldController = new FormFieldController({
			name: itemCtx?.id ?? "",
			itemId: itemCtx?.id
		});
		return () => {
			const msg = slots.default ? slots.default() : itemCtx?.error?.value;
			if (!msg) return null;
			return h("p", {
				id: fieldController.getMessageId(),
				role: "alert",
				class: "ui-form-message"
			}, msg);
		};
	}
});
var Form = Object.assign(FormComponent, {
	Field: FormField,
	Item: FormItem,
	Label: FormLabel,
	Control: FormControl,
	Description: FormDescription,
	Message: FormMessage
});
var InputGroup = defineComponent({
	name: "InputGroup",
	props: {
		size: {
			type: String,
			default: "md"
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { slots, attrs }) {
		return () => {
			const controller = new InputGroupController({
				size: props.size,
				disabled: props.disabled
			});
			return h("div", {
				class: [controller.getContainerClasses(), attrs.class],
				...controller.getAriaAttributes()
			}, slots.default?.());
		};
	}
});
var InputOTP = defineComponent({
	name: "InputOTP",
	props: {
		length: {
			type: Number,
			default: 6
		},
		value: {
			type: String,
			default: void 0
		},
		modelValue: {
			type: String,
			default: void 0
		},
		defaultValue: {
			type: String,
			default: ""
		},
		size: {
			type: String,
			default: "md"
		},
		disabled: {
			type: Boolean,
			default: false
		},
		autoFocus: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		"update:modelValue",
		"update:value",
		"change"
	],
	setup(props, { emit, attrs }) {
		const internalValue = ref(props.defaultValue);
		const focusedIndex = ref(0);
		const inputRefs = ref([]);
		const getActiveValue = () => {
			if (props.modelValue !== void 0) return props.modelValue;
			if (props.value !== void 0) return props.value;
			return internalValue.value;
		};
		const handleChange = (index, newValue) => {
			const newValueArray = getActiveValue().split("");
			newValueArray[index] = newValue;
			const newOTP = newValueArray.join("");
			if (props.modelValue === void 0 && props.value === void 0) internalValue.value = newOTP;
			emit("update:modelValue", newOTP);
			emit("update:value", newOTP);
			emit("change", newOTP);
			if (newValue && index < props.length - 1) inputRefs.value[index + 1]?.focus();
		};
		const handleKeyDown = (index, event, controller) => {
			const currentValue = getActiveValue();
			controller.handleKeyDown(event, index, currentValue);
			const key = event.key;
			if (key === "Backspace") {
				event.preventDefault();
				handleChange(index, "");
				if (index > 0) inputRefs.value[index - 1]?.focus();
			} else if (key === "ArrowLeft" && index > 0) inputRefs.value[index - 1]?.focus();
			else if (key === "ArrowRight" && index < props.length - 1) inputRefs.value[index + 1]?.focus();
		};
		const handlePaste = (event, controller) => {
			event.preventDefault();
			const pastedData = controller.handlePaste(event, props.length);
			if (pastedData) {
				const newValueArray = getActiveValue().split("");
				for (let i = 0; i < pastedData.length; i++) if (i < props.length) newValueArray[i] = pastedData[i];
				const newOTP = newValueArray.join("");
				if (props.modelValue === void 0 && props.value === void 0) internalValue.value = newOTP;
				emit("update:modelValue", newOTP);
				emit("update:value", newOTP);
				emit("change", newOTP);
				const nextEmptyIndex = pastedData.length < props.length ? pastedData.length : props.length - 1;
				inputRefs.value[nextEmptyIndex]?.focus();
			}
		};
		return () => {
			const currentValue = getActiveValue();
			const controller = new InputOTPController({
				length: props.length,
				value: currentValue,
				size: props.size,
				disabled: props.disabled,
				autoFocus: props.autoFocus
			});
			return h("div", {
				class: [controller.getContainerClasses(), attrs.class],
				...controller.getAriaAttributes()
			}, Array.from({ length: props.length }).map((_, index) => h("input", {
				key: index,
				ref: (el) => {
					inputRefs.value[index] = el;
				},
				type: "text",
				inputmode: "numeric",
				pattern: "[0-9]*",
				maxlength: 1,
				class: controller.getInputClasses(index),
				value: currentValue[index] || "",
				onInput: (e) => {
					const val = e.target.value;
					if (val === "" || /^\d$/.test(val)) handleChange(index, val);
				},
				onKeydown: (e) => {
					handleKeyDown(index, e, controller);
				},
				onPaste: (e) => {
					handlePaste(e, controller);
				},
				onFocus: () => {
					focusedIndex.value = index;
				},
				disabled: props.disabled,
				autofocus: props.autoFocus && index === 0,
				"aria-label": `Digit ${index + 1}`,
				"aria-current": focusedIndex.value === index ? "true" : void 0
			})));
		};
	}
});
var CardComponent = defineComponent({
	name: "Card",
	props: {
		variant: {
			type: String,
			default: "default"
		},
		elevation: {
			type: String,
			default: "md"
		}
	},
	setup(props, { slots, attrs }) {
		return () => {
			const controller = new CardController({
				variant: props.variant,
				elevation: props.elevation
			});
			return h("div", {
				class: [controller.getCardClasses(), attrs.class],
				...controller.getAriaAttributes()
			}, slots.default?.());
		};
	}
});
var CardHeader = defineComponent({
	name: "CardHeader",
	setup(_, { slots, attrs }) {
		return () => h("div", { class: ["ui-card__header", attrs.class] }, slots.default?.());
	}
});
var CardBody = defineComponent({
	name: "CardBody",
	setup(_, { slots, attrs }) {
		return () => h("div", { class: ["ui-card__body", attrs.class] }, slots.default?.());
	}
});
var CardFooter = defineComponent({
	name: "CardFooter",
	setup(_, { slots, attrs }) {
		return () => h("div", { class: ["ui-card__footer", attrs.class] }, slots.default?.());
	}
});
var Card = Object.assign(CardComponent, {
	Header: CardHeader,
	Body: CardBody,
	Footer: CardFooter
});
var Separator = defineComponent({
	name: "Separator",
	props: {
		orientation: {
			type: String,
			default: "horizontal"
		},
		color: {
			type: String,
			default: "default"
		}
	},
	setup(props, { attrs }) {
		return () => {
			const controller = new SeparatorController({
				orientation: props.orientation,
				color: props.color
			});
			return h("div", {
				class: [controller.getSeparatorClasses(), attrs.class],
				...controller.getAriaAttributes()
			});
		};
	}
});
var Avatar = defineComponent({
	name: "Avatar",
	props: {
		src: {
			type: String,
			default: void 0
		},
		alt: {
			type: String,
			default: void 0
		},
		initials: {
			type: String,
			default: void 0
		},
		size: {
			type: String,
			default: "md"
		},
		status: {
			type: String,
			default: void 0
		}
	},
	setup(props, { attrs }) {
		return () => {
			const controller = new AvatarController({
				src: props.src,
				alt: props.alt,
				initials: props.initials,
				size: props.size,
				status: props.status
			});
			return h("div", {
				class: [controller.getAvatarClasses(), attrs.class],
				...controller.getAriaAttributes()
			}, [
				controller.hasImage() ? h("img", {
					src: props.src,
					alt: props.alt,
					class: controller.getImageClasses()
				}) : null,
				!controller.hasImage() && controller.hasInitials() ? h("span", { class: controller.getInitialsClasses() }, props.initials) : null,
				controller.hasStatus() ? h("span", {
					class: controller.getStatusIndicatorClasses(),
					title: props.status,
					"aria-label": `Status: ${props.status ?? ""}`
				}) : null
			]);
		};
	}
});
var Badge = defineComponent({
	name: "Badge",
	props: {
		color: {
			type: String,
			default: void 0
		},
		variant: {
			type: String,
			default: void 0
		},
		size: {
			type: String,
			default: "sm"
		},
		position: {
			type: String,
			default: void 0
		}
	},
	setup(props, { slots, attrs }) {
		return () => {
			const controller = new BadgeController({
				color: props.color ?? props.variant ?? "default",
				size: props.size,
				position: props.position
			});
			return h("span", {
				class: [controller.getBadgeClasses(), attrs.class],
				...controller.getAriaAttributes()
			}, slots.default?.());
		};
	}
});
var Alert = defineComponent({
	name: "Alert",
	props: {
		variant: {
			type: String,
			default: "info"
		},
		dismissible: {
			type: Boolean,
			default: false
		},
		showIcon: {
			type: Boolean,
			default: false
		}
	},
	emits: ["dismiss"],
	setup(props, { slots, emit, attrs }) {
		const isVisible = ref(true);
		const handleDismiss = () => {
			isVisible.value = false;
			emit("dismiss");
		};
		const getIconForVariant = (alertVariant = "info") => {
			const icons = {
				info: "ℹ️",
				success: "✓",
				warning: "⚠",
				danger: "✕"
			};
			return icons[alertVariant] ?? icons.info;
		};
		return () => {
			if (!isVisible.value) return null;
			const controller = new AlertController({
				variant: props.variant,
				dismissible: props.dismissible,
				showIcon: props.showIcon
			});
			return h("div", {
				class: [controller.getAlertClasses(), attrs.class],
				...controller.getAriaAttributes()
			}, [
				controller.shouldShowIcon() ? h("span", { class: controller.getIconClasses() }, getIconForVariant(props.variant)) : null,
				h("div", { class: controller.getContentClasses() }, slots.default?.()),
				controller.isDismissible() ? h("button", {
					type: "button",
					class: controller.getCloseButtonClasses(),
					onClick: handleDismiss,
					"aria-label": "Close"
				}, "✕") : null
			]);
		};
	}
});
var ProgressBar = defineComponent({
	name: "ProgressBar",
	props: {
		value: {
			type: Number,
			default: 0
		},
		indeterminate: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: "md"
		},
		color: {
			type: String,
			default: "default"
		}
	},
	setup(props, { attrs }) {
		return () => {
			const controller = new ProgressBarController({
				value: props.value,
				indeterminate: props.indeterminate,
				size: props.size,
				color: props.color
			});
			return h("div", {
				class: [controller.getProgressBarClasses(), attrs.class],
				...controller.getAriaAttributes()
			}, [h("div", {
				class: controller.getFillClasses(),
				style: controller.getFillStyle()
			})]);
		};
	}
});
var Skeleton = defineComponent({
	name: "Skeleton",
	props: {
		shape: {
			type: String,
			default: "text"
		},
		animated: {
			type: Boolean,
			default: true
		}
	},
	setup(props, { attrs }) {
		return () => {
			const controller = new SkeletonController({
				shape: props.shape,
				animated: props.animated
			});
			return h("div", {
				class: [controller.getSkeletonClasses(), attrs.class],
				...controller.getAriaAttributes()
			});
		};
	}
});
var Spinner = defineComponent({
	name: "Spinner",
	props: {
		size: {
			type: String,
			default: "md"
		},
		color: {
			type: String,
			default: "default"
		}
	},
	setup(props, { attrs }) {
		return () => {
			const controller = new SpinnerController({
				size: props.size,
				color: props.color
			});
			return h("div", {
				class: [controller.getSpinnerClasses(), attrs.class],
				...controller.getAriaAttributes()
			});
		};
	}
});
var Breadcrumb = defineComponent({
	name: "Breadcrumb",
	props: {
		items: {
			type: Array,
			required: true
		},
		separator: {
			type: String,
			default: "/"
		}
	},
	setup(props, { attrs }) {
		return () => {
			const controller = new BreadcrumbController({
				items: props.items,
				separator: props.separator
			});
			return h("nav", {
				class: [controller.getBreadcrumbClasses(), attrs.class],
				...controller.getAriaAttributes()
			}, [h("ol", { class: controller.getListClasses() }, controller.getItems().map((item, index) => {
				const isLast = index === controller.getItems().length - 1;
				const isCurrent = item.current ?? isLast;
				return h("li", {
					key: index,
					class: controller.getItemClasses(isCurrent)
				}, [item.href && !isCurrent ? h("a", {
					href: item.href,
					class: controller.getLinkClasses()
				}, item.label) : h("span", { class: controller.getCurrentClasses() }, item.label), !isLast ? h("span", { class: controller.getSeparatorClasses() }, controller.getSeparator()) : null]);
			}))]);
		};
	}
});
var Pagination = defineComponent({
	name: "Pagination",
	props: {
		currentPage: {
			type: Number,
			required: true
		},
		totalPages: {
			type: Number,
			required: true
		},
		itemsPerPage: {
			type: Number,
			default: void 0
		},
		totalItems: {
			type: Number,
			default: void 0
		},
		size: {
			type: String,
			default: "md"
		}
	},
	emits: [
		"pageChange",
		"update:currentPage",
		"itemsPerPageChange"
	],
	setup(props, { emit, attrs }) {
		const handlePageChange = (page) => {
			if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
				emit("pageChange", page);
				emit("update:currentPage", page);
			}
		};
		return () => {
			const controller = new PaginationController({
				currentPage: props.currentPage,
				totalPages: props.totalPages,
				itemsPerPage: props.itemsPerPage,
				totalItems: props.totalItems,
				size: props.size
			});
			const handlePrev = () => {
				if (controller.canGoToPrev()) handlePageChange(props.currentPage - 1);
			};
			const handleNext = () => {
				if (controller.canGoToNext()) handlePageChange(props.currentPage + 1);
			};
			return h("nav", {
				class: [controller.getPaginationClasses(), attrs.class],
				...controller.getAriaAttributes()
			}, [h("ul", { class: controller.getListClasses() }, [
				h("li", { class: controller.getItemClasses(false, !controller.canGoToPrev()) }, [h("button", {
					type: "button",
					class: controller.getLinkClasses(),
					onClick: handlePrev,
					disabled: !controller.canGoToPrev(),
					"aria-label": "Previous page"
				}, "‹")]),
				...controller.getVisiblePages().map((page, index) => {
					if (page === -1) return h("li", {
						key: `ellipsis-${index}`,
						class: controller.getItemClasses(false, true)
					}, [h("span", { class: controller.getLinkClasses() }, "...")]);
					return h("li", {
						key: page,
						class: controller.getItemClasses(page === props.currentPage, false)
					}, [h("button", {
						type: "button",
						class: controller.getLinkClasses(),
						onClick: () => {
							handlePageChange(page);
						},
						"aria-label": `Page ${page}`,
						"aria-current": page === props.currentPage ? "page" : void 0
					}, page)]);
				}),
				h("li", { class: controller.getItemClasses(false, !controller.canGoToNext()) }, [h("button", {
					type: "button",
					class: controller.getLinkClasses(),
					onClick: handleNext,
					disabled: !controller.canGoToNext(),
					"aria-label": "Next page"
				}, "›")])
			]), props.totalItems && props.itemsPerPage ? h("div", { class: controller.getInfoClasses() }, `Showing ${(props.currentPage - 1) * props.itemsPerPage + 1} to ${Math.min(props.currentPage * props.itemsPerPage, props.totalItems)} of ${props.totalItems} items`) : null]);
		};
	}
});
var DialogKey = /* @__PURE__ */ Symbol("DialogContext");
var DialogComponent = defineComponent({
	name: "Dialog",
	props: {
		open: {
			type: Boolean,
			default: false
		},
		closeOnEscape: {
			type: Boolean,
			default: true
		},
		closeOnOverlayClick: {
			type: Boolean,
			default: true
		},
		trapFocus: {
			type: Boolean,
			default: true
		}
	},
	emits: [
		"update:open",
		"openChange",
		"close"
	],
	setup(props, { slots, emit, attrs }) {
		const dialogRef = ref(null);
		const previousActiveElement = ref(null);
		const handleClose = () => {
			emit("update:open", false);
			emit("openChange", false);
			emit("close");
		};
		const setOpen = (val) => {
			emit("update:open", val);
			emit("openChange", val);
			if (!val) emit("close");
		};
		provide(DialogKey, {
			open: props.open,
			close: handleClose,
			setOpen
		});
		watch(() => props.open, (newOpen) => {
			if (newOpen) {
				previousActiveElement.value = (void 0).activeElement;
				setTimeout(() => dialogRef.value?.focus(), 0);
			} else previousActiveElement.value?.focus();
		}, { immediate: true });
		const handleOverlayClick = (event) => {
			const controller = new DialogController({
				open: props.open,
				closeOnEscape: props.closeOnEscape,
				closeOnOverlayClick: props.closeOnOverlayClick,
				trapFocus: props.trapFocus
			});
			if (event.target === event.currentTarget && controller.shouldCloseOnOverlayClick()) handleClose();
		};
		return () => {
			if (!props.open) return null;
			const controller = new DialogController({
				open: props.open,
				closeOnEscape: props.closeOnEscape,
				closeOnOverlayClick: props.closeOnOverlayClick,
				trapFocus: props.trapFocus
			});
			return h("div", {
				class: controller.getOverlayClasses(),
				onClick: handleOverlayClick,
				...controller.getDataAttributes()
			}, [h("div", {
				ref: dialogRef,
				class: [controller.getDialogClasses(), attrs.class],
				...controller.getAriaAttributes(),
				...controller.getDataAttributes(),
				tabindex: -1
			}, slots.default?.())]);
		};
	}
});
var DialogRoot = defineComponent({
	name: "DialogRoot",
	props: { open: {
		type: Boolean,
		default: false
	} },
	emits: ["update:open", "openChange"],
	setup(props, { slots, emit }) {
		const handleClose = () => {
			emit("update:open", false);
			emit("openChange", false);
		};
		const setOpen = (val) => {
			emit("update:open", val);
			emit("openChange", val);
		};
		provide(DialogKey, {
			open: props.open,
			close: handleClose,
			setOpen
		});
		return () => slots.default ? slots.default() : null;
	}
});
var DialogTrigger = defineComponent({
	name: "DialogTrigger",
	setup(_, { slots, attrs }) {
		const context = inject(DialogKey, null);
		return () => h("button", {
			type: "button",
			class: ["ui-dialog__trigger", attrs.class],
			onClick: () => context?.setOpen(true)
		}, slots.default?.());
	}
});
var DialogOverlay = defineComponent({
	name: "DialogOverlay",
	setup(_, { slots, attrs }) {
		const context = inject(DialogKey, null);
		if (!context?.open) return () => null;
		const controller = new DialogController({ open: true });
		return () => h("div", {
			class: [controller.getOverlayClasses(), attrs.class],
			onClick: () => {
				context.close();
			},
			...controller.getDataAttributes()
		}, slots.default?.());
	}
});
var DialogContent = defineComponent({
	name: "DialogContent",
	setup(_, { slots, attrs }) {
		if (!inject(DialogKey, null)?.open) return () => null;
		const controller = new DialogController({ open: true });
		return () => h("div", {
			class: [controller.getDialogClasses(), attrs.class],
			...controller.getAriaAttributes(),
			...controller.getDataAttributes(),
			tabindex: -1
		}, slots.default?.());
	}
});
var DialogHeader = defineComponent({
	name: "DialogHeader",
	setup(_, { slots, attrs }) {
		return () => h("div", { class: ["ui-dialog__header", attrs.class] }, slots.default?.());
	}
});
var DialogBody = defineComponent({
	name: "DialogBody",
	setup(_, { slots, attrs }) {
		return () => h("div", { class: ["ui-dialog__body", attrs.class] }, slots.default?.());
	}
});
var DialogFooter = defineComponent({
	name: "DialogFooter",
	setup(_, { slots, attrs }) {
		return () => h("div", { class: ["ui-dialog__footer", attrs.class] }, slots.default?.());
	}
});
var DialogTitle = defineComponent({
	name: "DialogTitle",
	setup(_, { slots, attrs }) {
		return () => h("h2", { class: ["ui-dialog__title", attrs.class] }, slots.default?.());
	}
});
var DialogDescription = defineComponent({
	name: "DialogDescription",
	setup(_, { slots, attrs }) {
		return () => h("p", { class: ["ui-dialog__description", attrs.class] }, slots.default?.());
	}
});
var DialogClose = defineComponent({
	name: "DialogClose",
	emits: ["click"],
	setup(_, { slots, attrs, emit }) {
		const context = inject(DialogKey, {
			open: false,
			close: () => {},
			setOpen: () => {}
		});
		return () => h("button", {
			type: "button",
			class: ["ui-dialog__close-button", attrs.class],
			"aria-label": "Close",
			onClick: (e) => {
				emit("click", e);
				if (!e.defaultPrevented) context.close();
			}
		}, slots.default?.() ?? "✕");
	}
});
var Dialog = Object.assign(DialogComponent, {
	Root: DialogRoot,
	Trigger: DialogTrigger,
	Overlay: DialogOverlay,
	Content: DialogContent,
	Header: DialogHeader,
	Body: DialogBody,
	Footer: DialogFooter,
	Title: DialogTitle,
	Description: DialogDescription,
	Close: DialogClose
});
var PopoverKey = /* @__PURE__ */ Symbol("PopoverContext");
var PopoverComponent = defineComponent({
	name: "Popover",
	props: {
		open: {
			type: Boolean,
			default: false
		},
		position: {
			type: String,
			default: "bottom"
		},
		closeOnClickOutside: {
			type: Boolean,
			default: true
		}
	},
	emits: [
		"update:open",
		"openChange",
		"close"
	],
	setup(props, { slots, emit, attrs }) {
		const popoverRef = ref(null);
		const triggerRef = ref(null);
		const internalOpen = ref(props.open);
		watch(() => props.open, (newVal) => {
			internalOpen.value = newVal;
		});
		const handleTriggerClick = () => {
			const newState = !internalOpen.value;
			internalOpen.value = newState;
			emit("update:open", newState);
			emit("openChange", newState);
			if (!newState) emit("close");
		};
		return () => {
			const controller = new PopoverController({
				open: internalOpen.value,
				position: props.position,
				closeOnClickOutside: props.closeOnClickOutside
			});
			return h("div", { style: {
				position: "relative",
				display: "inline-block"
			} }, [slots.trigger ? h("span", {
				ref: triggerRef,
				onClick: handleTriggerClick,
				style: { display: "inline-block" }
			}, slots.trigger()) : null, internalOpen.value ? h("div", {
				ref: popoverRef,
				class: [controller.getPopoverClasses(), attrs.class],
				...controller.getAriaAttributes()
			}, slots.default?.()) : null]);
		};
	}
});
var PopoverRoot = defineComponent({
	name: "PopoverRoot",
	props: { open: {
		type: Boolean,
		default: false
	} },
	emits: ["update:open", "openChange"],
	setup(props, { slots, emit }) {
		const setOpen = (val) => {
			emit("update:open", val);
			emit("openChange", val);
		};
		provide(PopoverKey, {
			open: props.open,
			setOpen
		});
		return () => slots.default ? slots.default() : null;
	}
});
var PopoverTrigger = defineComponent({
	name: "PopoverTrigger",
	setup(_, { slots, attrs }) {
		const context = inject(PopoverKey, null);
		return () => h("button", {
			type: "button",
			class: ["ui-popover__trigger", attrs.class],
			onClick: () => context?.setOpen(!context.open)
		}, slots.default?.());
	}
});
var PopoverContent = defineComponent({
	name: "PopoverContent",
	setup(_, { slots, attrs }) {
		return () => h("div", { class: ["ui-popover__content", attrs.class] }, slots.default?.());
	}
});
var PopoverClose = defineComponent({
	name: "PopoverClose",
	setup(_, { slots, attrs }) {
		const context = inject(PopoverKey, null);
		return () => h("button", {
			type: "button",
			class: ["ui-popover__close", attrs.class],
			onClick: () => context?.setOpen(false)
		}, slots.default?.() ?? "✕");
	}
});
var Popover = Object.assign(PopoverComponent, {
	Root: PopoverRoot,
	Trigger: PopoverTrigger,
	Content: PopoverContent,
	Close: PopoverClose
});
var AlertDialog = defineComponent({
	name: "AlertDialog",
	props: {
		open: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		confirmLabel: {
			type: String,
			default: "Confirm"
		},
		cancelLabel: {
			type: String,
			default: "Cancel"
		}
	},
	emits: [
		"update:open",
		"openChange",
		"close",
		"confirm",
		"cancel"
	],
	setup(props, { emit, attrs }) {
		const alertDialogRef = ref(null);
		const previousActiveElement = ref(null);
		const handleClose = () => {
			emit("update:open", false);
			emit("openChange", false);
			emit("close");
		};
		const handleConfirm = () => {
			emit("confirm");
			handleClose();
		};
		const handleCancel = () => {
			emit("cancel");
			handleClose();
		};
		watch(() => props.open, (newOpen) => {
			if (newOpen) {
				previousActiveElement.value = (void 0).activeElement;
				setTimeout(() => alertDialogRef.value?.focus(), 0);
			} else previousActiveElement.value?.focus();
		}, { immediate: true });
		const handleOverlayClick = (event) => {
			if (event.target === event.currentTarget) {
				emit("cancel");
				handleClose();
			}
		};
		return () => {
			if (!props.open) return null;
			const controller = new AlertDialogController({
				open: props.open,
				title: props.title,
				description: props.description,
				confirmLabel: props.confirmLabel,
				cancelLabel: props.cancelLabel
			});
			return h("div", {
				class: controller.getOverlayClasses(),
				onClick: handleOverlayClick
			}, [h("div", {
				ref: alertDialogRef,
				class: [controller.getAlertDialogClasses(), attrs.class],
				...controller.getAriaAttributes(),
				tabindex: -1
			}, [
				h("div", { class: controller.getHeaderClasses() }, [h("h2", {
					id: "alert-dialog-title",
					class: controller.getTitleClasses()
				}, controller.getTitle())]),
				h("div", { class: controller.getBodyClasses() }, [h("p", {
					id: "alert-dialog-description",
					class: controller.getDescriptionClasses()
				}, controller.getDescription())]),
				h("div", { class: controller.getFooterClasses() }, [h("button", {
					type: "button",
					class: controller.getCancelButtonClasses(),
					onClick: handleCancel
				}, controller.getCancelLabel()), h("button", {
					type: "button",
					class: controller.getConfirmButtonClasses(),
					onClick: handleConfirm
				}, controller.getConfirmLabel())])
			])]);
		};
	}
});
var ButtonGroup = defineComponent({
	name: "ButtonGroup",
	props: {
		orientation: {
			type: String,
			default: "horizontal"
		},
		size: {
			type: String,
			default: "md"
		}
	},
	setup(props, { slots, attrs }) {
		return () => {
			const controller = new ButtonGroupController({
				orientation: props.orientation,
				size: props.size
			});
			return h("div", {
				class: [controller.getButtonGroupClasses(), attrs.class],
				...controller.getAriaAttributes()
			}, slots.default?.());
		};
	}
});
var Select = defineComponent({
	name: "Select",
	props: {
		options: {
			type: Array,
			required: true
		},
		value: {
			type: [String, Array],
			default: void 0
		},
		modelValue: {
			type: [String, Array],
			default: void 0
		},
		defaultValue: {
			type: [String, Array],
			default: void 0
		},
		multiple: {
			type: Boolean,
			default: false
		},
		searchable: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: "Select..."
		},
		size: {
			type: String,
			default: "md"
		}
	},
	emits: [
		"update:modelValue",
		"update:value",
		"change"
	],
	setup(props, { emit, attrs }) {
		const isOpen = ref(false);
		const highlightedIndex = ref(-1);
		const searchQuery = ref("");
		const internalValue = ref(props.defaultValue);
		const selectRef = ref(null);
		const dropdownRef = ref(null);
		const getActiveValue = () => {
			if (props.modelValue !== void 0) return props.modelValue;
			if (props.value !== void 0) return props.value;
			return internalValue.value;
		};
		const handleToggle = (controller) => {
			if (!controller.isDisabled()) {
				isOpen.value = !isOpen.value;
				searchQuery.value = "";
			}
		};
		const handleSelect = (option, controller) => {
			if (option.disabled) return;
			let newValue;
			const selectedValue = getActiveValue();
			if (controller.isMultiple()) {
				const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
				if (currentValues.includes(option.value)) newValue = currentValues.filter((v) => v !== option.value);
				else newValue = [...currentValues, option.value];
			} else newValue = option.value;
			if (props.modelValue === void 0 && props.value === void 0) internalValue.value = newValue;
			emit("update:modelValue", newValue);
			emit("update:value", newValue);
			emit("change", newValue);
			if (!controller.isMultiple()) isOpen.value = false;
		};
		return () => {
			const selectedValue = getActiveValue();
			const controller = new SelectController({
				options: props.options,
				value: selectedValue,
				defaultValue: props.defaultValue,
				multiple: props.multiple,
				searchable: props.searchable,
				disabled: props.disabled,
				placeholder: props.placeholder,
				size: props.size
			});
			const filteredOptions = controller.getOptions().filter((option) => option.label.toLowerCase().includes(searchQuery.value.toLowerCase()));
			const getSelectedLabel = () => {
				if (!selectedValue || Array.isArray(selectedValue) && selectedValue.length === 0) return props.placeholder;
				if (controller.isMultiple()) {
					const values = Array.isArray(selectedValue) ? selectedValue : [selectedValue];
					return controller.getOptions().filter((opt) => values.includes(opt.value)).map((opt) => opt.label).join(", ");
				}
				return controller.getOptions().find((opt) => opt.value === selectedValue)?.label ?? props.placeholder;
			};
			const handleKeyDown = (event) => {
				if (controller.isDisabled()) return;
				switch (event.key) {
					case "Enter":
					case " ":
						event.preventDefault();
						if (isOpen.value && highlightedIndex.value >= 0) {
							const opt = filteredOptions[highlightedIndex.value];
							handleSelect(opt, controller);
						} else handleToggle(controller);
						break;
					case "Escape":
						isOpen.value = false;
						break;
					case "ArrowDown":
						event.preventDefault();
						if (!isOpen.value) isOpen.value = true;
						else highlightedIndex.value = Math.min(highlightedIndex.value + 1, filteredOptions.length - 1);
						break;
					case "ArrowUp":
						event.preventDefault();
						highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0);
						break;
				}
			};
			return h("div", {
				ref: selectRef,
				class: [controller.getSelectClasses(), attrs.class],
				onKeydown: handleKeyDown,
				...controller.getAriaAttributes()
			}, [h("div", {
				class: controller.getTriggerClasses(),
				onClick: () => {
					handleToggle(controller);
				},
				tabindex: controller.isDisabled() ? -1 : 0
			}, [h("span", getSelectedLabel()), h("span", { class: "ui-select__arrow" }, "▼")]), isOpen.value ? h("div", {
				ref: dropdownRef,
				class: controller.getDropdownClasses()
			}, [
				controller.isSearchable() ? h("input", {
					type: "text",
					class: controller.getSearchInputClasses(),
					placeholder: "Search...",
					value: searchQuery.value,
					onInput: (e) => {
						searchQuery.value = e.target.value;
					},
					onClick: (e) => {
						e.stopPropagation();
					},
					autofocus: true
				}) : null,
				filteredOptions.map((option, index) => {
					const isSelected = controller.isMultiple() ? Array.isArray(selectedValue) && selectedValue.includes(option.value) : selectedValue === option.value;
					return h("div", {
						key: option.value,
						class: controller.getOptionClasses(option, isSelected, index === highlightedIndex.value),
						onClick: () => {
							handleSelect(option, controller);
						},
						onMouseenter: () => {
							highlightedIndex.value = index;
						}
					}, [option.label, isSelected ? h("span", { class: "ui-select__check" }, "✓") : null]);
				}),
				filteredOptions.length === 0 ? h("div", { class: "ui-select__no-results" }, "No results found") : null
			]) : null]);
		};
	}
});
var DatePicker = defineComponent({
	name: "DatePicker",
	props: {
		value: {
			type: [Date, Object],
			default: void 0
		},
		modelValue: {
			type: [Date, Object],
			default: void 0
		},
		defaultValue: {
			type: [Date, Object],
			default: void 0
		},
		minDate: {
			type: Date,
			default: void 0
		},
		maxDate: {
			type: Date,
			default: void 0
		},
		range: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: "Select date..."
		},
		size: {
			type: String,
			default: "md"
		}
	},
	emits: [
		"update:modelValue",
		"update:value",
		"change"
	],
	setup(props, { emit, attrs }) {
		const isOpen = ref(false);
		const currentMonth = ref(/* @__PURE__ */ new Date());
		const datePickerRef = ref(null);
		const calendarRef = ref(null);
		const getActiveValue = () => {
			if (props.modelValue !== void 0) return props.modelValue;
			if (props.value !== void 0) return props.value;
			return props.defaultValue;
		};
		const handleToggle = (controller) => {
			if (!controller.isDisabled()) isOpen.value = !isOpen.value;
		};
		const handleDateClick = (date, controller) => {
			if (controller.isDateDisabled(date)) return;
			let newValue;
			const selectedValue = getActiveValue();
			if (controller.isRange()) {
				const currentRange = selectedValue;
				if (!currentRange?.start) newValue = {
					start: date,
					end: null
				};
				else if (!currentRange.end) if (date < currentRange.start) newValue = {
					start: date,
					end: currentRange.start
				};
				else newValue = {
					start: currentRange.start,
					end: date
				};
				else newValue = {
					start: date,
					end: null
				};
			} else newValue = date;
			emit("update:modelValue", newValue);
			emit("update:value", newValue);
			emit("change", newValue);
			if (!controller.isRange()) isOpen.value = false;
		};
		const handlePreviousMonth = () => {
			currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1);
		};
		const handleNextMonth = () => {
			currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1);
		};
		const getDaysInMonth = (date) => {
			return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		};
		const getFirstDayOfMonth = (date) => {
			return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
		};
		const formatDate = (date, controller) => {
			if (!date) return props.placeholder;
			if (controller.isRange()) {
				const rangeObj = date;
				if (!rangeObj.start) return props.placeholder;
				if (!rangeObj.end) return rangeObj.start.toLocaleDateString();
				return `${rangeObj.start.toLocaleDateString()} - ${rangeObj.end.toLocaleDateString()}`;
			}
			return date.toLocaleDateString();
		};
		return () => {
			const selectedValue = getActiveValue();
			const controller = new DatePickerController({
				value: selectedValue,
				defaultValue: props.defaultValue,
				minDate: props.minDate,
				maxDate: props.maxDate,
				range: props.range,
				disabled: props.disabled,
				placeholder: props.placeholder,
				size: props.size
			});
			const renderCalendar = () => {
				const daysInMonth = getDaysInMonth(currentMonth.value);
				const firstDay = getFirstDayOfMonth(currentMonth.value);
				const days = [];
				const dayNames = [
					"Su",
					"Mo",
					"Tu",
					"We",
					"Th",
					"Fr",
					"Sa"
				];
				for (let i = 0; i < firstDay; i++) days.push(h("div", {
					key: `empty-${i}`,
					class: "ui-date-picker__empty"
				}));
				for (let day = 1; day <= daysInMonth; day++) {
					const date = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), day);
					const isSelected = controller.isDateSelected(date);
					const isInRange = controller.isDateInRange(date);
					const isDisabled = controller.isDateDisabled(date);
					days.push(h("button", {
						key: day,
						type: "button",
						class: controller.getDateClasses(date, isSelected, isInRange, isDisabled),
						onClick: () => {
							handleDateClick(date, controller);
						},
						disabled: isDisabled
					}, day));
				}
				return h("div", { class: controller.getCalendarClasses() }, [
					h("div", { class: controller.getHeaderClasses() }, [
						h("button", {
							type: "button",
							class: controller.getNavigationClasses(),
							onClick: handlePreviousMonth
						}, "‹"),
						h("div", { class: controller.getMonthClasses() }, currentMonth.value.toLocaleDateString("en-US", { month: "long" })),
						h("div", { class: controller.getYearClasses() }, currentMonth.value.getFullYear()),
						h("button", {
							type: "button",
							class: controller.getNavigationClasses(),
							onClick: handleNextMonth
						}, "›")
					]),
					h("div", { class: controller.getDaysHeaderClasses() }, dayNames.map((day) => h("div", {
						key: day,
						class: controller.getDayClasses()
					}, day))),
					h("div", { class: "ui-date-picker__dates" }, days)
				]);
			};
			return h("div", {
				ref: datePickerRef,
				class: [controller.getDatePickerClasses(), attrs.class],
				...controller.getAriaAttributes()
			}, [h("div", {
				class: controller.getTriggerClasses(),
				onClick: () => {
					handleToggle(controller);
				},
				tabindex: controller.isDisabled() ? -1 : 0
			}, [h("span", formatDate(selectedValue, controller)), h("span", { class: "ui-date-picker__calendar-icon" }, "📅")]), isOpen.value ? h("div", {
				ref: calendarRef,
				class: "ui-date-picker__popover"
			}, renderCalendar()) : null]);
		};
	}
});
var Calendar = defineComponent({
	name: "Calendar",
	props: {
		value: {
			type: Date,
			default: void 0
		},
		modelValue: {
			type: Date,
			default: void 0
		},
		defaultValue: {
			type: Date,
			default: void 0
		},
		minDate: {
			type: Date,
			default: void 0
		},
		maxDate: {
			type: Date,
			default: void 0
		},
		disabledDates: {
			type: Array,
			default: void 0
		}
	},
	emits: [
		"update:modelValue",
		"update:value",
		"change"
	],
	setup(props, { emit, attrs }) {
		const currentMonth = ref(/* @__PURE__ */ new Date());
		const getActiveValue = () => {
			if (props.modelValue !== void 0) return props.modelValue;
			return props.value;
		};
		const handleDateClick = (date, controller) => {
			if (controller.isDateDisabled(date)) return;
			emit("update:modelValue", date);
			emit("update:value", date);
			emit("change", date);
		};
		const handlePreviousMonth = () => {
			currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1);
		};
		const handleNextMonth = () => {
			currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1);
		};
		const getDaysInMonth = (date) => {
			return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		};
		const getFirstDayOfMonth = (date) => {
			return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
		};
		return () => {
			const controller = new CalendarController({
				value: getActiveValue(),
				defaultValue: props.defaultValue,
				minDate: props.minDate,
				maxDate: props.maxDate,
				disabledDates: props.disabledDates
			});
			const daysInMonth = getDaysInMonth(currentMonth.value);
			const firstDay = getFirstDayOfMonth(currentMonth.value);
			const days = [];
			const dayNames = [
				"Su",
				"Mo",
				"Tu",
				"We",
				"Th",
				"Fr",
				"Sa"
			];
			for (let i = 0; i < firstDay; i++) days.push(h("div", {
				key: `empty-${String(i)}`,
				class: "ui-calendar__empty"
			}));
			for (let day = 1; day <= daysInMonth; day++) {
				const date = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), day);
				const isSelected = controller.isDateSelected(date);
				const isToday = controller.isDateToday(date);
				const isDisabled = controller.isDateDisabled(date);
				days.push(h("button", {
					key: day,
					type: "button",
					class: controller.getDateClasses(date, isSelected, isToday, isDisabled),
					onClick: () => {
						handleDateClick(date, controller);
					},
					disabled: isDisabled,
					"aria-label": date.toLocaleDateString(),
					"aria-selected": isSelected
				}, day));
			}
			return h("div", {
				class: [controller.getCalendarClasses(), attrs.class],
				...controller.getAriaAttributes()
			}, [
				h("div", { class: controller.getHeaderClasses() }, [
					h("button", {
						type: "button",
						class: controller.getNavigationClasses(),
						onClick: handlePreviousMonth,
						"aria-label": "Previous month"
					}, "‹"),
					h("div", { class: controller.getMonthClasses() }, currentMonth.value.toLocaleDateString("en-US", { month: "long" })),
					h("div", { class: controller.getYearClasses() }, currentMonth.value.getFullYear()),
					h("button", {
						type: "button",
						class: controller.getNavigationClasses(),
						onClick: handleNextMonth,
						"aria-label": "Next month"
					}, "›")
				]),
				h("div", { class: controller.getDaysHeaderClasses() }, dayNames.map((day) => h("div", {
					key: day,
					class: controller.getDayClasses()
				}, day))),
				h("div", { class: "ui-calendar__dates" }, days)
			]);
		};
	}
});
var ContextMenu = defineComponent({
	name: "ContextMenu",
	props: {
		items: {
			type: Array,
			required: true
		},
		open: {
			type: Boolean,
			default: false
		},
		x: {
			type: Number,
			default: 0
		},
		y: {
			type: Number,
			default: 0
		}
	},
	emits: [
		"update:open",
		"openChange",
		"close"
	],
	setup(props, { emit, attrs }) {
		const contextMenuRef = ref(null);
		const handleClose = () => {
			emit("update:open", false);
			emit("openChange", false);
			emit("close");
		};
		const handleItemClick = (item) => {
			if (item.disabled) return;
			item.onClick?.();
			handleClose();
		};
		return () => {
			if (!props.open) return null;
			const controller = new ContextMenuController({
				items: props.items,
				open: props.open,
				x: props.x,
				y: props.y
			});
			const position = controller.getPosition();
			return h("div", {
				ref: contextMenuRef,
				class: [controller.getContextMenuClasses(), attrs.class],
				style: {
					position: "fixed",
					left: `${position.x}px`,
					top: `${position.y}px`
				},
				...controller.getAriaAttributes()
			}, controller.getItems().map((item, index) => h("div", {
				key: index,
				class: controller.getItemClasses(item.disabled ?? false, item.divider ?? false),
				onClick: () => {
					handleItemClick(item);
				},
				role: "menuitem",
				tabindex: item.disabled ? -1 : 0
			}, item.label)));
		};
	}
});
var Carousel = defineComponent({
	name: "Carousel",
	props: {
		autoplay: {
			type: Boolean,
			default: false
		},
		interval: {
			type: Number,
			default: 5e3
		},
		infinite: {
			type: Boolean,
			default: false
		},
		showArrows: {
			type: Boolean,
			default: true
		},
		showDots: {
			type: Boolean,
			default: true
		}
	},
	setup(props, { slots, attrs }) {
		const currentIndex = ref(0);
		const isPaused = ref(false);
		const trackRef = ref(null);
		const touchStartX = ref(0);
		const touchEndX = ref(0);
		let timer = null;
		const clearAutoTimer = () => {
			if (timer) {
				clearInterval(timer);
				timer = null;
			}
		};
		const startAutoTimer = (controller, slideCount) => {
			clearAutoTimer();
			if (!controller.isAutoplay() || isPaused.value || slideCount <= 1) return;
			timer = setInterval(() => {
				if (controller.isInfinite()) currentIndex.value = (currentIndex.value + 1) % slideCount;
				else currentIndex.value = Math.min(currentIndex.value + 1, slideCount - 1);
			}, controller.getInterval());
		};
		const handleTouchStart = (e) => {
			if (e.changedTouches.length > 0) touchStartX.value = e.changedTouches[0].screenX;
		};
		const handleTouchMove = (e) => {
			if (e.changedTouches.length > 0) touchEndX.value = e.changedTouches[0].screenX;
		};
		return () => {
			const childrenSlot = slots.default ? slots.default() : [];
			const slides = Array.isArray(childrenSlot) ? childrenSlot : [childrenSlot];
			const slideCount = slides.length;
			const controller = new CarouselController({
				autoplay: props.autoplay,
				interval: props.interval,
				infinite: props.infinite,
				showArrows: props.showArrows,
				showDots: props.showDots
			});
			startAutoTimer(controller, slideCount);
			const nextSlide = () => {
				if (controller.isInfinite()) currentIndex.value = (currentIndex.value + 1) % slideCount;
				else currentIndex.value = Math.min(currentIndex.value + 1, slideCount - 1);
			};
			const prevSlide = () => {
				if (controller.isInfinite()) currentIndex.value = (currentIndex.value - 1 + slideCount) % slideCount;
				else currentIndex.value = Math.max(currentIndex.value - 1, 0);
			};
			const goToSlide = (index) => {
				currentIndex.value = index;
			};
			const handleTouchEnd = () => {
				const diff = touchStartX.value - touchEndX.value;
				if (diff > 50) nextSlide();
				else if (diff < -50) prevSlide();
			};
			return h("div", {
				class: [controller.getCarouselClasses(), attrs.class],
				onMouseEnter: () => {
					isPaused.value = true;
				},
				onMouseLeave: () => {
					isPaused.value = false;
				},
				onTouchStart: handleTouchStart,
				onTouchMove: handleTouchMove,
				onTouchEnd: handleTouchEnd,
				...controller.getAriaAttributes()
			}, [
				h("div", {
					ref: trackRef,
					class: controller.getTrackClasses(),
					style: {
						transform: `translateX(-${currentIndex.value * 100}%)`,
						transition: "transform 0.5s ease-in-out"
					}
				}, slides.map((slide, index) => h("div", {
					key: index,
					class: controller.getSlideClasses()
				}, slide))),
				controller.showArrows() && slideCount > 1 ? [h("button", {
					type: "button",
					class: `${controller.getArrowClasses()} ${controller.getArrowPrevClasses()}`,
					onClick: prevSlide,
					"aria-label": "Previous slide"
				}, "‹"), h("button", {
					type: "button",
					class: `${controller.getArrowClasses()} ${controller.getArrowNextClasses()}`,
					onClick: nextSlide,
					"aria-label": "Next slide"
				}, "›")] : null,
				controller.showDots() && slideCount > 1 ? h("div", { class: controller.getDotsClasses() }, slides.map((_, index) => h("button", {
					key: index,
					type: "button",
					class: controller.getDotClasses(index === currentIndex.value),
					onClick: () => {
						goToSlide(index);
					},
					"aria-label": `Go to slide ${index + 1}`
				}))) : null
			]);
		};
	}
});
var Resizable = defineComponent({
	name: "Resizable",
	props: {
		width: {
			type: Number,
			default: 300
		},
		height: {
			type: Number,
			default: 200
		},
		minWidth: {
			type: Number,
			default: void 0
		},
		maxWidth: {
			type: Number,
			default: void 0
		},
		minHeight: {
			type: Number,
			default: void 0
		},
		maxHeight: {
			type: Number,
			default: void 0
		},
		handles: {
			type: Array,
			default: () => ["se"]
		}
	},
	emits: [
		"resize",
		"resizeStart",
		"resizeEnd",
		"update:width",
		"update:height"
	],
	setup(props, { slots, emit, attrs }) {
		const currentWidth = ref(props.width);
		const currentHeight = ref(props.height);
		const startPos = ref({
			x: 0,
			y: 0
		});
		const startSize = ref({
			width: 0,
			height: 0
		});
		const handleMouseDown = (handle, e, controller) => {
			e.preventDefault();
			e.stopPropagation();
			startPos.value = {
				x: e.clientX,
				y: e.clientY
			};
			startSize.value = {
				width: currentWidth.value,
				height: currentHeight.value
			};
			emit("resizeStart");
			const handleMouseMove = (moveEvent) => {
				const deltaX = moveEvent.clientX - startPos.value.x;
				const deltaY = moveEvent.clientY - startPos.value.y;
				let newWidth = startSize.value.width;
				let newHeight = startSize.value.height;
				if (handle.includes("e")) newWidth += deltaX;
				if (handle.includes("w")) newWidth -= deltaX;
				if (handle.includes("s")) newHeight += deltaY;
				if (handle.includes("n")) newHeight -= deltaY;
				newWidth = controller.constrainWidth(newWidth);
				newHeight = controller.constrainHeight(newHeight);
				currentWidth.value = newWidth;
				currentHeight.value = newHeight;
				emit("resize", {
					width: newWidth,
					height: newHeight
				});
				emit("update:width", newWidth);
				emit("update:height", newHeight);
			};
			const handleMouseUp = () => {
				emit("resizeEnd");
				(void 0).removeEventListener("mousemove", handleMouseMove);
				(void 0).removeEventListener("mouseup", handleMouseUp);
			};
			(void 0).addEventListener("mousemove", handleMouseMove);
			(void 0).addEventListener("mouseup", handleMouseUp);
		};
		return () => {
			const controller = new ResizableController({
				width: props.width,
				height: props.height,
				minWidth: props.minWidth,
				maxWidth: props.maxWidth,
				minHeight: props.minHeight,
				maxHeight: props.maxHeight,
				handles: props.handles
			});
			return h("div", {
				class: [controller.getResizableClasses(), attrs.class],
				style: {
					width: `${currentWidth.value}px`,
					height: `${currentHeight.value}px`,
					position: "relative"
				},
				...controller.getAriaAttributes()
			}, [slots.default?.(), ...controller.getHandles().map((handle) => h("div", {
				key: handle,
				class: controller.getHandleClasses(handle),
				onMousedown: (e) => {
					handleMouseDown(handle, e, controller);
				},
				style: { cursor: `${handle}-resize` }
			}))]);
		};
	}
});
var Slider = defineComponent({
	name: "Slider",
	props: {
		value: {
			type: [Number, Array],
			default: void 0
		},
		modelValue: {
			type: [Number, Array],
			default: void 0
		},
		defaultValue: {
			type: [Number, Array],
			default: 50
		},
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 100
		},
		step: {
			type: Number,
			default: 1
		},
		range: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: "md"
		}
	},
	emits: [
		"update:modelValue",
		"update:value",
		"change"
	],
	setup(props, { emit, attrs }) {
		const internalValue = ref(props.defaultValue);
		const isDragging = ref(false);
		const activeThumb = ref(0);
		const trackRef = ref(null);
		const getActiveValue = () => {
			if (props.modelValue !== void 0) return props.modelValue;
			if (props.value !== void 0) return props.value;
			return internalValue.value;
		};
		return () => {
			const currentValue = getActiveValue();
			const controller = new SliderController({
				value: currentValue,
				defaultValue: props.defaultValue,
				min: props.min,
				max: props.max,
				step: props.step,
				range: props.range,
				disabled: props.disabled,
				size: props.size
			});
			const handleTrackClick = (e) => {
				if (controller.isDisabled()) return;
				const track = trackRef.value;
				if (!track) return;
				const rect = track.getBoundingClientRect();
				const percentage = (e.clientX - rect.left) / rect.width * 100;
				const newValue = controller.getValueFromPercentage(percentage);
				if (controller.isRange()) {
					const currentValues = Array.isArray(currentValue) ? currentValue : [props.defaultValue || 0, props.defaultValue || 0];
					const newValues = [...currentValues];
					const thumbIndex = Math.abs(newValue - currentValues[0]) < Math.abs(newValue - currentValues[1]) ? 0 : 1;
					newValues[thumbIndex] = newValue;
					newValues.sort((a, b) => a - b);
					if (props.modelValue === void 0 && props.value === void 0) internalValue.value = newValues;
					emit("update:modelValue", newValues);
					emit("update:value", newValues);
					emit("change", newValues);
				} else {
					if (props.modelValue === void 0 && props.value === void 0) internalValue.value = newValue;
					emit("update:modelValue", newValue);
					emit("update:value", newValue);
					emit("change", newValue);
				}
			};
			const handleThumbMouseDown = (thumbIndex, e) => {
				if (controller.isDisabled()) return;
				e.preventDefault();
				e.stopPropagation();
				isDragging.value = true;
				activeThumb.value = thumbIndex;
				const handleMouseMove = (moveEvent) => {
					const track = trackRef.value;
					if (!track) return;
					const rect = track.getBoundingClientRect();
					const percentage = (moveEvent.clientX - rect.left) / rect.width * 100;
					const newValue = controller.getValueFromPercentage(percentage);
					if (controller.isRange()) {
						const newValues = [...Array.isArray(currentValue) ? currentValue : [props.defaultValue || 0, props.defaultValue || 0]];
						newValues[thumbIndex] = newValue;
						newValues.sort((a, b) => a - b);
						if (props.modelValue === void 0 && props.value === void 0) internalValue.value = newValues;
						emit("update:modelValue", newValues);
						emit("update:value", newValues);
						emit("change", newValues);
					} else {
						if (props.modelValue === void 0 && props.value === void 0) internalValue.value = newValue;
						emit("update:modelValue", newValue);
						emit("update:value", newValue);
						emit("change", newValue);
					}
				};
				const handleMouseUp = () => {
					isDragging.value = false;
					activeThumb.value = 0;
					(void 0).removeEventListener("mousemove", handleMouseMove);
					(void 0).removeEventListener("mouseup", handleMouseUp);
				};
				(void 0).addEventListener("mousemove", handleMouseMove);
				(void 0).addEventListener("mouseup", handleMouseUp);
			};
			const renderThumbs = () => {
				if (controller.isRange()) return (Array.isArray(currentValue) ? currentValue : [props.defaultValue || 0, props.defaultValue || 0]).map((val, index) => {
					const percentage2 = controller.getPercentage(val);
					return h("div", {
						key: index,
						class: controller.getThumbClasses(isDragging.value && activeThumb.value === index),
						style: { left: `${percentage2}%` },
						onMousedown: (e) => {
							handleThumbMouseDown(index, e);
						},
						tabindex: controller.isDisabled() ? -1 : 0,
						role: "slider",
						"aria-valuenow": val,
						"aria-valuemin": controller.getMin(),
						"aria-valuemax": controller.getMax(),
						"aria-disabled": controller.isDisabled(),
						"aria-valuetext": String(val)
					});
				});
				const percentage = controller.getPercentage(currentValue);
				return h("div", {
					class: controller.getThumbClasses(isDragging.value),
					style: { left: `${percentage}%` },
					onMousedown: (e) => {
						handleThumbMouseDown(0, e);
					},
					tabindex: controller.isDisabled() ? -1 : 0,
					role: "slider",
					"aria-valuenow": currentValue,
					"aria-valuemin": controller.getMin(),
					"aria-valuemax": controller.getMax(),
					"aria-disabled": controller.isDisabled(),
					"aria-valuetext": String(currentValue)
				});
			};
			const renderFill = () => {
				if (controller.isRange()) {
					const values = Array.isArray(currentValue) ? currentValue : [props.defaultValue || 0, props.defaultValue || 0];
					const startPercentage = controller.getPercentage(values[0]);
					const endPercentage = controller.getPercentage(values[1]);
					return h("div", {
						class: controller.getFillClasses(),
						style: {
							left: `${startPercentage}%`,
							width: `${endPercentage - startPercentage}%`
						}
					});
				}
				const percentage = controller.getPercentage(currentValue);
				return h("div", {
					class: controller.getFillClasses(),
					style: { width: `${percentage}%` }
				});
			};
			return h("div", { class: [controller.getSliderClasses(), attrs.class] }, [h("div", {
				ref: trackRef,
				class: controller.getTrackClasses(),
				onClick: handleTrackClick
			}, [renderFill(), renderThumbs()])]);
		};
	}
});
function useDisclosure(props = {}) {
	const { defaultOpen = false, onOpenChange, onOpen, onClose } = props;
	const uncontrolledOpen = ref(defaultOpen);
	const isControlled = () => props.open !== void 0;
	const openComputed = computed(() => {
		if (props.open !== void 0) {
			if (typeof props.open === "function") return props.open();
			if (typeof props.open === "object" && "value" in props.open) return props.open.value;
			return props.open;
		}
		return uncontrolledOpen.value;
	});
	const handleOpenChange = (newOpen) => {
		if (!isControlled()) uncontrolledOpen.value = newOpen;
		onOpenChange?.(newOpen);
		if (newOpen) onOpen?.();
		else onClose?.();
	};
	const openDialog = () => {
		handleOpenChange(true);
	};
	const closeDialog = () => {
		handleOpenChange(false);
	};
	const toggle = () => {
		handleOpenChange(!openComputed.value);
	};
	return {
		open: openComputed,
		isOpen: openComputed,
		onOpenChange: handleOpenChange,
		openDialog,
		closeDialog,
		toggle
	};
}
var ThemeSymbol = /* @__PURE__ */ Symbol("EvaraTheme");
var ThemeProvider = defineComponent({
	name: "ThemeProvider",
	props: {
		defaultTheme: {
			type: String,
			default: "light"
		},
		theme: {
			type: Object,
			default: () => ({})
		}
	},
	setup(props, { slots }) {
		const currentTheme = ref(props.defaultTheme);
		const customTokens = ref(props.theme);
		const setTheme = (themeName) => {
			currentTheme.value = themeName;
		};
		const toggleTheme = () => {
			currentTheme.value = currentTheme.value === "light" ? "dark" : "light";
		};
		const setCustomTokens = (tokens) => {
			customTokens.value = tokens;
		};
		watch([currentTheme, customTokens], () => {});
		provide(ThemeSymbol, {
			theme: currentTheme,
			tokens: customTokens,
			setTheme,
			toggleTheme,
			setCustomTokens
		});
		return () => slots.default ? slots.default() : null;
	}
});
/**
* @file Button.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Button interactive action component.
*
* @description
* Renders interactive buttons with polymorphic tags, loading spinners, size variants, color themes, and ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Input.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Input text field component.
*
* @description
* Renders single-line text input fields supporting v-model bindings, prefix/suffix slots, size variants, and ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Checkbox.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Checkbox toggle input component.
*
* @description
* Renders checkbox input toggles supporting v-model boolean state, indeterminate dash icons, label text wrappers, and ARIA checkbox roles.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file RadioGroupContext.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue InjectionKey context definition for RadioGroup radio button synchronization.
*
* @description
* Defines RadioGroupContextValue interface and exports RadioGroupKey symbol for Vue injection context.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Radio.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Radio option input component.
*
* @description
* Renders individual radio button options with RadioGroup injection context integration, label wrappers, and radio ARIA roles.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file FieldGroup.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue FieldGroup form field grouping UI component.
*
* @description
* Groups multiple form field controls with inherited disabled and required states via Vue injection context.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Field.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Field form wrapper UI component.
*
* @description
* Wraps individual form input controls with label headers, required asterisks, helper text hints, and validation error messages.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Form.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Form container component with Field, Item, Label, Control, Description, and Message sub-components.
*
* @description
* Manages form state validation, reactive submit handlers, error subscriptions, and accessible form control markup.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file InputGroup.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue InputGroup input addon container component.
*
* @description
* Combines input fields with prepend and append addon buttons or text indicators in a unified input control layout.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file InputOTP.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue InputOTP pin code input component.
*
* @description
* Renders segmented numeric pin inputs supporting clipboard paste parsing, auto-focus progression, backspace handling, and ARIA digit labels.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Card.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Card container component with Header, Body, and Footer sub-components.
*
* @description
* Renders flexible container boxes with variant styles, box shadow elevations, and compound sub-components.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Separator.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Separator divider line component.
*
* @description
* Renders layout divider lines with horizontal/vertical orientations, color themes, and ARIA separator roles.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Avatar.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Avatar user profile picture UI component.
*
* @description
* Renders user profile avatars supporting image sources, text initials fallbacks, presence status badges, and size variants.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Badge.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Badge status tag UI component.
*
* @description
* Renders small inline status badges with support for color themes, size variants, and corner position styling.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Alert.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Alert notification callout component.
*
* @description
* Renders banner callouts supporting contextual variants, dismiss buttons, icons, and ARIA alert roles.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file ProgressBar.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue ProgressBar progress indicator UI component.
*
* @description
* Renders progress bar indicators with percentage width fills, indeterminate animation modes, color themes, and ARIA progressbar attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Skeleton.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Skeleton loading placeholder UI component.
*
* @description
* Renders animated loading skeleton blocks with shape variants (text, circle, rectangle, square) and ARIA status attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Spinner.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Spinner loading activity indicator component.
*
* @description
* Renders spinning activity loading indicators with size tokens, color themes, and ARIA status attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Breadcrumb.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Breadcrumb navigation hierarchy UI component.
*
* @description
* Renders ordered list links with configurable separators and active page ARIA indicators for site path navigation.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Pagination.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Pagination page navigation control component.
*
* @description
* Renders pagination page buttons with previous/next controls, page number ranges, ellipsis truncated page ranges, and navigation ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Dialog.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Dialog modal component with Trigger, Overlay, Content, Header, Body, Footer, and Close sub-components.
*
* @description
* Renders modal dialog overlays with focus trapping, keyboard escape listeners, backdrop click dismissal, and compound sub-components.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Popover.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Popover floating content card component with Root, Trigger, Content, and Close sub-components.
*
* @description
* Renders positioned floating card panels with trigger buttons, click-outside dismissal, and popover ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file AlertDialog.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue AlertDialog modal confirmation prompt component.
*
* @description
* Renders modal confirmation popups with backdrop overlay clicks, focus restore, keyboard escape listeners, and alertdialog ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file ButtonGroup.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue ButtonGroup toolbar container UI component.
*
* @description
* Groups adjacent buttons with unified borders, orientation layout variants (horizontal/vertical), and group ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Select.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Select dropdown menu picker component.
*
* @description
* Renders select dropdowns supporting single and multi-selection modes, search input filters, keyboard listbox navigation, and click-outside popover dismissals.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file DatePicker.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue DatePicker input component with dropdown calendar popover.
*
* @description
* Renders date inputs with popup calendars supporting single and range date selections, min/max bounds, and click-outside popover dismissals.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Calendar.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Calendar date picker grid UI component.
*
* @description
* Renders month date grids with v-model date selection, month navigation controls, min/max bounds, and disabled date filters.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file ContextMenu.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue ContextMenu right-click popup menu component.
*
* @description
* Renders floating right-click context menus at cursor coordinates (x,y) with click-outside dismissal and menuitem ARIA attributes.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Carousel.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Carousel interactive slideshow slider component.
*
* @description
* Renders slide carousels supporting touch gestures, infinite loops, autoplay timers, arrow navigation, and dot indicators.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Resizable.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Resizable drag handle panel layout component.
*
* @description
* Renders resizable containers with interactive drag handles (n, s, e, w, ne, nw, se, sw) and min/max width/height constraints.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file Slider.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue Slider range input UI component.
*
* @description
* Renders interactive range sliders supporting single-thumb and dual-thumb values, drag thumb listeners, step precision math, and slider ARIA roles.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file index.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Central export index for all Vue components and TypeScript types.
*
* @description
* Re-exports Vue UI components and associated prop interface definitions for integration in Vue 3 applications.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file plugin.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Evara UI Vue plugin factory and unplugin-vue-components resolver.
*
* @description
* Implements createEvara plugin installer registering standard and prefixed Vue components globally,
* compound sub-components, and exports the EvaraResolver function for build-time auto-importing.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file useDisclosure.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue 3 disclosure open/close toggle composable.
*
* @description
* Manages open/close toggle state for dialogs, modals, popovers, and context menus in Vue 3,
* providing reactive ref states and helper action functions.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file useControllableState.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue 3 controlled and uncontrolled reactive state composable.
*
* @description
* Manages controlled and uncontrolled reactive component states in Vue 3, accepting prop refs, getter functions,
* or direct values while maintaining fallback uncontrolled ref state.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file useController.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue 3 composable adapter for Evara core headless component controllers.
*
* @description
* Provides reactive computed controller instantiation helpers for core controllers in Vue 3,
* exposing specific composable factories for DialogController, SliderController, and PaginationController.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file ThemeProvider.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Vue ThemeProvider component and useTheme composable.
*
* @description
* Provides Vue context theme state management, CSS custom property application, light/dark mode toggling,
* and exposes useTheme composable for injecting theme context in Vue 3 applications.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
/**
* @file index.ts
*
* @version 1.0.0
* @author BleckWolf25
* @license MIT
*
* @summary Main entry point for the @bleckwolf25/vue package.
*
* @description
* Re-exports all Vue components, composables, ThemeProvider component, and the global Vue plugin object EvaraUI.
*
* @since 10/06/2026
* @updated 27/07/2026
*/
//#endregion
//#region app.vue?vue&type=script&setup=true&lang.ts
var app_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "app",
	__ssrInlineRender: true,
	setup(__props) {
		const otpValue = ref("");
		const isModalOpen = ref(false);
		const disclosure = useDisclosure({ defaultOpen: false });
		const { form } = useForm({
			initialValues: { email: "" },
			validate: (values) => !values.email ? { email: "Email required for Nuxt SSR" } : {},
			onSubmit: (values) => {
				alert(`Nuxt Form Submitted: ${JSON.stringify(values)}`);
			}
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ThemeProvider = ThemeProvider;
			const _component_Badge = Badge;
			const _component_Alert = Alert;
			const _component_Card = Card;
			const _component_CardHeader = resolveComponent("CardHeader");
			const _component_CardBody = resolveComponent("CardBody");
			const _component_Form = Form;
			const _component_FormField = FormField;
			const _component_FormItem = FormItem;
			const _component_FormLabel = FormLabel;
			const _component_FormControl = FormControl;
			const _component_Input = Input;
			const _component_FormMessage = FormMessage;
			const _component_Button = Button;
			const _component_InputOTP = InputOTP;
			const _component_Dialog = Dialog;
			const _component_DialogHeader = DialogHeader;
			const _component_DialogBody = DialogBody;
			const _component_DialogFooter = DialogFooter;
			_push(ssrRenderComponent(_component_ThemeProvider, mergeProps({ "default-theme": "light" }, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div style="${ssrRenderStyle({
							"padding": "3rem",
							"max-width": "800px",
							"margin": "0 auto",
							"font-family": "system-ui, sans-serif"
						})}"${_scopeId}><header style="${ssrRenderStyle({ "margin-bottom": "2rem" })}"${_scopeId}><h1 style="${ssrRenderStyle({
							"display": "flex",
							"align-items": "center",
							"gap": "0.75rem"
						})}"${_scopeId}> Nuxt 4 + Evara UI `);
						_push(ssrRenderComponent(_component_Badge, { color: "primary" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` SSR Powered `);
								else return [createTextVNode(" SSR Powered ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</h1><p style="${ssrRenderStyle({ "color": "#6b7280" })}"${_scopeId}> Zero-config component auto-imports &amp; SSR hydration with @bleckwolf25/nuxt. </p></header>`);
						_push(ssrRenderComponent(_component_Alert, {
							variant: "success",
							"show-icon": "",
							style: { "margin-bottom": "1.5rem" }
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Nuxt module auto-registered all Evara components, composables (useForm, useTheme, useDisclosure), and ThemeProvider! `);
								else return [createTextVNode(" Nuxt module auto-registered all Evara components, composables (useForm, useTheme, useDisclosure), and ThemeProvider! ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<div style="${ssrRenderStyle({
							"display": "grid",
							"grid-template-columns": "repeat(auto-fit, minmax(350px, 1fr))",
							"gap": "1.5rem"
						})}"${_scopeId}>`);
						_push(ssrRenderComponent(_component_Card, { variant: "outline" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_CardHeader, null, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(`<h3 style="${ssrRenderStyle({ "margin": "0" })}"${_scopeId}> SSR Auto-Imported Form </h3>`);
											else return [createVNode("h3", { style: { "margin": "0" } }, " SSR Auto-Imported Form ")];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_CardBody, null, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_Form, { form: unref(form) }, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) {
														_push(ssrRenderComponent(_component_FormField, { name: "email" }, {
															default: withCtx(({ value, onChange, onBlur }, _push, _parent, _scopeId) => {
																if (_push) _push(ssrRenderComponent(_component_FormItem, null, {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) {
																			_push(ssrRenderComponent(_component_FormLabel, null, {
																				default: withCtx((_, _push, _parent, _scopeId) => {
																					if (_push) _push(`Email Address`);
																					else return [createTextVNode("Email Address")];
																				}),
																				_: 2
																			}, _parent, _scopeId));
																			_push(ssrRenderComponent(_component_FormControl, null, {
																				default: withCtx((_, _push, _parent, _scopeId) => {
																					if (_push) _push(ssrRenderComponent(_component_Input, {
																						type: "email",
																						value,
																						placeholder: "nuxt@evara.dev",
																						onInput: (e) => onChange(e.target.value),
																						onBlur
																					}, null, _parent, _scopeId));
																					else return [createVNode(_component_Input, {
																						type: "email",
																						value,
																						placeholder: "nuxt@evara.dev",
																						onInput: (e) => onChange(e.target.value),
																						onBlur
																					}, null, 8, [
																						"value",
																						"onInput",
																						"onBlur"
																					])];
																				}),
																				_: 2
																			}, _parent, _scopeId));
																			_push(ssrRenderComponent(_component_FormMessage, null, null, _parent, _scopeId));
																		} else return [
																			createVNode(_component_FormLabel, null, {
																				default: withCtx(() => [createTextVNode("Email Address")]),
																				_: 1
																			}),
																			createVNode(_component_FormControl, null, {
																				default: withCtx(() => [createVNode(_component_Input, {
																					type: "email",
																					value,
																					placeholder: "nuxt@evara.dev",
																					onInput: (e) => onChange(e.target.value),
																					onBlur
																				}, null, 8, [
																					"value",
																					"onInput",
																					"onBlur"
																				])]),
																				_: 2
																			}, 1024),
																			createVNode(_component_FormMessage)
																		];
																	}),
																	_: 2
																}, _parent, _scopeId));
																else return [createVNode(_component_FormItem, null, {
																	default: withCtx(() => [
																		createVNode(_component_FormLabel, null, {
																			default: withCtx(() => [createTextVNode("Email Address")]),
																			_: 1
																		}),
																		createVNode(_component_FormControl, null, {
																			default: withCtx(() => [createVNode(_component_Input, {
																				type: "email",
																				value,
																				placeholder: "nuxt@evara.dev",
																				onInput: (e) => onChange(e.target.value),
																				onBlur
																			}, null, 8, [
																				"value",
																				"onInput",
																				"onBlur"
																			])]),
																			_: 2
																		}, 1024),
																		createVNode(_component_FormMessage)
																	]),
																	_: 2
																}, 1024)];
															}),
															_: 1
														}, _parent, _scopeId));
														_push(ssrRenderComponent(_component_Button, {
															type: "submit",
															variant: "primary",
															style: { "margin-top": "1rem" }
														}, {
															default: withCtx((_, _push, _parent, _scopeId) => {
																if (_push) _push(` Submit Nuxt Form `);
																else return [createTextVNode(" Submit Nuxt Form ")];
															}),
															_: 1
														}, _parent, _scopeId));
													} else return [createVNode(_component_FormField, { name: "email" }, {
														default: withCtx(({ value, onChange, onBlur }) => [createVNode(_component_FormItem, null, {
															default: withCtx(() => [
																createVNode(_component_FormLabel, null, {
																	default: withCtx(() => [createTextVNode("Email Address")]),
																	_: 1
																}),
																createVNode(_component_FormControl, null, {
																	default: withCtx(() => [createVNode(_component_Input, {
																		type: "email",
																		value,
																		placeholder: "nuxt@evara.dev",
																		onInput: (e) => onChange(e.target.value),
																		onBlur
																	}, null, 8, [
																		"value",
																		"onInput",
																		"onBlur"
																	])]),
																	_: 2
																}, 1024),
																createVNode(_component_FormMessage)
															]),
															_: 2
														}, 1024)]),
														_: 1
													}), createVNode(_component_Button, {
														type: "submit",
														variant: "primary",
														style: { "margin-top": "1rem" }
													}, {
														default: withCtx(() => [createTextVNode(" Submit Nuxt Form ")]),
														_: 1
													})];
												}),
												_: 1
											}, _parent, _scopeId));
											else return [createVNode(_component_Form, { form: unref(form) }, {
												default: withCtx(() => [createVNode(_component_FormField, { name: "email" }, {
													default: withCtx(({ value, onChange, onBlur }) => [createVNode(_component_FormItem, null, {
														default: withCtx(() => [
															createVNode(_component_FormLabel, null, {
																default: withCtx(() => [createTextVNode("Email Address")]),
																_: 1
															}),
															createVNode(_component_FormControl, null, {
																default: withCtx(() => [createVNode(_component_Input, {
																	type: "email",
																	value,
																	placeholder: "nuxt@evara.dev",
																	onInput: (e) => onChange(e.target.value),
																	onBlur
																}, null, 8, [
																	"value",
																	"onInput",
																	"onBlur"
																])]),
																_: 2
															}, 1024),
															createVNode(_component_FormMessage)
														]),
														_: 2
													}, 1024)]),
													_: 1
												}), createVNode(_component_Button, {
													type: "submit",
													variant: "primary",
													style: { "margin-top": "1rem" }
												}, {
													default: withCtx(() => [createTextVNode(" Submit Nuxt Form ")]),
													_: 1
												})]),
												_: 1
											}, 8, ["form"])];
										}),
										_: 1
									}, _parent, _scopeId));
								} else return [createVNode(_component_CardHeader, null, {
									default: withCtx(() => [createVNode("h3", { style: { "margin": "0" } }, " SSR Auto-Imported Form ")]),
									_: 1
								}), createVNode(_component_CardBody, null, {
									default: withCtx(() => [createVNode(_component_Form, { form: unref(form) }, {
										default: withCtx(() => [createVNode(_component_FormField, { name: "email" }, {
											default: withCtx(({ value, onChange, onBlur }) => [createVNode(_component_FormItem, null, {
												default: withCtx(() => [
													createVNode(_component_FormLabel, null, {
														default: withCtx(() => [createTextVNode("Email Address")]),
														_: 1
													}),
													createVNode(_component_FormControl, null, {
														default: withCtx(() => [createVNode(_component_Input, {
															type: "email",
															value,
															placeholder: "nuxt@evara.dev",
															onInput: (e) => onChange(e.target.value),
															onBlur
														}, null, 8, [
															"value",
															"onInput",
															"onBlur"
														])]),
														_: 2
													}, 1024),
													createVNode(_component_FormMessage)
												]),
												_: 2
											}, 1024)]),
											_: 1
										}), createVNode(_component_Button, {
											type: "submit",
											variant: "primary",
											style: { "margin-top": "1rem" }
										}, {
											default: withCtx(() => [createTextVNode(" Submit Nuxt Form ")]),
											_: 1
										})]),
										_: 1
									}, 8, ["form"])]),
									_: 1
								})];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Card, { variant: "outline" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_CardHeader, null, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(`<h3 style="${ssrRenderStyle({ "margin": "0" })}"${_scopeId}> 2FA Security Module </h3>`);
											else return [createVNode("h3", { style: { "margin": "0" } }, " 2FA Security Module ")];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_CardBody, { style: {
										"display": "flex",
										"flex-direction": "column",
										"gap": "1.25rem"
									} }, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) {
												_push(`<p style="${ssrRenderStyle({
													"margin": "0",
													"color": "#4b5563"
												})}"${_scopeId}> Enter 6-digit code: </p>`);
												_push(ssrRenderComponent(_component_InputOTP, {
													modelValue: unref(otpValue),
													"onUpdate:modelValue": ($event) => isRef(otpValue) ? otpValue.value = $event : null,
													length: 6
												}, null, _parent, _scopeId));
												_push(`<div style="${ssrRenderStyle({
													"display": "flex",
													"gap": "0.75rem"
												})}"${_scopeId}>`);
												_push(ssrRenderComponent(_component_Button, {
													variant: "primary",
													onClick: ($event) => isModalOpen.value = true
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(` Verify OTP `);
														else return [createTextVNode(" Verify OTP ")];
													}),
													_: 1
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_Button, {
													variant: "secondary",
													onClick: ($event) => unref(disclosure).toggle()
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(` Info `);
														else return [createTextVNode(" Info ")];
													}),
													_: 1
												}, _parent, _scopeId));
												_push(`</div>`);
											} else return [
												createVNode("p", { style: {
													"margin": "0",
													"color": "#4b5563"
												} }, " Enter 6-digit code: "),
												createVNode(_component_InputOTP, {
													modelValue: unref(otpValue),
													"onUpdate:modelValue": ($event) => isRef(otpValue) ? otpValue.value = $event : null,
													length: 6
												}, null, 8, ["modelValue", "onUpdate:modelValue"]),
												createVNode("div", { style: {
													"display": "flex",
													"gap": "0.75rem"
												} }, [createVNode(_component_Button, {
													variant: "primary",
													onClick: ($event) => isModalOpen.value = true
												}, {
													default: withCtx(() => [createTextVNode(" Verify OTP ")]),
													_: 1
												}, 8, ["onClick"]), createVNode(_component_Button, {
													variant: "secondary",
													onClick: ($event) => unref(disclosure).toggle()
												}, {
													default: withCtx(() => [createTextVNode(" Info ")]),
													_: 1
												}, 8, ["onClick"])])
											];
										}),
										_: 1
									}, _parent, _scopeId));
								} else return [createVNode(_component_CardHeader, null, {
									default: withCtx(() => [createVNode("h3", { style: { "margin": "0" } }, " 2FA Security Module ")]),
									_: 1
								}), createVNode(_component_CardBody, { style: {
									"display": "flex",
									"flex-direction": "column",
									"gap": "1.25rem"
								} }, {
									default: withCtx(() => [
										createVNode("p", { style: {
											"margin": "0",
											"color": "#4b5563"
										} }, " Enter 6-digit code: "),
										createVNode(_component_InputOTP, {
											modelValue: unref(otpValue),
											"onUpdate:modelValue": ($event) => isRef(otpValue) ? otpValue.value = $event : null,
											length: 6
										}, null, 8, ["modelValue", "onUpdate:modelValue"]),
										createVNode("div", { style: {
											"display": "flex",
											"gap": "0.75rem"
										} }, [createVNode(_component_Button, {
											variant: "primary",
											onClick: ($event) => isModalOpen.value = true
										}, {
											default: withCtx(() => [createTextVNode(" Verify OTP ")]),
											_: 1
										}, 8, ["onClick"]), createVNode(_component_Button, {
											variant: "secondary",
											onClick: ($event) => unref(disclosure).toggle()
										}, {
											default: withCtx(() => [createTextVNode(" Info ")]),
											_: 1
										}, 8, ["onClick"])])
									]),
									_: 1
								})];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
						_push(ssrRenderComponent(_component_Dialog, {
							open: unref(isModalOpen),
							"onUpdate:open": ($event) => isRef(isModalOpen) ? isModalOpen.value = $event : null
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_DialogHeader, null, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(`<h3 style="${ssrRenderStyle({ "margin": "0" })}"${_scopeId}> Verification Status </h3>`);
											else return [createVNode("h3", { style: { "margin": "0" } }, " Verification Status ")];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_DialogBody, null, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(`<p${_scopeId}>Code entered: <strong${_scopeId}>${ssrInterpolate(unref(otpValue) || "None")}</strong></p>`);
											else return [createVNode("p", null, [createTextVNode("Code entered: "), createVNode("strong", null, toDisplayString(unref(otpValue) || "None"), 1)])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_DialogFooter, { style: {
										"display": "flex",
										"justify-content": "flex-end"
									} }, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_Button, {
												variant: "primary",
												onClick: ($event) => isModalOpen.value = false
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(` Close `);
													else return [createTextVNode(" Close ")];
												}),
												_: 1
											}, _parent, _scopeId));
											else return [createVNode(_component_Button, {
												variant: "primary",
												onClick: ($event) => isModalOpen.value = false
											}, {
												default: withCtx(() => [createTextVNode(" Close ")]),
												_: 1
											}, 8, ["onClick"])];
										}),
										_: 1
									}, _parent, _scopeId));
								} else return [
									createVNode(_component_DialogHeader, null, {
										default: withCtx(() => [createVNode("h3", { style: { "margin": "0" } }, " Verification Status ")]),
										_: 1
									}),
									createVNode(_component_DialogBody, null, {
										default: withCtx(() => [createVNode("p", null, [createTextVNode("Code entered: "), createVNode("strong", null, toDisplayString(unref(otpValue) || "None"), 1)])]),
										_: 1
									}),
									createVNode(_component_DialogFooter, { style: {
										"display": "flex",
										"justify-content": "flex-end"
									} }, {
										default: withCtx(() => [createVNode(_component_Button, {
											variant: "primary",
											onClick: ($event) => isModalOpen.value = false
										}, {
											default: withCtx(() => [createTextVNode(" Close ")]),
											_: 1
										}, 8, ["onClick"])]),
										_: 1
									})
								];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { style: {
						"padding": "3rem",
						"max-width": "800px",
						"margin": "0 auto",
						"font-family": "system-ui, sans-serif"
					} }, [
						createVNode("header", { style: { "margin-bottom": "2rem" } }, [createVNode("h1", { style: {
							"display": "flex",
							"align-items": "center",
							"gap": "0.75rem"
						} }, [createTextVNode(" Nuxt 4 + Evara UI "), createVNode(_component_Badge, { color: "primary" }, {
							default: withCtx(() => [createTextVNode(" SSR Powered ")]),
							_: 1
						})]), createVNode("p", { style: { "color": "#6b7280" } }, " Zero-config component auto-imports & SSR hydration with @bleckwolf25/nuxt. ")]),
						createVNode(_component_Alert, {
							variant: "success",
							"show-icon": "",
							style: { "margin-bottom": "1.5rem" }
						}, {
							default: withCtx(() => [createTextVNode(" Nuxt module auto-registered all Evara components, composables (useForm, useTheme, useDisclosure), and ThemeProvider! ")]),
							_: 1
						}),
						createVNode("div", { style: {
							"display": "grid",
							"grid-template-columns": "repeat(auto-fit, minmax(350px, 1fr))",
							"gap": "1.5rem"
						} }, [createVNode(_component_Card, { variant: "outline" }, {
							default: withCtx(() => [createVNode(_component_CardHeader, null, {
								default: withCtx(() => [createVNode("h3", { style: { "margin": "0" } }, " SSR Auto-Imported Form ")]),
								_: 1
							}), createVNode(_component_CardBody, null, {
								default: withCtx(() => [createVNode(_component_Form, { form: unref(form) }, {
									default: withCtx(() => [createVNode(_component_FormField, { name: "email" }, {
										default: withCtx(({ value, onChange, onBlur }) => [createVNode(_component_FormItem, null, {
											default: withCtx(() => [
												createVNode(_component_FormLabel, null, {
													default: withCtx(() => [createTextVNode("Email Address")]),
													_: 1
												}),
												createVNode(_component_FormControl, null, {
													default: withCtx(() => [createVNode(_component_Input, {
														type: "email",
														value,
														placeholder: "nuxt@evara.dev",
														onInput: (e) => onChange(e.target.value),
														onBlur
													}, null, 8, [
														"value",
														"onInput",
														"onBlur"
													])]),
													_: 2
												}, 1024),
												createVNode(_component_FormMessage)
											]),
											_: 2
										}, 1024)]),
										_: 1
									}), createVNode(_component_Button, {
										type: "submit",
										variant: "primary",
										style: { "margin-top": "1rem" }
									}, {
										default: withCtx(() => [createTextVNode(" Submit Nuxt Form ")]),
										_: 1
									})]),
									_: 1
								}, 8, ["form"])]),
								_: 1
							})]),
							_: 1
						}), createVNode(_component_Card, { variant: "outline" }, {
							default: withCtx(() => [createVNode(_component_CardHeader, null, {
								default: withCtx(() => [createVNode("h3", { style: { "margin": "0" } }, " 2FA Security Module ")]),
								_: 1
							}), createVNode(_component_CardBody, { style: {
								"display": "flex",
								"flex-direction": "column",
								"gap": "1.25rem"
							} }, {
								default: withCtx(() => [
									createVNode("p", { style: {
										"margin": "0",
										"color": "#4b5563"
									} }, " Enter 6-digit code: "),
									createVNode(_component_InputOTP, {
										modelValue: unref(otpValue),
										"onUpdate:modelValue": ($event) => isRef(otpValue) ? otpValue.value = $event : null,
										length: 6
									}, null, 8, ["modelValue", "onUpdate:modelValue"]),
									createVNode("div", { style: {
										"display": "flex",
										"gap": "0.75rem"
									} }, [createVNode(_component_Button, {
										variant: "primary",
										onClick: ($event) => isModalOpen.value = true
									}, {
										default: withCtx(() => [createTextVNode(" Verify OTP ")]),
										_: 1
									}, 8, ["onClick"]), createVNode(_component_Button, {
										variant: "secondary",
										onClick: ($event) => unref(disclosure).toggle()
									}, {
										default: withCtx(() => [createTextVNode(" Info ")]),
										_: 1
									}, 8, ["onClick"])])
								]),
								_: 1
							})]),
							_: 1
						})]),
						createVNode(_component_Dialog, {
							open: unref(isModalOpen),
							"onUpdate:open": ($event) => isRef(isModalOpen) ? isModalOpen.value = $event : null
						}, {
							default: withCtx(() => [
								createVNode(_component_DialogHeader, null, {
									default: withCtx(() => [createVNode("h3", { style: { "margin": "0" } }, " Verification Status ")]),
									_: 1
								}),
								createVNode(_component_DialogBody, null, {
									default: withCtx(() => [createVNode("p", null, [createTextVNode("Code entered: "), createVNode("strong", null, toDisplayString(unref(otpValue) || "None"), 1)])]),
									_: 1
								}),
								createVNode(_component_DialogFooter, { style: {
									"display": "flex",
									"justify-content": "flex-end"
								} }, {
									default: withCtx(() => [createVNode(_component_Button, {
										variant: "primary",
										onClick: ($event) => isModalOpen.value = false
									}, {
										default: withCtx(() => [createTextVNode(" Close ")]),
										_: 1
									}, 8, ["onClick"])]),
									_: 1
								})
							]),
							_: 1
						}, 8, ["open", "onUpdate:open"])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app.vue
var _sfc_setup$2 = app_vue_vue_type_script_setup_true_lang_default.setup;
app_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var app_default = app_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/components/nuxt-error-page.vue
var _sfc_main$1 = {
	__name: "nuxt-error-page",
	__ssrInlineRender: true,
	props: { error: Object },
	setup(__props) {
		const _error = __props.error;
		const status = Number(_error.statusCode || 500);
		const is404 = status === 404;
		const statusText = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
		const description = _error.message || _error.toString();
		const stack = void 0;
		const _Error404 = defineAsyncComponent(() => import('../build/error-404-d95n-Dp9.mjs'));
		const _Error = defineAsyncComponent(() => import('../build/error-500-lrpn5YQC.mjs'));
		const ErrorTemplate = is404 ? _Error404 : _Error;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({
				status: unref(status),
				statusText: unref(statusText),
				statusCode: unref(status),
				statusMessage: unref(statusText),
				description: unref(description),
				stack: unref(stack)
			}, _attrs), null, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fisland-renderer.mjs
var IslandRenderer = () => null;
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/components/nuxt-root.vue
var _sfc_main = {
	__name: "nuxt-root",
	__ssrInlineRender: true,
	setup(__props) {
		const nuxtApp = useNuxtApp();
		nuxtApp.deferHydration();
		nuxtApp.ssrContext.url;
		const SingleRenderer = false;
		provide(PageRouteSymbol, useRoute());
		nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
		const error = /* @__PURE__ */ useError();
		const abortRender = error.value && !nuxtApp.ssrContext.error;
		function invokeAppErrorHandler(err, target, info) {
			const errorHandler = nuxtApp.vueApp.config.errorHandler;
			if (errorHandler && !errorHandler.__nuxt_default) try {
				errorHandler(err, target, info);
			} catch (handlerError) {
				console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
			}
		}
		onErrorCaptured((err, target, info) => {
			nuxtApp.hooks.callHook("vue:error", err, target, info)?.catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
			{
				const p = nuxtApp.runWithContext(() => showError(err));
				onServerPrefetch(() => p);
				invokeAppErrorHandler(err, target, info);
				return false;
			}
		});
		const islandContext = nuxtApp.ssrContext.islandContext;
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderSuspense(_push, {
				default: () => {
					if (unref(abortRender)) _push(`<div></div>`);
					else if (unref(error)) _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
					else if (unref(islandContext)) _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
					else if (unref(SingleRenderer)) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
					else _push(ssrRenderComponent(unref(app_default), null, null, _parent));
				},
				_: 1
			});
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/components/nuxt-root.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
//#region ../../node_modules/.pnpm/nuxt@4.5.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_376fd7f26b0f3eb11f4c5f60826b3629/node_modules/nuxt/dist/app/entry.js
var entry$1 = async function createNuxtAppServer(ssrContext) {
	const vueApp = createApp(_sfc_main);
	const nuxt = createNuxtApp({
		vueApp,
		ssrContext
	});
	try {
		await applyPlugins(nuxt, virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default);
		await nuxt.hooks.callHook("app:created", vueApp);
	} catch (error) {
		await nuxt.hooks.callHook("app:error", error);
		nuxt.payload.error ||= createError$1(error);
	}
	if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) throw new Error("skipping render");
	return vueApp;
};
var entry_default = ((ssrContext) => entry$1(ssrContext));

const entry = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: entry_default
}, Symbol.toStringTag, { value: 'Module' }));

export { useRouter as a, useRuntimeConfig as b, useNuxtApp as c, nuxtLinkDefaults as d, encodeRoutePath as e, entry as f, navigateTo as n, resolveRouteObject as r, useHead$1 as u };
//# sourceMappingURL=entry.mjs.map
