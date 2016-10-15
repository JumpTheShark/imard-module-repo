"use strict";

const request         = require("../../../server/handlers/compile"),
      expect          = require("chai").expect;

describe("Request compile", () => {
	it("exists", () => {
		expect(request.compile).not.to.be.an("undefined");
	});
});