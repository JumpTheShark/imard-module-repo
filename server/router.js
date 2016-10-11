function route(handle, method, pathname, response, params, postData) {
	const displayPath = pathname + " [" + method + "]";
	method = method.toLowerCase();
	
	if (handle[method] != undefined && typeof handle[method][pathname] === 'function') {
		console.log("Process a request for " + displayPath + ".");
		
		switch (method) {
			case "get":
				handle[method][pathname](response);
				break;
			case "post":
				handle[method][pathname](response, postData);
				break;
			case "put":
				handle[method][pathname](response, params);
				break;
			default:
				console.log("Unknown method '" + method + "'.");
		}
	} else {
		console.log("No request handler found for " + displayPath + ".");
		response.writeHead(200, {"Content-Type" : "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

exports = module.exports = {
	route : route
};