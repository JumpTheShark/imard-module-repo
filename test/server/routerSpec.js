"use strict";

const
	http      = require("http"),
	server    = require("../../server/server"),
	router    = require("../../server/router"),
	constants = require("../../server/constants"),
	handle    = require("../../server/index").handle,
	expect    = require("chai").expect;

const
	route                 = router.route,
	injectGen             = server.injectResponseGenerator,
	STATUS_CODE_NOT_FOUND = constants.STATUS_CODE_NOT_FOUND,
	STATUS_CODE_OK        = constants.STATUS_CODE_OK;

describe("Router", () => {
	describe("route function", () => {
		it("exists", () => {
			expect(route).not.to.be.an("undefined");
		});

		const
			response = new http.ServerResponse(() => {}, () => {}),
			inject = injectGen(response);

		it(`returns ${STATUS_CODE_NOT_FOUND} whether request method is invalid`, () => {
			route(handle, "invalid", "/", inject, "", "");
			expect(response.statusCode).to.equal(STATUS_CODE_NOT_FOUND);
		});

		it(`returns ${STATUS_CODE_NOT_FOUND} whether request method is undefined`, () => {
			route(handle, undefined, "/", inject, "", "");
			expect(response.statusCode).to.equal(STATUS_CODE_NOT_FOUND);
		});

		it(`returns ${STATUS_CODE_NOT_FOUND} whether request url is unknown`, () => {
			route(handle, "get", "blablabla", inject, "", "");
			expect(response.statusCode).to.equal(STATUS_CODE_NOT_FOUND);
		});

		it(`returns ${STATUS_CODE_OK} on the main page`, () => {
			route(handle, "get", "/", inject, "", "");
			expect(response.statusCode).to.equal(STATUS_CODE_OK);
		});
	});
});