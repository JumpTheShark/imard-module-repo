"use strict";

const
	http      = require("http"),
	router    = require("../../server/router"),
	constants = require("../../server/constants"),
	handle    = require("../../server/index").handle,
	expect    = require("chai").expect;

const
	route                 = router.route,
	STATUS_CODE_NOT_FOUND = constants.STATUS_CODE_NOT_FOUND,
	STATUS_CODE_OK        = constants.STATUS_CODE_OK;

describe("Router", () => {
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
			expect(response.statusCode).to.equal(STATUS_CODE_OK);
		});
	});
});