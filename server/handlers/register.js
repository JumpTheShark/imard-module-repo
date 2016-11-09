/****************************
 * Request 'register' [POST].
 * Using folders with cloned and built repository, saves a module and registers it in the database.
 *
 * @author GlaDos
 * @since 06.11.16
 ****************************/

"use strict";

/***
 * Imports.
 *
 * @since 06.11.16
 */
const
	constants = require("../constants"),
	utils     = require("../utils");

/***
 * Constants.
 *
 * @since 06.11.16
 */
const
	TEXT_PLAIN             = constants.TEXT_PLAIN,
	STATUS_CODE_OK         = constants.STATUS_CODE_OK,
	REGISTER_COMPLETED_STR = "module has been registered.",
	PICKING_ERROR_STR      = "error while picking module file into the storage",
	GET_JSON_ERROR_STR     = "error while getting cloned module JSON",
	PUT_DB_ERROR_STR       = "error while inserting built module file to the data base";

/**
 * The request itself. Saves useful module data and registers module in the database.
 *
 * @param {function(object)} inject response inject function to put request reply in
 * @param {string} _ request body. Not used
 * @return {void} nothing
 * @since 06.11.16
 */
const register = (inject, _) => {
	utils.pickModuleData()
		.then(
			utils.pickModuleJSON,
			() => inject(PICKING_ERROR_STR))
		.then(
			(moduleJSON) => utils.addModuleToDB(moduleJSON),
			() => inject(GET_JSON_ERROR_STR))
		.then(
			() => inject(STATUS_CODE_OK, TEXT_PLAIN, REGISTER_COMPLETED_STR),
			() => inject(PUT_DB_ERROR_STR));
};

/**
 * Exports.
 *
 * @since 06.11.16
 */
exports = module.exports = { register : register };