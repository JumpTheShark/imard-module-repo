const querystring = require("querystring");
const consoleExec = require('./console');

function start(response, postData) {
	console.log("Request handler 'start' was called.");
	
	const body = '<html>' +
	             '<head>' +
	             '<meta http-equiv="Content-Type" content="text/html; ' +
		     'charset=UTF-8" />' +
		     '</head>' +
		     '<body>' +
		     '<form action="/upload" method="post">' +
		     '<textarea name="text" rows="20" cols="60"></textarea>' +
		     '<input type="submit" value="Submit text" />' +
		     '</form>' +
		     '</body>' +
		     '</html>';
	
	response.writeHead(200, {"Content-Type" : "text/html"});
	response.write(body);
	response.end();
}

function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
	
	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.write("You have sent the text: " + querystring.parse(postData).text);
	response.end();
}

function clone(response, postData) {
	console.log("Request handler 'clone' was called.");
	
	const isEligible = consoleExec.run(consoleExec.COMMAND_CLONE, querystring.parse(postData).text);
	
	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.write(isEligible + "");
	response.end();
}

function compile(response, postData) {
	console.log("Request handler 'compile' was called.");

	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.write(consoleExec.run(consoleExec.COMMAND_COMPILE, postData));
	response.end();
}

exports = module.exports = {
	start: start,
	upload: upload,
	clone: clone,
	compile : compile
};