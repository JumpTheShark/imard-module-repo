/****************************
 * Server core. Creates and activates a request listener with all needed instruments.
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
	InnerResponse = require("./InnerResponse"),
	express       = require("express"),
	url           = require("url"),
	log           = require("../self_modules/logger/logger").log,
	constants     = require("./constants");

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const
	PORT                  = constants.PORT,
	ENCODING              =  "utf8",
	DATA_LISTENER_STR     = "data",
	END_LISTENER_STR      = "end";

/**
 * Inject response generator. Generates an inject response function.
 *
 * @param {object} response server response to bind
 * @return {function(string, string, string)} inject response function
 * @since 21.16.16
 */
const injectResponseGenerator = (response) => {

	/**
	 * Response injector. Takes data to put it to the server response.
	 *
	 * @param {string} statusCode response status code
	 * @param {string} contentType response content type
	 * @param {string} body response body (null if is absent)
	 * @return {null} nothing
	 * @since 21.16.16
	 */
	const injectResponse = (statusCode, contentType, body) => {
		new InnerResponse(statusCode, contentType, body).inject(response);
	};

	return injectResponse;
};

/**
 * Server generator.
 * Generates server with a function (request, response) by the given route function and request handlers.
 *
 * @param {function} route router function to parse the url
 * @param {object} handle object with request handlers
 * @return {function(object, object)} server function
 * @since 21.16.16
 */
const serverGen = (route, handle) => {
	const app = express();

	/**
	 * Handles the given request and puts the reply to the given response.
	 *
	 * @param {object} request server request
	 * @param {object} response server response
	 * @return {null} nothing
	 * @since < 10.16.16
	 */
	const processor = (request, response) => {
		let postData = "";

		request.setEncoding(ENCODING);

		const
			method   = request.method,
			parsed   = url.parse(request.url),
			pathname = parsed.pathname,
			params   = parsed.query,
			inject   = injectResponseGenerator(response);

		request.addListener(DATA_LISTENER_STR, (postDataChunk) => {
			postData += postDataChunk;
			log(`Received POST data chunk '${postDataChunk}'.`);
		});

		request.addListener(END_LISTENER_STR, () => {
			route(handle, method, pathname, inject, params, postData);
		});
	};

	for (const handler in handle.get)
		app.get(handler, processor);

	for (const handler in handle.post)
		app.post(handler, processor);

	for (const handler in handle.put)
		app.put(handler, processor);

	app.get("*", processor);

	return app;
};

/**
 * Starts a server by the given route function and collection of request handlers.
 *
 * @param {function} route router function to parse the url
 * @param {object} handle object with request handlers
 * @return {null} nothing
 * @since < 10.16.16
 */
const start = (route, handle) => {
	serverGen(route, handle).listen(PORT);
	log(`Server has started on the port ${PORT}.`);
};

/***
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = {
	injectResponseGenerator : injectResponseGenerator,
	start                   : start,
	serverGen               : serverGen,
   	PORT                    : PORT /*$test$*/
};