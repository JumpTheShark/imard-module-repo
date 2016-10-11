"use strict";

const querystring = require("querystring"),
      git         = require("nodegit");

function clone(response, params) {
	let link = querystring.parse(params).link,
	    isEligible = false;
	
	git.Clone(link, "test_repo").then(
		repository => {
			isEligible = true;
			console.log("Repository has been cloned.");
		},
		
		error => console.log("Repository has not been cloned. " + error + ".")
	);
	
	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.end(isEligible + "");
}

exports = module.exports = {
	clone : clone
}