/****************************
 * Global server configuration. Consists of properties and some methods to change them.
 *
 * @author GlaDos
 * @since 28.10.16
 ****************************/

"use strict";

/***
 * Imports.
 *
 * @since 28.10.16
 */
const constants = require("./constants");

/***
 * Constants.
 *
 * @since 28.10.16
 */
const
	PRODUCTION_PORT = constants.PORT,
	TEST_PORT       = constants.TEST_PORT,
	DEFAULT_PORT    = PRODUCTION_PORT;

/**
 * Global configuration class.
 *
 * @type {object}
 * @since 28.10.16
 */
const GlobalConfig = class {

	/**
	 * The only constructor with default initial parameters.
	 * Set properties by set methods.
	 *
	 * @since 28.10.16
	 */
	constructor () {
		this.port = DEFAULT_PORT;
	}

	/**
	 * Returns the server port.
	 *
	 * @return {int} listening port
	 * @since 28.10.16
	 */
	getPort () {
		return this.port;
	}

	/**
	 * Sets the server port.
	 *
	 * @param {int} port listening port
	 * @return {null} nothing
	 * @since 28.10.16
	 */
	setPort (port) {
		this.port = port;
	}
};

/**
 * The global configuration itself.
 * The only (this) instance is available for working with.
 *
 * @since 28.10.16
 */
const globalConfig = new GlobalConfig();

/***
 * Exports.
 *
 * @since 28.10.16
 */
exports = module.exports = {
	config          : globalConfig,
	PRODUCTION_PORT : PRODUCTION_PORT,
	TEST_PORT       : TEST_PORT,
	DEFAULT_PORT    : DEFAULT_PORT
};