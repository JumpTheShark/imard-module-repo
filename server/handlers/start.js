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

exports = module.exports = {
	start : start
}