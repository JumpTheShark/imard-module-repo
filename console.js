//////////
// Plug //
//////////

const COMMAND_CLONE   = "git clone";
const COMMAND_COMPILE = "compile";

exports.run = function(command, postData) {
	switch (command) {
		case COMMAND_CLONE:
			return false;
		case COMMAND_COMPILE:
			return postData;
	}
};

exports.COMMAND_CLONE   = COMMAND_CLONE;
exports.COMMAND_COMPILE = COMMAND_COMPILE;