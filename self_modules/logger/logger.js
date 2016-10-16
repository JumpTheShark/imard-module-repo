/****************************
 * An instrument for managing console logs.
 *
 * @author GlaDos
 * @since < 10.16.16
 ****************************/

"use strict";

/**
 * Logger initial configuration. Can be changed through the logger after initializing the last one.
 *
 * @type {{enable_logging_into_console: boolean}}
 * @since < 10.16.16
 */
const configuration = {
	enable_logging_into_console : false
};

/**
 * The logger itself. Contains its configuration and the log() function.
 *
 * @type {{configuration: {enable_logging_into_console: boolean}, log: logger.log}}
 * @since < 10.16.16
 */
const logger = {
	configuration : configuration,
	
	log : function (message) {
		if (configuration.enable_logging_into_console)
			console.log(message);
	}
}

/**
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = logger;