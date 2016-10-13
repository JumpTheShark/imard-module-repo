function compile(response, postData) {
	response.writeHead(400, { "Content-Type" : "text/plain" });
	response.end("not supported yet");
}

exports = module.exports = {
	compile : compile
}