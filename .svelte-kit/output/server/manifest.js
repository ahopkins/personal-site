export const manifest = {
	appDir: "_app",
	assets: new Set([".nojekyll","CNAME","favicon.png","images/adam-unified.svg","images/adam.svg","images/mayim.svg","images/osi.png","images/sanic-framework-logo-circle-32x32.png","images/sanic.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		entry: {"file":"_app/immutable/start-c031a748.js","imports":["_app/immutable/start-c031a748.js","_app/immutable/chunks/preload-helper-aa6bc0ce.js","_app/immutable/chunks/index-93917c68.js","_app/immutable/chunks/singletons-6dd77aa4.js"],"stylesheets":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js')
		],
		routes: [
			{
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "[slug]",
				pattern: /^\/([^/]+?)\/?$/,
				names: ["slug"],
				types: [null],
				page: { layouts: [0,2], errors: [1,,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
