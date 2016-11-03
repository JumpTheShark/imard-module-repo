/****************************
 * The launcher point. Fills the handler for handling requests and starts the server.
 *
 * @author GlaDos
 * @since < 10.16.16
 ****************************/

"use strict";

/***
 * Imports.
 *
 * @since < 10.16.16
 */
const
	server          = require("./server"),
	router          = require("./router"),
	requestHandlers = require("./handlers/requestHandlers");

/**
 * Handle object for handling requests. Contains a list of request types,
 * and for each type a list of binded request handlers.
 *
 * @type {{get: {}, post: {}, put: {}}}
 * @since < 10.16.16
 */
const handle = {
	get:  {},
	post: {},
	put:  {}
};

/**
 * Request handlers' initialization in the handle object.
 *
 * @since < 10.16.16
 */
handle.get ["/"]               = requestHandlers.start;
handle.get ["/start"]          = requestHandlers.start;
handle.post["/clone-redirect"] = requestHandlers.cloneRedirect;
handle.put ["/clone"]          = requestHandlers.clone;
handle.post["/compile"]        = requestHandlers.compile;

/**
 * Returns server with default route function and handlers.
 *
 * @return {object} server
 * @since 21.16.16
 */
const getDefaultServer = () => server.serverGen(router.route, handle);

/**
 * Starts a server.
 *
 * @since < 10.16.16
 */
server.start(router.route, handle);

/***
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = {
	getDefaultServer : getDefaultServer,
	handle           : handle /*$test$*/
};