/****************************
 * An instrument for switching project to the test version (in case of using recourse).
 *
 * @author GlaDos
 * @since < 10.16.16
 ****************************/

"use strict";

const recourse = require("./recourse");

recourse.toggleTest("server");
recourse.toggleTest("self_modules/logger");