"use strict";

const start     = require("../../server/server").start,
      onRequest = require("../../server/server").onRequest,
      expect    = require("chai").expect;

describe("checking server processes everything correctly", () => {
	it("start function exists", () => {
		expect(start).not.to.be.an("undefined");
	});
	
	it("onRequest function exists", () => {
		expect(onRequest).not.to.be.an("undefined");
	});
});