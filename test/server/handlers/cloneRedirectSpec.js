"use strict";

const request         = require("../../../server/handlers/cloneRedirect"),
      requestHandlers = require("../../../server/handlers/requestHandlers"),
      expect          = require("chai").expect;

describe("Request clone-redirect", () => {
	it("exists", () => {
		expect(request.cloneRedirect).not.to.be.an("undefined");
	});
});