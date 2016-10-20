"use strict";

const
	request   = require("../../../server/handlers/start"),
	expect    = require("chai").expect,
	http      = require("http"),
	constants = require("../../../server/constants");

const
	STATUS_CODE_OK          = constants.STATUS_CODE_OK,
	CONTENT_TYPE_TEXT_PLAIN = constants.CONTENT_TYPE_TEXT_PLAIN,
	start                   = request.start;

describe("Request start", () => {
	it("exists", () => {
		expect(request.start).not.to.be.an("undefined");
	});

	it("html body exists and is a string", () => {
		expect(request.BODY).to.be.a("string");
	});

	describe("response", () => {
		it("returns code " + STATUS_CODE_OK, () => {
			const reply = new http.ServerResponse(() => {}, () => {});

			start(reply);

			expect(reply.statusCode).to.equal(STATUS_CODE_OK);
		});

		it("returns text", () => {
			const reply = new http.ServerResponse(() => {}, () => {});

			start(reply);

			expect(reply.getHeader("content-type")).to.equal(CONTENT_TYPE_TEXT_PLAIN);
		});
	});
});