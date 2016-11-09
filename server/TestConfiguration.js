/****************************
 * Test configuration. Class instances are kept here and used in global configuration.
 *
 * @author GlaDos
 * @since 09.11.16
 ****************************/

"use strict";

/***
 * Imports.
 *
 * @since 09.11.16
 */
const constants = require("./constants");

/***
 * Constants.
 *
 * @since 09.11.16
 */
const
	REAL_DB_ADDRESS = constants.DB_ADDRESS,
	FAKE_DB_ADDRESS = "blablabla";

/**
 * Test configuration class.
 * Accessed only within the test configurations' definitions (in this file).
 *
 * @type {object}
 * @since 09.11.16
 */
const TestConfig = class {

	/**
	 * The only constructor with all class parameters.
	 *
	 * @param {string} databaseAddress the http address to the database
	 * @since 09.11.16
	 */
	constructor (databaseAddress) {
		this.databaseAddress = databaseAddress;
	}

	/**
	 * Returns the database http address.
	 *
	 * @return {string} database address
	 * @since 09.11.16
	 */
	getDBAddress () {
		return this.dataBaseAddress;
	}
};

/**
 * All test configurations.
 *
 * @type {TestConfig[]}
 * @since 09.11.16
 */
const configs = [
	new TestConfig(REAL_DB_ADDRESS),
	new TestConfig(FAKE_DB_ADDRESS)
];

/***
 * Exports.
 *
 * @since 09.11.16
 */
exports = module.exports = { configs : configs };