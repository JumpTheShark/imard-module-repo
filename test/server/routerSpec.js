"use strict";

const http           = require("http"),
      route          = require("../../server/router").route,
      handle         = require("../../server/index").handle,
      CODE_NOT_FOUND = require("../../server/router").CODE_NOT_FOUND,
      expect         = require("chai").expect;

describe("Router", () => {
	it("'not found' response code is 404", () => {
		expect(CODE_NOT_FOUND).to.equal(404);
	});
	
	describe("route function", () => {
		it("exists", () => {
			expect(route).not.to.be.an("undefined");
		});
		
		it("throws 404 whether request method is invalid", () => {
			const response = new http.ServerResponse(() => {}, () => {});
			route(handle, "invalid", "/", response, "", "");
			expect(response.statusCode).to.equal(CODE_NOT_FOUND);
		});
		
		it("throws 404 whether request method is undefined", () => {
			const response = new http.ServerResponse(() => {}, () => {});
			route(handle, undefined, "/", response, "", "");
			expect(response.statusCode).to.equal(CODE_NOT_FOUND);
		});
	});
});