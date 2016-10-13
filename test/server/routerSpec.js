"use strict";

const route  = require("../../server/router").route,
      expect = require("chai").expect;

describe("checking router routes everything correctly", () => {
	it("route function exists", () => {
		expect(route).not.to.be.an("undefined");
	});
});