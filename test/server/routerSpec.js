"use strict";

const
	http            = require("http"),
	router          = require("../../server/router"),
	requestHandlers = require("../../server/handlers/requestHandlers"),
	handle          = require("../../server/index").handle,
	expect          = require("chai").expect;

const
	route                 = router.route,
	STATUS_CODE_NOT_FOUND = 404,
	STATUS_CODE_OK        = requestHandlers.STATUS_CODE_OK;

describe("Router", () => {
	it("'not found' response code is 404", () => {
		expect(router.STATUS_CODE_NOT_FOUND).to.equal(STATUS_CODE_NOT_FOUND);
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