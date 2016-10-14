"use strict";

const configuration = {
	enable_logging_into_console : false
};

const logger = {
	configuration : configuration,
	
	log : function (message) {
		if (configuration.enable_logging_into_console)
			console.log(message);
	}
}

exports = module.exports = logger;