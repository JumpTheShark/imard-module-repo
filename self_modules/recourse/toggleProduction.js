/****************************
 * An instrument for switching project to the production version (in case of using recourse).
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
const recourse = require("./recourse");

/**
 * Toggles in production mode all in server and logger folders
 *
 * @since < 10.16.16
 */
recourse.toggleProduction("server");
recourse.toggleProduction("self_modules/logger");