/****************************
 * Peripheral response for unpacking in server code part and packing into the real http response.
 *
 * @author GlaDos
 * @since 20.10.16
 ****************************/

"use strict";

/**
 * Class that implements the described (in the file header) functionality.
 *
 * @type {object}
 * @since 20.10.16
 */
const InnerResponse = class {

	/**
	 * Creates an inner response by the given status code, content type and body.
	 *
	 * @param {int} statusCode status code (can not be null)
	 * @param {string} contentType content type (can not be null)
	 * @param {string} body (can be null)
	 * @since 20.10.16
	 */
	constructor (statusCode, contentType, body) {
		this.statusCode  = statusCode;
		this.contentType = contentType;
		this.body        = body;
	}

	/**
	 * Pastes stored data in the given server response.
	 *
	 * @param {object} response server response to inject data to
	 * @return {null} nothing
	 * @since 20.10.16
	 */
	inject (response) {
		response.writeHead(this.statusCode, this.contentType);

		if (this.body !== null)
			response.write(this.body);

		response.end();
	}
};

/***
 * Exports.
 *
 * @since 20.10.16
 */
exports = module.exports = InnerResponse;