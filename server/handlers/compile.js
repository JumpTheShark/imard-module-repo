const consoleExec = require("../console");

function compile(response, postData) {
	const isCompiled = consoleExec.run(consoleExec.COMMAND_COMPILE, postData);
	
	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.end(isCompiled + "");
}

exports = module.exports = {
	compile : compile
}