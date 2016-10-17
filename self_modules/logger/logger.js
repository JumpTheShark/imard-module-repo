/****************************
 * An instrument for managing console logs.
 *
 * @author GlaDos
 * @since < 10.16.16
 ****************************/

"use strict";

/* eslint-disable no-console */

/**
 * Logger initial configuration. Can be changed through the logger after initializing the last one.
 *
 * @type {{enableLoggingIntoConsole: boolean}}
 * @since < 10.16.16
 */
const configuration = { enableLoggingIntoConsole: false };

/**
 * The logger itself. Contains its configuration and the log() function.
 *
 * @type {object}
 * @since < 10.16.16
 */
const logger = {
	configuration: configuration,

	log: (message) => {
		if (configuration.enableLoggingIntoConsole)
			console.log(message);
	}
};

/**
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = logger;