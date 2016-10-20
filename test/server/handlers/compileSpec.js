"use strict";

const
	request   = require("../../../server/handlers/compile"),
	expect    = require("chai").expect,
	http      = require("http"),
	constants = require("../../../server/constants");

const
	STATUS_CODE_BAD         = constants.STATUS_CODE_BAD,
	CONTENT_TYPE_TEXT_PLAIN = constants.CONTENT_TYPE_TEXT_PLAIN,
	compile                 = request.compile;

describe("Request compile", () => {
	it("exists", () => {
		expect(compile).not.to.be.an("undefined");
	});

	describe("response", () => {
		it("returns code " + STATUS_CODE_BAD + " with text when sending no code", () => {
			const reply = new http.ServerResponse(() => {}, () => {});

			compile(reply, null);

			expect(reply.statusCode).to.equal(STATUS_CODE_BAD);
			expect(reply.getHeader("content-type")).to.equal(CONTENT_TYPE_TEXT_PLAIN);
		});
	});
});