/****************************
 * An instrument for switching project to the production version (in case of using recourse).
 *
 * @author GlaDos
 * @since < 10.16.16
 ****************************/

"use strict";

const recourse = require("./recourse");

recourse.toggleProduction("server");
recourse.toggleProduction("self_modules/logger");