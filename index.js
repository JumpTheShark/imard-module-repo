const server          = require("./server");
const router          = require("./router");
const requestHandlers = require("./requestHandlers");

const handle = {};
handle["/"]        = requestHandlers.start;
handle["/start"]   = requestHandlers.start;
handle["/upload"]  = requestHandlers.upload;
handle["/clone"]   = requestHandlers.clone;
handle["/compile"] = requestHandlers.compile;

server.start(router.route, handle);