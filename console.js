//////////
// Plug //
//////////

const COMMAND_CLONE   = "git clone";
const COMMAND_COMPILE = "compile";

function run(command, postData) {
	switch (command) {
		case COMMAND_CLONE:
			return false;
		case COMMAND_COMPILE:
			return postData;
	}
};

exports = module.exports = {
	run: run,
	COMMAND_CLONE: COMMAND_CLONE,
	COMMAND_COMPILE: COMMAND_COMPILE
};