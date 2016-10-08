"use strict";

const querystring = require("querystring");
const consoleExec = require("./console");
const request     = require("request");

function start(response) {
	const body = '<html>' +
	             '<head>' +
	             '<meta http-equiv="Content-Type" content="text/html; ' +
		     'charset=UTF-8" />' +
		     '</head>' +
		     '<body>' +
		     '<form action="/clone-redirect" method="post">' +
		     '<textarea name="text" rows="20" cols="60"></textarea>' +
		     '<input type="submit" value="Clone repo" />' +
		     '</form>' +
		     '</body>' +
		     '</html>';
	
	response.writeHead(200, {"Content-Type" : "text/html"});
	response.end(body);
}

function cloneRedirect(response, postData) {
	request({
		uri: "http://localhost:8888/clone",
		qs: {link : querystring.parse(postData).text},
		method: "PUT",
		timeout: 10000
	}, function(err, resp, body) {		
		response.writeHead(resp.statusCode, resp.headers);
		response.end(resp.body);
	});
}

function clone(response, params) {
	let link = querystring.parse(params).link;
	
	const isEligible = consoleExec.run(consoleExec.COMMAND_CLONE, link);
	
	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.end(isEligible + "");
}

function compile(response, postData) {
	const isCompiled = consoleExec.run(consoleExec.COMMAND_COMPILE, postData);
	
	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.end(isCompiled + "");
}

exports = module.exports = {
	start         : start,
	cloneRedirect : cloneRedirect,
	clone         : clone,
	compile       : compile
};