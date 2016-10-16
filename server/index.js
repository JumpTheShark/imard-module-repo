/****************************
 * The launcher point. Fills the handler for handling requests andd starts the server.
 *
 * @author GlaDos
 * @since < 10.16.16
 ****************************/

"use strict";

const server          = require("./server"),
      router          = require("./router"),
      requestHandlers = require("./handlers/requestHandlers");

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

exports = module.exports = {
             	handle : handle //$test$
};