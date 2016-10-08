const server          = require("./server");
const router          = require("./router");
const requestHandlers = require("./requestHandlers");

const handle = {
	get:  {},
	post: {},
	put:  {}
};

handle["get"] ["/"]               = requestHandlers.start;
handle["get"] ["/start"]          = requestHandlers.start;
handle["post"]["/clone-redirect"] = requestHandlers.cloneRedirect;
handle["put"] ["/clone"]          = requestHandlers.clone;
handle["post"]["/compile"]        = requestHandlers.compile;

server.start(router.route, handle);