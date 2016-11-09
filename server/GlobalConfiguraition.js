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
const
	constants   = require("./constants"),
	testConfigs = require("./TestConfiguration").configs;

/***
 * Constants.
 *
 * @since 28.10.16
 */
const
	MODE_PRODUCTION             = 0,
	MODE_TEST                   = 1,
	MODE_DEFAULT                = MODE_PRODUCTION,

	TEST_MODE_NORMAL            = 0,
	TEST_MODE_INVALID_DB        = 1,
	TEST_MODE_DEFAULT           = TEST_MODE_NORMAL,

	PORT_PRODUCTION             = constants.PORT,
	PORT_TEST                   = constants.TEST_PORT,
	PORT_DEFAULT                = PORT_PRODUCTION,
	CLONED_REPO_PATH_PRODUCTION = constants.CLONED_REPO_FOLDER_NAME,
	CLONED_REPO_PATH_TEST       = constants.TEST_CLONED_REPO_FOLDER_NAME,
	CLONED_REPO_PATH_DEFAULT    = CLONED_REPO_PATH_PRODUCTION,
	BUILT_REPO_PATH_PRODUCTION  = constants.BUILT_REPO_FOLDER_NAME,
	BUILT_REPO_PATH_TEST        = constants.TEST_BUILT_REPO_FOLDER_NAME,
	BUILT_REPO_PATH_DEFAULT     = BUILT_REPO_PATH_PRODUCTION;

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
		this.port           = PORT_DEFAULT;
		this.clonedRepoPath = CLONED_REPO_PATH_DEFAULT;
		this.builtRepoPath = BUILT_REPO_PATH_DEFAULT;

		this.mode = MODE_DEFAULT;
		this.testMode = testConfigs[TEST_MODE_DEFAULT];
	}

	/**
	 * Sets the configuration mode.
	 * Mode enumeration is included in the exports.
	 *
	 * @param {int} mode configuration mode
	 * @return {void} nothing
	 * @since 03.11.16
	 */
	setMode (mode) {
		switch (mode) {
		case MODE_PRODUCTION:
			this.port           = PORT_PRODUCTION;
			this.clonedRepoPath = CLONED_REPO_PATH_PRODUCTION;
			this.builtRepoPath  = BUILT_REPO_PATH_PRODUCTION;

			break;
		case MODE_TEST:
			this.port           = PORT_TEST;
			this.clonedRepoPath = CLONED_REPO_PATH_TEST;
			this.builtRepoPath  = BUILT_REPO_PATH_TEST;

			break;
		default:
			throw new Error(`invalid configuration mode: ${mode} (expected ${MODE_PRODUCTION} or ${MODE_TEST})`);
		}

		this.mode = mode;
	}

	/**
	 * Sets the configuration testing mode.
	 * By testing mode determines testing configuration.
	 * Testing mode enumeration is included in the exports.
	 *
	 * @param {int} testMode configuration testing mode
	 * @return {void} nothing
	 * @since 09.11.16
	 */
	setTestMode (testMode) {
		if (!testConfigs[testMode])
			throw new Error(`invalid configuration test mode: ${testMode}`);

		this.testMode = testConfigs[testMode];
	}

	/**
	 * Returns the configuration mode.
	 *
	 * @return {int} configuration mode
	 * @since 07.11.16
	 */
	getMode () {
		return this.mode;
	}

	/**
	 * Returns the database http address.
	 *
	 * @return {string} database address
	 * @since 09.11.16
	 */
	getDBAddress () {
		return this.mode === MODE_TEST ? this.testMode.getDBAddress() : constants.DB_ADDRESS;
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
	 * Returns the path to the cloned repository folder (including the folder name).
	 *
	 * @return {string} path to the cloned repository folder
	 * @since 03.11.16
	 */
	getClonedRepoPath () {
		return this.clonedRepoPath;
	}

	/**
	 * Returns the path to the built repository folder (including the folder name).
	 *
	 * @return {string} path to the built repository folder
	 * @since 06.11.16
	 */
	getBuiltRepoPath () {
		return this.builtRepoPath;
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
	config               : globalConfig,

	MODE_PRODUCTION      : MODE_PRODUCTION,
	MODE_TEST            : MODE_TEST,
	MODE_DEFAULT         : MODE_DEFAULT,

	TEST_MODE_NORMAL     : TEST_MODE_NORMAL,
	TEST_MODE_INVALID_DB : TEST_MODE_INVALID_DB,
	TEST_MODE_DEFAULT    : TEST_MODE_DEFAULT
};