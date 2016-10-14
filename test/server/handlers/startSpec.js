"use strict";

const request         = require("../../../server/handlers/start"),
      requestHandlers = require("../../../server/handlers/requestHandlers"),
      expect          = require("chai").expect;

describe("Request start", () => {
	it("exists", () => {
		expect(request.start).not.to.be.an("undefined");
	});
});