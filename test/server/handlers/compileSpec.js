"use strict";

const request         = require("../../../server/handlers/compile"),
      requestHandlers = require("../../../server/handlers/requestHandlers"),
      expect          = require("chai").expect;

describe("Request compile", () => {
	it("exists", () => {
		expect(request.compile).not.to.be.an("undefined");
	});
});