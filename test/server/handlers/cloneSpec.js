"use strict";

const request         = require("../../../server/handlers/clone"),
      requestHandlers = require("../../../server/handlers/requestHandlers"),
      expect          = require("chai").expect;

describe("Request clone", () => {
	it("exists", () => {
		expect(request.clone).not.to.be.an("undefined");
	});
});