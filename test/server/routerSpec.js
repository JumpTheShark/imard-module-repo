"use strict";

const http                  = require("http"),
      route                 = require("../../server/router").route,
      handle                = require("../../server/index").handle,
      STATUS_CODE_OK        = require("../../server/handlers/requestHandlers").STATUS_CODE_OK,
	  STATUS_CODE_NOT_FOUND = require("../../server/router").STATUS_CODE_NOT_FOUND,
      expect                = require("chai").expect;

describe("Router", () => {
	it("'not found' response code is 404", () => {
		expect(STATUS_CODE_NOT_FOUND).to.equal(404);
	});
	
	describe("route function", () => {
		it("exists", () => {
			expect(route).not.to.be.an("undefined");
		});
		
		it("returns " + STATUS_CODE_NOT_FOUND + " whether request method is invalid", () => {
			const response = new http.ServerResponse(() => {}, () => {});
			route(handle, "invalid", "/", response, "", "");
			expect(response.statusCode).to.equal(STATUS_CODE_NOT_FOUND);
		});
		
		it("returns " + STATUS_CODE_NOT_FOUND + " whether request method is undefined", () => {
			const response = new http.ServerResponse(() => {}, () => {});
			route(handle, undefined, "/", response, "", "");
			expect(response.statusCode).to.equal(STATUS_CODE_NOT_FOUND);
		});

		it("returns " + STATUS_CODE_NOT_FOUND + " whether request url is unknown", () => {
			const response = new http.ServerResponse(() => {}, () => {});
			route(handle, "get", "blablabla", response, "", "");
			expect(response.statusCode).to.equal(STATUS_CODE_NOT_FOUND);
		});

		it("returns " + STATUS_CODE_OK + " on the main page", () => {
			const response = new http.ServerResponse(() => {}, () => {});
			route(handle, "get", "/", response, "", "");
			expect(response.statusCode).to.equal(STATUS_CODE_NOT_FOUND);
		});
	});
});