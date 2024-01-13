export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","CNAME","favicon.png","images/adam-unified.svg","images/adam.svg","images/mayim.svg","images/osi.png","images/sanic-framework-logo-circle-32x32.png","images/sanic.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		entry: {"file":"_app/immutable/start-6e28ae31.js","imports":["_app/immutable/start-6e28ae31.js","_app/immutable/chunks/index-5bfc61a1.js","_app/immutable/chunks/singletons-133885c5.js","_app/immutable/chunks/preload-helper-41c905a7.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
